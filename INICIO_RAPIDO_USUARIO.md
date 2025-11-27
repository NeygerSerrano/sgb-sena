# 🚀 Inicio Rápido - Vistas de Usuario

## ⚡ En 3 Pasos

### 1️⃣ Iniciar el servidor
```bash
npm run dev
```

### 2️⃣ Abrir en el navegador
```
http://localhost:3000
```

### 3️⃣ Iniciar sesión
```
Email: usuario@sena.edu.co
Password: user123
```

---

## 🎯 Acceso Rápido a las Vistas

### Nueva Solicitud
```
http://localhost:3000/dashboard/usuario/solicitar
```

### Mis Solicitudes
```
http://localhost:3000/dashboard/usuario/solicitudes
```

---

## 📋 Flujo Básico

### Crear una Solicitud:

1. **Buscar bienes**
   - Escribe en el buscador (código, nombre, etc.)
   - Navega por la tabla paginada

2. **Seleccionar bienes**
   - Haz clic en "Seleccionar" en cada bien
   - Los bienes se agrupan automáticamente por cuentadante

3. **Completar formulario**
   - Motivo: "Clase de programación"
   - Destino: "Aula 301"
   - Fecha de salida: Mañana a las 8:00 AM
   - Fecha de regreso: Pasado mañana a las 5:00 PM

4. **Guardar**
   - Clic en "Guardar Solicitud"
   - Verás un mensaje con el resumen

---

### Ver Mis Solicitudes:

1. **Navegar a "Mis Solicitudes"**
   - Desde el Sidebar o la URL directa

2. **Filtrar por estado**
   - Todas / Pendientes / Aprobadas / Rechazadas / Devueltas

3. **Ver detalle**
   - Clic en "Ver Detalle Completo"
   - Se abre un modal con toda la información

---

## 🎨 Características Destacadas

### ✨ Nueva Solicitud
- 🔍 Búsqueda en tiempo real
- 📊 Paginación automática
- 👥 Agrupación por cuentadante
- ✅ Validaciones inteligentes
- 📅 Selector de fechas con restricciones

### ✨ Mis Solicitudes
- 🔽 Filtros rápidos por estado
- 🏷️ Badges de estado coloridos
- 📊 Progreso visual de aprobaciones
- 🔍 Modal de detalle completo
- ❌ Visualización de rechazos

---

## 🎯 Datos de Ejemplo

### Bienes Disponibles (8):
- **TEC-001**: Portátil Lenovo ThinkPad T14
- **TEC-002**: Portátil Dell Latitude 5420
- **TEC-003**: Impresora HP LaserJet Pro
- **TEC-004**: Proyector Epson EB-S41
- **TEC-005**: Monitor Samsung 24"
- **MOB-001**: Silla ergonómica ejecutiva
- **MOB-002**: Escritorio modular de madera
- **LAB-001**: Microscopio óptico binocular

### Solicitudes de Ejemplo (4):
1. 🟡 **Pendiente**: Clase de programación (2 bienes)
2. 🟢 **Aprobada**: Taller de laboratorio (1 bien)
3. 🔴 **Rechazada**: Presentación proyecto (1 bien)
4. ⚪ **Devuelta**: Capacitación docente (2 bienes)

---

## 💡 Tips Rápidos

### Búsqueda Efectiva:
- Busca por código: `TEC`
- Busca por marca: `Lenovo`
- Busca por cuentadante: `Carlos`
- Busca por nombre: `Portátil`

### Selección Múltiple:
- Puedes seleccionar bienes de diferentes cuentadantes
- El sistema los agrupa automáticamente
- Cada grupo genera una solicitud separada

### Validación de Fechas:
- No puedes seleccionar fechas pasadas
- La fecha de regreso debe ser al menos 1 día después
- El sistema te guía con mensajes claros

---

## 🔍 Atajos de Teclado

| Acción | Atajo |
|--------|-------|
| Buscar | Clic en el campo de búsqueda |
| Siguiente página | Clic en "Siguiente" |
| Página anterior | Clic en "Anterior" |
| Cerrar modal | Clic en "×" o "Cerrar" |

---

## ❓ Preguntas Frecuentes

### ¿Puedo seleccionar bienes de diferentes cuentadantes?
✅ Sí, el sistema los agrupa automáticamente y crea solicitudes separadas.

### ¿Cuántos bienes puedo solicitar?
✅ No hay límite, pero recuerda que cada cuentadante debe aprobar sus bienes.

### ¿Puedo editar una solicitud después de crearla?
❌ No en esta versión. Deberás crear una nueva solicitud.

### ¿Cuánto tiempo tarda la aprobación?
⏳ Depende de los aprobadores. Puedes ver el progreso en "Mis Solicitudes".

### ¿Qué pasa si mi solicitud es rechazada?
❌ Verás el motivo del rechazo en el detalle de la solicitud.

---

## 🐛 Solución de Problemas

### No veo bienes en la tabla
- Verifica que el servidor esté corriendo
- Recarga la página (F5)
- Revisa la consola del navegador (F12)

### No puedo seleccionar una fecha
- Asegúrate de que no sea una fecha pasada
- Para fecha de regreso, primero selecciona fecha de salida

### El botón "Guardar" no funciona
- Verifica que hayas seleccionado al menos 1 bien
- Completa todos los campos obligatorios (*)
- Revisa que las fechas sean válidas

---

## 📚 Documentación Completa

Para más información, consulta:
- `VISTAS_USUARIO_IMPLEMENTADAS.md` - Resumen completo
- `PRUEBAS_VISTAS_USUARIO.md` - Guía de pruebas
- `app/dashboard/usuario/README.md` - Documentación técnica
- `CREDENCIALES.md` - Todas las credenciales

---

## 🎉 ¡Listo!

Ya puedes empezar a usar las vistas de usuario. Si tienes dudas, revisa la documentación o consulta con el equipo de desarrollo.

**¡Buena suerte! 🚀**
