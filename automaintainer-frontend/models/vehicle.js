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

   static createNewVehicle(event) {
      event.preventDefault()

      const year = event.currentTarget.querySelector("#year").value
      const make = event.currentTarget.querySelector("#make").value
      const model = event.currentTarget.querySelector("#model").value
      const color = event.currentTarget.querySelector("#color").value
      const owner = event.currentTarget.querySelector("#owner").value
      const vin = event.currentTarget.querySelector("#vin").value
      
      const newVehicleObject = {
         vehicle: {
            year: year,
            make: make,
            model: model,
            color: color,
            owner: owner,
            vin: vin
         }
      }

      const postOptionsObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(newVehicleObject)
      }
      
      //Need to verify this is working correctly - REFACTOR
      fetch("http://localhost:3000/vehicles", postOptionsObj)
         .then(resp => resp.json())
         .then(newVehicleData => {
            let newVehicleInst = new Vehicle(newVehicleData)
            newVehicleInst.renderVehicle()
         })
         .catch(error => console.log(error))
   }

   static get displayAllVehicles() {
      fetch("http://localhost:3000" + "/vehicles")
         .then(resp => resp.json())
         .then(vehicles => Vehicle.createVehicleElements(vehicles))
         .catch(error => renderError(error))
   }

   static createVehicleElements(vehicleObjsArr) {
      if(vehicleObjsArr.length === 0) {
         //select the fixed action button and make it pulse 
         // put in some grey text that says to add a vehicle to get started 
      } else {
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

   renderVehicle() {
      const vehicleListUl = document.querySelector("#vehicle-list")
      const vehicleElement = this.createVehicleElement()
      vehicleListUl.appendChild(vehicleElement)
   }

   createVehicleElement() {
      const newVehicleElement = document.createElement("li")
      newVehicleElement.setAttribute("id", `data-vehicle-${this.id}`)
      newVehicleElement.innerHTML = 
         `<div class="collapsible-header"><i class="material-icons">directions_car</i><strong>${this.year} ${this.make} ${this.model}</strong></div>
         <div class="collapsible-body"></div>`
      
      const vehicleDetailsElem = newVehicleElement.querySelector(".collapsible-body")

      this.owner ? dataAppender("Owner", this.owner) : console.log("No Owner Specified")
      this.vin ? dataAppender("VIN", this.vin) : console.log("No VIN Specified")
      dataAppender("Color", this.color)
      // can use data appender to add the total cost of all the maintenance items here if I have time
      //Adds heading for maintenance events
      const maintEventsP = dataAppender("Maintenance Events", " ", true, `me-header-for-vehicle-${this.id}`)
      //need to then create up a UL for the maintenance events list for vehicle X then add LI's for each one
      const maintEventsUl = document.createElement("ul")
      maintEventsUl.setAttribute("id", `data-events-for-vehicle-${this.id}`)
      maintEventsUl.setAttribute("style", "display: none;")
      maintEventsUl.className = "collapsible popout"

      if(maintEventsPresent(this.maintEvents)) {
         maintEventsP.setAttribute("style", "display: block;")
         maintEventsUl.setAttribute("style", "display: block;")
         MaintEvent.createMaintEventElements(this.maintEvents, maintEventsUl)
      }
      vehicleDetailsElem.appendChild(maintEventsUl)

      //Create new Maintenance Event button
      let newMaintEventButton = document.createElement("a")
      newMaintEventButton.setAttribute("id", `new-veh-main-ev-btn-${this.id}`)
      newMaintEventButton.className = "btn red modal-trigger"
      newMaintEventButton.setAttribute("href", "#modal2")
      newMaintEventButton.textContent = "Create New Maintenance Event"
      newMaintEventButton.addEventListener("click", setVehicleIdOnNewMEForm)
      vehicleDetailsElem.appendChild(newMaintEventButton)

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

      function setVehicleIdOnNewMEForm(event) {
         const currentVehicleId = this.parentElement.parentElement.getAttribute("id").split("data-vehicle-")[1]
         const hiddenVehicleId = document.querySelector("#for-vehicle")
         hiddenVehicleId.value = currentVehicleId
      }

      function maintEventsPresent(maintEventsArr) {
         let eventsPresent = false 
         if(maintEventsArr) {
            maintEventsArr.length > 0 ? eventsPresent = true : console.log("No MaintEvents Found")
         }
         return eventsPresent 
      }
      
      return newVehicleElement
   }
}