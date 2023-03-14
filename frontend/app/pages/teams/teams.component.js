function TeamController(TeamService, SellerService) {
  var $ctrl = this;

  $ctrl.teams = [];
  $ctrl.sellers = [];
  $ctrl.warningVisible = false;

  $ctrl.getAllTeams = () => {
    TeamService.getAllTeams().then((response) => {
      console.log(response.data);
      $ctrl.teams = response.data;
    })
  }

  $ctrl.getAllSellers = () => {
    SellerService.getAllSellers().then((response) => {
      console.log(response.data);
      $ctrl.sellers = response.data;
    })
  }

  $ctrl.$onInit = () => {
    $ctrl.getAllTeams();
    $ctrl.getAllSellers();
  }

  $ctrl.deleteTeam = (team) => {
   TeamService.deleteTeamById(team).then((response) => {
      console.log(response.data);
      $ctrl.getAllTeams();
      $ctrl.closeWarning();
    }).catch((error) => {
      console.log(error.status)
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

  
}

app.component("teams", {
  templateUrl: "pages/teams/teams.component.html",
  controller: TeamController
});
