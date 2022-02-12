function updateMap()
{
  fetch("https://api.covid19api.com/summary")
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var responseObject = data;
      var sentence = data.Global.TotalConfirmed.toString()
      const answer = document.getElementById('global-box');
      console.log(sentence)

      answer.innerHTML = `<h3><u>Global Stat</u></h3><p><strong>Total Confirmed: ${data.Global.TotalConfirmed}</strong></p><p><strong>Total Deaths: ${data.Global.TotalDeaths}</strong></p>`;


      data.Countries.forEach(element =>
        {
          var confirmedMessage = "Total Confirmed: " + element.TotalConfirmed;
          var deathMessage = "Total Death: " + element.TotalDeaths;
          latLongMarking(element.Country, confirmedMessage, deathMessage)
        }
      )
    })

}

//
//
// // create DOM element for the marker
// const el = document.createElement('div');
// el.id = 'marker';

function latLongMarking(country, confirmedMessage, deathMessage)
{
  var long = 0
  var lat = 0
  fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+country+".json?limit=2&access_token=pk.eyJ1IjoiYXNocnVrYW5hIiwiYSI6ImNremg1MjdpaTBocGYydnBkOXRpMmFpcTMifQ.5Ubu6yzrnGYnv0J55IZ8nQ")
  .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      long = data.features[0].center[0];
      lat = data.features[0].center[1];

      new mapboxgl.Marker({
      draggable: false,
      color: "rgb(255, 0, 0)"
    })
    .setLngLat([long,lat])
    .setPopup(new mapboxgl.Popup().on('open', () => {
      const answer = document.getElementById('country-box');
      answer.innerHTML = `<h3><u>${country}</u></h3><p><strong>${confirmedMessage}</strong></p><p><strong>${deathMessage}</strong></p>`;
    }))
    .addTo(map);
    });
}

updateMap();
