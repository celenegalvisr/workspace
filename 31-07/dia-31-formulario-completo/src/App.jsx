import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState()

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
         <div className="formulario-contenedor" style={{ marginTop: '30px', textAlign: 'left' }}>
          <h2>Registro de Estudiante</h2>
          <form>
            {/* Nombre */}
            <div>
              <label>Nombre: </label>
              <input type="text" name="nombre" required />
            </div>
            <br />

            {/* Correo */}
            <div>
              <label>Correo: </label>
              <input type="email" name="correo" required />
            </div>
            <br />

            {/* Contraseña */}
            <div>
              <label>Contraseña: </label>
              <input type="password" name="password" required />
            </div>
            <br />

            {/* Edad */}
            <div>
              <label>Edad: </label>
              <input type="number" name="edad" />
            </div>
            <br />

            {/* Fecha de nacimiento */}
            <div>
              <label>Fecha de Nacimiento: </label>
              <input type="date" name="fechaNacimiento" />
            </div>
            <br />

            {/* Nivel de experiencia */}
            <div>
              <label>Nivel de experiencia (1-10): </label>
              <input type="range" name="experiencia" min="1" max="10" />
            </div>
            <br />

            {/* Lenguajes que conoce (Varios checkboxes) */}
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

            {/* Modalidad (Grupo de Radio) */}
            <div>
              <label>Modalidad:</label><br />
              <input type="radio" id="presencial" name="modalidad" value="presencial" />
              <label htmlFor="presencial"> Presencial</label><br />
              <input type="radio" id="virtual" name="modalidad" value="virtual" />
              <label htmlFor="virtual"> Virtual</label>
            </div>
            <br />

            {/* País (Select con Option) */}
            <div>
              <label>País: </label>
              <select name="pais">
                <option value="">Selecciona tu país</option>
                <option value="colombia">Colombia</option>
                <option value="mexico">México</option>
              </select>
            </div>
            <br />
            {/* Color favorito*/}
            <div>
              <label>Color favorito: </label>
              <input type="Color" name="Color" required />
            </div>
            <br />
            {/* Foto de perfil */}
            <div>
              <label>Foto de perfil: </label>
              <input type="File" name="Archivo" required />
            </div>
            <br />
            {/* Aceptar términos (Uno solo) */}
            <div>
              <input type="checkbox" id="terminos" name="terminos" required />
              <label htmlFor="terminos"> Aceptar términos y condiciones</label>
            </div>
            <br />
            <button type="submit">Enviar</button>
          </form>
        </div>
        {/* --- AQUÍ TERMINA EL FORMULARIO --- */}
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
