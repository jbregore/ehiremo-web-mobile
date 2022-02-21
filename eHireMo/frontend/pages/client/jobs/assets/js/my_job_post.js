window.onload = function () {
    var current_page = 1;
    var current_search_page = 1;
    var load_search_data = {};
    var job_post_id = "";

    //************ load session of user ************//
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            console.log(results);
            if (results.profile_photo === "") { } else {
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

    //************ load page pagination ************//
    function load_data(page, action) {
        var user_page = {
            pagee: page
        }
        if (action === "search") {
            // var txt = $("#search-txt").val();
            // var search_data = {
            //     search: "tae",
            //     filter: "job_headline",
            //     pagee: current_search_page
            // }
            load_search_data.pagee = current_search_page;
            console.log(load_search_data);
            $.ajax({
                url: "../../../../backend/api/jobs/search_job_post.php",
                method: "POST",
                data: JSON.stringify(load_search_data),
                success: function (data) {
                    console.log(data);
                    $('#job-lists').html('');
                    if (data && data.length == 0) {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../../backend/api/jobs/my_job_post_count_search.php"
                        );
                        xhttp.send(JSON.stringify(load_search_data));
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                // $("#total-count-first").text(results.total_job_count.total_job_count);
                            }
                        }
                        document.getElementById("job-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                            <div class="col-2 col-2-22">
                    
                            <div class="col-2-2">
                                <p style="color:#555;font-size: 14px;"><span id="total-count-first">0</span> Jobs found.</p>
                                <label style="color:#555;font-size: 16px;
                                margin-right: 10px;
                                margin-top: 3px;" for="select-sort">Filter by: </label>
                                <select id="select-sort">
                                    <option value="job_headline">Headline</option>
                                    <option value="job_services">Services</option>
                                    <option value="job_age_range">Age</option>
                                    <option value="job_scope">Project Scope</option>
                                    <option value="job_rate">Budget</option>
                                    <option value="job_location">Location</option>
                                </select>
                            </div>
        
                            <div style="flex-basis: 50%;">
                                <div class="wrapper">
                                    <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                    <label for="search-txt"></label>
                                    <input placeholder="Search" type="text" class="search" id="search-txt">
                                    <button id="continue-search">Go</button>
                                </div>
                            </div>
                        </div>
                        `
                        );

                        document.getElementById("job-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                                    <div class="col-2" id="page-btn">
                    
                                        <div style="width: 70%;">
                                            <p style="color:#555;font-size: 14px;">End of results.</p>
                                        </div>
                    
                                        <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                            <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                        </div>
                    
                                    </div>
                    
                                    `
                        );

                        $('#prev-page').on('click', function (event) {
                            $('#job-lists').html('');
                            // var new_page = --current_search_page;
                            // if (new_page === 0) {
                            load_data(1);
                            current_search_page = 1;
                            $('#prev-page').attr("style", "display:none;");
                            // } else {
                            //     load_data(new_page);
                            //     current_search_page = new_page;
                            // }
                        });
                        return;
                    }
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/jobs/my_job_post_count_search.php"
                    );
                    xhttp.send(JSON.stringify(load_search_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $("#total-count").text(results.total_job_count.total_job_count);
                            $("#total-count-first").text(results.total_job_count.total_job_count);
                        }
                    }

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-2 col-2-22">
                        
                        <div class="col-2-2">
                            <p style="color:#555;font-size: 14px;"><span id="total-count-first"> </span> Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;" for="select-sort">Filter by: </label>
                            <select id="select-sort">
                                <option value="job_headline">Headline</option>
                                <option value="job_services">Services</option>
                                <option value="job_age_range">Age</option>
                                <option value="job_scope">Project Scope</option>
                                <option value="job_rate">Budget</option>
                                <option value="job_location">Location</option>
                            </select>
                        </div>
    
                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <label for="search-txt"></label>
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                        `
                    );
                    var rowCount = 0;
                    for (let row of data) {
                        rowCount++;
                        var testing = "";
                        var created_data = {
                            createdAt: row.job_createdAt
                        }
                        // console.log(row.job_createdAt);
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../../backend/api/jobs/get_time_created.php"
                        );
                        xhttp.send(JSON.stringify(created_data));
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                $(`#kosa${row.id}`).text(results);
                                // console.log(results);
                                testing = results;
                            }
                        }

                        var xhttp2 = new XMLHttpRequest();
                        xhttp2.open(
                            "POST",
                            "../../../../backend/api/jobs/proposal_count.php"
                        );
                        xhttp2.send(JSON.stringify({ id: row.id }));
                        xhttp2.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                $(`#aa${row.id}`).text(results.total_proposal_count.total_proposal_count + " proposals");
                                console.log(results.total_proposal_count.total_proposal_count);
                            }
                        }

                        document.getElementById("job-lists").insertAdjacentHTML(
                            "beforeend",
                            `
                    
                                    <div id="job-page${row.id}" class="col-2 less-padding" style="
                                        display: flex;flex-direction: row;text-align: left;
                                        justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">
                    
                                        <div style="width: 70%;">
                                            <h1 style="color: #14a800;">${row.job_headline}</h1>
                                            <label class="p-grey" style="color:rgb(75, 75, 75);"">${row.job_desc}</label><br />
                                                <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                                  margin-bottom: 5px;">
                    
                                                </div>
                                            <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Age - ${row.job_age_range}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc} - posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />
                                        </div>
                    
                                        <div style="width: 20%;text-align: center;">
                                            </br>
                                            <label class="p-grey show-proposals" style="padding-top:15px;color:#1d4354;text-decoration:underline;cursor:pointer;" id="aa${row.id}" > </label>
                                        </div>
                    
                                        <div style="width: 10%;">
                                            <br />
                                            <div class="dropdown-ellipsis" id="de${row.id}">
                                                <img alt="" class="ellipsis-icon" id="ei${row.id}" src="assets/images/three-dots.png" width="30" style="cursor: pointer;" />
                                                <div class="dropdown-content-ellipsis" id="dce${row.id}" style="float: right;cursor:pointer;">
                                                    <ul>
                                                    <li id="edp${row.id}" class="edit-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                        text-decoration: none;
                                                        display: block;" >Edit </li>
                                                    <li id="rpb${row.id}" class="remove-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                        text-decoration: none;
                                                        display: block;" >Remove </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                    
                                    </div> 
                                `
                        );


                        var services = [];
                        if (row.job_services !== "") {
                            services = row.job_services.split(",");
                            // console.log(services);
                            var ul = document.getElementById(row.id);
                            let s4 = () => {
                                return Math.floor((1 + Math.random()) * 0x10000)
                                    .toString(16)
                                    .substring(1);
                            }
                            for (let i = 0; i < services.length; i++) {
                                var li = document.createElement("button");
                                li.setAttribute('id', s4());
                                li.appendChild(document.createTextNode(services[i]));
                                ul.appendChild(li);
                            }
                        }
                    }



                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                    <div class="col-2" id="page-btn">
                    
                                        <div style="width: 70%;">
                                            <p style="color:#555;font-size: 14px;">${rowCount} out of <span id="total-count"> </span> Job Postings</p>
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

                    $('#next-page').on('click', function (event) {
                        $('#job-lists').html('');
                        // if($('#job-lists').html() )
                        var new_page = ++current_search_page;
                        load_data(new_page, "search");
                        current_search_page = new_page;
                    });

                    $('#prev-page').on('click', function (event) {
                        $('#job-lists').html('');
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
                }
            })
            return;
        }
        $.ajax({
            url: "../../../../backend/api/jobs/fetch_my_job_post.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify(user_page),
            success: function (data) {
                console.log(data);
                $('#job-lists').html('');
                if (data && data.length == 0) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "GET",
                        "../../../../backend/api/jobs/my_job_post_count.php"
                    );
                    xhttp.send();
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            // $("#total-count-first").text(results.total_job_count.total_job_count);
                        }
                    }
                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-2 col-2-22">
                
                        <div class="col-2-2">
                            <p style="color:#555;font-size: 14px;"><span id="total-count-first">0</span> Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;" for="select-sort">Filter by: </label>
                            <select id="select-sort">
                                <option value="job_headline">Headline</option>
                                <option value="job_services">Services</option>
                                <option value="job_age_range">Age</option>
                                <option value="job_scope">Project Scope</option>
                                <option value="job_rate">Budget</option>
                                <option value="job_location">Location</option>
                            </select>
                        </div>
    
                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <label for="search-txt"></label>
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                    `
                    );

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                <div class="col-2" id="page-btn">
                
                                    <div style="width: 70%;">
                                        <p style="color:#555;font-size: 14px;">End of results.</p>
                                    </div>
                
                                    <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                        <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                    </div>
                
                                </div>
                
                                `
                    );

                    $('#prev-page').on('click', function (event) {
                        $('#job-lists').html('');
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
                    return;
                }
                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "GET",
                    "../../../../backend/api/jobs/my_job_post_count.php"
                );
                xhttp.send();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        $("#total-count").text(results.total_job_count.total_job_count);
                        $("#total-count-first").text(results.total_job_count.total_job_count);
                    }
                }

                document.getElementById("job-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="col-2 col-2-22">
                    
                    <div class="col-2-2">
                        <p style="color:#555;font-size: 14px;"><span id="total-count-first"> </span> Jobs found.</p>
                        <label style="color:#555;font-size: 16px;
                        margin-right: 10px;
                        margin-top: 3px;" for="select-sort">Filter by: </label>
                        <select id="select-sort">
                            <option value="job_headline">Headline</option>
                            <option value="job_services">Services</option>
                            <option value="job_age_range">Age</option>
                            <option value="job_scope">Project Scope</option>
                            <option value="job_rate">Budget</option>
                            <option value="job_location">Location</option>
                        </select>
                    </div>

                    <div style="flex-basis: 50%;">
                        <div class="wrapper">
                            <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                            <label for="search-txt"></label>
                            <input placeholder="Search" type="text" class="search" id="search-txt">
                            <button id="continue-search">Go</button>
                        </div>
                    </div>
                </div>
                    `
                );
                var rowCount = 0;
                for (let row of data) {
                    rowCount++;
                    var testing = "";
                    var created_data = {
                        createdAt: row.job_createdAt
                    }
                    // console.log(row.job_createdAt);
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/jobs/get_time_created.php"
                    );
                    xhttp.send(JSON.stringify(created_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $(`#kosa${row.id}`).text(results);
                            // console.log(results);
                            testing = results;
                        }
                    }

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../../../../backend/api/jobs/proposal_count.php"
                    );
                    xhttp2.send(JSON.stringify({ id: row.id }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $(`#aa${row.id}`).text(results.total_proposal_count.total_proposal_count + " proposals");
                            console.log(results.total_proposal_count.total_proposal_count);
                        }
                    }

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                
                                <div id="job-page${row.id}" class="col-2 less-padding" style="
                                    display: flex;flex-direction: row;text-align: left;
                                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">
                
                                    <div style="width: 70%;">
                                        <h1 style="color: #14a800;">${row.job_headline}</h1>
                                        <label class="p-grey" style="color:rgb(75, 75, 75);"">${row.job_desc}</label><br />
                                            <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                              margin-bottom: 5px;">
                
                                            </div>
                                        <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Age - ${row.job_age_range}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc} - posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />
                                    </div>
                
                                    <div style="width: 20%;text-align: center;">
                                        </br>
                                        <label class="p-grey show-proposals" style="padding-top:15px;color:#1d4354;text-decoration:underline;cursor:pointer;" id="aa${row.id}" > </label>
                                    </div>
                
                                    <div style="width: 10%;">
                                        <br />
                                        <div class="dropdown-ellipsis" id="de${row.id}">
                                            <img alt="" class="ellipsis-icon" id="ei${row.id}" src="assets/images/three-dots.png" width="30" style="cursor: pointer;" />
                                            <div class="dropdown-content-ellipsis" id="dce${row.id}" style="float: right;cursor:pointer;">
                                                <ul>
                                                <li id="edp${row.id}" class="edit-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                    text-decoration: none;
                                                    display: block;" >Edit </li>
                                                <li id="rpb${row.id}" class="remove-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                    text-decoration: none;
                                                    display: block;" >Remove </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                
                                </div> 
                            `
                    );


                    var services = [];
                    if (row.job_services !== "") {
                        services = row.job_services.split(",");
                        // console.log(services);
                        var ul = document.getElementById(row.id);
                        let s4 = () => {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }
                        for (let i = 0; i < services.length; i++) {
                            var li = document.createElement("button");
                            li.setAttribute('id', s4());
                            li.appendChild(document.createTextNode(services[i]));
                            ul.appendChild(li);
                        }
                    }
                }



                document.getElementById("job-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                                <div class="col-2" id="page-btn">
                
                                    <div style="width: 70%;">
                                        <p style="color:#555;font-size: 14px;">${rowCount} out of <span id="total-count"> </span> Job Postings</p>
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

                $('#next-page').on('click', function (event) {
                    $('#job-lists').html('');
                    // if($('#job-lists').html() )
                    var new_page = ++current_page;
                    load_data(new_page);
                    current_page = new_page;
                });

                $('#prev-page').on('click', function (event) {
                    $('#job-lists').html('');
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

    var id_del = "";
    var id_edit = "";
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


    //************ modal close events ************//
    var modal_delete = document.getElementById('id01');
    window.onclick = function (event) {
        if (event.target == modal_delete) {
            modal_delete.style.display = "none";
        }
    }
    var modal_delete_sucess = document.getElementById('id02');
    window.onclick = function (event) {
        if (event.target == modal_delete_sucess) {
            modal_delete_sucess.style.display = "none";
        }
    }
    var modal_edit_conf = document.getElementById('id03');
    window.onclick = function (event) {
        if (event.target == modal_edit_conf) {
            modal_edit_conf.style.display = "none";
        }
    }
    var modal_save_changes_sucess = document.getElementById('id04');
    window.onclick = function (event) {
        if (event.target == modal_save_changes_sucess) {
            modal_save_changes_sucess.style.display = "none";
        }
    }

    var modal_decline_conf = document.getElementById('id05');
    window.onclick = function (event) {
        if (event.target == modal_decline_conf) {
            modal_decline_conf.style.display = "none";
        }
    }

    var modal_edit_show = document.getElementById('modal-edit');
    window.onclick = function (event) {
        if (event.target == modal_edit_show) {
            modal_edit_show.style.display = "none";
            services = [];
            console.log(services);
        }
    }

    var proposal_modal = document.getElementById('proposal-modal');
    window.onclick = function (event) {
        if (event.target == proposal_modal) {
            proposal_modal.style.display = "none";
        }
    }

    //************ search data  ************//
    $(document).on('click', '#continue-search', function () {
        var txt = $("#search-txt").val();
        console.log(txt);
        current_search_page = 1;
        var search_data = {
            search: txt,
            filter: $("#select-sort").val(),
            pagee: current_search_page
        }
        load_search_data = {
            search: txt,
            filter: $("#select-sort").val(),
        };
        console.log(search_data);
        // if (txt != '') {

        // } else {
        // $("#result").html('');
        $.ajax({
            url: "../../../../backend/api/jobs/search_job_post.php",
            method: "POST",
            data: JSON.stringify(search_data),
            success: function (data) {
                // console.log(data);
                // $("#result").html(data);
                $('#job-lists').html('');
                if (data && data.length == 0) {
                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                            <div class="col-2 col-2-22">
                    
                            <div class="col-2-2">
                                <p style="color:#555;font-size: 14px;">0 Jobs found.</p>
                                <label style="color:#555;font-size: 16px;
                                margin-right: 10px;
                                margin-top: 3px;" for="select-sort">Filter by: </label>
                                <select id="select-sort">
                                    <option value="job_headline">Headline</option>
                                    <option value="job_services">Services</option>
                                    <option value="job_age_range">Age</option>
                                    <option value="job_scope">Project Scope</option>
                                    <option value="job_rate">Budget</option>
                                    <option value="job_location">Location</option>
                                </select>
                            </div>
        
                            <div style="flex-basis: 50%;">
                                <div class="wrapper">
                                    <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                    <label for="search-txt"></label>
                                    <input placeholder="Search" type="text" class="search" id="search-txt">
                                    <button id="continue-search">Go</button>
                                </div>
                            </div>
                        </div>
                        `
                    );

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                                    <div class="col-2" id="page-btn">
                    
                                        <div style="width: 70%;">
                                            <p style="color:#555;font-size: 14px;">No data.</p>
                                        </div>
                    
                                        <div class="controls-div" style="display:flex;justify-content:flex-end;text-align:right;">
                                            <button id="prev-page"  class="control-btn"> &#10094; Back </button>
                                        </div>
                    
                                    </div>
                    
                                    `
                    );

                    $('#prev-page').on('click', function (event) {
                        $('#job-lists').html('');
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
                    return;
                }
                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "POST",
                    "../../../../backend/api/jobs/my_job_post_count_search.php"
                );
                xhttp.send(JSON.stringify(search_data));
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        console.log(results);
                        $("#total-count").text(results.total_job_count.total_job_count);
                        $("#total-count-first").text(results.total_job_count.total_job_count);
                    }
                }

                document.getElementById("job-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                        <div class="col-2 col-2-22">

                        <div class="col-2-2">
                            <p style="color:#555;font-size: 14px;"><span id="total-count-first"> </span> Jobs found.</p>
                            <label style="color:#555;font-size: 16px;
                            margin-right: 10px;
                            margin-top: 3px;" for="select-sort">Filter by: </label>
                            <select id="select-sort">
                                <option value="job_headline">Headline</option>
                                <option value="job_services">Services</option>
                                <option value="job_age_range">Age</option>
                                <option value="job_scope">Project Scope</option>
                                <option value="job_rate">Budget</option>
                                <option value="job_location">Location</option>
                            </select>
                        </div>

                        <div style="flex-basis: 50%;">
                            <div class="wrapper">
                                <img alt="" class="search-icon" src="../../../assets/images/index/search.png">
                                <label for="search-txt"></label>
                                <input placeholder="Search" type="text" class="search" id="search-txt">
                                <button id="continue-search">Go</button>
                            </div>
                        </div>
                    </div>
                        `
                );
                var rowCount = 0;
                for (let row of data) {
                    rowCount++;
                    var testing = "";
                    var created_data = {
                        createdAt: row.job_createdAt
                    }
                    // console.log(row.job_createdAt);
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "POST",
                        "../../../../backend/api/jobs/get_time_created.php"
                    );
                    xhttp.send(JSON.stringify(created_data));
                    xhttp.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $(`#kosa${row.id}`).text(results);
                            // console.log(results);
                            testing = results;
                        }
                    }

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../../../../backend/api/jobs/proposal_count.php"
                    );
                    xhttp2.send(JSON.stringify({ id: row.id }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $(`#aa${row.id}`).text(results.total_proposal_count.total_proposal_count + " proposals");
                            console.log(results.total_proposal_count.total_proposal_count);
                        }
                    }

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `

                                    <div id="job-page${row.id}" class="col-2 less-padding" style="
                                        display: flex;flex-direction: row;text-align: left;
                                        justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                                        <div style="width: 70%;">
                                            <h1 style="color: #14a800;">${row.job_headline}</h1>
                                            <label class="p-grey" style="color:rgb(75, 75, 75);"">${row.job_desc}</label><br />
                                                <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                                  margin-bottom: 5px;">

                                                </div>
                                            <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Age - ${row.job_age_range}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc} - posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate}</label><br />
                                            <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />
                                        </div>

                                        <div style="width: 20%;text-align: center;">
                                                </br>
                                                <label class="p-grey show-proposals" style="padding-top:15px;color:#1d4354;text-decoration:underline;cursor:pointer;" id="aa${row.id}" > </label>
                                            </div>

                                        <div style="width: 10%;">
                                            <br />
                                            <div class="dropdown-ellipsis" id="de${row.id}">
                                                <img alt="" class="ellipsis-icon" id="ei${row.id}" src="assets/images/three-dots.png" width="30" style="cursor: pointer;" />
                                                <div class="dropdown-content-ellipsis" id="dce${row.id}" style="float: right;cursor:pointer;">
                                                    <ul>
                                                    <li id="edp${row.id}" class="edit-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                        text-decoration: none;
                                                        display: block;" >Edit </li>
                                                    <li id="rpb${row.id}" class="remove-post-btn" style="color:#555;font-size: 12px;padding: 4px 10px;
                                                        text-decoration: none;
                                                        display: block;" >Remove </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                    </div> 
                                `
                    );


                    var services = [];
                    if (row.job_services !== "") {
                        services = row.job_services.split(",");
                        // console.log(services);
                        var ul = document.getElementById(row.id);
                        let s4 = () => {
                            return Math.floor((1 + Math.random()) * 0x10000)
                                .toString(16)
                                .substring(1);
                        }
                        for (let i = 0; i < services.length; i++) {
                            var li = document.createElement("button");
                            li.setAttribute('id', s4());
                            li.appendChild(document.createTextNode(services[i]));
                            ul.appendChild(li);
                        }
                    }
                }



                document.getElementById("job-lists").insertAdjacentHTML(
                    "beforeend",
                    `
                                    <div class="col-2" id="page-btn">

                                        <div style="width: 70%;">
                                            <p style="color:#555;font-size: 14px;">${rowCount} out of <span id="total-count"> </span> Job Postings</p>
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

                $('#next-page').on('click', function (event) {
                    $('#job-lists').html('');
                    // if($('#job-lists').html() )
                    var new_page = ++current_search_page;
                    load_data(new_page, "search");
                    current_search_page = new_page;
                });

                $('#prev-page').on('click', function (event) {
                    $('#job-lists').html('');
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
        // }
    });


    //************ fetch job edit data  ************//
    $(document).on('click', '.edit-post-btn', function () {
        id_edit = $(this).attr("id");
        $("#loading-circle").show();
        $.ajax({
            type: 'GET',
            url: '../../../../backend/api/jobs/fetch_edit_job.php',
            data: { id: id_edit.substr(3) },
            success: function (data) {
                $("#loading-circle").hide();
                console.log(data);
                services = [];
                $("#input-headline").val(data.job_headline);
                $("#input-location").val(data.job_location);
                $("#input-range").val(data.job_age);
                $("#select-scope").val(data.job_scope);
                $("#input-desc").val(data.job_desc);

                if (data.job_rate === "Hourly Rate") {
                    var radiobtn = document.getElementById("h-rate");
                    radiobtn.checked = true;
                    $('#input-project-based').val("");
                    $('#input-project-based').attr('disabled', true);
                    $('#input-project-based').attr('style', "background-color: #efefef;");
                    $('#input-hourly-rate').attr('disabled', false);
                    $('#input-hourly-rate').attr('style', "background-color: #fff;");
                    $('#input-hourly-rate').val(data.job_rate);
                } else {
                    var radiobtn = document.getElementById("f-rate");
                    radiobtn.checked = true;
                    $('#input-hourly-rate').val("");
                    $('#input-hourly-rate').attr('disabled', true);
                    $('#input-hourly-rate').attr('style', "background-color: #efefef;");
                    $('#input-project-based').attr('disabled', false);
                    $('#input-project-based').attr('style', "background-color: #fff;");
                    $('#input-project-based').val(data.job_rate);
                }

                $('#skills-container').html('');
                if (data.job_services !== "") {
                    services = data.job_services.split(",");
                    var ul = document.getElementById("skills-container");
                    let s4 = () => {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    for (let i = 0; i < services.length; i++) {
                        var li = document.createElement("button");
                        li.setAttribute('id', s4());
                        li.appendChild(document.createTextNode(services[i]));
                        ul.appendChild(li);
                        li.onclick = function () {
                            this.parentElement.removeChild(this);
                            services = removeItemFromArray(services, this.innerText);
                        };
                    }
                }

                $("#modal-edit").fadeIn();

            }
        });

    });

    $(document).on('click', '#add-skill', function () {
        if ($("#input-skills").val() === "") {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
            $("#span-services").text("Invalid");
            return;
        }
        $("#span-services").attr("style", "opacity:0;");
        var ul = document.getElementById("skills-container");
        var li = document.createElement("button");
        var list_skills = $('#input-skills').val();
        NewSkills = list_skills.replace(/\b[a-z]/g, function (txtjq2) {
            return txtjq2.toUpperCase();
        });
        li.setAttribute('id', $("#input-skills").val());
        li.appendChild(document.createTextNode(NewSkills));
        ul.appendChild(li);
        services.push(NewSkills);
        $("#input-skills").val("");
        li.onclick = function () {
            this.parentElement.removeChild(this);
            services = removeItemFromArray(services, this.innerText);
        };
    });
    $(document).on('click', '#cancel-job', function () {
        modal_edit_show.style.display = "none";
        services = [];
    });
    $(document).on('click', '#close-edit-area', function () {
        modal_edit_show.style.display = "none";
        services = [];
    });



    //************ radio button modal edit events  ************//
    $('#h-rate').on('change', function (event) {
        $('#input-project-based').val("");
        $('#input-project-based').attr('disabled', true);
        $('#input-project-based').attr('style', "background-color: #efefef;");
        $('#input-hourly-rate').attr('disabled', false);
        $('#input-hourly-rate').attr('style', "background-color: #fff;");
    });

    $('#f-rate').on('change', function (event) {
        $('#input-hourly-rate').val("");
        $('#input-hourly-rate').attr('disabled', true);
        $('#input-hourly-rate').attr('style', "background-color: #efefef;");
        $('#input-project-based').attr('disabled', false);
        $('#input-project-based').attr('style', "background-color: #fff;");
    });

    //************ submit edit changes  ************//
    $('#edit-job-form').on('submit', function (event) {
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
        NewLocation = job_loc.replace(/\b[a-z]/g, function (txtjq) {
            return txtjq.toUpperCase();
        });

        var job_data = {
            job_id_edit: id_edit.substr(3),
            job_headline: $("#input-headline").val().charAt(0).toUpperCase() + $("#input-headline").val().slice(1),
            job_location: NewLocation,
            job_services: services,
            job_age: $("#input-range").val(),
            job_scope: $("#select-scope").val(),
            job_rate_desc: rate_value_desc,
            job_rate: rate_value.charAt(0).toUpperCase() + rate_value.slice(1),
            job_desc: $("#input-desc").val().charAt(0).toUpperCase() + $("#input-desc").val().slice(1)
        }

        var valid = 0;
        if (services.length === 0) {
            $("#span-services").attr("style", "opacity:1;margin-top:3px;float:right;font-size:12px;color:rgb(216, 0, 12)");
        } else {
            $("#span-services").attr("style", "opacity:0;");
            valid++;
        }

        console.log(job_data);
        if (valid !== 1) {
            valid = 0;
        } else {
            modal_edit_show.style.display = "none";
            $("#id03").fadeIn();

            $(document).on('click', '#continue-save', function () {
                //add data
                $("#loading-circle").show();

                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "PUT",
                    "../../../../backend/api/jobs/save_changes_edit_job.php"
                );
                xhttp.send(JSON.stringify(job_data));
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 201) {
                        // let results = JSON.parse(this.response);
                        $("#loading-circle").hide();
                        modal_edit_show.style.display = "none";
                        $("#id04").fadeIn();
                        // $('#job-lists').html('');
                        load_data(current_page);
                        //tas load data current page
                    } else if (this.readyState == 4 && this.status == 500) {

                    } else if (this.readyState == 4 && this.status == 404) { }
                };
            });
        }
    });



    //************ delete  ************//
    $(document).on('click', '.remove-post-btn', function () {
        id_del = $(this).attr("id");
        $("#id01").fadeIn();
    });
    $(document).on('click', '.deletebtn', function () {
        // alert(id_del);
        $("#loading-circle").show();

        var del_data = {
            id: id_del.substr(3)
        }
        $.ajax({
            type: 'DELETE',
            url: '../../../../backend/api/jobs/delete_job.php',
            data: JSON.stringify(del_data),
            success: function (data) {
                // alert("delete successful");
                $("#loading-circle").hide();
                $("#id02").fadeIn();
                $('#job-lists').html('');
                load_data(current_page);
            },
            error: function (jqXHR, exception) { }
        });
    });


    //************ trigger job post option ************//
    var open_ellipsis = false;
    $(document).on('click', '.dropdown-ellipsis', function () {
        var id_ellipsis = $(this).attr("id");
        if (open_ellipsis) {
            // $(this).children(".dropdown-content-ellipsis").css({
            //     "display": "none",
            // });
            $(".dropdown-content-ellipsis").css({
                "display": "none",
            });
            open_ellipsis = false;
        } else {
            $(this).children().css({
                "display": "block",
            });
            open_ellipsis = true;
        }
    });

    //************ open proposal modal ************//
    $(document).on('click', '.show-proposals', function () {
        var id_proposals = $(this).attr("id").substring(2);
        $("#loading-circle").show();
        var proposal_data = {
            id: id_proposals
        }
        job_post_id = id_proposals;
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../../backend/api/jobs/fetch_proposals.php"
        );
        xhttp.send(JSON.stringify(proposal_data));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                // $(function() {
                //     $(".user-ratings").starrr();
                // })

                if (results && results.length == 0) {
                    $("#loading-circle").hide();
                    return;
                }
                $("#proposals-list").html('');
                var rowCountProposal = 0;
                for (let row of results) {
                    console.log(row);
                    // $(`#rr${row.id}`).starrr({
                    //     rating: 1
                    // })

                    var xhttp2 = new XMLHttpRequest();
                    xhttp2.open(
                        "POST",
                        "../../../../backend/api/users/get_rating.php"
                    );
                    xhttp2.send(JSON.stringify({ id: row.user_id }));
                    xhttp2.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results.average_rating);
                            $(`#rateYoNum${row.id}`).text(results.average_rating.substring(0, 3))
                            $(function () {
                                $(`#rateYo${row.id}`).rateYo({
                                    "rating": results.average_rating,
                                    starWidth: "17px",
                                    normalFill: "#A0A0A0",
                                    ratedFill: "#14a800",
                                    readOnly: true
                                });
                            });
                        }
                    }

                    rowCountProposal++;
                    document.getElementById("proposals-list").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="row" style="border-bottom: 1px solid rgb(214, 214, 214);
                        padding-bottom:10px;padding-top:20px;">
                        <div id="proposal-option1">
                            <img alt="" src="${row.profile_photo || '../assets/images/people.png'}" width="50" height="50" style="width:50;height:50;border-radius:50%;object-fit:cover;" />
                        </div>
    
                        <div id="proposal-option2">
                            <p >Freelancer: <span style="color:#1d4354;cursor:pointer;"> ${row.name} </span></p>
                            <p >Address: <span style="color:#1d4354;cursor:pointer;"> ${row.address} </span></p>
                            <div style="display:flex;flex-direction:row;justify-content:flex-start;">
                            <p> Rating : <span id="rateYoNum${row.id}" style="color:#14a800"> </span></p>
                                <div id="rateYo${row.id}" >
                                
                                </div>
                            </div>
                                
                            
                        </div>
    
                        <div id="proposal-option3">
                            <button class="view-profile" id="${row.user_id}" type="button">View profile</button>
                            <p class="proposal-decline" id="${row.user_id}">Decline</p>
                        </div>
                    </div>
                        `
                    );
                }
                $("#proposal-number").text(rowCountProposal);
                $("#proposal-modal").fadeIn();
                $("#loading-circle").hide();

            }
        }
    });

    //************ view profile ************//
    $(document).on('click', '.view-profile', function () {
        var user_id_profile = $(this).attr("id");
        window.location.href = "../view-profile.php?uid=" + user_id_profile;
        // alert(user_id_profile)
    });

    $(document).on('click', '.proposal-decline', function () {
        // var user_id_profile = $(this).attr("id");
        // window.location.href = "../view-profile.php?uid=" + user_id_profile;
        var remove_apply_data = {
            job_idd: job_post_id,
            user_idd: $(this).attr("id")
        }

        proposal_modal.style.display = "none";
        $("#id05").fadeIn();
        $(document).on('click', '.declinebtn', function () {
            $("#loading-circle").show();

            var xhttp = new XMLHttpRequest();
            xhttp.open(
                "DELETE",
                "../../../../backend/api/jobs/decline_proposal.php"
            );
            xhttp.send(JSON.stringify(remove_apply_data));
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let results = JSON.parse(this.response);
                    $("#loading-circle").hide();
                    proposal_modal.style.display = "none";
                    $('#job-lists').html('');
                    load_data(current_page);
                }
            }
        });
    });

    $(document).on('click', '.logout', function (e) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../../backend/api/users/logout.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                window.location.href = "../../../../frontend/";
            } else if (this.readyState == 4 && this.status == 500) {

            } else if (this.readyState == 4 && this.status == 404) { }
        };
    })

    $(document).on('click', '#drop-talent', function () {
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

    $(document).on('click', '#drop-jobs', function () {
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
};

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}