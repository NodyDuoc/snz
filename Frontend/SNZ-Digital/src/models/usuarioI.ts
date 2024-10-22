export interface AuthCreateUserRequest {
  id?:number;
  email: string;
  password?: string;
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  phone: string;
  authCreateRoleRequest: AuthCreateRoleRequest;
  role?: {
    id: number;
    roleEnum: string; // Este debe coincidir con la estructura que recibes
  };
  isActivated?:boolean;
}

export interface AuthCreateRoleRequest {
  roleListName: string[];
}
  
