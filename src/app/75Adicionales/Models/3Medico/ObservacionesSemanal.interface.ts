
export interface LoadSemanalOI{
    residenteS:string;
    fechaConsulta:Date;
    tensionArterial:string;
    glucemia:string;
    saturacion:string;
    pulso:string;  
    observacionesSemanales:string;

};


export interface listaSemanalOI{
   
    signosVitales: 
    {
        FechaConsulta: Date;
        TensionArterial: string;
        Glucemia: string;
        Saturacion: string;
        Pulso: number;
        Observaciones: string;
      }[];
   
}