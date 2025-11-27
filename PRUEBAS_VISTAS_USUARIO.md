# 🧪 Guía de Pruebas - Vistas de Usuario

## 🚀 Inicio Rápido

### 1. Iniciar el servidor
```bash
npm run dev
```

### 2. Abrir en el navegador
```
http://localhost:3000
```

### 3. Iniciar sesión como usuario
```
Email: usuario@sena.edu.co
Password: user123
```

---

## ✅ Checklist de Pruebas

### Vista: Nueva Solicitud (`/dashboard/usuario/solicitar`)

#### Búsqueda de Bienes
- [ ] El campo de búsqueda filtra por código
- [ ] El campo de búsqueda filtra por serial
- [ ] El campo de búsqueda filtra por nombre
- [ ] El campo de búsqueda filtra por cuentadante
- [ ] La búsqueda es en tiempo real (sin botón)
- [ ] La búsqueda no distingue mayúsculas/minúsculas

#### Tabla de Bienes
- [ ] Se muestran 5 bienes por página
- [ ] La paginación funciona correctamente
- [ ] El botón "Anterior" se deshabilita en la primera página
- [ ] El botón "Siguiente" se deshabilita en la última página
- [ ] El hover en las filas funciona
- [ ] Los botones "Seleccionar" funcionan

#### Selección de Bienes
- [ ] Al hacer clic en "Seleccionar", el bien se agrega a la lista
- [ ] El botón cambia a "✓ Seleccionado"
- [ ] Los bienes seleccionados aparecen en la sección inferior
- [ ] Los bienes se agrupan por cuentadante
- [ ] El contador de bienes seleccionados es correcto
- [ ] El botón "Quitar" elimina el bien de la selección

#### Formulario
- [ ] El campo "Motivo" acepta texto
- [ ] El campo "Destino" acepta texto
- [ ] El campo "Fecha de Salida" no permite fechas pasadas
- [ ] El campo "Fecha de Regreso" se habilita después de seleccionar fecha de salida
- [ ] La fecha de regreso mínima es 1 día después de la salida
- [ ] El campo "Observaciones" es opcional

#### Validaciones
- [ ] Alerta si no hay bienes seleccionados
- [ ] Alerta si falta el motivo
- [ ] Alerta si falta el destino
- [ ] Alerta si falta la fecha de salida
- [ ] Alerta si falta la fecha de regreso
- [ ] Alerta si la fecha de salida es anterior a hoy
- [ ] Alerta si la fecha de regreso es menos de 1 día después

#### Guardar Solicitud
- [ ] Muestra mensaje con el grupo de solicitud creado
- [ ] Muestra los bienes agrupados por cuentadante
- [ ] Limpia el formulario después de guardar
- [ ] Limpia la selección de bienes

#### Botón Cancelar
- [ ] Limpia todos los campos del formulario
- [ ] Limpia la selección de bienes
- [ ] Limpia la búsqueda
- [ ] Resetea la paginación a página 1

---

### Vista: Mis Solicitudes (`/dashboard/usuario/solicitudes`)

#### Filtros
- [ ] El filtro "Todas" muestra todas las solicitudes
- [ ] El filtro "Pendientes" muestra solo pendientes
- [ ] El filtro "Aprobadas" muestra solo aprobadas
- [ ] El filtro "Rechazadas" muestra solo rechazadas
- [ ] El filtro "Devueltas" muestra solo devueltas
- [ ] El filtro activo se resalta en verde

#### Lista de Solicitudes
- [ ] Se muestran todas las solicitudes del usuario
- [ ] Cada solicitud muestra el motivo
- [ ] Cada solicitud muestra el ID de grupo
- [ ] Cada solicitud muestra la fecha de solicitud
- [ ] Cada solicitud muestra el destino
- [ ] Cada solicitud muestra el período (salida → regreso)
- [ ] Cada solicitud muestra la cantidad de bienes
- [ ] Los bienes se muestran como chips/badges

#### Badges de Estado
- [ ] Estado "Pendiente" es amarillo con ⏳
- [ ] Estado "Aprobada" es verde con ✅
- [ ] Estado "Rechazada" es rojo con ❌
- [ ] Estado "En Préstamo" es azul con 📦
- [ ] Estado "Devuelta" es gris con ✓

#### Progreso de Aprobaciones
- [ ] Muestra 3 barras (Cuentadante, Administrador, Coordinador)
- [ ] Las barras aprobadas son verdes
- [ ] Las barras pendientes son grises
- [ ] Los labels están correctamente alineados

#### Motivo de Rechazo
- [ ] Se muestra solo en solicitudes rechazadas
- [ ] Aparece en un recuadro rojo
- [ ] El texto es legible

#### Botón "Ver Detalle Completo"
- [ ] Abre el modal de detalle
- [ ] El modal muestra toda la información
- [ ] El modal tiene scroll si el contenido es largo

