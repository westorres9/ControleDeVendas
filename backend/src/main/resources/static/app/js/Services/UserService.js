app.service('UserService', function ($http) {

    var $ctrl = this;

    $ctrl.getUserById = (id) => {
        var request = $http(
            {
                method: 'get',
                url: `/users/${id}`
            }
        )
        return request;
    }

    $ctrl.updateUser = (user) => {

        var request = $http(
            {
                method: 'put',
                url: `/users/${user.id}`,
                data: user
            }
        )
        return request;
    }

    $ctrl.updateUserImage = (user, formdata) => {

        var request = $http(
            {
                method: 'post',
                url: `/users/${user.id}/image`,
                headers: { 'Content-Type': undefined },
                data: formdata,
                transformRequest: angular.identity
            }
        )
        return request;
    }

    $ctrl.updateUserName = (user) => {

        var request = $http(
            {
                method: 'put',
                url: `/users/${user.id}/username`,
                data: user
            }
        )
        return request;
    }

    $ctrl.updateUserEmail = (user) => {

        var request = $http(
            {
                method: 'put',
                url: `/users/${user.id}/email`,
                data: user
            }
        )
        return request;
    }

    $ctrl.updateUserPassword = (user) => {

        var request = $http(
            {
                method: 'put',
                url: `/users/${user.id}/password`,
                data: user
            }
        )
        return request;
    }
})