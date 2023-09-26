
export interface LoadCuracionI{
    residenteC:string;
    fechaRealizada:Date;
    profesional:string;
    practicaAplicada:string;
};


export interface listaCuracionesI{
   
    curaciones: 
    {
        fechaRealizada: Date;
        profesional: string;
        practicaAplicada: string;
      }[];
   
}