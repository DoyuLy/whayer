!function ($) {
    var HYPiechart = function (element, options) {
        this.element = $(element);
        var hasOptions = typeof options == 'object';
        if (hasOptions) {
        }
        this.type = $.fn.hypiechart.defaults.type;
        this.element.html($('<div id="piechart" style="width:100%;height:100%"></div>'));
    }
    HYPiechart.prototype = {
        constructor: HYPiechart,
        setPosition: function (option) {
            initpiechart(option);
        }
    }
    HYPiechart.prototype.setPosition = initpiechart;
    var mypieChart = null;

    function initpiechart(data) {
        if (!mypieChart) {
            mypieChart = echarts.init(document.getElementById('piechart'));
        }
        mypieChart.setOption({

            title: {
                text: data.title,
                subtext: data.subtitle
            },
            legend: {
                left: 'center',
                data: data.legends
            },
            toolbox: {
                show: true,
                left: 'right',
                feature: {
                    dataView: { show: true, readOnly: true },
                    restore: { show: true },
                    saveAsImage: { show: true },
                    myTool1: {
                        show: true,
                        title: '自定义',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: function () {
                            alert('myToolHandler1')
                        }
                    }
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            series://data.series
                [{
                    name: data.series[0].name,
                    type: data.series[0].type,
                    selectedMode: 'single',
                    selectedOffset: 15,
                    clockwise: true,
                    data: data.series[0].data
                }]
        });

    }
    $.fn.hypiechart = function (option) {
        return this.each(function () {
            var $this = $(this),
                    data = $this.data('hypiechart'),
                    options = typeof option == 'object' && option;
            if (!data) {
                $this.data('hypiechart', new HYPiechart(this, $.extend({}, $.fn.hypiechart().defaults, options)));
            }
            initpiechart(options);
        });

    };
    $.fn.hypiechart.defaults = {
        type:"pie"
    };
    $.fn.hypiechart.Constructor = HYPiechart;
}(window.jQuery);