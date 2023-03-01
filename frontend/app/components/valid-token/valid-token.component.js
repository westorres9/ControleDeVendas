function ValidTokenComponentController(RecoverService,toaster,$location) {
    var $ctrl = this;

    $ctrl.getToken = () => {
        var url = $location.url();
        var token = url.substring(19)
        console.log(token)
        RecoverService.validToken(token).then((response) => {
            console.log(response.data)
            $ctrl.user = response.data;
            $ctrl.popSuccess();
            toaster.clear($ctrl.popSuccess);
            window.location.href = `index.html#/${$ctrl.user.id}/reset-password`;
        }).
        catch((error) => {
            console.log(error);
            $ctrl.popError();
            toaster.clear($ctrl.popError)
        })

        $ctrl.popSuccess = function () {
            toaster.pop({ type: 'success', body: 'token validado', toasterId: 1 });
        }
              
        $ctrl.popError = function () {
            toaster.pop({ type: 'error', body: 'token expirado', toasterId: 2 });
        }
    }
}
app.component('validToken', {
    templateUrl:'components/valid-token/valid-token.component.html',
    controller: ValidTokenComponentController,
})