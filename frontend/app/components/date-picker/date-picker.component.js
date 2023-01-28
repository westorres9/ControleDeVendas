function DatePickerController() {
    var $ctrl = this;
    $ctrl.isOpen = false;

    $ctrl.setMinDate = (minDate) => {
        $ctrl.minDate = minDate;
        console.log('mindate atualizado no componente', $ctrl.minDate);
    }

    $ctrl.setMaxDate = (maxDate) => {
        $ctrl.maxDate = maxDate;
        console.log('maxdate atualizado no componente',$ctrl.maxDate);
    }
 }
app.component('datePicker', {
    templateUrl: 'components/date-picker/date-picker.component.html',
    controller: DatePickerController,
    bindings: {
        minDate: '<',
        maxDate: '<'
    }
})