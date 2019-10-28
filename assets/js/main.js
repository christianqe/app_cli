$(document).on('click', '.btn-login', function (e) {
    e.preventDefault();
    var user = $('input[name="usuario"]').val();
    var password = $('input[name="password"]').val();
    
    if(user == ''){
        alerta('Ingrese usuario');return false;
    }

    if(password == ''){
        alerta('Ingrese password');return false;
    }

    var _url = 'http://localhost/transporte/tool/api/autentificacion.php?u='+user+'&p='+password+'&token=b8507948000cf84378aee2a877fbfaff';

    $(".btn-login").attr('disabled', 'disabled');

    $.ajax({
        url: _url,
        method: 'POST',
        data: [],
        dataType: 'JSON',
        success: function(data){
            if(data.code == 200){
                alerta(data.message, 'success');

                var session = { 'id': data.data['id'], 'user': data.data['nombres'], 'brevete': data.data['brevete'] };
                //console.log(session);return false;
                localStorage.setItem('session', JSON.stringify(session));

                setTimeout(function(){ location.href='viajes-por-realizar.html'; }, 2000);
            }else{
                alerta(data.message);
            }

            $(".btn-login").removeAttr('disabled');
        },
        error: function(data, msg){
            $(".btn-login").removeAttr('disabled');
        }
    
    });

});



function alerta(msj, _type = 'error'){
    if(_type == 'error'){
        swal({
            title: "",
            text:  msj ,
            type: _type,
            html: true
        });
    }else{
        swal({
            title: "",
            text:  msj ,
            type: _type,
            html: true,
            showConfirmButton: false
        });
    }
    
}

function get_session(){
    var session = localStorage.getItem('session');
    if(session != null){
        location.href='viajes-por-realizar.html';
    }
}

window.onload = function () {
    //alert();
    get_session();
};