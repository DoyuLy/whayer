define(["template","jquery","highcharts","bootstrap_table"],function(template,$,highcharts){
	var diskStatus = {
		init:function(){
			var _this = this;
			template.load(["/controller/statusmonitor/diskStatus"],function(diskStatusTmpl){
				 $("#diskStatus").html(diskStatusTmpl);		
				 _this.attatchEvent();	
				 _this.initCharts();
				 _this.initTable();
			});
		},
		attatchEvent:function(){
			var _this = this;
			$(window).resize(function () {
		        _this.resizeChart();
		    });
			$("#btndiskSwitch").on("click",function(e){
				$(".tablaChartSwitch").toggleClass("hidden");
			});
		},
		resizeChart:function(){
			var _this = this;
			var height = $("#content").height() - 160;
	        if (height > 270) {
	            $("#diskType,#diskStorage").height(height);
	        }
		},
		initCharts:function(){
			var _this = this;
			_this.resizeChart();
			$('#diskType').highcharts({
                colors:["#FFDA0E","#41FFF9","#6EA8FF","#5BE3FF"],               
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
                    text: '硬盘类型'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            align: 'center',
		            verticalAlign: 'top',
		            x: 0,
		            y: 20
		        },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        showInLegend: true,
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
                        ['默认',51],
                        ['冗余', 31],
                        ['冗余', 13],
                        ['存档', 5]
                    ]
                }]
            });

            $('#diskStorage').highcharts({
                colors:["#D0E226","#F47827"],               
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
                    text: '硬盘使用空间'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                legend: {
		            align: 'center',
		            verticalAlign: 'top',
		            x: 0,
		            y: 20
		        },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        showInLegend: true,
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
                        ['未占用',69],
                        ['已占用', 31]
                    ]
                }]
            });
		},
		initTable:function(){
			var data=[
				{"id": 0, "deviceName": "DVR001", "deviceEncode": "11504391","deviceType":"DVR1","diskNum":"硬盘索引1","diskType":"读写驱动器","usedPercent":"","diskSpace":"0","freeSpace":"0","diskStatus":"硬盘故障","errorTime":"2016-03-14 21:15:30"},
				{"id": 1, "deviceName": "DVR001", "deviceEncode": "11504391","deviceType":"DVR1","diskNum":"硬盘索引2","diskType":"读写驱动器","usedPercent":"30","diskSpace":"70","freeSpace":"700","diskStatus":"正常","errorTime":""},			
				{"id": 2, "deviceName": "DVR002", "deviceEncode": "11504392","deviceType":"DVR2","diskNum":"硬盘索引1","diskType":"读写驱动器","usedPercent":"30","diskSpace":"70","freeSpace":"700","diskStatus":"正常","errorTime":""},	
				{"id": 3, "deviceName": "DVR002", "deviceEncode": "11504393","deviceType":"DVR2","diskNum":"硬盘索引2","diskType":"读写驱动器","usedPercent":"30","diskSpace":"70","freeSpace":"700","diskStatus":"正常","errorTime":""},	
				{"id": 4, "deviceName": "DVR002", "deviceEncode": "11504394","deviceType":"DVR2","diskNum":"硬盘索引3","diskType":"读写驱动器","usedPercent":"30","diskSpace":"70","freeSpace":"700","diskStatus":"正常","errorTime":""},	
				{"id": 5, "deviceName": "DVR002", "deviceEncode": "11504395","deviceType":"DVR2","diskNum":"硬盘索引4","diskType":"读写驱动器","usedPercent":"30","diskSpace":"70","freeSpace":"700","diskStatus":"正常","errorTime":""}
			];
			function queryParams(queryParams){
				return {
					limit:params.limit,
			        offset:params.offset,
			        total:params.total,
			        name:params.searchText
				}
			};
			function operateFormatter(){
		        return [
		            '<button type="button"  class="btn btn-success btn-sm mr5 algorithmNameAdd">维修单</button>',
		            '<button type="button"  class="btn btn-info btn-sm mr5 algorithmNameEdit">编辑</button>'
		        ].join('');
			};
			var operateEvents = {
				'click .algorithmNameAdd': function (e, value, row, index) {
			        layer.msg("新增参数配置");
			    },
			    'click .algorithmNameDelete': function (e, value, row, index) {
			        layer.msg("编辑参数配置");
			    },
			    'click .algorithmNameEdit': function (e, value, row, index) {
			        layer.msg("删除参数配置");
			    }
			};
			var $diskTable = $("#diskTable");
			$diskTable.bootstrapTable({
				cache:false, striped: true,
		        pagination:"true",
		        sidePagination:'client',
		        pageSize:10,pageList:[10,20],pageNumber:1,
		        queryParams:queryParams,
		        columns: [{
		            field: 'id', title: 'ID',visible:false
		        }, { field: 'deviceName', title: '设备名称'
		        }, { field: 'deviceEncode', title: '设备编码'   
		        }, { field: 'deviceType', title: '设备类型'  
		        }, {field:'diskNum', title:'硬盘索引'    	
		        }, { field:'diskType',title:'硬盘类型'       
		        }, { field:'usedPercent',title:'使用百分比'    
		        }, { field:'diskSpace',title:'硬盘容量(MB)'    
		        }, { field:'freeSpace',title:'剩余容量(MB)' 
		        }, { field:'diskStatus',title:'硬盘状态' 	
		    	}, { field:'errorTime',title:'故障时间' 
		        }, {field:'diskSpace',title:'操作',align:"center", 
		            formatter: operateFormatter,
		            events: operateEvents
		        }],
		        data:data,
		        onLoadSuccess:function(data){
		        	
		        },onLoadError:function(status, res){

		        }
			});
			/*mergeCells*/
			var arr = {
				field:["deviceName","deviceEncode","deviceType"],
				index:[{index:0,rowspan:2},{index:2,rowspan:4}]
			};
			var index = arr["index"];
			for (var i = 0; i < index.length; i++) {
				var field =  arr["field"];
				for (var j = 0; j < field.length; j++) {
					$diskTable.bootstrapTable('mergeCells', {
		        		index:index[i]["index"],
		        		field:field[j],
		        		rowspan:index[i]["rowspan"]
		        	});
				}				
			}
		}
	};
	return diskStatus;
});