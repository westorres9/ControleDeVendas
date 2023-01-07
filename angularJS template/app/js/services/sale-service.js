myapp.service('SaleService' ,function($http) {
    const BASE_URL = "http://localhost:8080";

    this.getAllSales = (page,size,minDate,maxDate) => {
        const request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/sales/?page=${page}&size=${size}&minDate=${minDate}&maxDate=${maxDate}`,
            } 
        )
        return request;
    };

    this.insertSale = (sale) => {
        
        const request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/sales`,
                data: sale
            }
        )
        return request;
    }

    this.updateSale = (sale) => {
        
        const request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/sales/${sale.id}`,
                data: sale
            }
        )
        return request;
    }

    this.deleteSale = (sale) => {
        const request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/sales/${sale.id}`,
            }
        )
        return request;
    }

})