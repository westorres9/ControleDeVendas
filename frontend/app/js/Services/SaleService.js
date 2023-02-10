app.service('SaleService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getAllSales = (page, size, mindate, maxdate) => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales`,
                params: {
                    'maxDate': maxdate,
                    'minDate': mindate,
                    'size': size,
                    'page': page
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

    $ctrl.updateSale = (sale) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}`,
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

    $ctrl.salesSumBySeller = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-seller`
            }
        )
        return request; 
    }

    $ctrl.salesSumByTeam = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-team`
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

    $ctrl.salesSumTotalByMonth = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-month`
            }
        )
        return request; 
    }
})