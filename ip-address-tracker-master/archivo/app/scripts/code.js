

var mymap = L.map('map').setView([51.505, -0.09], 13);
var marker = L.marker([51.505, -0.09]).addTo(mymap);
var circle = L.circle([51.505, -0.09], {
    color: 'hsl(200, 60%, 59%)',
    fillColor: 'hsl(200, 60%, 75%)',
    fillOpacity: 0.5,
    radius: 1000
}).addTo(mymap);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicHV3aWlpIiwiYSI6ImNrbG1ybnkwMTBiejEybm84Zzh2MmoxcHkifQ.Cd71E5GLNG65nlDSWRkqvA'
}).addTo(mymap);

makeRequest('https://geo.ipify.org/api/v1?apiKey=at_e4YQNgmga3KUJ70jdLjxLlfxaB8Sl&ipAddress=')

let button = document.querySelector('#button')

button.addEventListener('click', (e)=>{
    e.preventDefault();

    let ip = document.querySelector('#ipInput').value

    if(ip==='') return;

    let apiRequest = 'https://geo.ipify.org/api/v1?apiKey=at_e4YQNgmga3KUJ70jdLjxLlfxaB8Sl&ipAddress='
    let ipRequest = ip;
    let request = apiRequest.concat(ip);

    makeRequest(request)
    
})

function makeRequest(request){
    let main = document.querySelector('.main')
    main.classList.add('loading')
    fetch(request)
    .then(res => res.json())
    .then(data => {
        main.classList.remove('loading')
        if (data.code === 422) {
            alert('Ingrese una IP valida') 
        }
        else{
            let ipAddress = document.getElementById('ipAddress')
            let location = document.getElementById('location')
            let timeZone = document.getElementById('timeZone')
            let isp = document.getElementById('isp')

            ipAddress.innerText = data.ip

            let region = data.location.region + ', '
            let city = data.location.city

            location.innerText = region.concat(city)

            timeZone.innerText = data.location.timezone

            isp.innerText = data.isp

            mymap.setView([data.location.lat, data.location.lng], 14)
            marker.setLatLng([data.location.lat, data.location.lng])
            marker.bindPopup("<b>Hey!</b><br>Nice neighborhood.").openPopup()
            circle.setLatLng([data.location.lat, data.location.lng])
        }
    }
    )
    
}






