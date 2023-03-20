function NewCategoryComponentController(CategoryService, $location, toaster) {
    var $ctrl = this;

    $ctrl.insertCategory = () => {
        CategoryService.insertCategory($ctrl.category).then((response) => {
            console.log(response.data);
            $ctrl.popSuccess();  
        }).catch((error) => {
            console.log(error.status);
            $ctrl.popError();
        })
    }

    $ctrl.returnToPageCategories = () => {
        $location.path("/admin/categories")
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'success', body: 'Categoria cadastrada com sucesso', toasterId: 1 });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao cadastrar categoria', toasterId: 2 });
    }
}

app.component('newCategory', {
    templateUrl:'components/new-category/new-category.component.html',
    controller: NewCategoryComponentController,
})