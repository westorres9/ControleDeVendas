app.service('CategoryService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

    $ctrl.getCategories = () => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/categories`
            }
        )
        return request; 
    }

    $ctrl.getCategoryById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/categories/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertCategory = (category) => {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/categories`,
                data: category
            }
        )
        return request; 
    }

    $ctrl.updateCategory = (category) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/categories/${category.id}`,
                data: category
            }
        )
        return request; 
    }

    $ctrl.deleteCategoryById =  (category) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/categories/${category.id}`
            }
        )
        return request; 
    }
    
} )