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
   }
   
   static get displayAllVehicles() {
      fetch("http://localhost:3000" + "/vehicles")
         .then(resp => resp.json())
         .then(vehicles => Vehicle.createVehicleElements(vehicles))
         .catch(error => renderError(error))
   }

   static createVehicleElements(vehicleObjsArr) {
      vehicleObjsArr.forEach(vehicleData => {
         let newVehicleInst = new Vehicle(vehicleData)
         newVehicleInst.renderVehicle()
      });
   }

   renderVehicle() {
      const vehicleElement = this.createVehicleElement()
      debugger
      vehicleListUl.appendChild(vehicleElement)
   }

   createVehicleElement() {
      const newVehicleElement = document.createElement("li")
      newVehicleElement.setAttribute("id", `data-vehicle-${this.id}`)
      newVehicleElement.innerHTML = 
         `<div class="collapsible-header"><i class="material-icons">directions_car</i><strong>${this.year} ${this.make} ${this.model}</strong></div>
         <div class="collapsible-body"></div>`
      
      const elementBody = newVehicleElement.querySelector(".collapsible-body")
      // should be able to abstract the work that is done if the attribute is true into its own function to DRY this up
      if(this.owner) {
         dataAppender("Owner", this.owner)
      }

      if(this.vin) {
         dataAppender("VIN", this.vin)
      }
      dataAppender("Color", this.color)
      // can use data appender to add the total cost of all the maintenance items here if I have time
      dataAppender("Maintenance Events")
      
      function dataAppender(descriptionStr, data = " ") {
         const dataElem = document.createElement("p")
         dataElem.textContent = `${descriptionStr}: ${data}`
         elementBody.appendChild(dataElem)
      }
      return newVehicleElement
      //need to then create up a UL for the maintenance events list for vehicle X then add LI's for each one
      //Should probably do a commit soon for the vehicle.js

      //use "this" to get all the attributes I need to create the HTML and place the attributes in there. 
      // this fn should also call maint event create card and append it to the HTML created in the above line
      //returns the card html object
   }
}