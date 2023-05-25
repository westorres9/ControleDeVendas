app.service('CustomerService', function($http) {

    var $ctrl = this;

    $ctrl.getCustomers = () => {
        var request = $http(
            {
                method: 'get',
                url: `/customers`
            }
        )
        return request; 
    }

    $ctrl.getCustomerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/customers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertCustomer = (customer) => {

        var request = $http(
            {
                method: 'post',
                url: `/customers`,
                data: customer
            }
        )
        return request; 
    }

    $ctrl.updateCustomer = (customer) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/customers/${customer.id}`,
                data: customer
            }
        )
        return request; 
    }

    $ctrl.deleteCustomerById =  (customer) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/customers/${customer.id}`
            }
        )
        return request; 
    }

    $ctrl.getMostPurchasesCustomers = (mindate, maxdate) => {
        var request = $http(
            {
                method: 'get',
                url: `/customers/most-purchases`,
                params: {
                    'minDate': mindate,
                    'maxDate': maxdate
                }
            }
        )
        return request; 
    }

    $ctrl.getAverageAge = () => {
        var request = $http(
            {
                method: 'get',
                url: `/customers/average-age`
            }
        )
        return request
    }

    $ctrl.getAverageMonthlyIncome = () => {
        var request = $http(
            {
                method: 'get',
                url: `/customers/average-monthly-income`
            }
        )
        return request;
    }
    
} )