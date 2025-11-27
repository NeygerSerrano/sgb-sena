# 👁️ Guía Visual: Mis Solicitudes

## 📊 Vista Principal

```
┌─────────────────────────────────────────────────────────────────────┐
│  Mis Solicitudes                    🔍 [Buscar por código...]       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ Código │ Cuentadantes │ N° Bienes │ Fecha Salida │ Estado   │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │ SOL-001│ Carlos, María│     4     │  2025-09-25  │ 🔵 Parcial│  │
│  │ SOL-002│ Luis, Sofía  │     4     │  2025-09-26  │ ⏳ Pendiente│ │
│  │ SOL-003│ María, Carlos│     2     │  2025-09-27  │ 🔵 Parcial│  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  [◀ Anterior]        Página 1 de 1        [Siguiente ▶]            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Modal de Detalle

```
┌─────────────────────────────────────────────────────────────────────┐
│  📋 Detalles de la Solicitud: SOL-001                          [✖]  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 📝 INFORMACIÓN GENERAL                                       │   │
│  │                                                              │   │
│  │  Uso o Motivo:    Desarrollo de software y capacitación     │   │
│  │  Destino:         Laboratorio de Sistemas - Bloque C        │   │
│  │  Fecha Salida:    2025-09-25                                │   │
│  │  Fecha Regreso:   2025-09-28                                │   │
│  │  Solicitante:     Sofía Herrera                             │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 👤 Cuentadante: Carlos Rodríguez                            │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Objeto          │ Marca  │ Modelo        │ Placa           │   │
│  │ Portátil Lenovo │ Lenovo │ ThinkPad T14  │ LAP-2024-156    │   │
│  │ Portátil Dell   │ Dell   │ Latitude 5420 │ LAP-2024-157    │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Estado Cuentadante: ✅ Aprobada                             │   │
│  │ Estado Administrador: ✅ Aprobada                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 👤 Cuentadante: María Gómez                                 │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Objeto      │ Marca     │ Modelo          │ Placa          │   │
│  │ Silla       │ ErgoTech  │ Executive Pro   │ MOB-2024-158   │   │
│  │ Escritorio  │ Maderkit  │ Modular 120     │ MOB-2024-159   │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ Estado Cuentadante: ❌ Rechazada                            │   │
│  │ ⚠️ Motivo: Silla dañada                                     │   │
│  │ Estado Administrador: ⚪ No aplica                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│                                              [Cerrar]                │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Códigos de Color

### Estados
```
✅ Aprobada          → Verde (#007832)
⏳ Pendiente         → Amarillo (#FEF3C7)
❌ Rechazada         → Rojo (#FEE2E2)
🔵 Aprobación parcial → Azul (#DBEAFE)
⚪ No aplica         → Gris (#F3F4F6)
```

### Elementos
```
Header Modal        → Verde SENA (#39A900)
Tabla Header        → Verde SENA (#39A900)
Botón Ver Detalle   → Azul (#3B82F6)
Botón Cerrar        → Gris (#4B5563)
Bordes              → Gris claro (#E5E7EB)
```

---

## 📋 Flujo de Usuario

```
1. Usuario ve la tabla de solicitudes
   │
   ├─→ Puede buscar por código: "SOL-001"
   ├─→ Puede buscar por cuentadante: "Carlos"
   └─→ Puede navegar entre páginas
   
2. Usuario hace clic en "Ver Detalle"
   │
   └─→ Se abre el modal con información completa
   
3. En el modal, usuario ve:
   │
   ├─→ Información general de la solicitud
   ├─→ Grupos separados por cuentadante
   ├─→ Tabla de bienes de cada grupo
   ├─→ Estados de aprobación
   └─→ Observaciones de rechazo (si aplica)
   
4. Usuario cierra el modal
   │
   └─→ Regresa a la tabla principal
```

---

## 🔄 Estados de Solicitud

### Solicitud con 1 Grupo

```
┌─────────────────────────────────────┐
│ Grupo: Carlos Rodríguez             │
├─────────────────────────────────────┤
│ Cuentadante: ✅ Aprobada            │
│ Admin:       ✅ Aprobada            │
└─────────────────────────────────────┘
         ↓
   Estado General: ✅ Aprobada
```

```
┌─────────────────────────────────────┐
│ Grupo: María Gómez                  │
├─────────────────────────────────────┤
│ Cuentadante: ❌ Rechazada           │
│ Admin:       ⚪ No aplica           │
└─────────────────────────────────────┘
         ↓
   Estado General: ❌ Rechazada
```

### Solicitud con Múltiples Grupos

```
┌─────────────────────────────────────┐
│ Grupo 1: Carlos Rodríguez           │
│ Cuentadante: ✅  Admin: ✅          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Grupo 2: María Gómez                │
│ Cuentadante: ❌  Admin: ⚪          │
└─────────────────────────────────────┘
         ↓
   Estado General: 🔵 Aprobación parcial
```

