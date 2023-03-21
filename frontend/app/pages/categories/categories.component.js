function CategoryController(CategoryService, toaster){
  var $ctrl = this;

  $ctrl.getCategories = () => {
    CategoryService.getCategories().then((response) => {
      $ctrl.categories = response.data;
    })
  }

  $ctrl.selectToDelete = (category) => {
    $ctrl.showWarning();
    $ctrl.category = category
    return $ctrl.category;
  }

  $ctrl.deleteCategory = (category) => {
    CategoryService.deleteCategoryById(category).then((response) => {
      $ctrl.getCategories();
      $ctrl.closeWarning();
      $ctrl.popSuccess();
    }).catch((error) => {
      console.log(error.status);
      $ctrl.popError();
    })
  }

  $ctrl.showWarning = () => {
    $ctrl.warningVisible = true;
  }

  $ctrl.closeWarning = () => {
    $ctrl.warningVisible = false;
  }

  $ctrl.$onInit = () => {
    $ctrl.getCategories();
  }

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Categoria deletada com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Categoria', toasterId: 2 });
  }
  
}


app.component("categories", {
  templateUrl: "pages/categories/categories.component.html",
  controller: CategoryController
});