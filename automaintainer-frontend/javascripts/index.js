//Globals 
const vehicleListUl = document.querySelector("#vehicle-list")
const newVehicleForm = document.querySelector("#new-vehicle-form")
const newMaintEventForm = document.querySelector("#new-maintevent-form")

document.addEventListener("DOMContentLoaded", function() {   
   //Fn to always get the current year as the default value for the year input on the new Vehicle form
   //Also sets the max year on the form to this year + 1
   function setDefaultAndMaxYearInputRange() {
      const thisYear = new Date().getFullYear()
      const maxYear = thisYear + 1
      const newVehicleYearInput = document.querySelector("#year")
      newVehicleYearInput.setAttribute("max", maxYear)
      newVehicleYearInput.setAttribute("value", thisYear)
   }
   //Format Inputs
   setDefaultAndMaxYearInputRange()

   //Event Listeners
   newVehicleForm.addEventListener("submit", Vehicle.createNewVehicle)
   newMaintEventForm.addEventListener("submit", MaintEvent.createNewMaintEvent)
   //Actions
   //display all vehicles and their maintEvents to the DOM
   Vehicle.displayAllVehicles
   
});

