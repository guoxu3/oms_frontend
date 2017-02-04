/**
 * Created by guoxu on 12/7/16.
 */


var login = function() {

    var request = {};
    for (var i = 0; i < arguments.length; i++) {
        console.log("#"+arguments[i]).val();
        request[arguments[i]] = $("#"+arguments[i]).val();
    }

    //调用了jquery.json 库
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/login';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            // 解析收到的json数据
            console.log(data);
            var models = data;
           // var models = $.parseJSON(data);
            if (models.ok == true) {
                // console.log(models.info);
                window.location.href = "showtask.html";
                // alert(models.info);
            } else {
                alert(models.info);
            }
        },
        Error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
};
