// /pages/api/session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Aquí obtienes las cookies de la solicitud
    const cookies = req.cookies;

    if (!cookies) {
        return res.status(401).json({ message: 'No session found' });
    }

    try {
        // Hacer una solicitud al backend enviando las cookies necesarias
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product?page=1&limit=20`, {
            withCredentials: true,
        });

        res.status(200).json(response);
    } catch (error) {
        //console.error('Error al obtener la sesión:', error);
        res.status(500).json({ message: 'Error al obtener la sesión' });
    }
}
