// script.js

const API_URL = 'https://api.aladhan.com/v1/timingsByCity';

document.getElementById('getPrayerTimes').addEventListener('click', getPrayerTimes);

function getPrayerTimes() {
  const city = document.getElementById('cityInput').value.trim();
  const country = 'auto'; // Automatically detect the country based on the city

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  const url = `${API_URL}?city=${city}&country=${country}&method=2`; // Method 2 is for ISNA calculation method
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found or API error.');
      }
      return response.json();
    })
    .then(data => displayPrayerTimes(data.data.timings))
    .catch(error => showError(error.message));
}

function displayPrayerTimes(timings) {
  const timesList = document.getElementById('timesList');
  timesList.innerHTML = ''; // Clear previous results

  const prayerIcons = {
    Fajr: 'fas fa-sun',
    Dhuhr: 'fas fa-clock',
    Asr: 'fas fa-praying-hands',
    Maghrib: 'fas fa-moon',
    Isha: 'fas fa-star-and-crescent'
  };

  for (const [key, value] of Object.entries(timings)) {
    if (prayerIcons[key]) {
      const listItem = document.createElement('li');
      const icon = document.createElement('i');
      icon.className = prayerIcons[key];
      listItem.appendChild(icon);
      listItem.appendChild(document.createTextNode(`${key}: ${value}`));
      timesList.appendChild(listItem);
    }
  }

  // Show prayer times and hide error message
  document.getElementById('prayerTimes').classList.remove('hidden');
  document.getElementById('error').classList.add('hidden');
}

function showError(message) {
  document.getElementById('error').textContent = message;
  document.getElementById('error').classList.remove('hidden');
  document.getElementById('prayerTimes').classList.add('hidden');
}