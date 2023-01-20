myapp.controller('teamCtrl', function (TeamService) {
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
    vm.SalesSumBySeller = SalesSumBySeller;
    vm.SalesSumByTeam = SalesSumByTeam;
    vm.SalesSucessBySeller = SalesSuccessBySeller;
    vm.salesbySeller = [];
    vm.salesbyTeam = [{}];
    vm.salesSuccess = [];
    vm.teams = [];
    var dataToFirstGraph =[];
    var dataToDrilldown =[];

    function init() {
        SalesSumBySeller();
        SalesSumBySeller();
        SalesSumByTeam();
    }
    init();

    function SalesSuccessBySeller() {
        return TeamService.salesSuccessBySeller().then(response => {
            vm.salesSuccess = response.data;
            console.log('Sales success',vm.salesSuccess )
        });
    }
    


    function SalesSumBySeller() {
        return TeamService.salesSumBySeller().then(response => {
            vm.salesbySeller = response.data;
            console.log('Sales sum by seller',vm.salesbySeller)
            
        })
    }
    

    function SalesSumByTeam() {
        return TeamService.salesSumByTeam().then(response => {
            vm.salesbyTeam = response.data;
            console.log('Sales sum by team',vm.salesbyTeam)
        })}
    

    function nextPage() {
        page = page + 1;
        GetAllTeams();
    }

    function previousPage() {
        page = page - 1;
        if (page < 0) {
            page = 0
            GetAllTeams();
        }
        else {
            GetAllTeams();
        }
    }

    function GetAllTeams() {
        return TeamService.getAllTeams()
            .then( response => {
                vm.teams = response.data.content;
                console.log('get All Sales', vm.teams)
            });
    }
    GetAllTeams();

    function SelectTeam(team) {
        ShowForm();
        vm.team = team;
        console.log(vm.team);
        return vm.team;
    }

    function InsertTeam() {
        var team = vm.team;
        var insertTeam = TeamService.insertTeam(team);
        insertTeam.then(function (response) {
            console.log(response.data)
            CloseFormNew();
            GetAllTeams();
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateTeam(team) {
        var team = vm.team;
        var updateTeam = TeamService.updateTeam(team);
        updateTeam.then(() => {
            CloseForm();
            GetAllTeams();
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteTeam(team) {
        vm.team = SelectToDelete(team);
        var deleteTeam = TeamService.deleteTeam(vm.team);
        deleteTeam.then(() => {
            CloseWarning();
            GetAllTeams();
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function ShowWarning() {
        vm.warningVisible = true;
        console.log('warningVisible', vm.warningVisible)
    }

    function CloseWarning() {
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

    
    function Charts() {
        var teamnames = []
        var teamsum = []
        
        TeamService.salesSumByTeam().then(response => {
            vm.salesbyTeam = response.data;
            console.log('Sales sum by team',vm.salesbyTeam)
            vm.salesbyTeam.forEach(x => dataToFirstGraph.push({name: x.teamName, y: x.sum, drilldown: true}));
            vm.salesbyTeam.forEach(x => teamnames.push(x.teamName))
            vm.salesbyTeam.forEach(x => teamsum.push(x.sum))
            console.log('teamnames', teamnames)
            console.log('teamsum', teamsum)
            console.log('dataToFirstGraph', dataToFirstGraph )
        })

        TeamService.salesSumBySeller().then(response => {
            vm.salesbySeller = response.data;
            console.log('Sales sum by seller',vm.salesbySeller);
            vm.salesbySeller.forEach(x => dataToDrilldown.push({name: x.sellerName, data: [['sum', x.sum]]}));
            console.log('dataToDrillDrown', dataToDrilldown)
        })

        Highcharts.chart('containerTeam', {
            chart: {
                type: 'column',
                events: {
                    drilldown: function (e) {
                        if (!e.seriesOptions) {
        
                            var chart = this,
                                drilldowns = {
                                    Animals: {
                                        name: 'Animals',
                                        data: [
                                            ['Cows', 2],
                                            ['Sheep', 3]
                                        ]
                                    },
                                    Fruits: {
                                        name: 'Fruits',
                                        data: [
                                            ['Apples', 5],
                                            ['Oranges', 7],
                                            ['Bananas', 2]
                                        ]
                                    },
                                    Cars: {
                                        name: 'Cars',
                                        data: [
                                            ['Toyota', 1],
                                            ['Volkswagen', 2],
                                            ['Opel', 5]
                                        ]
                                    }
                                },
                                series = drilldowns[e.point.name];
        
                            // Show the loading label
                            chart.showLoading('Simulating Ajax ...');
        
                            setTimeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, series);
                            }, 1000);
                        }
        
                    }
                }
            },
            title: {
                text: 'Async drilldown'
            },
            xAxis: {
                type: 'category'
            },
        
            legend: {
                enabled: false
            },
        
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true
                    }
                }
            },
        
            series: [{
                name: 'Things',
                colorByPoint: true,
                data: [{
                    name: 'Animals',
                    y: 5,
                    drilldown: true
                }, {
                    name: 'Fruits',
                    y: 2,
                    drilldown: true
                }, {
                    name: 'Cars',
                    y: 4,
                    drilldown: true
                }]
            }],
        
            drilldown: {
                series: []
            }
        });  
    }       
    Charts();
})