
// LOGICA DE INICIO DE SESION (LOGIN)
export interface LoginI{
    user_id?:string|null|undefined;
    password?:String|null;
}

// LOGICA DE DESCONEXION (LOGOUT)
export interface TokenI{
    token?:string|null|any;
}

// LOGICA DE REGISTRAR USUARIOS (ALTA USUARIOS)
export interface RegisterI{
    username?:string|null|undefined;
    password?:String|null;
    email?:string|null;
    cargo?:string|null;
}

// LOGICA DE LA RESPUESTA DESDE EL BACKEND 
export interface ResponseI{
    status:any;
    error?:any;
    result?:string|any;
    token?:string|any;
    cargo?:string|any;
    id?:string|any;
    non_field_errors?: string[]; // Agregar la propiedad non_field_errors

}



