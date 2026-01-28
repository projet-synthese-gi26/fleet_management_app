// DTO pour PUT /account
export interface UpdateProfileDto {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

// DTO pour PUT /account/password
export interface UpdatePasswordDto {
    currentPassword: string;
    newPassword: string;
}