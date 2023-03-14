function NewCategoryComponentController(CategoryService, $window) {
    var $ctrl = this;

    $ctrl.insertCategory = () => {
        CategoryService.insertCategory($ctrl.category).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageCategories();
        }).catch((error) => {
            console.log(error.status);
        })
    }

    $ctrl.returnToPageCategories = () => {
        window.location.href = "index.html#/admin/categories"
    }
}

app.component('newCategory', {
    templateUrl:'components/new-category/new-category.component.html',
    controller: NewCategoryComponentController,
})