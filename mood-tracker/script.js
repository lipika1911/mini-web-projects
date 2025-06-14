const moodOptions = {
  happy: "#FFD700",
  sad: "#1E90FF",
  angry: "#FF6347",
  relaxed: "#90EE90",
  anxious: "#9370DB",
};

const calendar = document.getElementById('calendar');
const viewSelect = document.getElementById('view-select');
const popup = document.getElementById('popup');
const popupDateLabel = document.getElementById('popup-date');
const popupMoods = document.getElementById('popup-moods');
const closePopupBtn = document.getElementById('close-popup');
let selectedDateKey = null;
const moodLegend = document.getElementById('mood-legend');

viewSelect.addEventListener('change', renderCalendar);
closePopupBtn.addEventListener('click', () => popup.style.display = 'none');


Object.entries(moodOptions).forEach(([mood, color]) => {
  const item = document.createElement('div');
  item.className = 'mood-legend-item';

  const colorDot = document.createElement('div');
  colorDot.className = 'mood-legend-color';
  colorDot.style.backgroundColor = color;

  const label = document.createElement('span');
  label.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);

  item.appendChild(colorDot);
  item.appendChild(label);
  moodLegend.appendChild(item);
});

Object.entries(moodOptions).forEach(([mood, color]) => {
  const moodItem = document.createElement('div');
  moodItem.className = 'popup-mood-item';

  const btn = document.createElement('button');
  btn.style.backgroundColor = color;
  btn.title = mood;

  const label = document.createElement('span');
  label.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);

  btn.addEventListener('click', () => {
    localStorage.setItem(selectedDateKey, mood);
    popup.style.display = 'none';
    renderCalendar();
  });

  moodItem.appendChild(btn);
  moodItem.appendChild(label);
  popupMoods.appendChild(moodItem);
});


function renderCalendar() {
  calendar.innerHTML = '';
  const view = viewSelect.value;
  calendar.className = `calendar-grid ${view}`;

  const today = new Date();
  let startDate, endDate;

  if (view === 'weekly') {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    startDate = start;
    endDate = new Date(start);
    endDate.setDate(start.getDate() + 6);
  } else if (view === 'monthly') {
    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  } else {
    startDate = new Date(today.getFullYear(), 0, 1);
    endDate = new Date(today.getFullYear(), 11, 31);
  }

  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  for (let i = 0; i < totalDays; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(startDate.getDate() + i);
    const key = cellDate.toISOString().split("T")[0];
    const mood = localStorage.getItem(key);

    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    if (mood) {
      cell.style.backgroundColor = moodOptions[mood];
      cell.style.color = 'white';
    }

    if (key === new Date().toISOString().split("T")[0]) {
      cell.classList.add('today');
    }

    const label = document.createElement('span');
    label.textContent = cellDate.getDate();

    const sublabel = document.createElement('div');
    sublabel.className = 'date-label';
    sublabel.textContent = `${cellDate.toLocaleString('default', { month: 'short' })} ${cellDate.getFullYear()}`;

    cell.appendChild(label);
    cell.appendChild(sublabel);

    cell.addEventListener('click', () => {
      selectedDateKey = key;
      popupDateLabel.textContent = `${cellDate.toDateString()}`;
      popup.style.display = 'flex';
    });

    calendar.appendChild(cell);
  }
}

renderCalendar();
