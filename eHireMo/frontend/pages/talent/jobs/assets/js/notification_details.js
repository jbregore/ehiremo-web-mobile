
//load session of user
var xhttp = new XMLHttpRequest();
xhttp.open(
    "GET",
    "../../../../backend/api/users/user_fetch_self.php"
);
xhttp.send();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let results = JSON.parse(this.response);
        console.log(results)

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../../backend/api/users/get_notif.php"
        );
        xhttp.send(JSON.stringify({ id: results.user_id }));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let resultss = JSON.parse(this.response);
                console.log(resultss)
                $("#dd-content-notif").html('');

                for (let row of resultss) {

                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/users/view_profile_id.php"
                    );
                    xhttp.send(JSON.stringify({ id: row.notif_id_from }));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let profile = JSON.parse(this.response);
                            $(`#img2${row.notif_id}`).attr("src", profile.profile_photo || "../assets/images/people.png");
                            $(`#nn2${row.notif_id}`).text(profile.name);
                        }
                    }

                    var created_data = {
                        createdAt: row.created_at
                    }
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/jobs/get_time_created.php"
                    );
                    xhttp.send(JSON.stringify(created_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            // console.log(results);
                            $(`#ca2${row.notif_id}`).text(results);
                        }
                    }

                    document.getElementById("dd-content-notif").insertAdjacentHTML(
                        "beforeend",
                        `
                            <div style="display:flex;justify-content:flex-start;padding:7px;border-bottom:1px solid #d6d6d6;">
                            
                            <div style="margin:7px;">
                                <img id="img2${row.notif_id}" width="40" height="40" style="object-fit:cover;border-radius:50%;"/>
                            </div>

                            <div>
                                <p style="font-size:14px;color:#555;margin-top:3px;">
                                <span style="color:#14a800;font-weight:500;" id="nn2${row.notif_id}"> </span> ${row.notif_text.length < 25 ? row.notif_text : row.notif_text.substring(0, 50) + "..."}</p>
                                <small style="font-weight:bold;font-size:12px;color:#006b9b;margin-top:-4px;" id="ca2${row.notif_id}"></small>
                            </div>
                        </div>
                            `
                    );

                }

            }
        };

        var xhttp2 = new XMLHttpRequest();
        xhttp2.open(
            "GET",
            "../../../../backend/api/notification/get_notif_count.php"
        );
        xhttp2.send();
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let results1 = JSON.parse(this.response);
                if (results1.total_notif_count.total_notif_count == 0) {
                    $("#notif-count").attr('style', "display:none;");
                } else {
                    $("#notif-count").text(results1.total_notif_count.total_notif_count);
                }
            }
        }

    } else if (this.readyState == 4 && this.status == 500) {

    } else if (this.readyState == 4 && this.status == 404) { }
};


$("#notif-bell").hover(

    function () {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "PUT",
            "../../../../backend/api/notification/update_notif_count.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let results1 = JSON.parse(this.response);

            }
        }
    },

    function () {
        $("#notif-count").attr('style', "display:none;");
    }

);