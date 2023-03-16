function SalesController(SaleService, ReportService, $location) {
  var $ctrl = this;
  $ctrl.sales = [];
  $ctrl.isOpen = false;
  $ctrl.warningVisible = false;
  $ctrl.page = 0;

  $ctrl.resetPage = () => {
    $ctrl.page = 0;
    $ctrl.getAllSales($ctrl.page, $ctrl.size);
  }

  $ctrl.nextPage = () => {
    $ctrl.page = $ctrl.page + 1;
    $ctrl.getAllSales($ctrl.page, $ctrl.size);
  }

  $ctrl.previousPage = () => {
    $ctrl.page = $ctrl.page - 1;
    if($ctrl.page < 0) {
      $ctrl.page = 0;
    }
    console.log($ctrl.page);
    $ctrl.getAllSales($ctrl.page, $ctrl.size);
  }

  $ctrl.getSales = () => {
    SaleService.getSales($ctrl.page).then((response) => {
        $ctrl.sales = response.data.content;
    });
  };

  $ctrl.onChangeDate = () => {
    $ctrl.getAllSales($ctrl.page, $ctrl.size,$ctrl.mindate, $ctrl.maxdate); 
  }

  $ctrl.$onInit = () => {
    $ctrl.getSales();
  }


  $ctrl.selectSale = (sale) => {
    $ctrl.sale = sale;
    $location(`index.html#/admin/sales/${sale.id}`);
    return $ctrl.sale;
  }

  $ctrl.deleteSale = (sale) => {
    SaleService.deleteSale(sale).then((response) => {
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
    return $ctrl.sale
  }

  $ctrl.loggedUser = '';

    $ctrl.GetLoggedUser = () => {
        const username = AuthService.getUsername();
        const authority = AuthService.getAuthority();
        const role = authority[0].authority;
        $ctrl.loggedUser = {name: username, authority: role}
  }
  
  $ctrl.generateReport = () => {
    ReportService.generateReportSales().then((response) => {
      var archive =document.createElement("a");
                    archive.href ='data:attachment/csv;charset=utf-8,' + encodeURI(response.data);
                    archive.target ='_blank';
                    archive.download ='sales.csv';
                    document.body.appendChild(archive);
                    archive.click();
    })
  }
}



app.component("sales", {
  templateUrl: "pages/sales/sales.component.html",
  controller: SalesController,
});
