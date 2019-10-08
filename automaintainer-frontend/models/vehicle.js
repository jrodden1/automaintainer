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
      dataAppender("Maintenance Events")
      
      //need to then create up a UL for the maintenance events list for vehicle X then add LI's for each one
      const maintEventsUl = document.createElement("ul")
      maintEventsUl.setAttribute("id", `data-events-for-vehicle-${this.id}`)
      maintEventsUl.className = "collapsible popout"

      MaintEvent.createMaintEventElements(this.maintEvents, maintEventsUl)

      vehicleDetailsElem.appendChild(maintEventsUl)

      function dataAppender(descriptionStr, data = " ") {
         const dataElem = document.createElement("p")
         dataElem.textContent = `${descriptionStr}: ${data}`
         vehicleDetailsElem.appendChild(dataElem)
      }

      return newVehicleElement
   }
}