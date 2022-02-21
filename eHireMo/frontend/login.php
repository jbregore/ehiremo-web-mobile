<!DOCTYPE html>
<html>

<head>
    <title>Login</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/login.css">
    </link>

    <!-- icon -->
    <link rel="shortcut icon" href="assets/images/index/my-icon.ico">

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
                    <h1> <a href="index.php" style="text-decoration: none;color:white"> e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o </a></h1>
                </div>

                <div class="menuItemsRight">
                    <ul>
                        <li style="color: #fff"><span id="have">Don't have an account ?</span>
                            <a id="signup" href="sign-up-details.php">Sign Up</a>
                        </li>
                    </ul>
                </div>

                <img src="assets/images/menu.png" id="menu-icon" onclick="openNav()">
            </div>
            <!--end navbar-->

            <div id="mySidenav" class="sidenav">
                <div style="text-align: left;">
                    <h1 class="logo-mobile">e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o</h1>
                </div>

                <div class="wrapper-mobile">
                    <img class="search-icon-mobile" src="assets/images/index/search.png">
                    <input placeholder="Search" type="text" class="search-mobile">
                    <img class="clear-icon-mobile" src="assets/images/index/close.png">
                </div>

                <div style="padding-top: 30px;">
                    <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                    <a href="find-talent.php">Find Freelancers</a>
                    <a href="find-work.php">Find Work</a>
                    <a href="career-advice.php">Career Advice</a>
                </div>

                <div class="nav-mobile">
                    <button id="login-mobile">Login</button><br>
                    <button id="signup-mobile">Sign Up</button><br>
                </div>
            </div>

            <div class="row">

                <div class="col-2">
                    <h1>Log in to eHireMo</h1><br />

                    <div class="wrapper">
                        <img class="email-icon" src="assets/images/index/email.png">
                        <input id="input-email" type="email" placeholder="Email">
                    </div>

                    <div class="wrapper">
                        <img class="password-icon" src="assets/images/index/password.png">
                        <input id="input-password" type="password" placeholder="Password">
                    </div>
                    <a style="text-decoration: underline;
					color: blue; font-size: 14px; cursor: pointer;" id="forgot-pass">Forgot password</a>
                    <button id="continue-email">Continue</button>

                </div>

            </div>

        </div>
    </div>
    <!--end header-->

    <!----- footer ------>
    <div class="footer">
        <div class="container">
            <div class="row">

                <div style="text-align: center;">
                    <h1 style="padding-bottom: 50;font-size: 18px;font-weight: 500;">© 2021 eHireMo</h1>
                    <!-- <br />
                    <ul>
                        <li><a href="">Terms of Service</a></li>
                        <li><a href="">Privacy Policy</a></li>
                        <li><a href="">Feedback</a></li>
                        <li><a href="">About us</a></li>
                    </ul> -->
                </div>

            </div>
        </div>
    </div>

    <!--modal  -->
    <div class="modal-sendmessage" id="modal-sendmessage" style="display: none;">
        <div class="modal" style="text-align:center;">
            <div class="modal-header">
                <span id="close-password" onclick="document.getElementById('modal-sendmessage').style.display='none'">&times;</span>
            </div>
            <div style="" class="message-box">
                <label for="input-email">Enter your email :</label></br>
                <div class="wrapper">
                    <input type="text" id="input-email-forgot" />
                </div>

                </textarea></br>
                <!-- <input type="text" id="input-message" placeholder="Type your message here...." /> -->
                <button id="send-btn">Send</button>
            </div>

        </div>
    </div>
    <!--end modal-->

    <div id="id00" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id00').style.display='none'" class="close" title="Close Modal">×</span>
                <p>Email sent successfully. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id00').style.display='none'" class="okaybtnn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id01" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                <p>Please fill all the fields. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id02" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id02').style.display='none'" class="close" title="Close Modal">×</span>
                <p>Youre not verified yet. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id02').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id03" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id03').style.display='none'" class="close" title="Close Modal">×</span>
                <p>No account found. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id03').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id04" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id04').style.display='none'" class="close" title="Close Modal">×</span>
                <p>( Invalid ), </br> You're not a user yet. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id04').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id05" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id05').style.display='none'" class="close" title="Close Modal">×</span>
                <p>( Invalid ), </br> Incorrect email address format. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id05').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id06" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id06').style.display='none'" class="close" title="Close Modal">×</span>
                <p>( Invalid ), </br> Email is undeliverable. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id06').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <div id="id07" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id07').style.display='none'" class="close" title="Close Modal">×</span>
                <p>( Invalid ), </br> Email is disposable. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id07').style.display='none'" class="cancelbtn">Okay</button>
                </div>
            </div>
        </div>
    </div>

    <!----- loading ------>
    <div id="loading-circle" style="display: none;">
        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" background="transparent" speed="2.0" style="width: 220px; height: 220px;" loop autoplay></lottie-player>
    </div>

    <!----- script ------>
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <script src="./assets/js/login.js"></script>
    <!-- <script>
        $(document).on('click', '.logo-mobile', function() {
            window.location = "index.php";
        });

        function openNav() {
            document.getElementById("mySidenav").style.width = "100%";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }
    </script> -->

</body>

</html>