import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AuthForm from './components/AuthForms' // Ajusta si el nombre es AuthForm o AuthForms
import './App.css'

function App() {
  const [count, setCount] = useState(0) 
  const [usuario, setUsuario] = useState(null)
  
  // Estado para controlar qué sección del menú se está viendo
  const [vistaActual, setVistaActual] = useState('inicio') 

  const handleLoginSuccess = (user) => {
    setUsuario(user)
    setVistaActual('formulario') // Al loguearse, lo llevamos directo al formulario
  }

  const handleLogout = () => {
    setUsuario(null)
    setVistaActual('inicio') // Al cerrar sesión, vuelve a la pantalla de inicio
  }

  return (
    <>
      {/* ================= BARRA DE NAVEGACIÓN (MENÚ) ================= */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        backgroundColor: '#1a1a1a',
        borderBottom: '1px solid #333',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ fontWeight: 'bold', color: '#646cff', fontSize: '1.2rem' }}>
          🎓 AcademiaApp
        </div>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* Enlaces públicos */}
          <button 
            onClick={() => setVistaActual('inicio')}
            style={{ background: 'none', border: 'none', color: vistaActual === 'inicio' ? '#646cff' : '#aaa', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Inicio
          </button>

          {/* Enlaces PRIVADOS: Solo aparecen si hay un usuario logueado */}
          {usuario && (
            <>
              <button 
                onClick={() => setVistaActual('formulario')}
                style={{ background: 'none', border: 'none', color: vistaActual === 'formulario' ? '#646cff' : '#aaa', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Registro Estudiante
              </button>
              
              <span style={{ fontSize: '14px', color: '#28a745' }}>
                👤 {usuario.email}
              </span>
              
              <button 
                onClick={handleLogout} 
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ================= CONTENIDO DE LA PÁGINA ================= */}
      <section id="center" style={{ marginTop: '20px' }}>
        
        {/* VISTA 1: INICIO (Logos y bienvenida / Login si no está conectado) */}
        {vistaActual === 'inicio' && (
          <>
            <div className="hero">
              <img src={heroImg} className="base" width="170" height="179" alt="" />
              <img src={reactLogo} className="framework" alt="React logo" />
              <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            
            <div>
              <h1>Get started</h1>
              <p>Bienvenido a la plataforma de gestión escolar.</p>
            </div>

            {/* Si no está logueado, le mostramos el formulario de autenticación aquí mismo */}
            {!usuario ? (
              <div className="my-4">
                <AuthForm onLoginSuccess={handleLoginSuccess} />
              </div>
            ) : (
              <p style={{ color: '#646cff', marginTop: '20px' }}>
                🎉 ¡Ya tienes una sesión activa! Usa el menú superior para navegar al formulario.
              </p>
            )}
          </>
        )}

        {/* VISTA 2: FORMULARIO DE ESTUDIANTE (Protegido por autenticación) */}
        {vistaActual === 'formulario' && (
          <>
            {!usuario ? (
              // Salvaguarda: Si intenta entrar por código sin loguearse, lo bloquea
              <div className="my-4">
                <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Debes iniciar sesión para ver este formulario.</p>
                <AuthForm onLoginSuccess={handleLoginSuccess} />
              </div>
            ) : (
              /* TU FORMULARIO ORIGINAL DE REGISTRO DE ESTUDIANTE */
              <div className="formulario-contenedor" style={{ marginTop: '10px', textAlign: 'left' }}>
                <h2>Registro de Estudiante</h2>
                <form>
                  <div>
                    <label>Nombre: </label>
                    <input type="text" name="nombre" required />
                  </div>
                  <br />

                  <div>
                    <label>Correo: </label>
                    <input type="email" name="correo" required />
                  </div>
                  <br />

                  <div>
                    <label>Contraseña: </label>
                    <input type="password" name="password" required />
                  </div>
                  <br />

                  <div>
                    <label>Edad: </label>
                    <input type="number" name="edad" />
                  </div>
                  <br />

                  <div>
                    <label>Fecha de Nacimiento: </label>
                    <input type="date" name="fechaNacimiento" />
                  </div>
                  <br />

                  <div>
                    <label>Nivel de experiencia (1-10): </label>
                    <input type="range" name="experiencia" min="1" max="10" />
                  </div>
                  <br />

                  <div>
                    <label>Lenguajes que conoce:</label><br />
                    <input type="checkbox" id="js" name="lenguajes" value="JS" />
                    <label htmlFor="js"> JavaScript</label><br />
                    <input type="checkbox" id="python" name="lenguajes" value="Python" />
                    <label htmlFor="python"> Python</label><br />
                    <input type="checkbox" id="java" name="lenguajes" value="Java" />
                    <label htmlFor="java"> Java</label>
                  </div>
                  <br />

                  <div>
                    <label>Modalidad:</label><br />
                    <input type="radio" id="presencial" name="modalidad" value="presencial" />
                    <label htmlFor="presencial"> Presencial</label><br />
                    <input type="radio" id="virtual" name="modalidad" value="virtual" />
                    <label htmlFor="virtual"> Virtual</label>
                  </div>
                  <br />

                  <div>
                    <label>País: </label>
                    <select name="pais">
                      <option value="">Selecciona tu país</option>
                      <option value="colombia">Colombia</option>
                      <option value="mexico">México</option>
                    </select>
                  </div>
                  <br />
                  
                  <div>
                    <label>Color favorito: </label>
                    <input type="Color" name="Color" required />
                  </div>
                  <br />
                  
                  <div>
                    <label>Foto de perfil: </label>
                    <input type="File" name="Archivo" required />
                  </div>
                  <br />
                  
                  <div>
                    <input type="checkbox" id="terminos" name="terminos" required />
                    <label htmlFor="terminos"> Aceptar términos y condiciones</label>
                  </div>
                  <br />
                  
                  <button type="submit">Enviar</button>
                </form>
              </div>
            )}
          </>
        )}

        <br />
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      {/* El resto de secciones inferiores del documento Vite (Documentation, Connect with us) se mantienen intactas aquí abajo */}
    </>
  )
}

export default App