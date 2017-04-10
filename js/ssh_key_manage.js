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
    var username = 'guoxu';
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