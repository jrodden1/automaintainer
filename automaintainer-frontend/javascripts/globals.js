// Needed if Alternative Method for displaying errors used. 
// const errorDisplayDiv = document.querySelector("#error-notice")
// const errorDetailsP = document.querySelector("#error-details")

function renderError(errorObj) {
   //Add a message at the top that expires after 5 seconds
   M.toast({html: `${errorObj.from}: ${errorObj.error.message}`, classes: 'red rounded center-align', displayLength: 5500})
   console.log(errorObj.from, errorObj.error.message)
   
   // Alternative Method
   // errorDisplayDiv.setAttribute("style", "display: block;")
   // errorDetailsP.textContent = `${errorObj.from}: ${errorObj.error.message}`
   // setTimeout(removeError, 5000)
}

function removeError(event) {
   //Needed if using Alternative Method in renderError() above. 
   //Currently decided to use a Toast instead (Materialize) for better visibility in modals
   errorDisplayDiv.setAttribute("style", "display: none;")
   errorDetailsP.textContent = ``
}