define(["domReady!","template","layer","highcharts"], function (doc,template,layer,highcharts) {
    var state = {
        init: function () {
        	var _this = this;
            template.load("/controller/maintenance", function (_doc) {
                $("#content").html(_doc);
            	_this.attatchEvent();
            	_this.initTabData(0);
            });
        },
        attatchEvent:function(){
        	var _this = this;
        	//$('#maintenanceTab li:eq(3) a').tab('show');
        	$("#maintenanceTab li").on("click",function(e){
        		_this.tabClick(e);
        	});
        	$(window).resize(function () {
		        _this.resizeChart();
		    });
        },
        resizeChart:function(){
        	var height = ($("#content").height() - 20) / 2;
	        if (height > 270) {
	            $("#diskstatus_errorTrend,#diskstatus_errorRate").height(height);
	        }
        },
        tabClick:function(e){
        	var _this = this;
        	e.preventDefault();
    		var layero = layer.load(0,{shade: 0});
    		var cur_index = $(e.currentTarget).index();
    		setTimeout(function(){
    			layer.close(layero);
    			_this.initTabData(cur_index);
    		},2000);
        },
        initTabData:function(cur_index){
        	var _this = this;
        	_this.resizeChart();
        	if(cur_index==0){_this.initDiskStatus();}
        	else if(cur_index==1){_this.initOnlineRate();}	
        	else if(cur_index==2){_this.initTunnelStatus();}	
        	else if(cur_index==3){_this.initVideoQuality();}
        	else{}
        },
        initDiskStatus:function(){
        	/*硬盘故障趋势图*/
        	$('#diskstatus_errorTrend').highcharts({  
                colors:["#FF0000","#1417FF"],              
                credits:{enabled:false},
                title: {
                    text: '硬盘故障率趋势图'
                },
                xAxis: {
                    categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016']
                },
                yAxis: {
                    title: {
                        text: '硬盘故障率趋势图(%)'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: 'red'
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
                    name: '海康',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2]
                }, {
                    name: '大华',
                    data: [10.0, 0.8, 5.7, 11.3, 17.0, 22.0,33]
                }]
            });

        	/*硬盘故障率对比图*/ 
            $('#diskstatus_errorRate').highcharts({
            	colors:["#57E041","#1417FF"],              
                credits:{enabled:false},
		        chart: {
		            type: 'column'
		        },
		        title: {
		            text: '硬盘故障率对比图'
		        },
		        legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
		        xAxis: {
		            categories: ['2010', '2011', '2012', '2013', '2014']
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '硬盘故障率对比图(%)'
		            }
		        },
		        series: [{
		            name: '大华',
		            data: [5, 3, 4, 7, 2]
		        }, {
		            name: '海康',
		            data: [2, -2, -3, 2, 1]
		        }]
		    });
        },
        initOnlineRate:function(){

        },
        initTunnelStatus:function(){

        },
        initVideoQuality:function(){

        }
    };
    return state;
});