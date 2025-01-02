import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pet } from '../../models/pet.model';
import { PetService } from '../../service/pet.service';
import { CommentService } from '../../service/comment.service';
import { PetrequestService } from '../../service/petrequest.service';
import { ApiResponse } from '../../models/api-response';
import { Comment } from '../../models/comment.model';
import { AdoptionRequest } from '../../models/adoption-request.model';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../service/configuration/environment';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  petId!: number;
  pet!: Pet;
  isLoading: boolean = true;
  baseURL: string = environment.apiUrl;
  errorMessage: string | null = null;
  comments: Comment[] = [];
  newCommentContent: string = '';
  currentUser: { id: number; email: string } | null = null; // Replace with actual user data when available
  adoptionRequest: AdoptionRequest = {
    id: 0,
    requestDate: '',
    status: 'PENDING',
    remarks: '',
    petId: 0,
    userId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private commentService: CommentService,
    private petRequestService: PetrequestService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.petId = +this.route.snapshot.paramMap.get('id')!; // Get 'id' from route params
    this.fetchPetDetails();
    this.loadComments();
    this.currentUser = this.authService.getUserData();
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

  loadComments(): void {
    this.commentService.getCommentsByPetId(this.petId).subscribe({
      next: (response: ApiResponse<Comment[]>) => {
        this.comments = response.data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load comments.';
        console.error(err);
      }
    });
  }

  addComment(): void {


    if(this.currentUser?.id == this.pet.owner.id )
      {
          alert("Your are the owner of the pet")
          return;
      } 


    if (!this.newCommentContent.trim()) {
      alert('Comment content cannot be empty.');
      return;
    }

    if (!this.currentUser) {
      alert('Please log in to add a comment.');
      return;
    }

    const newComment: Comment = {
      id: 0, // ID will be set by the backend
      content: this.newCommentContent,
      createdDate: new Date().toISOString(), // ISO format
      petId: this.petId,
      userId: this.currentUser.id,
      uname:"",
      email:"",
          // Only include the user ID
      }
    

    this.commentService.createComment(newComment).subscribe({
      next: (response: ApiResponse<Comment>) => {

             if (response.statusCode === 201) {
          this.loadComments(); // Reload comments after adding
          this.newCommentContent = ''; // Clear input field
        } else {
          console.error('Failed to add comment:', response.message);
        }
      },
      error: (err) => {
        console.error('Failed to add comment', err);
      }
    });
  }

  submitAdoptionRequest(): void {
    if (!this.currentUser) {
      alert('Please log in to submit an adoption request.');
      return;
    }
    else if(this.currentUser.id == this.pet.owner.id )
    {
        alert("Your are the owner of the pet")
        return;
    }

    this.adoptionRequest.petId = this.petId;
    this.adoptionRequest.userId = this.currentUser.id;
    this.adoptionRequest.requestDate = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd'
    )?.toString()!;

    this.petRequestService.createAdoptionRequest(this.adoptionRequest).subscribe({
      next: (response: ApiResponse<AdoptionRequest>) => {
        alert('Adoption request submitted successfully!');
      },
      error: (err) => {
        console.error('Failed to submit adoption request', err);
        alert('Failed to submit adoption request. Please try again.');
      }
    });
  }
}
