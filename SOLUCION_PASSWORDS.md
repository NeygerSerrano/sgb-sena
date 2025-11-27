# 🔧 Solución al Problema de "Credenciales Incorrectas"

## 📋 Problema Identificado

El sistema mostraba el error "credenciales incorrectas" al intentar iniciar sesión, incluso con las credenciales correctas.

### Causa Raíz
Las contraseñas en la base de datos no estaban correctamente hasheadas con bcrypt, o los hashes eran inválidos/corruptos.

## ✅ Solución Implementada

Se creó el script `fix-passwords.js` que:

1. ✅ Conecta a la base de datos PostgreSQL
2. ✅ Genera hashes bcrypt correctos (10 rounds) para cada usuario
3. ✅ Actualiza las contraseñas en la tabla `usuarios`
4. ✅ Verifica que los hashes sean válidos
5. ✅ Muestra las credenciales actualizadas

## 🚀 Cómo Usar

### Opción 1: Comando NPM (Recomendado)
```bash
npm run fix-passwords
```

### Opción 2: Node directo
```bash
node scripts/fix-passwords.js
```

## 📊 Resultado Esperado

```
🔧 Arreglando contraseñas de usuarios...

📊 Conectando a la base de datos...
✅ Conexión exitosa

🔄 Procesando: admin@sena.edu.co
   🔐 Hash generado: $2b$10$7KbWvqgx54tS760LbuftUue...
   ✅ Actualizado - ID: 1 - Rol: administrador

[... más usuarios ...]

═══════════════════════════════════════════════════════════
✨ PROCESO COMPLETADO
═══════════════════════════════════════════════════════════
✅ Usuarios actualizados: 6

📋 CREDENCIALES ACTUALIZADAS:
───────────────────────────────────────────────────────────
   admin@sena.edu.co              → admin123
   cuentadante@sena.edu.co        → cuenta123
   almacenista@sena.edu.co        → alma123
   vigilante@sena.edu.co          → vigi123
   usuario@sena.edu.co            → user123
   coordinador@sena.edu.co        → coord123
═══════════════════════════════════════════════════════════

🎉 ¡Ahora puedes iniciar sesión con estas credenciales!
```

## 🔍 Verificación

Para verificar que todo funciona correctamente:

```bash
npm run test-login
```

Deberías ver:
```
✅ ¡CONTRASEÑA CORRECTA! El login debería funcionar
```

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
- ✅ `scripts/fix-passwords.js` - Script principal para arreglar contraseñas
- ✅ `CREDENCIALES.md` - Documentación de credenciales de prueba
- ✅ `scripts/README.md` - Documentación de todos los scripts
- ✅ `SOLUCION_PASSWORDS.md` - Este archivo

### Archivos Modificados
- ✅ `package.json` - Actualizado comando `fix-passwords`
- ✅ `scripts/test-login.js` - Actualizado para nuevo sistema de roles
- ✅ `README.md` - Agregada sección de solución de problemas

## 🔐 Detalles Técnicos

### Hashing de Contraseñas
- **Algoritmo**: bcrypt
- **Salt Rounds**: 10
- **Longitud del Hash**: 60 caracteres
- **Formato**: `$2b$10$...`

### Contraseñas de Prueba
| Usuario | Contraseña | Hash (primeros 30 chars) |
|---------|------------|--------------------------|
| admin@sena.edu.co | admin123 | $2b$10$7KbWvqgx54tS760Lbuf... |
| cuentadante@sena.edu.co | cuenta123 | $2b$10$rN9tguf8Ob6gu.NiYQj... |
| almacenista@sena.edu.co | alma123 | $2b$10$sVFNkvfM.EhPQjRz/cS... |
| vigilante@sena.edu.co | vigi123 | $2b$10$QwSM2Mi1aGOUHBOqV0d... |
| usuario@sena.edu.co | user123 | $2b$10$SZOy7A.FR/cUc3i4k15... |
| coordinador@sena.edu.co | coord123 | $2b$10$NP9z3Y5BI/5QHqvPe6B... |

## 🎯 Casos de Uso

### Cuándo ejecutar `fix-passwords`:

1. ✅ **Después de clonar el repositorio**
   - Los hashes pueden no coincidir entre máquinas

2. ✅ **Después de restaurar un backup**
   - Los hashes pueden estar corruptos

3. ✅ **Error "credenciales incorrectas"**
   - Los hashes no son válidos

4. ✅ **Después de migrar el sistema de roles**
   - Asegura compatibilidad con la nueva estructura

5. ✅ **En un nuevo entorno de desarrollo**
   - Garantiza que las contraseñas funcionen

## 💡 Prevención

Para evitar este problema en el futuro:

1. ✅ Siempre usa `npm run create-users` al configurar por primera vez
2. ✅ No modifiques manualmente los hashes en la base de datos
3. ✅ Usa `fix-passwords` después de cualquier migración
4. ✅ Documenta las credenciales en `CREDENCIALES.md`

## 🆘 Solución de Problemas

### Error: "Cannot connect to database"
```bash
# Verifica que PostgreSQL esté corriendo
# Windows: Servicios → PostgreSQL
# Verifica credenciales en .env.local
npm run test-db
```

### Error: "Table usuarios does not exist"
```bash
# Ejecuta el schema SQL
psql -U postgres -d sena_bienes -f database_schema.sql
```

### Error: "User not found"
```bash
# Crea los usuarios
npm run create-users
```

## 📞 Soporte

Si el problema persiste:
1. Verifica `.env.local` tiene las credenciales correctas
2. Ejecuta `npm run test-db` para verificar conexión
3. Ejecuta `npm run test-login` para diagnosticar
4. Revisa los logs en la consola

---

**Fecha de Solución**: 27 de noviembre de 2025  
**Estado**: ✅ Resuelto y Verificado
