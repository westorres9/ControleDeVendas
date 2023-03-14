function SellerController(ReportService,SellerService, Upload) {
  var $ctrl = this;

   $ctrl.generateReportSellers = () => {
    ReportService.generateReportSellers().then((response) => {
      var archive =document.createElement("a");
                    archive.href ='data:attachment/csv;charset=utf-8,' + encodeURI(response.data);
                    archive.target ='_blank';
                    archive.download ='sellers.csv';
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
      $ctrl.getSellers();
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


}

app.component("sellers", {
  templateUrl: "pages/sellers/sellers.component.html",
  controller: SellerController
});
