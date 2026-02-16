// Smooth scrolling for navigation links
var navLinks = document.querySelectorAll('.nav-link');
if (navLinks && navLinks.length) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// CTA Button scroll to projects
var cta = document.querySelector('.cta-btn');
if (cta) {
    cta.addEventListener('click', () => {
        var proj = document.querySelector('#projects');
        if (proj) proj.scrollIntoView({ behavior: 'smooth' });
    });
}

// Contact form submission
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = e.target[0] ? e.target[0].value : '';
        const email = e.target[1] ? e.target[1].value : '';
        const message = e.target[2] ? e.target[2].value : '';
        if (name && email && message) {
            alert(`Děkuji za vaši zprávu, ${name}! Brzy se vám ozveme.`);
            e.target.reset();
        } else {
            alert('Prosím vyplňte všechna pole.');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    var sections = document.querySelectorAll('section');
    if (!sections) return;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) current = section.getAttribute('id');
    });
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }
});

// Add scroll animation to cards
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

// Observe all glass cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});



console.log('Portfolio loaded successfully! 🚀');
