function DatePickerController(SaleService) {
    var $ctrl = this;
    $ctrl.isOpen = false;
    moment.locale('en');

    $ctrl.setMinDate = (minDate) => {
        $ctrl.minDate =  moment(minDate).format('YYYY-MM-DD');
        console.log('mindate atualizado no componente', $ctrl.minDate);
        $ctrl.onChanges({
            minDate: $ctrl.minDate,
            maxDate: $ctrl.maxDate
        });
    }

    $ctrl.setMaxDate = (maxDate) => {

        $ctrl.maxDate = moment(maxDate).format('YYYY-MM-DD');
        console.log('mindate atualizado no componente', $ctrl.maxDate);
        $ctrl.onChanges({
            minDate: $ctrl.minDate,
            maxDate: $ctrl.maxDate
        });
    }

}
app.component('datePicker', {
    templateUrl: 'components/date-picker/date-picker.component.html',
    controller: DatePickerController,
    bindings: {
        minDate: '=',
        maxDate: '=',
        onChanges: '&'
    }
})