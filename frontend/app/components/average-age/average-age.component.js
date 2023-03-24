function AverageAgeComponentController(CustomerService) {
    var $ctrl  = this;

    $ctrl.average = {}

    $ctrl.getAverageAge = () => {
        CustomerService.getAverageAge().then((response) => {
            $ctrl.average = response.data.averageAge.toFixed(0);
            console.log($ctrl.average)
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getAverageAge();
    }

}

app.component('averageAge', {
    templateUrl: 'components/average-age/average-age.component.html',
    controller: AverageAgeComponentController,
})