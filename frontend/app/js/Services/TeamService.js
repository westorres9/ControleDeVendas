app.service('TeamService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getAllTeams = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/teams`
            }
        )
        return request; 
    }

    $ctrl.getTeamById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/teams/${id}`
            }
        )
        return request; 
    }
    
} )