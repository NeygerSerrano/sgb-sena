// Script para diagnosticar el problema del login
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcryptjs';

// Configuración de la base de datos
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'sena_bienes',
    user: 'postgres',
    password: '123456',
});

async function testLogin() {
    console.log('🔍 Diagnóstico de problema de login\n');

    try {
        // 1. Verificar conexión
        console.log('1️⃣ Verificando conexión a PostgreSQL...');
        await pool.query('SELECT NOW()');
        console.log('✅ Conexión exitosa\n');

        // 2. Verificar si existe la tabla usuarios
        console.log('2️⃣ Verificando tabla usuarios...');
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'usuarios'
            );
        `);

        if (!tableCheck.rows[0].exists) {
            console.log('❌ La tabla usuarios NO existe');
            console.log('💡 Debes crear la tabla primero en PostgreSQL\n');
            return;
        }
        console.log('✅ Tabla usuarios existe\n');

        // 3. Verificar usuarios en la base
        console.log('3️⃣ Verificando usuarios en la base...');
        const users = await pool.query(`
            SELECT u.id, u.nombre, u.email, r.nombre as rol, LENGTH(u.password) as pwd_len 
            FROM usuarios u
            LEFT JOIN roles r ON u.rol_principal_id = r.id
        `);

        if (users.rows.length === 0) {
            console.log('❌ No hay usuarios en la base de datos');
            console.log('💡 Ejecuta: npm run create-users\n');
            return;
        }

        console.log(`✅ Se encontraron ${users.rows.length} usuario(s):`);
        users.rows.forEach(u => {
            console.log(`   - ${u.email} (${u.rol || 'sin rol'}) - Password hash length: ${u.pwd_len}`);
        });
        console.log('');

        // 4. Probar login con usuario admin
        console.log('4️⃣ Probando login con admin@sena.edu.co / admin123...');
        const adminResult = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1 AND activo = true',
            ['admin@sena.edu.co']
        );

        if (adminResult.rows.length === 0) {
            console.log('❌ Usuario admin@sena.edu.co no encontrado o no está activo\n');
            return;
        }

        const admin = adminResult.rows[0];
        console.log('✅ Usuario encontrado:', admin.nombre);

        // 5. Verificar contraseña
        console.log('\n5️⃣ Verificando contraseña...');
        console.log('Password en BD:', admin.password.substring(0, 20) + '...');

        try {
            const match = await bcrypt.compare('admin123', admin.password);

            if (match) {
                console.log('✅ ¡CONTRASEÑA CORRECTA! El login debería funcionar');
            } else {
                console.log('❌ CONTRASEÑA INCORRECTA');
                console.log('\n🔧 SOLUCIÓN:');
                console.log('El hash de la contraseña en la base no coincide.');
                console.log('Ejecuta: npm run fix-passwords');
                console.log('Esto regenerará las contraseñas correctamente.');
            }
        } catch (bcryptError) {
            console.log('❌ Error al verificar contraseña:', bcryptError.message);
            console.log('\n🔧 POSIBLE CAUSA:');
            console.log('El valor en la columna password no es un hash válido de bcrypt');
            console.log('Ejecuta: npm run fix-passwords');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('\n🔧 Verifica:');
        console.error('1. PostgreSQL está corriendo');
        console.error('2. La base de datos "sena_bienes" existe');
        console.error('3. Las credenciales en .env.local son correctas');
    } finally {
        await pool.end();
    }
}

testLogin();
