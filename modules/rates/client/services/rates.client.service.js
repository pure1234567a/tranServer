// Rates service used to communicate Rates REST endpoints
(function () {
  'use strict';

  angular
    .module('rates')
    .factory('RatesService', RatesService);

  RatesService.$inject = ['$resource'];

  function RatesService($resource) {
    return $resource('api/rates/:rateId', {
      rateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
