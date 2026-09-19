// Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');
const btnLucky = document.getElementById('btn-lucky');
const voiceBtn = document.getElementById('voice-btn');
const lensBtn = document.getElementById('lens-btn');

// Toggle clear button on input
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim().length > 0) {
    clearBtn.style.display = 'flex';
  } else {
    clearBtn.style.display = 'none';
  }
});

// Clear input action
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.style.display = 'none';
  searchInput.focus();
});

// Form submission handler
searchForm.addEventListener('submit', (e) => {
  const query = searchInput.value.trim();
  if (!query) {
    e.preventDefault();
    searchInput.focus();
  }
});

// "Saya Lagi Beruntung" (I'm Feeling Lucky) button
btnLucky.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`, '_blank');
  } else {
    window.open('https://doodles.google/', '_blank');
  }
});

// Voice search button simulation
voiceBtn.addEventListener('click', () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';

    recognition.onstart = () => {
      searchInput.placeholder = 'Mendengarkan...';
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      searchInput.placeholder = '';
      clearBtn.style.display = 'flex';
      searchForm.submit();
    };

    recognition.onerror = () => {
      searchInput.placeholder = '';
      alert('Fitur suara tidak dapat mengakses mikrofon atau dibatalkan.');
    };

    recognition.onend = () => {
      searchInput.placeholder = '';
    };

    recognition.start();
  } else {
    alert('Penelusuran suara memerlukan browser yang mendukung Speech Recognition (seperti Google Chrome).');
  }
});

// Google Lens button simulation
lensBtn.addEventListener('click', () => {
  alert('Fitur Google Lens: Anda dapat mengunggah gambar untuk ditelusuri.');
});
