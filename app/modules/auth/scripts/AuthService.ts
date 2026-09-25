import { apiFetch } from "@/app/components/scripts/api";
import { LoginResponse } from "../Models/Responses/LoginResponse";


export const CreateStudent = async (name:string, lastName:string, email:string, password:string) => {
    return apiFetch('/auth/register-student', {
        method: 'POST',
        body: JSON.stringify({  
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password }),
    });
};

export const ConfirmRegistration = async (email:string, confirmationCode:string) => {
    return apiFetch<LoginResponse>('/auth/confirm-registration-code-student', {
        method: 'POST',
        body: JSON.stringify({  
                    email: email,
                    confirmationCode: confirmationCode }),
    });
};
