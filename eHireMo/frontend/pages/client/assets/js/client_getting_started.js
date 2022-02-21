window.onload = function() {
    //load session of user
    var xhttp = new XMLHttpRequest();
    xhttp.open(
        "GET",
        "../../../backend/api/users/user_fetch_self.php"
    );
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let results = JSON.parse(this.response);
            $("#web-name").html(results.fname);
            $("#mobile-name").html(results.name);
            // $("#input-firstname").val(results.name);
            // $("#input-address").val(results.address);
            // $("#input-date").val(results.birthday);

            console.log(results);
        } else if (this.readyState == 4 && this.status == 500) {

        } else if (this.readyState == 4 && this.status == 404) {}
    };

    // Ex. Looking for Massage Therapist. 
    var typed = new Typed('#input-headline', {
        strings: [
            'Ex. Looking for Massage Therapist.',
            'Ex. Looking for Barber.',
            'Ex. Looking for Web Developer.'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed1 = new Typed('#input-services', {
        strings: [
            'Ex. Video Editor',
            'Ex. Sales Agent',
            'Ex. Make Up Artist',
            'Ex. Delivery Rider',
            'Ex. Cleaners',
            'Ex. Repairs'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed2 = new Typed('#input-hrate', {
        strings: [
            'Ex. Php 100/hr',
            'Ex. Php 200/hr',
            'Ex. Php 300/hr'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed3 = new Typed('#input-frate', {
        strings: [
            'Ex. Php 10,000',
            'Ex. Php 15,000',
            'Ex. Php 20,000'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed4 = new Typed('#input-age', {
        strings: [
            'Ex. 18-25 years old',
            'Ex. 25-30 years old',
            'Ex. 30-40 years old'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed4 = new Typed('#input-location', {
        strings: [
            'Ex. Poblacion Baliuag Bulacan',
            'Ex. Pulilan Bulacan',
            'Ex. Bustos Bulacan'
        ],
        typeSpeed: 40,
        backSpeed: 40,
        loop: true // Default value
    });

    var typed5 = new Typed('#job-des', {
        strings: [
            `Ex. Hello! I'm Juan Dela Cruz and I am looking for a massage therapist near my house at Poblacion Baliuag Bulacan. I am recently having back ache and I can't take it anymore. I need a therapist ASAP. Don't hesitate to message me.`
        ],
        showCursor: false,
        typeSpeed: 40,
        backSpeed: 40,
        loop: true, // Default value
    });

    $(document).on('click', '#drop-talent', function() {
        if ($("#talent-mobile-dropdown").css("height") == '20px') {
            $("#talent-mobile-dropdown").css({
                height: "125px",
                display: "block"
            });
        } else {
            $("#talent-mobile-dropdown").css({
                height: "20px",
                display: "none",
            });
        }
    });

    $(document).on('click', '#drop-jobs', function() {
        if ($("#jobs-mobile-dropdown").css("height") == '20px') {
            $("#jobs-mobile-dropdown").css({
                height: "125px",
                display: "block",
            });
        } else {
            $("#jobs-mobile-dropdown").css({
                height: "20px",
                display: "none",
            });
        }
    });

    $(document).on('click', '#post-job', function() {
        window.location = "jobs/all-job-post.php";
    });

    $(document).on('click', '.logout', function(e) {
        var xhttp = new XMLHttpRequest();
        xhttp.open(
            "GET",
            "../../../backend/api/users/logout.php"
        );
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let results = JSON.parse(this.response);
                console.log(results);
                window.location.href = "../../../frontend/";
            } else if (this.readyState == 4 && this.status == 500) {

            } else if (this.readyState == 4 && this.status == 404) {}
        };
    })

}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    if (n == 1) {
        $(".prev").attr("style", "display:none;");
    } else {
        $(".prev").attr("style", "display:block;");
    }

    if (n == 5) {
        $(".next").attr("style", "display:none;");
    } else {
        $(".next").attr("style", "display:block;");
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
}

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}