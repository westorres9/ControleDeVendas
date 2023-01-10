myapp.service('TeamService' ,function($http) {
    const BASE_URL = "http://localhost:8080";

    this.getAllTeams = () => {
        const request = $http(
            {
                method: 'get',
                url: `${BASE_URL}/teams`,
            } 
        )
        return request;
    };



    this.insertTeam = (team) => {
        
        const request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/teams`,
                data: team
            }
        )
        return request;
    }

    this.updateTeam = (team) => {
        
        const request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/teams/${team.id}`,
                data: team
            }
        )
        return request;
    }

    this.deleteTeam = (team) => {
        const request = $http(
            {
                method: 'delete',
                url: `${BASE_URL}/teams/${team.id}`,
            }
        )
        return request;
    }

})