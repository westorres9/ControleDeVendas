app.service('ReportService', function($http) {

    var $ctrl = this;

    $ctrl.generateReportSales = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `/report/download/sales`,
            }
        )
        return request; 
    }

    $ctrl.generateReportSellers = () => {
        
        var request = $http(
            {
                method: 'get',
                url: `/report/download/sellers`,
            }
        )
        return request; 
    }

    $ctrl.generateReportManagers = () => {

        var request = $http(
            {
                method: 'get',
                url: `/report/download/managers`
            }
        )
        return request
    }

    $ctrl.uploadSellerCSV = (formdata) => {
        var request = $http(
            {
                method: 'post',
                url: `/report/upload/sellers`,
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
                url: `/report/upload/images`,
                headers: { 'Content-Type': undefined},
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request;
    }
});