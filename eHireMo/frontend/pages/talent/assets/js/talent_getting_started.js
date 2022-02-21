window.onload = function() {
    //load session of user
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);
            $("#input-firstname").val(results.name);
            $("#input-address").val(results.address);
            $("#input-date").val(results.birthday);

            console.log(results);
        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) {}
    };

    var myArray = [];

    function removeItemFromArray(array, n) {
        const newArray = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i] !== n) {
                newArray.push(array[i]);
            }
        }
        return newArray;
    }


    $(document).on('click', '#add-skill', function() {
        if ($("#input-services").val() === "") {
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
        myArray.push($("#input-services").val());
        $("#input-services").val("");
        li.onclick = function() {
            // console.log(myArray);
            // console.log(this.innerText);
            // myArray.filter(function(f) { return f != this.innerText })
            this.parentElement.removeChild(this);
            myArray = removeItemFromArray(myArray, this.innerText);
        };
    });

    $(document).on('click', '#continue', function() {
        var valid = 0;
        if ($("#input-rate").val() == '') {
            $("#span-rate").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        } else {
            $("#span-rate").attr("style", "opacity:0;");
            valid++;
        }
        if (myArray.length === 0) {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
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

                //upload portfolio link
                if ($("#input-portfolio").val() == '') {
                    var user_data = {
                        pay_rate: $("#input-rate").val(),
                        services_offer: myArray,
                        self_intro: $("#input-intro").val(),
                        portfolio: ""
                    }

                    console.log(user_data);
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
                            setTimeout(() => {
                                window.location.href = "jobs/all-job-post.php";
                            }, 1500);
                        } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                    };
                    return;
                }
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
                            services_offer: myArray,
                            self_intro: $("#input-intro").val(),
                            portfolio: results.url
                        }

                        console.log(user_data);
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
                                setTimeout(() => {
                                    window.location.href = "jobs/all-job-post.php";
                                }, 1500);
                            } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                        };
                    }
                }

            } else {
                //image upload

                if ($("#input-portfolio").val() == '') {
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
                                services_offer: myArray,
                                self_intro: $("#input-intro").val(),
                                portfolio: ""
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
                                    setTimeout(() => {
                                        window.location.href = "jobs/all-job-post.php";
                                    }, 1500);
                                } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                            };

                        }
                    }
                    return;
                }
                //upload portfolio link
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
                        console.log(resultss.url);

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
                                    services_offer: myArray,
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
                                        setTimeout(() => {
                                            window.location.href = "jobs/all-job-post.php";
                                        }, 1500);
                                    } else if (this.readyState == 4 && this.status == 500) {} else if (this.readyState == 4 && this.status == 404) {}
                                };

                            }
                        }


                    }
                }
            }
        }
    });

    // $(document).on('click', '#show-test', function() {
    //     // var one = $('#skills-container button').text();
    //     // console.log(myArray);
    //     console.log(myArray);
    // });

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