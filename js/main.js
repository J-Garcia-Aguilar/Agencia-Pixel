document.addEventListener('DOMContentLoaded', () => {
    const newsList = document.getElementById('news-list');
    fetch('./data/noticias.json')
      .then(resp => {
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        return resp.json();
      })
      .then(noticias => {
        noticias.forEach(({ titulo, fecha, resumen }) => {
          const li = document.createElement('li');
          const h3 = document.createElement('h3');
          const time = document.createElement('time');
          const p = document.createElement('p');
  
          h3.textContent = titulo;
          time.textContent = new Date(fecha)
            .toLocaleDateString('es-ES', { year:'numeric', month:'long', day:'numeric' });
          p.textContent = resumen;
  
          li.append(h3, time, p);
          newsList.appendChild(li);
        });
      })
      .catch(err => console.error('Error al cargar noticias:', err));
  });