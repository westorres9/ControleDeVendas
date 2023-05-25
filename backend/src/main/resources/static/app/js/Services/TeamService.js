app.service('TeamService', function($http) {

    var $ctrl = this;

    $ctrl.getAllTeams = () => {
        var request = $http(
            {
                method: 'get',
                url: `/teams`
            }
        )
        return request; 
    }

    $ctrl.getTeamById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/teams/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertTeam = (team) => {

        var request = $http(
            {
                method: 'post',
                url: `/teams`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.updateTeam = (team) => {

        var request = $http(
            {
                method: 'put',
                url: `/teams/${team.id}`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.deleteTeamById =  (team) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/teams/${team.id}`
            }
        )
        return request; 
    }
    
    $ctrl.updateTeamName = (team) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/teams/${team.id}`,
                data: team
            }
        )
        return request; 
    }

    $ctrl.updateTeamImage = (team, formdata) => {
        
        var request = $http(
            {
                method: 'post',
                url: `/teams/${team.id}/image`,
                headers: { 'Content-Type': undefined},
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request;
    }
} )