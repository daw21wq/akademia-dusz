// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 200;

    // Create regular stars
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = `star star-${Math.floor(Math.random() * 3 + 1)}`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    // Create shooting stars
    for (let i = 0; i < 3; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.left = `${Math.random() * 100}%`;
        shootingStar.style.top = `${Math.random() * 50}%`;
        shootingStar.style.animationDelay = `${Math.random() * 10}s`;
        starsContainer.appendChild(shootingStar);
    }
}

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', submitContactForm);
    }
}

// Obsługa formularza kontaktowego
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        eventName: form.eventName.value
    };

    // Wysyłanie formularza przez EmailJS
    emailjs.send("service_b9ny156", "template_7b8317c", formData)
        .then(function(response) {
            console.log("SUCCESS", response);
            alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
            form.reset();
        }, function(error) {
            console.log("FAILED", error);
            alert('Przepraszamy, wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie.');
        });
}

// Toggle registration form visibility
function toggleForm(formId) {
    const form = document.getElementById(formId);
    const allForms = document.querySelectorAll('.registration-form');
    
    // Close all other forms
    allForms.forEach(f => {
        if (f.id !== formId) {
            f.classList.remove('active');
        }
    });
    
    // Toggle current form
    form.classList.toggle('active');
}

// Initialize EmailJS
(function() {
    emailjs.init("JKY2VQusQIcltIh4e");
})();

function submitForm(event, eventName) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value,
        eventName: eventName
    };

    // Wysyłanie formularza przez EmailJS
    emailjs.send("service_b9ny156", "template_7b8317c", formData)
        .then(function(response) {
            console.log("SUCCESS", response);
            alert('Dziękujemy za zapisanie się na wydarzenie! Skontaktujemy się z Tobą wkrótce.');
            form.reset();
            form.parentElement.classList.remove('active');
        }, function(error) {
            console.log("FAILED", error);
            alert('Przepraszamy, wystąpił błąd podczas wysyłania formularza. Prosimy spróbować ponownie.');
        });
}

// Handle event registration forms
function handleEventRegistrationForms() {
    const eventForms = document.querySelectorAll('.event-form');
    eventForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const eventName = form.closest('.event-item').querySelector('.event-title').textContent;
            submitForm(e, eventName);
        });
    });
}

// Initialize everything when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create starry background
    createStars();
    
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize contact form
    handleContactForm();

    // Initialize event registration forms
    handleEventRegistrationForms();

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        // Toggle menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Prevent clicks inside menu from closing it
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Close menu when clicking a link
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
