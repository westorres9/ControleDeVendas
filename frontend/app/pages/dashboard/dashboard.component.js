function DashboardController() {
    var $ctrl = this;
  }
  
  app.component("dashboard", {
    templateUrl: "pages/dashboard/dashboard.component.html",
    controller: DashboardController
  })