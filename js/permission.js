/**
 * Created by guoxu on 12/7/16.
 */

function getTask(task_id) {
    var URL = 'http://oms.miaodeli.com/api/task?task_id=' + task_id;
    var task_data = {};
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                task_data = models.info['data'];
            } else {
                alert(models.info);
            }
            var taskinfo = new Vue({
                el: '#taskinfo',
                data: task_data
            })
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var taskinfo = new Vue({
                el: '#taskinfo',
                data: task_data
            })
        }
    });
}


function getAllPermission() {
    var URL = 'http://oms.miaodeli.com/api/permission?start=0&count=10';
    var permission_data = [];
    var show_button = false;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                permission_data = models.info['data'];
                show_button = true;
            } else {
                alert(models.info);
            }
            var permission = new Vue({
                el: '#permission',
                data: {
                    tasks: permission_data,
                    show_button: show_button
                }
            });
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var permission = new Vue({
                el: '#permission',
                data: {
                    tasks: permission_data,
                    show_button: show_button
                }
            });
        }
    });

}


function addPermission() {
    var data = {
        permission: $("#permission_desc").val(),
        permission_desc: $("#permission_desc").val(),
        permission_code: $("#permission_code").val()
    };

    var request = {
        action: 'add',
        data: data,
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = '/api/permission';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = "/admin/permission_list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}
