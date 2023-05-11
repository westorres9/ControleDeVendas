function UpdateCategoryComponentController(CategoryService, $routeParams,$location, toaster) {
  var $ctrl = this;

  $ctrl.updateCategory = () => {  
    CategoryService.updateCategory($ctrl.category).then((response) => {
        console.log(response.data);
        $ctrl.popSuccess();
    }).catch((error) => {
        console.log(error);
        $ctrl.popError();
    });
}

$ctrl.getCategoryById = (id) => {
  CategoryService.getCategoryById(id).then((response) => {
    console.log(response.data);
    $ctrl.category = response.data;
  })
} 

$ctrl.returnToPageCategories = () => {
  $location.path("/admin/categories");
}

$ctrl.popSuccess = function () {
  toaster.pop({ type: 'note', body: 'Categoria atualizada com sucesso', toasterId: 1 });
}
    
$ctrl.popError = function () {
  toaster.pop({ type: 'error', body: 'Erro ao atualizar categoria', toasterId: 2 });
}

$ctrl.$onInit = () => {
  $ctrl.getCategoryById($routeParams.id);
}
}

app.component("updateCategory", {
  templateUrl: "components/update-category/update-category.component.html",
  controller: UpdateCategoryComponentController
});
