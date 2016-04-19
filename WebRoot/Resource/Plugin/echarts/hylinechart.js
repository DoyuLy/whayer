!function ($) {
    var HYLineChart = function (element, options) {
        this.element = $(element);
        var hasOptions = typeof options == 'object';
        if (hasOptions) {
        }
        this.type = $.fn.hylinechart.defaults.type;
        this.element.html($(DRPGlobal.template));
    }
    HYLineChart.prototype = {
        constructor: HYLineChart,
        setPosition: function (option) {
            initlinechart(option);
        }
    }
    HYLineChart.prototype.setPosition = initlinechart;
    var mylineChart = null;

    function initlinechart(data) {
        if (!mylineChart) {
            mylineChart = echarts.init(document.getElementById('linechart'));
            mylineChart.on('click', function (params) {
                alert($.param(params, true).toString());
            });
        }
        mylineChart.setOption(
            {
                title: {
                    text: data.title,
                    subtext: data.subtitle
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: data.legends
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { show: true, readOnly: true },
                        restore: { show: true },
                        saveAsImage: { show: true },
                        magicType: {
                            show: true,
                            type: ['bar', 'line', 'stack', 'tiled']
                        },
                        myTool1: {
                            show: true,
                            title: '自定义扩展方法1',
                            icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                            onclick: function () {
                                alert('myToolHandler1')
                            }
                        }
                    }
                },
                xAxis: data.xAxis,
                yAxis: data.yAxis,
                series: data.series
            }
            );
    }
    $.fn.hylinechart = function (option) {
        return this.each(function () {
            var $this = $(this),
                    data = $this.data('hylinechart'),
                    options = typeof option == 'object' && option;
            if (!data) {
                $this.data('hylinechart', new HYLineChart(this, $.extend({}, $.fn.hylinechart().defaults, options)));
            }
            initlinechart(options);
        });

    };
    $.fn.hylinechart.defaults = {
        type:"line"
    };
    $.fn.hylinechart.Constructor = HYLineChart;
    var DRPGlobal = {};
    DRPGlobal.template = '<div id="linechart" style="width:100%;height:100%"></div>';
}(window.jQuery);