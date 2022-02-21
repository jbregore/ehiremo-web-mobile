<?php
include("../../../backend/api/users/client_vkey.php");
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
    <title>Verification Request</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/wait-client-verification.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="../../assets/images/index/my-icon.ico">

    <!--fonts-->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

</head>

<body>
    <!--start header-->
    <div class="header" id="my-header">
        <div class="container">

            <!----- ***************** header  ***************** ------>
            <!--start navbar-->
            <div class="navbar">

                <div class="logo">
                    <h1> <a href="#" title="" style="text-decoration: none;color:white"> e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o </a>
                    </h1>
                </div>

                <nav>

                </nav>

                <div class="menuItemsRight">
                    <ul>
                        <li>
                            <div class="dropdown-jobs">
                                <a href="#" title="">Jobs</a>
                                <div class="dropdown-content-jobs">
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">Post a job</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">My Job Post</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">All Job Post</a>
                                </div>
                            </div>
                        </li>



                        <li>
                            <div class="dropdown-talent">
                                <a href="#" title="">Freelancers</a>
                                <div class="dropdown-content-talent">
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">My Hires</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">Saved Freelancers</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">Browse Freelancers</a>
                                </div>
                            </div>
                        </li>
                        <li><a href="#" title="">Messages</a></li>
                        <li>
                            <a href="#" title="">
                                <img alt="" src="assets/images/bell.png" width="22" style="margin-bottom: -4px;" />
                            </a>
                        </li>
                        <li>
                            <a href="#" title="">
                                <img alt="" src="assets/images/help.png" width="22" style="margin-bottom: -4px;" />
                            </a>
                        </li>
                        <li>
                            <div class="dropdown-profile">
                                <a href="#" title="">
                                    <img alt="" id="web-profile-picture" src="assets/images/people.png" style="border-radius:50%;
                    margin-bottom: -10px;height:32px;width:32px;" />
                                </a>
                                <div class="dropdown-content-profile">
                                    <a id="web-name" style="color:#555;font-size: 14px;padding: 8px 10px;
                        text-decoration: none; display: block;" href="#" title=""></a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">Profile</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;" href="#" title="">Settings</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                text-decoration: none;
                display: block;cursor:pointer;" class="logout">Logout</a>
                                </div>
                            </div>


                        </li>
                    </ul>
                </div>

                <img alt="" src="../../assets/images/menu.png" id="menu-icon" onclick="openNav()">
            </div>
            <!--end navbar-->

            <div id="mySidenav" class="sidenav">
                <div style="text-align: left;">
                    <h1 class="logo-mobile">e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o</h1>
                </div>

                <div style="padding-top: 30px;">
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                    <div style="display:flex;flex-direction: row;
                        padding-left: 30px;padding-bottom: 20px;">
                        <img alt="" id="mobile-profile-picture" src="assets/images/people.png" width="52" style="border-radius:50%; width:52px;height:52px;" />
                        <div style="display:flex;flex-direction: column;margin-left: 10px;">
                            <p id="mobile-name" style="font-size: 15px;color:#29e411;margin-top: 8px;">
                            </p>
                            <p style="font-size: 13px;color:#fff;">Client</p>
                        </div>
                    </div>

                    <p style="font-size: 16px;margin-bottom: 16px;
                        padding-left: 32px;padding-right: 32px;">Jobs
                        <img alt="" id="drop-jobs" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
                    <div id="jobs-mobile-dropdown">
                        <a href="#" title="">Post a job</a>
                        <a href="#" title="">My job post </a>
                        <a href="#" title="">All job post </a>
                    </div>
                    </p>
                    <p style="font-size: 16px;margin-bottom: 16px;
                        padding-left: 32px;padding-right: 32px;">Freelancers
                        <img alt="" id="drop-talent" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
                    <div id="talent-mobile-dropdown">
                        <a href="#" title="">My Hires</a>
                        <a href="#" title="">Saved Freelancers</a>
                        <a href="#" title="">Browse Freelancers</a>
                    </div>
                    </p>



                    <a href="#" title="">Messages
                        <img alt="" src="assets/images/message.png" width="24" style="float:right" />
                    </a>
                    <a href="#" title="">Notifications
                        <img alt="" src="assets/images/bell.png" width="24" style="float:right" />
                    </a>
                    <a href="#" title="">Help
                        <img alt="" src="assets/images/help.png" width="24" style="float:right" />
                    </a>
                    <a href="#" title="">Profile
                        <img alt="" src="assets/images/profile.png" width="24" style="float:right" />
                    </a>
                    <a href="#" title="">Settings
                        <img alt="" src="assets/images/settings.png" width="24" style="float:right" />
                    </a>
                    <a class="logout">Logout
                        <img alt="" src="assets/images/logout.png" width="24" style="float:right" />
                    </a>
                </div>

            </div>


            <h2 class="title" style="">You are now verified</h2>

            <div class="row">

                <div class="col-2" style="align-items: center;padding-bottom: 50px;
                padding-top:80px;">
                    <center>
                        <img alt="" src="assets/images/girl-verified.gif" width="280" />
                    </center>
                    <p style="font-size: 16px;color:#333;margin-top:15px;text-align:center;padding: 0 40px;">
                        Good day and welcome to eHireMo, An online service marketplace platform
                        for service seekers and it's providers. </p>

                    <center>
                        <button id="next-verify">Let's get started</button>
                    </center>
                </div>


            </div>


        </div>
    </div>
    <!--end header  -->

    <!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>  

    <!----- script ------>
    <script src="../../assets/js/jquery-3.5.1.min.js"></script>
    <script src="./assets/js/client_welcome_page.js"></script>
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

        // $(document).on('click', '#next-verify', function() {
        //     window.location = "client-getting-started.php";
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