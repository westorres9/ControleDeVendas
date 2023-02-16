function SalesBySellerChartController (SaleService) {
    var $ctrl = this;

    $ctrl.sales = [];
    $ctrl.page = [];
    $ctrl.date = [];

    $ctrl.salesBySeller = () => {
        SaleService.getAllSales().then((response) => {
            $ctrl.page = response.data;
            console.log($ctrl.page)
            $ctrl.sales = response.data.content;
            console.log('sale',response.data.content)
            $ctrl.visited = []
            $ctrl.deals = []
            $ctrl.amount = []
            $ctrl.sales.forEach(x => $ctrl.date.push(x.date));
            $ctrl.sales.forEach(x => $ctrl.visited.push(x.visited))
            $ctrl.sales.forEach(x => $ctrl.deals.push(x.deals))
            $ctrl.sales.forEach(x => $ctrl.amount.push(x.amount))
            console.log($ctrl.visited)
            Highcharts.chart('sales-by-seller', {
                title: {
                    text: `Vendas de todos durante o periodo`
                },
                subtitle: {
                    text:`${$ctrl.date[0]} a ${$ctrl.date[19]}`
                },
                xAxis: {
                    title: 'Vendas',
                    categories: $ctrl.date,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Vendas x visitas'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    verticalAlign: 'bottom'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false,
                        }
                    }
                },
                series: [
                    {
                        name: 'Visitas',
                        data: $ctrl.visited
                    },
                    {
                        name: 'Vendas',
                        data: $ctrl.deals
                    }
                ], 
            })
        })
    }

    

    $ctrl.$onInit = () => {
        $ctrl.salesBySeller();
        }

}

app.component('salesBySellerChart', {
    templateUrl: 'components/sales-by-seller-chart/sales-by-seller-chart.component.html',
    controller: SalesBySellerChartController,
    bindings: {
        minDate: '=',
        maxDate: '=',
        onChanges: '&'
    }
})