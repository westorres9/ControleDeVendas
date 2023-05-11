function SellerController(ReportService, SellerService, toaster) {
  var $ctrl = this;

  $ctrl.generateReportSellers = () => {
    ReportService.generateReportSellers().then((response) => {
      var archive = document.createElement("a");
      archive.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(response.data);
      archive.target = '_blank';
      archive.download = 'sellers.csv';
      document.body.appendChild(archive);
      archive.click();
    })
  }

  $ctrl.selectFile = (file) => {
    $ctrl.file = file;
    return $ctrl.file;
  }

  $ctrl.uploadFile = () => {
    var file = $ctrl.selectFile($ctrl.file);
    var formdata = new FormData();
    formdata.append('file', file);
    ReportService.uploadSellerCSV(formdata).then((response) => {
      console.log(response.data, "upload realizado com sucesso");
      $ctrl.getSellers();
    })
      .catch((error) => {
        console.log(error.status, "erro ao fazer upload")
      })
  }

  $ctrl.getSellers = () => {
    SellerService.getSellers().then((response) => {
      console.log(response.data)
      $ctrl.sellers = response.data;
    })
  }

  $ctrl.$onInit = () => {
    $ctrl.getSellers();
  }

  $ctrl.selectToDelete = (seller) => {
    $ctrl.showWarning();
    $ctrl.seller = seller
    console.log($ctrl.seller);
    return $ctrl.seller;
  }

  $ctrl.deleteSeller = (seller) => {
    SellerService.deleteSellerById(seller).then((response) => {
      console.log(response.data);
      $ctrl.closeWarning();
      $ctrl.getSellers();
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

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Vendedor deletado com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Vendedor', toasterId: 2 });
  }


}

app.component("sellers", {
  templateUrl: "pages/sellers/sellers.component.html",
  controller: SellerController
});
