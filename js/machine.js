/**
 * Created by guoxu on 12/7/16.
 */
function getAllMachines() {
    var URL = 'http://oms.miaodeli.com/api/machine?start=0&count=10';
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
                    el: '#machine',
                    data: {
                        machines: ser_data,
                        has_data: true
                    }
                })
            } else {
                var vm = new Vue({
                    el: '#machine',
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

function addMachine() {
    var data = {
        machine_name: $("#machine_name").val(),
        inside_ip: $("#inside_ip").val(),
        outside_ip: $("#outside_ip").val(),
        location: $("#location").val(),
        usage: $("#usage").val(),
        is_initialized: $("#is_initialized").val()
    };

    var request = {
        action: 'add',
        data: data
    };
    //调用了jquery.json 库
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/machine';
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
                window.location.href = "/machine/list";
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
    var URL = 'http://oms.miaodeli.com/api/machine?task_id=' + task_id;
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