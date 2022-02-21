<!DOCTYPE html>
<html>

<head>
    <title>Sign Up Details</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--css-->
    <link rel="stylesheet" type="text/css" href="assets/css/sign-up-details.css">
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
                    <h1> <a href="index.php" style="text-decoration: none;color:white"> e<span style="font-weight: bold;">H</span>ire<span style="font-weight: bold;">M</span>o </a>
                    </h1>
                </div>

                <div class="menuItemsRight">
                    <ul>
                        <li style="color: #fff"><span id="have">Already have an account ?</span>
                            <a id="login" href="login.php">Login</a>
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
                    <h1>Complete your account setup</h1>
                    <div id="validation-display" style="background-color:rgb(255, 186, 186);
                    align-items:center;display:none;">
                        <p id="validation-text" style="color:rgb(216, 0, 12);font-size: 14px;padding-top: 10px;">wrong password </p>
                    </div>
                    <form id="signup-form" enctype="multipart/form-data">
                        <div style="text-align: left;">
                            <p style="font-size: 16px; margin-top: 20px;
                        margin-bottom: 6px;color:#555">Im looking for:</p>
                            <input type="radio" style="cursor: pointer" name="user_pos" value="freelancer" required><label> a
                                client</label><br />
                            <input type="radio" style="cursor: pointer" name="user_pos" value="client" required><label> a freelance
                                service provider</label>
                        </div>

                        <div class="wrapper fl">
                            <input id="input-email" type="text" placeholder="Work Email" name="email" required>

                            <!-- <div id="gender-select"> -->
                            <label style="color:#555;font-size: 16px;
                        margin-right: 10px;
                        margin-top: 3px;margin-left: 10px;text-align:left;">Gender: </label>
                            <select id="select-gender" required>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <!-- </div> -->
                        </div>

                        <div class="acc-reg-name">
                            <div class="wrapper p-40">
                                <input id="input-firstname" type="text" placeholder="Firstname" required>
                            </div>

                            <div class="wrapper p-40">
                                <input id="input-lastname" type="text" placeholder="Lastname" required>
                            </div>

                            <div class="wrapper p-20">
                                <input id="input-mi" type="text" placeholder="M.I" required maxlength="2">
                            </div>
                        </div>


                        <div class="wrapper">
                            <input id="input-address" type="text" placeholder="Address" required>
                        </div>

                        <div class="wrapper">
                            <input id="input-date" type="text" placeholder="Birthday" onfocus="(this.type='date')" required title="Age must be 18 years old or above.">
                        </div>

                        <div class="wrapper">
                            <input id="input-password" type="password" placeholder="Create password" required title="Username must be 8-10 characters" maxlength="10">
                        </div>

                        <div class="wrapper">
                            <input id="input-password-conf" type="password" placeholder="Confirm password" required title="Username must be 8-10 characters" maxlength="10">
                        </div>

                        <div style="text-align: left;margin-top: 10px;">
                            <input type="checkbox" style="cursor: pointer" required>
                            <label style="font-size: 14px;">Yes, I understand and agree to the
                                <span class="terms" style="color:#14a800; cursor: pointer;text-decoration:underline;">Terms of Service</span>,
                                including the
                                <span class="terms" style="color:#14a800; cursor: pointer;text-decoration:underline;">User Agreement</span> and
                                <span class="terms" style="color:#14a800; cursor: pointer;text-decoration:underline;"> Privacy Policy</span> </label>
                        </div>

                        <button id="continue-email">Create my account</button>
                    </form>
                </div>

            </div>

        </div>
    </div>
    <!--end header-->

    <div id="id01" class="modall" style="display:none;">
        <div class="modal-content">
            <div class="container">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">×</span>
                <p>Invalid email. </p>
                <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Okay</button>
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

    <div id="id08" class="modall" style="display:none;">
        <div class="modal-content" style="max-height:600px;min-width:450px;overflow-x:hidden;overflow-y:scroll;">
            <div class="container">
                <span onclick="document.getElementById('id08').style.display='none'" class="close" title="Close Modal">×</span>
                <p style="font-weight:bold;color:#000;">Generic Terms of Service</p>

                <div style="text-align:left;">
                    <p style="font-size:13px;text-align:left;color:#1d4354;">Please read these terms of service ("terms of service", "terms") carefully before using eHireMo
                     website (“website”, "service") operated by eHireMo Team ("us", 'we", "our").</p>
                    <p style="font-size:13px;font-weight:bold;color:#000;">Conditions of use</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">By using this website, you certify that you have read and reviewed this Agreement and that you
                     agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave the website accordingly. eHireMo 
                     only grants use and access of this website, its products, and its services to those who have accepted its terms.</p>
                    
                    <p style="font-size:13px;font-weight:bold;color:#000;">Privacy policy</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">Before you continue using our website, we advise you to read our privacy policy regarding our 
                    user data collection. It will help you better understand our practices.</p>
                    
                    <p style="font-size:13px;font-weight:bold;color:#000;">Age restriction</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">You must be at least 18 (eighteen) years of age before you can use this website. By using this
                     website, you warrant that you are at least 18 years of age and you may legally adhere to this Agreement. eHireMo assumes no responsibility for liabilities related
                      to age misrepresentation.</p>

                    <p style="font-size:13px;font-weight:bold;color:#000;">Intellectual property</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">You agree that all materials, products, and services provided on this website are the property
                     of eHireMo, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other
                      intellectual property. You also agree that you will not reproduce or redistribute the eHireMo’s intellectual property in any way, including electronic, digital,
                       or new trademark registrations. </br></br> You grant eHireMo a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload 
                       and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.</p>

                    <p style="font-size:13px;font-weight:bold;color:#000;">User accounts</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">As a user of this website, you may be asked to register with us and provide private information.
                     You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. 
                     You are also responsible for all activities that occur under your account or password. </br></br>
                    If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address it accordingly.
                    We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.
                    </p>
                    
                    <p style="font-size:13px;font-weight:bold;color:#000;">Applicable law</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">By visiting this website, you agree that the laws of the Philippines, without regard 
                    to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between eHireMo and you, 
                    or its business partners and associates.</p>

                    <p style="font-size:13px;font-weight:bold;color:#000;">Disputes</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">Any dispute related in any way to your visit to this website or to products 
                    you purchase from us shall be arbitrated by law and you consent to exclusive jurisdiction and venue of such courts.</p>

                    <p style="font-size:13px;font-weight:bold;color:#000;">Indemnification</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">You agree to indemnify eHireMo and its affiliates and hold eHireMo harmless 
                    against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel. </p>

                    <p style="font-size:13px;font-weight:bold;color:#000;">Limitation on liability</p>
                    <p style="font-size:13px;text-align:left;color:#1d4354;margin-top:0px;">eHireMo is not liable for any damages that may occur to you as a result of your misuse of our website. </br></br>
                    eHireMo reserves the right to edit, modify, and change this Agreement any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between [name] and the
                    user, and this supersedes and replaces all prior agreements regarding the use of this website.</p>


                </div>
                

                <!-- <div class="clearfix">
                    <button type="button" onclick="document.getElementById('id08').style.display='none'" class="cancelbtn">Okay</button>
                </div> -->
            </div>
        </div>
    </div>

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

    <!----- loading ------>
    <div id="loading-circle" style="display:none;">
        <lottie-player src="http://localhost/ehiremo/frontend/assets/images/loading.json" background="transparent" speed="2.0" style="width: 220px; height: 220px;" loop autoplay></lottie-player>
    </div>

    <!----- script ------>
    <script src="assets/js/jquery-3.5.1.min.js"></script>
    <script src="assets/js/sign_up_details.js"></script>
    <script>
        // $(document).on('click', '.logo-mobile', function() {
        //     window.location = "index.php";
        // });

        // $(document).on('click', '#continue-email', function() {
        //     var ele = document.getElementsByName('user_pos');
        //     var user;

        //     for (i = 0; i < ele.length; i++) {
        //         if (ele[i].checked) {
        //             user = ele[i].value;
        //         }
        //     }

        //     if (user === "client") {
        //         window.location = "pages/client/client-verification.php";
        //     } else if (user === "freelancer") {
        //         window.location = "pages/talent/talent-verification.php";
        //     } else {
        //         alert("Please choose.")
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