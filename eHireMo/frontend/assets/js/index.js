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

                for (let i = 0; i < 3; i++) {
                    console.log(data[i]);

                    var created_data = {
                        createdAt: data[i].job_createdAt
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
                            $(`#${i}created`).text(results);
                        }
                    }

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../backend/api/users/view_profile_id.php"
                    );
                    xhttp2.send(JSON.stringify({ id: data[i].user_id }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#user_pic${i}`).attr("src", results.profile_photo || "./pages/client/assets/images/people.png");
                        }
                    }

                    document.getElementById("service-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                    <div class="col-3">
                        <div style="margin-top:20px; margin-left: 18px;">
                        <p style="font-size:18px;"><i class="fa fa-info-circle" aria-hidden="true"></i> 
                        ${data[i].job_services.length < 21 ? data[i].job_services : data[i].job_services.substring(0, 20) + "..."}
                        </p>
                        <p style="font-size:18px;"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data[i].job_location}</p>
                        </div>
                        <div class="categories-small">
                            <small>
                            ${data[i].job_desc.length < 160 ? data[i].job_desc : data[i].job_desc.substring(0, 160) + "..."}
                            </small>
                        </div>


                        <div class="categories-p2">
                            <p style="font-size:14px;">${data[i].job_rate_desc} <span style="color:#6fda44;"> ${data[i].job_rate} </span>  </p>
                            <p >Posted <span id="${i}created"> </span> </p>
                            <p class="arrow-right"><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i></p>
                        </div>

                        <div class="categories-img" >
                            <img style="border-radius: 50%;object-fit:cover;width:100px;height:100px;" id="user_pic${i}"  />
                        </div>
                    </div>
                    `
                    );
                }




            }
        });
    }

    $(document).on('click', '.arrow-right', function () {
        window.location = "login.php";
    });
};

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