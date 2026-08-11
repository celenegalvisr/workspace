import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// ======================================================
// CONFIGURACIÓN DE SUPABASE
// ======================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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

  // Por seguridad, todos los registros nuevos serán
  // contratistas.
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
    if (!usuarioAuth?.id) {
      return null
    }

    // --------------------------------------------------
    // Buscar por usuario_id
    // --------------------------------------------------

    const { data, error: errorConsulta } = await supabase
      .from('usuarios_roles')
      .select('usuario_id, rol')
      .eq('usuario_id', usuarioAuth.id)
      .maybeSingle()

    if (!errorConsulta && data?.rol) {
      return data.rol
    }

    if (errorConsulta) {
      console.error(
        '❌ Error consultando el rol:',
        errorConsulta.message
      )
    }

    // --------------------------------------------------
    // Segundo intento: user_metadata
    // --------------------------------------------------

    const rolMetadata = usuarioAuth.user_metadata?.rol

    if (rolMetadata) {
      return rolMetadata
    }

    return null
  }

  // ====================================================
  // GUARDAR ROL DEL USUARIO
  // ====================================================

  const guardarRolUsuario = async (usuarioAuth, rolSeleccionado) => {
    if (!usuarioAuth?.id || !rolSeleccionado) {
      return false
    }

    // IMPORTANTE:
    // La tabla utiliza "usuario_id", NO "usuario".

    const { error: insertError } = await supabase
      .from('usuarios_roles')
      .insert({
        usuario_id: usuarioAuth.id,
        rol: rolSeleccionado,
      })

    if (!insertError) {
      console.log('✅ Rol guardado correctamente.')
      return true
    }

    console.error(
      '❌ Error guardando el rol:',
      insertError.message
    )

    console.error(
      'Código Supabase:',
      insertError.code
    )

    console.error(
      'Detalles Supabase:',
      insertError.details
    )

    console.error(
      'Hint Supabase:',
      insertError.hint
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

      // ------------------------------------------------
      // Obtener rol
      // ------------------------------------------------

      const rolUsuario = await obtenerRolUsuario(data.user)

      if (!rolUsuario) {
        await supabase.auth.signOut()

        throw new Error(
          'El usuario inició sesión, pero no tiene un rol asignado en usuarios_roles.'
        )
      }

      // ------------------------------------------------
      // Normalizar rol
      // ------------------------------------------------

      const rolNormalizado = String(rolUsuario)
        .toLowerCase()
        .trim()

      const rolesValidos = [
        'administrador',
        'empleado',
        'contratista',
      ]

      if (!rolesValidos.includes(rolNormalizado)) {
        await supabase.auth.signOut()

        throw new Error(
          'El rol registrado no es válido.'
        )
      }

      // ------------------------------------------------
      // Usuario completo para App.jsx
      // ------------------------------------------------

      const usuarioCompleto = {
        ...data.user,
        rol: rolNormalizado,
      }

      setMensaje(
        '✅ Inicio de sesión exitoso.'
      )

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

    try {
      setCargando(true)

      // ------------------------------------------------
      // El registro público siempre será CONTRATISTA.
      // ------------------------------------------------

      const rolRegistro = 'contratista'

      // ------------------------------------------------
      // Crear usuario en Supabase Auth
      // ------------------------------------------------

      const { data, error: registroError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              rol: rolRegistro,
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

      console.log(
        '✅ Usuario creado:',
        data.user.id
      )

      console.log(
        '🔐 ¿Existe sesión?:',
        data.session ? 'SÍ' : 'NO'
      )

      // ------------------------------------------------
      // IMPORTANTE
      //
      // Si hay confirmación por correo, data.session
      // puede ser null.
      //
      // En ese caso NO intentamos insertar desde el
      // navegador porque auth.uid() será null.
      // ------------------------------------------------

      if (data.session) {
        const rolGuardado = await guardarRolUsuario(
          data.user,
          rolRegistro
        )

        if (!rolGuardado) {
          setError(
            'El usuario fue creado, pero no se pudo guardar el rol. Revisa las políticas RLS o el trigger de usuarios_roles.'
          )

          return
        }
      }

      // ------------------------------------------------
      // Confirmación por correo
      // ------------------------------------------------

      if (!data.session) {
        setMensaje(
          '✅ Registro exitoso. Revisa tu correo para confirmar la cuenta antes de iniciar sesión.'
        )

        setModo('login')
        setPassword('')

        return
      }

      // ------------------------------------------------
      // Sesión creada inmediatamente
      // ------------------------------------------------

      const usuarioCompleto = {
        ...data.user,
        rol: rolRegistro,
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

      {/* ================================================
          BOTONES LOGIN / REGISTRO
      ================================================= */}

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

      {/* ================================================
          MENSAJE DE ÉXITO
      ================================================= */}

      {mensaje && (
        <div
          className="alert alert-success"
          role="alert"
        >
          {mensaje}
        </div>
      )}

      {/* ================================================
          MENSAJE DE ERROR
      ================================================= */}

      {error && (
        <div
          className="alert alert-danger"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* ================================================
          LOGIN
      ================================================= */}

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

      {/* ================================================
          REGISTRO
      ================================================= */}

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

          {/* ============================================
              ROL
              
              Por seguridad, el registro público crea
              usuarios como CONTRATISTA.
              
              Los roles administrativos deben asignarse
              desde una operación controlada.
          ============================================ */}

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
              disabled
            >
              <option value="contratista">
                👤 Contratista
              </option>
              
              <option value="empleado">
               👷 Empleado
              </option>
              
            </select>
            <div className="form-text">
              Los nuevos registros se crean como contratistas.
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