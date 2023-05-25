app.service('CategoryService', function($http) {

    var $ctrl = this;

    $ctrl.getCategories = () => {
        var request = $http(
            {
                method: 'get',
                url: `/categories`
            }
        )
        return request; 
    }

    $ctrl.getCategoryById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/categories/${id}`
            }
        )
        return request; 
    }

    $ctrl.insertCategory = (category) => {

        var request = $http(
            {
                method: 'post',
                url: `/categories`,
                data: category
            }
        )
        return request; 
    }

    $ctrl.updateCategory = (category) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/categories/${category.id}`,
                data: category
            }
        )
        return request; 
    }

    $ctrl.deleteCategoryById =  (category) => {
        
        var request = $http(
            {
                method: 'delete',
                url: `/categories/${category.id}`
            }
        )
        return request; 
    }
    
} )