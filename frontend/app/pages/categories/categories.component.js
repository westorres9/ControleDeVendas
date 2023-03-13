function CategoryController(CategoryService){
  var $ctrl = this;

  $ctrl.getCategories = () => {
    CategoryService.getCategories().then((response) => {
      console.log(response.data)
      $ctrl.categories = response.data;
    })
  }

  $ctrl.$onInit = () => {
    $ctrl.getCategories();
  }
  
}


app.component("categories", {
  templateUrl: "pages/categories/categories.component.html",
  controller: CategoryController
});