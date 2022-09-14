vendasApp.controller('teamsController', function(TeamService, AuthService) {
    var vm = this;
    vm.title = 'teamsController'
    vm.message = 'TeamsController'
    vm.GetAllTeams = GetAllTeams;
    vm.InsertTeam = InsertTeam;
    vm.UpdateTeam = UpdateTeam;
    vm.DeleteTeam = DeleteTeam;
    vm.SelectTeam = SelectTeam;
    var USER_ROLE = AuthService.getAuthority();
    vm.USER_ROLE = USER_ROLE;

    function GetAllTeams () {
        var getAllTeams = TeamService.getTeams();

        getAllTeams.then(function(response) {
            vm.teams = response.data.content;
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400 ) {
                window.location.href = '/index.html#/login';
            }
        })
    }
    GetAllTeams();

    function InsertTeam () {
        var team = vm.team
        var insertTeam = TeamService.insert(team);
        insertTeam.then(function (response) {
            vm.teams = response.data.content;
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function UpdateTeam () {
        var team = vm.team;

        var updateTeam = TeamService.update(team);
        updateTeam.then(function (response) {
            vm.teams = response.data.content;
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function DeleteTeam() {
        var team = vm.team;

        var deleteTeam = TeamService.delete(team);
        deleteTeam.then(function (response) {
            vm.teams = response.data.content;
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function SelectTeam(team) {
        vm.team = team;
        console.log(vm.team);
        return vm.team;
    }
})