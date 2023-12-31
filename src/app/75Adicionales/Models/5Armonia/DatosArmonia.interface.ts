export interface getLocalDataI{
    id:string|number;
    nombre: string;
    foto: string|null;
    habilitacionProvincial:string;
    habilitacionMunicipal:string;
    domicilio: string;
    localidad: string;
    numeroTelefonico: string;
}

export interface LoadMedicamentoLocalI{
    localA:string;
    id:string|number;
    genericMedicamento:string;
    nombreMedicamento:string;
    marcaMedicamento:string;
    pesoMedicamento:string;
    medicionMedicamento:string;

    cantidadTotal:string;
    fechaInicio:Date;
    cantidadDiaria:string;
    cantidadDisponible:string;

    codMedicamento:string;
    observacionesMedicamento:string;
};



export interface listaMedicamentosLocalI{
   
    localMedicamentos: 
    {
        id:string|number;
        Generico: string;
        Nombre: string;
        Marca: string;
        Peso: string;
        Medida: string;

        CantidadDiaria: number;
        FechaInicio: string;
        CantidadTotal:number;
        cantidadDisponible:number;
        
        Codigo: string;
        Observaciones: string;
      }[];
   
}










export interface getUserDataI{
    id:string|number;
    username: string;
    email: string;
    password: string;
    ifLogged: string;
    token: string;
    cargo: string;
    fotoUser: string|null;
    descriptionUser: string;
    numCelular: string;
    direccion: string;
    birthday: string|null;
}

export interface putUserDataI{
    id:string|number;
    username: string|null;
    email: string|null;
    password: string|null;
    fotoUser: string|null;
    descriptionUser: string|null;
    numCelular: string|null;
    direccion: string|null;
    birthday: string|null;
}