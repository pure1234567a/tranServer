(function () {
  'use strict';

  angular
    .module('rates')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Rates',
      state: 'rates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'rates', {
      title: 'List Rates',
      state: 'rates.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'rates', {
      title: 'Create Rate',
      state: 'rates.create',
      roles: ['user']
    });
  }
}());
