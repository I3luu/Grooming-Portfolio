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


    // before / after sliders | loop so this works no matter how many .ba-slider blocks are on the page
    const baSliders = document.querySelectorAll(".ba-slider");

    baSliders.forEach(function(slider) {
        const baRange = slider.querySelector(".ba-range");
        const baImgBefore = slider.querySelector(".ba-img-before");
        const baHandle = slider.querySelector(".ba-handle");

        // runs every time this slider's range input changes, either by dragging or arrow keys
        function updateBaSlider() {
            const value = baRange.value; // a number from 0 to 100

            // clip-path: inset(top right bottom left) | we only ever change the right side,
            // so a higher value means less of the right side is clipped away = more "before" shown
            baImgBefore.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

            // move the divider handle to line up with the clip edge
            baHandle.style.left = value + "%";
        }

        baRange.addEventListener("input", updateBaSlider);
        updateBaSlider(); // set the starting position on page load
    });


    // mobile nav

    const navToggle = document.querySelector(".nav-toggle");
    const navElement = document.querySelector("nav");

    navToggle.addEventListener("click",function(){
        navElement.classList.toggle("nav-open")
    });