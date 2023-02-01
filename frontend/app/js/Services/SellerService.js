app.service('SellerService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getAllSellers = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sellers`
            }
        )
        return request; 
    }
})