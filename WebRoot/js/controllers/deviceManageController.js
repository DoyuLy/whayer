/**
 * Created by duyu on 2016/4/20.
 */
define(['jquery', 'underscore', 'template', 'handlebars', 'util', 'bootstrap', 'bootstrap_table'],
    function ($, _ , template, handlebars) {
    var deviceManage = {
        $table: null,
        reqdev: {
            getdevurl: '/device/getDeviceList',
            deletedevurl: '/device/deleteDevice',
            adddevurl: '/device/addDevice',
            updatadevurl: '/device/updataDevice',
            devtypesurl: '/device/getDeviceTypes',
            getCabineturl: '/device/getCabinet',
            getconfigdev: '/device/getDeviceByID',
            configdev: '/device/configDevice',
            titles: {
                addDev: '添加设备',
                addChildDev: '添加子设备',
                editDev: '编辑设备'
            },
            parent: null,//当前父设备
            devtypes: null,//设备类型列表
            typecombobox: null,
            Cabinetid: "none"
        },
        init: function(){
            var _this = this;
            template.load('/manage/manage', function(content){
                if(content != undefined){
                    //debugger;
                    $('#content').html(handlebars.compile(content)({}));
                    _this.attachEvent();
                }
            });
            //初始化页面
            this.initPage();
        },
        attachEvent: function(){
            var _this = this;
            require(['domReady!'], function (doc) {

                $(".createdev").bind("click", function () { _this.showModal(_this.reqdev.titles.addDev); });
                $('.submit').bind("click", _this.submitclick);
                $('.configsubmit').bind("click", _this.configsubmitclick);

                $('#buttondelete').click(function () {
                    var sids = $.map(_this.$table.bootstrapTable('getSelections'), function (row) {
                        return row.id;
                    });
                    if (sids == null || sids.length == 0) return;

                    if (confirm('确定删除该设备及相关内容?')) {
                        //$.ajax({
                        //    url: reqdev.url + reqdev.methods.DelDevices,
                        //    data:$.param({ 'ids': sids },true),
                        //    success: function (data) {
                        //        $table.bootstrapTable('remove', { field: 'id', values: sids });
                        //    },
                        //    error: function (data) {
                        //        alert(reqdev.methods.DelDevice + ": error" + data);
                        //    }
                        //});
                    }
                });
            });
        },
        initPage: function(){
            var _this = this;
            $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
            this.reqdev.typecombobox = $('#dropdownGropRoots').combobox();
            this.getDeviceTypes(),//获取设备类型
            $modal = $('#modal').modal({ show: false }),
            $configModal = $('#ModelConfig').modal({ show: false });

            Whayer.ajax(this.reqdev.getCabineturl, null, 'POST', function (data) {
                if (data.length > 0) {
                    _this.reqdev.Cabinetid = data[0].id;
                    _this.$table = $('#deviceTable').bootstrapTable({ url: _this.reqdev.getdevurl });//所有设备
                }
            });

        },

        //查询设备类型
        getDeviceTypes: function (parent_type) {
            var _this = this;
            Whayer.ajax(this.reqdev.devtypesurl, { parent_type: parent_type }, 'POST', function (data) {
                _this.reqdev.devtypes = data;
                _this.initDevtypelist(data);
            });
        },
        initDevtypelist: function (ops) {
            $('#dropdownGropRoots').empty();
            if (ops != null && ops.length > 0) {
                for (var i = 0; i < ops.length; i++) {
                    var op = document.createElement("option");
                    op.value = ops[i].id;
                    op.innerHTML = ops[i].type_desc;
                    $('#dropdownGropRoots').append(op);
                }
            }
            this.reqdev.typecombobox.combobox('refresh');
        }
    };

    return deviceManage;
});