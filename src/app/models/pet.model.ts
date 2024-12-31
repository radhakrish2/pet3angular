import { Comment } from "./comment.model";

export interface Pet {
    id: number;
    name: string;
    type: string; // e.g., Dog, Cat
    breed: string;
    age: number;
    gender: string;
    description: string;
    status: 'AVAILABLE' | 'ADOPTED'; // Adjust based on your requirements
    imageUrls: string[];
    ownerId: number;
    comments: Comment[];
  }