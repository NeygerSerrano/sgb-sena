# 🏢 Sistema de Gestión de Bienes - SENA

Sistema integral para el control y administración de activos institucionales del SENA.

## 📋 Descripción

Aplicación web desarrollada con Next.js que permite gestionar el inventario de bienes del SENA, controlar préstamos con sistema de 3 firmas (Cuentadante, Administrador y Coordinador), y autorizar salidas de bienes a través de vigilancia.

## 🚀 Características

- ✅ Sistema de autenticación con JWT
- ✅ Dashboard personalizado por rol de usuario
- ✅ Registro de bienes con información detallada
- ✅ Sistema de 3 firmas para aprobación de préstamos
- ✅ Control de entrada y salida de bienes
- ✅ 6 roles de usuario: Almacenista, Cuentadante, Administrador, Coordinador, Vigilante y Usuario

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL
- **Autenticación**: JWT con bcryptjs
- **Estilos**: TailwindCSS v4

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/NeygerSerrano/sgb-sena.git
cd sgb-sena
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
   - Copia el contenido de `ENV_TEMPLATE.txt`
   - Crea un archivo `.env.local` en la raíz
   - Configura tus credenciales de base de datos

4. Importa el esquema de la base de datos:
```bash
# Ejecuta el archivo database_schema.sql en tu PostgreSQL
```

5. Crea los usuarios de prueba:
```bash
npm run create-users
```

6. Inicia el servidor de desarrollo:
```bash
npm run dev
```

7. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## 🔐 Credenciales de Prueba

Ver archivo `CREDENCIALES.md` para las credenciales de todos los usuarios de prueba.

**Ejemplo:**
- Email: `admin@sena.edu.co`
- Password: `admin123`

### ⚠️ Problema de "Credenciales Incorrectas"

Si al iniciar sesión recibes el error "credenciales incorrectas", ejecuta:

```bash
npm run fix-passwords
```

Este comando regenera las contraseñas de todos los usuarios con hashes bcrypt correctos.

## 👥 Roles del Sistema

- **Almacenista**: Registra y asigna bienes
- **Cuentadante**: Aprueba/rechaza solicitudes (1ra firma) y gestiona bienes bajo su cuidado
- **Administrador**: Gestiona bienes del edificio y aprueba solicitudes (2da firma)
- **Coordinador**: Aprueba solicitudes de su centro de formación (3ra firma)
- **Vigilante**: Verifica las 3 firmas y autoriza salidas
- **Usuario**: Solicita préstamos de bienes

## 📚 Documentación

- `ARQUITECTURA.md` - Estructura del backend en Next.js
- `FLUJO_SISTEMA.md` - Flujo del sistema de solicitudes
- `BACKEND_GUIDE.md` - Guía del backend
- `database_schema.sql` - Esquema de la base de datos
- `ENV_TEMPLATE.txt` - Template para variables de entorno

## 🎨 Paleta de Colores

- **Color Principal**: #39A900
- **Color Secundario**: #007832
- **Fondo**: Blanco (excepto login con fondo verde)

## 📄 Licencia

Este proyecto fue desarrollado para el SENA (Servicio Nacional de Aprendizaje).

## 👨‍💻 Autor

Desarrollado por Neyger Serrano
