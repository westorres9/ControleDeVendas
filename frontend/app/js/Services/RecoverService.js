app.service('RecoverService', function($http) {

    var $ctrl = this;

    const BASE_URL = "http://localhost:8080"

    $ctrl.getUserEmail = (email) => {

        var request = $http(
            
            {
                method: 'get',
                url: `${BASE_URL}/recover/${email}`
            }
        )
        return request; 
    }
});