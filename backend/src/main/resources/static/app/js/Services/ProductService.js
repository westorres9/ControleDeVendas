app.service('ProductService', function($http) {

    var $ctrl = this;
    
    $ctrl.getProducts = () => {
        var request = $http(
            {
                method: 'get',
                url: `/products`
            }
        )
        return request; 
    }

    $ctrl.getProductsById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/products/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertProduct = (product) => {

        var request = $http(
            {
                method: 'post',
                url: `/products`,
                data: product
            }
        )
        return request; 
    }

    $ctrl.updateProduct = (product) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/products/${product.id}`,
                data: product
            }
        )
        return request; 
    }

    $ctrl.deleteProductById =  (product) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/products/${product.id}`
            }
        )
        return request; 
    }

    $ctrl.getMostSoldProducts = (mindate, maxdate) => {
        
        var request = $http(
            {
                method: 'get',
                url: `/products/most-sold`,
                params: {
                    'minDate': mindate,
                    'maxDate': maxdate
                }
            }
        )
        return request; 
    }
    
} )