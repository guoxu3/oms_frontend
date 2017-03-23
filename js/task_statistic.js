/**
 * Created by guoxu on 3/13/17.
 */

function create_image(labels, data) {
    var myChart = echarts.init(document.getElementById('myChart'));
    var option = {
        title: {
            text: '更新统计'
        },

        xAxis: {
            silent: true,
            data: labels
        },

        yAxis: {
            title: {
                text: 'Task number (个)'
            }
        },

        tooltip: {
            valueSuffix: '个'
        },

        series:[{
            name: '更新数量',
            type: 'bar',
            data: data
        }]
    };
    myChart.setOption(option);
}


function get_days_before(days) {
    var today = new Date();
    today.setDate(today.getDate() - days + 1);
    var dateArray = [];
    var dateTemp;
    var flag = 1;
    for (var i = 0; i < days; i++) {
        var _year = today.getFullYear().toString();
        var _month = (today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1).toString();
        var _day = (today.getDate() < 10 ? '0' + (today.getDate()) : today.getDate()).toString();
        dateTemp = _year + _month + _day;
        dateArray.push(dateTemp);
        today.setDate(today.getDate() + flag);
    }
    return dateArray;
}


function get_select_date_array(begin_date, end_date) {
    var date_array = [];
    var startTime = new Date(begin_date.replace(/-/g, '/'));
    var endTime = new Date(end_date.replace(/-/g, '/'));
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var _year = startTime.getFullYear().toString();
        var _month = (startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1).toString();
        var _day = (startTime.getDate() < 10 ? '0' + (startTime.getDate()) : startTime.getDate()).toString();
        date_array.push(_year + _month + _day);
        startTime.setDate(startTime.getDate() + 1);
    }
    
    return date_array;
}

function statistic_image_by_select(is_all) {
    var labels = [];
    var data_list = [];
    var day;
    var URL;
    var begin_date = $("#begin_date").val();
    var end_date = $("#end_date").val();
    var begin_time = new Date(begin_date.replace(/-/g, '/')).getTime() / 1000;
    var end_time = new Date(end_date.replace(/-/g, '/') + " 23:59:59").getTime() / 1000;
    if (end_time <= begin_time) {
        alert("结束时间不可以早于开始时间");
        return;
    }
    var date_array = get_select_date_array(begin_date, end_date);
    
    if (is_all) {
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time;
    } else {
        var user_name = getCookie("username");
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + user_name;
    }
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var statistic_data = models.info['data'];
                for (var i = 0; i < date_array.length; i++) {
                    day = date_array[i];
                    labels.push(day);
                    if (statistic_data[day]) {
                        data_list.push(statistic_data[day]);
                    } else {
                        data_list.push(0);
                    }
                }
                create_image(labels, data_list);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function statistic_image_by_day(days, is_all) {
    var labels = [];
    var data_list = [];
    var day;
    var URL;
    var end_time = new Date(new Date().toLocaleDateString()).getTime() / 1000 + (24 * 60 * 60 - 1);
    var begin_time = end_time - (days * 24 * 60 * 60 - 1);
    var date_array = get_days_before(days);

    if (is_all) {
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time;
    } else {
        var user_name = getCookie("username");
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + user_name;
    }
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var statistic_data = models.info['data'];
                for (var i = 0; i < date_array.length; i++) {
                    day = date_array[i];
                    labels.push(day);
                    if (statistic_data[day]) {
                        data_list.push(statistic_data[day]);
                    } else {
                        data_list.push(0);
                    }
                }
                console.log(labels);
                create_image(labels, data_list);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function create_detailed_image(legend, labels, series) {
    var myChart = echarts.init(document.getElementById('myChart'));
    var option = {
        title: {
            text: '详细统计'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: legend
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : labels
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : series
    };
    myChart.setOption(option);
}

function detailed_statistic_image_by_day(days) {
    var user_list;
    var labels = [];
    var series = [];
    var user;
    var day;
    var URL;
    var end_time = new Date(new Date().toLocaleDateString()).getTime() / 1000 + (24 * 60 * 60 - 1);
    var begin_time = end_time - (days * 24 * 60 * 60 - 1);
    var date_array = get_days_before(days);
    labels = date_array;

    URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + "&is_all=true";
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var statistic_data = models.info['data'];
                user_list = models.info.user_list;
                for (var i = 0; i < user_list.length; i++) {
                    user = user_list[i];
                    var data_list = [];
                    for (var j = 0; j < date_array.length; j++) {
                        day = date_array[j];
                        if (statistic_data[day]) {
                            if (user in statistic_data[day]) {
                                data_list.push(statistic_data[day][user]);
                            } else {
                                data_list.push(0);
                            }
                        } else {
                            data_list.push(0);
                        }
                    }
                    series.push({
                        name: user,
                        type:'line',
                        areaStyle: {
                            normal: {
                                color: '#FFF'
                            }
                        },
                        data: data_list
                    });
                }
                create_detailed_image(user_list, labels, series);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function detailed_statistic_image_by_select() {
    var user_list;
    var labels = [];
    var series = [];
    var user;
    var day;
    var URL;
    var begin_date = $("#begin_date").val();
    var end_date = $("#end_date").val();
    var begin_time = new Date(begin_date.replace(/-/g, '/')).getTime() / 1000;
    var end_time = new Date(end_date.replace(/-/g, '/') + " 23:59:59").getTime() / 1000;
    if (end_time <= begin_time) {
        alert("结束时间不可以早于开始时间");
        return;
    }
    var date_array = get_select_date_array(begin_date, end_date);
    labels = date_array;

    URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + "&is_all=true";
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var statistic_data = models.info['data'];
                user_list = models.info.user_list;
                for (var i = 0; i < user_list.length; i++) {
                    user = user_list[i];
                    var data_list = [];
                    for (var j = 0; j < date_array.length; j++) {
                        day = date_array[j];
                        if (statistic_data[day]) {
                            if (user in statistic_data[day]) {
                                data_list.push(statistic_data[day][user]);
                            } else {
                                data_list.push(0);
                            }
                        } else {
                            data_list.push(0);
                        }
                    }
                    series.push({
                        name: user,
                        type:'line',
                        areaStyle: {
                            normal: {
                                color: '#FFF'
                            }
                        },
                        data: data_list
                    });
                }
                create_detailed_image(user_list, labels, series);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}