vendasApp.controller('teamsController', function(TeamService, AuthService) {
    var vm = this;
    vm.title = 'teamsController';
    vm.GetAllTeams = GetAllTeams;
    vm.SelectTeam = SelectTeam;
    var USER_ROLE = AuthService.getAuthority();
    vm.USER_ROLE = USER_ROLE;

    function SelectTeam(team) {
        vm.team = team;
        console.log(vm.team)
        return vm.team;
    }

    function GetAllTeams () {
        var getAllTeams = TeamService.getAllTeams();

        getAllTeams.then(function(response) {
            vm.teams = response.data.content;
            console.log(vm.teams)
        })
         .catch(function(error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400 ) {
                window.location.href = '/index.html#/login';
            }
        })
    }

    GetAllTeams();
    
})