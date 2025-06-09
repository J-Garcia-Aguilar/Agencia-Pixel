document.addEventListener('DOMContentLoaded', () => {
    // Coordenadas de la empresa (Madrid)
    const businessCoords = [40.416775, -3.703790]; // Lat, Lng
  
    // Inicializar mapa y centrar en la empresa
    const map = L.map('map').setView(businessCoords, 13);
  
    // Cargar los tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Marcador de la empresa
    L.marker(businessCoords)
      .addTo(map)
      .bindPopup('Agencia Pixel<br>Calle Falsa 123, Madrid')
      .openPopup();
  
    // Intentar obtener ubicación del cliente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userCoords = [position.coords.latitude, position.coords.longitude];
  
        // Marcador de la ubicación del cliente
        L.marker(userCoords)
          .addTo(map)
          .bindPopup('Tu ubicación')
          .openPopup();
  
        // Trazar ruta entre cliente y empresa
        L.Routing.control({
          waypoints: [
            L.latLng(userCoords[0], userCoords[1]),
            L.latLng(businessCoords[0], businessCoords[1])
          ],
          lineOptions: {
            styles: [{ color: 'blue', opacity: 0.6, weight: 4 }]
          },
          createMarker: (i, waypoint) => {
            return L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })
            });
          },
          routeWhileDragging: false,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
        }).addTo(map);
      }, err => {
        console.warn('Geolocalización fallida:', err.message);
      });
    } else {
      console.warn('Geolocalización no soportada por el navegador.');
    }
  });