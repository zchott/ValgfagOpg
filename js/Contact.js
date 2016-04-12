var options;
window.onload = function () {
    document.addEventListener('deviceready',init,false);
};
function init() {
    document.getElementById("AddContactBtn").addEventListener("click",AddContact);
    options = {
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    document.getElementById("directionsPanel").innerHTML = "";
    navigator.geolocation.getCurrentPosition(success,failure,options);
}
function success(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var alt = position.coords.altitude;
    var accuracy = position.coords.accuracy;
    var timeS = position.timeStamp;

    

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    
    var mapOptions = { center: { lat: lat, lng: long }, zoom: 10 }
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("directionsPanel"));
    //var marker = new google.maps.Marker({ position: { lat: lat, lng: long }, Map: map });
    var start = lat + "," + long;
    var end = "56.149402,10.205281";
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

}

function failure(message) {
    alert(messsage);
}
function AddContact() {
    var first = "Two";
    var last = "space";
    var emailAdress = "kundeservice@two-space.com";
    var phoneNumber = "20452312";
    var newContact = navigator.contacts.create();
    newContact.displayName = first + "-" + last;
    newContact.nickname = first + " " + last;
    var name = new ContactName();
    name.givenName = first;
    name.familyName = last;
    newContact.name = name;
    var email = [];
    email[0] = new ContactField('home', emailAdress, true);
    newContact.emails = email;
    var phoneNums = [];
    phoneNums[0] = new ContactField('home', phoneNumber, true);
    newContact.phoneNumbers = phoneNums;
    newContact.save();
    document.getElementById("AddContactBtn").removeEventListener("click",AddContact);


}