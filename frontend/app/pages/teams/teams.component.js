function TeamController(TeamService, SellerService) {
  var $ctrl = this;

  $ctrl.teams = [];
  $ctrl.sellers = [];

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
}

app.component("teams", {
  templateUrl: "pages/teams/teams.component.html",
  controller: TeamController
});
