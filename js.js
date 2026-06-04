// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SERVICES ACCORDION ==========
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        if (header) {
            header.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });
    
    // Open first service item by default
    if (serviceItems.length > 0) {
        serviceItems[0].classList.add('active');
    }
    
    // ========== DOCTORS SWIPER SLIDER ==========
    const doctorsSwiper = new Swiper('.doctors-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: { 
            el: '.swiper-pagination', 
            clickable: true 
        },
        breakpoints: { 
            640: { 
                slidesPerView: 2 
            }, 
            1024: { 
                slidesPerView: 3 
            } 
        }
    });
    
    // ========== BEFORE & AFTER SWIPER SLIDER ==========
    const baSwiper = new Swiper('.swiper-ba', {
        navigation: { 
            nextEl: '.swiper-button-next', 
            prevEl: '.swiper-button-prev' 
        },
        loop: true,
        spaceBetween: 20,
    });
    
    // ========== COUNTER ANIMATION ==========
    const counters = document.querySelectorAll('.counter-number');
    
    const animateNumbers = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const current = parseInt(counter.innerText);
            if (current < target) {
                let step = Math.ceil(target / 50);
                let newVal = Math.min(current + step, target);
                counter.innerText = newVal;
            }
        });
    };
    
    let counted = false;
    const statsSection = document.querySelector('.stats-row');
    
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    const interval = setInterval(() => {
                        let allFinished = true;
                        counters.forEach(c => {
                            if (parseInt(c.innerText) < parseInt(c.getAttribute('data-target'))) {
                                allFinished = false;
                            }
                        });
                        if (allFinished) clearInterval(interval);
                        animateNumbers();
                    }, 50);
                }
            });
        }, { threshold: 0.4 });
        
        observer.observe(statsSection);
    }
    
    // ========== MODAL HANDLING ==========
    const modal = document.getElementById('myModal');
    
    const openModal = () => {
        if (modal) modal.style.display = 'flex';
    };
    
    const closeModal = () => {
        if (modal) modal.style.display = 'none';
    };
    
    // Open modal buttons
    const openModalBtn = document.getElementById('openModalBtn');
    const heroBtn = document.getElementById('heroBtn');
    const ctaBtn = document.getElementById('ctaBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (heroBtn) heroBtn.addEventListener('click', openModal);
    if (ctaBtn) ctaBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
    
    // ========== SMOOTH SCROLL FOR NAVIGATION ==========
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== ADD HOVER EFFECT LOGGING (optional) ==========
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Just for visual effect, CSS handles the animation
            console.log('Card hover effect triggered');
        });
    });
    
    // ========== FORM SUBMISSION HANDLER (modal form) ==========
    const modalFormButton = document.getElementById('closeModalBtn');
    if (modalFormButton) {
        modalFormButton.addEventListener('click', function(e) {
            const modalInputs = modal.querySelectorAll('input');
            let hasValue = false;
            modalInputs.forEach(input => {
                if (input.value.trim() !== '') {
                    hasValue = true;
                }
            });
            
            if (hasValue) {
                alert('Thank you! Our manager will contact you shortly.');
                modalInputs.forEach(input => input.value = '');
                closeModal();
            } else {
                alert('Please fill in your name and phone number.');
            }
        });
    }
    
    // ========== GET DIRECTIONS BUTTON ==========
    const directionsBtn = document.querySelector('.btn-outline');
    if (directionsBtn && directionsBtn.innerText === 'Get directions') {
        directionsBtn.addEventListener('click', () => {
            window.open('https://maps.google.com/?q=221B+Baker+Street+London', '_blank');
        });
    }
    
    console.log('DentaSmile Pro website initialized successfully!');
});