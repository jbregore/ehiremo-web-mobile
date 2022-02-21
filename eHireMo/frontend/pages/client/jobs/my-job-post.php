<?php
session_start();
$_SESSION['last_page'] = $_SERVER['PHP_SELF'];
if (isset($_SESSION['user_id']) ) {
    if($_SESSION['role'] == "client"){

    }else{
        header('Location: ' . $_SESSION['last_page']);
        exit;
    }
} else {
    header("Location: ../../../login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>My Job Postings</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/my-job-post.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../../assets/css/starrr.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../../assets/css/jquery-rateyo.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="../../../assets/images/index/my-icon.ico">

    <!--fonts-->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!--lottie-->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>

<body>
    <!--start header-->
    <div class="header" id="my-header">
        <div class="container">

            <!----- ***************** header  ***************** ------>
            <?php include 'client-job-header.php'; ?>

            <h2 class="title" style="">My Job Postings</h2>

            <div class="row" id="job-lists">

                <!-- search -->



                <!-- <div class="col-2 less-padding" style="
                    display: flex;flex-direction: row;text-align: left;
                    justify-content: center;border-bottom: 1px solid rgb(214, 214, 214);">

                    <div style="width: 70%;">
                        <h1 style="color: #14a800;">Plumber near Robinson's Pulilan</h1>
                        <label class="p-grey" style="color:rgb(75, 75, 75);"">Hi! I'm Ranielle and I am looking for a plumber. I am looking for my third transaction. Check out my profile to see how good client I am. Don't hesitate to message me.</label><br />
                            <div class=" skills-button" style="margin-top: 5px;
                              margin-bottom: 5px;">
                                <button>Service</button> <button>Service</button> <button>Service</button> <br />
                            </div>
                        <label class="p-grey" style="font-weight: 400;">ProjectScope - Small</label><br />
                        <label class="p-grey" style="font-weight: 400;">Age - 18-50 years old</label><br />
                        <label class="p-grey" style="font-weight: 400;">Fixed Price - posted 1 hour ago.</label><br />
                        <label class="p-grey" style="font-weight: 400;">Budget - Php 10,000</label><br />
                        <label class="p-grey" style="font-weight: 400;">Location - Pulilan, Bulacan </label><br />
                    </div>

                    <div style="width: 20%;text-align: center;">
                        <h1>2</h1>
                        <label class="p-grey">proposals.</label>
                    </div>

                    <div style="width: 10%;">
                        <br />
                        <div class="dropdown-ellipsis">
                            <img class="ellipsis-icon" src="assets/images/three-dots.png" width="30" style="cursor: pointer;" />
                            <div class="dropdown-content-ellipsis" style="float: right;">
                                <a style="color:#555;font-size: 12px;padding: 4px 10px;
                                    text-decoration: none;
                                    display: block;" href="#">View Post</a>
                                <a style="color:#555;font-size: 12px;padding: 4px 10px;
                                    text-decoration: none;
                                    display: block;" href="#">Edit Post</a>
                                <a style="color:#555;font-size: 12px;padding: 4px 10px;
                                    text-decoration: none;
                                    display: block;" href="#">Remove Post</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-2">

                    <div style="width: 70%;">
                        <p style="color:#555;font-size: 14px;">6 out of 10 Job Postings</p>
                    </div>

                    <div class="controls-div">
                        <button class="control-btn"> &#10094; Previous </button>
                        <p style="color:#555;font-size: 20px;
                            margin-left: 10px;margin-right: 10px;"><u>1</u></p>
                        <button class="control-btn"> Next &#10095;</button>
                    </div>

                </div> -->

            </div>
        </div>

    </div>
    </div>
    <!--end header-->


    <!--modal pop up delete-->
    <div id="id01" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Are you sure you want to delete this post?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="deletebtn">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up delete-->

    <!--modal pop up delete success-->
    <div id="id02" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Job post removed successfully.</p>
                <button type="button" onclick="document.getElementById('id02').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up delete success -->

    <!--modal pop up update-->
    <div id="id03" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Are you sure you want update this job post?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id03').style.display='none'" class="cancelbtn">Cancel</button>
                    <button type="button" onclick="document.getElementById('id03').style.display='none'" class="save-edit" id="continue-save">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up update-->

    <!--modal pop up update success-->
    <div id="id04" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id04').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Job post updated successfully.</p>
                <button type="button" onclick="document.getElementById('id04').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up update success -->

    <!--modal pop up decline-->
    <div id="id05" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id05').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Are you sure you want to decline this proposal?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id05').style.display='none'" class="cancelbtn">Cancel</button>
                    <button type="button" onclick="document.getElementById('id05').style.display='none'" class="declinebtn">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up decline-->

    <!--modal edit-->
    <div class="modal-edit" id="modal-edit" style="display: none;">
        <div class="modal-edit-area">
            <div class="modal-edit-header">
                <span id="close-edit-area">&times;</span>
            </div>
            <div class="row">

                <div class="col-2 less-padding">
                    <form id="edit-job-form" enctype="multipart/form-data" style="text-align:left;">

                        <label class="p-grey" for="input-headline">Headline :
                            <span id="span-headline" style="opacity:0;">
                                Please fill this field</span>
                        </label>
                        <input id="input-headline" type="text" required /><br />

                        <label class="p-grey" for="input-location">Location :
                            <span id="span-location" style="opacity:0;">
                                Please fill this field</span>
                        </label>
                        <input id="input-location" type="text" required /><br />

                        <label class="p-grey" for="input-skills">Services :
                            <span id="span-services" style="opacity:0;">
                                Please fill this field</span>
                        </label><br />
                        <div class="wrapper">
                            <input id="input-skills" type="text" />
                            <button type="button" id="add-skill">Add</button>
                        </div>
                        <div id="skills-container" class="skills-button" style="margin-top: 5px;
                             margin-bottom: 5px;">
                        </div>

                        <label class="p-grey" for="input-range">Age range :</label>
                        <input id="input-range" type="text" required /><br />

                        <label class="p-grey" for="select-scope">Project Scope :</label>
                        <select name="" id="select-scope" required>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>

                        <div style="text-align: left;
                        display: flex;flex-direction: row;">

                            <div style="width: 50%;margin-right: 10px;">
                                <label for="h-rate"></label>
                                <input type="radio" name="choice-rate" value="Hourly Rate" id="h-rate" required />
                                <label for="input-hourly-rate">Hourly Rate</label>
                                <input id="input-hourly-rate" type="text" required />
                            </div>

                            <div style="width: 50%;margin-right: 10px;">
                                <label for="f-rate"></label>
                                <input type="radio" name="choice-rate" value="Fixed Rate" id="f-rate" required />
                                <label for="input-project-based">Fixed Rate</label>
                                <input id="input-project-based" type="text" required />
                            </div>

                        </div>


                        <p class="p-grey">Describe your job</p>
                        <label for="input-desc"></label>
                        <textarea id="input-desc" rows="7" cols="45" placeholder="" required></textarea>

                        <button id="save-changes">Save Changes</button>
                        <button type="button" id="cancel-job">Cancel</button>

                    </form>

                </div>

            </div>





        </div>
    </div>
    <!--end modal edit-->

    <!--modal proposals-->
    <div id="proposal-modal" class="modal" style="display: none;">
        <div class="modal-content" id="proposal-modal-content">
            <div class="container" style="padding-bottom:40px;">
                <span onclick="document.getElementById('proposal-modal').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>You have <span id="proposal-number"> </span> proposals from : </p>
                </br>

                <div id="proposals-list">

                </div>
                <!-- <div class="row" style="border-bottom: 1px solid rgb(214, 214, 214);
                    padding-bottom:10px;padding-top:20px;">
                    <div style="width:20%;text-align:center;">
                        <img src="../assets/images/people.png" width="50" />
                        <p style="font-size:14px;color:#1d4354;text-decoration:underline;cursor:pointer;">message</p>
                    </div>

                    <div style="width:60%;padding: 0 10px;">
                        <p >Freelancer: John Doe</p>
                        <p >Address: San Luis</p>
                        <p style="color: #14a800;">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star-half-o" aria-hidden="true"></i>
                        </p>
                    </div>

                    <div style="width: 20%;height:90px;">
                        <button id="view-profile" type="button">View profile</button>
                        <p style="margin-top:10px;text-align:right;font-size:14px;color:#1d4354;text-decoration:underline;cursor:pointer;">decline</p>
                    </div>
                </div> -->

                <!-- <div class="row" style="border-bottom: 1px solid rgb(214, 214, 214);
                    padding-bottom:10px;padding-top:20px;">
                    <div style="width:20%;text-align:center;">
                        <img src="../assets/images/people.png" width="50" />
                        <p style="font-size:14px;color:#1d4354;text-decoration:underline;cursor:pointer;">message</p>
                    </div>

                    <div style="width:60%;padding: 0 10px;">
                        <p >Freelancer: John Doe</p>
                        <p >Address: San Luis</p>
                        <p style="color: #14a800;">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star-half-o" aria-hidden="true"></i>
                        </p>
                    </div>

                    <div style="width: 20%;height:90px;">
                        <button id="view-profile" type="button">View profile</button></br>
                        <p style="margin-top:10px;text-align:right;font-size:14px;color:#1d4354;text-decoration:underline;cursor:pointer;">decline</p>
                    </div>
                </div> -->





            </div>
        </div>
    </div>
    </div>
    <!--end modal proposals -->


    <!----- ***************** footer  ***************** ------>
    <?php include '../footer.php'; ?>

    <!----- loading ------>
    <div id="loading-circle" style="display: none;">
        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" 
        background="transparent" speed="2.0" 
        style="width: 220px; height: 220px;" loop autoplay></lottie-player>
    </div>
    
    <!----- script ------>
    <script src="../../../assets/js/jquery-3.5.1.min.js"></script>
    <script src="../../../assets/js/jquery-rateyo.js"></script>
    <script src="../../../assets/js/starrr.js"></script>
    <script src="./assets/js/my_job_post.js"></script>
    <script src="./assets/js/notification_details.js"></script>
    <script src="./assets/js/message_notif.js"></script>
    <script>
        

        // $(document).on('click', '#drop-talent', function() {
        //     if ($("#talent-mobile-dropdown").css("height") == '20px') {
        //         $("#talent-mobile-dropdown").css({
        //             height: "125px",
        //             display: "block"
        //         });
        //     } else {
        //         $("#talent-mobile-dropdown").css({
        //             height: "20px",
        //             display: "none",
        //         });
        //     }
        // });

        // $(document).on('click', '#drop-jobs', function() {
        //     if ($("#jobs-mobile-dropdown").css("height") == '20px') {
        //         $("#jobs-mobile-dropdown").css({
        //             height: "125px",
        //             display: "block",
        //         });
        //     } else {
        //         $("#jobs-mobile-dropdown").css({
        //             height: "20px",
        //             display: "none",
        //         });
        //     }
        // });


        // function openNav() {
        //     document.getElementById("mySidenav").style.width = "100%";
        // }

        // function closeNav() {
        //     document.getElementById("mySidenav").style.width = "0";
        // }
    </script>

</body>

</html>