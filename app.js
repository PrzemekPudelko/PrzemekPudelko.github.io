const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const sectPortfolio = document.querySelector('.portfolio');
const portfolioImages = sectPortfolio.querySelectorAll('.portfolio-item');

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
                //e.target.classList.add('active-img');
                //portfolioItem.classList.add('active-img');
            }
        }
    })
}

PageTransitions();