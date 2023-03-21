import { mainContainer } from "./main.js"


// You will need to store that external data in your application state when 
// you fetch it. Create a property named requests in your application state 
// object. Its initial value must be an empty array.
const applicationState = {
    requests: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// Define and export a function named getRequests that returns a copy of 
// the requests state. Go back to a previous project and look at the functions 
// that return copies of arrays in the database module if you've forgotten 
// the syntax.
export const getRequests = () => {
    return applicationState.requests.map(requests => ({...requests}))
}

// Place the following function in your dataAccess.js module. The POST method 
// on any HTTP request means "Hey API!! I want you to create something new!"
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
// Remember that every time state changes, you have to generate new HTML representations 
// of the state. Now that you have the ability to generate new state and store it 
// permanently in your API, you need to implement the stateChanged custom action again.

// Update your sendRequest() function's fetch call to dispatch the custom event after the 
// POST operation has been completed.
    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}

// When you use the DELETE method on an HTTP request, you must identify a single resource.
// Therefore, the function whose responsiblity it is to initiate the fetch request for 
// DELETE must have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// First, add the following function to your dataAccess.js module.
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

// Create two functions in your dataAccess module.
// saveCompletion() - This will perform the POST request to save the completion object 
// to the API
// fetchCompletions() - This will retrieve all completion objects from the API

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}


export const saveCompletion = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
// Now update your main module again to fetch the completions after requests 
// and plumbers have been fetched.

export const getPlumbers =() =>{
    return applicationState.plumbers.map(plumber =>({...plumber}))
}

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({ ...completion }))
}