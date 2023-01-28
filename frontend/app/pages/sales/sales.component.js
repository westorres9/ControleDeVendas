function SalesController(SaleService) {
  var $ctrl = this;
  $ctrl.AllSales = [];
  $ctrl.page = 0;
  $ctrl.name = '';
  $ctrl.minDate = new Date();
  $ctrl.maxDate = new Date();
  $ctrl.isOpen = false;
  
  

  $ctrl.getAllSales = () => {
    SaleService.getAllSales().then((response) => {
      console.log(response.data.content);
      $ctrl.AllSales = response.data.content;
    });
  };

  $ctrl.$onInit = () => {
    $ctrl.getAllSales();
  };

  $ctrl.$onChanges = () =>{
    console.log($ctrl.minDate )
    console.log($ctrl.maxDate )
  }

};

app.component("sales", {
  templateUrl: "pages/sales/sales.component.html",
  controller: SalesController,
});
