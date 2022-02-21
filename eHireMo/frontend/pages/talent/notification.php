<?php
session_start();
$_SESSION['last_page'] = $_SERVER['PHP_SELF'];
if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] == "freelancer") {
    } else {
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
    <title>Notifications</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css--> 
    <link rel="stylesheet" type="text/css" href="../client/jobs/assets/css/my-job-post.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../assets/css/starrr.css">
    </link>
    <link rel="stylesheet" type="text/css" href="../../assets/css/jquery-rateyo.css">
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

            <h2 class="title" style="">Notifications</h2>

            <div class="row" id="notification-lists" style="background-color:#fff;max-height:750px;padding-top:10px;">
               

            </div>
        </div>

    </div>
    </div>
    <!--end header-->


    <!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>

    <!----- loading ------>
    <div id="loading-circle" style="display: none;">
        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" background="transparent" speed="2.0" style="width: 220px; height: 220px;" loop autoplay></lottie-player>
    </div>

    <!----- script ------>
    <script src="../../assets/js/jquery-3.5.1.min.js"></script>
    <script src="../../assets/js/jquery-rateyo.js"></script>
    <script src="../../assets/js/starrr.js"></script>
    <script src="./assets/js/notification.js"></script>
    <script src="./assets/js/notification_details.js"></script>

</body>

</html>