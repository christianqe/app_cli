function get_session(){
    var session = localStorage.getItem('session');
    if(session == null){
        location.href='index.html';
    }
}

window.onload = function () {
    //alert();
    get_session();
};


$(document).on('click', '.singout', function (e) {
    e.preventDefault();
    localStorage.removeItem('session');
    location.href='index.html';
});