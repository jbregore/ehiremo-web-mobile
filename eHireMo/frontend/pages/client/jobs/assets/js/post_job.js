window.onload = function() {
    //load session of user
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            console.log(results);
            if (results.profile_photo === "") {} else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);

        }
    }

    $('#h-rate').on('change', function(event) {
        $('#input-project-based').val("");
        $('#input-project-based').attr('disabled', true);
        $('#input-project-based').attr('style', "background-color: #efefef;");
        $('#input-hourly-rate').attr('disabled', false);
        $('#input-hourly-rate').attr('style', "background-color: #fff;");
    });

    $('#f-rate').on('change', function(event) {
        $('#input-hourly-rate').val("");
        $('#input-hourly-rate').attr('disabled', true);
        $('#input-hourly-rate').attr('style', "background-color: #efefef;");
        $('#input-project-based').attr('disabled', false);
        $('#input-project-based').attr('style', "background-color: #fff;");
    });

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
        if ($("#input-skills").val() === "") {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
            $("#span-services").text("Invalid");
            return;
        }
        $("#span-services").attr("style", "opacity:0;");
        var ul = document.getElementById("skills-container");
        var li = document.createElement("button");
        var list_skills = $('#input-skills').val();
        NewSkills = list_skills.replace(/\b[a-z]/g, function(txtjq2) {
            return txtjq2.toUpperCase();
        });
        li.setAttribute('id', $("#input-skills").val());
        li.appendChild(document.createTextNode(NewSkills));
        ul.appendChild(li);
        myArray.push(NewSkills);
        $("#input-skills").val("");
        li.onclick = function() {
            this.parentElement.removeChild(this);
            myArray = removeItemFromArray(myArray, this.innerText);
        };
    });

    // ********** post-job-form ********** //
    $('#post-job-form').on('submit', function(event) {
        event.preventDefault();

        var rate = document.getElementsByName('choice-rate');
        var rate_value = "";
        var rate_value_desc = "";

        for (let i of rate) {
            if (i.checked) {
                // console.log(i.id);
                if (i.id === "h-rate") {
                    rate_value = $("#input-hourly-rate").val();
                    rate_value_desc = "Hourly Rate";
                } else {
                    rate_value = $("#input-project-based").val();
                    rate_value_desc = "Fixed Rate";
                }
            }
        }

        var job_loc = $('#input-location').val();
        NewLocation = job_loc.replace(/\b[a-z]/g, function(txtjq) {
            return txtjq.toUpperCase();
        });

        var job_data = {
            job_headline: $("#input-headline").val().charAt(0).toUpperCase() + $("#input-headline").val().slice(1),
            job_location: NewLocation,
            job_services: myArray,
            job_age: $("#input-range").val(),
            job_scope: $("#select-scope").val(),
            job_rate_desc: rate_value_desc,
            job_rate: rate_value.charAt(0).toUpperCase() + rate_value.slice(1),
            job_desc: $("#input-desc").val().charAt(0).toUpperCase() + $("#input-desc").val().slice(1)
        }

        var valid = 0;
        if (myArray.length === 0) {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        } else {
            $("#span-services").attr("style", "opacity:0;");
            valid++;
        }

        console.log(job_data);
        if (valid !== 1) {
            valid = 0;
        } else {
            //add data
            $("#loading-circle").show();
            var xhttp = new XMLHttpRequest();
            xhttp.open(
                "POST",
                "../../../../backend/api/jobs/create_job.php"
            );
            xhttp.send(JSON.stringify(job_data));
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    let results = JSON.parse(this.response);
                    // $("#web-name").html(results.fname);
                    // $("#mobile-name").html(results.name);
                    // $("#input-firstname").val(results.name);
                    // $("#input-address").val(results.address);
                    // $("#input-date").val(results.birthday);
                    $("#loading-circle").hide();
                    $("#id01").fadeIn();
                    // alert("Posted Successfully");
                    myArray = [];
                    document.getElementById("post-job-form").reset();
                    $("#skills-container").html('');
                    // console.log(results);
                } else if (this.readyState == 4 && this.status == 500) {

                } else if (this.readyState == 4 && this.status == 404) {}
            };
        }

    });

    $(document).on('click', '.logout', function(e) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../../backend/api/users/logout.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                window.location.href = "../../../../frontend/";
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