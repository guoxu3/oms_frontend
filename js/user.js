/**
 * Created by guoxu on 12/7/16.
 */
function getUser() {
    var URL = 'http://oms.miaodeli.com/admin/user?start=0&count=10';
    $.ajax({
         type: "GET",
         url: URL,
         success: function (data) {
            // 解析收到的json数据
            var models = $.parseJSON(data);
            if (models.ok == true) {
                $("#p1").html(data);
            } else {
                alert(models.info);
            }
         },
         Error: function (xhr, error, exception) {
            alert(exception.toString());
         }
    });
}

function addUser() {
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
    var URL = 'http://oms.miaodeli.com/admin/user';
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
                window.location.href = "showuser.html";
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

function updateUser() {
    var data = {};
    for (var i = 0; i < arguments.length; i++) {
        console.log($("#"+arguments[i]).val());
        if ($("#"+arguments[i]).val()){
            data[arguments[i]] = $("#"+arguments[i]).val();
        }
    }
    var request = {
        action: 'update',
        data: data
    };
    //调用了jquery.json 库
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/admin/user';
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
                alert(models.info);
                //window.location.href = "showuser.html";
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

function deleteUser(){
    var username = $("#username").val();
    var URL = 'http://oms.miaodeli.com/admin/user?username=' + username;
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