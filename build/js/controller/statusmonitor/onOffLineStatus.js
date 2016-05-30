define(["template","jquery","highcharts","bootstrap_table"],function(template,$,highcharts){
	var onOffLineStatus = {
		treeNode:null,
		init:function(node){
			var _this = this;
			_this.treeNode = node;
			require(["bootstrap_table_zh"],function(){
				template.load(["/controller/statusmonitor/onOffLineStatus"],function(onOffLineStatusTmpl){
					 $("#onOffLineStatus").html(onOffLineStatusTmpl[0]);
					 _this.attatchEvent();	
					 _this.initCharts();
					 _this.initTable();			
				});
			});
		},
		attatchEvent:function(){
			var _this = this;
			$(window).resize(function () {
		        _this.resizeChart();
		    });
			$("#btnonOffLineSwitch").on("click",function(e){
				$(".tableonOffLineSwitch").toggleClass("hidden");
			});
		},
		updateNode:function(node){
			this.treeNode = node;
			this.initCharts();
		},
		resizeChart:function(){
			var _this = this;
			/*25px为设备类型高度*/
			var height = $(".statusmonitor").height() - 140-25;
			var width = $("#smTabContent").width();
			//$("#onOffLineStatus").width(width);
			$("#onlineRate,#onlineCount").width(width/2);
	        $("#onlineRate,#onlineCount").height(height);
		},
		initCharts:function(){
			var _this = this;
			_this.resizeChart();
			var onlineRateData = [ ['在线',800],['离线', 486], ['未知', 286]];
            $('#onlineRate').highcharts({
                colors:["#58E041","#D63E3E","#c5d"],            
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
                    align:"center",
                    text: '在离线率'
                },
                tooltip: {
                    pointFormat: '{series.name}:<b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            layout: 'vertical',
                    align: 'bottom',
                    verticalAlign: 'middle',
		            labelFormatter:function(){
		            	return this.name+'('+this.y+"个)";
		            }
		        },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        showInLegend: true,
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                chart:{
                	events:{
	                	load:function(){
				            //this.redraw();
	                	}
	                }
                },
                series: [{
                    type: 'pie',
                    name: '总数',
                    data: onlineRateData
                }]
            });

            var series = [{type:"column",name: '未知', data: [25, 59]}, {
		        	type:"column",name: '离线', data: [30, 40]},{
		        	type:"column",name: '在线',data: [500, 398]
		        },{type: 'pie',name:"个数",
		            data: [{ name:'未知', y: 25,color: Highcharts.getOptions().colors[0]
		            }, {name:'离线',  y: 30,color: Highcharts.getOptions().colors[1]
		            }, {name:'在线', y: 500,color: Highcharts.getOptions().colors[2]
		            }],
		            center: [30, 0],size: 120
		        },{type: 'pie',name:"个数",
		            data: [{name:'未知',y: 59,color: Highcharts.getOptions().colors[0]
		            }, {name:'离线',y: 40,color: Highcharts.getOptions().colors[1]
		            }, {name:'在线',y: 398,color: Highcharts.getOptions().colors[2]
		            }],
		            center: [300, 0],
		            size: 120
		        }];

            $('#onlineCount').highcharts({
            	credits:{enabled:false},
		        chart: {
		            type: 'column'
		        },
		        title: {
		        	align:"center",
		            text: '在离线总数'
		        },
		        xAxis: {
		            /*categories: ['编码器', '视频设备', '环境量', '门禁系统', '消防系统']*/
		            categories: ['DVR', 'IPC']
		        },
		        yAxis: {
		            allowDecimals: false,
		            min: 0,
		            title: {
		                text: '在离线总数(/次)'
		            }
		        },
		        tooltip: {
		            formatter: function() {
		                return '<b>'+ this.key +'</b><br/>'+
		                    this.series.name +': '+ this.y;
		            }
		        },
		        plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        showInLegend: false,
                        dataLabels: {
                            enabled: true,
                            distance: -10,
                            format: '{point.percentage:.1f} %'
                        }
                    },
                    column:{
                    	dataLabels:{
                    		enabled: true,
                    		format: this.y
                    	}
                    }
                },
		        series: series
		    });
		},
		initTable:function(){

		}
	};
	return onOffLineStatus;
});