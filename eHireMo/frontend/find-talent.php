<!DOCTYPE html>
<html>

<head>
	<title>Find Freelancers</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!--css-->
	<link rel="stylesheet" type="text/css" href="assets/css/find-talent.css">
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
					<h1>Come and find your people here</h1><br />
					<p>Connect with freelancers gets you, and hire them to take your business to the next level.
					</p>
				</div>

				<div class="col-2">
					
				</div>

			</div>

		</div>
	</div>
	<!--end header-->


	<!--start first row-->
	<div class="small-container" id="find-job">
		<div class="row" style="margin-bottom: 30px; margin-top: 20px; margin-left: 30px;">
			<img src="assets/images/index/logo.png" class="this-image" width="300px">
		</div>
        <h4 class="title">Find Freelancers</h4>
		<div class="row">
			<div class="col-2">
                <h1>The best Filipino freelancers you've ever met</h1><br />
                <!-- <div class="row-2" >
                    <div>
                        <h2><i class="fa fa-star" aria-hidden="true"></i> 4.9/5</h2>
                        <p>client's rating <br/> from 1M+ jobs</p>
                    </div>
                    <div>
                        <h2>8K+</h2>
                        <p>available skills</p>
                    </div>
                </div> -->
                <p>Designers, Developers, Customer Support, Virtual Assistant, 
                    Home Service, Make the right connection and it'll last a lifetime.
                </p>
            </div>

            <div class="col-2">
                <a href=""><h2>Video Editor</h2></a>
                <a href=""><h2>Graphic Designer</h2></a>
                <a href=""><h2>Home Service</h2></a>
                <a href=""><h2>Writing & Transalation</h2></a>
                <a href=""><h2>Health Service</h2></a>
                <a href=""><h2>Deliveries</h2></a>
            </div>
		</div>

        <div class="row" >

            <div class="col-2">
                <h1>Post today, get hired tomorrow</h1><br />
                <p>We've got you covered from idea to delivery.
                Post your job 
                and you'll start getting proposals. Once you've found your expert,
                you can talk timings, availability, and prices before going ahead</p>
                <button id="post-job">Post Job</button>
            </div>

            <div class="col-2">
                <img src="assets/images/find-talent/first-row-1.jpg" width="500"/>
            </div>

		</div>
        
	</div>
	<!--start first row-->


	<!----- youre in a good company ------>
	<div class="employers">
		<div class="small-container">
			<h2 class="title">You’re in good company</h2>
			<div class="row">
                <div class="col-3">
                    <img src="assets/images/find-talent/good-company-1.jpg" width="300"/>
                    <p>Flexera Engineers a Way to Deliver Work 2x
                         Faster and Keeps Security at the Forefront</p>
                </div>
                <div class="col-3">
                    <img src="assets/images/find-talent/good-company-2.png" width="300"/>
                    <p>Singularity University Shows What Working Faster
                         (and Doing it Right) Looks Like</p>
                </div>
                <div class="col-3">
                    <img src="assets/images/find-talent/good-company-3.png" width="300"/> <br />
                    <p style="padding-top: 30px;">How Flexible Freelancer Helps a Fast-Paced Company Improve Productivity</p>
                </div>
            </div>
		</div>
	</div>
	<!----- end youre in a good company ------>


	<!----- top-talents ------>
	<div class="top-talents">
		<div class="small-container">
			<h2 class="title">Freelancers</h2>
			<div class="row">

                <div class="col-3">
					<h1>Video Editors</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>

				<div class="col-3">
					<h1>Graphic Designers</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>

				<div class="col-3">
					<h1>Plumbers</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>
            </div>

			<div class="row">

                <div class="col-3">
					<h1>Home Service</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>

				<div class="col-3">
					<h1>Web Developer</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>

				<div class="col-3">
					<h1>Deliveries</h1><br />
					<p><i class="fa fa-star" aria-hidden="true"></i> 4.2/5 <span style="color:#555;"> average rating</span> </p>
					<div class="image-circle">
						<img src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
						<img style="margin-left: -30px;" src="./pages/client/assets/images/people.png"  />
					</div>
				</div>
            </div>
		</div>
	</div>
	<!----- end top-talents ------>



	<!----- ***************** footer  ***************** ------>
    <?php include 'footer.php'; ?>  


	<!----- script ------>
	<script src="assets/js/jquery-3.5.1.min.js"></script>
	<script src="./assets/js/find-talent.js"></script>
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