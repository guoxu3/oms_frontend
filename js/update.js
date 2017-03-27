/**
 * Created by guoxu on 2/27/17.
 */

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
                setInterval('getUpdateProgress(task_id)', 500);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function getUpdateProgress(task_id){
    var URL = '/api/task?task_id=' + task_id;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                var percent = models.info['data']['percent'];
                taskProgress(percent);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}



