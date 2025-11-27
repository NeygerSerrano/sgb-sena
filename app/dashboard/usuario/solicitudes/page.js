'use client';

import { useState } from 'react';

// Datos de ejemplo - en producción vendrían de la API
// Ahora cada solicitud es independiente por cuentadante
const solicitudesData = [
  {
    codigo: 'SOL-001-1',
    grupo_solicitud: 'GRP-001', // Agrupa solicitudes creadas juntas
    fecha_salida: '2025-09-25',
    fecha_regreso: '2025-09-28',
    motivo: 'Desarrollo de software y capacitación',
    destino: 'Laboratorio de Sistemas - Bloque C',
    solicitante: 'Sofía Herrera',
    cuentadante: 'Carlos Rodríguez',
    estado_cuentadante: 'Aprobada',
    observacion_cuentadante: '',
    admin: 'Pedro Salazar',
    estado_admin: 'Aprobada',
    observacion_admin: '',
    bienes: [
      { nombre: 'Portátil Lenovo', marca: 'Lenovo', modelo: 'ThinkPad T14', placa: 'LAP-2024-156' },
      { nombre: 'Portátil Dell', marca: 'Dell', modelo: 'Latitude 5420', placa: 'LAP-2024-157' }
    ]
  },
  {
    codigo: 'SOL-001-2',
    grupo_solicitud: 'GRP-001', // Mismo grupo que SOL-001-1
    fecha_salida: '2025-09-25',
    fecha_regreso: '2025-09-28',
    motivo: 'Desarrollo de software y capacitación',
    destino: 'Laboratorio de Sistemas - Bloque C',
    solicitante: 'Sofía Herrera',
    cuentadante: 'María Gómez',
    estado_cuentadante: 'Rechazada',
    observacion_cuentadante: 'Silla dañada',
    admin: 'Ana Torres',
    estado_admin: 'No aplica',
    observacion_admin: '',
    bienes: [
      { nombre: 'Silla', marca: 'ErgoTech', modelo: 'Executive Pro', placa: 'MOB-2024-158' },
      { nombre: 'Escritorio', marca: 'Maderkit', modelo: 'Modular 120', placa: 'MOB-2024-159' }
    ]
  },
  {
    codigo: 'SOL-002-1',
    grupo_solicitud: 'GRP-002',
    fecha_salida: '2025-09-26',
    fecha_regreso: '2025-09-29',
    motivo: 'Presentación proyecto final',
    destino: 'Auditorio Principal',
    solicitante: 'Juan Pérez',
    cuentadante: 'Luis Fernández',
    estado_cuentadante: 'Aprobada',
    observacion_cuentadante: '',
    admin: 'Julio Martínez',
    estado_admin: 'Rechazada',
    observacion_admin: 'Proyector fuera de servicio',
    bienes: [
      { nombre: 'Proyector Epson', marca: 'Epson', modelo: 'EB-S41', placa: 'PRY-2024-166' },
      { nombre: 'iPad Pro', marca: 'Apple', modelo: 'iPad Pro 12.9', placa: 'TAB-2024-167' }
    ]
  },
  {
    codigo: 'SOL-002-2',
    grupo_solicitud: 'GRP-002',
    fecha_salida: '2025-09-26',
    fecha_regreso: '2025-09-29',
    motivo: 'Presentación proyecto final',
    destino: 'Auditorio Principal',
    solicitante: 'Juan Pérez',
    cuentadante: 'Sofía Herrera',
    estado_cuentadante: 'Pendiente',
    observacion_cuentadante: '',
    admin: 'Carlos Ruiz',
    estado_admin: 'Pendiente',
    observacion_admin: '',
    bienes: [
      { nombre: 'Microscopio', marca: 'Olympus', modelo: 'CX23', placa: 'LAB-2024-168' },
      { nombre: 'Centrífuga', marca: 'Hettich', modelo: 'EBA 200', placa: 'LAB-2024-169' }
    ]
  },
  {
    codigo: 'SOL-003-1',
    grupo_solicitud: 'GRP-003',
    fecha_salida: '2025-09-27',
    fecha_regreso: '2025-09-30',
    motivo: 'Digitalización de documentos',
    destino: 'Oficina Administrativa',
    solicitante: 'Ana Martínez',
    cuentadante: 'María Gómez',
    estado_cuentadante: 'Aprobada',
    observacion_cuentadante: '',
    admin: 'Pedro Salazar',
    estado_admin: 'Aprobada',
    observacion_admin: '',
    bienes: [
      { nombre: 'Escáner Canon', marca: 'Canon', modelo: 'imageFORMULA DR-C225', placa: 'ESC-2024-176' }
    ]
  },
  {
    codigo: 'SOL-003-2',
    grupo_solicitud: 'GRP-003',
    fecha_salida: '2025-09-27',
    fecha_regreso: '2025-09-30',
    motivo: 'Digitalización de documentos',
    destino: 'Oficina Administrativa',
    solicitante: 'Ana Martínez',
    cuentadante: 'Carlos Rodríguez',
    estado_cuentadante: 'Aprobada',
    observacion_cuentadante: '',
    admin: 'Ana Torres',
    estado_admin: 'Rechazada',
    observacion_admin: 'Monitor roto',
    bienes: [
      { nombre: 'Monitor LG', marca: 'LG', modelo: '24MK430H', placa: 'MON-2024-177' }
    ]
  }
];

