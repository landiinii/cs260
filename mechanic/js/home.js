let headers = {
  "Authorization":"Basic NjBmM2I2OTAtNDgzMy00NDEyLTk1Y2MtM2RhZjBkYjRkM2Jl",
  "partner-token":"1a96f94ebd8c48dda7243cbf34ef0dfb	"
};

document.getElementById("vinSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const vin = document.getElementById("vinInput").value;
  const mileage = document.getElementById("carMileageVin").value;
  if (vin === "" || mileage ==="")
    return;
  console.log(vin, mileage);
  const vindecodeurl = "http://api.carmd.com/v3.0/decode?vin=" + vin;
  fetch(vindecodeurl, {
    "headers": headers,
  })
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      if(json.data !== null){
        document.getElementById("carMake").value = json.data.make;
        document.getElementById("carModel").value = json.data.model;
        document.getElementById("carYear").value = json.data.year;
        document.getElementById("carMileage").value = mileage;
      }

      const maintenanceurl = "http://api.carmd.com/v3.0/maint?vin=" + vin + "&mileage=" + mileage;
      fetch(maintenanceurl, {
        "headers": headers,
      })
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          console.log(json);
          showMaintenance(json);
        });
    });
});


document.getElementById("carSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const year = document.getElementById("carYear").value;
  const make = document.getElementById("carMake").value;
  const model = document.getElementById("carModel").value;
  const mileage = document.getElementById("carMileage").value;
  if (year === "" || make === "" || model === "" || mileage ==="")
    return;
  console.log(year, make, model, mileage);
  const maintenanceurl = "http://api.carmd.com/v3.0/maintlist?year="+ year + "&make=" + make + "&model=" + model;
  fetch(maintenanceurl, {
    "headers": headers,
  })
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      showMaintenance(json);
    });
});





function showMaintenance(json){
  if(json.data === null){
    document.getElementById("maintenanceInfo").innerHTML = "<h4>The service that provides this information limits this website to a certain number of Requests per month, unfortunately this limit has already been exceded and no information is available for your car right now. Try back next month!</h4>";
    return;
  }
  let maint = json.data;
  let meee = {};
  let other = [];
  let price = 0;
  for (let i=0; i<maint.length; i++){
    if(maint[i].desc === "Change Engine Oil and Filter" || maint[i].desc === "Inspect Brake System, Friction Material & Hydraulic System" || maint[i].desc === "Replace Spark Plugs" || maint[i].desc === "Replace Engine Air Filter"){
      meee[maint[i].desc] = maint[i];
    }
    else{
      other.push(maint[i].desc);
      price += maint[i].repair.total_cost;
    }
  }
  console.log(other);
  let output = "";
  if(Object.keys(meee) === 0){
    output += "<h4>No repairs need to be done right now.</h4>";
  }
  else{
    output += "<h4>Repairs You Need to Get Done: </h4>";
    output += "<div class=\"grid\">";
    if("Change Engine Oil and Filter" in meee){
      output += "<div class=\"grid-item\"><a href=\"../pages/oilchange.html\"> <img src=\"/images/oilchange.jpg\"> <h5>Oil Change</h5> </a></div>";
    }
    if("Inspect Brake System, Friction Material & Hydraulic System" in meee){
      output += "<div class=\"grid-item\"><a href=\"../pages/brakepads.html\"> <img src=\"/images/brakepad.jpg\"> <h5>Brake Pads</h5> </a></div>";
    }
    if("Replace Engine Air Filter" in meee){
      output += "<div class=\"grid-item\"><a href=\"../pages/airfilter.html\"> <img src=\"/images/airfilter.jpg\"> <h5>Air Filter</h5> </a></div>";
    }
    if("Replace Spark Plugs" in meee){
      output += "<div class=\"grid-item\"><a href=\"../pages/sparkplugs.html\"> <img src=\"/images/sparkplug.jpg\"> <h5>Spark Plugs</h5> </a></div>";
    }
    output += "</div>";
  }
  document.getElementById("maintenanceInfo").innerHTML = output;
}


//4S2CM58W8W4357438
