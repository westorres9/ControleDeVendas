function SalesController(SaleService, ReportService, $location, toaster) {
  var $ctrl = this;
  $ctrl.sales = [];
  $ctrl.isOpen = false;
  $ctrl.warningVisible = false;
  $ctrl.page = 0;
  $ctrl.sale = {}

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
    SaleService.deleteSale($ctrl.sale).then((response) => {
      console.log(response.data)
      $ctrl.getAllSales(page, size);
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

  $ctrl.selectToDelete = (sale) => {
    $ctrl.sale = sale;
    console.log($ctrl.sale)
    $ctrl.showWarning();
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

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Venda deletada com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Venda', toasterId: 2 });
  }
}



app.component("sales", {
  templateUrl: "pages/sales/sales.component.html",
  controller: SalesController,
});
