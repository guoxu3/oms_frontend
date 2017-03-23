/**
 * Created by guoxu on 2/23/17.
 */

function logout() {
    var URL = '/api/logout';
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok === true) {
                alert(models.info);
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