const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const sectPortfolio = document.querySelector('.portfolio');
const portfolioImages = sectPortfolio.querySelectorAll('.portfolio-item');

var controls = document.getElementsByClassName('controls')[0];
var modal = document.getElementById('imgModal');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

document.onkeydown = checkKey;

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
        })
    }
    

    // for(let i=0; i < portfolioImages.length; i++) {
    //     portfolioImages[i].addEventListener('click', function(){
    //         let currentImg = document.querySelectorAll('.active-img');
    //         if(currentImg.length > 0){
    //             currentImg[0].className = currentImg[0].className.replace('active-img', '');
    //         }
    //         this.className += ' active-img';
    //     })
    // }

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
            }
        }
    })

    //Toggle Theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',() => {
        let element = document.body;
        element.classList.toggle('light-mode');
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
            }
        }
    })

    // Get the modal

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    // var img = document.querySelectorAll('.active-img');
    // img.onclick = function(){
    //     modal.style.display = "block";
    //     modalImg.src = this.src;
    //     modalImg.alt = "Hello";
    //     captionText.innerHTML = "Hello";
    // }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    controls.style.visibility = "visible";
    }

    // window.onclick = function() {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //         controls.style.visibility = "visible";
    //     }
    // }

    // modal.onclick = function() {
    //     modal.style.display = "none";
    //     controls.style.visibility = "visible";
    // }
}

function prevImg(){
    var currentImg = document.getElementsByClassName("active-img")[0];
    var allImgs = document.getElementsByClassName("portfolio-item");
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
    var allImgs = document.getElementsByClassName("portfolio-item");
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

PageTransitions();