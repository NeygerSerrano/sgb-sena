'use client';

import { useState, useMemo } from 'react';

// Datos de ejemplo - en producción vendrían de la API
const bienes = [
  { codigo: "TEC-001", serial: "SN-LNV-45231", nombre: "Portátil Lenovo ThinkPad T14", categoria: "Tecnología", marca: "Lenovo", cuentadante: "Carlos Rodríguez" },
  { codigo: "TEC-002", serial: "SN-DLL-22315", nombre: "Portátil Dell Latitude 5420", categoria: "Tecnología", marca: "Dell", cuentadante: "Carlos Rodríguez" },
  { codigo: "TEC-003", serial: "SN-HP-11287", nombre: "Impresora HP LaserJet Pro M404dn", categoria: "Tecnología", marca: "HP", cuentadante: "María Gómez" },
  { codigo: "TEC-004", serial: "SN-PRJ-33478", nombre: "Proyector Epson EB-S41", categoria: "Tecnología", marca: "Epson", cuentadante: "Luis Fernández" },
  { codigo: "MOB-001", serial: "SN-CHR-0001", nombre: "Silla ergonómica ejecutiva", categoria: "Mobiliario", marca: "ErgoTech", cuentadante: "María Gómez" },
  { codigo: "MOB-002", serial: "SN-DSK-0321", nombre: "Escritorio modular de madera", categoria: "Mobiliario", marca: "Maderkit", cuentadante: "María Gómez" },
  { codigo: "LAB-001", serial: "SN-MIC-0042", nombre: "Microscopio óptico binocular", categoria: "Laboratorio", marca: "Olympus", cuentadante: "Sofía Herrera" },
  { codigo: "TEC-005", serial: "SN-MON-8821", nombre: "Monitor Samsung 24 pulgadas", categoria: "Tecnología", marca: "Samsung", cuentadante: "Carlos Rodríguez" }
];

