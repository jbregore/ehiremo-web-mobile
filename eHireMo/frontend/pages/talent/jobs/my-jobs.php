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
<html>

<head>
    <title>My Current Jobs</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="../../client/talents/assets/css/browse-talents.css">
    </link>
    <link rel="stylesheet" type="text/css" href="assets/css/my-jobs.css">
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
            <?php include 'talent-jobs-header.php'; ?>

            <h2 class="title" style="">My Current Jobs</h2>


            <div class="row" id="no-data" style="display:none;">

            </div>

            <div class="row" id="profile-lists">
            </div>


        </div>
    </div>
    <!--end header  style="display: none;"-->


    <div id="feedback-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container" style="text-align:left;">
                <span onclick="document.getElementById('feedback-modal').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="text-align:center;font-size:18px;color:#555;">Send feedback</p>
                </br>
                <input type="hidden" id="fb_to"/>

                <p style="color:#555;font-size:16px;font-weight:400;">Star rating: <span id="txt-rate" style="color:#14a800;">  </span></p>
                <div id="rateYoFeedback"></div>
                </br>

                <p style="color:#555;font-size:16px;font-weight:400;">Comment:</p>
                <div class="wrapperr">
                    <input id="comment-area" type="text" placeholder="Type your comment here....">
                </div>
                </br>

                <!-- <button id="getRating" >Get Rating</button> -->
                <button type="button" id="send-feedback">Send feedback</button>

            </div>
        </div>
    </div>

    <!--modal pop up cancel -->
    <div id="id01" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="font-weight: 500;color: #555;font-size: 16px;">Are you sure you want to cancel this appointment?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="nobtn">No</button>
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="declinebtn" id="decline-appoint">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up cancel-->

    <!--modal pop up mark as done-->
    <div id="id02" class="modal" style="display: none;" >
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="font-weight: 500;color: #555;font-size: 16px;">Are you sure you want to mark this as done?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id02').style.display='none'" class="nobtn">No</button>
                    <button type="button" onclick="document.getElementById('id02').style.display='none'" class="save-done" id="done-appoint">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up mark as done-->

    <!--modal pop up update success-->
    <div id="id03" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="font-weight: 500;color: #555;font-size: 16px;">Request has been sent to your client.</p>
                <button type="button" onclick="document.getElementById('id03').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up update success -->

    <!--modal pop up update success -->
    <div id="id04" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id04').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="font-weight: 500;color: #555;font-size: 16px;">Appointment has been cancelled.</p>
                <button type="button" onclick="document.getElementById('id04').style.display='none'" class="cancelbtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up update success -->

    <!--modal pop up update success -->
    <div id="id05" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id05').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="font-weight: 500;color: #555;font-size: 16px;">Appointment has been finished.</p>
                <button type="button" onclick="document.getElementById('id05').style.display='none'" class="okaybtn">Okay</button>
            </div>
        </div>
    </div>
    <!--end modal pop up update success -->

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
    <script src="./assets/js/my_jobs.js"></script>
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

        // function openNav() {
        //     document.getElementById("mySidenav").style.width = "100%";
        // }

        // function closeNav() {
        //     document.getElementById("mySidenav").style.width = "0";
        // }
    </script>

</body>

</html>