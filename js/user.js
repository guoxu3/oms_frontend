/**
 * Created by guoxu on 12/7/16.
 */

$(function () {
    window.userinfo = new Vue({
        el: '#userinfo',
        data: {
            id: '',
            username: '',
            nickname: '',
            mail: '',
            department: '',
            permissions: ''
        }
    });

    window.userlist = new Vue({
        el: '#userlist',
        data: {
            user_list: [],
            show_button: false
        }
    });
});

function getUserData(callback, username) {
    var URL = '/api/user?username=' + username;
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

function getUserByName(username) {
    if (username != "") {
        getUserData(function (err, data) {
            if (err) {
                alert(err)
                return
            }
            userinfo.$data.id = data['id'];
            userinfo.$data.username = data['username'];
            userinfo.$data.nickname = data['nickname'];
            userinfo.$data.mail = data['mail'];
            userinfo.$data.department = data['department'];
            userinfo.$data.permissions = data['permissions'];
        }, username)
    }
}


function getAllUserData(callback) {
    var cur_page = GetQueryString('page');
    var user_num = 10;
    var count = GetQueryString('count');
    if (cur_page === null || count === null) {
        cur_page = 1;
        count = 10
    }
    var start = ((cur_page - 1) * count);
    var URL = '/api/user?start=' + start +'&count=' + count;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                callback(null, models.info['data'], true)
                user_num = models.info['count'];
            } else {
                callback(models.info, {} ,false);
            }
            showPage(cur_page, Math.ceil(user_num/count), count);
        },
        error: function (xhr, error, exception) {
            callback(exception.toString(), {}, false);
        }
    });
}

function getAllUser() {
    getAllUserData(function (err, data, show) {
        if (err){
            alert(err);
            return
        }
        userlist.$data.user_list = data;
        userlist.$data.show_button = show
    })
}

function addUser() {
    var data = {
        username: $("#usermame").val(),
        nickname: $("#nickname").val(),
        mail: $("#mail").val(),
        passwd: $("#passwd").val(),
        department: $("#department").val(),
        permissions: $("#permissions").val()
    };

    var request = {
        action: 'add',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = '/api/user';
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
                window.location.href = "/admin/user_list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


// 更新用户密码
function updateUserPassword() {
    var new_passwd = $("#new_passwd").val();
    var confirm_new_passwd = $("#confirm_new_passwd").val();
    var old_passwd = $("#old_passwd").val();

    if (new_passwd == "" ||  old_passwd == "" || confirm_new_passwd != "") {
        alert("密码输入不能为空");
        return;
    }

    if (new_passwd != confirm_new_passwd) {
        alert("两次输入密码必须一致")
        return;
    }

    var data = {
        username: getCookie("username"),
        old_passwd: old_passwd,
        new_passwd: new_passwd
    };
    var request = {
        action: 'update',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = '/api/user';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                alert("密码修改成功，请重新登陆");
                window.location.href = "/login";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });

}

function updateUser() {
    var username = $("#username").val();
    var nickname = $("#nickname").val();
    var mail = $("#mail").val();
    var passwd = $("#passwd").val();
    var department = $("#department").val();
    var permissions = $("#permissions").val();

    var data = {
        username: username,
        nickname: nickname,
        mail: mail,
        passwd: passwd,
        deparment: department,
        permissions: permissions
    };
    var request = {
        action: 'update_all',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = '/api/user';
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



function deleteUser() {
    var username = $("#username").val();
    var URL = '/api/user?username=' + username;
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


function showNav() {

    var first = "<div id='userinfo'> \
            <p v-cloak>用户名：{{ username }} </p> \
            <p v-cloak>昵称：{{ nickname }}</p> \
            <p v-cloak>邮箱：{{ mail }}</p> \
            <p v-cloak>所属部门：{{ department }}</p></div>\
            <script>\
                var user_name = getCookie('username');\
                getUserByName(user_name);\
            </script>"

    var second = "<div class='ui form'> \
            <div class='field'> \
                <label>原密码</label> \
                <div class='ui input focus'> \
                    <input id='old_passwd' type='password' placeholder=''> \
                </div> \
            </div> \
            <div class='field'> \
                <label>新密码</label> \
                <div class='ui input focus'>\
                    <input id='new_passwd' type='password' placeholder=''> \
                </div> \
            </div> \
            <div class='field'> \
                <label>确认新密码</label> \
                <div class='ui input focus'> \
                    <input id='confirm_new_passwd' type='password' placeholder=''> \
                </div> \
            </div> \
            <button class='ui blue updatepasswd button' type='submit'>提交</button> \
        </div>"

    var third = "# todo"

    $('.main.container .menu .item')
        .tab({
            cache: false,
            // faking API request
            apiSettings: {
                loadingDuration: 150,
                mockResponse: function (settings) {
                    var response = {
                        first: first,
                        second: second,
                        third: third
                    };
                    return response[settings.urlData.tab];
                }
            },
            context: 'parent',
            auto: true,
            path: '/'
        });

}