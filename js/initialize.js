/**
 * Created by guoxu on 4/11/17.
 */

function machine_initialize() {
    var ip = GetQueryString('ip');
    var request = {
        action: 'initialize',
        data: {
            'ip': ip
        }
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/initialize';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok === true) {
                alert(models.info)
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


function install_software() {
    var ip = GetQueryString('ip');
    var obj = document.getElementsByName("software");
    var software = '';
    var k;
    for (k in obj) {
        if (obj[k].checked) {
            if (software !== '') {
                software = software + ',' + (obj[k].value);
            } else {
                software = (obj[k].value)
            }
        }
    }
    var request = {
        action: 'install',
        data: {
            'ip': ip,
            'software': software
        }
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    var URL = '/api/initialize';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok === true) {
                alert(models.info)
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}