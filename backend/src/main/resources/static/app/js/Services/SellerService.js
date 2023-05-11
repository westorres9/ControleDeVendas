app.service('SellerService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getSellers = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sellers`
            }
        )
        return request; 
    }

    $ctrl.getSellerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sellers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertSeller = (seller) => {
        
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/sellers`,
                data: seller
            }
        )
        return request; 
    }

    $ctrl.updateSeller = (seller) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sellers/${seller.id}`,
                data: seller
            }
        )
        return request; 
    }

    $ctrl.deleteSellerById = (seller) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/sellers/${seller.id}`,
            }
        )
        return request; 
    }


})