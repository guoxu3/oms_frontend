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
    var request = {
        action: 'add',
        data: {
            'ip': $("#ip").val(),
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


function deleteSshKeyInfo() {
    var request = {
        action: 'delete',
        data: {
            'ip': $("#ip").val(),
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