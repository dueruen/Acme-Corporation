export interface SubmitContestParams {
  body: {
    firstName: string;
    lastName: string; 
    email: string;
    serialNumber: string;
  }
}

export interface ListSubmissions {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  redeemed: number;  
}

export interface SubmissionData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  serialNumbers: SerialNumber[];
}

export interface SerialNumber {
  id: number;
  number: string;
  redeemed: number;
}