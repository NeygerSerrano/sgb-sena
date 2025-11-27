# 🔄 Cambios: Solicitudes Separadas por Cuentadante

## 📋 Resumen del Cambio

Se ha modificado el sistema para que cuando un usuario crea una solicitud con bienes de múltiples cuentadantes, **se generen solicitudes separadas** (una por cada cuentadante) en lugar de una solicitud agrupada.

---

## 🎯 Objetivo

**Antes:** Una solicitud con múltiples grupos internos  
**Ahora:** Múltiples solicitudes independientes, una por cuentadante

### Ventajas
✅ Cada solicitud es independiente  
✅ Aprobaciones más claras y simples  
✅ Mejor seguimiento por cuentadante  
✅ Estados más precisos  
✅ Facilita el flujo de aprobación  

---

## 🔄 Cambios en la Estructura de Datos

### Antes (Agrupada)
```javascript
{
  codigo: 'SOL-001',
  grupos: [
    { cuentadante: 'Carlos', bienes: [...] },
    { cuentadante: 'María', bienes: [...] }
  ]
}
```

### Ahora (Separada)
```javascript
// Solicitud 1
{
  codigo: 'SOL-001-1',
  grupo_solicitud: 'GRP-001',
  cuentadante: 'Carlos',
  bienes: [...]
}

// Solicitud 2
{
  codigo: 'SOL-001-2',
  grupo_solicitud: 'GRP-001',
  cuentadante: 'María',
  bienes: [...]
}
```

---

## 📊 Nueva Estructura de la Tabla

### Columnas Actualizadas

| Columna | Descripción | Ejemplo |
|---------|-------------|---------|
| **Código** | Código único de la solicitud | SOL-001-1 |
| **Grupo** | Agrupa solicitudes creadas juntas | GRP-001 |
| **Cuentadante** | Cuentadante responsable | Carlos Rodríguez |
| **N° Bienes** | Cantidad de bienes | 2 |
| **Fecha Salida** | Fecha de salida | 2025-09-25 |
| **Fecha Regreso** | Fecha de regreso | 2025-09-28 |
| **Estado** | Estado de la solicitud | Aprobada |
| **Acciones** | Botón Ver Detalle | [Ver Detalle] |

---

## 🔍 Ejemplo Visual

### Creación de Solicitud

```
Usuario selecciona:
├─ 2 bienes de Carlos Rodríguez
└─ 2 bienes de María Gómez

        ↓ Al guardar ↓

Se crean 2 solicitudes:

┌─────────────────────────────────────┐
│ SOL-001-1 (GRP-001)                 │
│ Cuentadante: Carlos Rodríguez       │
│ Bienes: 2                           │
│ Estado: Pendiente                   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ SOL-001-2 (GRP-001)                 │
│ Cuentadante: María Gómez            │
│ Bienes: 2                           │
│ Estado: Pendiente                   │
└─────────────────────────────────────┘
```

### Vista en la Tabla

```
┌──────────┬─────────┬─────────────────┬─────────┬────────────┬──────────┐
│ Código   │ Grupo   │ Cuentadante     │ Bienes  │ Estado     │ Acciones │
├──────────┼─────────┼─────────────────┼─────────┼────────────┼──────────┤
│ SOL-001-1│ GRP-001 │ Carlos Rodríguez│    2    │ ✅ Aprobada│ [Detalle]│
│ SOL-001-2│ GRP-001 │ María Gómez     │    2    │ ❌ Rechazada│ [Detalle]│
│ SOL-002-1│ GRP-002 │ Luis Fernández  │    2    │ ❌ Rechazada│ [Detalle]│
│ SOL-002-2│ GRP-002 │ Sofía Herrera   │    2    │ ⏳ Pendiente│ [Detalle]│
└──────────┴─────────┴─────────────────┴─────────┴────────────┴──────────┘
```

---

## 🎨 Cambios en las Vistas

### 1. Vista "Crear Solicitud" (`/dashboard/usuario/solicitar`)

**Mensaje al guardar actualizado:**

```
✅ Se crearán 2 solicitudes separadas
Grupo: GRP-1732812345678

📋 Detalle por cuentadante:

Solicitud 1: Carlos Rodríguez
2 bienes:
  • TEC-001 - Portátil Lenovo ThinkPad T14
  • TEC-002 - Portátil Dell Latitude 5420

Solicitud 2: María Gómez
2 bienes:
  • MOB-001 - Silla ergonómica ejecutiva
  • MOB-002 - Escritorio modular de madera

💡 Cada solicitud será aprobada de forma independiente 
   por su cuentadante y administrador correspondiente.
```

