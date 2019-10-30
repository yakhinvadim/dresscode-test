function initMap() {
  var icon = 'resources/img/marker.svg';
  var position = { lat: 40.7077319, lng: -74.0108166 };

  // maps
  var mapOptions = {
    center: position,
    zoom: 17
  }
  var mapDesktop = new google.maps.Map(document.getElementById('map-desktop'), mapOptions);
  var mapMobile  = new google.maps.Map(document.getElementById('map-mobile'),  mapOptions);


  // markers
  var markerDesktopOptions = {
    position: position,
    map: mapDesktop,
    icon: icon
  }
  var markerMobileOptions = {
    position: position,
    map: mapMobile,
    icon: icon
  }
  var markerDesktop = new google.maps.Marker(markerDesktopOptions);
  var markerMobile =  new google.maps.Marker(markerMobileOptions);
}
