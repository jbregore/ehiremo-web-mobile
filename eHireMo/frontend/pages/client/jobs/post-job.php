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
    <title>Post a job</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/post-job.css">
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

            <h2 class="title" style="">Post a Job</h2>

            <div class="row">

                <div class="col-2 less-padding">
                    <form id="post-job-form" enctype="multipart/form-data">

                        <label class="p-grey" for="input-headline">Headline :
                        <span  id="span-headline" style="opacity:0;">
                            Please fill this field</span>
                        </label>
                        <input id="input-headline" type="text" required/><br />

                        <label class="p-grey" for="input-location">Location :
                        <span  id="span-location" style="opacity:0;">
                            Please fill this field</span>
                        </label>
                        <input id="input-location" type="text" required/><br />

                        <label class="p-grey" for="input-skills">Services : 
                        <span  id="span-services" style="opacity:0;">
                            Please fill this field</span>
                        </label><br />
                        <div class="wrapper">
                            <input id="input-skills" type="text"/>
                            <button type="button" id="add-skill">Add</button>
                        </div>
                        <div id="skills-container" class="skills-button" style="margin-top: 5px;
                             margin-bottom: 5px;">
                        </div>

                        <label class="p-grey" for="input-range">Age range :</label>
                        <input id="input-range" type="text" required/><br />

                        <label class="p-grey" for="select-scope">Project Scope :</label>
                        <select name="" id="select-scope" required>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                        </select>

                        <div style="text-align: left;
                        display: flex;flex-direction: row;" >

                            <div style="width: 50%;margin-right: 10px;" >
                                <label for="h-rate"></label>
                                <input type="radio" name="choice-rate" value="Hourly Rate" id="h-rate" required/>
                                <label for="input-hourly-rate">Hourly Rate</label>
                                <input id="input-hourly-rate" type="text" required/>
                            </div>

                            <div style="width: 50%;margin-right: 10px;">
                                <label for="f-rate"></label>
                                <input type="radio" name="choice-rate" value="Fixed Rate" id="f-rate" required/>
                                <label for="input-project-based">Fixed Rate</label>
                                <input id="input-project-based" type="text" required />
                            </div>

                        </div>


                        <p class="p-grey">Describe your job</p>
                        <label for="input-desc"></label>
                        <textarea id="input-desc" rows="7" cols="45" placeholder="" required></textarea>

                        <button id="post-job">Post job</button>
                    </form>

                </div>
            </div>




        </div>
    </div>
    <!--end header-->


    <!--modal pop up update success-->
    <div id="id01" class="modal" style="display: none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                </br>
                <p>Job posted successfully.</p>
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="okaybtn">Okay</button>
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
    <script src="./assets/js/post_job.js"></script>
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