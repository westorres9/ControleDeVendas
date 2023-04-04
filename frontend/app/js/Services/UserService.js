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

    $ctrl.updateUserImage = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}/image`,
                data: user
            }
        )
        return request; 
    }

    $ctrl.updateUserName = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}/username`,
                data: user
            }
        )
        return request; 
    }

    $ctrl.updateUserEmail = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}/email`,
                data: user
            }
        )
        return request; 
    }

    $ctrl.updateUserPassword = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}/password`,
                data: user
            }
        )
        return request; 
    }

})