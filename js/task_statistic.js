/**
 * Created by guoxu on 3/13/17.
 */

function create_image(labels, data) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '更新数量',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function get_days_before(days) {
    var today = new Date();
    today.setDate(today.getDate() - days + 1);
    var dateArray = [];
    var dateTemp;
    var flag = 1;
    for (var i = 0; i < days; i++) {
        var _year = today.getFullYear().toString();
        var _month = (today.getMonth()+1 < 10 ? '0'+(today.getMonth()+1) : today.getMonth()+1).toString();
        var _day = (today.getDate() < 10 ? '0'+(today.getDate()) : today.getDate()).toString();
        dateTemp = _year + _month + _day;
        dateArray.push(dateTemp);
        today.setDate(today.getDate() + flag);
    }
    return dateArray
}

function statistic_image_by_day(days, is_all) {
    var labels = [];
    var data_list = [];
    var day;
    var URL;
    var end_time = new Date(new Date().toLocaleDateString()).getTime() / 1000 + (24 * 60 * 60 - 1);
    var begin_time = end_time - (days * 24 * 60 * 60 - 1);
    var date_arry = get_days_before(days);

    if (is_all) {
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time
    } else {
        var user_name = getCookie("username");
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + user_name;
    }
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                var statistic_data = models.info['data'];
                for(var i=0; i < date_arry.length; i++) {
                    day = date_arry[i]
                    labels.push(day);
                    if (statistic_data[day]) {
                        data_list.push(statistic_data[day])
                    } else {
                        data_list.push(0)
                    }
                }
                create_image(labels, data_list);
            } else {
                alert(models.info)
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function statistic_image_by_select(is_all){
    var labels = [];
    var data_list = [];
    var day;
    var URL;
    var begin_date = $("#begin_date").val();
    var end_date = $("#end_date").val();
    var begin_time = new Date(begin_date.replace(/-/g,'/')).getTime() / 1000;
    var end_time = new Date(end_date.replace(/-/g,'/') + " 23:59:59").getTime() / 1000;
    if (end_time <= begin_time) {
        alert("结束时间不可以早于开始时间");
        return
    }
    var date_arry = [];
    var startTime = new Date(begin_date.replace(/-/g,'/'));
    var endTime = new Date(end_date.replace(/-/g,'/'));
    while((endTime.getTime()-startTime.getTime())>=0){
        var _year = startTime.getFullYear().toString();
        var _month = (startTime.getMonth()+1 < 10 ? '0'+(startTime.getMonth()+1) : startTime.getMonth()+1).toString();
        var _day = (startTime.getDate() < 10 ? '0'+(startTime.getDate()) : startTime.getDate()).toString();
        date_arry.push(_year + _month + _day);
        startTime.setDate(startTime.getDate()+1);
    }

    if (is_all) {
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time
    } else {
        var user_name = getCookie("username");
        URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + user_name;
    }
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                var statistic_data = models.info['data'];
                for(var i=0; i < date_arry.length; i++) {
                    day = date_arry[i]
                    labels.push(day);
                    if (statistic_data[day]) {
                        data_list.push(statistic_data[day])
                    } else {
                        data_list.push(0)
                    }
                }
                create_image(labels, data_list);
            } else {
                alert(models.info)
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}
