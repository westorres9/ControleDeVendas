function UpdateTeamComponentController(TeamService, $routeParams, $location, toaster) {
  var $ctrl = this;
  $ctrl.showUpdateNameInput = false;

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

  $ctrl.editName = () => {
    $ctrl.showUpdateNameInput = !$ctrl.showUpdateNameInput;
  }

  $ctrl.selectFile = (file) => {
    $ctrl.file = file;
    return $ctrl.file;
  }

  $ctrl.uploadFile = () => {
    var file = $ctrl.selectFile($ctrl.file);
    var formdata = new FormData();
    formdata.append('file', file);
    TeamService.updateTeamImage($ctrl.team, formdata).then((response) => {
      console.log(response.data, "upload realizado com sucesso");
      $ctrl.team.imgUrl = response.data.pathFile;
      console.log($ctrl.team.imgUrl);
    })
      .catch((error) => {
        console.log(error.status, "erro ao fazer upload");
      })
  }

  $ctrl.updateImage = () => {
    $ctrl.switchImage = !$ctrl.switchImage
  }

  $ctrl.updateTeamName = () => {
    $ctrl.team.name = $ctrl.newName;
    TeamService.updateTeamName($ctrl.team).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  $ctrl.returnToPageTeams = () => {
    $location.path("/admin/teams")
  }
}

app.component("updateTeam", {
  templateUrl: "components/update-team/update-team.component.html",
  controller: UpdateTeamComponentController
});