# 👤 Vistas del Rol Usuario

Este directorio contiene las vistas específicas para el rol de **Usuario** en el Sistema de Gestión de Bienes SENA.

## 📁 Estructura

```
usuario/
├── solicitar/
│   └── page.js          # Vista para crear nueva solicitud
├── solicitudes/
│   └── page.js          # Vista para ver mis solicitudes
└── README.md            # Este archivo
```

## 🎯 Funcionalidades Implementadas

### 1. Crear Nueva Solicitud (`/dashboard/usuario/solicitar`)

**Características:**
- ✅ Búsqueda de bienes disponibles (por código, serial, nombre o cuentadante)
- ✅ Tabla paginada de bienes (5 por página)
- ✅ Selección múltiple de bienes
- ✅ Agrupación automática por cuentadante
- ✅ Formulario de solicitud con validaciones
- ✅ Validación de fechas (no permite fechas pasadas)
- ✅ Fecha de regreso mínima: 1 día después de la salida
- ✅ Vista previa de bienes seleccionados agrupados
- ✅ Limpieza de formulario

**Campos del formulario:**
- Motivo * (requerido)
- Destino * (requerido)
- Fecha de Salida * (requerido, no puede ser anterior a hoy)
- Fecha de Regreso * (requerido, mínimo 1 día después de salida)
- Observaciones (opcional)

**Validaciones:**
- Al menos 1 bien seleccionado
- Todos los campos obligatorios completos
- Fecha de salida no puede ser anterior a hoy
- Fecha de regreso debe ser al menos 1 día después de la salida

**Agrupación:**
El sistema agrupa automáticamente los bienes por cuentadante, creando una solicitud separada para cada cuentadante. Esto facilita el proceso de aprobación.

---

### 2. Mis Solicitudes (`/dashboard/usuario/solicitudes`)

**Características:**
- ✅ Lista de todas las solicitudes del usuario
- ✅ Filtros por estado (Todas, Pendientes, Aprobadas, Rechazadas, Devueltas)
- ✅ Badges de estado con colores distintivos
- ✅ Información resumida de cada solicitud
- ✅ Progreso visual de aprobaciones (3 firmas)
- ✅ Modal de detalle completo
- ✅ Visualización de motivo de rechazo
- ✅ Fecha de devolución (si aplica)

**Estados de solicitud:**
- 🟡 **Pendiente**: Esperando aprobaciones
- 🟢 **Aprobada**: Las 3 firmas completadas
- 🔴 **Rechazada**: Rechazada por algún aprobador
- 🔵 **En Préstamo**: Autorizada por vigilancia, en uso
- ⚪ **Devuelta**: Préstamo completado y devuelto

**Proceso de aprobación (3 firmas):**
1. ✅ Cuentadante (responsable del bien)
2. ✅ Administrador (del edificio)
3. ✅ Coordinador (del centro de formación)

Después de las 3 aprobaciones, el vigilante autoriza la salida física del bien.

---

## 🎨 Diseño

**Colores SENA:**
- Primary: `#39A900` (Verde SENA)
- Secondary: `#007832` (Verde oscuro)

**Componentes:**
- Tablas responsivas con scroll
- Paginación funcional
- Filtros interactivos
- Modal de detalle
- Badges de estado
- Barras de progreso

---

## 🔄 Flujo de Usuario

### Crear Solicitud:
1. Usuario navega a "Nueva Solicitud"
2. Busca y selecciona bienes disponibles
3. Los bienes se agrupan automáticamente por cuentadante
4. Completa el formulario con motivo, destino y fechas
5. Guarda la solicitud
6. El sistema crea solicitudes separadas por cada cuentadante

### Ver Solicitudes:
1. Usuario navega a "Mis Solicitudes"
2. Ve todas sus solicitudes con estado actual
3. Puede filtrar por estado
4. Hace clic en "Ver Detalle Completo" para más información
5. Ve el progreso de aprobaciones
6. Si fue rechazada, ve el motivo

---

## 📊 Datos de Ejemplo

Actualmente las vistas usan datos estáticos de ejemplo. En producción, estos datos vendrán de:

**API Endpoints (a implementar):**
- `GET /api/bienes/disponibles` - Obtener bienes disponibles
- `POST /api/solicitudes` - Crear nueva solicitud
- `GET /api/solicitudes/mis-solicitudes` - Obtener solicitudes del usuario
- `GET /api/solicitudes/:id` - Obtener detalle de solicitud

---

## 🚀 Próximos Pasos

### Backend (Pendiente):
- [ ] Crear API endpoint para obtener bienes disponibles
- [ ] Crear API endpoint para crear solicitudes
- [ ] Crear API endpoint para obtener solicitudes del usuario
- [ ] Implementar lógica de agrupación por cuentadante
- [ ] Implementar sistema de notificaciones

### Frontend (Mejoras):
- [ ] Conectar con APIs reales
- [ ] Agregar loading states
- [ ] Agregar manejo de errores
- [ ] Agregar confirmaciones antes de acciones
- [ ] Agregar paginación en "Mis Solicitudes"
- [ ] Agregar exportación de solicitudes a PDF
- [ ] Agregar notificaciones en tiempo real

---

## 💡 Notas Técnicas

**Validación de Fechas:**
```javascript
// Fecha mínima es hoy
const fechaMinima = useMemo(() => {
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 16);
}, []);

// Fecha de regreso mínima es 1 día después de salida
const fechaMinimaRegreso = useMemo(() => {
  if (!formData.fechaSalida) return fechaMinima;
  const fechaSalida = new Date(formData.fechaSalida);
  fechaSalida.setDate(fechaSalida.getDate() + 1);
  return fechaSalida.toISOString().slice(0, 16);
}, [formData.fechaSalida, fechaMinima]);
```

**Agrupación por Cuentadante:**
```javascript
const grupos = {};
seleccionados.forEach(codigo => {
  const bien = bienes.find(b => b.codigo === codigo);
  if (!grupos[bien.cuentadante]) grupos[bien.cuentadante] = [];
  grupos[bien.cuentadante].push(bien);
});
```

---

## 🔐 Permisos

Solo usuarios con rol **"usuario"** pueden acceder a estas vistas.

El middleware de Next.js (`middleware.js`) debe verificar:
- Usuario autenticado
- Rol = "usuario"
- Token JWT válido

---

## 📱 Responsividad

Las vistas están optimizadas para:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

Grid layout se adapta automáticamente:
- Mobile: 1 columna
- Desktop: 2-3 columnas según la vista
