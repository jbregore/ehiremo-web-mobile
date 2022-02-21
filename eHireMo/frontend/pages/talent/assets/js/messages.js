window.onload = function() {
    // var upcoming_msg_id = "";
    var my_id = "";
    var my_role = "";
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
            my_id = results.user_id;
            my_role = results.role;
            if (results.profile_photo === "") {} else {
                $("#web-profile-picture").attr("src", results.profile_photo);
                $("#mobile-profile-picture").attr("src", results.profile_photo);
            }
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);


        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) {}
    };

    load_data("");
    load_chats_data();

    function load_chats_data() {
        $.ajax({
            url: "../../../backend/api/messages/fetch_chats.php",
            type: "GET",
            contentType: false,
            processData: false,
            success: function(data) {
                if(data && data.length === 0){
                    document.getElementById("chatterist").insertAdjacentHTML(
                        "beforeend", `
                            <div id="isloadchat" style="display:flex;width:100%;height:100%;
                            justify-content:center;align-items:center;">
                            no messages yet
                            </div>
                    `);
                    return;
                }
                // console.log(data);
                document.getElementById("chatterist").insertAdjacentHTML(
                    "beforeend", `
                        <div id="isloadchat" style="display:flex;width:100%;height:100%;
                        justify-content:center;align-items:center;">
                        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" background="transparent" speed="2.0" style="width: 50px; height: 50px;" loop autoplay>
                </lottie-player>
                        </div>
                `);
                // data.sort((a, b) => {
                //     let da = new Date(a.created_at),
                //         db = new Date(b.created_at);
                //     return da.created_at - db.created_at;
                // });

                // data.forEach((e) => {
                //     console.log(`${e.created_at}`);
                // });

                // console.log(data);

                var new_arr = [];
                // setTimeout(() => {
                for (let row of data) {
                    if (row.incoming_msg_id === my_id) {
                        new_arr.push(row.outcoming_msg_id);
                        
                    } else if (row.outcoming_msg_id === my_id) {
                        new_arr.push(row.incoming_msg_id);
                        

                    }
                }
                // console.log(new_arr)

                var new_arr2 = [];
                for (let row of new_arr) {
                    // console.log(row)
                    setTimeout(() => {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../backend/api/messages/get_mesage_profile.php"
                        );
                        xhttp.send(JSON.stringify({ id: row }));
                        xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    let results = JSON.parse(this.response);
                                    console.log(results);
                                    console.log("tae")
                                    new_arr2.push(results);
                                }
                            }
                            // xhttp.timeout = 1000
                    }, 500)
                }

                // var mydate = new Date();
                // console.log(mydate.getUTCDay())

                function timeSince(date) {

                    var seconds = Math.floor((new Date() - date) / 1000);

                    var interval = seconds / 31536000;

                    if (interval > 1) {
                        return Math.floor(interval) + "yr";
                    }
                    interval = seconds / 2592000;
                    if (interval > 1) {
                        return Math.floor(interval) + "mon";
                    }
                    interval = seconds / 86400;
                    if (interval > 1) {
                        return Math.floor(interval) + "d";
                    }
                    interval = seconds / 3600;
                    if (interval > 1) {
                        return Math.floor(interval) + "h";
                    }
                    interval = seconds / 60;
                    if (interval > 1) {
                        return Math.floor(interval) + "m";
                    }
                    return Math.floor(seconds) + "s";
                }
                // console.log(timeSince(new Date('2021-10-22 00:48:58')));


                setTimeout(() => {

                    new_arr2.sort((a, b) => {
                        return a.id - b.id;
                    });
                    console.log(new_arr2)
                    new_arr2.reverse();

                    let check = {};
                    let res = [];
                    for (let i = 0; i < new_arr2.length; i++) {
                        if (!check[new_arr2[i]['name']]) {
                            check[new_arr2[i]['name']] = true;
                            res.push(new_arr2[i]);
                        }
                    }
                    console.log(res)

                    // console.log(new_arr2)
                    setTimeout(() => {
                        $("#chatterist").html('');
                        res.map((item, key) => {
                            setTimeout(() => {
                                var you = "";
                                // console.log(item.created_at)
                                var xhttp = new XMLHttpRequest();
                                xhttp.open(
                                    "POST",
                                    "../../../backend/api/messages/get_created_at.php"
                                );
                                xhttp.send(JSON.stringify({ id: item.id }));
                                xhttp.onreadystatechange = function() {
                                    if (this.readyState == 4 && this.status == 200) {
                                        let results = JSON.parse(this.response);
                                        console.log(results.created_at);
                                        $(`#ago${item.id}`).text(timeSince(new Date(`${results.created_at}`)))
                                    }
                                }
                                if (item.outcoming_msg_id === my_id) {
                                    you = "You:";
                                }
                                document.getElementById("chatterist").insertAdjacentHTML(
                                    "beforeend", `
                                    <div class="chats" id="${item.user_id}" style="cursor:pointer;">
        
                                        <div style="width: 20%;" style="margin-right: 10px;">
                                            <img src="${item.profile_photo || './assets/images/people.png'}"
                                            width="70" height= "70" style="border-radius: 50%;object-fit:cover;"
                                            />
                                        </div>
        
                                        <div style="width: 80%;margin-left: 15px;">
                                        <span class="dot ${item.status == 1 ? 'active' : ''}"></span>
                                        <p style="font-size: 18px;">${item.name}</p>
                                        <p style="margin-top: -2px;">${you} ${item.msg}</p>
                                        <p style="text-align: right;margin-top: -8px;" id="ago${item.id}"> </p>
                                    </div>
        
                                </div>
                                 `);
                            }, 500)

                        })
                        
                        setTimeout(() => {
                            if ($('#chatterist').is(':empty')) {
                                load_chats_data();
                            }
                        }, 1100);

                    }, 1000)
                }, 800)



                // setTimeout(() => {

                //     console.log(new_arr2)
                // }, 1500)


                // setTimeout(() => {

                //     new_arr2.map((item, key) => {
                //         setTimeout(() => {

                //             document.getElementById("chatterist").insertAdjacentHTML(
                //                 "beforeend", `
                //             <div class="chats" id="${item.user_id}" style="cursor:pointer;">

                //                 <div style="width: 20%;" style="margin-right: 10px;">
                //                     <img src="${item.profile_photo || './assets/images/people.png'}"
                //                     width="70" height= "70" style="border-radius: 50%;"
                //                     />
                //                 </div>

                //                 <div style="width: 80%;margin-left: 15px;">
                //                 <p style="font-size: 18px;">${item.name}</p>
                //                 <p style="margin-top: -2px;">${item.msg}</p>
                //                 <p style="text-align: right;margin-top: -8px;">12 m </p>
                //             </div>

                //         </div>
                //          `);
                //         }, 500)

                //     })
                // }, 1000)

                // var new_arr2 = [];
                // var rowCount = 0;
                // for (let row of new_arr) {
                //     setTimeout(() => {

                //         console.log(row)
                //         var xhttp = new XMLHttpRequest();
                //         xhttp.open(
                //             "POST",
                //             "../../../backend/api/messages/get_last_message.php"
                //         );
                //         xhttp.send(JSON.stringify({ id: row }));
                //         xhttp.onreadystatechange = function() {
                //             if (this.readyState == 4 && this.status == 200) {
                //                 let results = JSON.parse(this.response);
                //                 console.log(results);

                //                 $.ajax({
                //                     url: "../../../backend/api/users/view_profile_id.php",
                //                     type: "POST",
                //                     contentType: false,
                //                     processData: false,
                //                     data: JSON.stringify({ id: row }),
                //                     success: function(resultss) {
                //                         // new_arr2.push(resultss)
                //                         document.getElementById("chatterist").insertAdjacentHTML(
                //                             "beforeend", `
                //                                             <div class="chats" id="${resultss.user_id}" style="cursor:pointer;">

                //                                         <div style="width: 20%;" style="margin-right: 10px;">
                //                                             <img src="${resultss.profile_photo || './assets/images/people.png'}"
                //                                                 width="70" height= "70" style="border-radius: 50%;"
                //                                             />
                //                                         </div>

                //                                         <div style="width: 80%;margin-left: 15px;">
                //                                             <p style="font-size: 18px;">${resultss.name}</p>
                //                                             <p style="margin-top: -2px;">${results.msg}</p>
                //                                             <p style="text-align: right;margin-top: -8px;">12 m </p>
                //                                         </div>

                //                                     </div>
                //                                 `);

                //                     },
                //                 })


                //             }
                //         }
                //     }, 1000)

                // }
                // setTimeout(() => {
                //     for (let row of new_arr2) {
                //         document.getElementById("chatterist").insertAdjacentHTML(
                //             "beforeend", `
                //                             <div class="chats" id="${row.user_id}" style="cursor:pointer;">

                //                         <div style="width: 20%;" style="margin-right: 10px;">
                //                             <img src="${row.profile_photo || './assets/images/people.png'}"
                //                                 width="70" height= "70" style="border-radius: 50%;"
                //                             />
                //                         </div>

                //                         <div style="width: 80%;margin-left: 15px;">
                //                             <p style="font-size: 18px;">${row.name}</p>
                //                             <p style="margin-top: -2px;">sample</p>
                //                             <p style="text-align: right;margin-top: -8px;">12 m </p>
                //                         </div>

                //                     </div>
                //                 `);
                //     }
                //     console.log(new_arr2)
                // }, 1000)
                // }, 1000)

                // for (let row of new_arr) {
                //     function getChat(rowe) {
                //         setTimeout(function() {
                //             var xhttp = new XMLHttpRequest();
                //             xhttp.open(
                //                 "POST",
                //                 "../../../backend/api/messages/get_last_message.php"
                //             );
                //             xhttp.send(JSON.stringify({ id: rowe }));
                //             xhttp.onreadystatechange = function() {
                //                 if (this.readyState == 4 && this.status == 200) {
                //                     let results = JSON.parse(this.response);
                //                     console.log(results);

                //                     $.ajax({
                //                         url: "../../../backend/api/users/view_profile_id.php",
                //                         type: "POST",
                //                         contentType: false,
                //                         processData: false,
                //                         data: JSON.stringify({ id: rowe }),
                //                         success: function(resultss) {
                //                             // new_arr2.push(resultss)
                //                             document.getElementById("chatterist").insertAdjacentHTML(
                //                                 "beforeend", `
                //                                             <div class="chats" id="${resultss.user_id}" style="cursor:pointer;">

                //                                         <div style="width: 20%;" style="margin-right: 10px;">
                //                                             <img src="${resultss.profile_photo || './assets/images/people.png'}"
                //                                                 width="70" height= "70" style="border-radius: 50%;"
                //                                             />
                //                                         </div>

                //                                         <div style="width: 80%;margin-left: 15px;">
                //                                             <p style="font-size: 18px;">${resultss.name}</p>
                //                                             <p style="margin-top: -2px;">${results.msg}</p>
                //                                             <p style="text-align: right;margin-top: -8px;">12 m </p>
                //                                         </div>

                //                                     </div>
                //                                 `);

                //                         },
                //                     })


                //                 }
                //             }
                //         }, 1000);
                //     }
                //     getChat(row);
                // }







                // for (let row of data) {
                //     var created_data = {
                //         createdAt: row.created_at
                //     }
                //     var xhttp = new XMLHttpRequest();
                //     xhttp.open(
                //         "POST",
                //         "../../../backend/api/messages/get_time_created.php"
                //     );
                //     xhttp.send(JSON.stringify(created_data));
                //     xhttp.onreadystatechange = function() {
                //         if (this.readyState == 4 && this.status == 200) {
                //             let results = JSON.parse(this.response);
                //             console.log(results);
                //         }
                //     }
                // }
                // const obj = {};
                // const new_arr = [];
                // document.getElementById("chatterist").insertAdjacentHTML(
                //     "beforeend", `
                //     <div id="isloadchat" style="display:flex;width:100%;height:100%;
                //     justify-content:center;align-items:center;">
                //     <p>Loading</p>
                //     </div>
                // `);


                // data.sort((a, b) => {
                //     // let da = new Date(a.created_at),
                //     //     db = new Date(b.created_at);
                //     return a.created_at - b.created_at;
                // });


                // data.forEach((e) => {
                //     console.log(`${e.created_at}`);
                //     if (e.incoming_msg_id === my_id) {

                //     } else {
                //         new_arr.push(`${e.incoming_msg_id}`);
                //     }
                //     if (e.outcoming_msg_id === my_id) {

                //     } else {
                //         new_arr.push(`${e.outcoming_msg_id}`);
                //     }
                // });



                // const unique = new_arr.filter((value, index) => {
                //     return new_arr.indexOf(value) === index;
                // });
                // //id of chat users
                // console.log(unique);

                // var chatt = ``;



                // setTimeout(() => {

                //     for (let i = 0, len = unique.length; i < len; i++) {
                //         console.log(unique[i])
                //         setTimeout(() => {
                //             $("#isloadchat").attr("style", "display:none;")
                //             $.ajax({
                //                 url: "../../../backend/api/users/view_profile_id_message.php",
                //                 type: "POST",
                //                 contentType: false,
                //                 processData: false,
                //                 data: JSON.stringify({ id: unique[i] }),
                //                 success: function(results) {

                //                     document.getElementById("chatterist").insertAdjacentHTML(
                //                         "beforeend", `
                //                     <div class="chats" id="${results.user_id}" style="cursor:pointer;">

                //                     <div style="width: 20%;" style="margin-right: 10px;">
                //                         <img src="${results.profile_photo || './assets/images/people.png'}"
                //                             width="70" height= "70" style="border-radius: 50%;"
                //                         />
                //                     </div>

                //                     <div style="width: 80%;margin-left: 15px;">
                //                         <p style="font-size: 18px;">${results.name}</p>
                //                         <p style="margin-top: -2px;">Yes ! nice to work with you.</p>
                //                         <p style="text-align: right;margin-top: -8px;">12 m </p>
                //                     </div>

                //                 </div>
                //             `);

                //                 },
                //             })
                //         }, 500)
                //     }

                // }, 1500)

                // setTimeout(() => {
                //     document.getElementById("chatterist").insertAdjacentHTML(
                //         "beforeend", chatt
                //     );
                // }, 1500);


            }
        })
    }

    function load_data(incoming_msg_id) {


        if (incoming_msg_id === "") {
            document.getElementById("messages-right").insertAdjacentHTML(
                "beforeend", `
                    <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
                    <p>Select a chat to see their messages.</p>
                    </div>
                `);
            // alert("gago");
            return;
        }
        var profile_data = {
            incoming_msg_id: incoming_msg_id
        }
        $.ajax({
            url: "../../../backend/api/messages/fetch_messages.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify(profile_data),
            success: function(data) {
                // console.log(data);

                $("#messages-right").html('');

                var xhttp = new XMLHttpRequest();
                xhttp.open(
                    "POST",
                    "../../../backend/api/users/view_profile_id.php"
                );
                xhttp.send(JSON.stringify({ id: incoming_msg_id }));
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        let results = JSON.parse(this.response);
                        console.log(results);
                        // if (results.role === "client") {
                        //     $("#appoint-btn").attr("style", "display:none;")
                        // } else if (results.role === "freelancer") {
                        //     $("#appoint-btn").attr("style", "display:none;")
                        // }
                        // <button id="appoint-btn">Set appointment</button>
                        var status_area = "";
                        if (results.status === 0) {
                            status_area = "Offline";
                        } else {
                            status_area = "Active now";
                        }
                        var chat_html = `<div style="height: 10%;border-bottom: 1px solid rgb(214, 214, 214);
                        display: flex; flex-direction: row;">

                            <div class="messages-header-right">

                                <div style="" style="">
                                    <img src="${results.profile_photo || './assets/images/people.png'}"
                                    width="40" height="40" style="border-radius: 50%;object-fit:cover;"/>
                                </div>

                                <div class="messages-header-right-2">
                                <p style="margin-top: 10px;color: #14a800;text-decoration:underline;cursor:pointer;" class="view-profile" id="${results.user_id}">${results.name}</p>
                                    <span style="font-size:14px;color:#555;">( ${results.role.charAt(0).toUpperCase()+results.role.substr(1, results.role.length)} )
                                    ${results.status == 1 ? 'Active now' : 'Offline'}</span>
                                </div>

                            </div>

                            <div class="messages-header-right-3">
                                
                            </div>
                            

                        </div>

                        <div style="height: 83%;" id="chat-area">
                        `;

                        for (let row of data) {
                            function tConvert(time) {

                                // Check correct time format and split into components
                                time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

                                if (time.length > 1) { // If time format correct
                                    time = time.slice(1); // Remove full string match value
                                    time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                                    time[0] = +time[0] % 12 || 12; // Adjust hours
                                }
                                return time.join(''); // return adjusted time or original string
                            }

                            var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                            var now = new Date(row.created_at);
                            console.log(days[now.getDay()]);

                            const time_created = row.created_at.split(" ");
                            console.log(time_created[1].substr(0, 5))
                                // console.log(tConvert(`${time_created[1]}`));
                            var time_at = tConvert(`${time_created[1].substr(0, 5)}`);
                            if (row.outcoming_msg_id === my_id) {
                                chat_html += `<div class="chat-outgoing">
                                    <div class="chat-details">
                                        <p title="${days[now.getDay()] +' '+ time_at}">
                                            ${row.msg}
                                        </p>
                                    </div>
                                </div>`;
                            } else {
                                chat_html += `
                                    <div class="chat-incoming">
                                        <img src="${results.profile_photo || './assets/images/people.png'}"
                                        width="40" height="40" style="border-radius: 50%;object-fit:cover;"/>
                                        <div class="chat-details">
                                            <p title="${days[now.getDay()] +' '+ time_at}">
                                            ${row.msg}
                                            </p>
                                        </div>
                                    </div>
                                `;
                            }
                        }

                        chat_html += `</div>
                        <div style="height: 7%; border-top: 1px solid rgb(190, 189, 189);">
                            <input type="text" id="input-message" placeholder="Type your message here...."/>
                            <button class="send-message" id="send-btn${results.user_id}">Send</button>
                        </div>`;

                        document.getElementById("messages-right").insertAdjacentHTML(
                            "beforeend", chat_html);

                    }
                }


            }
        })
    }


    //************ send message ************//
    $(document).on('click', '.send-message', function(e) {
        e.preventDefault();
        var user_id = $(this).attr("id");
        // console.log(user_id.substr(8));
        if ($("#input-message").val().trim() === "") {
            return;
        }
        var message_data = {
            incoming_msg_id: user_id.substr(8),
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
                $("#input-message").val("");
                load_data(user_id.substr(8));
                $("#chatterist").html('');
                load_chats_data();
            }
        }
    });

    $(document).on('click', '.chats', function() {
        var user_id = $(this).attr("id");
        // console.log(user_id.substr(8));
        load_data(user_id);
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

    $(document).on('click', '#appoint-btn', function() {
        $("#modal-message").fadeIn();
    });

    $(document).on('click', '#close-message', function() {
        $("#modal-message").fadeOut();
    });

    //************ view profile ************//
    $(document).on('click', '.view-profile', function() {
        var user_id_profile = $(this).attr("id");
        window.location.href = "view-profile.php?uid=" + user_id_profile;
        // alert(user_id_profile)
    });

    $(document).on('click', '#continue-search', function () {
        var text = $("#search-name-message").val();
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../backend/api/users/get_name_message.php"
        );
        xhttp.send(JSON.stringify({ name: text }));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                console.log(data);

                // if(data && data.length === 0){
                //     document.getElementById("chatterist").insertAdjacentHTML(
                //         "beforeend", `
                //         <div style="display:flex;width:100%;height:100%;
                //             justify-content:center;align-items:center;">
                //         <p>No messages found.</p>
                //         </div>
                //     `);
                //     return;
                // }

                document.getElementById("chatterist").insertAdjacentHTML(
                    "beforeend", `
                    <div id="isloadchat" style="display:flex;width:100%;height:100%;
                        justify-content:center;align-items:center;">
                    <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" background="transparent" speed="2.0" style="width: 50px; height: 50px;" loop autoplay>
                    </lottie-player>
                    </div>
                `);
                var new_arr = [];
                // setTimeout(() => {
                for (let row of data) {
                    if (row.incoming_msg_id === my_id) {
                        new_arr.push(row.outcoming_msg_id);
                    } else if (row.outcoming_msg_id === my_id) {
                        new_arr.push(row.incoming_msg_id);
                    }
                }
                // console.log(new_arr)

                var new_arr2 = [];
                for (let row of new_arr) {
                    // console.log(row)
                    setTimeout(() => {
                        var xhttp = new XMLHttpRequest();
                        xhttp.open(
                            "POST",
                            "../../../backend/api/messages/get_mesage_profile.php"
                        );
                        xhttp.send(JSON.stringify({ id: row }));
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4 && this.status == 200) {
                                let results = JSON.parse(this.response);
                                console.log(results);
                                new_arr2.push(results);

                            }
                        }
                        // xhttp.timeout = 1000
                    }, 500)
                }

                // var mydate = new Date();
                // console.log(mydate.getUTCDay())

                function timeSince(date) {

                    var seconds = Math.floor((new Date() - date) / 1000);

                    var interval = seconds / 31536000;

                    if (interval > 1) {
                        return Math.floor(interval) + "yr";
                    }
                    interval = seconds / 2592000;
                    if (interval > 1) {
                        return Math.floor(interval) + "mon";
                    }
                    interval = seconds / 86400;
                    if (interval > 1) {
                        return Math.floor(interval) + "d";
                    }
                    interval = seconds / 3600;
                    if (interval > 1) {
                        return Math.floor(interval) + "h";
                    }
                    interval = seconds / 60;
                    if (interval > 1) {
                        return Math.floor(interval) + "m";
                    }
                    return Math.floor(seconds) + "s";
                }
                // console.log(timeSince(new Date('2021-10-22 00:48:58')));


                setTimeout(() => {

                    new_arr2.sort((a, b) => {
                        return a.id - b.id;
                    });

                    new_arr2.reverse();

                    let check = {};
                    let res = [];
                    for (let i = 0; i < new_arr2.length; i++) {
                        if (!check[new_arr2[i]['name']]) {
                            check[new_arr2[i]['name']] = true;
                            res.push(new_arr2[i]);
                        }
                    }
                    // console.log(res)

                    // console.log(new_arr2)
                    setTimeout(() => {
                        $("#chatterist").html('');
                        res.map((item, key) => {
                            setTimeout(() => {
                                var you = "";
                                // console.log(item.created_at)
                                var xhttp = new XMLHttpRequest();
                                xhttp.open(
                                    "POST",
                                    "../../../backend/api/messages/get_created_at.php"
                                );
                                xhttp.send(JSON.stringify({ id: item.id }));
                                xhttp.onreadystatechange = function () {
                                    if (this.readyState == 4 && this.status == 200) {
                                        let results = JSON.parse(this.response);
                                        console.log(results.created_at);
                                        $(`#ago${item.id}`).text(timeSince(new Date(`${results.created_at}`)))
                                    }
                                }
                                if (item.outcoming_msg_id === my_id) {
                                    you = "You:";
                                }
                                document.getElementById("chatterist").insertAdjacentHTML(
                                    "beforeend", `
                                <div class="chats" id="${item.user_id}" style="cursor:pointer;">
    
                                    <div style="width: 20%;" style="margin-right: 10px;">
                                        <img src="${item.profile_photo || './assets/images/people.png'}"
                                        width="70" height= "70" style="border-radius: 50%;object-fit:cover;"
                                        />
                                    </div>
    
                                    <div style="width: 80%;margin-left: 15px;">
                                    <span class="dot ${item.status == 1 ? 'active' : ''}"></span>
                                    <p style="font-size: 18px;">${item.name}</p>
                                    <p style="margin-top: -2px;">${you} ${item.msg}</p>
                                    <p style="text-align: right;margin-top: -8px;" id="ago${item.id}"> </p>
                                </div>
    
                            </div>
                             `);
                            }, 500)

                        })
                    }, 1000)
                }, 800)

            }
        }
    });

    $(document).on('keyup', '#search-name-message', function () {
        if ($("#search-name-message").val() === "") {
            $("#chatterist").html('');
            load_chats_data();
        }
    });

    $(document).on('click', '#continue-search-new', function () {
        var text = $("#input-message-search").val();
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "POST",
            "../../../backend/api/users/new_chat_message.php"
        );
        xhttp.send(JSON.stringify({ name: text }));
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(this.response);
                console.log(data);
                $("#new-chat-result").html('');
                if(data && data.length === 0){
                    document.getElementById("new-chat-result").insertAdjacentHTML(
                        "beforeend", `
                        <div style="margin:auto;text-align:center;
                        padding-bottom:10px;padding-top:10px;">
                           <p> no results. </p>
                        </div>
                    `);
                }
                for(let row of data){
                    document.getElementById("new-chat-result").insertAdjacentHTML(
                        "beforeend", `
                        <div class="click-new-chat" id="cnc${row.user_id}" style="margin:auto;align-items:center;display:flex;
                        border-bottom:1px solid #d6d6d6;padding-bottom:10px;padding-top:10px;cursor:pointer;">
                            <img alt="" src="${row.profile_photo || './assets/images/people.png'}" width="50" 
                            height="50" style="border-radius:50%;object-fit:cover;float:right;"/>
                            
                            <div style="text-align:left;margin-left:20px;">
                                <p style="font-size:16px;">${row.name}</p>
                                <p style="font-size:14px;">${row.address}</p>
                            </div>
                        </div>
                    `);
                }
                
                
            }
        }

    });

    $(document).on('click', '.click-new-chat', function (e) {
        e.preventDefault();
        $("#modal-sendmessage").hide();
        $("#new-chat-result").html('');
        $("#input-message-search").val('');
        load_data($(this).attr("id").substr(3));
    });

    $(document).on('click', '#new-message', function () {
        $("#modal-sendmessage").fadeIn();
    });

    function myFunction(x) {
        if (x.matches) { 
            $(document).on('click', '.chats', function () {
                var user_id = $(this).attr("id");
                $("#messages-left").attr("style", "display:none;")
                $("#messages-right").attr("style", "display:block;")
                // load_data(user_id);
            });
        } else {
            $("#messages-left").attr("style", "display:block;")
        }
    }
    
    var x = window.matchMedia("(max-width: 600px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function openChat() {
    document.getElementById("messages-left").style.display = "none";
    document.getElementById("messages-right").style.display = "block";
}