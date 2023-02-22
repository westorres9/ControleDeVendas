app.service('ReportService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080';
    $ctrl.generateReport = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/report/download`,
            }
        )
        return request; 
    }
});