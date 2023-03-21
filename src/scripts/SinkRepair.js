// Then import the HTML into the main module and interpolate it in the site 
// structure.
import { Requests } from "./requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
    <h1>Maude and Merle's Sink Repair</h1>
    <section class="serviceForm">
    <h2>Make Service Request</h2>
        ${ServiceForm()}
    </section>
    <section class="serviceRequests">
        <h2>Service Requests</h2>
        <div class="requests__div">
        ${Requests()}
        </div>
    </section>
`    
}