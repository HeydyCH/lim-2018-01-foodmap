// Inicializa y agrega el mapa
// function initMap() {
//     // La ubicación de lima (-12.046200, -77.042735) 
//     var lima = { lat: -12.046200, lng: -77.042735 };
//     // El mapa, centrado en Lima
//     var map = new google.maps.Map(
//       document.getElementById('map'),
//       {
//         zoom: 4,
//         center: Lima
//       }
//     );

//     // El marcador, posicionado en Lima
//     var marker = new google.maps.Marker(
//       { position: lima,
//        map: map 
//        }
//     );
// }


var map;
 var infowindow;

 function initMap()
 {
 // Creamos un mapa con las coordenadas actuales
   navigator.geolocation.getCurrentPosition(function(pos) {

   lat = pos.coords.latitude;
   lon = pos.coords.longitude;

   var myLatlng = new google.maps.LatLng(lat, lon);

   var mapOptions = {
     center: myLatlng,
     zoom: 14,
     mapTypeId: google.maps.MapTypeId.MAPA
   };

   map = new google.maps.Map(document.getElementById("mapa"),  mapOptions);

   // Creamos el infowindow
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   var request = {
     location: myLatlng,
     radius: 5000,
     types: ['gym']
   };

   // Creamos el servicio PlaceService y enviamos la petición.
   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         crearMarcador(results[i]);
       }
     }
   });
 });
}

 function crearMarcador(place)
 {
   // Creamos un marcador
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
   });
   }