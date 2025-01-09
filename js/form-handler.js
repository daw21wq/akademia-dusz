// Email service configuration
const SERVICE_ID = "service_b9ny156";
const TEMPLATE_ID = "template_7b8317c";
const PUBLIC_KEY = "JKY2VQusQIcltIh4e"; // Using only the public key

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function() {
    emailjs.init(PUBLIC_KEY);
});

function toggleForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }
}

function sendEmail(formData, successCallback) {
    try {
        // Determine if it's a contact form or event registration
        const isContactForm = formData.eventName === 'Kontakt przez formularz';
        
        const templateParams = {
            to_name: "Academy of Souls",
            from_name: formData.name,
            reply_to: formData.email,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || '',
            subject: isContactForm ? 
                `Nowa wiadomość od ${formData.name} (${formData.email})` : 
                `Zgłoszenie na wydarzenie: ${formData.eventName} od ${formData.name} (${formData.email})`,
            event_name: formData.eventName,
            contact_info: `Imię i nazwisko: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone}`
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log("SUCCESS!", response.status, response.text);
                if (successCallback) successCallback();
                alert("Dziękujemy za " + (isContactForm ? "wiadomość" : "zgłoszenie") + "! Skontaktujemy się z Tobą wkrótce.");
            })
            .catch(function(error) {
                console.error("FAILED...", error);
                alert("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.");
            });
    } catch (error) {
        console.error("Error in sendEmail:", error);
        alert("Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.");
    }
}

function handleFormSubmit(event, formId) {
    event.preventDefault();
    const form = document.getElementById(formId);
    
    if (!form) {
        console.error("Form not found:", formId);
        return;
    }

    try {
        const formData = {
            name: form.querySelector('[name="name"]')?.value || '',
            email: form.querySelector('[name="email"]')?.value || '',
            phone: form.querySelector('[name="phone"]')?.value || '',
            eventName: form.querySelector('[name="eventName"]')?.value || '',
            message: form.querySelector('[name="message"]')?.value || ''
        };

        if (!formData.name || !formData.email || !formData.phone) {
            alert("Proszę wypełnić wszystkie wymagane pola.");
            return;
        }

        sendEmail(formData, function() {
            form.reset();
            const parentForm = form.closest('.registration-form');
            if (parentForm) {
                parentForm.style.display = 'none';
            }
        });
    } catch (error) {
        console.error("Error handling form submission:", error);
        alert("Wystąpił błąd podczas przetwarzania formularza. Spróbuj ponownie później.");
    }
}

// Add event listeners to all forms
document.addEventListener('DOMContentLoaded', function() {
    try {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const formId = form.id;
            if (formId) {
                form.addEventListener('submit', (e) => handleFormSubmit(e, formId));
            }
        });
    } catch (error) {
        console.error("Error setting up form listeners:", error);
    }
});