#### Modal de Detalle
- [ ] Muestra el título correcto
- [ ] Muestra el ID de grupo
- [ ] Muestra el badge de estado
- [ ] Muestra todas las fechas
- [ ] Muestra el destino
- [ ] Lista todos los bienes con sus cuentadantes
- [ ] Muestra el estado de cada aprobación con íconos
- [ ] Muestra las fechas de aprobación
- [ ] Muestra el motivo de rechazo (si aplica)
- [ ] Muestra la fecha de devolución (si aplica)
- [ ] El botón "×" cierra el modal
- [ ] El botón "Cerrar" cierra el modal
- [ ] Hacer clic fuera del modal NO lo cierra (por seguridad)

#### Mensaje de Lista Vacía
- [ ] Se muestra cuando no hay solicitudes
- [ ] El mensaje es claro y amigable

---

## 🎨 Pruebas de Diseño

### Colores
- [ ] Los botones principales son verde SENA (#39A900)
- [ ] El hover de botones es verde oscuro (#007832)
- [ ] Los colores de estado son distintivos
- [ ] El contraste de texto es legible

### Responsividad
- [ ] En mobile (< 768px) el layout es de 1 columna
- [ ] En tablet (768px - 1024px) el layout se adapta
- [ ] En desktop (> 1024px) el layout es de 3 columnas
- [ ] La tabla tiene scroll horizontal en mobile
- [ ] El modal se adapta al tamaño de pantalla

### Interactividad
- [ ] Los botones tienen efecto hover
- [ ] Los inputs tienen focus visible
- [ ] Las transiciones son suaves
- [ ] Los cursores cambian apropiadamente

---

## 🐛 Casos de Prueba Específicos

### Caso 1: Crear solicitud con 1 bien
1. Seleccionar 1 bien
2. Completar formulario
3. Guardar
4. ✅ Debe crear 1 solicitud

### Caso 2: Crear solicitud con bienes de diferentes cuentadantes
1. Seleccionar 2 bienes de "Carlos Rodríguez"
2. Seleccionar 1 bien de "María Gómez"
3. Completar formulario
4. Guardar
5. ✅ Debe crear 2 solicitudes (agrupadas por cuentadante)

### Caso 3: Validación de fechas
1. Intentar seleccionar fecha de salida de ayer
2. ✅ No debe permitirlo
3. Seleccionar fecha de salida de mañana
4. Intentar seleccionar fecha de regreso del mismo día
5. ✅ No debe permitirlo
6. Seleccionar fecha de regreso 2 días después
7. ✅ Debe permitirlo

### Caso 4: Búsqueda
1. Buscar "TEC"
2. ✅ Debe mostrar solo bienes con código TEC-*
3. Buscar "Lenovo"
4. ✅ Debe mostrar solo el portátil Lenovo
5. Buscar "Carlos"
6. ✅ Debe mostrar todos los bienes de Carlos Rodríguez

### Caso 5: Filtros en Mis Solicitudes
1. Hacer clic en "Pendientes"
2. ✅ Debe mostrar solo 1 solicitud
3. Hacer clic en "Aprobadas"
4. ✅ Debe mostrar solo 1 solicitud
5. Hacer clic en "Todas"
6. ✅ Debe mostrar 4 solicitudes

---

## 📊 Datos de Prueba

### Bienes Disponibles (8 total):
- TEC-001: Portátil Lenovo (Carlos Rodríguez)
- TEC-002: Portátil Dell (Carlos Rodríguez)
- TEC-003: Impresora HP (María Gómez)
- TEC-004: Proyector Epson (Luis Fernández)
- TEC-005: Monitor Samsung (Carlos Rodríguez)
- MOB-001: Silla ergonómica (María Gómez)
- MOB-002: Escritorio modular (María Gómez)
- LAB-001: Microscopio (Sofía Herrera)

### Solicitudes de Ejemplo (4 total):
1. **Pendiente**: Clase de programación (2 bienes)
2. **Aprobada**: Taller de laboratorio (1 bien)
3. **Rechazada**: Presentación proyecto (1 bien)
4. **Devuelta**: Capacitación docente (2 bienes)

---

## 🔍 Verificación de Consola

Abrir DevTools (F12) y verificar:
- [ ] No hay errores en la consola
- [ ] No hay warnings críticos
- [ ] Las peticiones (cuando se conecte al backend) son correctas

---

## ✅ Resultado Esperado

Al completar todas las pruebas:
- ✅ Todas las funcionalidades deben trabajar correctamente
- ✅ No debe haber errores en consola
- ✅ La experiencia de usuario debe ser fluida
- ✅ El diseño debe ser consistente
- ✅ Las validaciones deben prevenir errores

---

## 📝 Reporte de Bugs

Si encuentras algún problema, documenta:
1. **Qué hiciste**: Pasos para reproducir
2. **Qué esperabas**: Comportamiento esperado
3. **Qué pasó**: Comportamiento actual
4. **Navegador**: Chrome, Firefox, etc.
5. **Tamaño de pantalla**: Mobile, tablet, desktop
6. **Captura de pantalla**: Si es posible

---

**Fecha de Pruebas:** _______________  
**Probado por:** _______________  
**Estado:** [ ] Aprobado [ ] Con observaciones [ ] Rechazado
