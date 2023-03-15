function UpdateCategoryComponentController(CategoryService, $routeParams,$location) {
  var $ctrl = this;

  $ctrl.updateCategory = () => {  
    CategoryService.updateCategory($ctrl.category).then((response) => {
        console.log(response.data);
        $location.url();
        $ctrl.returnToPageCategories();
    }).catch((error) => {
        console.log(error)
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

$ctrl.$onInit = () => {
  $ctrl.getCategoryById($routeParams.id);
}
}

app.component("updateCategory", {
  templateUrl: "components/update-category/update-category.component.html",
  controller: UpdateCategoryComponentController
});
