// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


window.addEventListener("load", () => {


   const destinationTarget = document.getElementById("missionTarget");

   const getTarget = async () => { //trying my hand at async await and anonymous fetch
      try{
         const res = await fetch(
            'https://handlers.education.launchcode.org/static/planets.json'
         );


         const data = await res.json();

         const mission = Math.floor(Math.random()*data.length); //gets a random mission from the JSON array

         destinationTarget.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${data[mission].name}</li>
            <li>Diameter: ${data[mission].diameter}</li>
            <li>Star: ${data[mission].star}</li>
            <li>Distance from Earth: ${data[mission].distance}</li>
            <li>Number of Moons: ${data[mission].moons}</li>
         </ol>
         <img src="${data[mission].image}">
         `;
      }
      catch(err){
         console.error(err);
      }
   }

   getTarget(); //actually run the fetch function


   const form = document.getElementById("launchForm");
   form.addEventListener("submit", (event)=> {
      const pilotNameInput = document.getElementById("pilotName");
      const copilotNameInput = document.querySelector("input[name=copilotName]");
      const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      const cargoMassInput = document.querySelector("input[name=cargoMass]");
      const faultyList = document.getElementById("faultyItems");


      if(pilotNameInput.value == "" || copilotNameInput.value == "" || fuelLevelInput.value == "" || 
       cargoMassInput.value == "" ){ //checks all fields have input
          alert("All fields are required before submitting.");
          event.preventDefault();
       }
       else if(isNaN(Number(fuelLevelInput.value)) === true || isNaN(Number(cargoMassInput.value)) === true){
          alert("Fuel Level and Cargo Mass must be numbers"); //validates input type
          event.preventDefault();
       }
       else{
          document.getElementById("pilotStatus").innerText = `${pilotNameInput.value}`;
          document.getElementById("copilotStatus").innerText = `${copilotNameInput.value}`;
          if(fuelLevelInput.value < 10000){
             faultyList.style.visibility = "visible";
             document.getElementById("fuelStatus").innerText = "Not enough fuel for the journey.";
             document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
             document.getElementById("launchStatus").style.color = "red";
             event.preventDefault();
          }
          else if(cargoMassInput.value > 10000){
             faultyList.style.visibility = "visible";
             document.getElementById("cargoStatus").innerText = "Too much mass for shuttle to take off";
             document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
             document.getElementById("launchStatus").style.color = "red";
             event.preventDefault();
          }
          else{
             faultyList.style.visibility = "hidden";
             document.getElementById("launchStatus").innerText = "Shuttle is ready for launch.";
             document.getElementById("launchStatus").style.color = "green";
             event.preventDefault();
          }
       }
   });
});