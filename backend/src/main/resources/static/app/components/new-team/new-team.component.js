function NewTeamController(TeamService, $location, toaster) {
    var $ctrl = this;

    $ctrl.insertNewTeam = () => {
        
        TeamService.insertTeam($ctrl.team).then((response) => {
            console.log(response.data);
            $ctrl.popSuccess();
        }).catch((error) => {
            console.log(error);
            $ctrl.popError();
        })
    }

    $ctrl.returnToPageTeams = () => {
        $location.path("/admin/teams")
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'success', body: 'Equipe cadastrada com sucesso', toasterId: 1 , });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao cadastrar Equipe', toasterId: 2 });
    }
}

app.component('newTeam', {
    templateUrl:'components/new-team/new-team.component.html',
    controller: NewTeamController,
})