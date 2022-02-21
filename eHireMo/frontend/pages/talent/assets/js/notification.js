
window.onload = function () {

    //load session of user
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            my_id = results.user_id;
            my_role = results.role;
            if (results.profile_photo === "") { } else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);


        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) { }
    };


    $(document).on('click', '.logout', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../backend/api/users/logout.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                window.location.href = "../../../frontend/";
            } else if (this.readyState == 4 && this.status == 500) {

            } else if (this.readyState == 4 && this.status == 404) { }
        };
    })

    $(document).on('click', '#drop-talent', function () {
        if ($("#talent-mobile-dropdown").css("height") == '20px') {
            $("#talent-mobile-dropdown").css({
                height: "50px",
                display: "block"
            });
        } else {
            $("#talent-mobile-dropdown").css({
                height: "20px",
                display: "none",
            });
        }
    });

    $(document).on('click', '#drop-jobs', function () {
        if ($("#jobs-mobile-dropdown").css("height") == '20px') {
            $("#jobs-mobile-dropdown").css({
                height: "170px",
                display: "block",
            });
        } else {
            $("#jobs-mobile-dropdown").css({
                height: "20px",
                display: "none",
            });
        }
    });

}

//load session of user
var xhttp = new XMLHttpRequest();
xhttp.open(
    "GET",
    "../../../backend/api/users/user_fetch_self.php"
);
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let results = JSON.parse(this.response);
        console.log(results)

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../backend/api/users/get_notif.php"
        );
        xhttp.send(JSON.stringify({ id: results.user_id }));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let resultss = JSON.parse(this.response);
                console.log(resultss)
                $("#notification-lists").html('');

                if(resultss && resultss.length === 0 ){
                    document.getElementById("notification-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div style="border-bottom:1px solid #d6d6d6;text-align:center;padding-bottom:40px;padding-top:40px;">

                            <img src="./assets/images/bellblue.png" width="55" height="55" style="object-fit:cover;border-radius:50%;" />
                            <p style="color:#555;font-size:16px;">You don't have any notifications yet.</p>

                        </div>
                        `
                    );
                    return;
                }

                
                for (let row of resultss) {

                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../backend/api/users/view_profile_id.php"
                    );
                    xhttp.send(JSON.stringify({ id: row.notif_id_from }));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let profile = JSON.parse(this.response);
                            $(`#img${row.notif_id}`).attr("src", profile.profile_photo || "./assets/images/people.png");
                            $(`#nn${row.notif_id}`).text(profile.name);
                        }
                    }

                    var created_data = {
                        createdAt: row.created_at
                    }
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../backend/api/jobs/get_time_created.php"
                    );
                    xhttp.send(JSON.stringify(created_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            // console.log(results);
                            $(`#ca${row.notif_id}`).text(results);
                        }
                    }

                    document.getElementById("notification-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div style="display:flex;justify-content:center;padding:7px;border-bottom:1px solid #d6d6d6;" class="notification-container">

                        <div class="notif-div-1">
                            <img id="img${row.notif_id}" width="55" height="55" style="object-fit:cover;border-radius:50%;" />
                        </div>
    
                        <div class="notif-div-2">
                            <p style="font-size:14px;color:#555;margin-top:3px;">
                            <span style="color:#14a800;font-weight:500;" id="nn${row.notif_id}"> </span> ${row.notif_text.length < 25 ? row.notif_text : row.notif_text.substring(0,50)+"..." }</p>
                            <small style="font-weight:bold;font-size:12px;color:#006b9b;margin-top:-4px;" id="ca${row.notif_id}"></small>
                        </div>
                    </div>
                        `
                    );

                }

            }
        };

    } else if (this.readyState == 4 && this.status == 500) {

    } else if (this.readyState == 4 && this.status == 404) { }
};

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}