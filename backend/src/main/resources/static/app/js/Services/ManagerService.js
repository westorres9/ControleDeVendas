app.service('ManagerService', function($http) {

    var $ctrl = this;

    $ctrl.getManagers = () => {
        var request = $http(
            {
                method: 'get',
                url: `/managers`
            }
        )
        return request; 
    }

    $ctrl.getManagerById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/managers/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertManager = (manager) => {
        
        var request = $http(
            {
                method: 'post',
                url: `/managers`,
                data: manager
            }
        )
        return request; 
    }

    $ctrl.updateManager = (manager) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/managers/${manager.id}`,
                data: manager
            }
        )
        return request; 
    }

    $ctrl.deleteManagerById = (manager) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/managers/${manager.id}`,
            }
        )
        return request; 
    }
})