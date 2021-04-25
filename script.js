$(document).ready(()=>{
    $(window).scroll(()=>{
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
        $('.menu li').toggleClass("active");

    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Szoftverfejlesztő"],
        typeSpeed: 110,
        backSpeed: 60,   // visszatörlés sebessége minél kisseb annál gyors
        loop: false       // végtelen ciklus?
    });

    var typed = new Typed(".typing-2", {
        strings: ["HTML", "CSS", "JavaScript", "React","Java", "MySQL"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});