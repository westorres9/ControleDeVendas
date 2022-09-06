vendasApp.service('SaleService', function($http) {
    var url = 'http://localhost:8080/sales';

    this.getSales = function() {
        return $http.get(url)
    }

    this.insert = function (sale) {
        var request = $http(
            {
                method: 'post',
                url: url,
                data: sale
            }
        )
        return request;
    }

    this.update = function (sale) {
        var request = $http(
            {
                method: 'put',
                url: url + `/${sale.id}`,
                data: sale
            }
        )
        return request;
    }



    
    
        
})