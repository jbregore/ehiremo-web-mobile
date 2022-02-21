$(document).ready(function() {

    $(document).on('click', '.logo-mobile', function() {
        window.location = "index.php";
    });

    // ********** reg-form ********** //
    $('#signup-form').on('submit', function(event) {
        event.preventDefault();

        $('#loading-circle').show();
        //age validation
        var today = new Date();
        var date = new Date($('#input-date').val());
        var newdate = today.getFullYear() - 18;
        var mindate = newdate - 60;
        if (date.getFullYear() <= newdate && date.getFullYear() >= mindate) {
            $('#validation-display').css("display", "none");
        } else {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Invalid Age. must be 18 years old or above.");
            return;
        }

        //password validation 
        if ($("#input-password").val().length < 8) {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Password must be 8 to 10 characters.");
            return;
        } else if ($("#input-password").val() != $("#input-password-conf").val()) {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Password not match.");
            return;
        }

        // store_session_data();


        var email = $('#input-email').val();

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../backend/api/users/validate_email.php"
        );
        xhttp.send(JSON.stringify({ user_email: email }));
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $('#loading-circle').hide();
                    //role
                    var ele = document.getElementsByName('user_pos');
                    var user;
                    var user_role;

                    for (i = 0; i < ele.length; i++) {
                        if (ele[i].checked) {
                            user = ele[i].value;
                        }
                    }

                    if (user === "client") {
                        user_role = "client";
                    } else if (user === "freelancer") {
                        user_role = "freelancer";
                    } else {}

                    var fname = $('#input-firstname').val();
                    Newfname = fname.replace(/\b[a-z]/g, function(txtjq) {
                        return txtjq.toUpperCase();
                    });

                    var fname2 = $('#input-lastname').val();
                    Newfname2 = fname2.replace(/\b[a-z]/g, function(txtjq2) {
                        return txtjq2.toUpperCase();
                    });

                    var user_address = $('#input-address').val();
                    NewAddress = user_address.replace(/\b[a-z]/g, function(txtjq3) {
                        return txtjq3.toUpperCase();
                    });

                    var user_gender = $('#select-gender').val();
                    var user_birthday = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

                    var user_data = {
                        user_id: Date.now().toString(36) + Math.random().toString(36).substr(2),
                        role: user_role,
                        name: Newfname + " " + $("#input-mi").val().toUpperCase() + ". " + Newfname2,
                        fname: Newfname,
                        gender: user_gender,
                        address: NewAddress,
                        birthday: user_birthday,
                        age: today.getFullYear() - date.getFullYear(),
                        email: $('#input-email').val(),
                        password: $('#input-password').val(),
                    };

                    if (user_role === "freelancer") {
                        user_role = "talent";
                    }

                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../backend/api/users/create_signup_session.php"
                    );
                    xhttp.send(JSON.stringify(user_data));
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            window.location = "../frontend/pages/" + user_role + "/" + user_role + "-verification.php";
                        } else if (this.readyState == 4 && this.status == 500) {

                        } else if (this.readyState == 4 && this.status == 404) {}
                    };
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
            // $.ajax({
            //     type: 'POST',
            //     url: '../backend/api/users/validate_email.php',
            //     data: JSON.stringify({ user_email: email }),
            //     contentType: false,
            //     // cache: false,
            //     processData: false,
            //     success: function(data) {
            //         $('#loading-circle').hide();
            //         //role
            //         var ele = document.getElementsByName('user_pos');
            //         var user;
            //         var user_role;

        //         for (i = 0; i < ele.length; i++) {
        //             if (ele[i].checked) {
        //                 user = ele[i].value;
        //             }
        //         }

        //         if (user === "client") {
        //             user_role = "client";
        //         } else if (user === "freelancer") {
        //             user_role = "freelancer";
        //         } else {}

        //         var fname = $('#input-firstname').val();
        //         Newfname = fname.replace(/\b[a-z]/g, function(txtjq) {
        //             return txtjq.toUpperCase();
        //         });

        //         var fname2 = $('#input-lastname').val();
        //         Newfname2 = fname2.replace(/\b[a-z]/g, function(txtjq2) {
        //             return txtjq2.toUpperCase();
        //         });

        //         var user_address = $('#input-address').val();
        //         NewAddress = user_address.replace(/\b[a-z]/g, function(txtjq3) {
        //             return txtjq3.toUpperCase();
        //         });

        //         var user_gender = $('#select-gender').val();
        //         var user_birthday = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

        //         var user_data = {
        //             user_id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        //             role: user_role,
        //             name: Newfname + " " + $("#input-mi").val().toUpperCase() + ". " + Newfname2,
        //             fname: Newfname,
        //             gender: user_gender,
        //             address: NewAddress,
        //             birthday: user_birthday,
        //             age: today.getFullYear() - date.getFullYear(),
        //             email: $('#input-email').val(),
        //             password: $('#input-password').val(),
        //         };

        //         if (user_role === "freelancer") {
        //             user_role = "talent";
        //         }

        //         var xhttp = new XMLHttpRequest();
        //         xhttp.open(
        //             "POST",
        //             "../backend/api/users/create_signup_session.php"
        //         );
        //         xhttp.send(JSON.stringify(user_data));
        //         xhttp.onreadystatechange = function() {
        //             if (this.readyState == 4 && this.status == 200) {
        //                 window.location = "../frontend/pages/" + user_role + "/" + user_role + "-verification.php";
        //             } else if (this.readyState == 4 && this.status == 500) {

        //             } else if (this.readyState == 4 && this.status == 404) {}
        //         };

        //     },
        //     error: function(jqXHR, exception) {

        //         $('#loading-circle').hide();
        //         $("#id01").fadeIn();
        //         return;
        //     }
        // }); //


    }); //sign up

    $(document).on('click', '.terms', function() {
        $("#id08").fadeIn();
    });
})

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}