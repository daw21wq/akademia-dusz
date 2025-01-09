document.addEventListener('DOMContentLoaded', () => {
    // Nawigacja
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.cosmic-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Usuń klasę active ze wszystkich sekcji
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Dodaj klasę active do wybranej sekcji
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Konfiguracja particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 2,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#8a2be2',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.5
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Aktywuj pierwszą sekcję na starcie
    if (sections[0]) {
        sections[0].classList.add('active');
    }

    // Animacje dla kart
    const cards = document.querySelectorAll('.discovery-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 30px rgba(138, 43, 226, 0.3)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });

    // Animacja sfery
    const mysterySphere = document.querySelector('.mystery-sphere');
    if (mysterySphere) {
        setInterval(() => {
            mysterySphere.style.transform = `scale(${1 + Math.random() * 0.1})`;
        }, 2000);
    }
});
