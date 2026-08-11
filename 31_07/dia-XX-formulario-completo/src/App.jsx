import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AuthForm from './components/AuthForms' // Ajusta el path si es necesario
import { UnderConstruction } from './components/UnderConstruction' // Importación del componente
import './App.css'

function App() {
  // ================= ESTADOS GENERALES =================
  const [count, setCount] = useState(0)
  const [usuario, setUsuario] = useState(null)
  
  // Estado para controlar la sección o vista actual ('inicio' | 'formulario' | 'reportes')
  const [vistaActual, setVistaActual] = useState('inicio')

  // Estado local para los campos del formulario de estudiante
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    edad: '',
    fechaNacimiento: '',
    experiencia: '5',
    vacante: '',
    lenguajes: [],
    modalidad: 'presencial',
    pais: '',
    color: '#646cff',
    archivo: null,
    terminos: false
  })

  // ================= MANEJADORES DE SESIÓN =================
  const handleLoginSuccess = (user) => {
    setUsuario(user)
    setVistaActual('formulario') // Redirige automáticamente al formulario tras login
  }

  const handleLogout = () => {
    setUsuario(null)
    setVistaActual('inicio') // Regresa a inicio al cerrar sesión
  }

  // ================= MANEJADORES DEL FORMULARIO =================
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === 'checkbox' && name === 'lenguajes') {
      // Manejo para grupo de checkboxes (lenguajes)
      const nuevosLenguajes = checked
        ? [...formData.lenguajes, value]
        : formData.lenguajes.filter((l) => l !== value)

      setFormData((prev) => ({ ...prev, lenguajes: nuevosLenguajes }))
    } else if (type === 'checkbox') {
      // Manejo para checkbox único (términos)
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'file') {
      // Manejo para archivo
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      // Manejo para inputs estándar
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.terminos) {
      alert('Debes aceptar los términos y condiciones.')
      return
    }
    console.log('Datos enviados:', formData)
    alert('¡Formulario enviado con éxito!')
  }

  return (
    <>
      {/* ================= MENÚ FLOTANTE INTEGRADO ================= */}
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
          gap: '12px',
          width: '210px',
          textAlign: 'left'
        }}
      >
        <span style={{ fontSize: '11px', color: '#6c757d', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
          🧭 Menú Navegación
        </span>

        {/* Botón Inicio - Siempre visible */}
        <button
          onClick={() => setVistaActual('inicio')}
          className="btn btn-sm text-start w-100 fw-bold"
          style={{
            backgroundColor: vistaActual === 'inicio' ? '#0dcaf0' : 'transparent',
            color: vistaActual === 'inicio' ? '#000' : '#fff',
            border: 'none'
          }}
        >
          🏠 Ir a Inicio
        </button>

        {/* Opciones Condicionales del Menú Flotante */}
        {usuario ? (
          <div style={{ borderTop: '1px solid #495057', paddingTop: '10px' }}>
            <p style={{ fontSize: '12px', color: '#198754', margin: '0 0 8px 0', wordBreak: 'break-all' }}>
              🟢 En línea: <br />
              <strong>{usuario.email}</strong>
            </p>

            <button
              onClick={() => setVistaActual('formulario')}
              className="btn btn-sm text-start w-100 fw-bold mb-2"
              style={{
                backgroundColor: vistaActual === 'formulario' ? '#0dcaf0' : 'transparent',
                color: vistaActual === 'formulario' ? '#000' : '#fff',
                border: 'none'
              }}
            >
              📝 Formulario Vacante
            </button>

            {/* Botón añadido para ir a Reportes */}
            <button
              onClick={() => setVistaActual('reportes')}
              className="btn btn-sm text-start w-100 fw-bold mb-2"
              style={{
                backgroundColor: vistaActual === 'reportes' ? '#0dcaf0' : 'transparent',
                color: vistaActual === 'reportes' ? '#000' : '#fff',
                border: 'none'
              }}
            >
              📊 Módulo Reportes
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm w-100 fw-bold mt-2"
            >
              ❌ Cerrar Sesión
            </button>
          </div>
        ) : (
          <div style={{ borderTop: '1px solid #495057', paddingTop: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#dc3545', margin: 0 }}>
              🔒 Inicia sesión para desbloquear las opciones.
            </p>
          </div>
        )}
      </aside>

      {/* ================= BARRA DE NAVEGACIÓN SUPERIOR ================= */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 30px',
          backgroundColor: '#1a1a1a',
          borderBottom: '1px solid #333',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <div style={{ fontWeight: 'bold', color: '#646cff', fontSize: '1.2rem' }}>
          🎓 EmpleoLink
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => setVistaActual('inicio')}
            style={{
              background: 'none',
              border: 'none',
              color: vistaActual === 'inicio' ? '#646cff' : '#aaa',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Inicio
          </button>

          {usuario && (
            <>
              <button
                onClick={() => setVistaActual('formulario')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: vistaActual === 'formulario' ? '#646cff' : '#aaa',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Registro nueva vacante
              </button>

              <button
                onClick={() => setVistaActual('reportes')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: vistaActual === 'reportes' ? '#646cff' : '#aaa',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Reportes
              </button>

              <span style={{ fontSize: '14px', color: '#28a745' }}>
                👤 {usuario.email}
              </span>

              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="container my-4" style={{ maxWidth: '800px' }}>
        
        {/* VISTA 1: INICIO */}
        {vistaActual === 'inicio' && (
          <section className="text-center">
            <div className="hero mb-3">
              <img src={heroImg} className="base me-2" width="120" alt="Hero" />
              <img src={reactLogo} className="framework me-2" width="80" alt="React logo" />
              <img src={viteLogo} className="vite" width="80" alt="Vite logo" />
            </div>

            <h1 className="mb-3">EmpleoLink</h1>
            <p className="text-secondary">Conectando tu futuro digital.</p>

            {!usuario ? (
              <div className="card p-4 mx-auto my-4 text-start shadow-sm" style={{ maxWidth: '450px' }}>
                <h4 className="card-title text-center mb-3">Iniciar Sesión / Registro</h4>
                <AuthForm onLoginSuccess={handleLoginSuccess} />
              </div>
            ) : (
              <div className="alert alert-info mt-4" role="alert">
                🎉 ¡Ya tienes una sesión activa como <strong>{usuario.email}</strong>! Usa el menú lateral o superior para acceder al formulario.
              </div>
            )}
          </section>
        )}

        {/* VISTA 2: FORMULARIO DE ESTUDIANTE (PROTEGIDO) */}
        {vistaActual === 'formulario' && (
          <section>
            {!usuario ? (
              /* Protección: si se intenta entrar sin estar logueado */
              <div className="alert alert-danger text-center" role="alert">
                <h4 className="alert-heading">Acceso Restringido</h4>
                <p>Debes iniciar sesión previamente para acceder al registro de vacantes.</p>
                <hr />
                <button 
                  onClick={() => setVistaActual('inicio')} 
                  className="btn btn-danger btn-sm"
                >
                  Ir al Login
                </button>
              </div>
            ) : (
              /* Formulario protegido con clases Bootstrap */
              <div className="card shadow p-4 text-start">
                <h2 className="card-title mb-4 border-bottom pb-2">📋 Registro de vacante</h2>
                
                <form onSubmit={handleSubmit}>
                  {/* Nombre */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nombre Completo:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Ej. Maria Pérez"
                      required
                    />
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Correo Electrónico:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>

                  {/* Contraseña */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Contraseña:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Edad y Fecha de Nacimiento */}
                  <div className="row mb-3">
                    <div className="col-md-6 mb-3 mb-md-0">
                      <label className="form-label fw-bold">Edad:</label>
                      <input
                        type="number"
                        className="form-control"
                        name="edad"
                        value={formData.edad}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        className="form-control"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Nivel de Experiencia */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nivel de experiencia (1 a 10): {formData.experiencia}</label>
                    <input
                      type="range"
                      className="form-range"
                      name="experiencia"
                      min="1"
                      max="10"
                      value={formData.experiencia}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Vacante */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Vacante:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="Vacante"
                      value={formData.vacante}
                      onChange={handleInputChange}
                      placeholder="Ej. Ingeniero de software"
                      required
                    />
                  </div>
                  
                  {/* Lenguajes que conoce */}
                  <div className="mb-3">
                    <label className="form-label fw-bold d-block">Lenguajes que conoce:</label>
                    {['JS', 'Python', 'Java'].map((lang) => (
                      <div className="form-check form-check-inline" key={lang}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`lang-${lang}`}
                          name="lenguajes"
                          value={lang}
                          checked={formData.lenguajes.includes(lang)}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor={`lang-${lang}`}>
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* Modalidad */}
                  <div className="mb-3">
                    <label className="form-label fw-bold d-block">Modalidad:</label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="presencial"
                        name="modalidad"
                        value="presencial"
                        checked={formData.modalidad === 'presencial'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="presencial">Presencial</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="virtual"
                        name="modalidad"
                        value="virtual"
                        checked={formData.modalidad === 'virtual'}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="virtual">Virtual</label>
                    </div>
                  </div>

                  {/* País */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">País:</label>
                    <select
                      className="form-select"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                    >
                      <option value="">Selecciona tu país</option>
                      <option value="colombia">Colombia</option>
                      <option value="mexico">México</option>
                    </select>
                  </div>

                  {/* Color Favorito */}
                  <div className="mb-3">
                    <label className="form-label fw-bold me-2">Color favorito:</label>
                    <input
                      type="color"
                      className="form-control form-control-color d-inline-block align-middle"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      title="Elige tu color"
                    />
                  </div>

                  {/* Archivo */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">Foto de perfil:</label>
                    <input
                      type="file"
                      className="form-control"
                      name="archivo"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Términos y Condiciones */}
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terminos"
                      name="terminos"
                      checked={formData.terminos}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="terminos">
                      Aceptar términos y condiciones
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 fw-bold">
                    🚀 Guardar postulacion
                  </button>
                </form>
              </div>
            )}
          </section>
        )}

        {/* VISTA 3: MÓDULO EN CONSTRUCCIÓN */}
        {vistaActual === 'reportes' && (
          <UnderConstruction 
            titulo="Módulo de Reportes" 
            mensaje="Esta sección estará disponible en la próxima versión de EmpleoLink." 
          />
        )}

        {/* Contador Vite de prueba */}
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setCount((c) => c + 1)}
          >
            Count is {count}
          </button>
        </div>
      </main>
    </>
  )
}

export default App