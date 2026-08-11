import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'


// ======================================================
// CONFIGURACIÓN DE SUPABASE
// ======================================================


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY


// Validamos las variables de entorno antes de crear el cliente
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ No se encontraron las variables de Supabase en el archivo .env'
  )
}


const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)


// ======================================================
// COMPONENTE AUTHFORMS
// ======================================================


function AuthForms({ onLoginSuccess }) {
  // ====================================================
  // ESTADOS
  // ====================================================


  const [modo, setModo] = useState('login')


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const [rol, setRol] = useState('contratista')


  const [cargando, setCargando] = useState(false)


  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')


  // ====================================================
  // LIMPIAR MENSAJES
  // ====================================================


  const limpiarMensajes = () => {
    setMensaje('')
    setError('')
  }


  // ====================================================
  // CAMBIAR ENTRE LOGIN Y REGISTRO
  // ====================================================


  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo)
    limpiarMensajes()


    setEmail('')
    setPassword('')


    if (nuevoModo === 'registro') {
      setRol('contratista')
    }
  }


  // ====================================================
  // BUSCAR ROL DEL USUARIO
  // ====================================================


  const obtenerRolUsuario = async (usuarioAuth) => {
    if (!usuarioAuth) {
      return null
    }


    // -----------------------------------------------
    // PRIMER INTENTO:
    // Buscar por UUID de Supabase Auth
    // -----------------------------------------------


    const { data: datosPorId, error: errorPorId } =
      await supabase
        .from('usuarios_roles')
        .select('usuario, rol')
        .eq('usuario', usuarioAuth.id)
        .maybeSingle()


    if (!errorPorId && datosPorId?.rol) {
      return datosPorId.rol
    }


    // -----------------------------------------------
    // SEGUNDO INTENTO:
    // Buscar por correo
    //
    // Esto permite que funcione si la columna
    // "usuario" guarda el correo electrónico.
    // -----------------------------------------------


    const { data: datosPorCorreo, error: errorPorCorreo } =
      await supabase
        .from('usuarios_roles')
        .select('usuario, rol')
        .eq('usuario', usuarioAuth.email)
        .maybeSingle()


    if (!errorPorCorreo && datosPorCorreo?.rol) {
      return datosPorCorreo.rol
    }


    // -----------------------------------------------
    // TERCER INTENTO:
    // Buscar el rol en user_metadata
    // -----------------------------------------------


    const rolMetadata = usuarioAuth.user_metadata?.rol


    if (rolMetadata) {
      return rolMetadata
    }


    return null
  }


  // ====================================================
  // GUARDAR ROL EN usuarios_roles
  // ====================================================


  const guardarRolUsuario = async (usuarioAuth, rolSeleccionado) => {
    if (!usuarioAuth || !rolSeleccionado) {
      return false
    }


    // Primero intentamos guardar usando el UUID
    const { error: errorUUID } = await supabase
      .from('usuarios_roles')
      .insert({
        usuario: usuarioAuth.id,
        rol: rolSeleccionado,
      })


    if (!errorUUID) {
      return true
    }


    console.warn(
      '⚠️ No fue posible guardar el rol usando el UUID:',
      errorUUID.message
    )


    // -----------------------------------------------
    // Segundo intento usando correo
    // -----------------------------------------------


    const { error: errorCorreo } = await supabase
      .from('usuarios_roles')
      .insert({
        usuario: usuarioAuth.email,
        rol: rolSeleccionado,
      })


    if (!errorCorreo) {
      return true
    }


    console.error(
      '❌ No fue posible guardar el rol:',
      errorCorreo.message
    )


    return false
  }


  // ====================================================
  // INICIAR SESIÓN
  // ====================================================


  const handleLogin = async (e) => {
    e.preventDefault()


    limpiarMensajes()


    if (!email.trim() || !password) {
      setError(
        'Por favor ingresa tu correo y contraseña.'
      )
      return
    }


    try {
      setCargando(true)


      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

      if (loginError) {
        throw loginError
      }


      if (!data.user) {
        throw new Error(
          'No se pudo obtener la información del usuario.'
        )
      }


      // -----------------------------------------------
      // Obtener rol desde usuarios_roles
      // -----------------------------------------------


      const rolUsuario = await obtenerRolUsuario(data.user)


      if (!rolUsuario) {
        await supabase.auth.signOut()


        throw new Error(
          'El usuario inició sesión, pero no tiene un rol asignado en usuarios_roles.'
        )
      }


      // -----------------------------------------------
      // Normalizar rol
      // -----------------------------------------------


      const rolNormalizado =
        String(rolUsuario).toLowerCase().trim()


      const rolesValidos = [
        'administrador',
        'empleado',
        'contratista',
      ]


      if (!rolesValidos.includes(rolNormalizado)) {
        await supabase.auth.signOut()


        throw new Error(
          'El rol registrado no es válido. Debe ser administrador, empleado o contratista.'
        )
      }


      // -----------------------------------------------
      // Crear objeto que recibe App.jsx
      // -----------------------------------------------


      const usuarioCompleto = {
        ...data.user,
        rol: rolNormalizado,
      }


      setMensaje(
        '✅ Inicio de sesión exitoso.'
      )


      // -----------------------------------------------
      // Avisamos a App.jsx
      // -----------------------------------------------


      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(usuarioCompleto)
      }
    } catch (err) {
      console.error(
        '❌ Error de inicio de sesión:',
        err
      )


      setError(
        err?.message ||
          'No fue posible iniciar sesión.'
      )
    } finally {
      setCargando(false)
    }
  }


  // ====================================================
  // REGISTRAR USUARIO
  // ====================================================


  const handleRegistro = async (e) => {
    e.preventDefault()


    limpiarMensajes()


    if (!email.trim() || !password) {
      setError(
        'Por favor completa el correo y la contraseña.'
      )
      return
    }


    if (password.length < 6) {
      setError(
        'La contraseña debe tener mínimo 6 caracteres.'
      )
      return
    }


    if (!rol) {
      setError(
        'Selecciona un rol.'
      )
      return
    }


    try {
      setCargando(true)


      // -----------------------------------------------
      // Crear usuario en Supabase Auth
      // -----------------------------------------------


      const { data, error: registroError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              rol,
            },
          },
        })


      if (registroError) {
        throw registroError
      }


      if (!data.user) {
        throw new Error(
          'Supabase no devolvió información del usuario.'
        )
      }


      // -----------------------------------------------
      // Guardar el rol
      // -----------------------------------------------


      const rolGuardado = await guardarRolUsuario(
        data.user,
        rol
      )


      if (!rolGuardado) {
        setError(
          'El usuario fue creado, pero no se pudo guardar el rol en usuarios_roles. Revisa las políticas RLS.'
        )


        return
      }


      // -----------------------------------------------
      // Caso en que Supabase requiere confirmación
      // -----------------------------------------------


      if (!data.session) {
        setMensaje(
          '✅ Registro exitoso. Revisa tu correo para confirmar la cuenta antes de iniciar sesión.'
        )


        setModo('login')
        setPassword('')


        return
      }


      // -----------------------------------------------
      // Si la sesión se creó inmediatamente
      // -----------------------------------------------


      const usuarioCompleto = {
        ...data.user,
        rol,
      }


      setMensaje(
        '✅ Registro exitoso.'
      )


      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(usuarioCompleto)
      }
    } catch (err) {
      console.error(
        '❌ Error de registro:',
        err
      )


      setError(
        err?.message ||
          'No fue posible registrar el usuario.'
      )
    } finally {
      setCargando(false)
    }
  }


  // ====================================================
  // RECUPERAR CONTRASEÑA
  // ====================================================


  const handleRecuperarPassword = async () => {
    limpiarMensajes()


    if (!email.trim()) {
      setError(
        'Primero escribe tu correo electrónico.'
      )
      return
    }


    try {
      setCargando(true)


      const { error: recoveryError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim()
        )


      if (recoveryError) {
        throw recoveryError
      }


      setMensaje(
        '📧 Si el correo existe, recibirás instrucciones para recuperar tu contraseña.'
      )
    } catch (err) {
      console.error(
        '❌ Error recuperando contraseña:',
        err
      )


      setError(
        err?.message ||
          'No fue posible procesar la recuperación de contraseña.'
      )
    } finally {
      setCargando(false)
    }
  }


  // ====================================================
  // RENDER
  // ====================================================


  return (
    <div>
      {/* ==================================================
          BOTONES LOGIN / REGISTRO
      ================================================== */}


      <div className="btn-group w-100 mb-4">
        <button
          type="button"
          className={
            modo === 'login'
              ? 'btn btn-primary'
              : 'btn btn-outline-primary'
          }
          onClick={() => cambiarModo('login')}
          disabled={cargando}
        >
          🔐 Iniciar sesión
        </button>


        <button
          type="button"
          className={
            modo === 'registro'
              ? 'btn btn-success'
              : 'btn btn-outline-success'
          }
          onClick={() => cambiarModo('registro')}
          disabled={cargando}
        >
          📝 Registrarse
        </button>
      </div>


      {/* ==================================================
          MENSAJE DE ÉXITO
      ================================================== */}


      {mensaje && (
        <div
          className="alert alert-success"
          role="alert"
        >
          {mensaje}
        </div>
      )}


      {/* ==================================================
          MENSAJE DE ERROR
      ================================================== */}


      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}


      {/* ==================================================
          FORMULARIO DE LOGIN
      ================================================== */}


      {modo === 'login' && (
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label
              htmlFor="login-email"
              className="form-label fw-bold"
            >
              Correo electrónico
            </label>


            <input
              id="login-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              disabled={cargando}
            />
          </div>


          <div className="mb-3">
            <label
              htmlFor="login-password"
              className="form-label fw-bold"
            >
              Contraseña
            </label>


            <input
              id="login-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              required
              disabled={cargando}
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
            disabled={cargando}
          >
            {cargando
              ? '⏳ Iniciando sesión...'
              : '🔐 Iniciar Sesión'}
          </button>


          <button
            type="button"
            className="btn btn-link w-100 mt-2"
            onClick={handleRecuperarPassword}
            disabled={cargando}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      )}


      {/* ==================================================
          FORMULARIO DE REGISTRO
      ================================================== */}


      {modo === 'registro' && (
        <form onSubmit={handleRegistro}>
          <div className="mb-3">
            <label
              htmlFor="registro-email"
              className="form-label fw-bold"
            >
              Correo electrónico
            </label>


            <input
              id="registro-email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="correo@ejemplo.com"
              autoComplete="email"
              required
              disabled={cargando}
            />
          </div>


          <div className="mb-3">
            <label
              htmlFor="registro-password"
              className="form-label fw-bold"
            >
              Contraseña
            </label>


            <input
              id="registro-password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              minLength={6}
              required
              disabled={cargando}
            />


            <div className="form-text">
              La contraseña debe tener mínimo 6 caracteres.
            </div>
          </div>


          <div className="mb-4">
            <label
              htmlFor="registro-rol"
              className="form-label fw-bold"
            >
              Tipo de usuario
            </label>


            <select
              id="registro-rol"
              className="form-select"
              value={rol}
              onChange={(e) =>
                setRol(e.target.value)
              }
              required
              disabled={cargando}
            >
              <option value="contratista">
                👤 Contratista
              </option>


              <option value="empleado">
                👷 Empleado
              </option>


              <option value="administrador">
                🛡️ Administrador
              </option>
            </select>


            <div className="form-text">
              El rol determina las opciones disponibles
              dentro de EmpleoLink.
            </div>
          </div>


          <button
            type="submit"
            className="btn btn-success w-100 fw-bold"
            disabled={cargando}
          >
            {cargando
              ? '⏳ Registrando...'
              : '📝 Crear Cuenta'}
          </button>
        </form>
      )}
    </div>
  )
}


export default AuthForms
