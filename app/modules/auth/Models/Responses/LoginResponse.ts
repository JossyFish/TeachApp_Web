import { Role } from "@/app/components/constants/roles";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  name: string;
  lastName: string;
  roles: Role[];
}