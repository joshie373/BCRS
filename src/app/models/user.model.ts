import { UserSecurityQuestion } from './user-security-question.model';

export class User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    role: string;
    dateCreated: string;
    dateModified: string;
    SecurityQuestions: UserSecurityQuestion[];
  }