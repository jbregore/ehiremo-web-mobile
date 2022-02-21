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
    <title>Getting Started</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/client-getting-started.css">
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

            <h2 class="title" style="">Getting Started</h2>
            
            <div class="slideshow-container">

                <div class="mySlides fade">
                    <div class="row">

                        <div class="col-2">
                            <img alt="" src="assets/images/headline.png" />
                            <h1>Let's start with a strong headline</h1>
                            <p class="p1-1">This help your job post stand out to the right candidates. It's the first thing they'll see, so make it count.
                            </p>
                        </div>

                        <div class="col-2 less-padding">
                            <p class="p-grey">Write a headline for your job post</p>
                            <label for="input-headline"></label>
                            <input id="input-headline" type="text" placeholder="" />
                            <p class="p-grey">Example Titles :</p>
                            <ul style="list-style-type: square;">
                                <li><span class="dash-hide">- </span>Graphic designer needed to design ad creative for multiple campaigns.
                                </li>
                                <li><span class="dash-hide">- </span>Plumber install and repair pipes that supply water and gas to, as well as carry waste away from our home.
                                </li>
                                <li><span class="dash-hide">- </span>Makeup artist who engages in beautifying individuals like presenters, actors, performers, and other professionals.
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="mySlides fade">
                    <div class="row">
                        <div class="col-2" style="padding-bottom: 80px;">
                            <img alt="" src="assets/images/skills.png" />
                            <h1>Great! What services does your work require?</h1>
                        </div>

                        <div class="col-2 less-padding">
                            <p class="p-grey">Specify services</p>
                            <label for="input-services"></label>
                            <input id="input-services" type="text" placeholder="" />
                            <p class="p-grey">Popular services :</p>
                            <ul class="style-none">
                                <li>
                                    <button>Video Editor</button> <button>Sales Agent</button> <button>Make Up
                                        Artist</button>
                                </li>
                                <li>
                                    <button>Delivery Rider</button> <button>Cleaners</button> <button>Repairs</button>
                                </li>
                                <li>
                                    <button>Plumbing</button> <button>Web Developer</button> <button>Home
                                        Service</button>
                                </li>
                                <li>
                                    <button>Online Tutor</button> <button>Graphic Designer</button> <button>Mobile
                                        Developer</button>
                                </li>
                                <li>
                                    <button>Graphic Design</button> <button>Photographer</button>
                                    <button>Caterer</button>
                                </li>
                                <li>
                                    <button>Sewer</button> <button>Driver</button> <button>Fashion Designer</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="mySlides fade">
                    <div class="row">
                        <div class="col-2" style="padding-bottom: 50px;">
                            <img alt="" src="assets/images/scope.png" />
                            <h1>Next, Estimate the scope of your work</h1>
                            <p class="p1-1">Consider the size of your project and how long will it takes.
                            </p>
                        </div>

                        <div class="col-2 less-padding" style="padding-bottom: 150px;">
                            <label for="rd1"></label>
                            <input type="radio" id="rd1"/>
                            <label style="font-size: 16px;color:#555;margin-left: 5px;">Large</label>
                            <p style="color:#555; font-size: 14px;padding-left: 23px;margin-bottom: 4px;">
                                Longer term or complex initiatives (ex. develop and execute a brand strategy (i.e., graphics, positioning)).
                            </p>

                            <label for="rd2"></label>
                            <input type="radio" id="rd2"/>
                            <label style="font-size: 16px;color:#555;margin-left: 5px;">Medium</label>
                            <p style="color:#555; font-size: 14px;padding-left: 23px;margin-bottom: 4px;">
                                Well defined project (ex. design, business, web developing).
                            </p>

                            <label for="rd3"></label>
                            <input type="radio" id="rd3" />
                            <label style="font-size: 16px;color:#555;margin-left: 5px;">Small</label>
                            <p style="color:#555; font-size: 14px;padding-left: 23px;">
                                Quick and straightforward task (ex. cleaning, plumbing, creating logo).
                            </p>

                        </div>
                    </div>
                </div>

                <div class="mySlides fade">
                    <div class="row">
                        <div class="col-2" style="padding-bottom: 50px;">
                            <img alt="" src="assets/images/budget.png" />
                            <h1>Almost done! Tell us about your budget</h1>
                            <p class="p1-1">This will help us to match you to freelancer within your range.
                            </p>
                        </div>

                        <div class="col-2 less-padding" style="padding-bottom: 120px;">
                            <label for="chk1"></label>
                            <input type="checkbox" id="chk1"/>
                            <label for="input-hrate" class="p-grey">Hourly Rate</label>
                            <input id="input-hrate" type="text" placeholder="" />
                            <p style="color:#555;">or</p><br />
                            <label for="chk2"></label>
                            <input type="checkbox" id="chk2"/>
                            <label for="input-frate" class="p-grey">Fixed Rate</label>
                            <input id="input-frate" type="text" placeholder="" />

                        </div>
                    </div>
                </div>

                <div class="mySlides fade">
                    <div class="row">


                        <div class="col-2" style="height: 100%;padding-bottom: 80px;">

                            <h1>Description</h1>
                            <p class="p1-1">Now just finish your first job post. </br> This is how freelancer figures out what you need and why you're great to work with.
                            </p>
                        </div>

                        <div class="col-2 less-padding" style="padding-bottom: 120px;padding-top:80px;">

                            <label for="input-age" class="p-grey">Age Range</label>
                            <input id="input-age" type="text" placeholder="" />

                            <label for="input-location" class="p-grey">Location</label>
                            <input id="input-location" type="text" placeholder="" />

                            <p class="p-grey">Describe your job</p>
                            <textarea id="job-des" rows="7" cols="45" placeholder=""></textarea>


                            <button id="post-job">Continue</button>

                        </div>
                    </div>
                </div>

                <!-- Next and previous buttons -->
                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>


            </div>

        </div>
    </div>
    <!--end header-->


    <!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>  

    <!----- script ------>
    <script src="../../assets/js/jquery-3.5.1.min.js"></script>
    <script src="./assets/js/client_getting_started.js"></script>
    <script src="./assets/js/typed.js"></script>
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

        // $(document).on('click', '#post-job', function() {
        //     window.location = "jobs/all-job-post.php";
        // });

        // var slideIndex = 1;
        // showSlides(slideIndex);

        // function plusSlides(n) {
        //     showSlides(slideIndex += n);
        // }

        // function currentSlide(n) {
        //     showSlides(slideIndex = n);
        // }

        // function showSlides(n) {

        //     var i;
        //     var slides = document.getElementsByClassName("mySlides");
        //     var dots = document.getElementsByClassName("dot");
        //     if (n > slides.length) {
        //         slideIndex = 1;
        //     }
        //     if (n < 1) {
        //         slideIndex = slides.length;
        //     }
        //     if (n == 1) {
        //         $(".prev").attr("style", "display:none;");
        //     } else {
        //         $(".prev").attr("style", "display:block;");
        //     }

        //     if (n == 5) {
        //         $(".next").attr("style", "display:none;");
        //     } else {
        //         $(".next").attr("style", "display:block;");
        //     }
        //     for (i = 0; i < slides.length; i++) {
        //         slides[i].style.display = "none";
        //     }
        //     for (i = 0; i < dots.length; i++) {
        //         dots[i].className = dots[i].className.replace(" active", "");
        //     }
        //     slides[slideIndex - 1].style.display = "block";
        // }

        // function openNav() {
        //     document.getElementById("mySidenav").style.width = "100%";
        // }

        // function closeNav() {
        //     document.getElementById("mySidenav").style.width = "0";
        // }
    </script>

</body>

</html>