function AverageMonthlyIncomeComponentController(CustomerService) {
    var $ctrl  = this;

    $ctrl.average = {};

    $ctrl.getAverageMonthlyIncome = () => {
        CustomerService.getAverageMonthlyIncome().then((response) => {
            $ctrl.average = response.data.averageIncome
            console.log($ctrl.average);
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getAverageMonthlyIncome();
    }
}

app.component('averageMonthlyIncome', {
    templateUrl: 'components/average-monthly-income/average-monthly-income.component.html',
    controller: AverageMonthlyIncomeComponentController,
})