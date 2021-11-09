import angular from 'angular';

import sidebarModule from './sidebar';
import gitFormModule from './forms/git-form';
import porAccessManagementModule from './accessManagement';
import formComponentsModule from './form-components';

import { ReactExampleAngular } from './ReactExample';
import boxSelectorModule from './BoxSelector';

export default angular
  .module('portainer.app.components', [sidebarModule, gitFormModule, porAccessManagementModule, formComponentsModule, boxSelectorModule])
  .component('reactExample', ReactExampleAngular).name;
