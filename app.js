const people = window.workshopPeople;

function personCard(person, isSpeaker) {
  const card = document.createElement('article');
  card.className = isSpeaker ? 'speaker-card' : 'organizer-card';
  const portrait = document.createElement('div');
  portrait.className = 'portrait';
  const initials = document.createElement('span');
  initials.className = 'initials';
  initials.setAttribute('aria-hidden', 'true');
  initials.textContent = person.name.split(/[\s-]+/).filter(Boolean).map(part => part[0]).slice(0, 2).join('');
  portrait.append(initials);
  if (person.image) {
    const image = document.createElement('img');
    image.src = person.image;
    image.alt = person.name;
    image.width = 480;
    image.height = 480;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', () => image.remove(), {once:true});
    portrait.append(image);
  }
  const content = document.createElement('div');
  content.className = 'person-info';
  const name = document.createElement('h3');
  if (person.url) {
    const link = document.createElement('a');
    link.href = person.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = person.name;
    link.setAttribute('aria-label', person.name + ' — profile (opens in a new tab)');
    name.append(link);
  } else name.textContent = person.name;
  const affiliation = document.createElement('p');
  affiliation.className = 'affiliation';
  affiliation.textContent = person.affiliation;
  content.append(name, affiliation);
  card.append(portrait, content);
  return card;
}
people.speakers.forEach(person => document.getElementById('speaker-grid').append(personCard(person, true)));
people.organizers.forEach(person => document.getElementById('organizer-grid').append(personCard(person, false)));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!document.querySelector('.site-header').contains(event.target)) closeMenu();
});
const navLinks = [...navigation.querySelectorAll('a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, {rootMargin:'-12% 0px -65% 0px', threshold:0});
  navLinks.forEach(link => observer.observe(document.querySelector(link.hash)));
}
