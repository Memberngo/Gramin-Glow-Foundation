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

/* ---------------- DONATE POPUP CLICK HANDLER ---------------- */
const donateBtn2 = document.querySelector('.floating-donate');
const donatePopup = document.getElementById('donate-popup');
const closeBtn = document.querySelector('.popup-close');

if(donateBtn2 && donatePopup && closeBtn){
  donateBtn2.addEventListener('click', function(e){
    e.preventDefault(); // prevent accidental navigation
    toggleDonate();
  });

  closeBtn.addEventListener('click', () => toggleDonate());

  window.addEventListener('click', (e) => {
    if(e.target === donatePopup) toggleDonate();
  });
}

/* ---------------- CONTACT FORM MAILTO ---------------- */
const form = document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const mailtoLink = `mailto:graminglowfoundation2025@gmail.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
    window.location.href = mailtoLink;
  });
}
