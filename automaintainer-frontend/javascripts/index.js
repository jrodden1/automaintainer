//Globals 
const newVehicleForm = document.querySelector("#new-vehicle-form")
const newMaintEventForm = document.querySelector("#new-maintevent-form")

document.addEventListener("DOMContentLoaded", function() {   
   //Enables the Welcome callout on the new Vehicle button when no vehicles at all
   $('.tap-target').tapTarget();
   
   //Format Inputs
   setDefaultAndMaxYearInputRangeOnForms()
   
   //Event Listeners
   newVehicleForm.addEventListener("submit", Vehicle.createNewVehicle)
   newMaintEventForm.addEventListener("submit", MaintEvent.createNewMaintEvent)
   
   //Actions
   //display all vehicles and their maintEvents to the DOM
   Vehicle.displayAllVehicles
   
   //Add ability for the cancel button to clear out their respective forms
   const vehicleFormCancelBtn = document.querySelector("#cancel-new-vehicle")
   vehicleFormCancelBtn.addEventListener("click", Vehicle.clearNewVehicleForm)
   
   const maintEventFormCancelBtn = document.querySelector("#cancel-new-maint-event")
   maintEventFormCancelBtn.addEventListener("click", MaintEvent.clearNewMaintEventForm)
   
   //Sets the max year for respective inputs
   function setDefaultAndMaxYearInputRangeOnForms() {
      const rightNow = new Date()
      const thisYear = new Date().getFullYear()
      const maxYear = thisYear + 1
      
      //then set the max year for new Vehicle input form
      const newVehicleYearInput = document.querySelector("#year")
      newVehicleYearInput.setAttribute("max", maxYear)
      //next 2 lines commented out so that the user must input a date instead of suggesting this year as the current date. 
      //newVehicleYearInput.setAttribute("value", thisYear)
   
      //Then set the max date for when Maint Event can be done. 
      const newMaintEventCompletedInput = document.querySelector("#completed")
      
      let nowYear = rightNow.getFullYear()
      //logic here to add a 0 if its less than 10 for month or date(day) 
      let nowMonth = ((rightNow.getMonth() + 1) < 10 ? `0${rightNow.getMonth()}` : `${rightNow.getMonth() + 1}`)
      let nowDayOfMonth = (rightNow.getDate() < 10 ? `0${rightNow.getDate()}` : `${rightNow.getDate()}`)
   
      newMaintEventCompletedInput.setAttribute("max", `${nowYear}-${nowMonth}-${nowDayOfMonth}`)
   }
});
