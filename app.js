let lastBtn = sessionStorage.getItem("lastBtn");
let lastSect = sessionStorage.getItem("lastSect");
const selArr = ["all-types", "all-themes", "all-materials", "all-years"];
if (lastBtn != null && lastSect != null) {
    document.getElementById(lastBtn).classList.add("active-btn");
    document.getElementById(lastSect).classList.add("active-section");
}
else {
    document.getElementById("home-btn").classList.add("active-btn");
    document.getElementById("home").classList.add("active-section");
    filterSelection("all-types all-themes all-materials all-years");
}

const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const sectrightAbout = document.querySelector('.right-about');
const sectPortfolio = document.querySelector('.portfolio');
const portfolioImages = sectPortfolio.querySelectorAll('.portfolio-item');
const dropdowns = document.querySelectorAll('.dropdown');
const slideshow = document.querySelector('.slider_container');

var controls = document.getElementsByClassName('controls')[0];
var modal = document.getElementById('imgModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var upperbtns = document.getElementsByClassName('upper-btns')[0];

document.onkeydown = checkKey;

//Loop through all dropdown elements
dropdowns.forEach(dropdown => {
    //Get inner elements for each dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    //Add a click event to the select element
    select.addEventListener('click', () => {
        //Add the clicked select styles to the select element
        select.classList.toggle('select-clicked');
        //Add the rotate styles to the caret element
        caret.classList.toggle('caret-rotate');
        //Add the open styles to the menu element
        menu.classList.toggle('menu-open');
    });

    //Loop through all option elements
    options.forEach(option => {
        //Add a click event to the option element
        option.addEventListener('click', () => {
            //Change selected inner text to clicked option inner text
            selected.innerText = option.innerText;
            if(selected.classList.contains("select-type")) {
                selArr[0] = option.id;
                sessionStorage.setItem("lastType", option.id)
                if(option.id == "illustrations" || option.id == "drawings") {
                    document.getElementById("all-themes").click();
                    document.getElementById("all-materials").click();
                    document.getElementById("all-years").click();
                }
            }
            if(selected.classList.contains("select-theme")) {
                selArr[1] = option.id;
                sessionStorage.setItem("lastTheme", option.id)
            }
            if(selected.classList.contains("select-material")) {
                selArr[2] = option.id;
                sessionStorage.setItem("lastMaterial", option.id)
            }
            else if (selected.classList.contains("select-year")) {
                selArr[3] = option.id;
                sessionStorage.setItem("lastYear", option.id)
            }
            //Add the clicked select styles to the select element
            select.classList.remove('select-clicked');
            //Remove the rotate styles from the caret element
            caret.classList.remove('caret-rotate');
            //Remove the open styles from the menu element
            menu.classList.remove('menu-open');
            //Remove active class from all option elements
            options.forEach(option => {
                option.classList.remove('active-drop')
            });
            //Add active class to clicked option element
            option.classList.add('active-drop');
            var filterString = selArr[0] + " " + selArr[1] + " " + selArr[2] + " " + selArr[3];
            filterSelection(filterString);
        });
    });
})

// Improve this (filterSelection, update text all at once)
// Also save dark/light mode
if (lastSect != null) {
    let lastType = sessionStorage.getItem("lastType");
    let lastTheme = sessionStorage.getItem("lastTheme");
    let lastMaterial = sessionStorage.getItem("lastMaterial");
    let lastYear = sessionStorage.getItem("lastYear");
    if (lastType != null) {
        document.getElementById(lastType).click();
        document.getElementById(lastTheme).click();
        document.getElementById(lastMaterial).click();
        document.getElementById(lastYear).click();
    }
    else {
        document.getElementById("all-types").click();
        document.getElementById("all-themes").click();
        document.getElementById("all-materials").click();
        document.getElementById("all-years").click();
        //filterSelection("all-types all-themes all-materials all-years");
    }
}
else{
    document.getElementById("all-types").click();
    document.getElementById("all-themes").click();
    document.getElementById("all-materials").click();
    document.getElementById("all-years").click();
}

function checkKey(e) {
    if (modal.style.display == "block") {
        e = e || window.event;

        if (e.keyCode == '38') {
            // up arrow
        }
        else if (e.keyCode == '40') {
            // down arrow
        }
        else if (e.keyCode == '37') {
           // left arrow
           prevImg();
        }
        else if (e.keyCode == '39') {
           // right arrow
           nextImg();
        }
    }
}

function PageTransitions() {
    //Button click active class
    for(let i=0; i < sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
            sessionStorage.setItem("lastBtn", this.id);
        })
    }
    
    //Sections Active class
    allSections.addEventListener('click',(e) => {
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other btns
            sectBtns.forEach((btn) => {
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            if (e.target.classList.contains('control')){
                sections.forEach((section) => {
                    section.classList.remove('active-section')
                })
    
                const element = document.getElementById(id);
                element.classList.add('active-section');
                sessionStorage.setItem("lastSect", element.id);
                window.scrollTo(0,0);
            }
        }
    })

    //Toggle Theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',() => {
        let element = document.body;
        element.classList.toggle('light-mode');
    })

    //Toggle Language
    const langBtn = document.querySelector('.lang-btn');
    langBtn.addEventListener('click',() => {
    if (document.documentElement.lang === "pl-PL") {
        window.location = 'index.html';
    } 
    else if (document.documentElement.lang === "en") {
        window.location = 'pl-index.html';
    }
    })

    slideshow.addEventListener('click',(e) => {
        const thisElement = e.target;
        const slide = thisElement.closest('.slide');
        if (slide) {
            var id = slide.id;
            if (id) {
                var port_id = id.replace("slide_", "");
                const element = document.getElementById(port_id);
                element.click();
            }
        }
    })

    //Enlarge Image
    sectPortfolio.addEventListener('click',(e) => {
        const thisElement = e.target;
        const portfolioItem = thisElement.closest(".portfolio-item");
        if (portfolioItem){
            const id = portfolioItem.id;
            if(id){
                portfolioImages.forEach((port_img) => {
                    port_img.classList.remove('active-img');
                })
                const element = document.getElementById(id);
                element.classList.add('active-img');

                modal.style.display = "block";
                modalImg.src = element.getElementsByTagName('img')[0].src;
                captionText.innerHTML = element.getElementsByClassName('hover-items')[0].innerHTML;
                controls.style.visibility = "hidden";
                upperbtns.style.visibility = "hidden";
            }
        }
    })
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    controls.style.visibility = "visible";
    upperbtns.style.visibility = "visible";

    }
}

    sectrightAbout.addEventListener('click',(e) => {
        var aboutElement = e.target;
        var aboutItem = aboutElement.closest(".about-item");
        if(aboutItem) {
            document.getElementById("all-materials").click();
            document.getElementById("all-years").click();
            var aboutId = aboutItem.id;
            if(aboutId == "about-illustrations") {
                document.getElementById("all-themes").click();
                document.getElementById("illustrations").click();           
            }
            else {
                document.getElementById("all-types").click();
                if(aboutId == "about-landscapes") {
                    document.getElementById("landscapes").click();
                }
                else if(aboutId == "about-still-life") {
                    document.getElementById("still-life").click();
                }
                else if(aboutId == "about-portraits") {
                    document.getElementById("portraits").click();
                }
                else if(aboutId == "about-religious") {
                    document.getElementById("religious").click();
                }
                else if(aboutId == "about-studies") {
                    document.getElementById("studies").click();
                }
            }
            document.getElementById("portfolio-btn").click();
        }
    })

