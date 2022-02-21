window.onload = function() {
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
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            console.log(results);
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
                url: "../../../../backend/api/jobs/search_job_post_all.php",
                method: "POST",
                data: JSON.stringify(load_search_data),
                success: function(data) {
                    console.log(data);
                    $('#job-lists').html('');
                    if (data && data.length == 0) {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../../backend/api/jobs/all_job_post_count_search.php"
                        );
                        xhttp.send(JSON.stringify(load_search_data));
                        xhttp.onreadystatechange = function() {
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

                        $('#prev-page').on('click', function(event) {
                            $('#job-lists').html('');
                            // var new_page = --current_search_page;
                            // if (new_page === 0) {
                            load_data(1);
                            current_search_page = 1;
                            current_page = 1;
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
                        "../../../../backend/api/jobs/all_job_post_count_search.php"
                    );
                    xhttp.send(JSON.stringify(load_search_data));
                    xhttp.onreadystatechange = function() {
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
                        xhttp.onreadystatechange = function() {
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
                            "../../../../backend/api/users/view_profile_id.php"
                        );
                        xhttp2.send(JSON.stringify({ id: row.user_id }));
                        xhttp2.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                console.log(results);
                                $(`#user_id${row.id}`).text(results.name);
                                $(`#user_pic${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                            }
                        }

                        document.getElementById("job-lists").insertAdjacentHTML(
                            "beforeend",
                            `

                                <div id="job-page${row.id}" class="col-2 less-padding" style="
                                    display: flex;flex-direction: row;text-align: left;
                                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">


                                    <div style="width:100%;">
                        
                                        <h1 style="color: #14a800;">${row.job_headline}</h1>
                                        <label class="p-grey" style="color:rgb(75, 75, 75);">${row.job_desc}</label><br />
                                            <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                                margin-bottom: 5px;">  
                                            </div>
                                        <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Age- ${row.job_age_range}</label><br />        
                                        <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc}- posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate} </label><br />    
                                        <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />    
                                        <div style="display:flex;flex-direction:column;text-align:right;margin-top: -50px;">
                                            <div>
                                            <img alt="" id="user_pic${row.id}" style="border-radius: 50%;margin-left: 20px;object-fit:cover;" width="70" height="70"/>
                                            </div>
                                            <p class="p-grey view-profile" id="${row.user_id}" style="color:rgb(75, 75, 75);
                                                font-size: 16px;cursor:pointer;"><u>by: <span id="user_id${row.id}"> </span></u></p>     
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

                    $('#next-page').on('click', function(event) {
                        $('#job-lists').html('');
                        // if($('#job-lists').html() )
                        var new_page = ++current_search_page;
                        load_data(new_page, "search");
                        current_search_page = new_page;
                    });

                    $('#prev-page').on('click', function(event) {
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
            url: "../../../../backend/api/jobs/fetch_all_job_post.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify(user_page),
            success: function(data) {
                console.log(data);
                $('#job-lists').html('');
                if (data && data.length == 0) {
                    var xhttp = new XMLHttpRequest();
                    xhttp.open(
                        "GET",
                        "../../../../backend/api/jobs/all_job_post_count.php"
                    );
                    xhttp.send();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            $("#total-count-first").text(results.total_job_count.total_job_count);
                        }
                    }
                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                        <div class="col-2 col-2-22">
                
                        <div class="col-2-2">
                            <p style="color:#555;font-size: 14px;"><span id="total-count-first"></span> Jobs found.</p>
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

                    $('#prev-page').on('click', function(event) {
                        $('#job-lists').html('');
                        // var new_page = --current_search_page;
                        // if (new_page === 0) {
                        load_data(1);
                        current_search_page = 1;
                        current_page = 1;
                        $('#prev-page').attr("style", "display:none;");
                        // } else {
                        //     load_data(new_page);
                        //     current_search_page = new_page;
                        // }
                    });
                    // $('#prev-page').on('click', function(event) {
                    //     $('#job-lists').html('');
                    //     var new_page = --current_page;
                    //     if (new_page === 0) {
                    //         load_data(1);
                    //         current_page = 1;
                    //         $('#prev-page').attr("style", "display:none;");
                    //     } else {
                    //         load_data(new_page);
                    //         current_page = new_page;
                    //     }
                    // });
                    return;
                }
                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "GET",
                    "../../../../backend/api/jobs/all_job_post_count.php"
                );
                xhttp.send();
                xhttp.onreadystatechange = function() {
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
                    // console.log(row);
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
                    xhttp.onreadystatechange = function() {
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
                        "../../../../backend/api/users/view_profile_id.php"
                    );
                    xhttp2.send(JSON.stringify({ id: row.user_id }));
                    xhttp2.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            let results = JSON.parse(this.response);
                            console.log(results);
                            $(`#user_id${row.id}`).text(results.name);
                            $(`#user_pic${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                        }
                    }

                    document.getElementById("job-lists").insertAdjacentHTML(
                        "beforeend",
                        `

                                <div id="job-page${row.id}" class="col-2 less-padding" style="
                                    display: flex;flex-direction: row;text-align: left;
                                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">


                                    <div style="width:100%;">
                        
                                        <h1 style="color: #14a800;">${row.job_headline}</h1>
                                        <label class="p-grey" style="color:rgb(75, 75, 75);">${row.job_desc}</label><br />
                                            <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                                margin-bottom: 5px;">  
                                            </div>
                                        <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Age- ${row.job_age_range}</label><br />        
                                        <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc}- posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate} </label><br />    
                                        <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />    
                                        <div style="display:flex;flex-direction:column;text-align:right;margin-top: -50px;">
                                            <div>
                                            <img alt="" id="user_pic${row.id}" style="border-radius: 50%;margin-left: 20px;object-fit:cover;" width="70" height="70"/>
                                            </div>
                                            <p class="p-grey view-profile" id="${row.user_id}" style="color:rgb(75, 75, 75);
                                                font-size: 16px;cursor:pointer;"><u>by: <span id="user_id${row.id}"> </span></u></p>     
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

                $('#next-page').on('click', function(event) {
                    $('#job-lists').html('');
                    // if($('#job-lists').html() )
                    var new_page = ++current_page;
                    load_data(new_page);
                    current_page = new_page;
                });

                $('#prev-page').on('click', function(event) {
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


    //************ search data  ************//
    $(document).on('click', '#continue-search', function() {
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
                url: "../../../../backend/api/jobs/search_job_post_all.php",
                method: "POST",
                data: JSON.stringify(search_data),
                success: function(data) {
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

                        // $('#prev-page').on('click', function(event) {
                        //     $('#job-lists').html('');
                        //     var new_page = --current_search_page;
                        //     if (new_page === 0) {
                        //         load_data(1);
                        //         current_search_page = 1;
                        //         $('#prev-page').attr("style", "display:none;");
                        //     } else {
                        //         load_data(new_page);
                        //         current_search_page = new_page;
                        //     }
                        // });
                        $('#prev-page').on('click', function(event) {
                            $('#job-lists').html('');
                            // var new_page = --current_search_page;
                            // if (new_page === 0) {
                            load_data(1);
                            current_search_page = 1;
                            current_page = 1;
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
                        "../../../../backend/api/jobs/all_job_post_count_search.php"
                    );
                    xhttp.send(JSON.stringify(search_data));
                    xhttp.onreadystatechange = function() {
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
                        xhttp.onreadystatechange = function() {
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
                            "../../../../backend/api/users/view_profile_id.php"
                        );
                        xhttp2.send(JSON.stringify({ id: row.user_id }));
                        xhttp2.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                console.log(results);
                                $(`#user_id${row.id}`).text(results.name);
                                $(`#user_pic${row.id}`).attr("src", results.profile_photo || "../assets/images/people.png");
                            }
                        }

                        document.getElementById("job-lists").insertAdjacentHTML(
                            "beforeend",
                            `

                                <div id="job-page${row.id}" class="col-2 less-padding" style="
                                    display: flex;flex-direction: row;text-align: left;
                                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">


                                    <div style="width:100%;">
                        
                                        <h1 style="color: #14a800;">${row.job_headline}</h1>
                                        <label class="p-grey" style="color:rgb(75, 75, 75);">${row.job_desc}</label><br />
                                            <div id="${row.id}" class="skills-button" style="margin-top: 5px;
                                                margin-bottom: 5px;">  
                                            </div>
                                        <label class="p-grey" style="font-weight: 400;">ProjectScope - ${row.job_scope}</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Age- ${row.job_age_range}</label><br />        
                                        <label class="p-grey" style="font-weight: 400;">${row.job_rate_desc}- posted <span class="created-date" id="kosa${row.id}">${testing}</span>.</label><br />
                                        <label class="p-grey" style="font-weight: 400;">Budget - ${row.job_rate} </label><br />    
                                        <label class="p-grey" style="font-weight: 400;">Location - ${row.job_location} </label><br />    
                                        <div style="display:flex;flex-direction:column;text-align:right;margin-top: -50px;">
                                            <div>
                                            <img alt="" id="user_pic${row.id}" style="border-radius: 50%;margin-left: 20px;object-fit:cover;" width="70" height="70"/>
                                            </div>
                                            <p class="p-grey view-profile" id="${row.user_id}" style="color:rgb(75, 75, 75);
                                                font-size: 16px;cursor:pointer;"><u>by: <span id="user_id${row.id}"> </span></u></p>     
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

                    $('#next-page').on('click', function(event) {
                        $('#job-lists').html('');
                        // if($('#job-lists').html() )
                        var new_page = ++current_search_page;
                        console.log(new_page);
                        load_data(new_page, "search");
                        current_search_page = new_page;
                    });

                    $('#prev-page').on('click', function(event) {
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

    //************ view profile ************//
    $(document).on('click', '.view-profile', function() {
        var user_id_profile = $(this).attr("id");
        window.location.href = "../view-profile.php?uid=" + user_id_profile;
        // alert(user_id_profile)
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