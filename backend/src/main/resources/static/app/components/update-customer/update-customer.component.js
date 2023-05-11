function UpdateCustomerComponentController(CustomerService, $routeParams, $location, toaster) {
    var $ctrl = this;
    $ctrl.updateCustomer = () => {
        CustomerService.updateCustomer($ctrl.customer).then((response) => {
            console.log(response.data);
            $ctrl.popSuccess();
        }).catch((error) => {
            console.log(error);
            $ctrl.popError();
        });
    }

    $ctrl.getCustomerById = (id) => {
        CustomerService.getCustomerById(id).then((response) => {
            console.log(response.data);
            $ctrl.customer = response.data;
        })
    }

    $ctrl.returnToPageCustomers = () => {
        $location.path("/admin/customers")
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'note', body: 'Cliente atualizado com sucesso', toasterId: 1 });
    }

    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao atualizar Cliente', toasterId: 2 });
    }

    $ctrl.$onInit = () => {
        $ctrl.getCustomerById($routeParams.id);
    }
}

app.component("updateCustomer", {
    templateUrl: "components/update-customer/update-customer.component.html",
    controller: UpdateCustomerComponentController
});