### 2. Vista "Mis Solicitudes" (`/dashboard/usuario/solicitudes`)

**Cambios en la tabla:**
- ✅ Columna "Grupo" agregada
- ✅ Columna "Cuentadante" (singular) en lugar de "Cuentadantes"
- ✅ Cada fila es una solicitud independiente
- ✅ Búsqueda por código, grupo o cuentadante

**Cambios en el modal:**
- ✅ Muestra información de una sola solicitud
- ✅ Muestra el grupo al que pertenece
- ✅ Muestra el cuentadante responsable
- ✅ Tabla de bienes de esa solicitud específica
- ✅ Estados de aprobación (cuentadante y admin)
- ✅ Nota informativa si hay solicitudes relacionadas

---

## 🔄 Flujo de Aprobación

### Solicitud Individual

```
SOL-001-1 (Carlos Rodríguez)
│
├─ 1. Cuentadante revisa → ✅ Aprueba
│
├─ 2. Administrador revisa → ✅ Aprueba
│
└─ Estado Final: ✅ Aprobada
```

### Solicitudes del Mismo Grupo

```
GRP-001
│
├─ SOL-001-1 (Carlos)
│  ├─ Cuentadante: ✅ Aprobada
│  ├─ Admin: ✅ Aprobada
│  └─ Estado: ✅ Aprobada
│
└─ SOL-001-2 (María)
   ├─ Cuentadante: ❌ Rechazada
   ├─ Admin: ⚪ No aplica
   └─ Estado: ❌ Rechazada

Resultado: Cada solicitud tiene su propio estado
```

---

## 📝 Campos Nuevos

### Campo: `grupo_solicitud`
- **Tipo:** String
- **Formato:** `GRP-{timestamp}`
- **Propósito:** Agrupar solicitudes creadas al mismo tiempo
- **Ejemplo:** `GRP-1732812345678`

### Campo: `codigo` (actualizado)
- **Formato anterior:** `SOL-001`
- **Formato nuevo:** `SOL-001-1`, `SOL-001-2`, etc.
- **Propósito:** Identificar cada solicitud de forma única

---

## 🔍 Búsqueda Mejorada

La búsqueda ahora funciona con:
- ✅ Código de solicitud: `SOL-001-1`
- ✅ Grupo de solicitud: `GRP-001`
- ✅ Nombre de cuentadante: `Carlos`

**Ejemplo:**
```
Buscar "GRP-001" → Muestra todas las solicitudes del grupo
Buscar "Carlos"  → Muestra todas las solicitudes de Carlos
Buscar "SOL-001" → Muestra SOL-001-1 y SOL-001-2
```

---

## 🎯 Estados de Solicitud

Cada solicitud tiene su propio estado independiente:

| Estado | Descripción | Color |
|--------|-------------|-------|
| ⏳ **Pendiente** | Esperando aprobación | Amarillo |
| ✅ **Aprobada** | Aprobada por cuentadante y admin | Verde |
| ❌ **Rechazada** | Rechazada por algún aprobador | Rojo |
| ⚪ **No aplica** | No corresponde (ej: admin cuando cuentadante rechazó) | Gris |

---

## 💡 Ventajas del Nuevo Sistema

### 1. Claridad
Cada solicitud es independiente y fácil de entender.

### 2. Seguimiento
Puedes ver el estado de cada cuentadante por separado.

### 3. Aprobaciones
Cada cuentadante aprueba solo sus bienes.

### 4. Flexibilidad
Una solicitud puede ser aprobada mientras otra es rechazada.

### 5. Historial
Mejor trazabilidad de cada solicitud individual.

---

## 🔄 Comparación: Antes vs Ahora

| Aspecto | Antes | Ahora |
|---------|-------|-------|
| **Estructura** | 1 solicitud con grupos | N solicitudes separadas |
| **Código** | SOL-001 | SOL-001-1, SOL-001-2 |
| **Agrupación** | Grupos internos | Campo grupo_solicitud |
| **Estados** | Estado general calculado | Estado por solicitud |
| **Aprobaciones** | Múltiples por solicitud | Una por solicitud |
| **Tabla** | 1 fila por grupo | 1 fila por cuentadante |
| **Modal** | Múltiples cuentadantes | Un cuentadante |

---

## 🚀 Cómo Probar

