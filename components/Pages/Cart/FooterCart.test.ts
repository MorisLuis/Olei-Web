/* // orderUtils.test.ts

import { api } from "@/api/api";
import { submitOrder } from "./FooterCart";

// Mock de axios para simular las solicitudes HTTP
jest.mock('@/api/api', () => ({
    post: jest.fn(),
}));

// Mock de la función push del Router
const mockPush = jest.fn();

// Mock de la función removeAllCart
const mockRemoveAllCart = jest.fn();

describe('submitOrder', () => {
    it('debe realizar un pedido con éxito', async () => {
        // Datos de prueba
        const testData = {
            removeAllCart: mockRemoveAllCart,
            subTotal: 100, // Subtotal de prueba
            total: 110, // Total de prueba
            numberOfItems: 5, // Número de ítems de prueba
            cart: [
                {
                    Codigo: '123',
                    Id_Marca: 1,
                    Piezas: 2,
                    Precio: 10,
                    Impuesto: 1,
                    Descripcion: 'Producto 1',
                    Existencia: 20,
                },
                // Agregar más productos de prueba si es necesario
            ],
            push: mockPush,
        };

        // Simular respuestas de las solicitudes HTTP
        (api.post as jest.Mock).mockResolvedValueOnce({}); // /api/orderDetails
        (api.post as jest.Mock).mockResolvedValueOnce({
            data: {
                order: {
                    Folio: {
                        value: '12345',
                    },
                },
            },
        }); // /api/order

        // Llamar a la función submitOrder con los datos de prueba
        await submitOrder(testData);

        // Asegurarse de que las funciones esperadas se hayan llamado
        expect(api.post).toHaveBeenCalledTimes(2); // Debe llamar a ambas solicitudes
        expect(mockPush).toHaveBeenCalledWith('/cart/success?order=12345');
        expect(mockRemoveAllCart).toHaveBeenCalled();
    });
});
 */