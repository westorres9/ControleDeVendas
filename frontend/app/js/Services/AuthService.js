app.factory('AuthService', AuthService);

function AuthService() {
    return {
        setToken: (token) => {
            window.localStorage.setItem('access_token', angular.toJson(token));
        },
        getToken: () => {
            const token = window.localStorage.getItem('access_token');
            return angular.fromJson(token);
        },
        removeToken: () => {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('Authority');
            window.localStorage.removeItem('UserName');
            window.localStorage.clear();
            window.location.href = ('')
        },
        setAuthority: (token) => {
            window.localStorage.setItem('Authority', angular.toJson(token));
        },
        getAuthority: () => {
            const token = window.localStorage.getItem('Authority');
            return angular.fromJson(token);
        },
        hasAnyRoles: (roles) => {
            if(roles.length === 0) {
                return true;
            }
        },
        setUsername: (user) => {
            window.localStorage.setItem('userName', angular.toJson(user));
        },
        getUsername: () => {
            const user = window.localStorage.getItem('userName');
            return angular.fromJson(user);
        },
        setUserId: (userId) => {
            window.localStorage.setItem('userId', angular.toJson(userId))
        },
        getUserId: () => {
            const userId = window.localStorage.getItem('userId');
            return angular.fromJson(userId);
        },
        setProfileImage: (token) => {
            window.localStorage.setItem('profileImage', angular.toJson(token));
        },
        getProfileImage: () => {
            const profileImage = window.localStorage.getItem('profileImage');
            return angular.fromJson(profileImage);
        }

    }
}
