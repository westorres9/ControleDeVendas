function WSChildController() {
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.mudarValor = mudarValor;

    function $onInit() {
        $ctrl.text = 'wschild'
        $ctrl.props = 'propriedades do componente filho'
    }

}

myapp.component('wsChild', {
    templateUrl:'components/ws-child/wschild.html',
    controller: WSChildController,
    bindings: {
        props: '=',
    }
})