/**
 * Created by guoxu on 4/10/17.
 */


$(function () {
    window.ip_sshkeyinfo = new Vue({
        el: '#ip_sshkeyinfo',
        data: {
            ip_ssh_key_data: []
        }
    });

    window.user_sshkeyinfo = new Vue({
        el: '#user_sshkeyinfo',
        data: {
            user_ssh_key_data: []
        }
    });
});


function getAllSshKeyInfoByIp(callback) {
    var ip = GetQueryString('ip');
    var URL = '/api/ssh_key_manage?mode=ip&ip=' + ip;
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

function getSshKeyInfoByIp() {
    getAllSshKeyInfoByIp(function (err, data) {
        if (err){
            alert(err);
            return;
        }
        ip_sshkeyinfo.$data.ip_ssh_key_data = data;
    });
}


function getAllSshKeyInfoByUser(callback) {
    var username = GetQueryString('username');
    var URL = '/api/ssh_key_manage?mode=user&username=' + username;
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

function getSshKeyInfoByUser() {
    getAllSshKeyInfoByUser(function (err, data) {
        if (err){
            alert(err);
            return;
        }
        user_sshkeyinfo.$data.user_ssh_key_data = data;
    });
}

function addSshKeyInfoByIp() {
    var ip = GetQueryString('ip');
    var request = {
        action: 'add',
        data: {
            'ip': ip,
            'username': $("#username").val(),
            'system_user': $("#system_user").val()
        }
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/ssh_key_manage';
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
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function addSshKeyInfoByUser() {
    var username = GetQueryString('username');
    var request = {
        action: 'add',
        data: {
            'ip': $("#ip").val(),
            'username': username,
            'system_user': $("#system_user").val()
        }
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/ssh_key_manage';
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
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function deleteSshKeyByUser() {
    var ssh_key_info_list = [];
    var username = GetQueryString('username');
    var obj = document.getElementsByName("ssh_keys");
    var k;
    for (k in obj) {
        if (obj[k].checked) {
            var key_info = obj[k].value;
            var ip = key_info.split('@')[0];
            var system_user = key_info.split('@')[1];
            var ssh_key_info = {
                    'ip': ip,
                    'username': username,
                    'system_user': system_user
                    };
            ssh_key_info_list.push(ssh_key_info)
        }
    }
    if (ssh_key_info_list.length === 0) {
        alert("请先勾选再提交");
        return
    }
    var request = {
        action: 'delete',
        data: ssh_key_info_list
    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/ssh_key_manage';
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
                location.reload();
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function deleteSshKeyByMachine() {
    var ssh_key_info_list = [];
    var ip = GetQueryString('ip');
    var obj = document.getElementsByName("ssh_keys");
    var k;
    for (k in obj) {
        if (obj[k].checked) {
            var key_info = obj[k].value;
            var username = key_info.split('@')[0];
            var system_user = key_info.split('@')[1];
            var ssh_key_info = {
                    'ip': ip,
                    'username': username,
                    'system_user': system_user
                    };
            ssh_key_info_list.push(ssh_key_info)
        }
    }
    if (ssh_key_info_list.length === 0) {
        alert("请先勾选再提交");
        return
    }
    var request = {
        action: 'delete',
        data: ssh_key_info_list
    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/ssh_key_manage';
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
                location.reload();
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}