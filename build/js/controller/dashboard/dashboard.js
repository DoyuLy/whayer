define(["domReady!", "app", "jquery", "highcharts", "template"], function (doc, app, $, Highcharts, template) {
    $(window).resize(function () {
        resizeChart();
    });
    function resizeChart() {
        var height = ($("#content").height() - 20) / 2;
        if (height > 270) {
            $("#container1,#container2,#container3,#container4").height(height);
        }
    }

    var dashboard = {
        init: function () {
            var _this = this;
            template.load("/controller/dashboard", function(doc){
                app.region.contentRegion = $("#content");
                app.region.contentRegion.html(doc);
                _this.initChart();
            });
        },
        initChart: function () {
            resizeChart();
            $('#container1').highcharts({
                colors:["#FFDA0E","#41FFF9","#6EA8FF"],               
                credits:{enabled:false},
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    align:"left",
                    text: '设备在线率'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: [
                        ['在线',45.0],
                        ['离线', 26.8],
                        ['未知', 26.8]
                    ]
                }]
            });

            $('#container2').highcharts({  
                colors:["#FF0000","#1417FF"],              
                credits:{enabled:false},
                title: {
                    align:"left",
                    text: '系统负荷'
                },
                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                },
                yAxis: {
                    title: {
                        text: '系统负载'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '%'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: '内存',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                }, {
                    name: 'CPU',
                    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                }]
            });
           
            $('#container3').highcharts({
                colors:["#CE3737","#F0C63E","#57E041"],               
                credits:{enabled:false},
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    align:"left",
                    text: '设备故障率'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: [
                        ['故障',20.8],
                        ['正常',48.5],
                        {
                            name: '未知',
                            y: 38.8,
                            sliced: true,
                            selected: true
                        }
                    ]
                }]
            });

            $('#container4').highcharts({   
                colors:["#57E041","#1417FF"],              
                credits:{enabled:false},
                chart: {
                    type: 'column'
                },
                title: {
                    align:"left",
                    text: '视频故障类别'
                },
                xAxis: {
                    categories: ['清晰度', '亮度', '偏色', '冻结', '信号丢失']
                },
                yAxis: {
                    allowDecimals: false,
                    min: 0,
                    title: {
                        text: '故障总数'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y + '<br/>' +
                            'Total: ' + this.point.stackTotal;
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: '设备A',
                    data: [5, 3, 4, 7, 2],
                    stack: 'male'
                }]
            });
        }
    };
    return dashboard;
});