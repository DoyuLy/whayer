define(["template","jquery","highcharts","bootstrap_table"],function(template,$,highcharts){
	var videoQuality = { 
		treeNode:null,
		init:function(node){
			var _this = this;
			_this.treeNode = node;
			require(["bootstrap_table_zh"],function(){
				template.load(["/controller/statusmonitor/videoQuality"],function(videoQualityTmpl){
					 $("#videoQuality").html(videoQualityTmpl[0]);
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
			$("#btnvideoQualitySwitch").on("click",function(e){
				$(".tablevideoQualitySwitch").toggleClass("hidden");
			});
		},
		updateNode:function(node){
			this.treeNode = node;
            this.initCharts();
		},
		resizeChart:function(){
			var _this = this;
			/*20px为查询条件高度*/
			var height = ($(".statusmonitor").height() - 140-20)/2;
			var width = $("#smTabContent").width();
			$("#vqLevel,#vqRate,#vqDeviceRate,#vqCategory").width(width/2);
	        if (height<200) {
	        	height = 200;
	        }
	        $("#vqLevel,#vqRate,#vqDeviceRate,#vqCategory").height(height);
		},
		initCharts:function(){
			var _this = this;
			_this.resizeChart();

			var vqLevelData = [['轻度',290],['中度', 120],['重度', 40],['正常', 550]];
            $('#vqLevel').highcharts({  
            	colors:["#04FB18","#FC7F2B","#FFC029","#FC7B23"],           
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
                    text: '视频质量故障严重等级图'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            layout: 'vertical',
                    align: 'bottom',
                    verticalAlign: 'middle',
                    borderWidth: 0,
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
                            distance: -10,
                            format: '{point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: vqLevelData
                }]
            }); 

            var vqRateData = [['正常',550],['无法诊断', 310],['掉线', 40],['故障', 100]];
            $('#vqRate').highcharts({  
            	colors:["#04FB18","#51FDD0","#FFC029","#FC7B23"],           
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
                    text: '视频质量故障比例图'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            layout: 'vertical',
                    align: 'bottom',
                    verticalAlign: 'middle',
                    borderWidth: 0,
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
                            distance: -10,
                            format: '{point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: vqRateData
                }]
            }); 

            var vqDeviceRateData = [['3种及以上',50],['2种故障', 130],['1种故障', 270],['0个故障', 550]];
            $('#vqDeviceRate').highcharts({  
            	colors:["#D9FD01","#E9C42E","#FD9728","#FF4343"],           
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
                    text: '故障视频设备比例图'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            layout: 'vertical',
                    align: 'bottom',
                    verticalAlign: 'middle',
                    borderWidth: 0,
		            y: 20,
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
                            distance: -10,
                            format: '{point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: vqDeviceRateData
                }]
            }); 

            var vqCategoryData = [['清晰度',550],['亮度', 270],['偏色', 90],['冻结', 50],['信号丢失', 50]];
            $('#vqCategory').highcharts({  
            	colors:["#8BFE00","#2DE8E0","#18ADFD","#9DD6F3","#FF7D3F"],           
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
                    text: '视频质量故障类别图'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            layout: 'vertical',
                    align: 'bottom',
                    verticalAlign: 'middle',
                    borderWidth: 0,
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
                            distance: -10,
                            format: '{point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '百分比',
                    data: vqCategoryData
                }]
            }); 
		},
		initTable:function(){

		}
	};
	return videoQuality;
});