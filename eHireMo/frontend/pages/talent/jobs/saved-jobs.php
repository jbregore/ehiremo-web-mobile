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
    header("Location: ../../../login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Saved Jobs</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/saved-jobs.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../client/jobs/assets/css/all-job-post.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="../../../assets/images/index/my-icon.ico">

    <!--fonts-->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <!--lottie-->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>    
</head>

<body>
    <!--start header-->
    <div class="header" id="my-header">
        <div class="container">

           <!----- ***************** header  ***************** ------>
           <?php include 'talent-jobs-header.php'; ?>

            <h2 class="title" style="">Saved Jobs</h2>

            <div class="row" id="job-lists">
            </div>

        </div>
    </div>
    <!--end header-->

    <!--modal pop up apply success -->
    <div id="id01" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;">Application sent successfully.</p>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up apply success -->

    <!--modal pop up already apply -->
    <div id="id02" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;">Application already sent.</p>
                <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up already apply -->

    <!--modal pop up remove -->
    <div id="id03" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="color:#555;">Removed Successfully.</p>
                <button type="button" onclick="document.getElementById('id03').style.display='none'" class="cancelbtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up remove -->

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
    <script src="./assets/js/saved_jobs.js"></script>
    <script src="./assets/js/notification_details.js"></script>
    <script src="./assets/js/message_notif.js"></script>
    <script>
        // $(document).on('click', '#drop-talent', function () {
        //     if ($("#talent-mobile-dropdown").css("height") == '20px') {
        //         $("#talent-mobile-dropdown").css({
        //             height: "50px",
        //             display: "block"
        //         });
        //     }
        //     else {
        //         $("#talent-mobile-dropdown").css({
        //             height: "20px",
        //             display: "none",
        //         });
        //     }
        // });

        // $(document).on('click', '#drop-jobs', function () {
        //     if ($("#jobs-mobile-dropdown").css("height") == '20px') {
        //         $("#jobs-mobile-dropdown").css({
        //             height: "170px",
        //             display: "block",
        //         });
        //     }
        //     else {
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