/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
window.addEventListener('DOMContentLoaded', (event) => {


    /**
     * Define Global Variables
     * 
    */

    const navList = document.getElementById('navbar__list');
    const sectionlist = document.querySelectorAll('section[data-nav]');

    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */
    // set in navbar selected section as active 
    function activeli(id) {
        let listLi = document.querySelectorAll(`ul li[data-li]`);
        //let selectedLi=document.querySelector(`ul li[data-li=${item.id}]`);
        listLi.forEach((i) => {
            if (i.getAttribute('data-li') === id) {
                i.classList.add('activeLi');

            } else if (i.classList.contains('activeLi')) {
                i.classList.remove('activeLi')
            }

        });
    }

    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    // build the nav
    function buildNav() {
        let fregment = document.createDocumentFragment();
        sectionlist.forEach((item) => {

            let sectionName = item.getAttribute('data-nav');
            let lielement = document.createElement('li');
            lielement.setAttribute('data-li', item.id);

            let aElement = document.createElement('a');
            // aElement.setAttribute("href","#");

            aElement.addEventListener('click', function (event) {
                event.preventDefault();
                let elementdata = this.parentElement.getAttribute('data-li');

                let selectedSection = document.querySelector(`[id=${elementdata}]`);
                scrollfun(selectedSection);
            });

            aElement.textContent = sectionName;
            lielement.appendChild(aElement);
            fregment.appendChild(lielement);

        });
        navList.appendChild(fregment);
    }

    // Add class 'active' to section when near top of viewport
    function activeClass(section) {
        let elementLocation = section.getBoundingClientRect().top;
        if (elementLocation <= 400 && elementLocation >= 0) {
            section.classList.add('active');
            activeli(section.id);
        } else if (section.classList.contains('active')) {
            section.classList.remove('active');
        }
    }

    // Scroll to anchor ID using scrollTO event
    function scrollfun(section) {
        let elementLocation = section.getBoundingClientRect().top;
        console.log(elementLocation);
        window.scrollBy({
            top: elementLocation,
            behavior: 'smooth'
        });
    }

    /**
     * End Main Functions
     * Begin Events
     * 
    */

    // Build menu 
    buildNav();
 
    // Set sections as active
    document.addEventListener('scroll', () => {
        sectionlist.forEach((item) => {
            activeClass(item);
        });
    });

});