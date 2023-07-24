import { Injectable } from "@angular/core";


// @Injectable({
//     providedIn:'root'   this you can provide in the app module
// })
export class LoggingService{
    lastlog:string

    printlog(message:string){
        console.log(message)
        console.log(this.lastlog)
        this.lastlog = message
    }
}

//this file is a demo to understand service and module section 22..337