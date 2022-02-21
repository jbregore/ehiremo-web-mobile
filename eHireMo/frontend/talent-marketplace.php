<!DOCTYPE html>
<html lang="en">

<head>
    <title>Talent Marketplace</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!--css-->
    <link rel="stylesheet" type="text/css" href="./pages/client/talents/assets/css/browse-talents.css">
    </link>
    <link rel="stylesheet" type="text/css" href="assets/css/talent-marketplace.css">
    </link>
    

    <!-- icon -->
    <link rel="shortcut icon" href="./assets/images/index/my-icon.ico">

    <!--fonts-->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

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

                <nav>
                    <ul id="menuItems">
                        <li><a href="find-talent.php">Find Freelancers</a></li>
                        <li><a href="find-work.php">Find Work</a></li>
                        <li><a href="career-advice.php">Career Advice</a></li>
                    </ul>
                </nav>

                <div class="menuItemsRight">
                    <ul>
                        <li><a href="login.php">Login</a></li>
                        <li>
                            <a href="sign-up-details.php" id="sign-up" style="border-left: 1px solid #fff;">Sign Up</a>
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

            <h2 class="title" style="">Newest Freelancers</h2>

            <div class="row" id="talent-lists">
                
            </div>

        </div>
    </div>
    <!--end header-->

    <!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>

    <!----- script ------>
    <script src="./assets/js/jquery-3.5.1.min.js"></script>
    <script src="./assets/js/talent_marketplace.js"></script>


</body>

</html>