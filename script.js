window.addEventListener("load",()=>{
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    // Page Loader
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
    document.querySelector(".page-loader").style.display="none";
        
    }, 600);
});

// Toggle Navbar
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click",()=>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}
// Active Section
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        // activate the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() => {
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        }, 500);
    }
});
// About Tabs
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");
tabsContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});


// Portfolio Item Details Popup
document.addEventListener("click",(e) =>{
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
})
function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click",togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
})

function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src = 
    portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = 
    portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = 
    portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}




// Email JS
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactSubject = document.getElementById('contact-subject'),
    contactDesc = document.getElementById('contact-desc')

const sendEmail = (e) => {
    e.preventDefault()
    
    if(contactName.value === '' || contactEmail.value === '' || contactSubject.value === '' || contactDesc.value === ''){
        contactMessage.textContent='**All fields are required**'

        setTimeout(() => {
            contactMessage.textContent=''
        }, 5000);
        contactForm.reset()
    }else{

        emailjs.sendForm('service_zjjfa6f','template_jqqrpuw','#contact-form','e6prl5yf-OKTCVklq')
        .then(() =>{
            contactMessage.textContent = 'Message sent successfully'
    
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000);
    
            contactForm.reset();
        }, () =>{
            contactMessage.textContent = 'Message not sent (Service Error)'
        })
    }

}
contactForm.addEventListener('submit',sendEmail)

