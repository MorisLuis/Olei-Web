export default interface ProductInterface {

    Descripcion: string;
    Cantidad: number;
    Codigo: string;
    Precio: number;
    Existencia: number;
    
    Id_Familia?: number
    Familia?: string;
    CodigoPrecio?: string;
    CodigoExsitencia?: string;
    Id_Almacen?: number;
    Marca?: string;
    Id_Marca?: number;
    Id_ListaPrecios?: number;
    Impuesto?: number;
    imagen?: string;   
    imagenes?: [{
        url: string;
        id: number
    }];
    Observaciones?:string;

}