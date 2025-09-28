// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form-new');
const backToTopBtn = document.querySelector('.back-to-top-btn');
const horizontalShowcase = document.querySelector('.horizontal-showcase');
const demoItems = document.querySelectorAll('.demo-item');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
});

// Close menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
        
        // Reset hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Smooth scrolling only for hash links; allow normal navigation for page links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });

    // Show/hide back to top button
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.transform = 'translateY(0)';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
        }
    }
});

// Back to top functionality
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Horizontal Scroll Controls
const scrollControls = document.querySelectorAll('.scroll-btn');
scrollControls.forEach(btn => {
    btn.addEventListener('click', () => {
        const direction = btn.classList.contains('next') ? 1 : -1;
        const scrollAmount = 400;
        
        if (horizontalShowcase) {
            horizontalShowcase.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    });
});

// Demo Items Click Handler
demoItems.forEach(item => {
    item.addEventListener('click', () => {
        const page = item.getAttribute('data-page');
        console.log(`Navigating to: ${page}`);
        // Here you could implement actual page navigation
        // For now, just add a visual feedback
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    });
});

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (!formObject.name || !formObject.email || !formObject.message || !formObject.project) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formObject.email)) {
            showNotification('Veuillez entrer une adresse email valide.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Votre message a été envoyé avec succès!', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Append to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.demo-item, .showcase-item-white, .film-card, .horizontal-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Parallax effect for welcome screen
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const videoBackground = document.querySelector('.video-background');
    
    if (videoBackground) {
        videoBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Add smooth reveal animations to sections
const revealSections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

revealSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Auto-play video when in view
const video = document.querySelector('#bg-video');
if (video) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Video autoplay failed:', e));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(video);
}

// Portfolio Gallery Navigation avec Loop Infini
document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.gallery-container');
    
    galleries.forEach((gallery, galleryIndex) => {
        const track = gallery.querySelector('.gallery-track');
        const slides = gallery.querySelectorAll('.gallery-slide');
        const prevBtn = gallery.querySelector('.gallery-btn.prev');
        const nextBtn = gallery.querySelector('.gallery-btn.next');
        const indicators = gallery.querySelectorAll('.indicator');
        
        if (!track || !slides.length) {
            return;
        }
        
        const totalSlides = slides.length;
        let currentIndex = 0;
        let autoScrollInterval;
        let isAutoScrollActive = false;
        let isTransitioning = false;
        
        // Dupliquer les slides pour l'effet loop infini
        function setupInfiniteLoop() {
            // Cloner la première slide et l'ajouter à la fin
            const firstSlideClone = slides[0].cloneNode(true);
            track.appendChild(firstSlideClone);
            
            // Cloner la dernière slide et l'ajouter au début
            const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
            track.insertBefore(lastSlideClone, slides[0]);
            
            // Ajuster la position initiale pour commencer sur la vraie première slide
            currentIndex = 1;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        setupInfiniteLoop();
        
        function updateGallery(instant = false) {
            if (isTransitioning) return;

            const translateX = -currentIndex * 100;

            if (instant) {
                track.style.transition = 'none';
                track.style.transform = `translateX(${translateX}%)`;
                // Force reflow
                track.offsetHeight;
                track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            } else {
                track.style.transform = `translateX(${translateX}%)`;
            }

            // Update active slide class for visual focus/dimming
            const allSlides = track.querySelectorAll('.gallery-slide');
            allSlides.forEach(s => s.classList.remove('active'));
            if (allSlides[currentIndex]) {
                allSlides[currentIndex].classList.add('active');
            }

            // Update indicators (basé sur l'index réel, pas les clones)
            const realIndex = currentIndex === 0 ? totalSlides - 1 :
                             currentIndex === totalSlides + 1 ? 0 :
                             currentIndex - 1;

            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === realIndex);
            });
        }
        
        function nextSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex++;
            updateGallery();
            
            // Si on est sur le clone de la première slide (après la dernière vraie)
            if (currentIndex === totalSlides + 1) {
                setTimeout(() => {
                    currentIndex = 1; // Retour à la vraie première slide
                    updateGallery(true);
                    isTransitioning = false;
                }, 600);
            } else {
                setTimeout(() => {
                    isTransitioning = false;
                }, 600);
            }
        }
        
        function prevSlide() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex--;
            updateGallery();
            
            // Si on est sur le clone de la dernière slide (avant la première vraie)
            if (currentIndex === 0) {
                setTimeout(() => {
                    currentIndex = totalSlides; // Aller à la vraie dernière slide
                    updateGallery(true);
                    isTransitioning = false;
                }, 600);
            } else {
                setTimeout(() => {
                    isTransitioning = false;
                }, 600);
            }
        }
        
        function goToSlide(index) {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentIndex = index + 1; // +1 car on a un clone au début
            updateGallery();
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        function startAutoScroll() {
            if (!isAutoScrollActive && totalSlides > 1) {
                isAutoScrollActive = true;
                autoScrollInterval = setInterval(() => {
                    if (isAutoScrollActive) {
                        nextSlide();
                    }
                }, 3000);
            }
        }
        
        function stopAutoScroll() {
            if (isAutoScrollActive) {
                isAutoScrollActive = false;
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }
        
        // Navigation button events
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                stopAutoScroll();
                nextSlide();
                setTimeout(startAutoScroll, 5000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                stopAutoScroll();
                prevSlide();
                setTimeout(startAutoScroll, 5000);
            });
        }
        
        // Indicator click events
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    stopAutoScroll();
                    goToSlide(index);
                    setTimeout(startAutoScroll, 5000);
                });
            });
        }
        
        // Pause auto-scroll on hover
        gallery.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });
        
        // Resume auto-scroll when leaving gallery
        gallery.addEventListener('mouseleave', () => {
            setTimeout(startAutoScroll, 1000);
        });
        
        // Keyboard navigation
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopAutoScroll();
                prevSlide();
                setTimeout(startAutoScroll, 6000);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopAutoScroll();
                nextSlide();
                setTimeout(startAutoScroll, 6000);
            }
        });
        
        // Make gallery focusable for keyboard navigation
        gallery.setAttribute('tabindex', '0');
        
        // Initialize gallery
        updateGallery();
        
        // Start auto-scroll immediately
        setTimeout(() => {
            startAutoScroll();
        }, 1000 + (galleryIndex * 500));
        
        // Pause auto-scroll when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoScroll();
            } else if (!isAutoScrollActive) {
                setTimeout(startAutoScroll, 1000);
            }
        });
        
        // Resume auto-scroll when scrolling back to gallery
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isAutoScrollActive) {
                    setTimeout(startAutoScroll, 1000);
                } else if (!entry.isIntersecting && isAutoScrollActive) {
                    stopAutoScroll();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(gallery);
    });
});

