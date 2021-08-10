$(function() {
    var map = L.map(document.getElementById('mapid'), {
        center: [-20.1434, -44.1301],
        zoom: 15,
        boxZoom: false,
        zoomControl: false,
        attributionControl: false,
        keyboard: false,
        scrollWheelZoom	: true,
        preferCanvas: false,
        tap: false,
        touchZoom: true,
        dragging: true,
        doubleClickZoom: false,
    });
    
    var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        });
        basemap.addTo(map);
    
    var myIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });
    
    L.marker([-20.1438, -44.1301], {icon: myIcon}).addTo(map);
    
    
    $( "#searchForm" ).submit(function( event ) {
        event.preventDefault();
        let valueAddress = $("#IP").val();
        var api_key = "at_D2hLhnFSVyrUsSSBcKFzPCTzKTuWd";
    
      
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, domain: valueAddress},
            success: function(data) {
    
                $(".ipAddress").text(data.ip);
                $(".location").text(data.location.region + ", " + data.location.country + " " + data.location.postalCode);
                $(".timezone").text("UTC " + data.location.timezone);
                $(".ISP").text("UTC " + data.isp);
    
                map.panTo(L.latLng(data.location.lat, data.location.lng));
                
                L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map);
            }
        });
    });

 });



