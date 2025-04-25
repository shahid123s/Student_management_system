export interface Student {
    id: string;
    name: string;
    email: string;
    className: string;
    rollNo: string;
    marks: number;
    password? : string;
    dob?: string;
  }
  
  export interface AuthContextType {
    token: string | null;
    role: 'student' | 'admin' | null;
    userId: string | null;
    login: (token: string, role: 'student' | 'admin', userId: string) => void;
    logout: () => void;
  }