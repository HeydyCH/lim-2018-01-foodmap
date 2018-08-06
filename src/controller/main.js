var map;
var infowindow;

let img = document.getElementById("img_rpta");
let name = document.getElementById("nameLugar");


function initMap() {
  // Creamos un mapa con las coordenadas actuales
  navigator.geolocation.getCurrentPosition(function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    var myLatlng = new google.maps.LatLng(lat, lon);

    var mapOptions = {
      center: myLatlng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.MAPA
    };

    map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

    // Creamos el infowindow
    infowindow = new google.maps.InfoWindow();

    // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
    var request = {
      location: myLatlng,
      radius: 5000,
      types: ['cafe']
    };

    // Creamos el servicio PlaceService y enviamos la petición.
    var service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          crearMarcador(results[i]);
        }
      }
    });
  });
}

function crearMarcador(place) {
  // Creamos un marcador
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
    
  });

  name.innerHTML +=`
      <h5> ${place.name}</h3>
      `
  if (place.photos) {
    // alert(place.photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 350 }));
    console.log(place.photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 350 }))
    let url = place.photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 350 }) ;  
    // console.log(place)
    // console.log(place.icon)
    console.log(place.name)
    // console.log(place.photos[0].getUrl())  
    name.innerHTML +=`
    <img src=${url} alt="Logotipo de HTML5" width="400" height="453">`
  }

  name.innerHTML +=`<hr>`


  // Asignamos el evento click del marcador
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
    let name = place.name
    img.innerHTML=`
      <h3> El nombre es : ${name}</h3>`    
  });
}