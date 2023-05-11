function ReportController(ReportService,Upload) {
    var $ctrl = this;
    $ctrl.generateReportSellers = generateReportSellers;

    function generateReportSellers() {
      ReportService.generateReportSellers().then((response) => {
        var archive =document.createElement("a");
                      archive.href ='data:attachment/csv;charset=utf-8,' + encodeURI(response.data);
                      archive.target ='_blank';
                      archive.download ='sellers.csv';
                      document.body.appendChild(archive);
                      archive.click();
      })
    }
  
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

    $ctrl.generateReportManagers = () => {
      ReportService.generateReportManagers().then((response) => {
        var archive =document.createElement("a");
                      archive.href ='data:attachment/csv;charset=utf-8,' + encodeURI(response.data);
                      archive.target ='_blank';
                      archive.download ='managers.csv';
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
}

app.component("reports", {
    templateUrl: "pages/reports/reports.component.html",
    controller: ReportController
  });