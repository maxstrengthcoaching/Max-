document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('signup-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const program = form.program.value;
  const goals = form.goals.value.trim();

  const subject = `Coaching Sign Up: ${name}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || 'N/A'}\n` +
    `Program: ${program}\n\n` +
    `Goals:\n${goals}`;

  const mailtoUrl = `mailto:Coachmaxstrength@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
});
