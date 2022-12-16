vendasApp.service('SaleService', function($http, $routeParams) {
    let BASE_URL = "http://localhost:8080";

    this.getAllSales = function() {
        return $http.get(`${BASE_URL}/sales`);
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

    this.updateSale = function(sale) {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}`,
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