export default function MisSolicitudes() {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [modalDetalle, setModalDetalle] = useState(null);

  const elementosPorPagina = 5;

  // Obtener estado general de una solicitud individual
  const obtenerEstadoGeneral = (solicitud) => {
    // Prioridad: Admin > Cuentadante
    if (solicitud.estado_admin === 'Aprobada') return 'Aprobada';
    if (solicitud.estado_admin === 'Rechazada') return 'Rechazada';
    if (solicitud.estado_admin === 'Pendiente') return 'Pendiente';
    if (solicitud.estado_cuentadante === 'Rechazada') return 'Rechazada';
    if (solicitud.estado_cuentadante === 'Pendiente') return 'Pendiente';
    return 'Pendiente';
  };

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Aprobada': return 'bg-green-50 text-[#007832]';
      case 'Rechazada': return 'bg-red-100 text-red-800';
      case 'No aplica': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const datosFiltrados = solicitudesData.filter(s =>
    s.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    s.cuentadante.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(datosFiltrados.length / elementosPorPagina);
  const inicio = (paginaActual - 1) * elementosPorPagina;
  const solicitudesActuales = datosFiltrados.slice(inicio, inicio + elementosPorPagina);

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-4">
      {/* Header con búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Mis Solicitudes</h1>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="relative w-full md:w-auto">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => { setBusqueda(e.target.value); setPaginaActual(1); }}
              placeholder="Buscar por código o cuentadante..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-[#39A900] focus:border-[#39A900] w-full md:w-80"
            />
          </div>
        </div>
      </div>

      {/* Tabla de solicitudes */}
      <div className="flex-1 overflow-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#39A900] text-white sticky top-0">
            <tr>
              <th className="px-4 py-3">Código</th>
              <th className="px-4 py-3">Cuentadante</th>
              <th className="px-4 py-3">N° Bienes</th>
              <th className="px-4 py-3">Fecha Salida</th>
              <th className="px-4 py-3">Fecha Regreso</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {solicitudesActuales.map(s => {
              const numeroBienes = s.bienes.length;
              const estadoGeneral = obtenerEstadoGeneral(s);
              const colorEstado = obtenerColorEstado(estadoGeneral);

              return (
                <tr key={s.codigo} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{s.codigo}</td>
                  <td className="px-4 py-3">{s.cuentadante}</td>
                  <td className="px-4 py-3 text-center">{numeroBienes}</td>
                  <td className="px-4 py-3">{s.fecha_salida}</td>
                  <td className="px-4 py-3">{s.fecha_regreso}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colorEstado}`}>
                      {estadoGeneral}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setModalDetalle(s)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              );
            })}
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

      {/* Modal de detalle */}
      {modalDetalle && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-white border-b-2 border-[#39A900] pb-2 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-bold text-[#39A900] flex items-center">
                <span className="mr-2">📋</span>
                Detalles de la Solicitud: {modalDetalle.codigo}
              </h2>
              <button
                onClick={() => setModalDetalle(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✖
              </button>
            </div>

            <div className="p-6">
              {/* Información General de la Solicitud */}
              <div className="bg-gray-50 border-l-4 border-[#39A900] p-6 rounded-r-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Código Solicitud</h3>
                    <p className="text-gray-800 text-base font-semibold">{modalDetalle.codigo}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Cuentadante Responsable</h3>
                    <p className="text-gray-800 text-base font-semibold">{modalDetalle.cuentadante}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Uso o Motivo</h3>
                    <p className="text-gray-800 text-base">{modalDetalle.motivo}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Destino</h3>
                    <p className="text-gray-800 text-base">{modalDetalle.destino}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Fecha Salida</h3>
                    <p className="text-gray-800 text-base">{modalDetalle.fecha_salida}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Fecha Regreso</h3>
                    <p className="text-gray-800 text-base">{modalDetalle.fecha_regreso}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-1">Nombre Solicitante</h3>
                    <p className="text-gray-800 text-base">{modalDetalle.solicitante}</p>
                  </div>
                </div>
              </div>

              {/* Tabla de Bienes */}
              <div className="mb-6">
                <div className="bg-[#39A900] text-white px-4 py-2 rounded-t-lg">
                  <h3 className="font-bold text-lg">Bienes Solicitados ({modalDetalle.bienes.length})</h3>
                </div>

                <div className="overflow-x-auto border border-gray-300 rounded-b-lg">
                  <table className="min-w-full bg-white">
                    <thead className="bg-white border-b-2 border-gray-300">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-300">Objeto</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-300">Marca</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700 border-r border-gray-300">Modelo</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-700">Placa</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {modalDetalle.bienes.map((bien, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{bien.nombre}</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-200">{bien.marca}</td>
                          <td className="px-4 py-3 text-gray-600 border-r border-gray-200">{bien.modelo}</td>
                          <td className="px-4 py-3 text-gray-700 font-semibold">{bien.placa}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Estados de Aprobación */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Estados de Aprobación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Estado Cuentadante</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${obtenerColorEstado(modalDetalle.estado_cuentadante)}`}>
                        {modalDetalle.estado_cuentadante}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Responsable:</strong> {modalDetalle.cuentadante}
                    </p>
                    {modalDetalle.estado_cuentadante === 'Rechazada' && modalDetalle.observacion_cuentadante && (
                      <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-2 text-sm text-gray-700">
                        <strong>Motivo:</strong> {modalDetalle.observacion_cuentadante}
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">Estado Administrador</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${obtenerColorEstado(modalDetalle.estado_admin)}`}>
                        {modalDetalle.estado_admin}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Responsable:</strong> {modalDetalle.admin || 'Pendiente de asignación'}
                    </p>
                    {modalDetalle.estado_admin === 'Rechazada' && modalDetalle.observacion_admin && (
                      <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-2 text-sm text-gray-700">
                        <strong>Motivo:</strong> {modalDetalle.observacion_admin}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Footer con botón Cerrar */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200 sticky bottom-0">
              <button
                onClick={() => setModalDetalle(null)}
                className="bg-gray-600 text-white px-8 py-2 rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
