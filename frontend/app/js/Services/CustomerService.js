app.service('CustomerService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getCustomers = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/customers`
            }
        )
        return request; 
    }

    $ctrl.getCustomerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/customers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertCustomer = (customer) => {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/customers`,
                data: `${customer}`
            }
        )
        return request; 
    }

    $ctrl.updateCustomer = (customer) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/customers/${customer.id}`,
                data: `${customer}`
            }
        )
        return request; 
    }

    $ctrl.deleteCustomerById =  (customer) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/customers/${customer.id}`
            }
        )
        return request; 
    }
    
} )