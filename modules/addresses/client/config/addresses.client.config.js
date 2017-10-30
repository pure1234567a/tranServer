(function () {
  'use strict';

  angular
    .module('addresses')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Addresses',
      state: 'addresses',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'addresses', {
      title: 'List Addresses',
      state: 'addresses.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'addresses', {
      title: 'Create Address',
      state: 'addresses.create',
      roles: ['user']
    });
  }
}());
