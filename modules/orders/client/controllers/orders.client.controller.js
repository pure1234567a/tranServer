(function () {
  'use strict';

  // Orders controller
  angular
    .module('orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'orderResolve', 'AddressesService', 'RatesService'];

  function OrdersController($scope, $state, $window, Authentication, order, AddressesService, RatesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.order = order;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.listsender = [];
    vm.listreceiver = [];
    vm.listrates = RatesService.query();
    vm.selectRate = selectRate;
    vm.listsize = [];
    vm.selectSize = selectSize;
    vm.calculate = calculate;
    vm.order.items = vm.order.items ? vm.order.items : [];
    vm.item = {};
    vm.size = 'default';
    vm.order.amount = 0;
    vm.delItem = delItem;

    // vm.detailsender = vm.order.sender ? vm.order.sender.address : '';

    vm.changeSender = changeSender;
    vm.changeReceiver = changeReceiver;
    vm.addItem = addItem;
    function delItem(item) {
      vm.order.amount = 0;
      vm.order.items.splice(item, 1);
      vm.order.items.forEach(function (item) {
        vm.order.amount += item.total;
      });
    }
    function addItem() {
      vm.item.qty = vm.qty;
      vm.item.total = vm.total;
      vm.order.items.push(vm.item);
      vm.item = {};
      vm.order.amount = 0;
      vm.order.items.forEach(function (item) {
        vm.order.amount += item.total;
      });
    }
    function calculate() {
      vm.total = vm.qty * vm.price;
    }
    function selectSize(size) {
      vm.qty = 1;
      var sizeSelected = JSON.parse(size);
      vm.item.item = sizeSelected;
      vm.price = sizeSelected.price;
      vm.total = vm.price;
    }
    function selectRate(rate) {
      vm.listsize = [];
      vm.size = 'default';
      vm.qty = null;
      vm.total = null;
      vm.price = null;
      var rates = RatesService.query(function (item) {
        item.forEach(function (itm) {
          if (itm.rates === rate) {
            vm.listsize.push(itm);
          }
        });
      });
    }
    function changeSender(sender) {
      var senderSelected = JSON.parse(sender);
      vm.order.sender = senderSelected;
      vm.senderAddress = senderSelected.address + ' ' + senderSelected.subdistrict + ' ' + senderSelected.district + ' ' + senderSelected.province + ' ' + senderSelected.postcode + ' Tel : ' + senderSelected.tel;
    }
    function changeReceiver(receiver) {
      var receiverSelected = JSON.parse(receiver);
      vm.order.receiver = receiverSelected;
      vm.receiverAddress = receiverSelected.address + ' ' + receiverSelected.subdistrict + ' ' + receiverSelected.district + ' ' + receiverSelected.province + ' ' + receiverSelected.postcode + ' Tel : ' + receiverSelected.tel;
    }
    var address = AddressesService.query(function (sender) {
      sender.forEach(function (item) {
        if (item.sort === 'sender') {
          vm.listsender.push(item);
        } else {
          vm.listreceiver.push(item);
        }
      });
    });
    // Remove existing Order
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.order.$remove($state.go('orders.list'));
      }
    }

    // Save Order
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.order._id) {
        vm.order.$update(successCallback, errorCallback);
      } else {
        vm.order.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('orders.view', {
          orderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
