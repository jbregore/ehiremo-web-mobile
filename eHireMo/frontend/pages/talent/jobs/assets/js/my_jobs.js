window.onload = function() {
    var current_page = 1;
    var current_search_page = 1;
    var load_search_data = {};
    var job_post_id = "";
    var appoint_id_feed = [];
    var kosa_feed = "";
    var user_id_notif_from = "";

    //************ load session of user ************//
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
            user_id_notif_from = results.user_id;
            if (results.profile_photo === "") {} else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#web-profile-picture2").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);
        }
    }

    //************ load page function ************//
    load_data(current_page);

    function load_data(page, action) {
        var user_page = {
            pagee: page,
            limit: null,
            start: null
        }
        if (action === "search") {
            load_search_data.pagee = current_search_page;
            $.ajax({
                url: "../../../../backend/api/users/search_my_job.php",
                method: "POST",
                data: JSON.stringify(load_search_data),
                success: function(data) {
                    console.log(data);

                    $('#profile-lists').html('');
                    if (data && data.length == 0) {
                        document.getElementById("profile-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                            <div class="col-2 col-2-22">
                                <div class="col-2-2">
                                    <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span>0 Current Jobs found.</p>
                                    <label style="color:#555;font-size: 16px;
                                    margin-right: 10px;
                                    margin-top: 3px;">Filter by: </label>
                                    <select id="select-sort">
                                        <option value="name">Name</option>
                                    </select>
                                </div>
    
                                <div style="flex-basis: 50%;">
                                    <div class="wrapper">
                                        <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                        <input placeholder="Search" type="text" class="search" id="search-txt">
                                        <button id="continue-search">Go</button>
                                    </div>
                                </div>
                            </div>
                            `
                        );

                        document.getElementById("profile-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                                    <div class="col-2" id="page-btn">
    
                                        <div style="width: 70%;">
                                            <p style="font-weight:normal;color:#555;font-size: 14px;">End of results.</p>
                                        </div>
    
                                        <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                            <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                        </div>
    
                                    </div>
    
                                    `
                        );

                        $('#prev-page').on('click', function(event) {
                            $('#profile-lists').html('');
                            load_data(1);
                            current_page = 1;
                            current_search_page = 1;
                            $('#prev-page').attr("style", "display:none;");
                        });

                        return;
                    }
                    //get count of total hired freelancer search
                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                    <div class="col-2 col-2-22">

                        <div class="col-2-2">
                            <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span> Current Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;">Filter by: </label>
                            <select id="select-sort">
                                <option value="name">Name</option>
                            </select>
                        </div>

                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                    `
                    );

                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/users/my_job_count_search.php"
                    );
                    xhttp.send(JSON.stringify(search_data));
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results)
                            $("#total-count").text(results.total_freelancer_count.total_freelancer_count);
                            $("#total-count-first").text(results.total_freelancer_count.total_freelancer_count);
                        }
                    }

                    var rowCount = 0;
                    for (let row of data) {
                        // console.log("1")
                        console.log(row)
                        var status = ``;
                        if (row.c_status === "cancel") {
                            status = `<p class="p-grey" style="color: #1d4354;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to cancel this appointment.</p>`;
                        } else if (row.c_status === "done") {
                            status = `<p class="p-grey" style="color: #14a800;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to mark this appointment as done.</p>`;
                        }
                        if (row.status === "done") {} else {
                            rowCount++;
                            var xhttp = new XMLHttpRequest();
                            xhttp.open(
                                "POST",
                                "../../../../backend/api/users/view_profile_id.php"
                            );
                            xhttp.send(JSON.stringify({ id: row.client_id }));
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    let results = JSON.parse(this.response);
                                    // console.log(results);
                                    $(`#img${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                                    $(`#name${row.id}`).text(results.name);
                                    $(`#statusname${row.id}`).text(results.fname);
                                    $(`#addr${row.id}`).text(results.address);
                                    $(function() {
                                        $(`#rateYo${row.id}`).rateYo({
                                            "rating": results.rating,
                                            starWidth: "17px",
                                            normalFill: "#A0A0A0",
                                            ratedFill: "#14a800",
                                            readOnly: true
                                        });
                                    });
                                    $(`#rateYoNum${row.id}`).text(results.rating.substring(0,3));
                                }
                            }

                            $.ajax({
                                type: 'GET',
                                url: '../../../../backend/api/jobs/fetch_edit_job.php',
                                data: { id: row.jobpost_id },
                                success: function(data) {
                                    console.log(data)
                                    $(`#hl${row.id}`).text(data.job_headline);
                                    $(`#dsc${row.id}`).text(data.job_desc);
                                    // data.job_headline
                                    //data.job_desc
                                }
                            })

                            var cancel_status = "";
                            if (row.f_status === "cancel") {
                                cancel_status = "cancel request sent.";
                            } else {
                                cancel_status = "cancel";
                            }

                            var markdone_status = "";
                            if (row.f_status === "done") {
                                markdone_status = "Mark as done request sent.";
                            } else {
                                markdone_status = "Mark as done";
                            }

                            document.getElementById("profile-lists").insertAdjacentHTML(
                                "beforeend",
                                `
                        <div class="col-2 less-padding" style="text-align: left;
                        justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                            <div style="text-align: left;display: flex;flex-direction: row;
                            border-bottom: 1px solid rgb(214, 214, 214);margin-bottom:15px;">
                                <div class="div-1">
                                    <img alt="" id="img${row.id}" style="border-radius: 50%;object-fit:cover;" src="../assets/images/people.png" width="70" height="70" />
                                </div>

                                <div class="div-2">
                                    <h1 style="color: #14a800;text-decoration:underline;cursor:pointer;" class="view-profile" id="${row.user_id}">
                                    <span style="color: #14a800;text-decoration:underline;cursor:pointer;" id="name${row.id}"></span></h1>
                                    <p class="p-grey" style="color: #555;" id="addr${row.id}"></p>
                                    <div style="display:flex;flex-direction:row;justify-content:flex-start;">
                                        <p class="p-grey" style="font-size:14px;color:#555;"> Rating : <span id="rateYoNum${row.id}" style="color:#14a800"> </span></p>
                                        <div id="rateYo${row.id}">

                                        </div>
                                    </div>
                                    ${status}
                                    </br>

                                </div>

                                <div class="div-3">
                                <button class="cancel-appointment" id="aid${row.id}/aid${row.client_id}">${cancel_status}</button>
                                </div>
                            </div>

                            <div class="" >
                                <p class="p-grey">Service : <span style="color: #14a800;">${row.service}</span></p>
                                <p class="p-grey">Project budget : <span style="color: #14a800;">${row.proj_cost}</span></p>
                                <p class="p-grey">Project address : <span style="color: #14a800;">${row.proj_addr}</span></p>
                                <p class="p-grey">Start date : <span style="color: #14a800;">${row.start_date}</span></p>
                                <p class="p-grey">End date : <span style="color: #14a800;">${row.end_date}</span></p>
                            </div>

                            <div class="" >
                                <p class="p-grey">Job Headline : <span style="color: #14a800;" id="hl${row.id}"></span></p>
                                <p class="p-grey">Job Description : <span style="color: #14a800;" id="dsc${row.id}"></span></p>
                            </div>
                            <button style="margin-top:30px;" class="mark-done" id="msd${row.id}/${row.client_id}"> ${markdone_status}</button>



                        </div>
                        `
                            );
                        }
                    }

                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                    <div class="col-2" id="page-btn">
    
                                        <div style="width: 70%;">
                                            <p style="font-weight:normal;color:#555;font-size: 14px;">${rowCount} out of 
                                            <span id="total-count"> </span> Current Jobs</p>
                                        </div>
    
                                        <div class="controls-div">
                                            <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                            <p style="color:#555;font-size: 20px;
                                                margin-left: 10px;margin-right: 10px;"><u>${current_search_page}</u></p>
                                            <button id="next-page" class="control-btn"> Next &#10095;</button>
                                        </div>
    
                                    </div>
    
                            `
                    );
                    if (current_search_page === 1) {
                        $('#prev-page').attr("style", "opacity:0;");
                    } else {
                        $('#prev-page').attr("style", "opacity:1;");
                    }

                    $('#next-page').on('click', function(event) {
                        $('#profile-lists').html('');
                        var new_page = ++current_search_page;
                        load_data(new_page, "search");
                        current_search_page = new_page;
                    });

                    $('#prev-page').on('click', function(event) {
                        $('#profile-lists').html('');
                        var new_page = --current_search_page;
                        if (new_page === 0) {
                            load_data(1);
                            current_search_page = 1;
                            $('#prev-page').attr("style", "display:none;");
                        } else {
                            load_data(new_page, "search");
                            current_search_page = new_page;
                        }
                    });

                    // $("#result").html(data);

                }
            })
            return;
        }
        $.ajax({
            url: "../../../../backend/api/appointments/freelancer_fetch_my_appointments.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify(user_page),
            success: function(data) {
                $('#profile-lists').html('');
                console.log(data);

                if (page === 1) {
                    var rowCount = 0;
                    for (let row1 of data) {
                        if (row1.status === "done") {} else {
                            rowCount++;
                        }
                    }
                    if (rowCount === 0) {
                        $("#no-data").html("");
                        $("#no-data").attr("style", "opacity:1;");
                        $("#profile-lists").attr("style", "display:none;");
                        document.getElementById("no-data").insertAdjacentHTML(
                            "beforeend",
                            `
                            <div class="col-2" style="border-bottom: 1px solid rgb(214, 214, 214);
                            padding-top: 30px;text-align: center;">
            
                                <img alt="" src="assets/images/12.jpg" width="200"/>
                                <h1>You dont have job yet.</h1>
                                <p style="color:#555;font-size:16px;">
                                    <span style="color: #14a800;text-decoration: underline;
                                    cursor: pointer;" onclick="window.location.href = 'all-job-post.php'">
                                        Search for clients</span>
                                     that needs your service.
                                </p>
                            </div>
                            `
                        );
                        return;
                    }
                }

                if (data && data.length == 0 && page !== 1) {
                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-2 col-2-22">
                            <div class="col-2-2">
                                <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span>0 Current Jobs found.</p>
                                <label style="color:#555;font-size: 16px;
                                margin-right: 10px;
                                margin-top: 3px;">Filter by: </label>
                                <select id="select-sort">
                                    <option value="name">Name</option>
                                </select>
                            </div>

                            <div style="flex-basis: 50%;">
                                <div class="wrapper">
                                    <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                    <input placeholder="Search" type="text" class="search" id="search-txt">
                                    <button id="continue-search">Go</button>
                                </div>
                            </div>
                        </div>
                        `
                    );

                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                <div class="col-2" id="page-btn">

                                    <div style="width: 70%;">
                                        <p style="font-weight:normal;color:#555;font-size: 14px;">End of results.</p>
                                    </div>

                                    <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                        <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                    </div>

                                </div>

                                `
                    );

                    $('#prev-page').on('click', function(event) {
                        $('#profile-lists').html('');
                        load_data(1);
                        current_page = 1;
                        current_search_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    });
                    return;
                }

                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "GET",
                    "../../../../backend/api/users/freelancer_my_job_count.php"
                );
                xhttp.send();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        $("#total-count").text(results.total_freelancer_count.total_freelancer_count);
                        $("#total-count-first").text(results.total_freelancer_count.total_freelancer_count);
                    }
                }

                document.getElementById("profile-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="col-2 col-2-22">

                        <div class="col-2-2">
                            <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span> Current Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;">Filter by: </label>
                            <select id="select-sort">
                                <option value="name">Name</option>
                            </select>
                        </div>

                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                    `
                );

                var rowCount = 0;
                for (let row of data) {
                    // console.log("1")
                    console.log(row)

                    var status = ``;
                    if (row.c_status === "cancel") {
                        status = `<p class="p-grey" style="color: #1d4354;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to cancel this appointment.</p>`;
                    } else if (row.c_status === "done") {
                        status = `<p class="p-grey" style="color: #14a800;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to mark this appointment as done.</p>`;
                    }

                    if (row.status === "done") {} else {
                        rowCount++;
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../../backend/api/users/view_profile_id.php"
                        );
                        xhttp.send(JSON.stringify({ id: row.client_id }));
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                // console.log(results);
                                $(`#img${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                                $(`#name${row.id}`).text(results.name);
                                $(`#statusname${row.id}`).text(results.fname);
                                $(`#addr${row.id}`).text(results.address);
                                $(function() {
                                    $(`#rateYo${row.id}`).rateYo({
                                        "rating": results.rating,
                                        starWidth: "17px",
                                        normalFill: "#A0A0A0",
                                        ratedFill: "#14a800",
                                        readOnly: true
                                    });
                                });
                                $(`#rateYoNum${row.id}`).text(results.rating.substring(0,3));
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '../../../../backend/api/jobs/fetch_edit_job.php',
                            data: { id: row.jobpost_id },
                            success: function(data) {
                                console.log(data)
                                $(`#hl${row.id}`).text(data.job_headline);
                                $(`#dsc${row.id}`).text(data.job_desc);
                                // data.job_headline
                                //data.job_desc
                            }
                        })

                        var cancel_status = "";
                        if (row.f_status === "cancel") {
                            cancel_status = "cancel request sent.";
                        } else {
                            cancel_status = "cancel";
                        }

                        var markdone_status = "";
                        if (row.f_status === "done") {
                            markdone_status = "Mark as done request sent.";
                        } else {
                            markdone_status = "Mark as done";
                        }

                        document.getElementById("profile-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                        <div class="col-2 less-padding" style="text-align: left;
                        justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                            <div style="text-align: left;display: flex;flex-direction: row;
                            border-bottom: 1px solid rgb(214, 214, 214);margin-bottom:15px;">
                                <div class="div-1">
                                    <img alt="" id="img${row.id}" style="border-radius: 50%;object-fit:cover;" src="../assets/images/people.png" width="70" height="70" />
                                </div>

                                <div class="div-2">
                                    <h1 style="color: #14a800;text-decoration:underline;cursor:pointer;" class="view-profile" id="${row.user_id}">
                                    <span style="color: #14a800;text-decoration:underline;cursor:pointer;" id="name${row.id}"></span></h1>
                                    <p class="p-grey" style="color: #555;" id="addr${row.id}"></p>
                                    <div style="display:flex;flex-direction:row;justify-content:flex-start;">
                                        <p class="p-grey" style="font-size:14px;color:#555;"> Rating : <span id="rateYoNum${row.id}" style="color:#14a800"> </span></p>
                                        <div id="rateYo${row.id}">

                                        </div>
                                    </div>
                                    ${status}
                                    </br>

                                </div>

                                <div class="div-3">
                                <button class="cancel-appointment" id="aid${row.id}/aid${row.client_id}">${cancel_status}</button>
                                </div>
                            </div>

                            <div class="" >
                                <p class="p-grey">Service : <span style="color: #14a800;">${row.service}</span></p>
                                <p class="p-grey">Project budget : <span style="color: #14a800;">${row.proj_cost}</span></p>
                                <p class="p-grey">Project address : <span style="color: #14a800;">${row.proj_addr}</span></p>
                                <p class="p-grey">Start date : <span style="color: #14a800;">${row.start_date}</span></p>
                                <p class="p-grey">End date : <span style="color: #14a800;">${row.end_date}</span></p>
                            </div>

                            <div class="" >
                                <p class="p-grey">Job Headline : <span style="color: #14a800;" id="hl${row.id}"></span></p>
                                <p class="p-grey">Job Description : <span style="color: #14a800;" id="dsc${row.id}"></span></p>
                            </div>
                            <button style="margin-top:30px;" class="mark-done" id="msd${row.id}/${row.client_id}"> ${markdone_status}</button>



                        </div>
                        `
                        );
                    }
                }

                document.getElementById("profile-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                                <div class="col-2" id="page-btn">

                                    <div style="width: 70%;">
                                        <p style="font-weight:normal;color:#555;font-size: 14px;">${rowCount} out of 
                                        <span id="total-count"> </span> Current Jobs</p>
                                    </div>

                                    <div class="controls-div">
                                        <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                        <p style="color:#555;font-size: 20px;
                                            margin-left: 10px;margin-right: 10px;"><u>${current_page}</u></p>
                                        <button id="next-page" class="control-btn"> Next &#10095;</button>
                                    </div>

                                </div>

                        `
                );
                if (current_page === 1) {
                    $('#prev-page').attr("style", "opacity:0;");
                } else {
                    $('#prev-page').attr("style", "opacity:1;");
                }

                $('#next-page').on('click', function(event) {
                    $('#profile-lists').html('');
                    var new_page = ++current_page;
                    load_data(new_page);
                    current_page = new_page;
                });

                $('#prev-page').on('click', function(event) {
                    $('#profile-lists').html('');
                    var new_page = --current_page;
                    if (new_page === 0) {
                        load_data(1);
                        current_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    } else {
                        load_data(new_page);
                        current_page = new_page;
                    }
                });
            }
        })
    }

    //************ search freelancer data  ************//
    $(document).on('click', '#continue-search', function() {
        var txt = $("#search-txt").val();
        current_search_page = 1;
        var search_data = {
            search: txt,
            filter: "name",
            pagee: current_search_page
        }
        load_search_data = {
            search: txt,
            filter: "name",
        };
        console.log(search_data);
        $.ajax({
            url: "../../../../backend/api/users/search_my_job.php",
            method: "POST",
            data: JSON.stringify(search_data),
            success: function(data) {
                console.log(data);

                $('#profile-lists').html('');
                if (data && data.length == 0) {
                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-2 col-2-22">
                            <div class="col-2-2">
                                <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span>0 Current Jobs found.</p>
                                <label style="color:#555;font-size: 16px;
                                margin-right: 10px;
                                margin-top: 3px;">Filter by: </label>
                                <select id="select-sort">
                                    <option value="name">Name</option>
                                </select>
                            </div>

                            <div style="flex-basis: 50%;">
                                <div class="wrapper">
                                    <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                    <input placeholder="Search" type="text" class="search" id="search-txt">
                                    <button id="continue-search">Go</button>
                                </div>
                            </div>
                        </div>
                        `
                    );

                    document.getElementById("profile-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                <div class="col-2" id="page-btn">

                                    <div style="width: 70%;">
                                        <p style="font-weight:normal;color:#555;font-size: 14px;">End of results.</p>
                                    </div>

                                    <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                        <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                    </div>

                                </div>

                                `
                    );

                    $('#prev-page').on('click', function(event) {
                        $('#profile-lists').html('');
                        load_data(1);
                        current_page = 1;
                        current_search_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    });

                    return;
                }

                //get count of total hired freelancer search
                document.getElementById("profile-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="col-2 col-2-22">

                        <div class="col-2-2">
                            <p style="font-weight:normal;color:#555;font-size: 14px;"><span id="total-count-first"> </span> Current Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;">Filter by: </label>
                            <select id="select-sort">
                                <option value="name">Name</option>
                            </select>
                        </div>

                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                    `
                );

                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "POST",
                    "../../../../backend/api/users/my_job_count_search.php"
                );
                xhttp.send(JSON.stringify(search_data));
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        console.log(results)
                        $("#total-count").text(results.total_freelancer_count.total_freelancer_count);
                        $("#total-count-first").text(results.total_freelancer_count.total_freelancer_count);
                    }
                }

                var rowCount = 0;
                for (let row of data) {
                    // console.log("1")
                    console.log(row)
                    var status = ``;
                    if (row.c_status === "cancel") {
                        status = `<p class="p-grey" style="color: #1d4354;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to cancel this appointment.</p>`;
                    } else if (row.c_status === "done") {
                        status = `<p class="p-grey" style="color: #14a800;text-decoration:underline;cursor:pointer;">
                        <span id="statusname${row.id}"> </span> wants to mark this appointment as done.</p>`;
                    }
                    if (row.status === "done") {} else {
                        rowCount++;
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../../backend/api/users/view_profile_id.php"
                        );
                        xhttp.send(JSON.stringify({ id: row.client_id }));
                        xhttp.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                // console.log(results);
                                $(`#img${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                                $(`#name${row.id}`).text(results.name);
                                $(`#statusname${row.id}`).text(results.fname);
                                $(`#addr${row.id}`).text(results.address);
                                $(function() {
                                    $(`#rateYo${row.id}`).rateYo({
                                        "rating": results.rating,
                                        starWidth: "17px",
                                        normalFill: "#A0A0A0",
                                        ratedFill: "#14a800",
                                        readOnly: true
                                    });
                                });
                                $(`#rateYoNum${row.id}`).text(results.rating.substring(0,3));
                            }
                        }

                        $.ajax({
                            type: 'GET',
                            url: '../../../../backend/api/jobs/fetch_edit_job.php',
                            data: { id: row.jobpost_id },
                            success: function(data) {
                                console.log(data)
                                $(`#hl${row.id}`).text(data.job_headline);
                                $(`#dsc${row.id}`).text(data.job_desc);
                                // data.job_headline
                                //data.job_desc
                            }
                        })

                        var cancel_status = "";
                        if (row.f_status === "cancel") {
                            cancel_status = "cancel request sent.";
                        } else {
                            cancel_status = "cancel";
                        }

                        var markdone_status = "";
                        if (row.f_status === "done") {
                            markdone_status = "Mark as done request sent.";
                        } else {
                            markdone_status = "Mark as done";
                        }

                        document.getElementById("profile-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                        <div class="col-2 less-padding" style="text-align: left;
                        justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                            <div style="text-align: left;display: flex;flex-direction: row;
                            border-bottom: 1px solid rgb(214, 214, 214);margin-bottom:15px;">
                                <div class="div-1">
                                    <img alt="" id="img${row.id}" style="border-radius: 50%;object-fit:cover;" src="../assets/images/people.png" width="70" height="70" />
                                </div>

                                <div class="div-2">
                                    <h1 style="color: #14a800;text-decoration:underline;cursor:pointer;" class="view-profile" id="${row.user_id}">
                                    <span style="color: #14a800;text-decoration:underline;cursor:pointer;" id="name${row.id}"></span></h1>
                                    <p class="p-grey" style="color: #555;" id="addr${row.id}"></p>
                                    <div style="display:flex;flex-direction:row;justify-content:flex-start;">
                                        <p class="p-grey" style="font-size:14px;color:#555;"> Rating : <span id="rateYoNum${row.id}" style="color:#14a800"> </span></p>
                                        <div id="rateYo${row.id}">

                                        </div>
                                    </div>
                                    ${status}
                                    </br>

                                </div>

                                <div class="div-3">
                                <button class="cancel-appointment" id="aid${row.id}/aid${row.client_id}">${cancel_status}</button>
                                </div>
                            </div>

                            <div class="" >
                                <p class="p-grey">Service : <span style="color: #14a800;">${row.service}</span></p>
                                <p class="p-grey">Project budget : <span style="color: #14a800;">${row.proj_cost}</span></p>
                                <p class="p-grey">Project address : <span style="color: #14a800;">${row.proj_addr}</span></p>
                                <p class="p-grey">Start date : <span style="color: #14a800;">${row.start_date}</span></p>
                                <p class="p-grey">End date : <span style="color: #14a800;">${row.end_date}</span></p>
                            </div>

                            <div class="" >
                                <p class="p-grey">Job Headline : <span style="color: #14a800;" id="hl${row.id}"></span></p>
                                <p class="p-grey">Job Description : <span style="color: #14a800;" id="dsc${row.id}"></span></p>
                            </div>
                            <button style="margin-top:30px;" class="mark-done" id="msd${row.id}/${row.client_id}"> ${markdone_status}</button>



                        </div>
                        `
                        );
                    }
                }

                document.getElementById("profile-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                                <div class="col-2" id="page-btn">

                                    <div style="width: 70%;">
                                        <p style="font-weight:normal;color:#555;font-size: 14px;">${rowCount} out of 
                                        <span id="total-count"> </span> Current Jobs</p>
                                    </div>

                                    <div class="controls-div">
                                        <button id="prev-page" class="control-btn"> &#10094; Previous </button>
                                        <p style="color:#555;font-size: 20px;
                                            margin-left: 10px;margin-right: 10px;"><u>${current_search_page}</u></p>
                                        <button id="next-page" class="control-btn"> Next &#10095;</button>
                                    </div>

                                </div>

                        `
                );
                if (current_search_page === 1) {
                    $('#prev-page').attr("style", "opacity:0;");
                } else {
                    $('#prev-page').attr("style", "opacity:1;");
                }

                $('#next-page').on('click', function(event) {
                    $('#profile-lists').html('');
                    var new_page = ++current_search_page;
                    load_data(new_page, "search");
                    current_search_page = new_page;
                });

                $('#prev-page').on('click', function(event) {
                    $('#profile-lists').html('');
                    var new_page = --current_search_page;
                    if (new_page === 0) {
                        load_data(1);
                        current_search_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                    } else {
                        load_data(new_page);
                        current_search_page = new_page;
                    }
                });


            }
        })
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
    });

    $(document).on('click', '.cancel-appointment', function(e) {
        e.preventDefault();
       
        var appoint_id = $(this).attr("id");
        var new_data = appoint_id.split("/");

        // alert(new_data[0].substr(3));
        $("#id01").fadeIn();
        // console.log(appoint_id.substr(3))
        var kosa = $(`#hl${new_data[0].substr(3)}`).text();
        $(document).on('click', '#decline-appoint', function(e) {
            e.preventDefault();
            // alert(appoint_id.substr(3))
            $("#loading-circle").show();
            var xhttp = new XMLHttpRequest();
            xhttp.open(
                "PUT",
                "../../../../backend/api/appointments/fcancel_appointment.php"
            );
            xhttp.send(JSON.stringify({ id: new_data[0].substr(3)}));
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 201) {
                    let results = JSON.parse(this.response);
                    console.log(results);
                    if (results.message === "updated") {
                        $("#loading-circle").hide();
                        $("#id03").fadeIn();
                        $('#profile-lists').html('');
                        load_data(1);
                        current_page = 1;
                        current_search_page = 1;

                        var notif_data = {
                            notif_text : "wants to cancel the appointment "+kosa,
                            notif_from : user_id_notif_from,
                            notif_to : new_data[1].substr(3)
                        }
                        
                        var xhttp4 = new XMLHttpRequest();
                        xhttp4.open(
                            "POST",
                            "../../../../backend/api/notification/create_notification.php"
                        );
                        xhttp4.send(JSON.stringify(notif_data));
                        xhttp4.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 201) {
        
                            }
                        }

                    }
                    if (results.message === "deleted") {
                        $("#loading-circle").hide();
                        $("#id04").fadeIn();
                        $('#profile-lists').html('');
                        load_data(1);
                        current_page = 1;
                        current_search_page = 1;

                        var notif_data = {
                            notif_text : "Appointment " +kosa+ " has been cancelled.",
                            notif_from : user_id_notif_from,
                            notif_to : new_data[1].substr(3)
                        }
                        
                        var xhttp4 = new XMLHttpRequest();
                        xhttp4.open(
                            "POST",
                            "../../../../backend/api/notification/create_notification.php"
                        );
                        xhttp4.send(JSON.stringify(notif_data));
                        xhttp4.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 201) {
        
                            }
                        }

                        var notif_data2 = {
                            notif_text : "Appointment " +kosa+ " has been cancelled.",
                            notif_from : new_data[1].substr(3),
                            notif_to : user_id_notif_from
                        }
                        
                        var xhttp5 = new XMLHttpRequest();
                        xhttp5.open(
                            "POST",
                            "../../../../backend/api/notification/create_notification.php"
                        );
                        xhttp5.send(JSON.stringify(notif_data2));
                        xhttp5.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 201) {
        
                            }
                        }



                    }

                }
            }
        });

    });

    $("#rateYoFeedback").rateYo({
        // rating: 1.0,
        spacing: "5px",
        normalFill: "#A0A0A0",
        ratedFill: "#14a800",
    });

    $("#rateYoFeedback").rateYo(
        "option",
        "onSet",
        function (rating, rateYoInstance) {
            $("#txt-rate").text(rating);
        }
    );

    $(document).on('click', '.mark-done', function(e) {
        e.preventDefault();
        appoint_id_feed = $(this).attr("id").split("/");
        kosa_feed = $(`#hl${appoint_id_feed[0].substr(3)}`).text();
        $("#id02").fadeIn();
    });

    $(document).on('click', '#done-appoint', function(e) {
        e.preventDefault();
        $("#comment-area").val("");
        $("#rateYoFeedback").rateYo({
            rating: 1.0,
            spacing: "5px",
            normalFill: "#A0A0A0",
            ratedFill: "#14a800",
        });
        $("#feedback-modal").fadeIn();
        
    });


    $(document).on('click', '#send-feedback', function(e) {
        e.preventDefault();
        var $rateYo = $("#rateYoFeedback").rateYo();
        var rating = $rateYo.rateYo("rating");
        $("#loading-circle").show();
        var feedback_data = {
            id: appoint_id_feed[0].substr(3),
            fb_to: appoint_id_feed[1],
            fb_comment: $("#comment-area").val(),
            fb_star: rating
        }
        console.log(feedback_data)
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../../backend/api/appointments/create_feedback.php"
        );
        xhttp.send(JSON.stringify(feedback_data));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                let results = JSON.parse(this.response);
                // console.log(results);
                // alert("Feedback Sent.")
                $("#feedback-modal").fadeOut();




            }
        }

        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "PUT",
            "../../../../backend/api/appointments/fmarkasdone_appointment.php"
        );
        xhttp.send(JSON.stringify({ id: appoint_id_feed[0].substr(3), f_rating: $("#txt-rate").text() }));
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {
                let results = JSON.parse(this.response);
                console.log(results);
                if (results.message === "updated") {
                    $("#loading-circle").hide();
                    $("#id03").fadeIn();
                    $('#profile-lists').html('');
                    load_data(1);
                    current_page = 1;
                    current_search_page = 1;

                    var notif_data = {
                        notif_text : "wants to mark this appointment done " + kosa_feed,
                        notif_from : user_id_notif_from,
                        notif_to : appoint_id_feed[1]
                    }
                    
                    var xhttp4 = new XMLHttpRequest();
                    xhttp4.open(
                        "POST",
                        "../../../../backend/api/notification/create_notification.php"
                    );
                    xhttp4.send(JSON.stringify(notif_data));
                    xhttp4.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 201) {
    
                        }
                    }

                } else if (results.message === "success") {
                    $("#loading-circle").hide();
                    $("#id05").fadeIn();
                    $('#profile-lists').html('');
                    load_data(1);
                    current_page = 1;
                    current_search_page = 1;

                    var notif_data = {
                        notif_text : "Appointment " + kosa_feed + " has been finished.",
                        notif_from : user_id_notif_from,
                        notif_to : appoint_id_feed[1]
                    }
                    
                    var xhttp4 = new XMLHttpRequest();
                    xhttp4.open(
                        "POST",
                        "../../../../backend/api/notification/create_notification.php"
                    );
                    xhttp4.send(JSON.stringify(notif_data));
                    xhttp4.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 201) {
    
                        }
                    }

                    var notif_data2 = {
                        notif_text : "Appointment " + kosa_feed + " has been finished.",
                        notif_from : appoint_id_feed[1],
                        notif_to : user_id_notif_from
                    }
                    
                    var xhttp5 = new XMLHttpRequest();
                    xhttp5.open(
                        "POST",
                        "../../../../backend/api/notification/create_notification.php"
                    );
                    xhttp5.send(JSON.stringify(notif_data2));
                    xhttp5.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 201) {
    
                        }
                    }


                }
            }
        }

    });

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

}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}