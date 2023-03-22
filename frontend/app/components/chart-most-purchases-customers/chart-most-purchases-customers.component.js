function ChartMostPurchasesCustomersComponentController(CustomerService) {
    var $ctrl = this;
    
    $ctrl.mostPurchasesCustomers = [];

    let chart = Highcharts.chart('most-purchases-customers', {
        chart: {
            type: 'bar',
        },
        title: {
            text:'Clientes que mais compraram'
        },
        xAxis: {
            categories:[]
        },
        yAxis: {
            title: {
                text:'Comprar efetuadas'
            }
        },
        series: []
    })

    $ctrl.getMostPurchasesCustomers = () => {
        CustomerService.getMostPurchasesCustomers().then((response) => {
            $ctrl.mostPurchasesCustomers = response.data;
            console.log(response.data);
            let customers = [];
            $ctrl.mostPurchasesCustomers.map(item => customers.push(item.name));
            let purchases = [];
            $ctrl.mostPurchasesCustomers.map(item => purchases.push(item.quantity))

            chart.xAxis[0].setCategories(customers);
            chart.addSeries({
                name: 'Compras',
                data: purchases
            })
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getMostPurchasesCustomers(); 
    }
}

app.component('chartMostPurchasesCustomers', {
    templateUrl: 'components/chart-most-purchases-customers/chart-most-purchases-customers.component.html',
    controller: ChartMostPurchasesCustomersComponentController,
})