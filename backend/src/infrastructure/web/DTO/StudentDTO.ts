export interface CreateStudentRequestDTO {
    name: string;
    age: number;
    email: string;
    rollNo: number;
    password: string;
    classId: number;
    className: string;
    phone: string;
    address: string;
    gender: string;
}

export interface CreateStudentResponseDTO {
    name: string;
    age: number;
    email: string;
    rollNo: number;
    classId: number;
    className: string;
    phone: string;
    address: string;
    gender: string;
    id: string;
}
