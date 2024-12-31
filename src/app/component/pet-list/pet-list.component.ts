import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../service/pet.service';
import { ApiResponse } from '../../models/api-response';

@Component({
  selector: 'app-pet-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent  implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    // Fetch all pets on component initialization
    this.petService.getAllPets().subscribe(
      (response: ApiResponse<Pet[]>) => {
        if (response.statusCode === 200) {
          this.pets = response.data;
        } else {
          console.error('Error fetching pets:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching pets:', error);
      }
    );
  }



  navigateToPetDetails(id: number)
{

}


}

