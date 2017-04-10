/**
 * Created by guoxu on 12/7/16.
 */

$(function () {
    window.machineinfo = new Vue({
        el: '#machineinfo',
        data: {
            id: '',
            machine_name: '',
            inside_ip: '',
            outside_ip: '',
            usage: '',
            location: '',
            remarks:'',
            location_options: [
                { text: '阿里云-北京', value: 'aliyun-bj'},
                { text: '阿里云-深圳', value: 'aliyun-sz'},
                { text: '阿里云-杭州', value: 'aliyun-hz'}
            ],
            is_initialized: '',
            initialized_options: [
                { text: '是', value: true},
                { text: '否', value: false}
            ],
            nginx: '',
            mysql: '',
            php: '',
            redis: '',
            memcache: '',
            jdk: '',
            tomcat: ''
        }
    });

    window.machinelist = new Vue({
        el: '#machinelist',
        data: {
            machine_list: [],
            show_button: false
        }
    });
});

function getMachineData(callback, machine_name) {
    var URL = '/api/machine?machine_name=' + machine_name;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                callback(null, models.info['data']);
            } else {
                callback(models.info, {});
            }
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {});
        }
    });
}

function getMachineByName(machine_name) {
    if (machine_name !== "") {
        getMachineData(function (err, data) {
            if (err) {
                alert(err);
                return;
            }
            machineinfo.$data.id = data['id'];
            machineinfo.$data.machine_name = data['machine_name'];
            machineinfo.$data.inside_ip = data['inside_ip'];
            machineinfo.$data.outside_ip = data['outside_ip'];
            machineinfo.$data.usage = data['usage'];
            machineinfo.$data.is_initialized = data['is_initialized'];
            machineinfo.$data.location = data['location'];
            machineinfo.$data.remarks = data['remarks'];
        }, machine_name);
    }
}

function getAllMachineData(callback) {
    var cur_page = GetQueryString('page');
    var machine_num = 10;
    var count = GetQueryString('count');
    if (cur_page === null || count === null) {
        cur_page = 1;
        count = 10;
    }
    var start = ((cur_page - 1) * count);
    var URL = '/api/machine?start=' + start +'&count=' + count;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                callback(null, models.info['data'], true);
                machine_num = models.info.count;
            } else {
                callback(models.info, {} ,false);
            }
            showPage(cur_page, Math.ceil(machine_num/count), count);
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {}, false);
        }
    });
}

function getAllMachine() {
    getAllMachineData(function (err, data, show) {
        if (err){
            alert(err);
            return;
        }
        machinelist.$data.machine_list = data;
        machinelist.$data.show_button = show;
    });
}

function addMachine() {
    var data = {
        machine_name: $("#machine_name").val(),
        inside_ip: $("#inside_ip").val(),
        outside_ip: $("#outside_ip").val(),
        location: $("#location").val(),
        usage: $("#usage").val(),
        is_initialized: $("#is_initialized").val(),
        remarks: $("#remarks").val()
    };

    var request = {
        action: 'add',
        data: data
    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/machine';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok === true) {
                window.location.href = "/machine/list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function deleteMachine(machine_name) {
    var URL = '/api/machine?machine_name=' + machine_name;
    if (confirm("即将删除一条任务,是否确认？")) {
        $.ajax({
            type: "DELETE",
            url: URL,
            success: function (data) {
                var models = $.parseJSON(data);
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
    } else {
        return false;
    }
}