/**
 * Created by guoxu on 12/7/16.
 */

var login = function () {
    var junp_url = "/task/list";
    var url_before_login = window.location.search.replace(new RegExp('^\\?', 'g'), '');
    if (url_before_login !== null) {
        junp_url = url_before_login;
    }

    var request = {
        username: $("#username").val(),
        passwd: $("#passwd").val()

    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/login';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = junp_url;
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
};
