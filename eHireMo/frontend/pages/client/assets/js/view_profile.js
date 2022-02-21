window.onload = function() {
    // var profile_role = "";
    const user_id_profile = window.location.href;
    const user_profile = user_id_profile.split("=");
    var start = 1;
    var limit = 1;
    var reachedMax = false;
    var send_message_id = "";
    // console.log(user_profile[1]);

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "POST",
        "../../../backend/api/users/view_profile_id.php"
    );
    xhttp.send(JSON.stringify({ id: user_profile[1] }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            send_message_id = results.user_id;
            $("#talent-name-profile").text(results.name);
            $("#talent-role-profile").text(`(${results.role})`);
            $("#talent-address-profile").text(results.address);
            $("#talent-name-profile2").text(results.name);
            $("#talent-role-profile2").text(`(${results.role})`);
            $("#talent-address-profile2").text(results.address);
            // $("#web-name").html(results.fname);
            // $("#mobile-name").html(results.name);

            $(function() {
                $("#rateYo").rateYo({
                    "rating": results.rating,
                    starWidth: "17px",
                    normalFill: "#A0A0A0",
                    ratedFill: "#14a800",
                    readOnly: true
                });
            });
            $("#rateYoNum").text(results.rating.substring(0,3))
                // console.log(results)
            $("#talent-img-profile").attr("src", results.profile_photo || "assets/images/people.png");
            $("#talent-img-profile2").attr("src", results.profile_photo || "assets/images/people.png");
            if (results.role === "freelancer") {
                if (results.portfolio === "") {
                    $("#view-portfolio").attr('style', 'opacity:0;');
                    $("#view-portfolioo").text("");
                } else {
                    $("#view-portfolio").attr('href', results.portfolio);
                    $("#view-portfolio").attr('style', 'opacity:1;');
                }

                $("#profile_role").val("freelancer");
                var services = [];
                if (results.services_offer !== "") {
                    services = results.services_offer.split(",");
                    // console.log(services);
                    var ul = document.getElementById("skdiv");
                    for (let i = 0; i < services.length; i++) {
                        var li = document.createElement("button");
                        li.setAttribute('id', services[i]);
                        li.appendChild(document.createTextNode(services[i]));
                        ul.appendChild(li);
                    }
                }

                // $(document).on('click', '#view-portfolio', function() {
                //     // window.location.href = results.portfolio;
                //     alert("gagp")
                // });
            } else {
                $("#view-portfolioo").attr('style', 'opacity:0');
                $("#view-portfolio").attr('href', "#");
                $("#profile_role").val("client");
            }
        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) {}
    };

    let listEnd = document.getElementById("list-end");
    let appending = false;
    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    }
    let callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.target.id === 'list-end') {
                if (entry.isIntersecting && !appending) {
                    appending = true;
                    setTimeout(() => {
                        load_data();
                        // alert("gago")
                    }, 100)
                }
            }
        })
    }
    let observer = new IntersectionObserver(callback, options);
    observer.observe(listEnd);

    //************ load page function ************//
    load_data();

    function load_data() {
        if (reachedMax) {
            $("#result-end").attr("style", "opacity:1;");
            $("#loading-circle").attr("style", "display:none;");
            return;
        }
        setTimeout(() => {
            var profile_data = {
                id: user_profile[1],
                role: $("#profile_role").val(),
                start: start,
                limit: limit
            }
            $.ajax({
                url: "../../../backend/api/appointments/client_fetch_profile_appointments.php",
                type: "POST",
                contentType: false,
                processData: false,
                data: JSON.stringify(profile_data),
                success: function(data) {
                    console.log(data);
                    if (start === 1) {
                        var rowCount = 0;
                        for (let row1 of data) {
                            if (row1.c_status === "done" && row1.f_status === "done") {
                                rowCount++;
                            }
                        }
                        if (rowCount === 0) {
                            $("#no-data").html("");
                            document.getElementById("no-data").insertAdjacentHTML(
                                "beforeend",
                                `
                                        <div class="row">
                                            <div class="col-2 less-padding" style="
                                            padding-top: 30px;text-align: center;">
            
                                                <img src="assets/images/teamwork-illustration.png" width="90" />
                                                <h1>No appointments yet</h1>
            
                                            </div>
            
                                        </div>
                                        `
                            );
                            $("#loading-circle").attr("style", "display:none;");
                            return;
                        }
                    }
                    if (data && data.length == 0) {
                        reachedMax = true;
                        $("#result-end").attr("style", "opacity:1;");
                        $("#loading-circle").attr("style", "display:none;");
                        return;
                    }
                    if (data == "reachedMax") {
                        reachedMax = true;
                    } else {
                        start++;
                        appending = true;
                        for (let row of data) {
                            // console.log("1")
                            // console.log(row)
                            if (row.c_status === "done" && row.f_status === "done") {
                                var xhttp = new XMLHttpRequest();
                                xhttp.open(
                                    "POST",
                                    "../../../backend/api/users/view_profile_id.php"
                                );
                                xhttp.send(JSON.stringify({ id: row.freelancer_id }));
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        let results = JSON.parse(this.response);
                                        console.log(results);
                                        $(`#img${row.id}`).attr("src", results.profile_photo || "./assets/images/people.png");
                                        $(`#name${row.id}`).text(results.name);
                                        $(`#addr${row.id}`).text(results.address);
                                        $(function() {
                                            $(`#rateYoo${row.id}`).rateYo({
                                                "rating": results.rating,
                                                starWidth: "17px",
                                                normalFill: "#A0A0A0",
                                                ratedFill: "#14a800",
                                                readOnly: true
                                            });
                                        });
                                        $(`#rateYooNum${row.id}`).text(results.rating.substring(0,3));
                                    }
                                }

                                var xhttp3 = new XMLHttpRequest();
                                xhttp3.open(
                                    "POST",
                                    "../../../backend/api/users/view_profile_id.php"
                                );
                                xhttp3.send(JSON.stringify({ id: row.client_id }));
                                xhttp3.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        let results = JSON.parse(this.response);
                                        console.log(results);
                                        $(`#cname${row.id}`).text(results.name);
                                    }
                                }

                                $.ajax({
                                    type: 'GET',
                                    url: '../../../backend/api/jobs/fetch_edit_job.php',
                                    data: { id: row.jobpost_id },
                                    success: function(data) {
                                        console.log(data)
                                        $(`#hl${row.id}`).text(data.job_headline);
                                        $(`#dsc${row.id}`).text(data.job_desc);
                                        // data.job_headline
                                        //data.job_desc
                                    }
                                })

                                document.getElementById("profile-lists").insertAdjacentHTML(
                                    "beforeend",
                                    `
                                <div class="row" style="margin-top:10px;">
    
                                    <div class="col-2 less-padding" style="text-align: left;
                                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">
    
                                        <div class="s-row">
    
                                            <div class="s-row-left">
                                                <div class="s-row-left-1">
    
                                                    <img id="img${row.id}" style="border-radius: 50%;object-fit:cover;" src="./assets/images/people.png"
                                                    width="70" height="70" />
                                                </div>
                                                <div style="flex-basis: 70%;">
                                                    <p class="p-grey" style="color: #555;margin-top:20px;">Freelancer : <span class="view-profile" id="${row.freelancer_id}">
                                                    <span style="color: #14a800;text-decoration:underline;cursor:pointer;" id="name${row.id}">
                                                    </span></span></p>
                                                    <p class="p-grey" style="color: #555;" id="addr${row.id}"></p>
                                                    <div style="display:flex;justify-content:flex-start;">
                                                        <p class="p-grey" style="color: #555;"> Rating : <span id="rateYooNum${row.id}" style="color:#14a800"> </span></p>
                                                        <div id="rateYoo${row.id}" style="margin-top:1px;">
    
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="s-row-right">
                                                <p class="p-grey">Project budget : <span style="color: #14a800;">${row.proj_cost}</span></p>
                                                <p class="p-grey">Project address : <span style="color: #14a800;">${row.proj_addr}</span></p>
                                                <p class="p-grey">Start date : <span style="color: #14a800;">${row.start_date}</span></p>
                                                <p class="p-grey">End date : <span style="color: #14a800;">${row.end_date}</span></p>
                                            </div>
                                        </div>
    
                                        <div class="skills-button">
                                            <p class="p-grey" style="color: #555;margin-top:20px;">Client : <span class="view-profile" id="${row.client_id}"> <span style="color: #14a800;text-decoration:underline;
                                            cursor:pointer;" id="cname${row.id}"></span></span></p>
                                            <p class="p-grey" style="color:#555;">Job Headline : <span style="color: #14a800;"
                                            id="hl${row.id}">
                                            </span></p>
                                            <p class="p-grey" style="color:#555;">Service : <span style="color: #14a800;">${row.service}</span></p>
                                            <p class="p-grey" style="color:rgb(75, 75, 75);">
                                                Job Description : <span id="dsc${row.id}"> </span></p>
                                        </div>
    
                                        <div class="slider" id="sliderd${row.id}">
                                            <div class="slider-items" id="slides-list${row.id}">
                                            </div>
                                            <div id="slide-contol${row.id}">
                                            </div>
                                        </div>
    
                                        <br/>
                                        <p class="p-grey" >Feedbacks:</p>
                                        <div class="feedback" id="feedback-lists${row.id}">
                                        </div>
    
                                    </div>
    
                                </div>
                                `
                                );

                                $.ajax({
                                    type: 'GET',
                                    url: '../../../backend/api/appointments/fetch_feedbacks.php',
                                    data: { id: row.id },
                                    success: function(data) {
                                        for (let roww of data) {
                                            console.log(roww)
                                            var xhttp = new XMLHttpRequest();
                                            xhttp.open(
                                                "POST",
                                                "../../../backend/api/appointments/fetch_photos.php"
                                            );
                                            xhttp.send(JSON.stringify({ id: roww.appointment_id }));
                                            xhttp.onreadystatechange = function() {
                                                if (this.readyState == 4 && this.status == 200) {
                                                    let results = JSON.parse(this.response);
                                                    var roeCunt = 0;
                                                    console.log(results.length);
                                                    if (results && results.length == 0) {
                                                        $(`#sliderd${row.id}`).attr("style", "display:none;")
                                                    } else {

                                                        for (let roe of results) {
                                                            document.getElementById(`slides-list${row.id}`).insertAdjacentHTML(
                                                                "beforeend",
                                                                `
                                                            <div class="item">
                                                                <img src="${roe.fb_photos}" alt="Gallery image 1" >
                                                            </div>
                                                        `
                                                            );
                                                        }
                                                        document.getElementById(`slide-contol${row.id}`).insertAdjacentHTML(
                                                            "beforeend",
                                                            `
                                                    <div class="left-slide" id="left-slided${row.id}">
                                                        <
                                                    </div>
                                                    <div class="right-slide" id="right-slided${row.id}">
                                                        >
                                                    </div>
    
                                                    `
                                                        );

                                                        // <center><p class="p-grey">Photos</p></center> setTimeout(function() {
                                                        var slides = document.querySelector(`#slides-list${row.id}`).children;
                                                        var nextSlide = document.querySelector(`#right-slided${row.id}`);
                                                        var prevSlide = document.querySelector(`#left-slided${row.id}`);
                                                        var index = 0;
                                                        var totalSlides = slides.length;
                                                        // console.log(totalSlides)
                                                        slides[0].classList.add("active")
                                                        nextSlide.onclick = function() {
                                                            next("next");
                                                        }
                                                        prevSlide.onclick = function() {
                                                            next("prev");
                                                        }

                                                        function next(direction) {
                                                            if (direction == "next") {
                                                                index++;
                                                                if (index == totalSlides) {
                                                                    index = 0;
                                                                }
                                                            } else {
                                                                if (index == 0) {
                                                                    index = totalSlides - 1;
                                                                } else {
                                                                    index--;
                                                                }
                                                            }
                                                            for (i = 0; i < slides.length; i++) {
                                                                slides[i].classList.remove("active");
                                                            }
                                                            slides[index].classList.add("active");
                                                        }
                                                        // }, 10000);
                                                    }

                                                }
                                            }
                                            break;
                                        }
                                    }
                                });

                                $.ajax({
                                    type: 'GET',
                                    url: '../../../backend/api/appointments/fetch_feedbacks.php',
                                    data: { id: row.id },
                                    success: function(data) {
                                        for (let rowew of data) {
                                            console.log(row);
                                            $(function() {
                                                $(`#fbrate${rowew.id}`).rateYo({
                                                    "rating": rowew.fb_star,
                                                    starWidth: "17px",
                                                    normalFill: "#A0A0A0",
                                                    ratedFill: "#14a800",
                                                    readOnly: true
                                                });
                                                $(`#fbstar${rowew.id}`).text(rowew.fb_star);
                                            });

                                            var xhttp = new XMLHttpRequest();
                                            xhttp.open(
                                                "POST",
                                                "../../../backend/api/users/view_profile_id.php"
                                            );
                                            xhttp.send(JSON.stringify({ id: rowew.fb_from }));
                                            xhttp.onreadystatechange = function() {
                                                if (this.readyState == 4 && this.status == 200) {
                                                    let results = JSON.parse(this.response);
                                                    // console.log(results.fname)
                                                    $(`#from${rowew.id}`).text(results.fname)
                                                }
                                            }

                                            var xhttp2 = new XMLHttpRequest();
                                            xhttp2.open(
                                                "POST",
                                                "../../../backend/api/users/view_profile_id.php"
                                            );
                                            xhttp2.send(JSON.stringify({ id: rowew.fb_to }));
                                            xhttp2.onreadystatechange = function() {
                                                if (this.readyState == 4 && this.status == 200) {
                                                    let results = JSON.parse(this.response);
                                                    // console.log(results.fname)
                                                    $(`#to${rowew.id}`).text(results.fname)
                                                }
                                            }

                                            document.getElementById(`feedback-lists${row.id}`).insertAdjacentHTML(
                                                "beforeend",
                                                `
    
                                                <p class="p-grey" >Feedback from 
                                                <span style="text-decoration: underline;color:#1d4354;cursor:pointer;" id="from${rowew.id}">
                                                </span> 
                                                </span> :</p>
                                                <p class="p-grey" style="padding-left: 30px;padding-right: 30px;">${rowew.fb_comment}
                                                </p>

                                                <div style="margin-top:5px;margin-left:28px;display:flex;text-align:left;">
                                                    <span id="fbstar${rowew.id}" style="color:#14a800;margin-top:-3px;"></span>
                                                    <div id="fbrate${rowew.id}">
                                                    </div>
                                                </div>
                                                </br>
                                        `
                                            );
                                        }
                                    }
                                })
                            }
                        }
                        appending = false;
                    }
                    // $('#profile-lists').html('');
                    // if (data && data.length == 0) {
                    //     document.getElementById("no-data").insertAdjacentHTML(
                    //         "beforeend",
                    //         `
                    //         <div class="row">
                    //             <div class="col-2 less-padding" style="
                    //             padding-top: 30px;text-align: center;">

                    //                 <img src="assets/images/teamwork-illustration.png" width="90" />
                    //                 <h1>No appointments yet</h1>

                    //             </div>

                    //         </div>
                    //         `
                    //     );
                    //     return;
                    // }

                }
            })

        }, 1000)

    }



    //load session of user
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open(
        "GET",
        "../../../backend/api/users/user_fetch_self.php"
    );
    xhttp2.send();
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            // console.log(results);
            if (user_profile[1] === results.user_id) {
                window.location.href = "profile.php";
            } else {

            }
            if (results.profile_photo === "") {} else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);

        }
    }

    $(document).on('click', '#send-message', function() {
        $("#modal-sendmessage").fadeIn();
    });

    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keyup", e => {
        textarea.style.height = "30px";
        let scHeight = e.target.scrollHeight;
        textarea.style.height = `${scHeight}px`;
        textarea.style.maxHeight = "150px";
    })

    //************ view profile ************//
    $(document).on('click', '.view-profile', function() {
        var user_id_profile = $(this).attr("id");
        window.location.href = "view-profile.php?uid=" + user_id_profile;
        // alert(user_id_profile)
    });

    //************ send message ************//
    $(document).on('click', '#send-btn', function() {
        $("#loading-circlee").show();
        var message_data = {
            incoming_msg_id: send_message_id,
            msg: $("#input-message").val().trim()
        };
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../backend/api/messages/send_message.php"
        );
        xhttp.send(JSON.stringify(message_data));
        xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    let results = JSON.parse(this.response);
                    // console.log(results);
                    $("#loading-circlee").hide();
                    $("#input-message").val("");
                    $("#id01").fadeIn();
                    $("#modal-sendmessage").fadeOut();
                    // alert("message sent");
                }
            }
            // var user_id_profile = $(this).attr("id");
            // window.location.href = "view-profile.php?uid=" + user_id_profile;
            // alert(user_id_profile)
    });

    $(document).on('click', '.logout', function(e) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../backend/api/users/logout.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                window.location.href = "../../../frontend/";
            } else if (this.readyState == 4 && this.status == 500) {

            } else if (this.readyState == 4 && this.status == 404) {}
        };
    })

    $(document).on('click', '#drop-talent', function() {
        if ($("#talent-mobile-dropdown").css("height") == '20px') {
            $("#talent-mobile-dropdown").css({
                height: "125px",
                display: "block"
            });
        } else {
            $("#talent-mobile-dropdown").css({
                height: "20px",
                display: "none",
            });
        }
    });

    $(document).on('click', '#drop-jobs', function() {
        if ($("#jobs-mobile-dropdown").css("height") == '20px') {
            $("#jobs-mobile-dropdown").css({
                height: "125px",
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

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}