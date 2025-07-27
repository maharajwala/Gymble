// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// BMI Calculator
function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const resultDiv = document.getElementById('bmiResult');

    if (height && weight) {
        const heightM = height / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(1);
        let category = '';
        
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal weight';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Your BMI is <strong>${bmi}</strong><br>Category: <strong>${category}</strong>`;
    }
}

// Workout Timer
let timerInterval;
let seconds = 0;
let isRunning = false;

function updateTimerDisplay() {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            seconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    seconds = 0;
    updateTimerDisplay();
}

// Newsletter
function handleNewsletter(e) {
    e.preventDefault();
    alert('Thank you for subscribing! Check your email for confirmation.');
    e.target.reset();
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Dynamic Copyright Year
document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} FitPro Elite. All rights reserved.`;

// Testimonial Carousel (Auto-scroll)
let currentTestimonial = 0;
const testimonialCarousel = document.querySelector('.testimonial-carousel');
const testimonialCards = document.querySelectorAll('.testimonial-card');

function scrollTestimonials() {
    if (testimonialCards.length > 3) {
        currentTestimonial = (currentTestimonial + 1) % (testimonialCards.length - 2);
        const scrollAmount = currentTestimonial * (testimonialCards[0].offsetWidth + 32); // 32px is the gap
        testimonialCarousel.style.transform = `translateX(-${scrollAmount}px)`;
    }
}

// Auto-scroll testimonials every 5 seconds
setInterval(scrollTestimonials, 5000);

// Add hover pause functionality for testimonials
testimonialCarousel.addEventListener('mouseenter', () => {
    clearInterval(scrollTestimonials);
});

testimonialCarousel.addEventListener('mouseleave', () => {
    setInterval(scrollTestimonials, 5000);
});

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = newsletterForm.querySelector('input[type="email"]');

emailInput.addEventListener('input', (e) => {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
    } else {
        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
    }
});

// Add class booking simulation
document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', function() {
        const className = this.querySelector('.class-name').textContent;
        const classTime = this.querySelector('.class-time').textContent;
        const trainer = this.querySelector('.class-trainer').textContent;
        
        if (confirm(`Book ${className} at ${classTime} ${trainer}?`)) {
            alert('Class booked successfully! Check your email for confirmation.');
            this.style.opacity = '0.6';
            this.style.pointerEvents = 'none';
            this.innerHTML += '<div style="color: #4ade80; margin-top: 10px; font-weight: bold;">✓ BOOKED</div>';
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization - lazy load images
const lazyImages = document.querySelectorAll('img[data-lazy]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.lazy;
            img.removeAttribute('data-lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
    
    // Space bar pauses/plays timer when focused
    if (e.key === ' ' && document.activeElement.classList.contains('timer-btn')) {
        e.preventDefault();
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }
});

// Initialize AOS-like animations for elements entering viewport
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            element.classList.add('aos-animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);