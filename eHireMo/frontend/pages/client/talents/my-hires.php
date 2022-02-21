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
    <title>My Hires</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/my-hires.css">
    </link>
    <link rel="stylesheet" type="text/css" href="assets/css/browse-talents.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../../assets/css/jquery-rateyo.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="../../../assets/images/index/my-icon.ico">

    <!--fonts-->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="https://unpkg.com/file-upload-with-preview@4.0.2/dist/file-upload-with-preview.min.css">
    <script src="https://unpkg.com/file-upload-with-preview@4.0.2/dist/file-upload-with-preview.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet">

    <!--lottie-->
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
</head>

<body>
    <!--start header-->
    <div class="header" id="my-header">
        <div class="container">

            <!----- ***************** header  ***************** ------>
            <?php include 'client-talent-header.php'; ?>

            <h2 class="title" style="">My Hires</h2>


            <!-- search -->
            <!-- <div class="col-2" style="border-bottom: 1px solid rgb(214, 214, 214);
                display: flex;padding-top: 30px;">

                    <div style="width: 70%;height: 100%;">
                        <p style="color:#555;font-size: 14px;">10,000 Jobs found.</p>
                    </div>

                    <div class="controls-div-1" >
                        <label style="color:#555;font-size: 18px;
                        margin-left: 10px;margin-right: 10px;">Sort: </label>
                        <select id="select-sort">
                            <option>Relevance</option>
                            <option>Newest</option>
                            <option>Client Rating</option>
                        </select>
                    </div>
                    
                </div> -->

            <!-- <div class="col-2" style="border-bottom: 1px solid rgb(214, 214, 214);
                padding-top: 30px;text-align: center;">

                    <img src="assets/images/hired.png" width="80"/>
                    <h1>You havent hired anyone yet.</h1>
                    <p>
                        <a style="color: #14a800;text-decoration: underline;
                        cursor: pointer;">
                            Search for freelancers</a>
                         who can get your work done.
                    </p>
                </div> -->


            <div class="row" id="no-data" style="display:none;">

            </div>

            <div class="row" id="profile-lists">
            </div>


        </div>
    </div>
    <!--end header-->

    <!--  -->
    <div id="feedback-modal" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container" style="text-align:left;">
                <span onclick="document.getElementById('feedback-modal').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p style="text-align:center;font-size:18px;">Send feedback</p>
                </br>
                <input type="hidden" id="fb_to"/>

                <p style="color:#555;font-size:16px;font-weight:400;">Star rating: <span id="txt-rate" style="color:#14a800;">  </span></p>
                <div id="rateYoFeedback"></div>
                <div class="counter"></div>
                </br>

                <p style="color:#555;font-size:16px;font-weight:400;">Comment: 
                <span id="span-comment" style="opacity:0;">
                        Please leave a comment</span></p>
                <div class="wrapperr">
                    <input id="comment-area" type="text" placeholder="Type your comment here....">
                </div>
                </br>

                <!-- <p style="color:#555;font-size:16px;font-weight:400;">Feedback photos:</p> -->
                <!-- <label class="upload-btn" for="upload">Upload photos</label>
                <input type="file" id="upload" onchange="" accept="image/x-png,image/gif,image/jpeg" multiple/>
                </br> -->

                <div class="custom-file-container" data-upload-id="myUniqueUploadId">
                    <label>Upload photos <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image"> </a></label>
                    <label class="custom-file-container__custom-file">
                        <input type="file" id="upload-feedbacks" class="custom-file-container__custom-file__custom-file-input" accept="*" multiple aria-label="Choose File">
                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                        <span class="custom-file-container__custom-file__custom-file-control"></span>
                    </label>
                    <div class="custom-file-container__image-preview"></div>
                </div>


                <!-- <button id="getRating" >Get Rating</button> -->
                <button type="button" id="send-feedback">Send feedback</button>

                <!-- <div class="clearfix">
                    <button type="button" onclick="document.getElementById('feedback-modal').style.display='none'" class="nobtn">No</button>
                    <button type="button" onclick="document.getElementById('feedback-modal').style.display='none'" class="declinebtn" id="decline-appoint">Yes</button>
                </div> -->
            </div>
        </div>
    </div>


    <!--modal pop up cancel -->
    <div id="id01" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Are you sure you want to cancel this appointment?</p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="nobtn">No</button>
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="declinebtn" id="decline-appoint">Yes</button>
                </div>
            </div>
        </div>
    </div>
    <!--end modal pop up cancel-->

    <!--modal pop up mark as done -->
    <div id="id02" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Are you sure you want to mark this as done?</p>
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
                <p>Request has been sent to your freelancer.</p>
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
                <p>Appointment has been cancelled.</p>
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
                <p>Appointment has been finished.</p>
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
    <script src="./assets/js/my_hires.js"></script>
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