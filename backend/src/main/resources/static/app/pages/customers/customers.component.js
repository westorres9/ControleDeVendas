function CustomerController(CustomerService, toaster) {
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
        $ctrl.popSuccess();
      }).catch((error) => {
        console.log(error.status);
        $ctrl.popError();
      })
    }
  
    $ctrl.showWarning = () => {
      $ctrl.warningVisible = true;
    }
  
    $ctrl.closeWarning = () => {
      $ctrl.warningVisible = false;
    }

    
  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Cliente deletado com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Cliente', toasterId: 2 });
  }
  
  }
  app.component("customers", {
    templateUrl: "pages/customers/customers.component.html",
    controller: CustomerController
  })
  