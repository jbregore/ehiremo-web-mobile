
<?php
session_start();
$_SESSION['last_page'] = "http://" . $_SERVER["SERVER_NAME"] . $_SERVER["PHP_SELF"];
?>
<!DOCTYPE html>
<html>

<head>
	<title>eHireMo</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!--css-->
	<link rel="stylesheet" type="text/css" href="assets/css/style.css">
	</link>

    <!-- icon -->
	<link rel="shortcut icon" href="assets/images/index/my-icon.ico">

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
                            <a href="sign-up-details.php" id="sign-up" style="border-left: 1px solid #fff;" >Sign Up</a>
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

			<div class="row">

				<div class="col-2">
					<h1>Unemployment is not a problem</h1><br />
					<p>Engage the network of trusted independent professionals to unlock
						the full potential of your needs.
					</p>
				</div>

				<div class="col-2">
					
				</div>

			</div>

		</div>
	</div>
	<!--end header-->


	<!--start find-job-->
	<div class="small-container" id="find-job">
		<div class="row" style="margin-bottom: 30px; margin-top: 20px; margin-left: 30px;">
			<img src="assets/images/index/logo.png" class="this-image" width="300px">
		</div>
		<h2 class="title" style="margin-top: -120px;">Common Services</h2>
		<div class="row">
			<div class="col-3">
				<button>Video Editor</button><br>
				<button>Sales Agent</button><br>
				<button>Make Up Artist</button><br>
				<button>Delivery Rider</button><br>
			</div>
			<div class="col-3">
				<button>Cleaners</button><br>
				<button>Repairs</button><br>
				<button>Plumbing</button><br>
				<button>Web Developer</button><br>
			</div>
			<div class="col-3">
				<button>Home Service</button><br>
				<button>Online Tutor</button><br>
				<button>Graphic Designer</button><br>
				<button>Mobile Developer</button><br>
			</div>
		</div>

	</div>
	<!--start find-job-->


	<!----- categories ------>
	<div class="categories" id="my-categories">
		<div class="small-container">
			<h2 class="title">Services</h2>

			<div class="row" id="service-lists">
				
				
			</div>



		</div>
	</div>
	<!----- end categories ------>


	<!----- top clients ------>
	<!-- <div class="employers">
		<div class="small-container">
			<h2 class="title">Our Top Clients</h2>
			<div class="row">
				
				<div class="col-4">
					<img src="assets/images/index/categories-1.jpg">
					<h4>Mcdo</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/categories-2.jpg">
					<h4>Jollibee</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/categories-3.jpg">
					<h4>Accenture</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/employer-1.jpg">
					<h4>Deltek</h4>
				</div>
			</div>

			<div class="row">
				<div class="col-4">
					<img src="assets/images/index/employer-5.jpg">
					<h4>San Miguel</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/employer-6.png">
					<h4>Shopee</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/employer-7.png">
					<h4>Lazada</h4>
				</div>

				<div class="col-4">
					<img src="assets/images/index/employer-8.jpg">
					<h4>SM Supermall</h4>
				</div>
			</div>
		</div>
	</div> -->
	<!----- end top clients ------>


	<!----- about-us ------>
	<div class="about-us" id="about-us">
		<div class="small-container">
			<h2 class="title">About Us</h2>
			<div class="row">
				<div class="col-2">
					<div class="row">
						<div class="col-1">
							<h2>Mission</h2>
							<p>
								eHireMo exist to produce professional
								workers that will contribute to the community,
								 economy and their career
								and to avoid sluggish process of job
								application and to give easy access for part timers.
							</p>
						</div>

						<div class="col-1">
							<h2>Vission</h2>
							<p>
								eHireMo is a job and service marketplace that allows
								applicants to find their qualified or
								part time job easily. And also for the clients 
								who are easily to find the service envisioned for.
							</p>
						</div>

						<div class="col-1">
							<h2>How it Works</h2>
							<p>
								It works to help people easily find a job by allowing
								them to communicate and view their profile
								or previous appointments.
							</p>
						</div>
					</div>
				</div>
				<div class="col-2">
					<img src="assets/images/index/about.jpg" class="this-image" width="900px">
				</div>
			</div>
		</div>
	</div>
	<!--end about-us -->


	<!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>  

	<!----- script ------>
	<script src="assets/js/jquery-3.5.1.min.js"></script>
	<script src="./assets/js/index.js"></script>
    <script>

		// $(document).on('click', '.logo-mobile', function() {
		// 	window.location = "index.php";
		// });

		// $(document).on('click', '#login-mobile', function() {
		// 	window.location = "login.php";
		// });

		// $(document).on('click', '#signup-mobile', function() {
		// 	window.location = "sign-up-details.php";
		// });


		// function openNav() {
		// 	document.getElementById("mySidenav").style.width = "100%";
		// }

		// function closeNav() {
		// 	document.getElementById("mySidenav").style.width = "0";
		// }

    </script>

</body>

</html>