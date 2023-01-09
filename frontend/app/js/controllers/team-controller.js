myapp.controller('teamCtrl', function (TeamService, $log) {
    vm = this;
    vm.title = 'Equipes'
    vm.GetAllTeams = GetAllTeams;
    vm.nextPage = nextPage;
    vm.previousPage = previousPage;
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
    


    function nextPage() {
        page = page + 1;
        GetAllTeams();
    }

    function previousPage() {
        page = page - 1;
        if(page < 0) {
            page = 0
            GetAllTeams();
        }
        else {
            GetAllTeams();
        }
        
    }

    function GetAllTeams() {

        TeamService.getAllTeams()
            .then((response) => {
                vm.teams = response.data.content;
                console.log(vm.teams);
                var teamName = [];
                vm.teams.forEach(x => teamName.push(x.name))
                console.log(teamName)

              Highcharts.chart('containerTeam', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: `Vendas da Equipe ${vm.teams[0].name}`
                    },
                    subtitle: {
                        text: `Vendas entre periodo`
                    },
                    xAxis: {
                        categories: 'Equipes',
                        crosshair:true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: `Total de vendas`
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.1,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Vendedores',
                        colorByPoint: true,
                        data: [{
                            name: 'Bradesco',
                            y: 5,
                            drilldown: 'vendedores'
                        }, {
                            name: 'Santander',
                            y: 2,
                            drilldown: 'vendas'
                        }, {
                            name: 'Picpay',
                            y: 4,
                            drilldown: 'vendas'
                        },{
                            name: 'Vivo',
                            y: 4,
                            drilldown: 'vendas'
                        }
                    ]
                    }],
                    drilldown: {
                        series: [{
                            id: 'vendedores',
                            data: [
                                ['Ana',  15608],
                                ['Bob',  3254],
                                ['Charlie',  4575],
                                ['Maria',  9875],
                                ['Eddie',  412],
                            ]
                        }, {
                            id: 'fruits',
                            data: [
                                ['Apples', 4],
                                ['Oranges', 2]
                            ]
                        }, {
                            id: 'cars',
                            data: [
                                ['Toyota', 4],
                                ['Opel', 2],
                                ['Volkswagen', 2]
                            ]
                        }]
                    }
                })    
            }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    GetAllTeams();

    function SelectTeam(team) {
        ShowForm();
        vm.team = team;
        console.log(vm.team);
        return vm.team;
    }

    function InsertTeam () {
        var team = vm.team;
        var insertTeam = TeamService.insertTeam(team);
        insertTeam.then(function(response) {
            console.log(response.data)
            CloseFormNew();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateTeam(team) {
        var team = vm.team;
        var updateTeam = TeamService.updateTeam(team);
        updateTeam.then(() => {
            CloseForm();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteTeam(team) {
        vm.team = SelectToDelete(team);
        var deleteTeam = TeamService.deleteTeam(vm.team);
        deleteTeam.then(() => {
            CloseWarning();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

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

    function SelectToDelete(team) {
        ShowWarning();
        vm.team = team;
        console.log(vm.team)
        return vm.team;
    }

    

})