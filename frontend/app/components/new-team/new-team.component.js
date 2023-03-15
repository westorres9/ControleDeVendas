function NewTeamController(TeamService, $location) {
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
        $location.path("/admin/customers")
    }
}

app.component('newTeam', {
    templateUrl:'components/new-team/new-team.component.html',
    controller: NewTeamController,
})