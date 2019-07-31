var console = require('console');

function getDistance(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  
  return parseInt(d*1000);
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports.function = function ShowCurrentLocation (currentLocation) {
  var latitude = currentLocation.point.latitude;
  var longitude = currentLocation.point.longitude;
  
  const secret = require('secret');
  const config = require('config');
  const http = require('http');
  var key = secret.get('apiKey');
  var options = { 
    format: 'json',
   headers:{'Accept':'application/json',
           'x-api-key': key}
  };
  var url = "https://bscn38ryf9.execute-api.ap-northeast-2.amazonaws.com/api/bathroom?";
  url += encodeURI("latitude=") + String(latitude);
  url += encodeURI("&longitude=") + String(longitude);
  url += "&range=0.01";
  var response = http.getUrl(url, options);
  response = JSON.parse(response.body);
  
  for(var i=0; i < response.length; ++i) {
    response[i]["distance"] = getDistance(latitude, longitude, response[i].위도, response[i].경도);
  }
  
  response.sort(function(a, b) {
    return a["distance"] - b["distance"];
  });
  
  if(response.length == 0) {
      LocationInfo0 = {'currentLocation': {'point': {'latitude': latitude, 'longitude': longitude}},
                 'bathroomLocation': {'point': {'latitude': 0.0, 'longitude': 0.0}},
                 'opentime': "0",
                 'distance': "0",
                 'mapAPI': "none"};
    
    var bathrooms = [LocationInfo0];
  }
  
  if(response.length  >= 1) {
  var mapAPI = "daummaps://route?sp="+String(latitude)+","+String(longitude)+"&ep="+String(response[0].위도)+","+String(response[0].경도)+"&by=FOOT";
  
  LocationInfo1 = {'currentLocation': {'point': {'latitude': latitude, 'longitude': longitude}},
                 'bathroomLocation': {'point': {'latitude': response[0].위도, 'longitude': response[0].경도}},
                 'opentime': response[0].개방시간,
                 'distance': response[0].distance,
                 'mapAPI': mapAPI};
    
    var bathrooms = [LocationInfo1];
  }
  
  if(response.length >= 2) {
mapAPI = "daummaps://route?sp="+String(latitude)+","+String(longitude)+"&ep="+String(response[1].위도)+","+String(response[1].경도)+"&by=FOOT";
  
  LocationInfo2 = {'currentLocation': {'point': {'latitude': latitude, 'longitude': longitude}},
                 'bathroomLocation': {'point': {'latitude': response[1].위도, 'longitude': response[1].경도}},
                 'opentime': response[1].개방시간,
                 'distance': response[1].distance,
                 'mapAPI': mapAPI};
    
    var bathrooms = [LocationInfo1, LocationInfo2];
  }
  
  if(response.length >= 3) {
mapAPI = "daummaps://route?sp="+String(latitude)+","+String(longitude)+"&ep="+String(response[2].위도)+","+String(response[2].경도)+"&by=FOOT";
  
  LocationInfo3 = {'currentLocation': {'point': {'latitude': latitude, 'longitude': longitude}},
                 'bathroomLocation': {'point': {'latitude': response[2].위도, 'longitude': response[2].경도}},
                 'opentime': response[2].개방시간,
                 'distance': response[2].distance,
                 'mapAPI': mapAPI};
  
  var bathrooms = [LocationInfo1, LocationInfo2, LocationInfo3];
  }
  
  return bathrooms;
}