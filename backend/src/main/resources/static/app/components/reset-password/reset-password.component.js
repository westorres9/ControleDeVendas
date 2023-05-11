function ResetPasswordComponentController(RecoverService,toaster,$location) {
    var $ctrl = this;

    $ctrl.getUserById = () => {
        
    }

}
app.component('resetPassword', {
    templateUrl:'components/reset-password/reset-password.component.html',
    controller: ResetPasswordComponentController,
    bindings: {
        user: '<'
    }
})