// Interactivity goes here later: mobile nav toggle, gallery lightbox,
// before/after slider, contact form handling, etc.

AOS.init();


// selecting images
const galleryImages = document.querySelectorAll(".gallery-card img");
const lightboxDiv = document.querySelector("#lightbox");

// loop over the images | .forEach is just an easier for loop
galleryImages.forEach(function(img) {
    
    img.addEventListener("click", function(){

    //set lightbox image to link of the image clicked    
    const lightboxImg = document.querySelector("#lightbox-img");
    lightboxImg.src = img.src

    //make the lightbox active
    lightboxDiv.classList.add("active");

    });
    });

    // Close Button functionality | grabbing the lightbox close button, then removing its active status
    const closeButton = document.querySelector(".lightbox-close");
    closeButton.addEventListener("click", function(){
        lightboxDiv.classList.remove("active");

    });


    // mobile nav

    const navToggle = document.querySelector(".nav-toggle");
    const navElement = document.querySelector("nav");

    navToggle.addEventListener("click",function(){
        navElement.classList.toggle("nav-open")
    });