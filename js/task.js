/**
 * Created by guoxu on 12/7/16.
 */

function getTask(task_id) {
    var URL = 'http://oms.miaodeli.com/api/task?task_id=' + task_id;
    $.ajax({
         type: "GET",
         url: URL,
         success: function (data) {
            // 解析收到的json数据
            var models = $.parseJSON(data);
            if (models.ok == true) {
                // $("#taskList").html(data);
                var ser_data = models.info['data'];
                var vm = new Vue({
                    el: '#taskinfo',
                    data: ser_data
                })
            } else {
                alert(models.info);
            }
         },
         Error: function (xhr, error, exception) {
            alert(exception.toString());
         }
    });
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null) {
         return  unescape(r[2]);
     } else {
         return null;
     }
}

function getTaskByID(){
    var task_id = GetQueryString("task_id");
    if (task_id != null) {
        getTask(task_id)
    }
}


function getAllTask() {
    var URL = 'http://oms.miaodeli.com/api/task?start=0&count=10';
    $.ajax({
         type: "GET",
         url: URL,
         success: function (data) {
            // 解析收到的json数据
            var models = $.parseJSON(data);
            if (models.ok == true) {
                // $("#taskList").html(data);
                var ser_data = models.info['data'];
                var vm = new Vue({
                    el: '#task',
                    data: {
                        tasks: ser_data,
                        has_data: true
                    }
                })
            } else {
                var vm = new Vue({
                    el: '#task',
                    data: {
                        has_data: false
                    }
                });
                alert(models.info);
            }
         },
         Error: function (xhr, error, exception) {
            alert(exception.toString());
         }
    });
}


function addTask() {
    //获取文本框里的值,形成用逗号相隔的一行
    var txt = $("#files").val();
    var file_list = "";
    var txts = txt.split('\n');
    for (i=0; i<txts.length ;i++ ) {
        if (txts[i] != '') {
            file_list = file_list + "," + $.trim(txts[i])
        }
    }
    var files = file_list.replace(/(^,)/g, "");

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
    for(k in obj){
        if(obj[k].checked)
            mailto_list.push(obj[k].value);
    }

    var request = {
        action: 'add',
        data: data,
        mailto: mailto_list
    };
    //调用了jquery.json 库
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/task';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            // 解析收到的json数据
            var models = data;
            if (models.ok == true) {
                //alert(models.info);
                window.location.href = "/task/list";
            } else {
                alert(models.info);
            }
        },
        Error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function deleteTask(){
    var task_id = $("#task_id").val();
    var URL = 'http://oms.miaodeli.com/api/task?task_id=' + task_id;
    $.ajax({
         type: "DELETE",
         url: URL,
         success: function (data) {
            // 解析收到的json数据
            var models = $.parseJSON(data);
            if (models.ok == true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
         },
         Error: function (xhr, error, exception) {
            alert(exception.toString());
         }
    });
}