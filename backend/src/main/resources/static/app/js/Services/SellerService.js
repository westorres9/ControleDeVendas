app.service('SellerService', function($http) {

    var $ctrl = this;

    $ctrl.getSellers = () => {
        var request = $http(
            {
                method: 'get',
                url: `/sellers`
            }
        )
        return request; 
    }

    $ctrl.getSellerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/sellers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertSeller = (seller) => {
        
        var request = $http(
            {
                method: 'post',
                url: `/sellers`,
                data: seller
            }
        )
        return request; 
    }

    $ctrl.updateSeller = (seller) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/sellers/${seller.id}`,
                data: seller
            }
        )
        return request; 
    }

    $ctrl.deleteSellerById = (seller) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/sellers/${seller.id}`,
            }
        )
        return request; 
    }


})