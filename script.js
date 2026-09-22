// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});
document.querySelectorAll('.navlink').forEach(a => a.addEventListener('click', () => {
  siteNav.classList.remove('open');
}));

// active nav link on scroll
const sections = document.querySelectorAll('main section[id], .about');
const navLinks = document.querySelectorAll('.navlink');
const setActive = () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
};
window.addEventListener('scroll', setActive);
setActive();

// typing effect for role line
const roles = ['Web Developer', 'BSIT Student', 'UI/UX Enthusiast', 'PHP & MySQL Developer'];
const roleEl = document.getElementById('roleLine');
let ri = 0, ci = 0, deleting = false;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


function typeLoop(){
  const word = roles[ri];
  if (!deleting){
    ci++;
    roleEl.innerHTML = word.slice(0, ci) + '<span class="cursor"></span>';
    if (ci === word.length){ deleting = true; setTimeout(typeLoop, 1400); return; }
  } else {
    ci--;
    roleEl.innerHTML = word.slice(0, ci) + '<span class="cursor"></span>';
    if (ci === 0){ deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
if (prefersReduced){
  roleEl.textContent = roles[0];
} else {
  typeLoop();
}

// animate skill bars on scroll into view
const bars = document.querySelectorAll('.bar-fill');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      const el = entry.target;
      el.style.width = el.dataset.width + '%';
      io.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => io.observe(b));
