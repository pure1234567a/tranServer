(function () {
  'use strict';

  // Rates controller
  angular
    .module('rates')
    .controller('RatesController', RatesController);

  RatesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'rateResolve'];

  function RatesController ($scope, $state, $window, Authentication, rate) {
    var vm = this;

    vm.authentication = Authentication;
    vm.rate = rate;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Rate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.rate.$remove($state.go('rates.list'));
      }
    }

    // Save Rate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.rateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.rate._id) {
        vm.rate.$update(successCallback, errorCallback);
      } else {
        vm.rate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('rates.view', {
          rateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
