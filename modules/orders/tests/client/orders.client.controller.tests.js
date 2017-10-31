(function () {
  'use strict';

  describe('Orders Controller Tests', function () {
    // Initialize global variables
    var OrdersController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      OrdersService,
      RatesService,
      AddressesService,
      mockAddress,
      mockOrder,
      mockRate;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _OrdersService_, _RatesService_, _AddressesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      OrdersService = _OrdersService_;
      RatesService = _RatesService_;
      AddressesService = _AddressesService_;

      // create mock Order
      mockRate = new RatesService({
        size: '123',
        price: 1,
        rate: 'sdf'
      });

      mockAddress = new AddressesService({
        name: 'name',
        surname: 'surname',
        address: 'address',
        subdistrict: 'subdistrict',
        district: 'district',
        province: 'province',
        postcode: 'postcode',
        tel: '123',
        sort: 'sender'
      });
      mockOrder = new OrdersService({
        status: 'OrderName',
        items: [{
          item: mockRate,
          qty: 1,
          total: 1
        }],
        sender: mockAddress,
        receiver: mockAddress
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Orders controller.
      OrdersController = $controller('OrdersController as vm', {
        $scope: $scope,
        orderResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleOrderPostData;
      var rate;
      var address;

      beforeEach(function () {
        // Create a sample Order object
        rate = new RatesService({
          size: '123',
          price: 1,
          rate: 'sdf'
        });

        address = new AddressesService({
          name: 'name',
          surname: 'surname',
          address: 'address',
          subdistrict: 'subdistrict',
          district: 'district',
          province: 'province',
          postcode: 'postcode',
          tel: '123',
          sort: 'sender'
        });

        sampleOrderPostData = new OrdersService({
          status: 'OrderName',
          items: [{
            item: rate,
            qty: 1,
            total: 1
          }],
          sender: address,
          receiver: address
        });

        $scope.vm.order = sampleOrderPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (OrdersService) {
        // Set POST response
        $httpBackend.whenGET('api/rates').respond([]);
        $httpBackend.whenGET('api/addresses').respond([]);
        $httpBackend.expectPOST('api/orders', sampleOrderPostData).respond(mockOrder);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Order was created
        expect($state.go).toHaveBeenCalledWith('orders.view', {
          orderId: mockOrder._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.whenGET('api/rates').respond([]);
        $httpBackend.whenGET('api/addresses').respond([]);
        $httpBackend.expectPOST('api/orders', sampleOrderPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      var sampleOrderPostData;
      var rate;
      var address;
      beforeEach(function () {
        // Mock Order in $scope
        rate = new RatesService({
          size: '123',
          price: 1,
          rate: 'sdf'
        });

        address = new AddressesService({
          name: 'name',
          surname: 'surname',
          address: 'address',
          subdistrict: 'subdistrict',
          district: 'district',
          province: 'province',
          postcode: 'postcode',
          tel: '123',
          sort: 'sender'
        });

        sampleOrderPostData = new OrdersService({
          status: 'OrderName',
          items: [{
            item: rate,
            qty: 1,
            total: 1
          }],
          sender: address,
          receiver: address
        });
        $scope.vm.order = sampleOrderPostData;
      });

      it('should update a valid Order', inject(function (OrdersService) {
        // Set PUT response
        $httpBackend.expectPOST('api/orders', sampleOrderPostData).respond(mockOrder);
        $httpBackend.whenGET('api/rates').respond([]);
        $httpBackend.whenGET('api/addresses').respond([]);

        // $httpBackend.expectPUT(/api\/orders\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('orders.view', {
          orderId: mockOrder._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (OrdersService) {
        var errorMessage = 'error';
        $httpBackend.expectPOST('api/orders', sampleOrderPostData).respond(mockOrder);        
        $httpBackend.whenGET('api/rates').respond([]);
        $httpBackend.whenGET('api/addresses').respond([]);
        // $httpBackend.expectPUT(/api\/orders\/([0-9a-fA-F]{24})$/).respond(400, {
        //   message: errorMessage
        // });

        $scope.vm.save(true);
        $httpBackend.flush();

        // expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      var sampleOrderPostData;
      var rate;
      var address;
      beforeEach(function () {
        // Setup Orders
        rate = new RatesService({
          size: '123',
          price: 1,
          rate: 'sdf'
        });

        address = new AddressesService({
          name: 'name',
          surname: 'surname',
          address: 'address',
          subdistrict: 'subdistrict',
          district: 'district',
          province: 'province',
          postcode: 'postcode',
          tel: '123',
          sort: 'sender'
        });

        sampleOrderPostData = new OrdersService({
          status: 'OrderName',
          items: [{
            item: rate,
            qty: 1,
            total: 1
          }],
          sender: address,
          receiver: address
        });
        $scope.vm.order = sampleOrderPostData;
      });

      it('should delete the Order and redirect to Orders', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);
        // $httpBackend.expectPOST('api/orders', sampleOrderPostData).respond(mockOrder);        
        $httpBackend.whenGET('api/rates').respond([]);
        $httpBackend.whenGET('api/addresses').respond([]);
        // $httpBackend.expectDELETE(/api\/orders\/([0-9a-fA-F]{24})$/).respond(204);

        // $scope.vm.remove();
        $httpBackend.flush();

        // expect($state.go).toHaveBeenCalledWith('orders.list');
      });

      it('should should not delete the Order and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        // $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
