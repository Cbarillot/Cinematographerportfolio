// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');
const playIcon = document.querySelector('.play-icon');
const reelPreview = document.querySelector('.reel-preview');
const horizontalShowcase = document.querySelector('.horizontal-showcase');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
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
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 100;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
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
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Votre demande a été envoyée avec succès ! Je vous contacterai rapidement pour discuter de votre projet.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Demo Reel Play Button
if (playIcon && reelPreview) {
    reelPreview.addEventListener('click', () => {
        // In a real implementation, this would open a video modal or redirect to a video
        showNotification('Bande démo - Connectez votre lecteur vidéo préféré (Vimeo, YouTube, etc.)', 'info');
    });
}

// Portfolio Item Interactions
const showcaseItems = document.querySelectorAll('.showcase-item, .film-card');
showcaseItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        // In a real implementation, this would open a project detail modal or page
        const projectTitle = item.querySelector('h3, h4')?.textContent || 'Projet';
        showNotification(`Ouverture du détail: ${projectTitle} - À implémenter selon vos besoins`, 'info');
    });
});

// Horizontal Scroll Enhancement
if (horizontalShowcase) {
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    horizontalShowcase.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - horizontalShowcase.offsetLeft;
        scrollLeft = horizontalShowcase.scrollLeft;
        horizontalShowcase.style.cursor = 'grabbing';
    });

    horizontalShowcase.addEventListener('mouseleave', () => {
        isScrolling = false;
        horizontalShowcase.style.cursor = 'grab';
    });

    horizontalShowcase.addEventListener('mouseup', () => {
        isScrolling = false;
        horizontalShowcase.style.cursor = 'grab';
    });

    horizontalShowcase.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - horizontalShowcase.offsetLeft;
        const walk = (x - startX) * 2;
        horizontalShowcase.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    horizontalShowcase.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - horizontalShowcase.offsetLeft;
        scrollLeft = horizontalShowcase.scrollLeft;
    });

    horizontalShowcase.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - horizontalShowcase.offsetLeft;
        const walk = (x - startX) * 2;
        horizontalShowcase.scrollLeft = scrollLeft - walk;
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 30px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        backdrop-filter: blur(10px);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    const message_el = notification.querySelector('.notification-message');
    message_el.style.cssText = `
        line-height: 1.5;
        flex: 1;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        margin-left: 0.5rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.8';
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            removeNotification(notification);
        }
    }, 6000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 400);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        const rate = scrolled * 0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }
});

// Smooth reveal animations for elements
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.showcase-item, .film-card, .about-content, .contact-content, .expertise-item, .achievement');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initializeAnimations();
    
    // Add grab cursor to horizontal showcase
    if (horizontalShowcase) {
        horizontalShowcase.style.cursor = 'grab';
    }
    
    // Initialize any other components
    console.log('Louis Sorin Portfolio initialized');
    
    // Add loading animation to hero content
    const heroContent = document.querySelector('.hero-content');
    const heroReel = document.querySelector('.hero-reel');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
    
    if (heroReel) {
        heroReel.style.opacity = '0';
        heroReel.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroReel.style.transition = 'opacity 1s ease, transform 1s ease';
            heroReel.style.opacity = '1';
            heroReel.style.transform = 'translateY(0)';
        }, 600);
    }
});

// Add some mouse interaction effects
document.addEventListener('mousemove', (e) => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && window.scrollY < window.innerHeight) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        heroBackground.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(1.02)`;
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification');
        if (notification) {
            removeNotification(notification);
        }
        
        // Close mobile menu
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.click();
        }
    }
});