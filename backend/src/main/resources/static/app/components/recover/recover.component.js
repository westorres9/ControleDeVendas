function RecoverComponentController(RecoverService,toaster) {
    var $ctrl = this;


    
    $ctrl.RecoverAccount = (email) => {
        console.log(email)
        RecoverService.getUserEmail(email).then((response) => {
            console.log(response);
            $ctrl.popSuccess();
            toaster.clear($ctrl.popSuccess);
        }).
        catch((error) => {
            console.log(error);
            $ctrl.popError();
            toaster.clear($ctrl.popError)
        })

        $ctrl.popSuccess = function () {
            toaster.pop({ type: 'success', body: 'Redefiniçao de senha enviado com sucesso', toasterId: 1 });
        }
              
        $ctrl.popError = function () {
            toaster.pop({ type: 'error', body: 'Usuario nao encontrado', toasterId: 2 });
        }
    }

}
app.component('recover', {
    templateUrl:'components/recover/recover.component.html',
    controller: RecoverComponentController,
})