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
function isLogin() {
    var username = getCookie("username");
    var is_admin = false
    if (username == null) {
        alert("Please log in first!");
        window.location.href = "/login";
        return;
    }
    var cur_path = window.location.pathname;
    var URL = '/api/login';
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == false) {
                alert(models.info);
                window.location.href = "/login?" + cur_path;
            }
            else {
                is_admin = models.info['is_admin'];
            }
            var admin = new Vue({
                el: '#admin',
                data: {
                    show_admin: is_admin
                }
            });
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var admin = new Vue({
                el: '#admin',
                data: {
                    show_admin: is_admin
                }
            });
        }
    });

}

// 自动填写html中的用户名
window.onload = function fillUsername() {
    var username;
    username = getCookie("username");
    document.getElementById("login_user").innerHTML = username;
};

//获取url中的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        return null;
    }
}

function showPage(curPage, totalPage, count) {
    if (count === null) {
        count = 10;
    }
    var i = 1;
    var item="";
    var href = "?page=";

    if (totalPage <= 2) {
        for (i; i <= totalPage; i++) {
            if (i == curPage) {
                item += "<a class='disabled item'>" + i + "</a>";
            }else {
                item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
            }
        }
    } else if (totalPage > 2 && totalPage <= 5 ) {
        if ( curPage == 1 ) {
            item += "<a class='disabled icon item'><i class='left chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (curPage-1) + "&count=" + count + "'><i class='left chevron icon'></i></a>";
        }
        for (i; i <= totalPage; i++) {
            if (i == curPage) {
                item += "<a class='disabled item'>" + i + "</a>";
            }else {
                item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
            }
        }
        if ( curPage == totalPage ) {
            item += "<a class='disabled icon item'><i class='right chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (curPage+1) + "&count=" + count + "'><i class='right chevron icon'></i></a>";
        }
    } else if (totalPage > 5) {
        if ( curPage == 1 ) {
            item += "<a class='disabled icon item'><i class='left chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (curPage-1) + "&count=" + count + "'><i class='left chevron icon'></i></a>";
        }
        if (curPage < 4) {
            for (i; i <= 4; i++) {
                if (i == curPage) {
                    item += "<a class='disabled item'>" + i + "</a>";
                }else {
                    item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
                }
            }
            item += "<div class='disabled item'>...</div>";
            item += "<a class='item' href='" + href + totalPage + "&count=" + count + "'>" + totalPage + "</a>";
        }else if (curPage >= 3) {
            for (i; i <= 2; i++) {
                item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
            }
            item += "<div class='disabled item'>...</div>";
            if (curPage+1 == totalPage) {
                for (i = curPage - 1; i <= totalPage; i++) {
                    if (i == curPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
                    }
                }
            } else if (curPage+2 == totalPage) {
                for (i = curPage; i <= totalPage; i++) {
                    if (i == curPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
                    }
                }
            }else if (curPage == totalPage) {
                for(i = curPage-2; i <= totalPage; i++){
                    if (i == curPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
                    }
                }
            }else{
                for(i = curPage-1; i <= curPage+1; i++){
                    if (i == curPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=" + count + "'>" + i + "</a>";
                    }
                }
                item += "<div class='disabled item'>...</div>";
                item += "<a class='item' href='" + href + totalPage + "&count=" + count + "'>" + totalPage + "</a>";
            }
        }
        if ( curPage == totalPage ) {
            item += "<a class='disabled icon item'><i class='right chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (curPage+1) + "&count=" + count + "'><i class='right chevron icon'></i></a>";
        }
    }
    $('#pages').append(item);
    return;
}


Vue.filter('time', function (unix_time) {
    if (unix_time == 0 || unix_time == null) {
        return 0
    }

    if (unix_time.toString().length == 10) {
        unix_time = unix_time * 1000
    }
    var date = new Date(unix_time);   //10位unix时间戳可通过value*1000转换为13位格式
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y+M+D+h+m+s;
})