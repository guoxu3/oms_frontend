/**
 * Created by guoxu on 12/7/16.
 */
function getTask() {
    var URL = 'http://oms.miaodeli.com/api/task?start=0&count=10';
    $.ajax({
         type: "GET",
         url: URL,
         success: function (data) {
            // 解析收到的json数据
            var models = $.parseJSON(data);
            if (models.ok == true) {
                $("#taskList").html(data);
            } else {
                alert(models.info);
            }
         },
         Error: function (xhr, error, exception) {
            alert(exception.toString());
         }
    });
}

function addTask() {
    var data = {};
    for (var i = 0; i < arguments.length; i++) {
        console.log("#"+arguments[i]);
        data[arguments[i]] = $("#"+arguments[i]).val();
    }
    var request = {
        action: 'add',
        data: data
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
                //alert(models.info.task_id);
                window.location.href = "showtask.html";
                //
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