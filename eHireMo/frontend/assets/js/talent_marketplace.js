window.onload = function () {

    load_data();

    function load_data() {
        var user_page = {
            pagee: 1,
            role: "visitor"
        }
        $.ajax({
            url: "../backend/api/users/show_freelancers.php",
            type: "POST",
            contentType: false,
            processData: false,
            data: JSON.stringify(user_page),
            success: function (data) {

                for (let i = 0; i < 5; i++) {
                    console.log(data[i]);

                    document.getElementById("talent-lists").insertAdjacentHTML(
                        "beforeend",
                        `
                            <div class="col-2 less-padding" style="text-align: left;
                            ustify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                            <div style="text-align: left;display: flex;
                            flex-direction: row;">
                                <div class="div-1">
                                    <img alt="" style="border-radius: 50%;object-fit:cover;" 
                                    src="${data[i].profile_photo || '../assets/images/people.png'}" width="70" height="70" />
                                </div>

                                <div class="div-2">
                                    <h1 style="color: #14a800;text-decoration:underline;cursor:pointer;" class="view-profile" >
                                    ${data[i].name}</h1>
                                    <p class="p-grey" style="color: #555;">${data[i].address}</p>
                                </div>

                                <div class="div-3">
                                    <button class="save-job-btn" >&#10084;</button>
                                    <button class="invite-to-job-btn" > Invite</button>
                                </div>
                            </div>

                            <div class="skills-button">
                                <p class="p-grey" style="color:rgb(75, 75, 75);margin-bottom: 5px;">
                                ${data[i].self_intro}
                                </p>
                                <p class="p-grey" style="margin-bottom: 5px;">Rate - ${data[i].pay_rate}</p>
                                <p class="p-grey" style="margin-bottom: 5px;">Age - ${data[i].age} years old</p>
                                <div id="sk${data[i].user_id}" class="skills-button" style="margin-top: 5px;
                                    margin-bottom: 5px;">
                                </div>

                            </div>


                        </div>
                        `
                    );

                    var services = [];
                    if (data[i].services_offer !== "") {
                        services = data[i].services_offer.split(",");
                        // console.log(services);
                        var ul = document.getElementById(`sk${data[i].user_id}`);
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
            }
        })
    }

}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

$(document).on('click', '.save-job-btn', function (event) {
    event.preventDefault();
    window.location.href = "login.php";
});

$(document).on('click', '.invite-to-job-btn', function (event) {
    event.preventDefault();
    window.location.href = "login.php";
});