app.service('ReportService', function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080';
    $ctrl.generateReportSales = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/report/download/sales`,
            }
        )
        return request; 
    }

    $ctrl.generateReportSellers = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/report/download/sellers`,
            }
        )
        return request; 
    }

    $ctrl.generateReportManagers = () => {

        var request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/report/download/managers`
            }
        )
        return request
    }

    $ctrl.uploadSellerCSV = (formdata) => {
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/report/upload/sellers`,
                headers: { 'Content-Type': undefined},
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request; 
    }

    $ctrl.uploadImage = (formdata) => {
        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/report/upload/images`,
                headers: { 'Content-Type': undefined},
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request;
    }
});