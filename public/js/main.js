// ========================================
// PORTFOLIO - KADIR DOLEK
// JavaScript Animations & Interactions
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initNavbarScroll();
  initSkillBarsAnimation();
  initParallaxEffect();
  initActiveNavHighlight();
});

// ========== MOBILE MENU ==========
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Animate hamburger icon
      if (!mobileMenu.classList.contains('hidden')) {
        menuToggle.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        `;
      } else {
        menuToggle.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        `;
      }
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.innerHTML = `
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        `;
      });
    });
  }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Add stagger effect to children
        const children = entry.target.querySelectorAll('.skill-card, .project-card, .stat-card');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('visible');
        });
      }
    });
  }, observerOptions);

  // Observe all sections and animatable elements
  const animatableElements = document.querySelectorAll(
    'section, .fade-in, .fade-in-delayed, .skill-card, .project-card, .stat-card, .glass-card'
  );

  animatableElements.forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
  });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        // Add/remove background blur based on scroll position
        if (currentScroll > 50) {
          navbar.style.background = 'rgba(18, 22, 43, 0.98)';
          navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.background = 'rgba(18, 22, 43, 0.95)';
          navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    }
  });
}

// ========== SKILL BARS ANIMATION ==========
function initSkillBarsAnimation() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.style.getPropertyValue('--progress');

        // Animate the width
        setTimeout(() => {
          bar.style.width = progress;
        }, 200);

        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    bar.style.width = '0';
    bar.style.transition = 'width 1.5s ease-out';
    observer.observe(bar);
  });
}

// ========== PARALLAX EFFECT ==========
function initParallaxEffect() {
  const floatingElements = document.querySelectorAll('.floating, .floating-delayed');

  if (floatingElements.length === 0) return;

  let mouseX = 0.5;
  let mouseY = 0.5;
  let animationFrame;

  function updatePosition() {
    floatingElements.forEach((el, index) => {
      const speed = (index + 1) * 15;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
    animationFrame = requestAnimationFrame(updatePosition);
  });
}

// ========== ACTIVE NAV LINK HIGHLIGHT ==========
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          link.style.color = '';

          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.style.color = '#FCAF58';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ========== PROJECT CARDS TILT EFFECT ==========
function initTiltEffect() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Initialize tilt effect after DOM is loaded
document.addEventListener('DOMContentLoaded', initTiltEffect);

// ========== PRELOADER (Optional) ==========
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }

  // Trigger initial animations
  document.body.classList.add('loaded');
});

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
  const backToTop = document.createElement('button');
  backToTop.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  `;
  backToTop.className = 'back-to-top';
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FCAF58, #F9C784);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #12162b;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(252, 175, 88, 0.3);
  `;

  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-5px)';
    backToTop.style.boxShadow = '0 8px 30px rgba(252, 175, 88, 0.4)';
  });

  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.boxShadow = '0 4px 20px rgba(252, 175, 88, 0.3)';
  });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', initBackToTop);
