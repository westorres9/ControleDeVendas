function DatePickerController(SaleService) {
    var $ctrl = this;
    $ctrl.isOpen = false;  

    $ctrl.setMinDate = (minDate) => {
        moment.locale('en-ca')
        $ctrl.minDate =  moment(minDate).format('L');
        console.log('mindate atualizado no componente', $ctrl.minDate);
        $ctrl.onChanges({
            minDate: $ctrl.minDate,
            maxDate: $ctrl.maxDate
        });
    }

    $ctrl.setMaxDate = (maxDate) => {
        $ctrl.maxDate = moment(maxDate).format();
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