// ========================================
// NOUVEAU SLIDER BASÉ SUR L'EXEMPLE FOURNI
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser tous les sliders
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach((container, containerIndex) => {
        initializeSlider(container, containerIndex);
    });
});

function initializeSlider(container, containerIndex) {
    const sliderWrapper = container.querySelector('.slider-wrapper');
    const slides = container.querySelectorAll('.slide');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    
    if (!sliderWrapper || !slides.length || !prevBtn || !nextBtn) {
        console.warn('Éléments manquants pour le slider', containerIndex);
        return;
    }
    
    const originalSlideCount = slides.length;
    let currentIndex = 0;
    let autoScrollInterval;
    let isAutoScrollActive = false;
    let isTransitioning = false;
    
    // Dupliquer les slides pour créer un loop infini
    function setupInfiniteLoop() {
        // Cloner toutes les slides et les ajouter à la fin
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.remove('active'); // Retirer la classe active des clones
            sliderWrapper.appendChild(clone);
        });
        
        // Cloner toutes les slides et les ajouter au début
        for (let i = slides.length - 1; i >= 0; i--) {
            const clone = slides[i].cloneNode(true);
            clone.classList.remove('active'); // Retirer la classe active des clones
            sliderWrapper.insertBefore(clone, sliderWrapper.firstChild);
        }
        
        // Démarrer au milieu (sur les vraies slides)
        currentIndex = originalSlideCount;
        
        // Activer la première vraie slide
        const allSlides = sliderWrapper.querySelectorAll('.slide');
        allSlides.forEach(slide => slide.classList.remove('active'));
        allSlides[currentIndex].classList.add('active');
    }
    
    setupInfiniteLoop();

    function updateSliderPosition() {
        if (isTransitioning) return;
        
        const allSlides = sliderWrapper.querySelectorAll('.slide');
        const slideWidth = allSlides[0].offsetWidth;
        const activeSlide = allSlides[currentIndex];
        const activeSlideWidth = activeSlide.offsetWidth;

        // Calcule la position pour centrer la slide active
        const offset = (allSlides.length - 1) * slideWidth / 2 - currentIndex * (slideWidth + (activeSlideWidth - slideWidth) / 2);

        sliderWrapper.style.transform = `translateX(${offset}px)`;
    }

    function goToSlide(index, instant = false) {
        if (isTransitioning) return;
        
        const allSlides = sliderWrapper.querySelectorAll('.slide');
        
        if (index < 0 || index >= allSlides.length) {
            return;
        }

        allSlides.forEach(slide => slide.classList.remove('active'));
        allSlides[index].classList.add('active');
        currentIndex = index;
        
        if (instant) {
            sliderWrapper.style.transition = 'none';
            updateSliderPosition();
            // Force reflow
            sliderWrapper.offsetHeight;
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        } else {
            updateSliderPosition();
        }
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        const allSlides = sliderWrapper.querySelectorAll('.slide');
        currentIndex++;
        goToSlide(currentIndex);
        
        // Si on arrive à la fin des vraies slides + clones, revenir discrètement au début
        if (currentIndex >= originalSlideCount * 2) {
            setTimeout(() => {
                currentIndex = originalSlideCount; // Retour aux vraies slides
                goToSlide(currentIndex, true);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentIndex--;
        goToSlide(currentIndex);
        
        // Si on arrive au début des clones, aller discrètement à la fin des vraies slides
        if (currentIndex < originalSlideCount) {
            setTimeout(() => {
                currentIndex = originalSlideCount * 2 - 1; // Aller à la fin des vraies slides
                goToSlide(currentIndex, true);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    function startAutoScroll() {
        if (!isAutoScrollActive && slides.length > 1) {
            isAutoScrollActive = true;
            autoScrollInterval = setInterval(() => {
                nextSlide();
            }, 4000); // 4 secondes entre chaque slide
        }
    }
    
    function stopAutoScroll() {
        if (isAutoScrollActive) {
            isAutoScrollActive = false;
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    // Event listeners pour les boutons
    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        nextSlide();
        setTimeout(startAutoScroll, 6000); // Reprendre l'auto-scroll après 6s
    });

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        prevSlide();
        setTimeout(startAutoScroll, 6000); // Reprendre l'auto-scroll après 6s
    });
    
    // Pause au survol
    container.addEventListener('mouseenter', () => {
        stopAutoScroll();
    });
    
    // Reprendre au départ du survol
    container.addEventListener('mouseleave', () => {
        setTimeout(startAutoScroll, 1000);
    });

    // Initialiser le slider sur la première slide
    goToSlide(0);
    
    // Démarrer l'auto-scroll avec un délai échelonné
    setTimeout(() => {
        startAutoScroll();
    }, 2000 + (containerIndex * 1000));
    
    console.log(`Slider ${containerIndex} initialisé avec ${slides.length} slides`);
}

console.log('Portfolio Louis Sorin - Nouveau Slider loaded successfully!');
