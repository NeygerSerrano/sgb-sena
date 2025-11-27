# 📜 Scripts del Sistema

Este directorio contiene scripts útiles para el mantenimiento y testing del sistema.

## 🔧 Scripts Disponibles

### 1. fix-passwords.js ⭐ **NUEVO**
**Uso:** `npm run fix-passwords`

Regenera las contraseñas de todos los usuarios de prueba con hashes bcrypt correctos.

**Cuándo usarlo:**
- ❌ Error "credenciales incorrectas" al iniciar sesión
- 🔄 Después de clonar el repositorio
- 💾 Después de restaurar un backup de la base de datos
- 🔀 Después de migrar el sistema de roles

**Usuarios que actualiza:**
- admin@sena.edu.co → admin123
- cuentadante@sena.edu.co → cuenta123
- almacenista@sena.edu.co → alma123
- vigilante@sena.edu.co → vigi123
- usuario@sena.edu.co → user123
- coordinador@sena.edu.co → coord123

---

### 2. test-login.js
**Uso:** `npm run test-login`

Diagnostica problemas de login verificando:
- ✅ Conexión a PostgreSQL
- ✅ Existencia de la tabla usuarios
- ✅ Usuarios en la base de datos
- ✅ Validez de los hashes de contraseñas

---

### 3. create-test-users.js
**Uso:** `npm run create-users`

Crea usuarios de prueba desde cero (solo si no existen).

**Nota:** Si los usuarios ya existen, usa `fix-passwords` en su lugar.

---

### 4. test-connection.js
**Uso:** `npm run test-db`

Verifica la conexión a PostgreSQL y muestra información de la base de datos.

---

### 5. test-api-login.js
**Uso:** `npm run test-api-login`

Prueba el endpoint de login `/api/auth/login` haciendo una petición HTTP real.

---

### 6. check-env.js
**Uso:** `npm run check-env`

Verifica que todas las variables de entorno necesarias estén configuradas en `.env.local`.

---

### 7. recreate-users.js (DEPRECADO)
**Uso:** ~~`npm run fix-passwords`~~ (ahora usa fix-passwords.js)

Este script ha sido reemplazado por `fix-passwords.js` que es más robusto.

---

## 🚀 Flujo Recomendado

### Primera vez configurando el proyecto:
```bash
# 1. Verificar variables de entorno
npm run check-env

# 2. Verificar conexión a PostgreSQL
npm run test-db

# 3. Crear usuarios de prueba
npm run create-users

# 4. Probar login
npm run test-login
```

### Si tienes problemas de login:
```bash
# 1. Diagnosticar el problema
npm run test-login

# 2. Arreglar contraseñas
npm run fix-passwords

# 3. Verificar que funcione
npm run test-login
```

---

## 💡 Tips

- Todos los scripts usan las credenciales de `.env.local`
- Los hashes bcrypt tienen 60 caracteres de longitud
- El salt rounds usado es 10 (balance entre seguridad y velocidad)
- Las contraseñas NUNCA se almacenan en texto plano

---

## 🔐 Seguridad

⚠️ **IMPORTANTE:** Las credenciales en estos scripts son SOLO para desarrollo/pruebas.

En producción:
- Usa contraseñas seguras y únicas
- Cambia el JWT_SECRET
- Configura variables de entorno seguras
- No subas `.env.local` al repositorio
