// app.js - dynamické načítání profilu z profile.json
fetch('profile.json')
  .then(function(response) {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(function(data) {
    var nameEl = document.querySelector('#name');
    if (nameEl) nameEl.textContent = data.name || '';
  })
  .catch(function(err) {
    console.error('Chyba při načítání profile.json', err);
    var container = document.querySelector('.container') || document.body;
    var errEl = document.createElement('div');
    errEl.style.color = 'red';
    errEl.textContent = 'Chyba při načítání dat profilu.';
    container.insertBefore(errEl, container.firstChild);
  });
