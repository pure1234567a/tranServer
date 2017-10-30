(function () {
  'use strict';

  angular
    .module('rates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rates', {
        abstract: true,
        url: '/rates',
        template: '<ui-view/>'
      })
      .state('rates.list', {
        url: '',
        templateUrl: 'modules/rates/client/views/list-rates.client.view.html',
        controller: 'RatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rates List'
        }
      })
      .state('rates.create', {
        url: '/create',
        templateUrl: 'modules/rates/client/views/form-rate.client.view.html',
        controller: 'RatesController',
        controllerAs: 'vm',
        resolve: {
          rateResolve: newRate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Rates Create'
        }
      })
      .state('rates.edit', {
        url: '/:rateId/edit',
        templateUrl: 'modules/rates/client/views/form-rate.client.view.html',
        controller: 'RatesController',
        controllerAs: 'vm',
        resolve: {
          rateResolve: getRate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Rate {{ rateResolve.name }}'
        }
      })
      .state('rates.view', {
        url: '/:rateId',
        templateUrl: 'modules/rates/client/views/view-rate.client.view.html',
        controller: 'RatesController',
        controllerAs: 'vm',
        resolve: {
          rateResolve: getRate
        },
        data: {
          pageTitle: 'Rate {{ rateResolve.name }}'
        }
      });
  }

  getRate.$inject = ['$stateParams', 'RatesService'];

  function getRate($stateParams, RatesService) {
    return RatesService.get({
      rateId: $stateParams.rateId
    }).$promise;
  }

  newRate.$inject = ['RatesService'];

  function newRate(RatesService) {
    return new RatesService();
  }
}());
