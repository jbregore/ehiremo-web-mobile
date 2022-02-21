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
    <title>Verify your account</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/client-verification.css">
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

            <h2 class="title" style="">Verification</h2>

            <div class="row">

                <div class="col-2" style="align-items: center;padding-bottom: 50px;">
                    <div style="text-align: center;margin-top: 30px;padding: 0 30px;">
                        Please attach front and back photo of your id.
                    </div>

                    <div style="text-align: center;margin-top: 10px;">
                        <?php if ($_SESSION['gender'] == "Male") {
                            echo '<img alt="" src="../client/assets/images/boy hold.jpg" width="250" />';
                        } else {
                            echo '<img alt="" src="../client/assets/images/girl hold.jpg" width="250" />';
                        }
                        ?>
                    </div>

                    <div class="id-container">
                        <div style="flex-basis: 50%;text-align: left;">
                            <div style="overflow:hidden; border: 1px solid #c3c3c3; width: 97%;height: 280px;margin-bottom:10px">
                                <img alt="" id="front-id" style="width: 100%;height:100%;object-fit:cover;">
                            </div>
                            <input type="file" name="front-id-img" id="front-id-img" onchange="previewFileFront()" accept="image/x-png,image/gif,image/jpeg">
                            <label for="front-id-img">front id</label>
                        </div>
                        <div style="flex-basis: 50%;text-align: left;">
                            <div style="overflow:hidden; border: 1px solid #c3c3c3; width: 97%;height: 280px;margin-bottom:10px">
                                <img alt="" id="backed-id" style="width: 100%;height:100%;object-fit:cover;">
                            </div>
                            <input type="file" name="back-id-img" id="back-id-img" onchange="previewFileBack()" accept="image/x-png,image/gif,image/jpeg">
                            <label for="back-id-img">back id</label>
                        </div>
                    </div>
                    <br />
                    <div class="btn-id-container">
                        <button id="next-verify">Next</button>
                    </div>

                </div>



            </div>


        </div>
    </div>
    <!--end header  -->

    <!--modal      -->
    <div class="modal-message" id="modal-message" style="display:none;">
        <div class="modal">
            <div class="modal-header">
                <span id="close-message">&times;</span>
            </div>

            <div style="text-align: center; padding: 0 20px;margin-top: 30px">
            <p style="font-size: 18px;margin: 10px;color:#333">Now upload a photo that you are holding this id.</p>
                <div style="overflow:hidden; border: 1px solid #c3c3c3; width: 97%;height: 280px;margin-bottom:10px">
                    <img alt="" id="whole-id" style="width: 100%;height:100%;object-fit:cover;">
                </div>
                <input type="file" name="whole-id-img" id="whole-id-img" onchange="previewFileWhole()" accept="image/x-png,image/gif,image/jpeg">
                <label for="whole-id-img" id="whole-label">Upload</label><br/>
                <div class="btn-id-container">
                        <button id="next-verify2">Continue</button>
                    </div>
            </div>

        </div>
    </div>
    <!--end modal-->

    <div id="id01" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                    </br>
                <p>Please fill all the fields. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn" >Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id02" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                    </br>
                <p>Invalid, your email adress already exist. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn" >Okay</button>
                </div>
            </div>
        </div>
    </div>

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
    <script src="assets/js/client_verification.js"></script>
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