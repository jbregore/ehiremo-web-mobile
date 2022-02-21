<?php
session_start();
$_SESSION['last_page'] = $_SERVER['PHP_SELF'];
if (isset($_SESSION['user_id']) ) {
    if($_SESSION['role'] == "freelancer"){

    }else{
        header('Location: ' . $_SESSION['last_page']);
        exit;
    }
} else {
    header("Location: ../../login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Settings</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/settings.css">
    </link>
    <link rel="stylesheet" type="text/css" href="assets/css/talent-getting-started.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="../../assets/images/index/my-icon.ico">

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
            <?php include 'talent-header.php'; ?>


            <h2 class="title" style="">Settings</h2>


            <div class="row less-padding">
                <div style="flex-basis: 100%;text-align: center;">
                    <img alt="" id="profile-picture"  style="border-radius:50%;height: 100px; width:100px;object-fit:cover;" src="assets/images/people.png" class="this-image" width="120px"><br />
                    <label class="upload-btn" for="upload">Change profile</label>
                    <input type="file" id="upload" onchange="previewFile()" accept="image/x-png,image/gif,image/jpeg"/>
                    <p class="p-grey" style="color: #555;font-size: 14px;
                    margin-top: 10px;">This is a freelancer account.</p>
                    <p class="p-grey" style="color: #14a800;font-size: 14px;
                    text-decoration: underline;cursor:pointer" id="switch-role">Switch to client account.</p><br />
                </div>
                <div class="profile-header-info">

                    <p>Name :</p>
                    <div class="wrapper p-40">
                        <label for="input-firstname"></label>
                        <input id="input-firstname" type="text" placeholder="" disabled>
                    </div>


                    <p>Address :</p>
                    <div class="wrapper">
                        <label for="input-address"></label>
                        <input id="input-address" type="text" placeholder="" disabled>
                    </div>

                    <p>Birthday :</p>
                    <div class="wrapper">
                        <label for="input-date"></label>
                        <input id="input-date" type="text" placeholder="" disabled>
                    </div>

                    <p>Rate :
                    <span id="span-rate" style="opacity:0;">
                        Please fill this field</span>
                    </p>
                    <div class="wrapper">
                        <label for="input-rate"></label>
                        <input id="input-rate" type="text" placeholder="Ex. Php100.00 /hr" /><br />
                    </div>

                    <p>Please type the services you can offer :
                    <span  id="span-services" style="opacity:0;">
                            Invalid</span>
                    </p>
                    <div class="wrapper">
                        <label for="input-services"></label>
                        <input id="input-services" type="text" placeholder="Ex. Web Developing" />
                        <button id="add-skill">Add</button>
                        <!-- <button id="show-test">Show</button> -->
                    </div>
                    <div style="text-align: center;">
                        <div id="skills-container" class="skills-button" style="margin-top: 5px;
                             margin-bottom: 5px;max-width:500px;">
                        </div>
                        <!--<div class="skills-button" style="margin-top: 5px;
                             margin-bottom: 5px;">
                            <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <br />
                        </div> -->
                    </div>

                    <p>Small Introduction about yourself :
                    <span  id="span-intro" style="opacity:0;">
                        Please fill this field</span>
                    </p>
                    <div class="wrapper">
                        <label for="input-intro"></label>
                        <textarea id="input-intro" rows="7" cols="45" placeholder=""></textarea>
                    </div>

                    <p style="color: #1d4354;text-decoration:underline;">
                    <a href="" target="_blank" id="view-portfolio" style="color: #1d4354;">View my portfolio</a></p></br>
                    <p>Upload your portfolio (pdf file only):
                        <span id="span-portfolio" style="opacity:0;">
                            Please fill this field</span>
                    </p>
                    <div class="wrapper">
                        <!-- <input id="input-services" type="text" placeholder="" /> -->
                        <!-- <button id="add-skill">Choose</button> -->
                        <label for="input-portfolio"></label>
                        <input id="input-portfolio" type="file" style="display:block;" accept="application/pdf" />
                    </div>

                    <div class="settings-btn">

                        <div class="wrapper">
                            <button id="change-password" style="margin-right: 8px;">Change password</button>
                            <button id="continue">Save Changes</button>
                        </div>

                    </div>

                </div>



            </div>



        </div>
    </div>
    <!--end header-->


    <!--modal -->
    <div class="modal-password" id="modal-password" style="display: none;">
        <div class="modal">
            <div class="modal-header">
                <span id="close-password">&times;</span>
            </div>

            <div class="row">

                <div class="col-2">
                    <h1>Change password</h1><br />
                    
                    <div id="validation-display" style="background-color:rgb(255, 186, 186);
                    align-items:center;margin-top:-10px;margin-bottom:8px;display:none;">
                        <p id="validation-text" style="color:rgb(216, 0, 12);font-size: 14px;padding: 8px;">wrong password </p>
                    </div>

                    <div class="wrapper-2">
                        <label for="old-password">Old Password : </label><br />
                        <input id="old-password" type="password">
                    </div>

                    <div class="wrapper-2">
                        <label for="new-password">New Password : </label><br />
                        <input id="new-password" type="password">
                    </div>

                    <div class="wrapper-2">
                        <label for="conf-password">Confirm Password : </label><br />
                        <input id="conf-password" type="password">
                    </div>

                    <button id="save-btn">Save</button>

                </div>

            </div>

        </div>
    </div>
    <!--end modal-->

    <!--modal pop up apply success -->
    <div id="id01" class="modall" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;font-size:16px;">Password has been changed.</p>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up apply success -->

    <!--modal pop profile updated success-->
    <div id="id02" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br><p style="color:#555;font-size:16px;">Profile updated successfully.</p>
                
                <button type="button" onclick="document.getElementById('id02').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal profile updated success -->

    <!--modal pop up confirmation -->
    <div id="id03" class="modall" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;font-size:16px;">Are you sure you want to save changes?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id03').style.display='none'" class="cancelbtnn">Cancel</button>
                    <button type="button" onclick="document.getElementById('id03').style.display='none'" class="okaybtnn" id="yes-changes">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up confirmation-->

    <!--modal pop up confirmation -->
    <div id="id04" class="modall" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id04').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;font-size:16px;">Are you sure you want to switch into a client account?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id04').style.display='none'" class="cancelbtnn">Cancel</button>
                    <button type="button" onclick="document.getElementById('id04').style.display='none'" class="okaybtnn" id="yes-switch-role">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up confirmation-->

    <!--modal pop profile updated success-->
    <div id="id05" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id05').style.display='none'" class="close" title="Close Modal">×</span>
                </br><p style="color:#555;font-size:16px;">Switch role successfully.</p>
                
                <button type="button" onclick="document.getElementById('id05').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal profile updated success -->

    <!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>  

    <!----- loading ------>
    <div id="loading-circle" style="display: none;">
        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" 
        background="transparent" speed="2.0" 
        style="width: 220px; height: 220px;" loop autoplay></lottie-player>
    </div>

    <!----- script ------>
    <script src="../../assets/js/jquery-3.5.1.min.js"></script>
    <script src="./assets/js/settings.js"></script>
    <script src="./assets/js/notification_details.js"></script>
    <script src="./assets/js/message_notif.js"></script>
    <script>
        // $(document).on('click', '#drop-talent', function() {
        //     if ($("#talent-mobile-dropdown").css("height") == '20px') {
        //         $("#talent-mobile-dropdown").css({
        //             height: "50px",
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
        //             height: "170px",
        //             display: "block",
        //         });
        //     } else {
        //         $("#jobs-mobile-dropdown").css({
        //             height: "20px",
        //             display: "none",
        //         });
        //     }
        // });

        // $(document).on('click', '#continue', function() {
        //     window.location = "";
        // });

        // $(document).on('click', '#change-password', function() {
        //     $("#modal-password").fadeIn();
        // });

        // $(document).on('click', '#close-password', function() {
        //     $("#modal-password").fadeOut();
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