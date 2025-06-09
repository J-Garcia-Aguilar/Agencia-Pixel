// js/galeria.js

window.addEventListener('DOMContentLoaded', () => {
    // Rutas de imágenes de muñecos
    const images = [
      './img/superhero1.jpg',
      './img/superhero2.jpg',
      './img/superhero3.jpg',
      './img/superhero4.jpg',
      './img/superhero5.jpg',
      './img/superhero6.jpg',
      './img/superhero7.jpg'
    ];
  
    const container = document.getElementById('gallery-container');
    if (!container) {
      console.error('No se encontró el contenedor #gallery-container');
      return;
    }
  
    // Limpiar contenido existente y preparar contenedor
    container.innerHTML = '';
    Object.assign(container.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    });
  
    // Crear botones de navegación
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&larr;';
    Object.assign(prevBtn.style, {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      zIndex: '1'
    });
  
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&rarr;';
    Object.assign(nextBtn.style, {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      zIndex: '1'
    });
  
    // Crear imagenes del carrusel (4 visibles)
    const imgEls = [];
    for (let i = 0; i < 4; i++) {
      const img = document.createElement('img');
      Object.assign(img.style, {
        flex: '0 0 22%',
        height: 'auto',
        margin: '0 1%',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer'
      });
      img.alt = `Muñeco de superhéroe ${i + 1}`;
      imgEls.push(img);
      container.appendChild(img);
    }
    container.append(prevBtn, nextBtn);
  
    let currentIndex = 0;
  
    // Actualizar las 4 imágenes mostradas
    const updateImages = () => {
      imgEls.forEach((img, idx) => {
        const pos = (currentIndex + idx) % images.length;
        img.src = images[pos];
      });
    };
  
    // Eventos de navegación
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 4 + images.length) % images.length;
      updateImages();
    });
  
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 4) % images.length;
      updateImages();
    });
  
    // Inicializar carrusel
    updateImages();
  });