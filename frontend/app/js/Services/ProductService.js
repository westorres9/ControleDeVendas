app.service('ProductService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getProducts = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/products`
            }
        )
        return request; 
    }

    $ctrl.getProductsById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/products/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertProduct = (product) => {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/products`,
                data: product
            }
        )
        return request; 
    }

    $ctrl.updateProduct = (product) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/products/${product.id}`,
                data: product
            }
        )
        return request; 
    }

    $ctrl.deleteProductById =  (product) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/products/${product.id}`
            }
        )
        return request; 
    }

    $ctrl.getMostSoldProducts = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/products/most-sold`
            }
        )
        return request; 
    }
    
} )