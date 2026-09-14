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

const form = document.getElementById('book-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();
  const trainType = form.trainType.value;
  const bestTime = form.bestTime.value;
  const goals = form.goals.value.trim();

  const subject = `Call Booking Request: ${name}`;
  const body =
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone}\n` +
    `How They Want To Train: ${trainType}\n` +
    `Best Time To Call: ${bestTime}\n\n` +
    `Goals:\n${goals}`;

  const mailtoUrl = `mailto:Coachmaxstrength@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

/* ---------- Sticky Book A Call button ---------- */
const stickyCta = document.getElementById('sticky-cta');
const heroSection = document.querySelector('.hero');
const bookSection = document.getElementById('book');

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    stickyCta.classList.toggle('visible', !entry.isIntersecting);
  });
}, { threshold: 0 });
heroObserver.observe(heroSection);

const bookObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    stickyCta.classList.toggle('hide-on-book', entry.isIntersecting);
  });
}, { threshold: 0.2 });
bookObserver.observe(bookSection);

/* ---------- Hero parallax ---------- */
const heroImg = document.querySelector('.hero-media img');
if (heroImg) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.06, 50);
        heroImg.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- Find Your Program quiz ---------- */
const quizPrograms = {
  fatloss: {
    title: 'Fat Loss & Transformation',
    desc: 'Sustainable fat loss without crash diets — strip the fat, keep your strength and your sanity.',
  },
  women: {
    title: 'Body Composition For Women',
    desc: 'Training and nutrition built specifically around female physique goals — leaner, stronger, more defined.',
  },
  fighter: {
    title: 'Strength & Conditioning For Fighters',
    desc: 'Power and conditioning that holds up in the late rounds — periodized around your fight camp.',
  },
  bodybuilding: {
    title: 'Bodybuilding & Mass Gain',
    desc: 'Serious size, built with structure — a real bodybuilding approach for men ready to grow.',
  },
};

const quizStep = document.querySelector('.quiz-step');
const quizResult = document.getElementById('quiz-result');
const quizResultTitle = document.getElementById('quiz-result-title');
const quizResultDesc = document.getElementById('quiz-result-desc');
const quizCta = document.getElementById('quiz-cta');

document.querySelectorAll('.quiz-option').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.program;
    const program = quizPrograms[key];
    if (!program) return;

    quizResultTitle.textContent = program.title;
    quizResultDesc.textContent = program.desc;
    quizCta.href = '#book';
    quizCta.dataset.program = program.title;

    quizStep.hidden = true;
    quizResult.hidden = false;
  });
});

if (quizCta) {
  quizCta.addEventListener('click', () => {
    const goalsField = document.getElementById('goals');
    const programName = quizCta.dataset.program;
    if (goalsField && programName && !goalsField.value.includes(programName)) {
      goalsField.value = `Interested in the ${programName} program.\n` + goalsField.value;
    }
  });
}
