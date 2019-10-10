//Globals 
const newVehicleForm = document.querySelector("#new-vehicle-form")
const newMaintEventForm = document.querySelector("#new-maintevent-form")

document.addEventListener("DOMContentLoaded", function() {   
   //Fn to always get the current year as the default value for the year input on the new Vehicle form
   //Also sets the max year on the form to this year + 1
     
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
      //may need to add logic here to add a 0 if its less than 10 for month or date(day) 
      let nowYear = rightNow.getFullYear()
      let nowMonth = ((rightNow.getMonth() + 1) < 10 ? `0${rightNow.getMonth()}` : `${rightNow.getMonth() + 1}`)
      let nowDayOfMonth = (rightNow.getDate() < 10 ? `0${rightNow.getDate()}` : `${rightNow.getDate()}`)

      newMaintEventCompletedInput.setAttribute("max", `${nowYear}-${nowMonth}-${nowDayOfMonth}`)
   }
   //Format Inputs
   setDefaultAndMaxYearInputRangeOnForms()

   
   //Event Listeners
   newVehicleForm.addEventListener("submit", Vehicle.createNewVehicle)
   newMaintEventForm.addEventListener("submit", MaintEvent.createNewMaintEvent)
   //Actions
   //display all vehicles and their maintEvents to the DOM
   Vehicle.displayAllVehicles
   
});

