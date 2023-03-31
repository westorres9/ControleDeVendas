app.service('UserService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getUserById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/users/${id}`
            }
        )
        return request; 
    }

    $ctrl.updateUser = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}`,
                data: user
            }
        )
        return request; 
    }

})