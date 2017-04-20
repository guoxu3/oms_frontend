/**
 * Created by guoxu on 2/27/17.
 */

var updateProgressID;

function update(action, task_id) {
    var username = getCookie("username");
    var data = {
        executor: username,
        task_id: task_id
    };

    var request = {
        action: action,
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/update';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok === true) {
                alert(models.info);
                updateProgressID = setInterval('getUpdateProgress()', 500);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function getUpdateProgress(){
    var task_id = GetQueryString("task_id");
    var URL = '/api/task?task_id=' + task_id;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var percent = models.info['data']['percent'];
                var failed = models.info['data']['failed'];
                taskProgress(percent);
                if (percent === 100 || failed === true) {
                    clearInterval(updateProgressID)
                }
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function getLog(task_id) {
    var URL = '/api/update?task_id=' + task_id;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var data = models.info['data'];
                document.getElementById("log_info").innerHTML = data;
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function getCurrentVersion() {
    var data = {
        target: $("#target").val()
    }
    var request = {
        action: 'get_current_version',
        data: data
    };
    console.log(request);
    return;
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/update';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok === true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}