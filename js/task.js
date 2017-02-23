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

//获取url中的参数
/**
 * @return {null}
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

function getTaskByID() {
    var task_id = GetQueryString("task_id");
    if (task_id != null) {
        getTask(task_id)
    }
}


function getAllTask() {
    var URL = 'http://oms.miaodeli.com/api/task?start=0&count=10';
    var task_data = [];
    var show_button = false;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                task_data = models.info['data'];
                show_button = true;
            } else {
                alert(models.info);
            }
            var task = new Vue({
                el: '#task',
                data: {
                    tasks: task_data,
                    show_button: show_button
                }
            });
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            alert(task_data);
            var task = new Vue({
                el: '#task',
                data: {
                    tasks: task_data,
                    show_button: show_button
                }
            });
        }
    });

}


function addTask() {
    //获取文本框里的值,形成用逗号相隔的一行
    var txt = $("#files").val();
    var file_list = "";
    var txts = txt.split('\n');
    for (i = 0; i < txts.length; i++) {
        if (txts[i] != '') {
            file_list = file_list + "," + $.trim(txts[i])
        }
    }
    var files = file_list.replace(/(^,)/g, "");

    var username = getCookie("username");
    var data = {
        creator: username,
        action: $("#action").val(),
        target: $("#target").val(),
        ip: $("#ip").val(),
        version: $("#version").val(),
        content: files,
        description: $("#description").val()
    };

    var obj = document.getElementsByName("mailto");
    console.log(obj);
    var mailto_list = [];
    var k;
    for (k in obj) {
        if (obj[k].checked)
            mailto_list.push(obj[k].value);
    }

    var request = {
        action: 'add',
        data: data,
        mailto: mailto_list
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = '/api/task';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = "/task/list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert("erro: request failed");
        }
    });
}

function deleteTask() {
    var task_id = document.getElementById("task_id").innerHTML;
    console.log(task_id)
    var URL = 'http://oms.miaodeli.com/api/task?task_id=' + task_id;
    if (confirm("请确认是否删除")) {
        alert(task_id);
        return
        $.ajax({
        type: "DELETE",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
        });
    } else {
        return false
    }
}