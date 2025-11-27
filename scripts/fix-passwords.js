/**
 * Script: fix-passwords.js
 * Descripción: Regenera las contraseñas de los usuarios de prueba con hashes correctos
 * Uso: node scripts/fix-passwords.js
 * 
 * Este script:
 * 1. Conecta a la base de datos PostgreSQL
 * 2. Genera hashes bcrypt correctos para cada usuario
 * 3. Actualiza las contraseñas en la tabla usuarios
 * 4. Muestra las credenciales actualizadas
 * 
 * Útil cuando:
 * - Las credenciales dan error "credenciales incorrectas"
 * - Clonas el repositorio en otro equipo
 * - Restauras un backup de la base de datos
 */

import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcryptjs';

// Configuración de la base de datos
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'sena_bienes',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
});

const SALT_ROUNDS = 10;

// Usuarios de prueba con sus contraseñas
const usuarios = [
    { email: 'admin@sena.edu.co', password: 'admin123', nombre: 'Admin Principal' },
    { email: 'cuentadante@sena.edu.co', password: 'cuenta123', nombre: 'Juan Pérez' },
    { email: 'almacenista@sena.edu.co', password: 'alma123', nombre: 'María García' },
    { email: 'vigilante@sena.edu.co', password: 'vigi123', nombre: 'Carlos López' },
    { email: 'usuario@sena.edu.co', password: 'user123', nombre: 'Ana Martínez' },
    { email: 'coordinador@sena.edu.co', password: 'coord123', nombre: 'Luis Rodríguez' }
];

async function fixPasswords() {
    console.log('🔧 Arreglando contraseñas de usuarios...\n');
    console.log('📊 Conectando a la base de datos...');

    try {
        // Verificar conexión
        await pool.query('SELECT NOW()');
        console.log('✅ Conexión exitosa\n');

        let actualizados = 0;
        let noEncontrados = 0;

        for (const usuario of usuarios) {
            console.log(`🔄 Procesando: ${usuario.email}`);

            // Generar hash bcrypt de la contraseña
            const hashedPassword = await bcrypt.hash(usuario.password, SALT_ROUNDS);
            console.log(`   🔐 Hash generado: ${hashedPassword.substring(0, 30)}...`);

            // Actualizar la contraseña en la base de datos
            const result = await pool.query(
                `UPDATE usuarios 
                 SET password = $1, updated_at = CURRENT_TIMESTAMP
                 WHERE email = $2
                 RETURNING id, nombre, email, rol_principal_id`,
                [hashedPassword, usuario.email]
            );

            if (result.rowCount > 0) {
                const user = result.rows[0];
                
                // Obtener el nombre del rol
                const rolQuery = await pool.query(
                    'SELECT nombre FROM roles WHERE id = $1',
                    [user.rol_principal_id]
                );
                
                const rolNombre = rolQuery.rows.length > 0 
                    ? rolQuery.rows[0].nombre 
                    : 'Sin rol';
                
                console.log(`   ✅ Actualizado - ID: ${user.id} - Rol: ${rolNombre}`);
                actualizados++;
            } else {
                console.log(`   ⚠️  Usuario no encontrado en la base de datos`);
                noEncontrados++;
            }
            console.log('');
        }

        // Resumen
        console.log('═══════════════════════════════════════════════════════════');
        console.log('✨ PROCESO COMPLETADO');
        console.log('═══════════════════════════════════════════════════════════');
        console.log(`✅ Usuarios actualizados: ${actualizados}`);
        if (noEncontrados > 0) {
            console.log(`⚠️  Usuarios no encontrados: ${noEncontrados}`);
        }
        console.log('');
        console.log('📋 CREDENCIALES ACTUALIZADAS:');
        console.log('───────────────────────────────────────────────────────────');
        usuarios.forEach(u => {
            console.log(`   ${u.email.padEnd(30)} → ${u.password}`);
        });
        console.log('═══════════════════════════════════════════════════════════');
        console.log('');
        console.log('🎉 ¡Ahora puedes iniciar sesión con estas credenciales!');

    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.error('\n💡 Solución: Verifica que PostgreSQL esté corriendo');
            console.error('   - Windows: Abre "Servicios" y busca PostgreSQL');
            console.error('   - Verifica las credenciales en .env.local');
        } else if (error.code === '3D000') {
            console.error('\n💡 Solución: La base de datos no existe');
            console.error('   - Crea la base de datos: CREATE DATABASE sena_bienes;');
        } else if (error.code === '42P01') {
            console.error('\n💡 Solución: La tabla usuarios no existe');
            console.error('   - Ejecuta el schema: psql -U postgres -d sena_bienes -f database_schema.sql');
        }
        
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Ejecutar el script
fixPasswords();
