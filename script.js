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
document.addEventListener('DOMContentLoaded', function() {
    // Create starry background
    createStars();
    
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize contact form
    handleContactForm();

    // Initialize event registration forms
    handleEventRegistrationForms();

    // Menu mobilne
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navContainer.classList.toggle('active');
            console.log('Menu clicked');
        });

        // Zamykanie menu po kliknięciu w link
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                navContainer.classList.remove('active');
            });
        });

        // Zamykanie menu po kliknięciu poza menu
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && !menuToggle.contains(e.target) && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
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
