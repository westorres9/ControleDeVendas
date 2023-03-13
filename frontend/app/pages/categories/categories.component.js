function CategoryController(CategoryService){
  var $ctrl = this;

  $ctrl.getCategories = () => {
    CategoryService.getCategories().then((response) => {
      console.log(response.data)
      $ctrl.categories = response.data;
    })
  }

  $ctrl.selectToDelete = (category) => {
    $ctrl.showWarning();
    $ctrl.category = category
    console.log($ctrl.category);
    return $ctrl.category;
  }

  $ctrl.deleteCategory = (category) => {
    CategoryService.deleteCategoryById(category).then((response) => {
      console.log(response.data);
      $ctrl.getCategories();
      $ctrl.closeWarning();
    }).catch((error) => {
      console.log(error.status)
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
  
}


app.component("categories", {
  templateUrl: "pages/categories/categories.component.html",
  controller: CategoryController
});