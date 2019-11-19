class Vehicle {
   constructor(data) {
      this.id = data.id
      this.year = data.year
      this.make = data.make
      this.model = data.model
      this.color = data.color
      this.owner = data.owner
      this.maintEvents = data.maint_events 
      this.vin = data.vin
      Vehicle.all.push(this)
   }
   
   static all = []

   //AJAX call to backend to create a new Vehicle & render it to the DOM
   static createNewVehicle(event) {
      //prevent submit button from doing its normal thing
      event.preventDefault()

      //select all my newVehicle input elements
      const year = document.querySelector("#year")
      const make = document.querySelector("#make")
      const model = document.querySelector("#model")
      const color = document.querySelector("#color")
      const owner = document.querySelector("#owner")
      const vin = document.querySelector("#vin")
      
      //Create my new vehicle object from my input element values 
      const newVehicleObject = {
         vehicle: {
            year: year.value,
            make: make.value,
            model: model.value,
            color: color.value,
            owner: owner.value,
            vin: vin.value
         }
      }

      //create my POST options object for my fetch to the backend
      const postOptionsObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(newVehicleObject)
      }

      //perform AJAX POST fetch for a new vehicle, create a new instance of the vehicle, render it, then close the new form modal and clear the form
      fetch("http://localhost:3000/vehicles", postOptionsObj)
         .then(resp => resp.json())
         .then(newVehicleData => {
            let newVehicleInst = new Vehicle(newVehicleData)
            newVehicleInst.renderVehicle()
            $('.modal').modal('close');
            Vehicle.clearNewVehicleForm()
         })
         .catch(error => {
            const errorObj = { 
               error: error,
               from: "Create New Vehicle Error"
            }
            renderError(errorObj)
         })
   }

   //Class method run on DOMContentLoaded - AJAX call to backend to get and render show all existing Vehicles
   static get displayAllVehicles() {
      fetch("http://localhost:3000" + "/vehicles")
         .then(resp => resp.json())
         .then(vehicles => Vehicle.createVehicleElements(vehicles))
         .catch(error => {
            const errorObj = { 
               error: error,
               from: "Render All Vehicles Error"
            }
            renderError(errorObj)
         })
   }

   //Class method that will render all vehicle objects to the DOM OR if there are no vehicles (empty array), then show the helper callout with instructions
   static createVehicleElements(vehicleObjsArr) {
      if(vehicleObjsArr.length === 0) {
         //show helper callout with instructions if no vehicles at all
         $('.tap-target').tapTarget('open')
      } else {
         //show the vehicle list <ul> since we have a vehicle now.
         document.querySelector("#vehicle-list").setAttribute("style", "display: block;")
         //process through each vehicle object, create a vehicle instance, then render the vehicle. 
         vehicleObjsArr.forEach(vehicleData => {
            let newVehicleInst = new Vehicle(vehicleData)
            newVehicleInst.renderVehicle()
         });
      }
      //Enables Materialize Collapsible, Dropdown, Modal, floatingActionButton after creating all the elements
      $('.collapsible').collapsible();
      $(".dropdown-trigger").dropdown({ hover: false});
      $('.fixed-action-btn').floatingActionButton({ hoverEnabled: false});
      $('.modal').modal();
   }

   //creates the vehicle element, turns on the vehicleListUl and then appends that vehicle element to that UL
   renderVehicle() {
      const vehicleListUl = document.querySelector("#vehicle-list")
      const vehicleElement = this.createVehicleElement()
      vehicleListUl.setAttribute("style", "display: block;")
      vehicleListUl.appendChild(vehicleElement)
   }

   //instance method that does the dirty work of making up the HTML element for a vehicle.
   createVehicleElement() {
      const newVehicleElement = document.createElement("li")
      newVehicleElement.setAttribute("id", `data-vehicle-${this.id}`)
      newVehicleElement.innerHTML = 
         `<div class="collapsible-header"><i class="material-icons">directions_car</i><strong>${this.year} ${this.make} ${this.model}</strong></div>
         <div class="collapsible-body"></div>`
      
      const vehicleDetailsElem = newVehicleElement.querySelector(".collapsible-body")
      //If I have optional owner and vin data, then display it, otherwise, just console log that there was no owner or vin
      this.owner ? dataAppender("Owner", this.owner) : console.log("No Owner Specified")
      this.vin ? dataAppender("VIN", this.vin) : console.log("No VIN Specified")
      //create up color data p tag and append it to the vehicleDetailsElem
      dataAppender("Color", this.color)

      // can use data appender to add the total cost of all the maintenance items here if I have time
      // not implementing in MVP for right now.

      //Adds heading for maintenance events
      const maintEventsP = dataAppender("Maintenance Events", " ", true, `me-header-for-vehicle-${this.id}`)
      //need to then create up a UL for the maintenance events list for vehicle X then add LI's for each one
      const maintEventsUl = document.createElement("ul")
      maintEventsUl.setAttribute("id", `data-events-for-vehicle-${this.id}`)
      //initially turns off the maintEventsUl until its needed
      maintEventsUl.setAttribute("style", "display: none;")
      maintEventsUl.className = "collapsible popout"

      //checks to see if I have any existing maint events for this vehicle, if so, turn on my maintevents P "header" and my maintEventsUl 
      //then go to town creating up the individual maintEvents and append them to the maintEventsUl
      if(maintEventsPresent(this.maintEvents)) {
         maintEventsP.setAttribute("style", "display: block;")
         maintEventsUl.setAttribute("style", "display: block;")
         MaintEvent.createMaintEventElements(this.maintEvents, maintEventsUl)
      }
      //After all that then append the maintEventsUl (even if hidden and empty at this point.)
      vehicleDetailsElem.appendChild(maintEventsUl)

      //Create new Maintenance Event button and link it to the modal (so the modal will know which vehicle is asking for a new MaintEvent)
      const newMaintEventButton = document.createElement("a")
      newMaintEventButton.setAttribute("id", `new-veh-main-ev-btn-${this.id}`)
      newMaintEventButton.className = "btn red darken-2 modal-trigger"
      newMaintEventButton.setAttribute("href", "#modal2")
      newMaintEventButton.textContent = "Create New Maintenance Event"
      newMaintEventButton.addEventListener("click", setVehicleIdOnNewMEForm)
      //finally add the newMaintEventButton to the VehicleDetails Area
      vehicleDetailsElem.appendChild(newMaintEventButton)

      //function used to append P tag vehicle detail data to the vehicleDetailselement
      function dataAppender(descriptionStr, data = " ", hidden = false, idAttributeStr = null) {
         const dataElem = document.createElement("p")
         dataElem.textContent = `${descriptionStr}: ${data}`
         if(hidden) {
            dataElem.setAttribute("style", "display: none;")
         }

         if(idAttributeStr) {
            dataElem.setAttribute("id", idAttributeStr)
         }

         vehicleDetailsElem.appendChild(dataElem)
         return dataElem
      }
      
      //returns the newVehicleElement
      return newVehicleElement

      //Enables the newMaintEvent modal to know for which vehicle it should make up the MaintEvent
      function setVehicleIdOnNewMEForm(event) {
         const currentVehicleId = this.parentElement.parentElement.getAttribute("id").split("data-vehicle-")[1]
         const hiddenVehicleId = document.querySelector("#for-vehicle")
         hiddenVehicleId.value = currentVehicleId
      }

      //Checks to see if the maintEventsArr has any events in it. 
      function maintEventsPresent(maintEventsArr) {
         let eventsPresent = false 
         if(maintEventsArr) {
            maintEventsArr.length > 0 ? eventsPresent = true : console.log("No MaintEvents Found")
         }
         return eventsPresent 
      }
   }

   //Class method used to clear out the newVehicleForm from data as well as class valid/invalid formatting
   static clearNewVehicleForm() {
      const yearInputField = document.querySelector("#year")
      const makeInputField = document.querySelector("#make")
      const modelInputField = document.querySelector("#model")
      const colorInputField = document.querySelector("#color")
      const ownerInputField = document.querySelector("#owner")
      const vinInputField = document.querySelector("#vin")

      yearInputField.value = ""
      yearInputField.classList.remove("valid")
      yearInputField.classList.remove("invalid")

      makeInputField.value = ""
      makeInputField.classList.remove("valid")
      makeInputField.classList.remove("invalid")
      
      modelInputField.value = ""
      modelInputField.classList.remove("valid")
      modelInputField.classList.remove("invalid")
      
      colorInputField.value = ""
      colorInputField.classList.remove("valid")
      colorInputField.classList.remove("invalid")
      
      vinInputField.value = ""
      vinInputField.classList.remove("valid")
      vinInputField.classList.remove("invalid")
      
      //there are no validations on owner at the moment 
      ownerInputField.value = ""
      
      console.log("New Vehicle Form Cleared")
   }
}