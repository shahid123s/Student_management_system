export interface CreateStudentRequestDTO {
    name: string;
    age: number;
    email: string;
    rollNo: number;
    password: string;
    classId: number;
    className: string;
    phone: string;
    marks: number;
    gender: string;
    dob : Date;
}

export interface CreateStudentResponseDTO {
    name: string;
    dob: Date;
    email: string;
    rollNo: number;
    className: string;
    marks: number;
    id: string | null;
}

export interface LoginStudentRequestDTO {
    email: string;
    password: string;
}

export interface LoginStudentResponseDTO {
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    id: string| null ;
    role: string
}


export interface UpdateStudentRequestDTO {
    id: string;
    rollNo ?: number;
    classId?: number;
    className?: string;
    marks?: number;
}
