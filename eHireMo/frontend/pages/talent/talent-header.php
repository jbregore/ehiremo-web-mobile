
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
                    display: block;" href="./jobs/all-job-post.php">Browse Jobs</a>
                        <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="./jobs/saved-jobs.php">Saved Jobs</a>
                        <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="./jobs/applied-jobs.php">Applied Jobs</a>
                    <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="./jobs/my-jobs.php">My Jobs</a>
                    </div>
                </div>
            </li>



            <li>
                <div class="dropdown-talent">
                    <a href="#" title="">Freelancers</a>
                    <div class="dropdown-content-talent">
                        <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="./talents/browse-talents.php">Browse Talents</a>
                    </div>
                </div>
            </li>
            <li><a href="messages.php" id="message-notif">Messages
            <span style="position: absolute;top: -8px;right: -5px;padding: 2px 5px;border-radius: 50%;
                background-color: red;color: white;font-size:12px;" id="message-count"></span>
            </a></li>
            <li>
                
                <div class="dropdown-notif">
                <a href="notification.php" title="" id="notif-bell">
                    <img alt="" src="assets/images/bell.png" width="22" style="margin-bottom: -4px;" />
                <span style="position: absolute;top: -8px;right: 5px;padding: 2px 5px;border-radius: 50%;
                    background-color: red;
                    color: white;
                    font-size:12px;" id="notif-count"></span>

                </a>

                    <div class="dropdown-content-notif" id="dd-content-notif">
                        

                    </div>
                </div>
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
                        margin-bottom: -10px;height:32px;width:32px;object-fit:cover;" />
                    </a>
                    <div class="dropdown-content-profile">
                        <a id="web-name" style="color:#555;font-size: 14px;padding: 8px 10px;
                            text-decoration: none; display: block;" href=""></a>
                        <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="profile.php">Profile</a>
                        <a style="color:#555;font-size: 14px;padding: 8px 10px;
                    text-decoration: none;
                    display: block;" href="settings.php">Settings</a>
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
            <img alt="" id="mobile-profile-picture" src="assets/images/people.png" width="52"
            style="border-radius:50%; width:52px;height:52px;object-fit:cover;" />
            <div style="display:flex;flex-direction: column;margin-left: 10px;">
                <p id="mobile-name" style="font-size: 15px;color:#29e411;margin-top: 8px;">
                </p>
                <p style="font-size: 13px;color:#fff;">Freelancer</p>
            </div>
        </div>

        <p id="drop-jobs" style="font-size: 16px;margin-bottom: 16px;
    padding-left: 32px;padding-right: 32px;">Jobs
            <img alt="" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
        <div id="jobs-mobile-dropdown">
            <a href="./jobs/all-job-post.php">Browse Jobs</a>
            <a href="./jobs/saved-jobs.php">Saved Jobs</a>
            <a href="./jobs/applied-jobs.php">Applied Jobs</a>
            <a href="./jobs/my-jobs.php">My Jobs</a>
        </div>
        </p>
        <p id="drop-talent" style="font-size: 16px;margin-bottom: 16px;
    padding-left: 32px;padding-right: 32px;">Freelancers
            <img alt="" src="assets/images/dropdown-icon.png" width="24" style="float:right" />
        <div id="talent-mobile-dropdown">
            <a href="./talents/browse-talents.php">Browse Freelancers</a>
        </div>
        </p>


        <a href="messages.php">Messages
            <img alt="" src="assets/images/message.png" width="24" style="float:right" />
        </a>
        <a href="notification.php" title="">Notifications
            <img alt="" src="assets/images/bell.png" width="24" style="float:right" />
        </a>
        <a href="#" title="">Help
            <img alt="" src="assets/images/help.png" width="24" style="float:right" />
        </a>
        <a href="profile.php">Profile
            <img alt="" src="assets/images/profile.png" width="24" style="float:right" />
        </a>
        <a href="settings.php">Settings
            <img alt="" src="assets/images/settings.png" width="24" style="float:right" />
        </a>
        <a class="logout">Logout
            <img alt="" src="assets/images/logout.png" width="24" style="float:right" />
        </a>
    </div>

</div>