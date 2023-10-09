export default interface ProductInterface {

    Descripcion: string;
    Id_Familia?: number
    Codigo: string;
    Familia?: string;
    CodigoPrecio?: string;
    Precio: number;
    CodigoExsitencia?: string;
    Existencia: number;
    Id_Almacen?: number;
    Marca?: string;
    Id_Marca?: number;
    Id_ListaPrecios?: number;
    Piezas: number;
    Impto?: any;
    Importe?: any;
}


/* 
export default interface ProductInterface {

    Codigo?: string, // @
    Id_Marca?: number, // @
    Piezas: number, // Antes Cantidad @
    Precio: number, // @
    Impto?: number, // @
    Impuesto?: number, //@
    Descripcion?: string, // @

    Folio?: string,
    Id_Almacen?: number,
    Id_Vendedor?: number, // *
    Id_ListaPrecios?: number,
    Id_Cliente?: number, // *
    Id_Familia?: number, // @
    Familia?: string, // @
    CodigoPrecio?: string, // @
    Existencia?: number, // @
    Marca?: string, // @

    //Id_Formapago?: string, // Revisar si es necesario
    //Total?: number,
    //Fecha?: string //
    //CodigoExsitencia?: string, //
}

*/