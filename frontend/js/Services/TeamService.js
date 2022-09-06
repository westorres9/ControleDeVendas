vendasApp.service('TeamService', function($http) {
    var url = 'http://localhost:8080/teams';

    this.getTeams = function() {
        return $http.get(url)
    }

    this.insert = function(team) {
        var request = $http(
            {
                method: 'post',
                url: url,
                data: team
            }
        )
        return request;
    }

    this.update = function (team) {
        var request = $http(
            {
                method: 'put',
                url: url + `/${team.id}`,
                data: team
            }
        )
        return request;
    }

    this.delete = function (team) {
        var request = $http({
            method: 'delete',
                url: url + `/${team.id}`
        })
        return request;
    }
})