const PAGES = ['page-01.png', 'page-02.png', 'page-03.png', 'page-04.png', 'page-05.png', 'page-06.png', 'page-07.png'];
let current = 0;

const stageImg = document.getElementById('pageImg');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbs = document.getElementById('thumbs');

function setCurrent(idx, push=true) {
  current = Math.max(0, Math.min(PAGES.length - 1, idx));
  stageImg.src = `assets/pages/${PAGES[current]}`;
  stageImg.alt = `Page ${current + 1}`;
  counter.textContent = `${current + 1} / ${PAGES.length}`;

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === PAGES.length - 1;

  // highlight thumbs
  document.querySelectorAll('.thumb').forEach((el, i) => {
    el.classList.toggle('active', i === current);
  });

  if (push) {
    const url = new URL(window.location);
    url.searchParams.set('p', String(current + 1));
    history.replaceState(null, '', url);
  }
}

function buildThumbs() {
  thumbs.innerHTML = '';
  PAGES.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'thumb';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = `assets/pages/${p}`;
    img.alt = `Page ${i + 1} thumbnail`;
    div.appendChild(img);
    div.addEventListener('click', () => setCurrent(i));
    thumbs.appendChild(div);
  });
}

function initFromQuery() {
  const url = new URL(window.location);
  const p = parseInt(url.searchParams.get('p') || '1', 10);
  if (!isNaN(p)) setCurrent(p - 1, false);
}

prevBtn.addEventListener('click', () => setCurrent(current - 1));
nextBtn.addEventListener('click', () => setCurrent(current + 1));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') setCurrent(current - 1);
  if (e.key === 'ArrowRight') setCurrent(current + 1);
});

buildThumbs();
initFromQuery();
setCurrent(current, false);
