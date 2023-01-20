function WSContentController() {
    
    var $ctrl = this;   

    $ctrl.$onInit = $onInit;

    function $onInit() {
        $ctrl.text = 'wscontent'
        $ctrl.props = 'propriedade componente pai'
    }

    
}

myapp.component('wsContent', {
    templateUrl:'components/ws-content/wscontent.html',
    controller: WSContentController,
    bindings: {
        props: '='
    
    }
})