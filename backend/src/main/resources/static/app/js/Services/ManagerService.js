app.service('ManagerService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getManagers = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/managers`
            }
        )
        return request; 
    }

    $ctrl.getManagerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/managers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertManager = (manager) => {
        
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/managers`,
                data: manager
            }
        )
        return request; 
    }

    $ctrl.updateManager = (manager) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/managers/${manager.id}`,
                data: manager
            }
        )
        return request; 
    }

    $ctrl.deleteManagerById = (manager) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/managers/${manager.id}`,
            }
        )
        return request; 
    }
})