function NewCustomerComponentController(CustomerService, $location) {
    var $ctrl = this;

    $ctrl.insertCustomer = () => {
        CustomerService.insertCustomer($ctrl.customer).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageCustomers();
        })
        .catch((error) => {
            console.log(error)
        })
    }

    $ctrl.returnToPageCustomers = () => {
        $location.path("/admin/sales/new")
    }
}

app.component('newCustomer', {
    templateUrl: 'components/new-customer/new-customer.component.html',
    controller: NewCustomerComponentController
})