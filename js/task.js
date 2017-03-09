/**
 * Created by guoxu on 12/7/16.
 */

$(function () {
    window.taskinfo = new Vue({
        el: '#taskinfo',
        data: {
            id: '',
            task_id: '',
            creator: '',
            ip: '',
            target: '',
            version: '',
            type: '',
            content: '',
            create_time: '',
            description: '',
            executor: '',
            start_time: '',
            revert_time: '',
            status: '',
            percent: '',
            revert: ''
        }
    });

    window.tasklist = new Vue({
        el: '#tasklist',
        data: {
            task_list: [],
            show_button: false
        }
    });
});

function getTaskData(callback, task_id) {
    var URL = '/api/task?task_id=' + task_id;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                callback(null, models.info['data'])
            } else {
                callback(models.info, {});
            }
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {});
        }
    });
}

function getTaskByID(task_id) {
    if (task_id != "") {
        getTaskData(function (err, data) {
            if (err) {
                alert(err)
                return
            }
            taskinfo.$data.id = data['id'];
            taskinfo.$data.task_id = data['task_id'];
            taskinfo.$data.creator = data['creator'];
            taskinfo.$data.ip = data['ip'];
            taskinfo.$data.target = data['target'];
            taskinfo.$data.version = data['version'];
            taskinfo.$data.type = data['type'];
            taskinfo.$data.content = data['content'];
            taskinfo.$data.create_time = data['create_time'];
            taskinfo.$data.executor = data['executor'];
            taskinfo.$data.start_time = data['start_time'];
            taskinfo.$data.revert_time = data['revert_time'];
            taskinfo.$data.status = data['status'];
            taskinfo.$data.percent = data['percent'];
            taskinfo.$data.revert = data['revert'];
        }, task_id)
    }
}


function getAllTaskData(callback) {
    var cur_page = GetQueryString('page');
    var task_num = 10;
    var count = GetQueryString('count');
    if (cur_page === null || count === null) {
        cur_page = 1;
        count = 10
    }
    var start = ((cur_page - 1) * count);
    var URL = '/api/task?start=' + start +'&count=' + count;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                callback(null, models.info['data'], true);
                task_num = models.info['count'];
            } else {
                callback(models.info, {} ,false);
            }
            showPage(cur_page, Math.ceil(task_num/count), count);
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {}, false);
        }
    });
}

function getAllTask() {
    getAllTaskData(function (err, data, show) {
        if (err){
            alert(err);
            return
        }
        tasklist.$data.task_list = data;
        tasklist.$data.show_button = show
    })
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
        type: $("#type").val(),
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
            alert(exception.toString());
        }
    });
}

function deleteTask(task_id) {
    var URL = '/api/task?task_id=' + task_id;
    if (confirm("即将删除一条任务,是否确认？")) {
        $.ajax({
        type: "DELETE",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                alert(models.info);
                window.location.href = "/task/list";

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