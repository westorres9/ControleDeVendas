function UpdateTeamComponentController(TeamService, $routeParams, $location, toaster) {
    var $ctrl = this;
  
    $ctrl.updateTeam = () => {
      TeamService.updateTeam($ctrl.team).then((response) => {
        console.log(response.data);
        $ctrl.popSuccess();
      }).catch((error) => {
        console.log(error);
        $ctrl.popError();
      })
    }
  
    $ctrl.getTeamById = (id) => {
      TeamService.getTeamById(id).then((response) => {
          console.log(response.data);
          $ctrl.team = response.data;
      })
  }
  
  $ctrl.$onInit = () => {
    $ctrl.getTeamById($routeParams.id)
  }

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'note', body: 'Equipe atualizada com sucesso', toasterId: 1 });
}

$ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao atualizar Equipe', toasterId: 2 });
}
  
    $ctrl.returnToPageTeams = () => {
      $location.path("/admin/teams")
    } 
  }
  
  app.component("updateTeam", {
    templateUrl: "components/update-team/update-team.component.html",
    controller: UpdateTeamComponentController
  });