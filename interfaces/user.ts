
export default interface UserInterface {

    Id_Almacen: number; //  The identifier for the warehouse where the products are distributed.
    Nombre: string; // The name of the user company.
    Id_ListPre: number; // The ID of the price list that defines the prices of the products.
    Id_Cliente: number; // The identifier of the client.
    Id_UsuarioOOL: string; // The unique identifier for database access.
    Baseweb: string; // The name of the SQL database.
    TipoUsuario: number; // Represents whether the user is an employee or a direct client. (1) Represent client and (2) represent employee
    PrecioIncIVA: number;

    Company: string,  // The name of the company.
    SwImagenes: number,
    SwSinStock: number
}