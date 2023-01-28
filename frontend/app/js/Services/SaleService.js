app.service('SaleService', function($http) {
    const BASE_URL = 'http://localhost:8080'

    this.getAllSales = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales`
            }
        )
        return request; 
    }

    this.insertSale = (sale) => {
        
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/sales`,
                date: sale
            }
        )
        return request; 
    }

    this.updateSale = (sale) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}`,
                date: sale
            }
        )
        return request; 
    }

    this.deleteSale = (sale) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/sales/${sale.id}`
            }
        )
        return request; 
    }

    this.salesSumBySeller = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/sum-by-seller`
            }
        )
        return request; 
    }

    this.salesSuccessBySeller = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/success-by-seller`
            }
        )
        return request; 
    }
})