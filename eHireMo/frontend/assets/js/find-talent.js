$(document).on('click', '.logo-mobile', function() {
    window.location = "index.php";
});

$(document).on('click', '#login-mobile', function() {
    window.location = "login.php";
});

$(document).on('click', '#signup-mobile', function() {
    window.location = "sign-up-details.php";
});



function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}