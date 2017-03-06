/**
 * Created by guoxu on 12/7/16.
 */


function getAllPermission() {
    var cur_page = GetQueryString('page');
    var permission_num = 10;
    var count = GetQueryString('count');
    if (cur_page === null || count === null) {
        cur_page = 1;
        count = 10
    }
    var start = ((cur_page - 1) * count);
    var URL = 'http://oms.miaodeli.com/api/permission?start=' + start +'&count=' + count;
    var permission_data = [];
    var show_button = false;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                permission_data = models.info['data'];
                permission_num = models.info['count']
                show_button = true;
            } else {
                alert(models.info);
            }
            var permission = new Vue({
                el: '#permission',
                data: {
                    permissions: permission_data,
                    show_button: show_button
                }
            });
            showPage(cur_page, Math.ceil(permission_num/count), count);
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var permission = new Vue({
                el: '#permission',
                data: {
                    permissions: permission_data,
                    show_button: show_button
                }
            });
        }
    });

}


function addPermission() {
    var data = {
        permission: $("#permission").val(),
        permission_desc: $("#permission_desc").val(),
        permission_code: $("#permission_code").val()
    };

    var request = {
        action: 'add',
        data: data,
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
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
