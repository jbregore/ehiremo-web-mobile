$(document).on('click', '#continue-email', function() {
    if (!$("#input-password").val() || !$("#input-password-conf").val()) {
        $('#validation-display').css("display", "block");
        $('#validation-text').text("Please fill all the fields.");
        return;
    } else {
        if ($("#input-password").val().length < 8) {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Password must be least of 8 characters long.");
            return;
        } else if ($("#input-password").val() !== $("#input-password-conf").val()) {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Password not match.");
            return;
        } else {
            $("#loading-circle").show();
            const vkeyLink = window.location.href;
            const vkey = vkeyLink.split("=");
            // console.log(vkey[1].slice(-1));

            var password_data = {
                old_password: $("#input-password").val(),
                vkey: vkey[1]
            }

            console.log(password_data)

            var xhttp = new XMLHttpRequest();
            xhttp.open(
                "POST",
                "../backend/api/users/forgot_password_change.php"
            );
            xhttp.send(JSON.stringify(password_data));
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(this.response);
                    $("#loading-circle").hide();
                    // $("#modal-password").attr("style", "display:none");
                    $("#id00").fadeIn();
                    setTimeout(() => {
                        if (results.role === "client") {
                            window.location.href = "../frontend/pages/client/settings.php";
                        } else if (results.role === "freelancer") {
                            window.location.href = "../frontend/pages/talent/settings.php";
                        }

                    }, 1000);
                } else if (this.readyState == 4 && this.status == 500) {
                    $("#loading-circle").hide();
                    return;
                } else if (this.readyState == 4 && this.status == 404) {}
            };
        }
    }

    // alert("gago")
});