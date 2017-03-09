/**
 * Created by guoxu on 2/27/17.
 */

function update(action, task_id) {
    var username = getCookie("username");
    var data = {
        executor: username,
        task_id: task_id,
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
            if (models.ok == true) {
                alert(models.info);
               // window.location.href = "/task/list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

