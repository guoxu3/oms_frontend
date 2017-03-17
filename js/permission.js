/**
 * Created by guoxu on 12/7/16.
 */

$(function () {
    window.permissioninfo = new Vue({
        el: '#permissioninfo',
        data: {
            id: '',
            permission: '',
            permission_desc: '',
            permission_code: ''
        }
    });

    window.permissionlist = new Vue({
        el: '#permissionlist',
        data: {
            permission_list: [],
            show_button: false
        }
    });
});

function getAllPermissionData(callback) {
    var cur_page = GetQueryString('page');
    var permission_num = 10;
    var count = GetQueryString('count');
    if (cur_page === null || count === null) {
        cur_page = 1;
        count = 10
    }
    var start = ((cur_page - 1) * count);
    var URL = '/api/permission?start=' + start +'&count=' + count;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                callback(null, models.info['data'], true);
                permission_num = models.info['count'];
            } else {
                callback(models.info, {} ,false);
            }
            showPage(cur_page, Math.ceil(permission_num/count), count);
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {}, false);
        }
    });
}

function getAllPermission() {
    getAllPermissionData(function (err, data, show) {
        if (err){
            alert(err);
            return
        }
        permissionlist.$data.permission_list = data;
        permissionlist.$data.show_button = show
    })
}


function addPermission() {
    var data = {
        permission: $("#permission").val(),
        permission_desc: $("#permission_desc").val(),
        permission_code: $("#permission_code").val()
    };

    var request = {
        action: 'add',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/permission';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = "/admin/permission_list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function getPermissionData(callback, permission) {
    var URL = '/api/permission?permission=' + permission;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                callback(null, models.info['data'])
                console.log(models.info['data'])
            } else {
                callback(models.info, {});
            }
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {});
        }
    });
}

function getPermissionByName(permission) {
    if (permission != "") {
        getPermissionData(function (err, data) {
            if (err) {
                alert(err);
                return
            }
            permissioninfo.$data.id = data['id'];
            permissioninfo.$data.permission = data['permission'];
            permissioninfo.$data.permission_desc = data['permission_desc'];
            permissioninfo.$data.permission_code = data['permission_code'];
        }, permission)
    }
}

function updatePermission() {
    var permission = $("#permission").val();
    var permission_desc = $("#permission_desc").val();
    var permission_code = $("#permission_code").val();

    var data = {
        permission: permission,
        permission_desc: permission_desc,
        permission_code: permission_code
    };
    var request = {
        action: 'update',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/permission';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
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
}

function deletePermission(permission) {
    var URL = '/api/permission?permission=' + permission;
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
}


function showPermissionTree(zNodes) {
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };

    var zNodes = zNodes;

    var code;

    function setCheck() {
        var zTree = $.fn.zTree.getZTreeObj("permissionTree");
        zTree.setting.check.chkboxType = {"Y": '', "N": ''};
        showCode('setting.check.chkboxType = { "Y" : "", "N" : "" };');
    }

    function showCode(str) {
        if (!code) code = $("#code");
        code.empty();
        code.append("<li>" + str + "</li>");
    }

    $(document).ready(function () {
        $.fn.zTree.init($("#permissionTree"), setting, zNodes);
        setCheck();
    });
}


function createPermissionTree() {
    var URL = '/api/permission?all=true';
    var permission_data = [];
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                permission_data = models.info['data'];
                showPermissionTree(permission_data);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function createUserPermissionTree(user_permission_list) {
    var zNodes = [];
    var URL = '/api/permission?all=true';
    var permission_data = [];
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                permission_data = models.info['data'];
                for (var i = 0; i < permission_data.length; i++) {
                    var node = permission_data[i];
                    if (!$.inArray(node['id'], user_permission_list)) {
                        node['checked'] = true;
                        zNodes.push(node)
                    }
                    else {
                        zNodes.push(node)
                    }
                }
                showPermissionTree(zNodes);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}