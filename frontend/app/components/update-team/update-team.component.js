function UpdateTeamComponentController(TeamService, $routeParams, $location) {
    var $ctrl = this;
  
    $ctrl.updateTeam = () => {
      TeamService.updateTeam($ctrl.team).then((response) => {
        console.log(response.data);
        $ctrl.returnToPageTeams();
      }).catch((error) => {
        console.log(error);
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
  
    $ctrl.returnToPageTeams = () => {
      $location.path("/admin/teams")
    } 
  }
  
  app.component("updateTeam", {
    templateUrl: "components/update-team/update-team.component.html",
    controller: UpdateTeamComponentController
  });