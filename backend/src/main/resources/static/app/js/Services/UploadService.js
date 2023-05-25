app.service('UploadService',function($http) {

    var $ctrl = this;

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

    $ctrl.updateUserImage = (user) => {
        
        var request = $http(
            {
                method: 'put',
                url: `/users/${user.id}/image`,
                data: user
            }
        )
        return request; 
    }
})