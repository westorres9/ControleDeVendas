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

    $ctrl.insertTeam = (team) => {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/teams`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.updateTeam = (team) => {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/teams/${team.id}`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.deleteTeamById =  (team) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/teams/${team.id}`
            }
        )
        return request; 
    }
    
    $ctrl.updateTeamName = (team) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/teams/${team.id}`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.updateTeamImage = (team, formdata) => {
        
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/teams/${team.id}/image`,
                headers: { 'Content-Type': undefined},
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request;
    }
} )