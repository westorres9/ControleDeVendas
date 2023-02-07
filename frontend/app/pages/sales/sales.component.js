function SalesController(SaleService) {
  var $ctrl = this;
  $ctrl.AllSales = [];
  $ctrl.page= {};
  $ctrl.isOpen = false;
  $ctrl.warningVisible = false;

  var size = 12;
  var page = 0;

  var minDate = '2022-01-01';
  var maxDate = '2022-12-31';
  $ctrl.minDate = minDate;
  $ctrl.maxDate = maxDate;

  $ctrl.resetPage = () => {
    page = 0;
    $ctrl.getAllSales(page, size);
  }

  $ctrl.nextPage = () => {
    page = page + 1;
    $ctrl.getAllSales(page, size);
  }

  $ctrl.previousPage = () => {
    page = page - 1;
    if(page < 0) return;
    console.log(page);
    $ctrl.getAllSales(page, size);
  }

  $ctrl.getAllSales = (page, size) => {
    // $ctrl.minDate
    // $ctrl.maxDate
    SaleService.getAllSales(page, size, $ctrl.minDate, $ctrl.maxDate).then((response) => {
        $ctrl.page = response.data;
        console.log('page', $ctrl.page);
        $ctrl.AllSales = response.data.content;
        console.log('sales', $ctrl.AllSales);
    });
  };

  $ctrl.onChangeDate = () => {
    $ctrl.getAllSales(page, size,$ctrl.minDate, $ctrl.maxDate);
  }

  $ctrl.getAllSales(page, size,$ctrl.minDate, $ctrl.maxDate);

  $ctrl.selectSale = (sale) => {
    $ctrl.sale = sale;
    console.log($ctrl.sale);
    window.location.href = `index.html#/admin/sales/${sale.id}`;
    return $ctrl.sale;
  }

  $ctrl.deleteSale = (sale) => {
    SaleService.deleteSale(sale).then((response) => {
      console.log(response.data);
      $ctrl.getAllSales(page, size);
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

  $ctrl.selectToDelete = (sale) => {
    $ctrl.showWarning();
    $ctrl.sale = sale;
    console.log($ctrl.sale);
    return $ctrl.sale
  }
}

app.component("sales", {
  templateUrl: "pages/sales/sales.component.html",
  controller: SalesController,
  bindings: {
    onChangeDate: '&'
  }
});