export default function CrearSolicitud() {
  const [busqueda, setBusqueda] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [formData, setFormData] = useState({
    motivo: '',
    destino: '',
    fechaSalida: '',
    fechaRegreso: '',
    observaciones: ''
  });

  const elementosPorPagina = 5;

  const datosFiltrados = bienes.filter(b =>
    b.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    b.serial.toLowerCase().includes(busqueda.toLowerCase()) ||
    b.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    b.cuentadante.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const bienesActuales = datosFiltrados.slice(inicio, inicio + elementosPorPagina);

  const seleccionarBien = (codigo) => {
    if (!seleccionados.includes(codigo)) {
      setSeleccionados([...seleccionados, codigo]);
    }
  };

  const quitarBien = (codigo) => {
    setSeleccionados(seleccionados.filter(c => c !== codigo));
  };

  // Obtener fecha mínima (hoy)
  const fechaMinima = useMemo(() => {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
  }, []);

  // Calcular fecha mínima de regreso (fecha salida + 1 día)
  const fechaMinimaRegreso = useMemo(() => {
    if (!formData.fechaSalida) return fechaMinima;
    const fechaSalida = new Date(formData.fechaSalida);
    fechaSalida.setDate(fechaSalida.getDate() + 1);
    fechaSalida.setMinutes(fechaSalida.getMinutes() - fechaSalida.getTimezoneOffset());
    return fechaSalida.toISOString().slice(0, 16);
  }, [formData.fechaSalida, fechaMinima]);

  const guardarSolicitud = () => {
    if (seleccionados.length === 0) return alert('Debe seleccionar al menos un bien.');
    if (!formData.motivo || !formData.destino || !formData.fechaSalida || !formData.fechaRegreso) {
      return alert('Todos los campos marcados con * son obligatorios.');
    }

    // Validar fechas
    const ahora = new Date();
    const fechaSalida = new Date(formData.fechaSalida);
    const fechaRegreso = new Date(formData.fechaRegreso);

    if (fechaSalida < ahora) {
      return alert('La fecha de salida no puede ser anterior a la fecha actual.');
    }

    // Calcular diferencia en días
    const diferenciaDias = (fechaRegreso - fechaSalida) / (1000 * 60 * 60 * 24);
    if (diferenciaDias < 1) {
      return alert('La fecha de regreso debe ser al menos 1 día después de la fecha de salida.');
    }

    // Agrupar bienes por cuentadante
    const grupos = {};
    seleccionados.forEach(codigo => {
      const bien = bienes.find(b => b.codigo === codigo);
      if (!grupos[bien.cuentadante]) grupos[bien.cuentadante] = [];
      grupos[bien.cuentadante].push(bien);
    });

    const grupoId = "GRP-" + Date.now();
    const numCuentadantes = Object.keys(grupos).length;
    
    // Mensaje explicativo
    let mensaje = `✅ Se crearán ${numCuentadantes} solicitud${numCuentadantes > 1 ? 'es' : ''} separada${numCuentadantes > 1 ? 's' : ''}\n`;
    mensaje += `Grupo: ${grupoId}\n\n`;
    mensaje += `📋 Detalle por cuentadante:\n\n`;
    
    let contador = 1;
    for (const cuentadante in grupos) {
      const bienesLista = grupos[cuentadante].map(b => `  • ${b.codigo} - ${b.nombre}`).join("\n");
      mensaje += `Solicitud ${contador}: ${cuentadante}\n`;
      mensaje += `${grupos[cuentadante].length} bien${grupos[cuentadante].length > 1 ? 'es' : ''}:\n${bienesLista}\n\n`;
      contador++;
    }
    
    mensaje += `\n💡 Cada solicitud será aprobada de forma independiente por su cuentadante y administrador correspondiente.`;
    
    alert(mensaje);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setFormData({ motivo: '', destino: '', fechaSalida: '', fechaRegreso: '', observaciones: '' });
    setSeleccionados([]);
    setBusqueda('');
    setPaginaActual(1);
  };

  const gruposSeleccionados = {};
  seleccionados.forEach(codigo => {
    const bien = bienes.find(b => b.codigo === codigo);
    if (!gruposSeleccionados[bien.cuentadante]) gruposSeleccionados[bien.cuentadante] = [];
    gruposSeleccionados[bien.cuentadante].push(bien);
  });

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Crear Nueva Solicitud</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Columna izquierda: Tabla de bienes */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Buscador */}
          <div className="mb-4">
            <input
              type="text"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
              placeholder="Buscar por código, serial, nombre o cuentadante..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-[#39A900] focus:border-[#39A900]"
            />
          </div>

          {/* Tabla de bienes */}
          <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#39A900] text-white sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-center">Acción</th>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Serial</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Categoría</th>
                  <th className="px-4 py-3">Cuentadante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bienesActuales.map(bien => (
                  <tr key={bien.codigo} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">
                      {seleccionados.includes(bien.codigo) ? (
                        <span className="text-[#39A900] font-semibold">✓ Seleccionado</span>
                      ) : (
                        <button
                          onClick={() => seleccionarBien(bien.codigo)}
                          className="px-3 py-1 bg-[#39A900] text-white rounded hover:bg-[#007832] transition-colors"
                        >
                          Seleccionar
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-2">{bien.codigo}</td>
                    <td className="px-4 py-2">{bien.serial}</td>
                    <td className="px-4 py-2">{bien.nombre}</td>
                    <td className="px-4 py-2">{bien.categoria}</td>
                    <td className="px-4 py-2">{bien.cuentadante}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span className="text-gray-700 font-medium">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>

          {/* Bienes seleccionados */}
          {seleccionados.length > 0 && (
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b-2 border-[#39A900] pb-2">
                Bienes Seleccionados ({seleccionados.length})
              </h2>
              {Object.keys(gruposSeleccionados).map(cuentadante => (
                <div key={cuentadante} className="mb-4">
                  <h3 className="font-bold text-[#007832] mt-3 mb-2">
                    📋 {cuentadante} ({gruposSeleccionados[cuentadante].length} bienes)
                  </h3>
                  {gruposSeleccionados[cuentadante].map(bien => (
                    <div
                      key={bien.codigo}
                      className="flex justify-between items-center bg-white p-3 rounded-lg border mt-2 hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {bien.codigo} - {bien.nombre}
                        </p>
                        <p className="text-xs text-gray-500">{bien.serial}</p>
                      </div>
                      <button
                        onClick={() => quitarBien(bien.codigo)}
                        className="text-red-600 hover:text-red-800 text-sm px-3 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        ❌ Quitar
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha: Formulario */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b-2 border-[#39A900] pb-2">
              Datos de la Solicitud
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Motivo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  placeholder="Ej: Clase de programación"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#39A900] focus:border-[#39A900]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Destino <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.destino}
                  onChange={(e) => setFormData({ ...formData, destino: e.target.value })}
                  placeholder="Ej: Aula 301, Edificio A"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#39A900] focus:border-[#39A900]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Fecha de Salida <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.fechaSalida}
                  min={fechaMinima}
                  onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value, fechaRegreso: '' })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#39A900] focus:border-[#39A900]"
                />
                <p className="text-xs text-gray-500 mt-1">No se permiten fechas anteriores a hoy</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Fecha de Regreso <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  value={formData.fechaRegreso}
                  min={fechaMinimaRegreso}
                  disabled={!formData.fechaSalida}
                  onChange={(e) => setFormData({ ...formData, fechaRegreso: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#39A900] focus:border-[#39A900] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Debe ser al menos 1 día después de la salida
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Observaciones</label>
                <textarea
                  rows="3"
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  placeholder="Información adicional (opcional)"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-[#39A900] focus:border-[#39A900]"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3">
            <button
              onClick={limpiarFormulario}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={guardarSolicitud}
              className="px-4 py-2 bg-[#39A900] text-white rounded-lg hover:bg-[#007832] transition-colors"
            >
              Guardar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
