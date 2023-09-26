

export interface loadResidentesI{
    id?:string|number|null|undefined;
    nombreResidente?:string|null|undefined;
    apellidoResidente?:string|null|undefined;
    dniResidente?:string|null|undefined;
    fechaNacimiento?:string|null|undefined;
    edad?:string|null|undefined;
    genero?:string|null|undefined;
    medicoDeCabecera?:string|null|undefined;
    grupoSanguineo?:string|null|undefined;
    numeroDeHabitacion?:string|null|undefined;
    observacionesResidente?:string|null|undefined;
    localidadFamiliar?:string|null|undefined;
    domicilioFamiliar?:string|null|undefined;
    nombreFamiliar?:string|null|undefined;
    apellidoFamiliar?:string|null|undefined;
    numeroTelefonico?:string|null|undefined;
    dniFamiliar?:string|null|undefined;
    numeroAfiliado?:string|null|undefined;
    obraSocial?:string|null|undefined;
    vinculoConElResidente?:string|null|undefined;
    fotoResidente?:string;
    egresado:string;
}


export interface listaResidentesI{
    id:string|number;
    nombreResidente:string;
    apellidoResidente:string;
    dniResidente:string;
    fechaNacimiento:string;
    edad:string;
    genero:string;
    medicoDeCabecera:string;
    grupoSanguineo:string;
    numeroDeHabitacion:string;
    observacionesResidente:string;
    localidadFamiliar:string;
    domicilioFamiliar:string;
    nombreFamiliar:string;
    apellidoFamiliar:string;
    numeroTelefonico:string;
    dniFamiliar:string;
    numeroAfiliado:string;
    obraSocial:string;
    vinculoConElResidente:string;
    fotoResidente:string;
    egresado:string;
}

export interface DetallesPacienteI{
    id:string|number;
    nombreResidente:string;
    apellidoResidente:string;
    dniResidente:string;
    edad:string;
    genero:string;
    fechaNacimiento:string;
    grupoSanguineo:string;
    numeroDeHabitacion:string;
    observacionesResidente:string;
    medicoDeCabecera:string;
    numeroAfiliado:string;

    localidadFamiliar:string;
    domicilioFamiliar:string;
    nombreFamiliar:string;
    apellidoFamiliar:string;
    numeroTelefonico:string;
    dniFamiliar:string;
    obraSocial:string;
    vinculoConElResidente:string;
    fotoResidente:string;
    egresado:string;
};

