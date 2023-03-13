function CustomerController(CustomerService) {
    var $ctrl = this;

    $ctrl.getCustomers = () => {
      CustomerService.getCustomers().then((response) => {
        console.log(response.data);
        $ctrl.customers = response.data;
      })
    }

    $ctrl.$onInit = () => {
      $ctrl.getCustomers();
    }
  }
  app.component("customers", {
    templateUrl: "pages/customers/customers.component.html",
    controller: CustomerController
  })
  