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

    var URL = 'http://oms.miaodeli.com/api/login';
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == false) {
                alert(models.info);
                window.location.href = "/login";
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

function showPage() {
    var dqPage = $("#dqPage").text();//得到当前页数
    dqPage = parseInt(dqPage);//得到的文本转成int
    //var pageCount = $("#pageCount").text();//得到总页数
    var pageCount = '9';
    pageCount = parseInt(pageCount);
    var i = 1;
    i = parseInt(i);
    var item="";
    var href = "/task/list?page=";
    if (pageCount <= 2) {
        for (i; i <= pageCount; i++) {
            if (i == dqPage) {
                item += "<a class='disabled item'>" + i + "</a>";
            }else {
                item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
            }
        }
        $('#pageBtn').append(item);
        return;
    } else if (pageCount > 2 && pageCount <= 5 ) {
        if ( dqPage == 1 ) {
            item += "<a class='disabled icon item'><i class='left chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (dqPage-1) + "&count=10" + "'><i class='left chevron icon'></i></a>";
        }
        for (i; i <= pageCount; i++) {
            if (i == dqPage) {
                item += "<a class='disabled item'>" + i + "</a>";
            }else {
                item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
            }
        }
        if ( dqPage == pageCount ) {
            item += "<a class='disabled icon item'><i class='right chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (dqPage+1) + "&count=10" + "'><i class='right chevron icon'></i></a>";
        }
        $("#pageBtn").append(item);
        return;
    } else if (pageCount > 5) {//总页数大于五页，则加载五页
        console.log("bbb")
        if ( dqPage == 1 ) {
            item += "<a class='disabled icon item'><i class='left chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (dqPage-1) + "&count=10" + "'><i class='left chevron icon'></i></a>";
        }
        if (dqPage < 4) {//当前页小于5，加载1-5页
            for (i; i <= 4; i++) {
                if (i == dqPage) {
                    item += "<a class='disabled item'>" + i + "</a>";
                }else {
                    item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
                }
            }
            item += "<span> . . . </span>";
            item += "<a class='item' href='" + href + pageCount + "&count=10" + "'>" + pageCount + "</a>";
        }else if (dqPage >= 3) {//当前页大于5页
            for (i; i <= 2; i++) {//1,2页码始终显示
                item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
            }
            item += "<span> . . . </span>";//2页码后面用...代替部分未显示的页码
            if (dqPage+1 == pageCount) {//当前页+1等于总页码
                for (i = dqPage - 1; i <= pageCount; i++) {//“...”后面跟三个页码当前页居中显示
                    if (i == dqPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
                    }
                }
            } else if (dqPage+2 == pageCount) {
                for (i = dqPage; i <= pageCount; i++) {//“...”后面跟三个页码当前页居中显示
                    if (i == dqPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
                    }
                }
            }else if (dqPage == pageCount) {//当前页数等于总页数则是最后一页页码显示在最后
                for(i = dqPage-2; i <= pageCount; i++){//...后面跟三个页码当前页居中显示
                    if (i == dqPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
                    }
                }
            }else{//当前页小于总页数，则最后一页后面跟...
                for(i = dqPage-1; i <= dqPage+1; i++){//dqPage+1页后面...
                    if (i == dqPage) {
                        item += "<a class='disabled item'>" + i + "</a>";
                    } else {
                        item += "<a class='item' href='" + href + i + "&count=10" + "'>" + i + "</a>";
                    }
                }
                item += "<span> . . . </span>";
                item += "<a class='item' href='" + href + pageCount + "&count=10" + "'>" + pageCount + "</a>";
            }
        }

        if ( dqPage == pageCount ) {
            item += "<a class='disabled icon item'><i class='right chevron icon'></i></a>";
        } else {
            item += "<a class='icon item' href='" + href + (dqPage+1) + "&count=10" + "'><i class='right chevron icon'></i></a>";
        }
        $('#pageBtn').append(item);
        return;
    }
}
