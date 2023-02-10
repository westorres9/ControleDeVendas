function DatePickerController(SaleService) {
    var $ctrl = this;
    $ctrl.isOpen = false;
    moment.locale('en');

    $ctrl.setMinDate = (mindate) => {
        $ctrl.mindate =  moment(mindate).format('YYYY-MM-DD');
        console.log('mindate atualizado no componente', $ctrl.mindate);
        $ctrl.onPeriodChange({
            mindate: $ctrl.mindate,
            maxdate: $ctrl.maxdate
        });
    }

    $ctrl.setMaxDate = (maxdate) => {

        $ctrl.maxdate = moment(maxdate).format('YYYY-MM-DD');
        console.log('maxdate atualizado no componente', $ctrl.maxdate);
        $ctrl.onPeriodChange({
            mindate: $ctrl.mindate,
            maxdate: $ctrl.maxdate
        });
    }

}
app.component('datePicker', {
    templateUrl: 'components/date-picker/date-picker.component.html',
    controller: DatePickerController,
    bindings: {
        mindate: '=',
        maxdate: '=',
        onPeriodChange: '&'
    }
})