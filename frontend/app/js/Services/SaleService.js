app.service('SaleService', function ($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getSales = (page) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales`,
                params: {
                    'page': page
                }
            }
        )
        return request;
    }

    $ctrl.getAllSales = (page, size, mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales`,
                params: {
                    'maxDate': maxdate,
                    'minDate': mindate,
                    'size': size,
                    'page': page,
                }
            }
        )
        return request;
    }

    $ctrl.getSaleById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/${id}`
            }
        )
        return request;
    }

    $ctrl.insertSale = (sale) => {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/sales`,
                data: sale
            }
        )
        return request;
    }

    $ctrl.updateSaleSetFinish = (sale) => {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}/finish`,
                data: sale
            }
        )
        return request;
    }

    $ctrl.updateSaleSetCanceled = (sale) => {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}/canceled`,
                data: sale
            }
        )
        return request;
    }

    $ctrl.deleteSale = (sale) => {

        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/sales/${sale.id}`
            }
        )
        return request;
    }

    $ctrl.getSalesGroupByTeam = (mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-team`,
                params: {
                    'minDate': mindate,
                    'maxDate': maxdate
                }
            }
        )
        return request;
    }

    $ctrl.getSalesGroupBySeller = (mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-seller`,
                params: {
                    'minDate': mindate,
                    'maxDate': maxdate
                }
            }
        )
        return request;
    }

    $ctrl.getSalesByDate = (mindate, maxdate) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sales-by-date`,
                params: {
                    'minDate': mindate,
                    'maxDate': maxdate
                }
            }
        )
        return request;

    }








    $ctrl.salesSumBySeller = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-seller`
            }
        )
        return request;
    }



    $ctrl.salesSumByTeam = (e) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-team`,
                params: {
                    e
                }
            }
        )
        return request;
    }

    $ctrl.sellersByTeam = (e) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-team/${e}`,
            }
        )
        return request;
    }

    $ctrl.salesSuccessBySeller = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/success-by-seller`
            }
        )
        return request;
    }

    $ctrl.salesSumTotal = (mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sale-sum-total`,
                params: {
                    'maxDate': maxdate,
                    'minDate': mindate,
                }
            }
        )
        return request;
    }

    $ctrl.salesSumTotalByMonth = (e, mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-month`,
                params: {
                    'maxDate': maxdate,
                    'minDate': mindate,
                }
            }
        )
        return request;
    }

    $ctrl.searchDrilldown = (e, mindate, maxdate) => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-month`,
                params: {
                    'maxDate': maxdate,
                    'minDate': mindate,
                }
            }
        )
        return request;
    }
})