### 1. Crear Solicitud con Múltiples Cuentadantes

```bash
# 1. Ir a Nueva Solicitud
http://localhost:3000/dashboard/usuario/solicitar

# 2. Seleccionar bienes de diferentes cuentadantes
- 2 bienes de Carlos Rodríguez
- 2 bienes de María Gómez

# 3. Completar formulario y guardar

# 4. Ver mensaje de confirmación
"Se crearán 2 solicitudes separadas"
```

### 2. Ver Solicitudes Separadas

```bash
# 1. Ir a Mis Solicitudes
http://localhost:3000/dashboard/usuario/solicitudes

# 2. Verificar que aparecen 2 filas
SOL-001-1 (Carlos)
SOL-001-2 (María)

# 3. Ambas tienen el mismo grupo
GRP-001
```

### 3. Ver Detalle Individual

```bash
# 1. Hacer clic en "Ver Detalle" de SOL-001-1

# 2. Verificar información
- Código: SOL-001-1
- Grupo: GRP-001
- Cuentadante: Carlos Rodríguez
- Bienes: Solo los de Carlos
- Estados: Solo de esta solicitud

# 3. Ver nota informativa
"Esta solicitud pertenece al grupo GRP-001.
Hay 2 solicitudes relacionadas..."
```

---

## 📊 Datos de Ejemplo

El sistema incluye 6 solicitudes de ejemplo:

```
GRP-001 (2 solicitudes)
├─ SOL-001-1: Carlos Rodríguez (Aprobada)
└─ SOL-001-2: María Gómez (Rechazada)

GRP-002 (2 solicitudes)
├─ SOL-002-1: Luis Fernández (Rechazada)
└─ SOL-002-2: Sofía Herrera (Pendiente)

GRP-003 (2 solicitudes)
├─ SOL-003-1: María Gómez (Aprobada)
└─ SOL-003-2: Carlos Rodríguez (Rechazada)
```

---

## 🔐 Consideraciones para el Backend

### Al Crear Solicitud

```javascript
// Pseudocódigo
function crearSolicitud(datos) {
  const grupoId = generarGrupoId();
  const solicitudesCreadas = [];
  
  // Agrupar bienes por cuentadante
  const grupos = agruparPorCuentadante(datos.bienes);
  
  // Crear una solicitud por cada cuentadante
  let contador = 1;
  for (const cuentadante in grupos) {
    const solicitud = {
      codigo: `SOL-${timestamp}-${contador}`,
      grupo_solicitud: grupoId,
      cuentadante: cuentadante,
      bienes: grupos[cuentadante],
      motivo: datos.motivo,
      destino: datos.destino,
      // ... otros campos
    };
    
    const resultado = await db.insert(solicitud);
    solicitudesCreadas.push(resultado);
    contador++;
  }
  
  return solicitudesCreadas;
}
```

### Al Consultar Solicitudes

```javascript
// Obtener todas las solicitudes del usuario
GET /api/solicitudes/mis-solicitudes

// Respuesta: Array de solicitudes individuales
[
  {
    codigo: 'SOL-001-1',
    grupo_solicitud: 'GRP-001',
    cuentadante: 'Carlos Rodríguez',
    // ...
  },
  {
    codigo: 'SOL-001-2',
    grupo_solicitud: 'GRP-001',
    cuentadante: 'María Gómez',
    // ...
  }
]
```

---

## ✅ Checklist de Implementación

### Frontend
- [x] Actualizar estructura de datos
- [x] Modificar tabla de solicitudes
- [x] Agregar columna "Grupo"
- [x] Actualizar modal de detalle
- [x] Mejorar mensaje al guardar
- [x] Actualizar búsqueda
- [x] Agregar nota informativa

### Backend (Pendiente)
- [ ] Modificar endpoint de creación
- [ ] Implementar agrupación por cuentadante
- [ ] Generar códigos únicos
- [ ] Generar grupo_solicitud
- [ ] Actualizar endpoint de consulta
- [ ] Agregar filtro por grupo

---

## 🎉 Resultado Final

✅ **Sistema más claro y organizado**  
✅ **Cada solicitud es independiente**  
✅ **Mejor seguimiento por cuentadante**  
✅ **Estados más precisos**  
✅ **Aprobaciones simplificadas**  
✅ **Listo para integración con backend**

---

**Fecha de Implementación:** 27 de noviembre de 2025  
**Estado:** ✅ Completado  
**Versión:** 3.0
