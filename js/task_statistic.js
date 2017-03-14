/**
 * Created by guoxu on 3/13/17.
 */

function get_statistic_data(begin_time, end_time, username) {
    var URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + username;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                console.log(models.info['data']);
                return models.info['data']
            } else {
                alert(models.info)
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function create_image(labels, data) {
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            labels: labels,
            datasets: [{
                label: '# of Votes',
                //data: [12, 19, 3, 5, 2, 3],
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

function self_statistic_image_by_day(days) {
    var labels = [];
    var data_list = [];
    var day;
    var end_time = new Date(new Date().toLocaleDateString()).getTime() / 1000 + (24 * 60 * 60 - 1);
    var begin_time = end_time - (days * 24 * 60 * 60 - 1);
    var user_name = getCookie("username");
    var week_arry = get_days_before(days);

    var URL = '/api/task_statistic?begin_time=' + begin_time + '&end_time=' + end_time + '&username=' + user_name;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                console.log(models.info['data']);
                var statistic_data = models.info['data'];
                for(var i=0; i < week_arry.length; i++) {
                    day = week_arry[i]
                    labels.push(day);
                    if (statistic_data[day]) {
                        data_list.push(statistic_data[day])
                    } else {
                        data_list.push(0)
                    }
                }
                console.log(labels);
                console.log(data_list);
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