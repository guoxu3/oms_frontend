/**
 * Created by guoxu on 2/14/17.
 */

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

window.onload = function fillUsername(){
    var user_name = getCookie("username");
    document.getElementById("username").innerHTML = user_name;
};

