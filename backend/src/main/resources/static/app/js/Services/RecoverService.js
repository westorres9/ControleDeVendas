app.service('RecoverService', function($http) {

    var $ctrl = this;

    $ctrl.getUserEmail = (email) => {

        var request = $http(
            
            {
                method: 'get',
                url: `/recover/${email}`
            }
        )
        return request; 
    }

    $ctrl.validToken = (token) => {
        var request = $http(
            
            {
                method: 'get',
                url: `/recover/token/${token}`
            }
        )
        return request; 
    }
});