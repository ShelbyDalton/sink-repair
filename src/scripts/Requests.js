import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { getCompletions } from "./dataAccess.js"

// In the following code, you will need to define the function that 
// will be passed to the map() method.

// The function should define 1 parameter (value will be each object in the 
// array)
// The description of the service request should be interpolated inside 
// the <li> HTML representation.
// The function should return the HTML representation.
// export const Requests = () => {
//     const requests = getRequests()
//     const plumbers = getPlumbers()

//     let html =
//         `
//         <ul>
//             ${
//         // Now that you have a function that can send a DELETE request to the API, you can 
//         // add a button for the user to click and initiate that process. Add the button element 
//         // right next to the text of each request.

//         // You can place this <select> (plumbers) element wherever is easiest to start. Don't worry 
//         // about the exact placement, just make sure that it is displayed for each service request.

//         // Note that the value of each option in the select element has the primary key of the 
//         // service request AND the primary key of the plumber delimited with 2 dashes. This is 
//         // because you need to have both the request and the chosen plumber to mark a job complete.
//         requests.map(request => `
//                 <li>
//                     ${request.description}

//                     <select class="plumbers" id="plumbers">
//                     <option value="">Choose</option>
//                     ${plumbers.map(
//             plumber => {
//                 return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
//             }
//         ).join("")
//             }
//                 </select>
//                 <button class="request__delete"
//                             id="request--${request.id}">
//                         Delete
//                     </button>
//                 </li>
//             `).join("")
//         }
//         </ul>
//     `

//     return html
// }

export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul id="requestsList">
            ${requests.map(convertRequestToListElement).join("")}
		</ul>
    `
    return html;
}

// Now add an event listener to the main container. When the user clicks on any of the 
// delete buttons, invoke the deleteRequest() function you just made above. Make sure you 
// pass the id of the service request to the deleteRequest() function as an argument.
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

// Add the following event listener to your requests module.
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId,
                plumberId,
                date_created: new Date().toLocaleDateString("en-US"),
            }
            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletion(completion)
        }
    }
)



const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()

    // Check if request has been completed. If completed, dropdown box will not render. 
    if (completions.find(completion => request.id === parseInt(completion.requestId))) {
        let requestComplete = `
            <li class="request complete">
                <span class="description">${request.description}</span>
                <span class="middleItem"><b>Complete</b></span>
                <button class="request_delete" id="request--${request.id}">Delete</button>
            </li>
            `
        return requestComplete
    } else {
        let requestOpen = `
        <li class="request open">
        <span class="description">${request.description}</span>
        <div> 
        <select class="plumbers middleItem" id="plumbers">
            <option value="">Choose</option>
            ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
        </select>
        <button class="request_delete" id="request--${request.id}">Delete</button> 
        </div>
    </li>
        `
        return requestOpen
    }
}