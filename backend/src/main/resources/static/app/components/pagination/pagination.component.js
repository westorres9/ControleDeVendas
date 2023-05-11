function PaginationController() {
    var $ctrl = this;

    $ctrl.pageNext = () => {
        page = page + 1;
        $ctrl.getAllSales(page, size);
        $ctrl.onChangeNext({
            page: $ctrl.pageNext(),
        });
      }
    
      $ctrl.pagePrevious = () => {
        page = page - 1;
        if(page < 0) return;
        console.log(page);
        $ctrl.getAllSales(page, size);
        $ctrl.onChangePrevious({
            page: $ctrl.pagePrevious(),
        });
      }

    $ctrl.onChanges({
        pagePrevious: $ctrl.pagePrevious(),
    });

}

app.component('pagination', {
    templateUrl:'components/pagination/pagination.component.html',
    controller: PaginationController,
    bindings: {
        pageNext: '&',
        pagePrevious: '&',
        onChangePrevious:'&',
        onChangeNext: '&'
    }
})