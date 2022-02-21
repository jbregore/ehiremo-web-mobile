$(document).on('click', '#continue-email', function(event) {
    event.preventDefault();

    if ($("#input-email").val() === "" || $("#input-password").val() === "") {
        $("#id01").fadeIn();
        return;
    }

    $("#loading-circle").show();
    var login_data = {
        login_email: $("#input-email").val(),
        login_password: $("#input-password").val()
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "POST",
        "../backend/api/users/login.php"
    );
    xhttp.send(JSON.stringify(login_data));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
            let results = JSON.parse(this.response);
            // console.log(results);
            $("#loading-circle").hide();
            if (results.role === "freelancer") {
                window.location.href = "pages/talent/jobs/all-job-post.php";
            } else if (results.role === "client") {
                window.location.href = "pages/client/talents/browse-talents.php";
            }
            // alert("Logged in");
        } else if (this.readyState == 4 && this.status == 202) {
            $("#loading-circle").hide();
            $("#id02").fadeIn();
        } else if (this.readyState == 4 && this.status == 404) {
            $("#loading-circle").hide();
            $("#id03").fadeIn();
        }
    };

});

$(document).on('click', '.logo-mobile', function() {
    window.location = "index.php";
});

$(document).on('click', '#forgot-pass', function() {
    $("#modal-sendmessage").fadeIn();
});

$(document).on('click', '#send-btn', function(e) {
    e.preventDefault();
    $("#loading-circle").show();
    var email = $('#input-email-forgot').val();

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "POST",
        "../backend/api/users/validate_email.php"
    );
    xhttp.send(JSON.stringify({ user_email: email }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);

            //look for email in the database
            var xhttp1 = new XMLHttpRequest();
            xhttp1.open(
                "POST",
                "../backend/api/users/get_email_forgot.php"
            );
            xhttp1.send(JSON.stringify({ user_email: email }));
            xhttp1.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../backend/api/users/send_email_forgot.php"
                    );
                    xhttp2.send(JSON.stringify({ user_email: email }));
                    xhttp2.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 201) {
                            //send email to user that contains forgot password link
                            $("#loading-circle").hide();
                            $("#modal-sendmessage").hide();
                            $("#id00").fadeIn();
                        }
                    }

                } else if (this.readyState == 4 && this.status == 500) {
                    //youre not a user yet
                    $("#loading-circle").hide();
                    $("#id04").fadeIn();
                }
            }
        } else if (this.readyState == 4 && this.status == 400) {
            //email address is invalid format
            if (this.response === "Email address is invalid format") {
                $("#loading-circle").hide();
                $("#id05").fadeIn();
            } else if (this.response === "Email Undeliverable") {
                $("#loading-circle").hide();
                $("#id06").fadeIn();
            } else if (this.response === "Email is Disposable") {
                $("#loading-circle").hide();
                $("#id07").fadeIn();
            }
        }
    }

});



function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}