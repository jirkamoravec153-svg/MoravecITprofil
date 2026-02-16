// app.js - dynamické načítání profilu z profile.json
fetch('profile.json')
  .then(function(response) {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  })
  .then(function(data) {
    var nameEl = document.querySelector('#name');
    if (nameEl) nameEl.textContent = data.name || '';
    var skillsEl = document.querySelector('#skills');
    if (skillsEl && Array.isArray(data.skills)) {
      data.skills.forEach(function(skill) {
        var li = document.createElement('li');
        li.textContent = skill;
        skillsEl.appendChild(li);
      });
    }
    var interestsEl = document.querySelector('#interests');
    if (interestsEl) {
      if (Array.isArray(data.interests) && data.interests.length) {
        var ul = document.createElement('ul');
        data.interests.forEach(function(item) {
          var li = document.createElement('li');
          li.textContent = item;
          ul.appendChild(li);
        });
        interestsEl.appendChild(ul);
      } else if (Array.isArray(data.projects) && data.projects.length) {
        data.projects.forEach(function(p) {
          var article = document.createElement('article');
          var h3 = document.createElement('h3');
          h3.textContent = p.title || '';
          var pEl = document.createElement('p');
          pEl.textContent = p.description || '';
          article.appendChild(h3);
          article.appendChild(pEl);
          if (p.link) {
            var a = document.createElement('a');
            a.href = p.link;
            a.textContent = 'Odkaz';
            a.target = '_blank';
            article.appendChild(a);
          }
          interestsEl.appendChild(article);
        });
      }
    }
  })
  .catch(function(err) {
    console.error('Chyba při načítání profile.json', err);
    var container = document.querySelector('.container') || document.body;
    var errEl = document.createElement('div');
    errEl.style.color = 'red';
    errEl.textContent = 'Chyba při načítání dat profilu.';
    container.insertBefore(errEl, container.firstChild);
  });
