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
    vm.SalesSumBySeller = SalesSumBySeller;
    vm.SalesSumByTeam = SalesSumByTeam;
    vm.SalesSucessBySeller = SalesSuccessBySeller;

    vm.salesbySeller = [];
    vm.salesbyTeam = [];
    vm.salesSuccess = [];
    
    function SalesSuccessBySeller() {
        TeamService.salesSuccessBySeller().then(response => {
            vm.salesSuccess = response.data;
            console.log('Sales success',vm.salesSuccess )
        })
    }
    SalesSumBySeller();

    function SalesSumBySeller() {
        TeamService.salesSumBySeller().then(response => {
            vm.salesbySeller = response.data;
            console.log('Sales sum by seller',vm.salesbySeller)
        })
    }
    SalesSuccessBySeller();

    function SalesSumByTeam() {
        TeamService.salesSumByTeam().then(response => {
            vm.salesbyTeam = response.data;
            console.log('Sales sum by team',vm.salesbyTeam)
            let teams = [];
            let teamNames = [];
            let teamTotal = [];
            console.log(vm.salesbyTeam);
            vm.salesbyTeam.forEach(x => teams.push(x));
            vm.salesbyTeam.forEach(x => teamNames.push(x.teamName));
            vm.salesbyTeam.forEach(x => teamTotal.push(x.sum));
            vm.teams = teams;
            vm.teamNames = teamNames;
            vm.teamTotal = teamTotal;
            console.log('teams', vm.teams);
            console.log('teamNames', vm.teamNames);
            console.log('teamTotal', vm.teamTotal);
            function teamToDrillDown(name, y, drilldown) {
                this.name = name;
                this.y= y;
                this.drilldown = drilldown;
            }
            teamDrillDown = teamToDrillDown();
            let TeamsToDrillDown = [];
            vm.salesbyTeam.forEach(x => TeamsToDrillDown.push(new teamToDrillDown(x.teamName, x.sum, x.teamName)));   
            console.log(TeamsToDrillDown);         
            
            Highcharts.chart('containerTeam', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `Vendas das Equipes`
                },
                subtitle: {
                    text: `Vendas entre periodo`
                },
                xAxis: {
                    categories: vm.teamNames,
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
                series: [
                    {
                        name: 'Equipes',
                        data: TeamsToDrillDown,
            }],drilldown: {
                series: [
                    {
                        TeamsToDrillDown
                    }
                ]
            }
            })    
        }).catch(function(error) {
        console.log('ERROR: ' + error.status, error);
        })
    }
    SalesSumByTeam();

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

        vm.teams = TeamService.getAllTeams();
        
        TeamService.getAllTeams()
            .then((response) => {
                vm.teams = response.data.content;
                vm.sellers = response.data.content[0].sellers;
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