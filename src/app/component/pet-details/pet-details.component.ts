import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-details',
  imports: [CommonModule],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent implements OnInit {
  petId!: number;
  pet!: Pet;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.petId = +this.route.snapshot.paramMap.get('id')!; // Get 'id' from route params
    this.fetchPetDetails();
  }

  fetchPetDetails(): void {
    this.petService.getPetById(this.petId).subscribe({
      next: (response: ApiResponse<Pet>) => {
        this.pet = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch pet details.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}