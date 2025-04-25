export interface CreateAdminRequestDTO {
    email: string;
    password: string;
    name: string
}



// AdminDTO.ts
export interface LoginAdminRequestDTO {
    email: string;
    password: string;
}

export interface LoginAdminResponseDTO {
    email: string;
    name: string;
    accessToken: string;
    refreshToken: string;
    id: string;
    role: string;
}

