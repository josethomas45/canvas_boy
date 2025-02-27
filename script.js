// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

// Enhanced image loading animation
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.art-piece img');
    images.forEach((img, index) => {
        img.style.opacity = '0';
        img.style.transform = 'scale(0.8)';
        setTimeout(() => {
            img.style.transition = 'all 0.8s ease';
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, index * 200);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = hero.querySelector('h1');
    
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Mouse move effect for hero section
document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    
    const title = document.querySelector('.hero h1');
    title.style.transform = `translate(${x}px, ${y}px)`;
});

// Enhanced scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Cursor effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add these elements to observe
document.querySelectorAll('.art-piece, .about-content, #contact-form, .hero h1, .hero p').forEach(el => {
    observer.observe(el);
});

// Add this to your existing CSS
const style = document.createElement('style');
style.textContent = `
    .cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    }
    
    a:hover ~ .cursor,
    button:hover ~ .cursor {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: var(--accent);
        opacity: 0.5;
    }
`;
document.head.appendChild(style);

// Navigation scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const artPieces = document.querySelectorAll('.art-piece');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        artPieces.forEach(piece => {
            if (filter === 'all' || piece.dataset.category === filter) {
                piece.style.display = 'block';
            } else {
                piece.style.display = 'none';
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('artworkModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.view-details').forEach(button => {
    button.addEventListener('click', (e) => {
        const artPiece = e.target.closest('.art-piece');
        const img = artPiece.querySelector('img');
        const title = artPiece.querySelector('h3').textContent;
        const description = artPiece.dataset.description;
        
        modalImage.src = img.src;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Load more functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
let currentItems = 3;

loadMoreBtn.addEventListener('click', () => {
    // Add your load more logic here
    // This is just a sample animation
    loadMoreBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        loadMoreBtn.style.transform = 'scale(1)';
    }, 200);
});

// Random view and like counts for demo
document.querySelectorAll('.art-piece').forEach(piece => {
    const likes = Math.floor(Math.random() * 1000);
    const views = Math.floor(Math.random() * 5000);
    piece.querySelector('#likeCount').textContent = likes;
    piece.querySelector('#viewCount').textContent = views;
});

// Remove the existing hamburger menu code and replace with this updated version
const nav = document.querySelector('nav');
const navLinks = document.querySelector('.nav-links');

// Create hamburger button
const hamburger = document.createElement('button');
hamburger.classList.add('hamburger');
hamburger.innerHTML = `
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
`;
nav.appendChild(hamburger);

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Responsive image loading
function loadResponsiveImage(img) {
    const src = img.getAttribute('src');
    const mobileSrc = src.replace('.jpg', '-mobile.jpg');
    
    if (window.innerWidth <= 768) {
        img.setAttribute('src', mobileSrc);
    }
}

document.querySelectorAll('.art-piece img').forEach(loadResponsiveImage);

// Debounced resize handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle resize events
const handleResize = debounce(() => {
    document.querySelectorAll('.art-piece img').forEach(loadResponsiveImage);
}, 250);

window.addEventListener('resize', handleResize);

// Enhance form accessibility
const form = document.getElementById('contact-form');
const formInputs = form.querySelectorAll('input, textarea, select');

formInputs.forEach(input => {
    // Add aria labels
    input.setAttribute('aria-label', input.placeholder);
    
    // Add focus states
    input.addEventListener('focus', () => {
        input.closest('.form-group').classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.closest('.form-group').classList.remove('focused');
        }
    });
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Add touch support for gallery items
document.querySelectorAll('.art-piece').forEach(piece => {
    piece.addEventListener('touchstart', () => {
        piece.querySelector('.overlay').style.bottom = '0';
    }, { passive: true });
    
    piece.addEventListener('touchend', () => {
        setTimeout(() => {
            piece.querySelector('.overlay').style.bottom = '-100%';
        }, 1000);
    });
});

// Enhance modal for mobile
const modal = document.getElementById('artworkModal');

modal.addEventListener('touchstart', handleTouchStart, false);
modal.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) return;

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(yDiff) > Math.abs(xDiff) && yDiff > 0) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    xDown = null;
    yDown = null;
}

// Add performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Defer non-critical CSS
    const nonCriticalCSS = document.createElement('link');
    nonCriticalCSS.rel = 'stylesheet';
    nonCriticalCSS.href = 'non-critical.css';
    nonCriticalCSS.media = 'print';
    document.head.appendChild(nonCriticalCSS);
    
    requestIdleCallback(() => {
        nonCriticalCSS.media = 'all';
    });
});