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
                text:'Compras efetuadas'
            }
        },
        series: []
    })

    $ctrl.getMostPurchasesCustomers = () => {
        CustomerService.getMostPurchasesCustomers($ctrl.mindate, $ctrl.maxdate).then((response) => {
            if(chart.series.length > 0) {
                while(chart.series.length > 0) {
                    chart.series[0].remove()
                }
            }
            $ctrl.mostPurchasesCustomers = response.data;
            console.log(response.data);
            let customers = [];
            $ctrl.mostPurchasesCustomers.map(item => customers.push(item.name));
            let purchases = [];
            $ctrl.mostPurchasesCustomers.map(item => purchases.push(item.quantity))

            chart.xAxis[0].setCategories(customers);
            chart.addSeries({
                name: 'Compras efetuadas',
                data: purchases
            })
        })
    }

    $ctrl.$onInit = () => {   
    }

    $ctrl.$onChanges = (mindate, maxdate) => {
        $ctrl.getMostPurchasesCustomers(mindate, maxdate); 
    }
}

app.component('chartMostPurchasesCustomers', {
    templateUrl: 'components/chart-most-purchases-customers/chart-most-purchases-customers.component.html',
    controller: ChartMostPurchasesCustomersComponentController,
    bindings: {
        mindate: '<',
        maxdate: '<'
    }
})