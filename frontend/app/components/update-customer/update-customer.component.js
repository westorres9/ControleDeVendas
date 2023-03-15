function UpdateCustomerComponentController(CustomerService, $routeParams, $location) {
    var $ctrl = this;
    $ctrl.updateCustomer = () => {
        CustomerService.updateCustomer($ctrl.customer).then((response) => {
            console.log(response.data);
            $location.url();
            $ctrl.returnToPageCustomers();
        }).catch((error) => {
            console.log(error)
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

    $ctrl.$onInit = () => {
        $ctrl.getCustomerById($routeParams.id);
    }
}

app.component("updateCustomer", {
    templateUrl: "components/update-customer/update-customer.component.html",
    controller: UpdateCustomerComponentController
});