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
        message: form.message?.value || '',
        eventName: eventName
    };

    // Wysyłanie formularza przez EmailJS
    emailjs.send("service_b9ny156", "template_7b8317c", formData)
        .then(function(response) {
            console.log("SUCCESS", response);
            alert('Dziękujemy za zapisanie się! Skontaktujemy się z Tobą wkrótce.');
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
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-section, .slide-in-left, .slide-in-right, .zoom-in');
    animatedElements.forEach(el => observer.observe(el));

    // Initialize event registration forms
    handleEventRegistrationForms();
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
