vendasApp.service('TeamService', function($http) {
    var url = 'http://localhost:8080/teams';

    this.getTeams = function() {
        return $http.get(url)
    }

    this.insertTeam = function(team) {
        var request = $http(
            {
                method: 'post',
                url: url,
                data: team
            }
        )
    }

    this.updateTeam = function (team) {
        var request = $http(
            {
                method: 'put',
                url: url + `/${team.id}`,
                data: team
            }
        )
    }

    this.deleteTeam = function (team) {
        var request = $http({
            method: 'delete',
                url: url + `/${team.id}`
        })
    }
})