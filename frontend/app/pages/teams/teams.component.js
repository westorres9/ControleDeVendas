function TeamController(TeamService, SellerService, toaster) {
  var $ctrl = this;

  $ctrl.teams = [];
  $ctrl.sellers = [];
  $ctrl.warningVisible = false;

  $ctrl.getAllTeams = () => {
    TeamService.getAllTeams().then((response) => {
      $ctrl.teams = response.data;
    })
  }

  $ctrl.getAllSellers = () => {
    SellerService.getAllSellers().then((response) => {
      $ctrl.sellers = response.data;
    })
  }

  $ctrl.$onInit = () => {
    $ctrl.getAllTeams();
    $ctrl.getAllSellers();
  }

  $ctrl.deleteTeam = (team) => {
   TeamService.deleteTeamById(team).then((response) => {
      $ctrl.getAllTeams();
      $ctrl.closeWarning();
      $ctrl.popSuccess();
    }).catch((error) => {
      console.log(error.status);
      $ctrl.popError();
    })
  }

  $ctrl.showWarning = () => {
    $ctrl.warningVisible = true;
  }

  $ctrl.closeWarning = () => {
    $ctrl.warningVisible = false;
  }

  $ctrl.selectToDelete = (team) => {
    $ctrl.showWarning();
    $ctrl.team = team;
    console.log($ctrl.team);
    return $ctrl.team
  }

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Equipe deletada com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Equipe', toasterId: 2 });
  }
}

app.component("teams", {
  templateUrl: "pages/teams/teams.component.html",
  controller: TeamController
});
