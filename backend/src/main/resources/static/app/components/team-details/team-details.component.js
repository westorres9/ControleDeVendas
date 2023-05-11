function TeamDetailsComponentController(TeamService, SellerService, $location) {
    var $ctrl = this;

    $ctrl.team = ''

    $ctrl.showWarning = () => {
        $ctrl.warningVisible = true;
    }

    $ctrl.closeWarning = () => {
        $ctrl.warningVisible = false;
    }

    $ctrl.getTeamById = (id) => {

        TeamService.getTeamById(id).then((response) => {
            console.log(response.data);
            $ctrl.team = response.data;
        }).catch((error) => {
            console.log(error.status)
        })
    }

    $ctrl.selectToDelete = (seller) => {
        $ctrl.showWarning();
        $ctrl.seller = seller;
        console.log($ctrl.seller);
        return $ctrl.seller
    }

    $ctrl.deleteSellerById = (seller) => {
    }


    $ctrl.$onInit = () => {
        var id = $location.path()
        id = id.substring(13)
        console.log(id)
        $ctrl.getTeamById(id)
    }
}

app.component('teamDetails', {
    templateUrl: 'components/team-details/team-details.component.html',
    controller: TeamDetailsComponentController,
})