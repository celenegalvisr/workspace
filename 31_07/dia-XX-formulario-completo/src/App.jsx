```jsx
import { useState } from 'react'
import AuthForm from './components/AuthForms'
import { UnderConstruction } from './components/UnderConstruction'
import './App.css'

// ======================================================
// APP PRINCIPAL - EMPLEOLINK
// ======================================================

function App() {
  // ======================================================
  // ESTADOS GENERALES
  // ======================================================

  const [usuario, setUsuario] = useState(null)

  // Vista actual del sistema
  const [vistaActual, setVistaActual] = useState('inicio')

  // ======================================================
  // DATOS DEL FORMULARIO DE VACANTE
  // Estos campos corresponden a la tabla "vacante"
  // ======================================================

  const [vacanteData, setVacanteData] = useState({
    titulo: '',
    salario: '',
    descripcion: '',
    cod_empresa: '',
  })

  // ======================================================
  // DATOS DEL FORMULARIO DE EMPRESA
  // Corresponden a la tabla "empresa"
  // ======================================================

  const [empresaData, setEmpresaData] = useState({
    cod_empresa: '',
    nombre_empresa: '',
    nit_rut: '',
  })

  // ======================================================
  // DATOS DEL PERFIL DEL CONTRATISTA
  // Corresponden a la tabla "candidato"
  // ======================================================

  const [candidatoData, setCandidatoData] = useState({
    num_documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    perfil: '',
    correo: '',
  })

  // ======================================================
  // MANEJO DEL LOGIN
  // ======================================================

  const handleLoginSuccess = (user) => {
    setUsuario(user)

    /*
      Después del login vamos inicialmente a Inicio.

      El rol puede venir de diferentes lugares dependiendo
      de cómo esté construido AuthForms.

      Ejemplo esperado:

      user = {
        id: '...',
        email: '...',
        rol: 'administrador'
      }

      Si AuthForms todavía no agrega el rol,
      el sistema permanecerá en Inicio.
    */

    setVistaActual('inicio')
  }

  // ======================================================
  // CERRAR SESIÓN
  // ======================================================

  const handleLogout = () => {
    setUsuario(null)
    setVistaActual('inicio')

    // Limpiamos los formularios
    setVacanteData({
      titulo: '',
      salario: '',
      descripcion: '',
      cod_empresa: '',
    })

    setEmpresaData({
      cod_empresa: '',
      nombre_empresa: '',
      nit_rut: '',
    })

    setCandidatoData({
      num_documento: '',
      nombre: '',
      apellido: '',
      telefono: '',
      perfil: '',
      correo: '',
    })
  }

  // ======================================================
  // OBTENER ROL DEL USUARIO
  // ======================================================

  const obtenerRol = () => {
    if (!usuario) {
      return null
    }

    /*
      Se contemplan varias posibilidades para que sea
      compatible con diferentes versiones de AuthForms.

      Prioridad:
      1. usuario.rol
      2. usuario.user_metadata.rol
      3. usuario.role
    */

    return (
      usuario.rol ||
      usuario.user_metadata?.rol ||
      usuario.role ||
      null
    )
  }

  const rolUsuario = obtenerRol()

  // ======================================================
  // VERIFICAR SI EL USUARIO TIENE UN ROL
  // ======================================================

  const tieneRol = (rolesPermitidos) => {
    if (!usuario) {
      return false
    }

    if (!rolUsuario) {
      return false
    }

    return rolesPermitidos.includes(rolUsuario)
  }

  // ======================================================
  // MANEJO DEL FORMULARIO DE VACANTE
  // ======================================================

  const handleVacanteChange = (e) => {
    const { name, value } = e.target

    setVacanteData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleVacanteSubmit = (e) => {
    e.preventDefault()

    console.log('Datos de la vacante:', vacanteData)

    alert(
      'Vacante preparada correctamente. Falta conectar este formulario con Supabase.'
    )
  }

  // ======================================================
  // MANEJO DEL FORMULARIO DE EMPRESA
  // ======================================================

  const handleEmpresaChange = (e) => {
    const { name, value } = e.target

    setEmpresaData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEmpresaSubmit = (e) => {
    e.preventDefault()

    console.log('Datos de la empresa:', empresaData)

    alert(
      'Empresa preparada correctamente. Falta conectar este formulario con Supabase.'
    )
  }

  // ======================================================
  // MANEJO DEL PERFIL DEL CONTRATISTA
  // ======================================================

  const handleCandidatoChange = (e) => {
    const { name, value } = e.target

    setCandidatoData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCandidatoSubmit = (e) => {
    e.preventDefault()

    console.log('Datos del contratista:', candidatoData)

    alert(
      'Perfil preparado correctamente. Falta conectar este formulario con Supabase.'
    )
  }

  // ======================================================
  // FUNCIÓN PARA NAVEGAR A UNA VISTA PROTEGIDA
  // ======================================================

  const navegarConRol = (vista, rolesPermitidos) => {
    if (!usuario) {
     alert('Debes iniciar sesión para acceder a esta sección.')
     setVistaActual('inicio')
     return
    }

    if (!tieneRol(rolesPermitidos)) {
     const rolActual = rolUsuario || 'no definido'

     alert(
      'No tienes permisos para acceder a esta sección. ' +
      'Rol actual: ' +
      rolActual
    )

    return
  }

  setVistaActual(vista)
}
  // ======================================================
  // RENDER
  // ======================================================

  return (
    <>
      {/* ==================================================
          MENÚ FLOTANTE
      ================================================== */}

      <aside
        style={{
          position: 'fixed',
          top: '90px',
          left: '20px',
          zIndex: 2000,
          backgroundColor: '#212529',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.5)',
          border: '1px solid #495057',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '220px',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: '11px',
            color: '#adb5bd',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          🧭 Menú de Acceso
        </span>

        {/* ================= INICIO ================= */}

        <button
          type="button"
          onClick={() => setVistaActual('inicio')}
          className="btn btn-sm text-start w-100 fw-bold"
          style={{
            backgroundColor:
              vistaActual === 'inicio' ? '#0dcaf0' : 'transparent',
            color: vistaActual === 'inicio' ? '#000' : '#fff',
            border: 'none',
          }}
        >
          🏠 Inicio
        </button>

        {/* ==================================================
            OPCIONES PARA USUARIOS AUTENTICADOS
        ================================================== */}

        {usuario ? (
          <div
            style={{
              borderTop: '1px solid #495057',
              paddingTop: '10px',
            }}
          >
            {/* Información del usuario */}

            <div
              style={{
                fontSize: '12px',
                color: '#198754',
                marginBottom: '10px',
                wordBreak: 'break-word',
              }}
            >
              🟢 Sesión activa
              <br />

              <strong>
                {usuario.email || 'Usuario autenticado'}
              </strong>

              <br />

              <span
                style={{
                  color: '#ffc107',
                  textTransform: 'capitalize',
                }}
              >
                Rol: {rolUsuario || 'No definido'}
              </span>
            </div>

            {/* ==================================================
                MENÚ DEL CONTRATISTA
            ================================================== */}

            {tieneRol(['contratista']) && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('perfilContratista', ['contratista'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'perfilContratista'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'perfilContratista'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  👤 Mi Perfil
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('vacantes', ['contratista'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'vacantes'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'vacantes'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  🔎 Ver Vacantes
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('postulaciones', ['contratista'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'postulaciones'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'postulaciones'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  📄 Mis Postulaciones
                </button>
              </>
            )}

            {/* ==================================================
                MENÚ DEL EMPLEADO
            ================================================== */}

            {tieneRol(['empleado']) && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('empresa', ['empleado'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'empresa'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'empresa'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  🏢 Registrar Empresa
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('vacante', ['empleado'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'vacante'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'vacante'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  📝 Crear Vacante
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('postulantes', ['empleado'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'postulantes'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'postulantes'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  👥 Ver Postulantes
                </button>
              </>
            )}

            {/* ==================================================
                MENÚ DEL ADMINISTRADOR
            ================================================== */}

            {tieneRol(['administrador']) && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('usuarios', ['administrador'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'usuarios'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'usuarios'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  🛡️ Gestión de Usuarios
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('reportes', ['administrador'])
                  }
                  className="btn btn-sm text-start w-100 fw-bold mb-2"
                  style={{
                    backgroundColor:
                      vistaActual === 'reportes'
                        ? '#0dcaf0'
                        : 'transparent',
                    color:
                      vistaActual === 'reportes'
                        ? '#000'
                        : '#fff',
                    border: 'none',
                  }}
                >
                  📊 Reportes
                </button>
              </>
            )}

            {/* ================= CERRAR SESIÓN ================= */}

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-danger btn-sm w-100 fw-bold mt-2"
            >
              ❌ Cerrar Sesión
            </button>
          </div>
        ) : (
          <div
            style={{
              borderTop: '1px solid #495057',
              paddingTop: '10px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                color: '#dc3545',
                margin: 0,
              }}
            >
              🔒 Inicia sesión para desbloquear las opciones.
            </p>
          </div>
        )}
      </aside>

      {/* ==================================================
          BARRA SUPERIOR
      ================================================== */}

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 30px',
          paddingLeft: '260px',
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontWeight: 'bold',
            color: '#646cff',
            fontSize: '1.2rem',
          }}
        >
          🎓 EmpleoLink
        </div>

        <div
          style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={() => setVistaActual('inicio')}
            style={{
              background: 'none',
              border: 'none',
              color:
                vistaActual === 'inicio'
                  ? '#646cff'
                  : '#aaa',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Inicio
          </button>

          {usuario && (
            <>
              {tieneRol(['contratista']) && (
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('vacantes', ['contratista'])
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    color:
                      vistaActual === 'vacantes'
                        ? '#646cff'
                        : '#aaa',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Vacantes
                </button>
              )}

              {tieneRol(['empleado']) && (
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('vacante', ['empleado'])
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    color:
                      vistaActual === 'vacante'
                        ? '#646cff'
                        : '#aaa',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Nueva Vacante
                </button>
              )}

              {tieneRol(['administrador']) && (
                <button
                  type="button"
                  onClick={() =>
                    navegarConRol('usuarios', ['administrador'])
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    color:
                      vistaActual === 'usuarios'
                        ? '#646cff'
                        : '#aaa',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Usuarios
                </button>
              )}

              <span
                style={{
                  fontSize: '13px',
                  color: '#28a745',
                }}
              >
                👤 {usuario.email}
              </span>

              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ==================================================
          CONTENIDO PRINCIPAL
      ================================================== */}

      <main
        className="container my-4"
        style={{
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {/* ==================================================
            VISTA INICIO
        ================================================== */}

        {vistaActual === 'inicio' && (
          <section className="text-center">
            <div className="py-5">
              <div
                style={{
                  fontSize: '5rem',
                  marginBottom: '20px',
                }}
              >
                🎓
              </div>

              <h1 className="mb-3">
                EmpleoLink
              </h1>

              <p className="lead text-secondary">
                Conectando personas, empresas y oportunidades laborales.
              </p>

              <div
                className="card shadow-sm mx-auto mt-4"
                style={{
                  maxWidth: '500px',
                }}
              >
                <div className="card-body p-4">
                  {!usuario ? (
                    <>
                      <h4 className="mb-3">
                        🔐 Iniciar Sesión
                      </h4>

                      <p className="text-secondary">
                        Ingresa al sistema para acceder a las funciones
                        correspondientes a tu rol.
                      </p>

                      <AuthForm
                        onLoginSuccess={handleLoginSuccess}
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="text-success">
                        🎉 Sesión activa
                      </h4>

                      <p className="mt-3">
                        Bienvenido:
                      </p>

                      <strong>
                        {usuario.email}
                      </strong>

                      <p className="mt-2">
                        Rol:{' '}
                        <span className="badge bg-primary">
                          {rolUsuario || 'No definido'}
                        </span>
                      </p>

                      <p className="text-secondary mt-3">
                        Utiliza el menú lateral para acceder a las
                        funcionalidades disponibles.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================
            VISTA PERFIL CONTRATISTA
        ================================================== */}

        {vistaActual === 'perfilContratista' && (
          <section>
            {!tieneRol(['contratista']) ? (
              <AccesoDenegado />
            ) : (
              <div className="card shadow p-4">
                <h2 className="mb-4">
                  👤 Perfil del Contratista
                </h2>

                <form onSubmit={handleCandidatoSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Número de documento
                      </label>

                      <input
                        type="text"
                        name="num_documento"
                        className="form-control"
                        value={candidatoData.num_documento}
                        onChange={handleCandidatoChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Correo
                      </label>

                      <input
                        type="email"
                        name="correo"
                        className="form-control"
                        value={candidatoData.correo}
                        onChange={handleCandidatoChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Nombre
                      </label>

                      <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        value={candidatoData.nombre}
                        onChange={handleCandidatoChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Apellido
                      </label>

                      <input
                        type="text"
                        name="apellido"
                        className="form-control"
                        value={candidatoData.apellido}
                        onChange={handleCandidatoChange}
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Teléfono
                      </label>

                      <input
                        type="tel"
                        name="telefono"
                        className="form-control"
                        value={candidatoData.telefono}
                        onChange={handleCandidatoChange}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">
                        Perfil profesional
                      </label>

                      <textarea
                        name="perfil"
                        className="form-control"
                        rows="4"
                        value={candidatoData.perfil}
                        onChange={handleCandidatoChange}
                        placeholder="Describe brevemente tu perfil profesional..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    💾 Guardar Perfil
                  </button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            VISTA VACANTES - CONTRATISTA
        ================================================== */}

        {vistaActual === 'vacantes' && (
          <section>
            {!tieneRol(['contratista']) ? (
              <AccesoDenegado />
            ) : (
              <div>
                <h2 className="mb-4">
                  🔎 Vacantes Disponibles
                </h2>

                <div className="alert alert-info">
                  <strong>Información:</strong> aquí se mostrarán
                  las vacantes almacenadas en la tabla{' '}
                  <code>vacante</code>.
                </div>

                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h5>
                      💻 Desarrollador de Software
                    </h5>

                    <p>
                      Vacante de ejemplo para visualizar la
                      estructura del módulo.
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        setVistaActual('detalleVacante')
                      }
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            DETALLE DE VACANTE
        ================================================== */}

        {vistaActual === 'detalleVacante' && (
          <section>
            {!tieneRol(['contratista']) ? (
              <AccesoDenegado />
            ) : (
              <div className="card shadow p-4">
                <h2>
                  💻 Detalle de Vacante
                </h2>

                <hr />

                <h4>
                  Desarrollador de Software
                </h4>

                <p>
                  Información detallada de la vacante.
                </p>

                <p>
                  <strong>Salario:</strong>{' '}
                  Se cargará desde Supabase.
                </p>

                <p>
                  <strong>Descripción:</strong>{' '}
                  Se cargará desde Supabase.
                </p>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    setVistaActual('postularse')
                  }
                >
                  🚀 Postularme
                </button>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            POSTULARSE
        ================================================== */}

        {vistaActual === 'postularse' && (
          <section>
            {!tieneRol(['contratista']) ? (
              <AccesoDenegado />
            ) : (
              <div className="card shadow p-4 text-center">
                <h2>
                  🚀 Postulación
                </h2>

                <p className="text-secondary">
                  Estás a punto de realizar una postulación.
                </p>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() =>
                    alert(
                      'Postulación preparada. Falta conectarla con la tabla postulaciones.'
                    )
                  }
                >
                  Confirmar Postulación
                </button>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            MIS POSTULACIONES
        ================================================== */}

        {vistaActual === 'postulaciones' && (
          <section>
            {!tieneRol(['contratista']) ? (
              <AccesoDenegado />
            ) : (
              <div>
                <h2 className="mb-4">
                  📄 Mis Postulaciones
                </h2>

                <div className="alert alert-info">
                  Aquí se mostrarán las postulaciones del
                  contratista desde la tabla{' '}
                  <code>postulaciones</code>.
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            REGISTRO DE EMPRESA
        ================================================== */}

        {vistaActual === 'empresa' && (
          <section>
            {!tieneRol(['empleado']) ? (
              <AccesoDenegado />
            ) : (
              <div className="card shadow p-4">
                <h2 className="mb-4">
                  🏢 Registrar Empresa
                </h2>

                <form onSubmit={handleEmpresaSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Código de empresa
                    </label>

                    <input
                      type="text"
                      name="cod_empresa"
                      className="form-control"
                      value={empresaData.cod_empresa}
                      onChange={handleEmpresaChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Nombre de la empresa
                    </label>

                    <input
                      type="text"
                      name="nombre_empresa"
                      className="form-control"
                      value={empresaData.nombre_empresa}
                      onChange={handleEmpresaChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      NIT / RUT
                    </label>

                    <input
                      type="text"
                      name="nit_rut"
                      className="form-control"
                      value={empresaData.nit_rut}
                      onChange={handleEmpresaChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    💾 Registrar Empresa
                  </button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            CREAR VACANTE - EMPLEADO
        ================================================== */}

        {vistaActual === 'vacante' && (
          <section>
            {!tieneRol(['empleado']) ? (
              <AccesoDenegado />
            ) : (
              <div className="card shadow p-4">
                <h2 className="mb-4">
                  📝 Crear Nueva Vacante
                </h2>

                <div className="alert alert-primary">
                  <strong>Rol:</strong> Empleado
                  <br />
                  Esta información será almacenada en la
                  tabla <code>vacante</code>.
                </div>

                <form onSubmit={handleVacanteSubmit}>
                  {/* TÍTULO */}

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Título de la vacante
                    </label>

                    <input
                      type="text"
                      name="titulo"
                      className="form-control"
                      value={vacanteData.titulo}
                      onChange={handleVacanteChange}
                      placeholder="Ej. Desarrollador de Software"
                      required
                    />
                  </div>

                  {/* SALARIO */}

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Salario
                    </label>

                    <input
                      type="number"
                      name="salario"
                      className="form-control"
                      value={vacanteData.salario}
                      onChange={handleVacanteChange}
                      placeholder="Ej. 3000000"
                      min="0"
                      required
                    />
                  </div>

                  {/* EMPRESA */}

                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Código de empresa
                    </label>

                    <input
                      type="text"
                      name="cod_empresa"
                      className="form-control"
                      value={vacanteData.cod_empresa}
                      onChange={handleVacanteChange}
                      placeholder="Código de la empresa"
                      required
                    />
                  </div>

                  {/* DESCRIPCIÓN */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Descripción
                    </label>

                    <textarea
                      name="descripcion"
                      className="form-control"
                      rows="6"
                      value={vacanteData.descripcion}
                      onChange={handleVacanteChange}
                      placeholder="Describe las funciones, requisitos y condiciones de la vacante..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 fw-bold"
                  >
                    🚀 Crear Vacante
                  </button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            VER POSTULANTES - EMPLEADO
        ================================================== */}

        {vistaActual === 'postulantes' && (
          <section>
            {!tieneRol(['empleado']) ? (
              <AccesoDenegado />
            ) : (
              <div>
                <h2 className="mb-4">
                  👥 Postulantes
                </h2>

                <div className="alert alert-info">
                  Aquí se consultarán los registros de{' '}
                  <code>postulaciones</code> relacionados con
                  <code>candidato</code>.
                </div>

                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5>
                      Módulo de postulantes
                    </h5>

                    <p>
                      En la siguiente etapa se conectará este
                      módulo con Supabase para consultar los
                      candidatos.
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        alert(
                          'Aquí posteriormente se actualizará estado_proceso.'
                        )
                      }
                    >
                      Actualizar estado del proceso
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            GESTIÓN DE USUARIOS - ADMINISTRADOR
        ================================================== */}

        {vistaActual === 'usuarios' && (
          <section>
            {!tieneRol(['administrador']) ? (
              <AccesoDenegado />
            ) : (
              <div>
                <h2 className="mb-4">
                  🛡️ Gestión de Usuarios
                </h2>

                <div className="alert alert-warning">
                  <strong>Administrador:</strong> esta sección
                  estará conectada a la tabla{' '}
                  <code>usuarios_roles</code>.
                </div>

                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5>
                      Administración de roles
                    </h5>

                    <p>
                      Aquí el administrador podrá consultar y
                      modificar los roles de los usuarios.
                    </p>

                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Acción</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>Usuario autenticado</td>
                            <td>
                              <span className="badge bg-primary">
                                {rolUsuario}
                              </span>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-warning"
                                onClick={() =>
                                  alert(
                                    'Esta acción se conectará con usuarios_roles.'
                                  )
                                }
                              >
                                Cambiar rol
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ==================================================
            REPORTES
        ================================================== */}

        {vistaActual === 'reportes' && (
          <section>
            {!tieneRol(['administrador']) ? (
              <AccesoDenegado />
            ) : (
              <UnderConstruction
                titulo="Módulo de Reportes"
                mensaje="Esta sección estará disponible en la próxima versión de EmpleoLink."
              />
            )}
          </section>
        )}
      </main>
    </>
  )
}

// ======================================================
// COMPONENTE DE ACCESO DENEGADO
// ======================================================

function AccesoDenegado() {
  return (
    <div
      className="alert alert-danger text-center shadow-sm"
      role="alert"
    >
      <h4 className="alert-heading">
        🔒 Acceso restringido
      </h4>

      <p>
        No tienes permisos para acceder a esta sección.
      </p>

      <hr />

      <p className="mb-0">
        Verifica que tu usuario tenga el rol correspondiente.
      </p>
    </div>
  )
}

// ======================================================
// EXPORTACIÓN
// ======================================================

export default App
```
