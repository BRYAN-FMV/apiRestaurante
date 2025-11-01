# 🍽️ API Restaurante

API REST para gestión de restaurante desarrollada con Node.js, Express y MongoDB.

## � Instalación y Uso

1. **Clona e instala:**
   ```bash
   git clone https://github.com/BRYAN-FMV/apiRestaurante.git
   cd apiRestaurante
   npm install
   ```

2. **Ejecuta:**
   ```bash
   npm run dev
   ```

## 📡 Endpoints

###  **Productos**
- `GET /api/productos` - Obtener todos
- `GET /api/productos/:id` - Obtener por ID
- `POST /api/productos` - Crear
- `PUT /api/productos/:id` - Actualizar
- `DELETE /api/productos/:id` - Eliminar

### 🧾 **Detalles de Venta**
- `GET /api/venta-detalle` - Obtener todos
- `GET /api/venta-detalle/with-details` - Con información relacionada
- `GET /api/venta-detalle/stats` - Estadísticas por producto
- `POST /api/venta-detalle` - Crear
- `PUT /api/venta-detalle/:id` - Actualizar
- `DELETE /api/venta-detalle/:id` - Eliminar

## ️ Modelos

### **Producto**
```javascript
{
  nombre: String,
  precio: Number,
  categoria: String,
  disponibilidad: Boolean
}
```

### **VentaDet**
```javascript
{
  ventaEncId: ObjectId, // Referencia a VentaEnc
  productoId: ObjectId, // Referencia a Producto
  cantidad: Number,
  precio: Number
}
```

## 💡 Ejemplo de Uso

```bash
# Crear producto
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre": "Pizza", "precio": 15.99, "categoria": "Pizzas"}'

# Crear detalle de venta
curl -X POST http://localhost:3000/api/venta-detalle \
  -H "Content-Type: application/json" \
  -d '{"ventaEncId": "ID_VENTA", "productoId": "ID_PRODUCTO", "cantidad": 2, "precio": 15.99}'
```

## 🛠️ Tecnologías

- Node.js + Express
- MongoDB + Mongoose
- JWT, bcrypt, CORS

## 👨‍💻 Autor

**Bryan Flores** - [BRYAN-FMV](https://github.com/BRYAN-FMV)