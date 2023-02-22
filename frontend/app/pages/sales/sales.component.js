function SalesController(SaleService, ReportService) {
  var $ctrl = this;
  $ctrl.AllSales = [];
  $ctrl.isOpen = false;
  $ctrl.warningVisible = false;

  $ctrl.size = 12;
  $ctrl.page = 0;
  let mindate = '2022-01-01';
  let maxdate = '2022-12-31';
  $ctrl.mindate = mindate;
  $ctrl.maxdate = maxdate;

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

  $ctrl.getAllSales = () => {
    // $ctrl.minDate
    // $ctrl.maxDate
    SaleService.getAllSales($ctrl.page, $ctrl.size, $ctrl.mindate, $ctrl.maxdate).then((response) => {
        $ctrl.AllSales = response.data.content;
        console.log('sales', $ctrl.AllSales);
    });
  };

  $ctrl.onChangeDate = () => {
    $ctrl.getAllSales($ctrl.page, $ctrl.size,$ctrl.mindate, $ctrl.maxdate); 
  }

  $ctrl.$onInit = () => {
    $ctrl.getAllSales($ctrl.page, $ctrl.size,$ctrl.mindate, $ctrl.maxdate);
  }


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

  $ctrl.loggedUser = '';

    $ctrl.GetLoggedUser = () => {
        const username = AuthService.getUsername();
        const authority = AuthService.getAuthority();
        const role = authority[0].authority;
        console.log(role)
        $ctrl.loggedUser = {name: username, authority: role}
        console.log($ctrl.loggedUser);
  }
  
  $ctrl.generateReport = () => {
    ReportService.generateReport().then((response) => {
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
