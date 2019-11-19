class MaintEvent {
   constructor(data) {
      this.id = data.id
      this.completed = new Date(data.completed).toLocaleDateString()
      this.mileage = data.mileage
      this.eventType = data.event_type
      this.cost = data.cost
      this.comment = data.comment
      this.vehicleId = data.vehicle_id
      MaintEvent.all.push(this)
   }
   
   static all = []

   static createMaintEventElements(maintEventObjsArr, targetUlNode) {
      //Possible Refactor: sort maintEventObjsArr by completed date ascending - not part of MVP
      //this class method enables the creation of maintEventLi's and appends them to the targetUlNode
      maintEventObjsArr.forEach(maintEventData => {
         const newMaintEventInst = new MaintEvent(maintEventData)
         const newMaintEventElem = newMaintEventInst.createMaintEvent()
         targetUlNode.appendChild(newMaintEventElem)
      })
   }

   static createNewMaintEvent(event) {
      event.preventDefault()
      //Get all my inputs by their ids 
      const mileage = document.querySelector("#mileage")
      const completed = document.querySelector("#completed")
      const eventType = document.querySelector("#event-type")
      const cost = document.querySelector("#cost")
      const comment = document.querySelector("#comment")
      const vehicleId = document.querySelector("#for-vehicle")

      //Save my input's values into an object to get stringified
      const newMaintEventObject = {
         maint_event: {
            mileage: mileage.value,
            completed: completed.value,
            event_type: eventType.value,
            cost: cost.value,
            comment: comment.value,
            vehicle_id: vehicleId.value
         }
      }
      //Setup my fetch POST options object with my new Maint Event object
      const postOptionsObj = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(newMaintEventObject)
      }
      
      //AJAX call to backend to create new MaintEvent object
      fetch("http://localhost:3000/maint_events", postOptionsObj)
         .then(resp => resp.json())
         .then(newMaintEventData => {
            //Process my new maintEventData & clear my new Maint Event form
            MaintEvent.processNewMaintEventData(newMaintEventData)
            MaintEvent.clearNewMaintEventForm()
            //Enables my new Materialize collapsible object (the new Maint Event) to work
            $('.collapsible').collapsible();
         })
         .catch(error => {
            const errorObj = { 
               error: error,
               from: "Create New Maint Event Error"
            }
            renderError(errorObj)
         })   
   }

   static processNewMaintEventData(newMaintEventData) {  
      let newMaintEventInst = new MaintEvent(newMaintEventData)
      let newMaintEventElem = newMaintEventInst.createMaintEvent()
      //Select the appropriate vehicle that this MaintEvent belongs to and its "header" p tag
      const vehicleMaintEventsUl = document.querySelector(`#data-events-for-vehicle-${newMaintEventInst.vehicleId}`)
      const maintEventsP = document.querySelector(`#me-header-for-vehicle-${newMaintEventInst.vehicleId}`)
      
      //If this is the first Maint Event, this logic checks to see if the MaintEventsP header is hidden, if so, turn it back on to show and turn on this specific vehicle's MaintEventsUl too
      if(maintEventsP.getAttribute("style") === "display: none;") {
         maintEventsP.setAttribute("style", "display: block;")
         vehicleMaintEventsUl.setAttribute("style", "display: block;")
      }
      //Append my new MaintEvent to this vehicle's maintEventsUl
      vehicleMaintEventsUl.appendChild(newMaintEventElem)

      //Close the modal after successfuly creation
      $('.modal').modal('close');
      //Let the nerdy console users know that this was successful. ;) 
      console.log(`New MaintEvent "${newMaintEventInst.eventType}" appended to Vehicle ID: ${newMaintEventInst.vehicleId}`)
   }

   //This class method clears out the new Maint Event form as well as any input styling for valid/invalid -- makes it squeaky clean
   static clearNewMaintEventForm() {
      const mileageInputField = document.querySelector("#mileage")
      const completedInputField = document.querySelector("#completed")
      const eventTypeInputField = document.querySelector("#event-type")
      const costInputField = document.querySelector("#cost")
      const commentInputField = document.querySelector("#comment")
      const vehicleIdInputField = document.querySelector("#for-vehicle")
      
      mileageInputField.value = ""
      mileageInputField.classList.remove("valid")
      mileageInputField.classList.remove("invalid")
      
      completedInputField.value = ""
      completedInputField.classList.remove("valid")
      completedInputField.classList.remove("invalid")
      
      eventTypeInputField.value = ""
      eventTypeInputField.classList.remove("valid")
      eventTypeInputField.classList.remove("invalid")
      
      costInputField.value = ""
      costInputField.classList.remove("valid")
      costInputField.classList.remove("invalid")
      
      commentInputField.value = ""
      commentInputField.classList.remove("valid")
      commentInputField.classList.remove("invalid")
      
      //since this field is hidden, just needs cleared 
      vehicleIdInputField.value = ""
      
      console.log("New MaintEvent Form Cleared")
   }
   
   //Creates a MaintEventLi and returns it
   createMaintEvent() {
      const newMaintEventLi = document.createElement("li")
      newMaintEventLi.setAttribute("id", `maint-event-${this.id}`)
      
      newMaintEventLi.innerHTML = 
      `<div class="collapsible-header" tabindex="0"><i class="material-icons">build</i><strong>${this.eventType} - ${this.completed}</strong></div>
      <div class="collapsible-body"></div>`
      
      const maintEventDetailsElem = newMaintEventLi.querySelector(".collapsible-body")
      //REFACTOR: Add a IF statement here to see if there is a comment, if there is, make the innerHTML like what is below, else, make the innerHTML the same but minus the p tag for the comment.
      const formattedCost = parseFloat(this.cost).toFixed(2)
      
      maintEventDetailsElem.innerHTML = 
      `<p>Mileage at time of Event: ${this.mileage} mi</p>
      <p>Cost: $${formattedCost}</p>
      <p>Comment: ${this.comment}</p>`

      const deleteMEButton = document.createElement("button")
      deleteMEButton.textContent = "Delete Event"
      deleteMEButton.className = "btn red darken-2"
      deleteMEButton.addEventListener("click", deleteMaintEvent)

      maintEventDetailsElem.appendChild(deleteMEButton)
      
      return newMaintEventLi

      function deleteMaintEvent(event) {
         const maintEventId = event.currentTarget.parentElement.parentElement.getAttribute("id").split("maint-event-")[1]

         const deleteOptionsObj = {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
         }
            
         fetch(`http://localhost:3000/maint_events/${maintEventId}`, deleteOptionsObj)
            .then(resp => resp.json())
            .then(item => {
               const maintEventLi = document.querySelector(`#maint-event-${item.id}`)
               maintEventLi.remove()
               console.log(item)
            })
            .catch(error => {
               const errorObj = { 
                  error: error,
                  from: "Delete Maint Event Error"
                  }
               renderError(errorObj)
            })

      }
   }
}