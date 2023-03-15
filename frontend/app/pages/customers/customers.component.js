function CustomerController(CustomerService) {
    var $ctrl = this;

    $ctrl.getCustomers = () => {
      CustomerService.getCustomers().then((response) => {
        $ctrl.customers = response.data;
      })
    }

    $ctrl.$onInit = () => {
      $ctrl.getCustomers();
    }

    $ctrl.selectToDelete = (customer) => {
      $ctrl.showWarning();
      $ctrl.customer = customer
      return $ctrl.customer;
    }
  
    $ctrl.deleteCustomer = (customer) => {
      CustomerService.deleteCustomerById(customer).then((response) => {
        $ctrl.getCustomers();
        $ctrl.closeWarning();
      }).catch((error) => {
        console.log(error.status)
      })
    }
  
    $ctrl.showWarning = () => {
      $ctrl.warningVisible = true;
    }
  
    $ctrl.closeWarning = () => {
      $ctrl.warningVisible = false;
    }
  
  }
  app.component("customers", {
    templateUrl: "pages/customers/customers.component.html",
    controller: CustomerController
  })
  