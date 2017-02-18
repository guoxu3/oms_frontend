/**
 * Created by guoxu on 2/14/17.
 */

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 判断是否登陆或者是否登陆超时
function is_login() {
    var username = getCookie("username");
    if (username == null) {
        alert("Please log in first!");
        window.location.href = "../login";
        return;
    }

    var URL = 'http://oms.miaodeli.com/api/login';
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == false) {
                alert(models.info);
                window.location.href = "../login";
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });

}

// 自动填写html中的用户名
window.onload = function fillUsername() {
    var username;
    username = getCookie("username");
    document.getElementById("username").innerHTML = username;
};

