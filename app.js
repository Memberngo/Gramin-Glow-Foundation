/* ---------------- PRELOADER ---------------- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});
/* Optional: smooth preloader fade */
window.addEventListener('load', () => {
  const p = document.getElementById('preloader');
  if (p) setTimeout(()=> p.classList.add('loaded'), 650);
});
/* ---------------- OPEN PAGE ---------------- */
function openPage(url){
  // open in new tab for program details
  window.open(url, '_blank');
}
/* ---------------- DONATE POPUP ---------------- */
function toggleDonate(){
  const popup = document.getElementById('donate-popup');
  if (!popup) return;
  if (popup.style.display === 'flex') {
    popup.style.display = 'none';
    popup.setAttribute('aria-hidden','true');
  } else {
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden','false');
  }
}
/* Close popup when click outside */
window.addEventListener('click', (e) => {
  const popup = document.getElementById('donate-popup');
  if (!popup) return;
  if (e.target === popup) {
    popup.style.display = 'none';
    popup.setAttribute('aria-hidden','true');
  }
});
/* ---------------- SMOOTH SCROLL ---------------- */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;
  const href = a.getAttribute('href');
  if (!href) return;
  if (href.startsWith('#')) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }
});
/* ---------------- NAV ACTIVE LINK ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(l => {
    if (location.pathname.endsWith(l.getAttribute('href'))) {
      l.classList.add('active');
    }
  });
});
/* ---------------- CAROUSEL PAUSE ON HOVER ---------------- */
document.querySelectorAll('.carousel-track').forEach(track => {
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
});
/* ---------------- GLOBAL RIPPLE EFFECT ---------------- */
document.addEventListener("click", function(e) {
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  document.body.appendChild(ripple);
  ripple.style.left = `${e.pageX - 10}px`;
  ripple.style.top = `${e.pageY - 10}px`;
  ripple.style.width = ripple.style.height = "20px";
  setTimeout(() => ripple.remove(), 600);
});
/* ---------------- FLOATING DONATE BUTTON BOUNCE ---------------- */
window.addEventListener("scroll", () => {
  const donateBtn = document.querySelector(".floating-donate");
  if (!donateBtn) return;
  donateBtn.style.transform = "scale(1.2) rotate(5deg)";
  setTimeout(() => {
    donateBtn.style.transform = "scale(1)";
  }, 300);
});
/* ---------------- DRAG CAROUSEL ---------------- */
const track = document.querySelector('.carousel-track');
if(track){
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  track.addEventListener('mousedown', dragStart);
  track.addEventListener('mouseup', dragEnd);
  track.addEventListener('mouseleave', dragEnd);
  track.addEventListener('mousemove', dragMove);
  track.addEventListener('touchstart', dragStart);
  track.addEventListener('touchend', dragEnd);
  track.addEventListener('touchmove', dragMove);
  function dragStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    track.style.cursor = 'grabbing';
    animationID = requestAnimationFrame(animation);
  }
  function dragEnd() {
    isDragging = false;
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationID);
    track.style.cursor = 'grab';
  }
  function dragMove(e) {
    if (!isDragging) return;
    const currentPosition = getPositionX(e);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }
  function animation() {
    setSliderPosition();
    if (isDragging) requestAnimationFrame(animation);
  }
  function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
}
/* ---------------- CONTACT FORM MAILTO ---------------- */
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    const mailtoLink = `mailto:graminglowfoundation2025@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    window.location.href = mailtoLink;
  });
}
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------- HIGHLIGHT CAROUSEL -------------------- */
  const track = document.querySelector('.highlight-track');
  const cards = document.querySelectorAll('.highlight-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (track && cards.length > 0) {
    let index = 0;
    const totalSlides = cards.length;
    let autoSlide;

    function updateCarousel() {
      track.style.transform = `translateX(${-index * 420}px)`; // each card ~420px wide
    }

    // Manual navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % totalSlides;
        updateCarousel();
        resetAutoSlide();
      });
    }

    // Auto-slide every 3s
    function startAutoSlide() {
      autoSlide = setInterval(() => {
        index = (index + 1) % totalSlides;
        updateCarousel();
      }, 3000);
    }
    function resetAutoSlide() {
      clearInterval(autoSlide);
      startAutoSlide();
    }
    startAutoSlide();
  }

  /* -------------------- DONATE POPUP -------------------- */
  const donateBtn = document.querySelector('.floating-donate');
  const donatePopup = document.getElementById('donate-popup');
  const closeBtn = document.querySelector('.popup-close');

  if (donateBtn && donatePopup && closeBtn) {
    donateBtn.addEventListener('click', () => {
      donatePopup.setAttribute('aria-hidden', 'false');
      donatePopup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
      donatePopup.setAttribute('aria-hidden', 'true');
      donatePopup.style.display = 'none';
    });

    donatePopup.addEventListener('click', (e) => {
      if (e.target === donatePopup) {
        donatePopup.setAttribute('aria-hidden', 'true');
        donatePopup.style.display = 'none';
      }
    });
  }
});
/* -------------------- HIGHLIGHT SLIDER -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll('.highlight-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let index = 0;
  let autoSlide;

  // Create dots dynamically
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        index = i;
        showSlide(index);
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = document.querySelectorAll('.dot');

  function showSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      dots[i].classList.remove('active');
    });
    slides[n].classList.add('active');
    dots[n].classList.add('active');
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }
  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Navigation arrows
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
      resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      showSlide(index);
      resetAutoSlide();
    });
  }

  // Init
  showSlide(index);
  startAutoSlide();
});
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navOverlay = document.querySelector(".nav-overlay");

if (navToggle && navMenu && navOverlay) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navOverlay.classList.toggle("show");
  });

  navOverlay.addEventListener("click", () => {
    navMenu.classList.remove("show");
    navOverlay.classList.remove("show");
  });

  document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      navOverlay.classList.remove("show");
    });
  });
}

/* Falling Icons Animation */
function createFallingIcons(type) {
  const container = document.getElementById('falling-icons-container');
  if (!container) {
    console.log('Container not found');
    return;
  }
  
  const icons = {
    health: ['🏥', '💊', '🩺', '❤️', '🚑', '💉', '🩹'],
    education: ['📚', '✏️', '🎓', '📝', '🖊️', '🎨', '📊'],
    agriculture: ['🌾', '🌱', '🚜', '🌳', '🍃', '🌽', '🌿']
  };
  
  const iconSet = icons[type] || icons.health;
  const isMobile = window.innerWidth <= 768;
  const iconCount = isMobile ? 8 : 12;
  
  console.log(`Creating ${iconCount} falling icons for ${type}`);
  
  for (let i = 0; i < iconCount; i++) {
    setTimeout(() => {
      const icon = document.createElement('div');
      icon.className = `falling-icon ${type}`;
      icon.textContent = iconSet[Math.floor(Math.random() * iconSet.length)];
      
      icon.style.left = (Math.random() * 90 + 5) + '%';
      icon.style.top = '-80px';
      icon.style.animationDelay = Math.random() * 0.8 + 's';
      icon.style.animationDuration = isMobile ? (3 + Math.random() * 1) + 's' : (3.5 + Math.random() * 1.5) + 's';
      icon.style.zIndex = '9999';
      
      container.appendChild(icon);
      
      setTimeout(() => {
        if (icon.parentNode) {
          icon.parentNode.removeChild(icon);
        }
      }, isMobile ? 4500 : 5500);
    }, i * (isMobile ? 120 : 150));
  }
}

/* Prevent double-tap zoom on mobile for program cards */
document.addEventListener('DOMContentLoaded', function() {
  const programCards = document.querySelectorAll('.dynamic-program');
  programCards.forEach(card => {
    card.addEventListener('touchstart', function(e) {
      console.log('Touch detected on card');
    }, { passive: true });
    
    card.addEventListener('click', function(e) {
      console.log('Click detected on card');
      const cardType = this.textContent.toLowerCase().includes('health') ? 'health' : 
                      this.textContent.toLowerCase().includes('education') ? 'education' : 'agriculture';
      createFallingIcons(cardType);
    });
  });
});

/* Premium Message Form Handler - Frontend Only */
document.addEventListener('DOMContentLoaded', function() {
  const premiumMessageForm = document.getElementById('premium-message-form');
  
  if (premiumMessageForm) {
    const submitBtn = premiumMessageForm.querySelector('.premium-message-btn');
    const statusDiv = document.getElementById('messageStatus');
    
    // Form submission handler
    premiumMessageForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('fullName');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        if (statusDiv) {
          statusDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields.';
          statusDiv.className = 'message-status error';
          statusDiv.style.display = 'block';
          setTimeout(() => statusDiv.style.display = 'none', 3000);
        }
        return;
      }
      
      const emailSubject = `${subject} - Message from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
      
      const mailtoLink = `mailto:graminglowfoundation2025@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      // Show success feedback
      if (statusDiv) {
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Opening email client...';
        statusDiv.className = 'message-status success';
        statusDiv.style.display = 'block';
      }
      
      const btnContent = submitBtn.querySelector('.btn-content');
      btnContent.innerHTML = '<span class="btn-text">Email Opened!</span><span class="btn-icon"><i class="fas fa-check"></i></span>';
      submitBtn.style.transform = 'scale(1.05)';
      
      setTimeout(() => {
        btnContent.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fas fa-paper-plane"></i></span>';
        submitBtn.style.transform = '';
        if (statusDiv) statusDiv.style.display = 'none';
        this.reset();
      }, 3000);
    });
  }
});
