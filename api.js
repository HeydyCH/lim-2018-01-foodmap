let map;
let infowindow;


    function initMap() {

      navigator.geolocation.getCurrentPosition(function (pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        var pyrmont = new google.maps.LatLng(lat, lon);

        var mapOptions = {
          center: pyrmont,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.MAPA
        };

        map = new google.maps.Map(document.getElementById("map"), mapOptions);


        infowindow = new google.maps.InfoWindow();
   
        let request = {
          location: pyrmont,
          radius: '500',
          query: 'comida mexicana'
        };

        // Creamos el servicio PlaceService y enviamos la petición.

        var service = new google.maps.places.PlacesService(map);
        console.log(service)
        // service.findPlaceFromQuery(request, callback);
        service.textSearch(request, callback);

      });

      // -------------------------------------------


    }

    function callback(results, status) {
      console.log(results)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
      });

      console.log(place.name);
    }