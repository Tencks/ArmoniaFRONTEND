
export interface LoadMedicamentoI{
    residenteM:string;
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
    id:string|number;
};


export interface listaMedicamentosI{
   
    medicamentos: 
    {
        Generico: string;
        Nombre: string;
        Marca: string;
        Peso: string;
        Medida: string;

        cantidadDiaria: number;
        FechaInicio: string;
        CantidadTotal:number;
        cantidadDisponible:number;
        
        Codigo: string;
        Observaciones: string;

        id:string|number;
      }[];
   
}
export interface listaDeleteMedicamentosI{
   

        Generico: string;
        Nombre: string;
        Marca: string;
        Peso: string;
        Medida: string;

        cantidadDiaria: number;
        FechaInicio: string;
        CantidadTotal:number;
        cantidadDisponible:number;
        
        Codigo: string;
        Observaciones: string;
        id:string|number;
 
   
}

