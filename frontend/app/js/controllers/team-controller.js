myApp.controller('teamCtrl', function(TeamService) {
    vm = this;
    vm.title = 'teamCtrl'
    vm.GetAllTeams = GetAllTeams;
    vm.SelectTeam = SelectTeam;
    vm.InsertTeam = InsertTeam;
    vm.UpdateTeam = UpdateTeam;
    vm.DeleteTeam = DeleteTeam;
    vm.ShowForm = ShowForm;
    vm.CloseForm = CloseForm;
    vm.ShowFormNew = ShowFormNew;
    vm.CloseFormNew = CloseFormNew;
    vm.ShowWarning = ShowWarning;
    vm.CloseWarning = CloseWarning;
    vm.SelectToDelete = SelectToDelete;
    var formNewVisible = false;
    vm.formNewVisible = formNewVisible;
    var formVisible = false;
    vm.formVisible = formVisible;
    var warningVisible = false;
    vm.warningVisible = warningVisible;

    function ShowWarning() {
        vm.warningVisible = true;
        console.log('warningVisible', vm.warningVisible)
    }

    function CloseWarning () {
        vm.warningVisible = false;
        console.log('warningVisible', vm.warningVisible)
    }

    function ShowFormNew() {
        vm.formNewVisible = true;
        console.log('formNewVisible', vm.formNewVisible)
    }

    function CloseFormNew() {
        vm.formNewVisible = false
        console.log('formNewVisible', vm.formNewVisible)
    }

    function ShowForm() {
        vm.formVisible = true;
        console.log('formVisible', vm.formVisible)
    }

    function CloseForm() {
        vm.formVisible = false
        console.log('formVisible', vm.formVisible)
    }

    function GetAllTeams() {
        var getAllTeams = TeamService.getAllTeams();
        getAllTeams.then(function (response) {
            vm.teams = response.data.content;
            var teamNames = [];
            vm.teams.forEach(x => teamNames.push(x.name));
            console.log('teamNames',teamNames)
            vm.teamNames = teamNames;

            Highcharts.chart('container4', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Vendas por Equipe em 2022'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: teamNames[0],
                        y: 74.77,
                        sliced: true,
                        selected: true
                    },  {
                        name: teamNames[1],
                        y: 12.82
                    },  {
                        name: teamNames[3],
                        y: 4.63
                    }
                ]
                }]
            });

            console.log(vm.teams)
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400) {
                window.location.href = '/index.html#/login';
            }
        })
    }
    GetAllTeams();

    function SelectTeam(team) {
        ShowForm();
        vm.team = team;
        console.log(vm.team);
        return vm.team;
    }

    function SelectToDelete(team) {
        ShowWarning();
        vm.team = team;
        console.log(vm.team);
        return vm.team;
    }

    function InsertTeam () {
        var team = vm.team;
        var insertTeam = TeamService.insertTeam(team);
        insertTeam.then(function(response) {
            console.log(response.data)
            vm.teams = response.data.content;
            CloseFormNew();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateTeam (team) {
        var team = vm.team;
        var updateTeam = TeamService.updateTeam(team);
        updateTeam.then(function(response) {
            console.log(response.data);
            CloseForm();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
        GetAllTeams();
    }

    function DeleteTeam(team) {
        vm.team = SelectToDelete(team);
        var deleteTeam = TeamService.deleteTeam(team);
        deleteTeam.then(function(response) {
            vm.teams = response.data.content;
            CloseWarning();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
})