vendasApp.service('SaleService', function($http, $routeParams) {
    let BASE_URL = "http://localhost:8080";

    this.getAllSales = function() {
        return $http.get(`${BASE_URL}/sales`);
    }

    this.getSaleById = function(sale) {
        return $http.get(`${BASE_URL}/sales/${sale.id}`);
    }

    this.insertSale = function(sale) {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/sales`,
                data: sale
            }
        )
        return request;
    }

    this.updateSale = function(saleId) {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${saleId}`,
                data: sale
            }
        )
        return request;
    }

    this.deleteSale = function (sale) {
        var request = $http.delete(`${BASE_URL}/sales/${sale.id}`);
        return request;
    }

})


