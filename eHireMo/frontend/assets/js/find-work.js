window.onload = function () {

    load_data();
    function load_data() {
        $.ajax({
            url: "../backend/api/main/fetch_services.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify({ pagee: 1 }),
            success: function (data) {
                console.log(data)

                for (let row of data) {

                    var created_data = {
                        createdAt: row.job_createdAt
                    }
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../backend/api/jobs/get_time_created.php"
                    );
                    xhttp.send(JSON.stringify(created_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#${row.id}created`).text(results);
                        }
                    }

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../backend/api/users/view_profile_id.php"
                    );
                    xhttp2.send(JSON.stringify({ id: row.user_id }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#user_pic${row.id}`).attr("src", results.profile_photo || "./pages/client/assets/images/people.png");
                        }
                    }


                    document.getElementById("work-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-3" style="padding-bottom:40px;">
                            <h1 style="font-size:18px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 
                            ${row.job_services.length < 21 ? row.job_services : row.job_services.substring(0, 20) + "..."}
                            </h1>
                            <h3><i class="fa fa-map-marker" aria-hidden="true"></i> ${row.job_location} </h3>
                            <div class="categories-small">
                                <small>
                                ${row.job_desc.length < 260 ? row.job_desc : row.job_desc.substring(0, 260) + "..."}
                                </small>
                            </div>


                            <div class="categories-p2" style="margin-top:40px;">
                                <p style="font-size:14px;">${row.job_rate_desc}
                                 <span style="color:#6fda44;font-size:14px;"> ${row.job_rate} </span>  </p>
                                <p >Posted <span id="${row.id}created" style="color:#555;font-size:16px;"> </span> </p>
                                <p class="arrow-right"><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i></p>
                            </div>

                            <div class="categories-img" style="margin-top:40px;">
                                <img style="border-radius: 50%;object-fit:cover;width:100px;height:100px;" id="user_pic${row.id}"  />
                            </div>
                        </div>

                    `
                    );

                }

            }
        })
    }

    $(document).on('click', '.arrow-right', function () {
        window.location = "login.php";
    });
}


$(document).on('click', '.logo-mobile', function () {
    window.location = "index.php";
});

$(document).on('click', '#login-mobile', function () {
    window.location = "login.php";
});

$(document).on('click', '#signup-mobile', function () {
    window.location = "sign-up-details.php";
});



function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}