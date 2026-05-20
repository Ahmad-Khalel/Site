// ========== DARK MODE TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const savedDarkMode = localStorage.getItem('darkMode');

if (savedDarkMode === 'true') {
    document.body.classList.add('dark');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const icon = themeToggle.querySelector('i');
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    
    localStorage.setItem('darkMode', isDark);
});

// ========== FULL BILINGUAL TRANSLATION ==========
let isArabic = true;

const translatableElements = {
    texts: document.querySelectorAll('[data-ar][data-en]'),
    placeholders: document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]')
};

function switchToEnglish() {
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    isArabic = false;
    
    translatableElements.texts.forEach(el => {
        const enText = el.getAttribute('data-en');
        if (enText) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-en-placeholder') || enText;
            } else {
                el.textContent = enText;
            }
        }
    });
    
    translatableElements.placeholders.forEach(el => {
        const enPlaceholder = el.getAttribute('data-en-placeholder');
        if (enPlaceholder) {
            el.placeholder = enPlaceholder;
        }
    });
    
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.querySelector('span').textContent = 'AR';
    }
    
    localStorage.setItem('language', 'en');
}

function switchToArabic() {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    isArabic = true;
    
    translatableElements.texts.forEach(el => {
        const arText = el.getAttribute('data-ar');
        if (arText) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-ar-placeholder') || arText;
            } else {
                el.textContent = arText;
            }
        }
    });
    
    translatableElements.placeholders.forEach(el => {
        const arPlaceholder = el.getAttribute('data-ar-placeholder');
        if (arPlaceholder) {
            el.placeholder = arPlaceholder;
        }
    });
    
    const langBtn = document.getElementById('langToggle');
    if (langBtn) {
        langBtn.querySelector('span').textContent = 'EN';
    }
    
    localStorage.setItem('language', 'ar');
}

const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        if (isArabic) {
            switchToEnglish();
        } else {
            switchToArabic();
        }
    });
}

const savedLanguage = localStorage.getItem('language');
if (savedLanguage === 'en') {
    switchToEnglish();
} else {
    switchToArabic();
}

// ========== NAVIGATION BUTTONS ACTIVE STATE ==========
const navButtons = document.querySelectorAll('.ds-nav-links a');

function updateActiveNavButton() {
    const navbarHeight = document.querySelector('.ds-navbar')?.offsetHeight || 80;
    const scrollPos = window.scrollY + navbarHeight + 50;
    let currentSection = '';
    
    document.querySelectorAll('section[id]').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navButtons.forEach(btn => {
        const href = btn.getAttribute('href').substring(1);
        if (href === currentSection) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavButton);
updateActiveNavButton();

// Smooth scroll with offset
navButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbarHeight = document.querySelector('.ds-navbar')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navbarHeight - 15;
            
            this.style.transform = 'scale(0.97)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== SECTION REVEAL ON SCROLL + ANIMATED UNDERLINE ==========
const sections = document.querySelectorAll('.ds-section');
const animatedUnderlines = document.querySelectorAll('.animated-underline');

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            const title = entry.target.querySelector('.animated-underline');
            if (title) {
                title.classList.add('reveal');
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

animatedUnderlines.forEach(underline => {
    underline.classList.add('animated-underline');
});

// ========== UPDATE CONTACT LINKS ==========
const updateContactLinks = () => {
    const whatsappSpan = document.getElementById('whatsappDisplay');
    if (whatsappSpan) {
        whatsappSpan.innerHTML = '<a href="https://wa.me/963964862330" target="_blank" style="color: var(--ds-primary); text-decoration: none;">+963 964 862 330</a>';
    }
    
    const telegramSpan = document.getElementById('telegramDisplay');
    if (telegramSpan) {
        telegramSpan.innerHTML = '<a href="https://t.me/AhmadKhalel" target="_blank" style="color: var(--ds-primary); text-decoration: none;">@AhmadKhalel</a>';
    }
    
    const instagramSpan = document.getElementById('instagramDisplay');
    if (instagramSpan) {
        instagramSpan.innerHTML = '<a href="https://instagram.com/Ahmad.J.Khalel" target="_blank" style="color: var(--ds-primary); text-decoration: none;">@Ahmad.J.Khalel</a>';
    }
    
    const facebookSpan = document.getElementById('facebookDisplay');
    if (facebookSpan) {
        facebookSpan.innerHTML = '<a href="https://facebook.com/Ahmad.J.Khalel" target="_blank" style="color: var(--ds-primary); text-decoration: none;">@Ahmad.J.Khalel</a>';
    }
    
    const twitterSpan = document.getElementById('twitterDisplay');
    if (twitterSpan) {
        twitterSpan.innerHTML = '<a href="https://x.com/AhmadJKhalel" target="_blank" style="color: var(--ds-primary); text-decoration: none;">@AhmadJKhalel</a>';
    }
    
    const youtubeSpan = document.getElementById('youtubeDisplay');
    if (youtubeSpan) {
        youtubeSpan.innerHTML = '<a href="https://youtube.com/@AhmadJKhalel" target="_blank" style="color: var(--ds-primary); text-decoration: none;">@AhmadJKhalel</a>';
    }
};

// ========== EMAILJS FORM SUBMISSION ==========
// Initialize EmailJS - Replace with your actual keys
emailjs.init("YOUR_PUBLIC_KEY");

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('userName')?.value || '',
            email: document.getElementById('userEmail')?.value || '',
            phone: document.getElementById('userPhone')?.value || '',
            message: document.getElementById('userMessage')?.value || '',
        };
        
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                const successMessage = isArabic ? 
                    '✨ تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.' : 
                    '✨ Message sent successfully! I will contact you soon.';
                alert(successMessage);
                contactForm.reset();
            })
            .catch((error) => {
                console.error('EmailJS Error:', error);
                const errorMessage = isArabic ? 
                    '❌ حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر الواتساب.' : 
                    '❌ An error occurred. Please try again or contact via WhatsApp.';
                alert(errorMessage);
            });
    });
}