```
┌─────────────────────────────────────┐
│ Grupo 1: Luis Fernández             │
│ Cuentadante: ⏳  Admin: ⏳          │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Grupo 2: Sofía Herrera              │
│ Cuentadante: ⏳  Admin: ⏳          │
└─────────────────────────────────────┘
         ↓
   Estado General: ⏳ Pendiente
```

---

## 📱 Vistas Responsivas

### Desktop (> 1024px)
```
┌────────────────────────────────────────────────────────┐
│  Mis Solicitudes              🔍 [Buscar...]           │
│  ┌──────────────────────────────────────────────────┐ │
│  │ [Tabla completa visible sin scroll]              │ │
│  │                                                   │ │
│  └──────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Tablet (768px - 1024px)
```
┌──────────────────────────────────────┐
│  Mis Solicitudes                     │
│  🔍 [Buscar...]                      │
│  ┌────────────────────────────────┐ │
│  │ [Tabla con scroll horizontal]  │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

### Mobile (< 768px)
```
┌────────────────────────┐
│  Mis Solicitudes       │
│  🔍 [Buscar...]        │
│  ┌──────────────────┐ │
│  │ [Tabla scroll →] │ │
│  └──────────────────┘ │
└────────────────────────┘
```

---

## 🎯 Elementos Interactivos

### Búsqueda
```
┌─────────────────────────────────────┐
│ 🔍 Buscar por código o cuentadante  │
└─────────────────────────────────────┘
     ↓ (escribe en tiempo real)
┌─────────────────────────────────────┐
│ 🔍 SOL-001                          │
└─────────────────────────────────────┘
     ↓ (filtra resultados)
Muestra solo: SOL-001
```

### Paginación
```
[◀ Anterior]  Página 1 de 3  [Siguiente ▶]
     ↓              ↓              ↓
  Deshabilitado  Indicador    Habilitado
  (página 1)     actual       (hay más)
```

### Botón Ver Detalle
```
┌──────────────┐
│ Ver Detalle  │  ← Hover: bg-blue-600
└──────────────┘
     ↓ (clic)
[Abre modal con información completa]
```

---

## 📊 Información Mostrada

### En la Tabla Principal
```
✓ Código de solicitud
✓ Lista de cuentadantes
✓ Número total de bienes
✓ Fecha de salida
✓ Fecha de regreso
✓ Estado general
✓ Botón de acción
```

### En el Modal de Detalle
```
✓ Motivo de la solicitud
✓ Destino
✓ Fechas (salida y regreso)
✓ Nombre del solicitante
✓ Por cada cuentadante:
  ✓ Tabla de bienes (nombre, marca, modelo, placa)
  ✓ Estado de aprobación del cuentadante
  ✓ Estado de aprobación del administrador
  ✓ Observaciones de rechazo (si aplica)
```

---

## 🔍 Casos de Uso Visuales

### Caso 1: Solicitud Totalmente Aprobada
```
SOL-001
├─ Carlos Rodríguez
│  ├─ Cuentadante: ✅ Aprobada
│  └─ Admin: ✅ Aprobada
└─ Estado General: ✅ Aprobada
```

### Caso 2: Solicitud con Rechazo
```
SOL-002
├─ Luis Fernández
│  ├─ Cuentadante: ✅ Aprobada
│  ├─ Admin: ❌ Rechazada
│  └─ ⚠️ Motivo: Proyector fuera de servicio
└─ Estado General: ❌ Rechazada
```

### Caso 3: Solicitud Pendiente
```
SOL-003
├─ Sofía Herrera
│  ├─ Cuentadante: ⏳ Pendiente
│  └─ Admin: ⏳ Pendiente
└─ Estado General: ⏳ Pendiente
```

### Caso 4: Aprobación Parcial
```
SOL-004
├─ Carlos Rodríguez
│  ├─ Cuentadante: ✅ Aprobada
│  └─ Admin: ✅ Aprobada
├─ María Gómez
│  ├─ Cuentadante: ❌ Rechazada
│  └─ Admin: ⚪ No aplica
└─ Estado General: 🔵 Aprobación parcial
```

---

## 💡 Tips de Uso

### Para Buscar Rápidamente
```
Buscar "SOL"     → Muestra todas las solicitudes
Buscar "SOL-001" → Muestra solo SOL-001
Buscar "Carlos"  → Muestra solicitudes con Carlos como cuentadante
```

### Para Ver Detalles
```
1. Localiza la solicitud en la tabla
2. Haz clic en "Ver Detalle"
3. Revisa la información por grupo
4. Cierra con "✖" o "Cerrar"
```

### Para Entender Estados
```
✅ Verde  → Todo aprobado
⏳ Amarillo → Esperando aprobación
❌ Rojo   → Rechazado
🔵 Azul   → Parcialmente aprobado
⚪ Gris   → No aplica
```

---

**Guía creada:** 27 de noviembre de 2025  
**Versión:** 1.0
