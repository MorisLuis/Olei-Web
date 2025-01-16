module.exports = {
  reactStrictMode: false,
  images: {
    domains: ['oleistorage.blob.core.windows.net', 'm.media-amazon.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)', // Aplica a todas las rutas
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://www.oleionline.com', // Cambia por tu dominio de producción
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true', // Permite enviar cookies con solicitudes cross-origin
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos permitidos
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Accept, Content-Type, Authorization', // Cabeceras permitidas
          },
        ],
      },
    ];
  },
};