function prevImg(){
    var currentImg = document.getElementsByClassName("active-img")[0];
    var allImgs = document.getElementsByClassName("portfolio-item show");

    for(let i=0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('active-img')) {
            var prevImgNum = i-1;
            if (prevImgNum < 0) {
                prevImgNum = allImgs.length - 1;
            }
            setNewImg(currentImg, allImgs, prevImgNum)
            break;
        }
    }
}

function nextImg(){
    var currentImg = document.getElementsByClassName("active-img")[0];
    var allImgs = document.getElementsByClassName("portfolio-item show");
    for(let i=0; i < allImgs.length; i++) {
        if (allImgs[i].classList.contains('active-img')) {
            var nextImgNum = i+1;
            if (nextImgNum >= allImgs.length) {
                nextImgNum = 0;
            }
            setNewImg(currentImg, allImgs, nextImgNum)
            break;
        }
    }
}

function setNewImg(currImg, allImgs, newImgNum) {
    currImg.classList.remove('active-img');
    newImg = allImgs[newImgNum];
    newImg.classList.add('active-img');
    modalImg.src = newImg.getElementsByTagName('img')[0].src;
    captionText.innerHTML = newImg.getElementsByClassName('hover-items')[0].innerHTML;
}

function filterSelection(c) {
    var x, i, j, arr1;
    x = document.getElementsByClassName("portfolio-item");
    arr1 = c.split(" ");
    // Add the "show" class to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");

        if(c.includes("all-types all-themes all-materials all-years")) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-themes") && c.includes("all-materials") && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-themes") && c.includes("all-years") && x[i].classList.contains(arr1[2])) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-materials") && c.includes("all-years") && x[i].classList.contains(arr1[1])) addClass(x[i], "show");
        else if (c.includes("all-themes") && c.includes("all-materials") && c.includes("all-years") && x[i].classList.contains(arr1[0])) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-themes") && x[i].classList.contains(arr1[2]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-materials") && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-types") && c.includes("all-years") && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[2])) addClass(x[i], "show");
        else if (c.includes("all-themes") && c.includes("all-materials") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-themes") && c.includes("all-years") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[2])) addClass(x[i], "show");
        else if (c.includes("all-materials") && c.includes("all-years") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[1])) addClass(x[i], "show");
        else if (c.includes("all-types") && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[2]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-themes") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[2]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-materials") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
        else if (c.includes("all-years") && x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[2])) addClass(x[i], "show");
        else if (x[i].classList.contains(arr1[0]) && x[i].classList.contains(arr1[1]) && x[i].classList.contains(arr1[2]) && x[i].classList.contains(arr1[3])) addClass(x[i], "show");
    }
}

// Show filtered elements
function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while(arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

PageTransitions();