// ========== PROFILE IMAGE ERROR HANDLING ==========
const profileImg = document.getElementById('profileImage');
if (profileImg) {
    profileImg.onerror = () => {
        profileImg.src = 'https://via.placeholder.com/280x280?text=Ahmad+Khalel';
    };
}

// ========== MOBILE MENU TOGGLE ==========
function addMobileMenuButton() {
    if (window.innerWidth <= 900 && !document.querySelector('.mobile-menu-btn')) {
        const actions = document.querySelector('.ds-actions');
        if (actions) {
            const mobileBtn = document.createElement('button');
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileBtn.className = 'ds-icon-btn mobile-menu-btn';
            mobileBtn.style.display = 'flex';
            mobileBtn.style.alignItems = 'center';
            mobileBtn.style.justifyContent = 'center';
            
            mobileBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const navLinks = document.querySelector('.ds-nav-links');
                const isShowing = navLinks.classList.contains('show');
                
                if (isShowing) {
                    navLinks.classList.remove('show');
                    setTimeout(() => {
                        if (!navLinks.classList.contains('show')) {
                            navLinks.style.display = 'none';
                        }
                    }, 300);
                } else {
                    navLinks.style.display = 'flex';
                    setTimeout(() => {
                        navLinks.classList.add('show');
                    }, 10);
                }
            });
            
            actions.insertBefore(mobileBtn, actions.firstChild);
        }
    }
}

function closeMobileMenu() {
    if (window.innerWidth <= 900) {
        const navLinks = document.querySelector('.ds-nav-links');
        if (navLinks?.classList.contains('show')) {
            navLinks.classList.remove('show');
            setTimeout(() => {
                if (!navLinks.classList.contains('show')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
    }
}

document.addEventListener('click', function(event) {
    if (window.innerWidth <= 900) {
        const navLinks = document.querySelector('.ds-nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const isClickInsideNav = navLinks?.contains(event.target);
        const isClickOnMenuBtn = mobileBtn?.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnMenuBtn && navLinks?.classList.contains('show')) {
            closeMobileMenu();
        }
    }
});

window.addEventListener('scroll', closeMobileMenu);
window.addEventListener('orientationchange', () => setTimeout(closeMobileMenu, 100));

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const isMobile = window.innerWidth <= 900;
        const navLinks = document.querySelector('.ds-nav-links');
        
        if (!isMobile) {
            navLinks.classList.remove('show');
            navLinks.style.display = 'flex';
            const existingBtn = document.querySelector('.mobile-menu-btn');
            if (existingBtn) existingBtn.remove();
        } else {
            navLinks.style.display = 'none';
            addMobileMenuButton();
        }
    }, 100);
});

// ========== INITIALIZE AOS ANIMATION ==========
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

addMobileMenuButton();
updateContactLinks();

console.log('🚀 Ahmad Khalel Website loaded successfully!');
