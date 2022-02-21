
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
    <title>Getting Started</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
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

            <!--start navbar-->
            <div class="navbar">

                <div class="logo">
                    <h1> <a href="" style="text-decoration: none;color:white"> e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o </a>
                    </h1>
                </div>

                <nav>

                </nav>

                <div class="menuItemsRight">
                    <ul>
                        <li>
                            <div class="dropdown-jobs">
                                <a href="">Jobs</a>
                                <div class="dropdown-content-jobs">
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Browse Jobs</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Saved Jobs</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Applied Jobs</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">My Jobs</a>
                                </div>
                            </div>
                        </li>



                        <li>
                            <div class="dropdown-talent">
                                <a href="">Freelancers</a>
                                <div class="dropdown-content-talent">
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Browse Freelancers</a>
                                </div>
                            </div>
                        </li>
                        <li><a href="">Messages</a></li>
                        <li>
                            <a href="">
                                <img alt="" src="assets/images/bell.png" width="22" style="margin-bottom: -4px;" />
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <img alt="" src="assets/images/help.png" width="22" style="margin-bottom: -4px;" />
                            </a>
                        </li>
                        <li>
                            <div class="dropdown-profile">
                                <a href="">
                                    <img alt="" src="assets/images/people.png" width="32" style="margin-bottom: -10px;" />
                                </a>
                                <div class="dropdown-content-profile">
                                <a id="web-name" style="color:#555;font-size: 14px;padding: 8px 10px;
                            text-decoration: none; display: block;" href=""></a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Profile</a>
                                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                                    text-decoration: none;
                                    display: block;" href="">Settings</a>
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
                        <img alt="" src="assets/images/people.png" width="52" />
                        <div style="display:flex;flex-direction: column;margin-left: 10px;">
                            <p id="mobile-name" style="font-size: 15px;color:#29e411;margin-top: 8px;">John Benedict T Regore
                            </p>
                            <p style="font-size: 13px;color:#fff;">Freelancer</p>
                        </div>
                    </div>

                    <p id="drop-jobs" style="font-size: 16px;margin-bottom: 25px;
                    padding-left: 32px;padding-right: 32px;">Jobs
                        <img alt="" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
                    <div id="jobs-mobile-dropdown">
                        <a href="">Browse Jobs</a>
                        <a href="">Saved Jobs </a>
                        <a href="">Applied Jobs </a>
                        <a href="">My Jobs </a>
                    </div>
                    </p>
                    <p id="drop-talent" style="font-size: 16px;margin-bottom: 16px;
                    padding-left: 32px;padding-right: 32px;">Freelancers
                        <img alt="" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
                    <div id="talent-mobile-dropdown">
                        <a href="" style="margin-top: 10px;">Browse Freelancers</a>
                    </div>
                    </p>



                    <a href="">Messages
                        <img alt="" src="assets/images/message.png" width="24" style="float:right" />
                    </a>
                    <a href="">Notifications
                        <img alt="" src="assets/images/bell.png" width="24" style="float:right" />
                    </a>
                    <a href="">Help
                        <img alt="" src="assets/images/help.png" width="24" style="float:right" />
                    </a>
                    <a href="">Profile
                        <img alt="" src="assets/images/profile.png" width="24" style="float:right" />
                    </a>
                    <a href="">Settings
                        <img alt="" src="assets/images/settings.png" width="24" style="float:right" />
                    </a>
                    <a class="logout">Logout
                        <img alt="" src="assets/images/logout.png" width="24" style="float:right" />
                    </a>
                </div>

            </div>

            <h2 class="title" style="">Getting Started</h2>


            <div class="row less-padding">

                <div style="flex-basis: 100%;text-align: center;padding-top:10px;padding-bottom:10px;">
                    <img alt="" id="profile-picture" style="border-radius:50%;height: 100px; width:100px;object-fit:cover;" src="assets/images/people.png" class="this-image" width="120px"><br />
                    <label class="upload-btn" for="upload">Change profile</label>
                    <input type="file" id="upload" onchange="previewFile()" accept="image/x-png,image/gif,image/jpeg" />
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

                    <p>Please list down the services you can offer :
                        <span  id="span-services" style="opacity:0;">
                            Please fill this field</span>
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
                            <!-- <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <br /> -->
                        </div>

                        <!--  <div class="skills-button" style="margin-top: 5px;
                             margin-bottom: 5px;">
                            <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <button>Services offer</button> <br />
                        </div> -->
                    </div>

                    <p>Small Introduction about yourself : 
                        <span  id="span-intro" style="opacity:0;">
                        Please fill this field</span>
                    </p>
                    <div class="wrapper">
                        <textarea id="input-intro" rows="7" cols="45" placeholder=""></textarea>
                    </div>

                    <!-- <embed type="application/pdf" src="http://localhost/ehiremo/backend/uploads/user_ids/sample.pdf"></embed> -->
                    <p>Upload your portfolio (pdf file only):
                         <span  id="span-portfolio" style="opacity:0;">
                         Please fill this field</span></p>
                    <div class="wrapper">
                        <!-- <input id="input-services" type="text" placeholder="" /> -->
                        <!-- <button id="add-skill">Choose</button> -->
                        <label for="input-portfolio"></label>
                        <input id="input-portfolio" type="file" style="display:block;" accept="application/pdf" />
                    </div>
                    <!-- <p style="margin-bottom: 5px;text-decoration:underline;cursor:pointer;
                    color:#1d4354;">Upload portfolio</p> -->
                    <p style="margin-bottom: 5px;color:#555;">Please fill out this form. This may help you land your first job.</p>

                    <div class="settings-btn">

                        <div class="wrapper">
                            <button id="continue">Continue</button>
                        </div>

                    </div>

                </div>



            </div>



        </div>
    </div>
    <!--end header-->


    <!--modal-->
    <div class="modal-password" id="modal-password" style="display: none;">
        <div class="modal">
            <div class="modal-header">
                <span id="close-password">&times;</span>
            </div>

            <div class="row">

                <div class="col-2">
                    <h1>Change password</h1><br />

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

    <!--modal pop profile updated success -->
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
    <script src="./assets/js/talent_getting_started.js"></script>
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
        //     window.location = "talent-verification.html";
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