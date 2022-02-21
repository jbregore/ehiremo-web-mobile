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
            <?php include 'client-header.php'; ?>

            <h2 class="title" style="">Settings</h2>


            <!-- <div class="row" style="margin-bottom: 20px;">
                <div style="flex-basis: 10%;">
                    <img src="assets/images/people.png" class="this-image" width="120px">
                </div>
                <div class="profile-header-info" style="flex-basis: 80%;">
                    <h1>Ranielle Registrado <span style="font-weight: 400;">(Client)</span></h1>
                    <p >Pulilan Bulacan</p>
                    <p style="color: #14a800;"><span style="color: #555;">Rating</span>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-half-o" aria-hidden="true"></i>
                    </p>
                </div>
            </div> -->

            <div class="row less-padding">
                <div style="flex-basis: 100%;text-align: center;">
                <img alt="" id="profile-picture"  style="border-radius:50%;height: 100px; width:100px;object-fit:cover;" src="assets/images/people.png" class="this-image" width="120px"><br />
                    <label class="upload-btn" for="upload">Change profile</label>
                    <input type="file" id="upload" onchange="previewFile()" accept="image/x-png,image/gif,image/jpeg"/>
                    <p class="p-grey" style="color: #555;font-size: 14px;
                    margin-top: 10px;">This is a client account.</p>
                    <p class="p-grey" style="color: #14a800;font-size: 14px;
                    text-decoration: underline;cursor:pointer" id="switch-role">Switch to freelancer account.</p><br />
                </div>

                <div class="profile-header-info">

                    <p>Name :</p>

                    <div class="wrapper p-40">
                        <label for="input-firstname"></label>
                        <input id="input-firstname" type="text" disabled>
                    </div>

                    <p>Address :</p>
                    <div class="wrapper">
                        <label for="input-address"></label>
                        <input id="input-address" type="text" disabled>
                    </div>

                    <p>Birthday :</p>
                    <div class="wrapper">
                        <label for="input-date"></label>
                        <input id="input-date" type="text" disabled>
                    </div>

                    <div class="settings-btn">

                        <div class="wrapper">
                            <button id="change-password" style="margin-right: 8px;">Change password</button>
                            <button id="save-changes">Save changes</button>
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

    <!--modal pop profile updated success-->
    <div id="id01" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br><p>Profile updated successfully.</p>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal profile updated success -->

    <!--modal pop up password success -->
    <div id="id02" class="modall" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;">Password has been changed.</p>
                <button type="button" onclick="document.getElementById('id02').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up password success -->

    <!--modal pop up confirmation -->
    <div id="id03" class="modall" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;">Are you sure you want to save changes?</p>
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
                <p style="color:#555;font-size:16px;">Are you sure you want to switch into a freelancer account?</p>
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