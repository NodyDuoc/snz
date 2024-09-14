interface AuthCreateRoleRequest {
    roleListName: string[];
  }
  
  interface AuthCreateUserRequest {
    id_usuario?:number;
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    phone: string;
    authCreateRoleRequest: AuthCreateRoleRequest;
  }