function NewTeamController(TeamService, $window) {
    var $ctrl = this;

    $ctrl.insertNewTeam = () => {
        
        TeamService.insertTeam($ctrl.team).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageTeams();
        }).catch((error) => {
            console.log(error.status)
        }).finally(() => {
            $ctrl.returnToPageSales();
        })
    }

    $ctrl.returnToPageTeams = () => {
        $window.location.href = "index.html#/admin/teams"
    }
}

app.component('newTeam', {
    templateUrl:'components/new-team/new-team.component.html',
    controller: NewTeamController,
})