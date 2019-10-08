class MaintEvent {
   constructor(data) {
      this.id = data.id
      this.completed = new Date(data.completed).toLocaleDateString()
      this.mileage = data.mileage
      this.eventType = data.event_type
      this.cost = data.cost
      this.vehicleId = data.vehicle_id
      MaintEvent.all.push(this)
   }
   
   static all = []

   static createMaintEventElements(maintEventObjsArr, targetUlNode) {
      //REFACTOR - should sort maintEventObjsArr by completed date ascending
      maintEventObjsArr.forEach(maintEventData => {
         const newMaintEventInst = new MaintEvent(maintEventData)
         const newMaintEventElem = newMaintEventInst.createMaintEvent()
         targetUlNode.appendChild(newMaintEventElem)
      })
   }

   createMaintEvent() {
      const newMaintEventLi = document.createElement("li")
      newMaintEventLi.setAttribute("id", `maint-event-${this.id}`)

      newMaintEventLi.innerHTML = 
         `<div class="collapsible-header" tabindex="0"><i class="material-icons">build</i><strong>${this.eventType} - ${this.completed}</strong></div>
         <div class="collapsible-body"></div>`
      
      const maintEventDetailsElem = newMaintEventLi.querySelector(".collapsible-body")
      maintEventDetailsElem.innerHTML = 
         `<p>Mileage at time of Event: ${this.mileage} mi</p>
         <p>Cost: $${this.cost}</p>`

      return newMaintEventLi
   }
}