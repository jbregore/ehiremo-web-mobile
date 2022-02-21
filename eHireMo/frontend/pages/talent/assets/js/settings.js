window.onload = function() {
    //load session of user
    var services = [];

    function removeItemFromArray(array, n) {
        const newArray = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] !== n) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);

            if (results.profile_photo === "") {} else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#web-profile2").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
                $("#profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);

            $("#input-firstname").val(results.name);
            $("#input-address").val(results.address);
            $("#input-date").val(results.birthday);
            $("#input-rate").val(results.rate);
            $("#input-intro").val(results.self_intro);

            if (results.portfolio === "") {
                $("#view-portfolio").attr("style", "display:none");
            } else {
                $("#view-portfolio").attr("href", results.portfolio);
            }
            if (results.service_offer !== "") {


                services = results.service_offer.split(",");
                // services = results.service_offer;
                var ul = document.getElementById("skills-container");
                for (let i = 0; i < services.length; i++) {
                    var li = document.createElement("button");
                    li.setAttribute('id', services[i]);
                    li.appendChild(document.createTextNode(services[i]));
                    ul.appendChild(li);
                    li.onclick = function() {
                        this.parentElement.removeChild(this);
                        services = removeItemFromArray(services, this.innerText);
                    };
                }
            }

            console.log(results);
        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) {}
    };

    $(document).on('click', '#add-skill', function() {
        if ($("#input-services").val() === "") {
            // alert("Invalid");
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
            $("#span-services").text("Invalid");
            return;
        }
        $("#span-services").attr("style", "opacity:0");
        var ul = document.getElementById("skills-container");
        var li = document.createElement("button");
        li.setAttribute('id', $("#input-services").val());
        li.appendChild(document.createTextNode($("#input-services").val()));
        ul.appendChild(li);
        services.push($("#input-services").val());
        $("#input-services").val("");
        li.onclick = function() {
            this.parentElement.removeChild(this);
            services = removeItemFromArray(services, this.innerText);
        };
    });

    $(document).on('click', '#yes-changes', function() {
        // console.log(services);
        var valid = 0;
        if ($("#input-rate").val() == '') {
            $("#span-rate").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        } else {
            $("#span-rate").attr("style", "opacity:0;");
            valid++;
        }
        if (services.length === 0) {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
            $("#span-services").text("Please fill this field.");
        } else {
            $("#span-services").attr("style", "opacity:0;");
            valid++;
        }
        if ($("#input-intro").val() == '') {
            $("#span-intro").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        } else {
            $("#span-intro").attr("style", "opacity:0;");
            valid++;
        }
        // if ($("#view-portfolio").attr("href") == '') {
        //     $("#span-portfolio").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        // } else {
        //     $("#span-portfolio").attr("style", "opacity:0;");
        //     valid++;
        // }
        // if ($("#input-portfolio").val() == '') {
        //     $("#span-portfolio").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        // } else {
        //     $("#span-portfolio").attr("style", "opacity:0;");
        //     valid++;
        // }

        if (valid !== 3) {
            // alert("Please fill the fields");
            valid = 0;
        } else {
            //update info
            $("#loading-circle").show();
            if ($("#upload").val() == '') {
                //no image upload
                if ($("#input-portfolio").val() == '') {
                    // no portfolio update
                    // alert("No portfolio update");

                    var user_data = {
                        pay_rate: $("#input-rate").val(),
                        services_offer: services,
                        self_intro: $("#input-intro").val(),
                        portfolio: $("#view-portfolio").attr('href')
                    }

                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "PUT",
                        "../../../backend/api/users/talent_getting_started.php"
                    );
                    xhttp.send(JSON.stringify(user_data));
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 201) {
                            // alert("Profile Updated.");
                            $("#loading-circle").hide();
                            $("#id02").fadeIn();
                            // window.location.href = "jobs/all-job-post.html";
                        } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                    };

                } else {
                    //new portfolio
                    // alert("New portfolio");
                    var xhttp = new XMLHttpRequest();
                    var inputPortfolio = document.getElementById("input-portfolio").files[0];
                    var formData = new FormData();
                    formData.append('input-portfolio', inputPortfolio);

                    xhttp.open(
                        "POST",
                        "../../../backend/api/portfolio_upload.php"
                    );
                    xhttp.send(formData);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results.url);

                            var user_data = {
                                pay_rate: $("#input-rate").val(),
                                services_offer: services,
                                self_intro: $("#input-intro").val(),
                                portfolio: results.url
                            }

                            // console.log(user_data);
                            xhttp.open(
                                "PUT",
                                "../../../backend/api/users/talent_getting_started.php"
                            );
                            xhttp.send(JSON.stringify(user_data));
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 201) {
                                    // alert("Profile Updated.");
                                    $("#loading-circle").hide();
                                    $("#id02").fadeIn();
                                    // window.location.href = "jobs/all-job-post.html";
                                } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                            };
                        }
                    }
                }


            } else {
                //image upload
                // alert("new upload");

                if ($("#input-portfolio").val() == '') {
                    // no portfolio update
                    // alert("No portfolio update");

                    var xhttp = new XMLHttpRequest();
                    var profile_pic = document.getElementById("upload").files[0];
                    var formData = new FormData();
                    formData.append('upload', profile_pic);

                    xhttp.open(
                        "POST",
                        "../../../backend/api/profile_picture_upload.php"
                    );
                    xhttp.send(formData);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results.urlpic);

                            var user_data = {
                                profile_picture: results.urlpic,
                                pay_rate: $("#input-rate").val(),
                                services_offer: services,
                                self_intro: $("#input-intro").val(),
                                portfolio: $("#view-portfolio").attr('href')
                            }

                            console.log(user_data);
                            xhttp.open(
                                "PUT",
                                "../../../backend/api/users/talent_getting_started_pic.php"
                            );
                            xhttp.send(JSON.stringify(user_data));
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 201) {
                                    // alert("Profile Updated.");
                                    $("#loading-circle").hide();
                                    $("#id02").fadeIn();
                                    // window.location.href = "jobs/all-job-post.html";
                                } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                            };

                        }


                    }
                } else {
                    //new portfolio
                    // alert("New portfolio");
                    var xhttp = new XMLHttpRequest();
                    var inputPortfolio = document.getElementById("input-portfolio").files[0];
                    var formData = new FormData();
                    formData.append('input-portfolio', inputPortfolio);

                    xhttp.open(
                        "POST",
                        "../../../backend/api/portfolio_upload.php"
                    );
                    xhttp.send(formData);
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let resultss = JSON.parse(this.response);
                            // console.log(results.url);

                            var xhttp = new XMLHttpRequest();
                            var profile_pic = document.getElementById("upload").files[0];
                            var formData = new FormData();
                            formData.append('upload', profile_pic);

                            xhttp.open(
                                "POST",
                                "../../../backend/api/profile_picture_upload.php"
                            );
                            xhttp.send(formData);
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    let results = JSON.parse(this.response);
                                    console.log(results.urlpic);

                                    var user_data = {
                                        profile_picture: results.urlpic,
                                        pay_rate: $("#input-rate").val(),
                                        services_offer: services,
                                        self_intro: $("#input-intro").val(),
                                        portfolio: resultss.url
                                    }

                                    console.log(user_data);
                                    xhttp.open(
                                        "PUT",
                                        "../../../backend/api/users/talent_getting_started_pic.php"
                                    );
                                    xhttp.send(JSON.stringify(user_data));
                                    xhttp.onreadystatechange = function() {
                                        if (this.readyState == 4 && this.status == 201) {
                                            // alert("Profile Updated.");
                                            $("#loading-circle").hide();
                                            $("#id02").fadeIn();
                                            // window.location.href = "jobs/all-job-post.html";
                                        } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                                    };

                                }
                            }
                        }
                    }
                }

                //upload portfolio link
                // var xhttp = new XMLHttpRequest();
                // var inputPortfolio = document.getElementById("input-portfolio").files[0];
                // var formData = new FormData();
                // formData.append('input-portfolio', inputPortfolio);

                // xhttp.open(
                //     "POST",
                //     "../../../backend/api/portfolio_upload.php"
                // );
                // xhttp.send(formData);
                // xhttp.onreadystatechange = function() {
                //     if (this.readyState == 4 && this.status == 200) {
                //         let resultss = JSON.parse(this.response);
                //         console.log(resultss.url);

                //         var xhttp = new XMLHttpRequest();
                //         var profile_pic = document.getElementById("upload").files[0];
                //         var formData = new FormData();
                //         formData.append('upload', profile_pic);

                //         xhttp.open(
                //             "POST",
                //             "../../../backend/api/profile_picture_upload.php"
                //         );
                //         xhttp.send(formData);
                //         xhttp.onreadystatechange = function() {
                //             if (this.readyState == 4 && this.status == 200) {
                //                 let results = JSON.parse(this.response);
                //                 console.log(results.urlpic);

                //                 var user_data = {
                //                     profile_picture: results.urlpic,
                //                     pay_rate: $("#input-rate").val(),
                //                     services_offer: services,
                //                     self_intro: $("#input-intro").val(),
                //                     portfolio: resultss.url
                //                 }

                //                 console.log(user_data);
                //                 xhttp.open(
                //                     "PUT",
                //                     "../../../backend/api/users/talent_getting_started_pic.php"
                //                 );
                //                 xhttp.send(JSON.stringify(user_data));
                //                 xhttp.onreadystatechange = function() {
                //                     if (this.readyState == 4 && this.status == 201) {
                //                         alert("Profile Updated.");
                //                         window.location.href = "jobs/all-job-post.html";
                //                     } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                //                 };

                //             }
                //         }


                //     }
                // }
            }
        }
    });

    $(document).on('click', '#continue', function() {
        $("#id03").fadeIn();
    });

    $(document).on('click', '#switch-role', function() {
        $("#id04").fadeIn();
    });

    $(document).on('click', '#yes-switch-role', function() {
        $("#loading-circle").show();
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../backend/api/users/switch_into_client.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                $("#loading-circle").hide();
                $("#id05").fadeIn();
                setTimeout(() => {
                    window.location.href = "../client/settings.php";
                }, 1500);
            }
        }

    });



    //change password
    $(document).on('click', '#save-btn', function() {
        if (!$("#old-password").val() || !$("#new-password").val() || !$("#conf-password").val()) {
            $('#validation-display').css("display", "block");
            $('#validation-text').text("Please fill all the fields.");
            return;
        } else {
            if ($("#new-password").val().length < 8) {
                $('#validation-display').css("display", "block");
                $('#validation-text').text("Password must be least of 8 characters long.");
                return;
            } else if ($("#new-password").val() !== $("#conf-password").val()) {
                $('#validation-display').css("display", "block");
                $('#validation-text').text("Password not match.");
                return;
            } else {
                $("#loading-circle").show();
                var password_data = {
                    old_password: $("#old-password").val(),
                    new_password: $("#new-password").val()
                }

                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "POST",
                    "../../../backend/api/users/change_password.php"
                );
                xhttp.send(JSON.stringify(password_data));
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        // alert("Password Success")
                        $("#loading-circle").hide();
                        $("#modal-password").attr("style", "display:none");
                        $("#id01").fadeIn();

                        // console.log(results);
                    } else if (this.readyState == 4 && this.status == 500) {
                        $("#loading-circle").hide();
                        $('#validation-display').css("display", "block");
                        $('#validation-text').text("Wrong password please try again.");
                        return;
                    } else if (this.readyState == 4 && this.status == 404) {}
                };

            }

        }

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

    $(document).on('click', '#drop-jobs', function() {
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

    $(document).on('click', '#change-password', function() {
        $("#modal-password").fadeIn();
    });

    $(document).on('click', '#close-password', function() {
        $("#modal-password").fadeOut();
    });
}

//file preview
function previewFile() {
    var preview = document.getElementById('profile-picture');
    var file = document.getElementById('upload').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}