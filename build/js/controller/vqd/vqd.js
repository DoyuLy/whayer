define(["template","jquery","layer","bootstrap_table","bootstrap_slider"],function(template,$,layer,bootstrap_table,Slider){
	var vqd={
		init:function(){
			var _this = this;
			require(["bootstrap_table_zh"],function(){				
				template.load(["/controller/vqd"],function(vqd_content_tmpl){
					 $("#content").html(vqd_content_tmpl);
					_this.attatchEvent();
					_this.initVQDtab(0);
				});
			});
		},
		attatchEvent:function(){
			var _this = this;
			$("#vqdTab li a").on("click",function(e){
				var index = $(e.currentTarget).parent().index();
				_this.initVQDtab(index);
			});
			$("#addDiagnose").on("click",function(){
				_this.addDiagnose();
			});
			$("#addProject").on("click",function(){
				_this.addProject();
			});
		},
		addDiagnose:function(){
			template.load(["/modal/addDiagnose"],function(addDiagnose_tmpl){
				var content = addDiagnose_tmpl[0];
				layer.open({
					title:"新增算法",
					content:content,
					area:"420px",type:1,
					btn:["保存","取消"],
					yes:function(layero){
						layer.close(layero);
						layer.msg("保存算法名称");
					}
				});
			});
		},
		addProject:function(){
			template.load(["/modal/addProject"],function(addProject_tmpl){
				var content = addProject_tmpl[0];
				layer.open({
					title:"新增方案配置",
					content:content,
					area:"480px",
					type:1,
					btn:["保存","取消"],
					yes:function(layero){
						layer.close(layero);
						layer.msg("保存方案配置");
					}
				});
			});
		},
		initVQDtab:function(index){
			var _this = this;
			if(index==0){_this.initParamConfig();}
			else if(index==1){_this.initprojectConfig();}
			else{_this.initDiagnose();}
		},
		initParamConfig:function(){
			var _this = this;
			var data=[
				{"id": 0, "algorithmName": "清晰度检测算法", "configOption": "配置项1","sensitiveNum":"敏感度1","enableAdvanced":"是"},
				{"id": 1, "algorithmName": "", "configOption": "配置项2","sensitiveNum":"敏感度2","enableAdvanced":"是"},
				{"id": 2, "algorithmName": "", "configOption": "配置项3","sensitiveNum":"敏感度3","enableAdvanced":"是"},
				{"id": 3, "algorithmName": "亮度检测算法", "configOption": "配置项1","sensitiveNum":"敏感度1","enableAdvanced":"是"},
				{"id": 4, "algorithmName": "", "configOption": "配置项2","sensitiveNum":"敏感度2","enableAdvanced":"是"}
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
				/*return [
		            '<a class="algorithmNameAdd" href="javascript:void(0)" title="新增">',
		            '<i class="glyphicon glyphicon-edit"></i>',
		            '</a>  ',
		            '<a class="algorithmNameEdit" href="javascript:void(0)" title="编辑">',
		            '<i class="glyphicon glyphicon-user"></i>',
		            '</a>',
		            '<a class="algorithmNameDelete" href="javascript:void(0)" title="删除">',
		            '<i class="glyphicon glyphicon-remove"></i>',
		            '</a>'
		        ].join('');*/

		        return [
		            '<button type="button"  class="btn btn-success btn-sm mr5 algorithmNameAdd">新增</button>',
		            '<button type="button"  class="btn btn-info btn-sm mr5 algorithmNameEdit">编辑</button>',
		            '<button type="button"  class="btn btn-danger btn-sm mr5 algorithmNameDelete">删除</button>',
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
			function operateFormatter2(){
				/*return [
		            '<a class="algorithmNameAdd" href="javascript:void(0)" title="新增">',
		            '<i class="glyphicon glyphicon-edit"></i>',
		            '</a>  ',
		            '<a class="algorithmNameEdit" href="javascript:void(0)" title="编辑">',
		            '<i class="glyphicon glyphicon-user"></i>',
		            '</a>',
		            '<a class="algorithmNameDelete" href="javascript:void(0)" title="删除">',
		            '<i class="glyphicon glyphicon-remove"></i>',
		            '</a>'
		        ].join('');*/

		        return [
		            '<button type="button"  class="btn btn-success btn-sm mr5 algorithmConfigAdd">新增配置</button>',
		            '<button type="button"  class="btn btn-info btn-sm mr5 algorithmEdit">编辑</button>',
		            '<button type="button"  class="btn btn-danger btn-sm mr5 algorithmDelete">删除</button>',
		        ].join('');
			};

			var operateEvents2 = {
				'click .algorithmConfigAdd': function (e, value, row, index) {
			        template.load(["/modal/addDiagnoseConfig"],function(addDiagnoseConfig_tmpl){
						var content = addDiagnoseConfig_tmpl[0];
						layer.open({
							title:"新增参数配置",
							content:content,
							area:"500px",
							btn:["保存","取消"],
							success:function(){
								var slider = new Slider('#sensitivity1', {
									value: [40,60],
									formatter: function(value) {
										return '当前值: ' + value;
									}
								});
							},
							yes:function(){
								layer.msg("保存参数配置");
							}
						});
					});
			    },
			    'click .algorithmEdit': function (e, value, row, index) {
			        template.load(["/modal/addDiagnose"],function(addDiagnoseConfig_tmpl){
						var content = addDiagnoseConfig_tmpl[0];
						layer.open({
							title:"编辑算法",
							content:content,
							area:"500px",
							btn:["保存","取消"],
							success:function(){
								
							},
							yes:function(){
								layer.msg("编辑算法");
							}
						});
					});
			    },
			    'click .algorithmDelete': function (e, value, row, index) {
			        layer.open({
			        	title:"提示",
			        	content:"是否删除该算法?",
			        	btn:["确定","取消"],
			        	yes:function(){
			        		layer.msg("删除算法");
			        	}
			        });
			    }
			};

			var $congfigTable = $("#configTable");
			$congfigTable.bootstrapTable({
				cache:false, striped: true,search:true,
		        pagination:"true",
		        sidePagination:'client',
		        pageSize:10,pageList:[10,20],pageNumber:1,
		        queryParams:queryParams,
		        columns: [{
		            field: 'id', title: 'ID',visible:false
		        }, { field: 'algorithmName', title: '算法名称'
		        }, { field: 'configOption', title: '配置项'
		        }, {field:'sensitiveNum', title:'敏感度'          	
		        }, { field:'enableAdvanced',title:'是否启用高级组件'          	
		        }, {field:'operation',title:'配置项操作',align:"center", 
		            formatter: operateFormatter,
		            events: operateEvents
		        },{field:"algorithmOperation",title:"算法操作",
		        	formatter: operateFormatter2,
		            events: operateEvents2
		        }],
		        data:data,
		        onLoadSuccess:function(data){
		        	
		        },onLoadError:function(status, res){

		        }
			});
			/*mergeCells*/
			var arr = {
				field:["algorithmName","algorithmOperation"],
				index:[{index:0,rowspan:3},{index:3,rowspan:2}]
			};
			var index = arr["index"];
			for (var i = 0; i < index.length; i++) {
				var field =  arr["field"];
				for (var j = 0; j < field.length; j++) {
					$congfigTable.bootstrapTable('mergeCells', {
		        		index:index[i]["index"],
		        		field:field[j],
		        		rowspan:index[i]["rowspan"]
		        	});
				}				
			};
		},
		initprojectConfig:function(){
			var data=[
				{"id": 0, "projectName": "视频方案1", "definition": "清晰度配置1","Brightness":"亮度配置1","ColorRendition":"偏色配置1","videoLock":"视频冻结配置1","signalLost":"信号丢西配置1"},
				{"id": 1, "projectName": "视频方案2", "definition": "清晰度配置2","Brightness":"亮度配置2","ColorRendition":"偏色配置2","videoLock":"视频冻结配置2","signalLost":"信号丢西配置2"},
				{"id": 2, "projectName": "视频方案3", "definition": "清晰度配置3","Brightness":"亮度配置3","ColorRendition":"偏色配置3","videoLock":"视频冻结配置3","signalLost":"信号丢西配置3"},
				{"id": 3, "projectName": "视频方案4", "definition": "清晰度配置4","Brightness":"亮度配置4","ColorRendition":"偏色配置4","videoLock":"视频冻结配置4","signalLost":"信号丢西配置4"},
				{"id": 4, "projectName": "视频方案5", "definition": "清晰度配置5","Brightness":"亮度配置5","ColorRendition":"偏色配置5","videoLock":"视频冻结配置5","signalLost":"信号丢西配置5"}
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
		            '<button type="button"  class="btn btn-info btn-sm mr5 projectNameEdit">编辑</button>',
		            '<button type="button"  class="btn btn-danger btn-sm mr5 projectNameDelete">删除</button>',
		        ].join('');
			};
			var operateEvents = {
			    'click .projectNameDelete': function (e, value, row, index) {
			        layer.open({
			        	title:"提示",
			        	content:"是否删除该方案?",
			        	btn:["确定","取消"],
			        	yes:function(){
			        		layer.msg("删除方案");
			        	}
			        });
			    },
			    'click .projectNameEdit': function (e, value, row, index) {
			        template.load(["/modal/addProject"],function(addProject_tmpl){
						var content = addProject_tmpl[0];
						layer.open({
							title:"编辑方案配置",
							content:content,
							area:"480px",
							type:1,
							btn:["保存","取消"],
							success:function(){
								//inital form data
							},
							yes:function(layero){
								layer.close(layero);
								layer.msg("保存方案配置");
							}
						});
					});
			    }
			};
			var $projectTable = $("#projectTable");
			$projectTable.bootstrapTable({
				cache:false, striped: true,search:true,
		        pagination:"true",
		        sidePagination:'client',
		        pageSize:10,pageList:[10,20],pageNumber:1,
		        queryParams:queryParams,
		        columns: [{
		            field: 'id', title: 'ID',visible:false
		        }, { field: 'projectName', title: '方案名称'
		        }, { field: 'definition', title: '清晰度'
		        }, {field:'Brightness', title:'亮度'          	
		        }, { field:'ColorRendition',title:'偏色'   
		        }, { field:'videoLock',title:'视频冻结'    
		        }, { field:'signalLost',title:'信号丢失'     	
		        }, {field:'operation',title:'操作',align:"center", 
		            formatter: operateFormatter,
		            events: operateEvents
		        }],
		        data:data,
		        onLoadSuccess:function(data){
		        	
		        },onLoadError:function(status, res){

		        }
			});
		},
		initDiagnose:function(){
			var data=[
				{"id": 0, "TaskName": "视频诊断任务1", "timeschedule": "时间方案1","diagnoseProject":"视频诊断算法方案1","groupName":"设备组1,设备组2","priority":"2","enabled":"是"},
				{"id": 1, "TaskName": "视频诊断任务2", "timeschedule": "时间方案2","diagnoseProject":"视频诊断算法方案2","groupName":"设备组1","priority":"1","enabled":"是"}
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
		            '<button type="button"  class="btn btn-info btn-sm mr5 diagnoseEdit">编辑</button>',
		            '<button type="button"  class="btn btn-danger btn-sm mr5 diagnoseDelete">删除</button>',
		        ].join('');
			};
			var operateEvents = {
			    'click .diagnoseDelete': function (e, value, row, index) {
			        layer.msg("删除参数配置");
			    },
			    'click .diagnoseEdit': function (e, value, row, index) {
			        layer.msg("编辑参数配置");
			    }
			};
			var $taskTable = $("#taskTable");
			$taskTable.bootstrapTable({
				cache:false, striped: true,search:true,
		        pagination:"true",
		        sidePagination:'client',
		        pageSize:10,pageList:[10,20],pageNumber:1,
		        queryParams:queryParams,
		        columns: [{
		            field: 'id', title: 'ID',visible:false
		        }, { field: 'TaskName', title: '任务名称'
		        }, { field: 'timeschedule', title: '时间方案'
		        }, {field:'diagnoseProject', title:'视频诊断算法方案'          	
		        }, { field:'groupName',title:'目标设备组'   
		        }, { field:'priority',title:'优先级'    
		        }, { field:'enabled',title:'是否启用'     	
		        }, {field:'operation',title:'操作',align:"center", 
		            formatter: operateFormatter,
		            events: operateEvents
		        }],
		        data:data
			});
		}
	};
	return vqd;
});