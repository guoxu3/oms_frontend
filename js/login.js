/**
 * Created by guoxu on 12/7/16.
 */

var login = function () {
    var request = {
        username: $("#username").val(),
        passwd: $("#passwd").val()

    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = 'http://oms.miaodeli.com/api/login';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = "/task/list";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
};
