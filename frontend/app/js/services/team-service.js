myApp.service('TeamService', function($http, $routeParams) {
    let BASE_URL = "http://localhost:8080";

    this.getAllTeams = function() {
        return $http.get(`${BASE_URL}/teams`);
    }

    this.insertTeam = function(team) {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/teams`,
                data: team
            }
        )
        return request;
    }

    this.updateTeam = function(team) {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/teams/${team.id}`,
                data: team
            }
        )
        return request;
    }

    this.deleteTeam = function (team) {
        var request = $http.delete(`${BASE_URL}/teams/${team.id}`);
        return request;
    }
});