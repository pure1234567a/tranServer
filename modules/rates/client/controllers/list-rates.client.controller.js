(function () {
  'use strict';

  angular
    .module('rates')
    .controller('RatesListController', RatesListController);

  RatesListController.$inject = ['RatesService'];

  function RatesListController(RatesService) {
    var vm = this;

    vm.rates = RatesService.query();
  }
}());
