
export interface LoadCuracionI{
    residenteC:string;
    fechaRealizada:Date;
    profesional:string;
    medicacionAplicada:string;
};


export interface listaCuracionesI{
   
    curaciones: 
    {
        fechaRealizada: Date;
        profesional: string;
        MedicacionAplicada: string;
      }[];
   
}