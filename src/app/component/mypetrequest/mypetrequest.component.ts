import { Component, OnInit } from '@angular/core';
import { AdoptionRequest } from '../../models/adoption-request.model';
import { PetrequestService } from '../../service/petrequest.service';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mypetrequest',
  imports: [CommonModule,FormsModule],
  templateUrl: './mypetrequest.component.html',
  styleUrl: './mypetrequest.component.css'
})
export class MypetrequestComponent implements OnInit {
  adoptionRequests: AdoptionRequest[] = [];

  constructor(private petRequestService: PetrequestService) {}

  ngOnInit(): void {
    this.fetchAdoptionRequests();
  }

  fetchAdoptionRequests(): void {
    this.petRequestService.getAllAdoptionRequests().subscribe({
      next: (response: ApiResponse<AdoptionRequest[]>) => {
        if (response.statusCode) {
          this.adoptionRequests = response.data;
        }
      },
      error: (err) => console.error('Error fetching adoption requests', err)
    });
  }

  acceptRequest(id: number): void {
    const updatedRequest = this.adoptionRequests.find((req) => req.id === id);
    if (updatedRequest) {
      updatedRequest.status = 'APPROVED';
      this.updateAdoptionRequest(id, updatedRequest);
    }
  }

  rejectRequest(id: number): void {
    const updatedRequest = this.adoptionRequests.find((req) => req.id === id);
    if (updatedRequest) {
      updatedRequest.status = 'REJECTED';
      this.updateAdoptionRequest(id, updatedRequest);
    }
  }

  private updateAdoptionRequest(id: number, dto: AdoptionRequest): void {
    this.petRequestService.updateAdoptionRequest(id, dto).subscribe({
      next: (response: ApiResponse<AdoptionRequest>) => {
        if (response.statusCode) {
          this.fetchAdoptionRequests(); // Refresh the list
        }
      },
      error: (err) => console.error('Error updating adoption request', err)
    });
  }
}
