import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DBConfig from './config/dbConfig.js';
import productosRoutes from './routes/productos.js';
import ventaDetRoutes from './routes/ventaDet.js';

// Configuración de variables de entorno
dotenv.config();

// Crear instancia de Express
const app = express();

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para logging básico
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rutas
app.get('/', (req, res) => {
    res.json({
        message: 'API Restaurante funcionando correctamente',
        version: '1.0.0',
        endpoints: {
            productos: '/api/productos',
            ventaDetalle: '/api/venta-detalle'
        }
    });
});

// Rutas de la API
app.use('/api/productos', productosRoutes);
app.use('/api/venta-detalle', ventaDetRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no existe en este servidor'
    });
});

// Middleware para manejo de errores globales
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ha ocurrido un error inesperado'
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}`);
});

// Manejo de cierre graceful
process.on('SIGTERM', async () => {
    console.log('Recibida señal SIGTERM, cerrando servidor...');
    await DBConfig.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('Recibida señal SIGINT, cerrando servidor...');
    await DBConfig.disconnect();
    process.exit(0);
});

export default app;