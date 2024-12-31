import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-mypetrequest',
  imports: [],
  templateUrl: './mypetrequest.component.html',
  styleUrl: './mypetrequest.component.css'
})
export class MypetrequestComponent {
  acceptRequest(requestId: number) {
    console.log(`Request ${requestId} accepted.`);
    // Implement your logic here, such as calling a service to update the status
  }
  
  rejectRequest(requestId: number) {
    console.log(`Request ${requestId} rejected.`);
    // Implement your logic here, such as calling a service to update the status
  }
}
