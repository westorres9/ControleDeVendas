app.service('UploadService',function($http) {

    var $ctrl = this;

    const BASE_URL = 'http://localhost:8080'

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

    $ctrl.updateUserImage = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}/image`,
                data: user
            }
        )
        return request; 
    }
})