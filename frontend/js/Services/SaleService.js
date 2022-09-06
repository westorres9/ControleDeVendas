vendasApp.service('SaleService', function($http) {
    var url = 'http://localhost:8080/sales';

    this.getSales = function() {
        return $http.get(url)
    }
    
        
})