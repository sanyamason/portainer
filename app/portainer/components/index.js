import angular from 'angular';

import sidebarModule from './sidebar';
import gitFormModule from './forms/git-form';
import porAccessManagementModule from './accessManagement';
import formComponentsModule from './form-components';
import headerModule from './Header';

import { ReactExampleAngular } from './ReactExample';

export default angular
  .module('portainer.app.components', [sidebarModule, gitFormModule, porAccessManagementModule, formComponentsModule, headerModule])
  .component('reactExample', ReactExampleAngular).name;
