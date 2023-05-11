function NewCustomerComponentController(CustomerService, $location, toaster) {
    var $ctrl = this;

    $ctrl.insertCustomer = () => {
        CustomerService.insertCustomer($ctrl.customer).then((response) => {
            console.log(response.data);
            $ctrl.popSuccess();
        })
        .catch((error) => {
            console.log(error);
            $ctrl.popError();
        })
    }

    $ctrl.returnToPageCustomers = () => {
        $location.path("/admin/sales/new")
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'success', body: 'Novo Cliente cadastrada com sucesso', toasterId: 1 });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao cadastrar Novo Cliente', toasterId: 2 });
    }

}

app.component('newCustomer', {
    templateUrl: 'components/new-customer/new-customer.component.html',
    controller: NewCustomerComponentController
})