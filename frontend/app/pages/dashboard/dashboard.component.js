function DashboardController() {
  var $ctrl = this;
  moment.locale('pt-br');
  let maxdate = Date.now();
  let mindate = Date.now();
  $ctrl.mindate = mindate
  $ctrl.maxdate = maxdate


  $ctrl.$onInit = () => {

    $ctrl.maxdate = moment(maxdate).format('YYYY-MM-DD');
    var dateMinusOneMonth = moment(mindate).subtract(360, 'days');
    $ctrl.mindate = moment(dateMinusOneMonth).format('YYYY-MM-DD');
    console.log($ctrl.maxdate)
    console.log($ctrl.mindate)
  }

  $ctrl.$onChanges = () => {
    $ctrl.mindate = moment(mindate).format('YYYY-MM-DD');
    $ctrl.maxdate = moment(maxdate).format('YYYY-MM-DD');
    console.log('alterado mindate',$ctrl.mindate);
    console.log('alterado maxdate',$ctrl.maxdate);
  }
}

app.component("dashboard", {
  templateUrl: "pages/dashboard/dashboard.component.html",
  controller: DashboardController
})