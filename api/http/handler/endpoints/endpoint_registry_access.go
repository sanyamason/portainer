package endpoints

import (
	"net/http"

	httperror "github.com/portainer/libhttp/error"
	"github.com/portainer/libhttp/request"
	"github.com/portainer/libhttp/response"
	portainer "github.com/portainer/portainer/api"
	bolterrors "github.com/portainer/portainer/api/bolt/errors"
	"github.com/portainer/portainer/api/http/security"
)

type registryAccessPayload struct {
	UserAccessPolicies portainer.UserAccessPolicies
	TeamAccessPolicies portainer.TeamAccessPolicies
	Namespaces         []string
}

func (payload *registryAccessPayload) Validate(r *http.Request) error {
	return nil
}

// PUT request on /endpoints/{id}/registries/{registryId}
func (handler *Handler) endpointRegistryAccess(w http.ResponseWriter, r *http.Request) *httperror.HandlerError {
	securityContext, err := security.RetrieveRestrictedRequestContext(r)
	if err != nil {
		return &httperror.HandlerError{http.StatusInternalServerError, "Unable to retrieve info from request context", err}
	}

	endpointID, err := request.RetrieveNumericRouteVariableValue(r, "id")
	if err != nil {
		return &httperror.HandlerError{StatusCode: http.StatusBadRequest, Message: "Invalid endpoint identifier route variable", Err: err}
	}

	registryID, err := request.RetrieveNumericRouteVariableValue(r, "registryId")
	if err != nil {
		return &httperror.HandlerError{StatusCode: http.StatusBadRequest, Message: "Invalid resource pool identifier route variable", Err: err}
	}

	endpoint, err := handler.DataStore.Endpoint().Endpoint(portainer.EndpointID(endpointID))
	if err == bolterrors.ErrObjectNotFound {
		return &httperror.HandlerError{StatusCode: http.StatusNotFound, Message: "Unable to find an endpoint with the specified identifier inside the database", Err: err}
	} else if err != nil {
		return &httperror.HandlerError{StatusCode: http.StatusInternalServerError, Message: "Unable to find an endpoint with the specified identifier inside the database", Err: err}
	}

	err = handler.requestBouncer.AuthorizedEndpointOperation(r, endpoint, true)
	if err != nil {
		return &httperror.HandlerError{http.StatusForbidden, "Permission denied to access endpoint", err}
	}

	isAdminOrEndpointAdmin := securityContext.IsAdmin
	if !isAdminOrEndpointAdmin {
		return &httperror.HandlerError{StatusCode: http.StatusForbidden, Message: "User is not authorized", Err: err}
	}

	registry, err := handler.DataStore.Registry().Registry(portainer.RegistryID(registryID))
	if err == bolterrors.ErrObjectNotFound {
		return &httperror.HandlerError{StatusCode: http.StatusNotFound, Message: "Unable to find an endpoint with the specified identifier inside the database", Err: err}
	} else if err != nil {
		return &httperror.HandlerError{StatusCode: http.StatusInternalServerError, Message: "Unable to find an endpoint with the specified identifier inside the database", Err: err}
	}

	var payload registryAccessPayload
	err = request.DecodeAndValidateJSONPayload(r, &payload)
	if err != nil {
		return &httperror.HandlerError{StatusCode: http.StatusBadRequest, Message: "Invalid request payload", Err: err}
	}

	if registry.RegistryAccesses == nil {
		registry.RegistryAccesses = portainer.RegistryAccesses{}
	}

	if _, ok := registry.RegistryAccesses[endpoint.ID]; !ok {
		registry.RegistryAccesses[endpoint.ID] = portainer.RegistryAccessPolicies{}
	}

	registryAccess := registry.RegistryAccesses[endpoint.ID]

	if endpoint.Type == portainer.KubernetesLocalEnvironment || endpoint.Type == portainer.AgentOnKubernetesEnvironment || endpoint.Type == portainer.EdgeAgentOnKubernetesEnvironment {
		err := handler.updateKubeAccess(endpoint, registry, registryAccess.Namespaces, payload.Namespaces)
		if err != nil {
			return &httperror.HandlerError{StatusCode: http.StatusInternalServerError, Message: "Unable to update kube access policies", Err: err}
		}

		registryAccess.Namespaces = payload.Namespaces
	} else {
		registryAccess.UserAccessPolicies = payload.UserAccessPolicies
		registryAccess.TeamAccessPolicies = payload.TeamAccessPolicies
	}

	registry.RegistryAccesses[portainer.EndpointID(endpointID)] = registryAccess

	handler.DataStore.Registry().UpdateRegistry(registry.ID, registry)

	return response.Empty(w)
}

func (handler *Handler) updateKubeAccess(endpoint *portainer.Endpoint, registry *portainer.Registry, oldNamespaces, newNamespaces []string) error {
	oldNamespacesSet := toSet(oldNamespaces)
	newNamespacesSet := toSet(newNamespaces)

	namespacesToRemove := setDifference(oldNamespacesSet, newNamespacesSet)
	namespacesToAdd := setDifference(newNamespacesSet, oldNamespacesSet)

	cli, err := handler.K8sClientFactory.GetKubeClient(endpoint)
	if err != nil {
		return err
	}

	for namespace := range namespacesToRemove {
		err := cli.DeleteRegistrySecret(registry, namespace)
		if err != nil {
			return err
		}
	}

	for namespace := range namespacesToAdd {
		err := cli.CreateRegistrySecret(registry, namespace)
		if err != nil {
			return err
		}
	}

	return nil
}

type stringSet map[string]bool

func toSet(list []string) stringSet {
	set := stringSet{}
	for _, el := range list {
		set[el] = true
	}
	return set
}

// setDifference returns the set difference tagsA - tagsB
func setDifference(setA stringSet, setB stringSet) stringSet {
	set := stringSet{}

	for el := range setA {
		if !setB[el] {
			set[el] = true
		}
	}

	return set
}
