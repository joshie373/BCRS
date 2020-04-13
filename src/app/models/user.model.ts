import { UserSecurityQuestion } from './user-security-question.model';

export class User {
    id: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    email: string;
    address: string;
    role: string;
    dateCreated: string;
    dateModified: string;
    securityQuestions: UserSecurityQuestion[];
  }