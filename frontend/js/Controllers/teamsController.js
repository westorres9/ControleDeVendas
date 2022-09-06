vendasApp.controller('teamsController', function(TeamService) {
    var vm = this;
    vm.title = 'teamsController'
    vm.message = 'TeamsController'
    vm.GetAllTeams = GetAllTeams;

    function GetAllTeams () {
        var getAllTeams = TeamService.getTeams();

        getAllTeams.then(function(response) {
            vm.teams = response.data.content;
            console.log(response.data.content);
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }
    GetAllTeams();
})