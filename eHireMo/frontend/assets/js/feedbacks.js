window.onload = function () {


    load_data();
    function load_data() {
        $.ajax({
            url: "../backend/api/main/fetch_latest_feedbacks.php",
            type: "GET",
            contentType: false,
            processData: false,
            success: function (data) {

                for (let i = 0; i < 3; i++) {
                    console.log(data[i]);

                    $(function() {
                        $(`#rateYooo${i}`).rateYo({
                            "rating": data[i].fb_star,
                            starWidth: "22px",
                            normalFill: "#A0A0A0",
                            ratedFill: "#14a800",
                            readOnly: true
                        });
                    });

                    // freelancer
                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../backend/api/users/view_profile_id.php"
                    );
                    xhttp2.send(JSON.stringify({ id: data[i].fb_to }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#f_name${i}`).text(results.name + " ( Freelancer )");
                            $(`#f_pic${i}`).attr("src", results.profile_photo || "./pages/client/assets/images/people.png");
                        
                            $(function() {
                                $(`#rateYo${i}`).rateYo({
                                    "rating": results.rating,
                                    starWidth: "22px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#14a800",
                                    readOnly: true
                                });
                            });
                        }
                    }

                    // client 
                    var xhttp3 = new XMLHttpRequest();
                    xhttp3.open(
                        "POST",
                        "../backend/api/users/view_profile_id.php"
                    );
                    xhttp3.send(JSON.stringify({ id: data[i].fb_from}));
                    xhttp3.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#c_name${i}`).text(results.name + " ( Client )");
                            $(`#c_pic${i}`).attr("src", results.profile_photo || "./pages/client/assets/images/people.png");
                        
                            $(function() {
                                $(`#rateYoo${i}`).rateYo({
                                    "rating": results.rating,
                                    starWidth: "22px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#14a800",
                                    readOnly: true
                                });
                            });
                        }
                    }

                    

                    document.getElementById("feedback-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="row">
                            <div class="col-2" style="background-color:#cfcfcfad;border-top-left-radius:50px;
                            border-bottom-right-radius:50px;">
                                <div class="slider">
                                    <div class="slider-items">
                                        <div class="item">
                                            <img alt="" id="f_pic${i}" alt="Gallery image 1">
                                            <div style="display:flex;align-items:center;flex-direction:column;">
                                                <p id="f_name${i}"></p>
                                                <div id="rateYo${i}" style="justify-self:center;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-2" style="height:100%;padding-bottom:30px;padding-top:30px;
                                width:100%;padding-left:80px;padding-right:80px;text-align:left;">
                                <div style="margin-bottom:40px;">
                                    <div style="display:flex;justify-content:flex-start;">
                                        <div>
                                            <img id="c_pic${i}" style="border-radius: 50%; width:50px; height: 50px; object-fit:cover;"/>
                                        </div>
                                        <div style="margin-left:20px;">
                                            <p id="c_name${i}"> </p>
                                            <div id="rateYoo${i}" style="justify-self:center;margin-left:-7px;"></div>
                                        </div>
                                    </div>

                                    <div style="margin-top:20px;">
                                        <p> - ${data[i].fb_comment}</p>
                                        <div id="rate-css" style="">
                                            <p><span style="color:#14a800"> ${data[i].fb_star} </span></p>
                                            <div id="rateYooo${i}" style="margin-top:2px;">
                                            </div>
                                        </div>

                                    </div>
                                </div>


                            </div>

                        </div>

                        </br></br>
                        <hr style="color:#efefef;width:80%;margin:auto;"></br>
                        `
                    );


                }



            }
        });
    }


    $(function () {
        $("#rateYo").rateYo({
            "rating": 3,
            starWidth: "17px",
            normalFill: "#A0A0A0",
            ratedFill: "#14a800",
            readOnly: true
        });
    });

    $(function () {
        $("#rateYoo").rateYo({
            "rating": 3,
            starWidth: "17px",
            normalFill: "#A0A0A0",
            ratedFill: "#14a800",
            readOnly: true
        });
    });

    $(function () {
        $("#rateYooo").rateYo({
            "rating": 3,
            starWidth: "17px",
            normalFill: "#A0A0A0",
            ratedFill: "#14a800",
            readOnly: true
        });
    });


    $(document).on('click', '.logo-mobile', function () {
        window.location = "index.php";
    });

    $(document).on('click', '#login-mobile', function () {
        window.location = "login.php";
    });

    $(document).on('click', '#signup-mobile', function () {
        window.location = "sign-up-details.php";
    });

}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}