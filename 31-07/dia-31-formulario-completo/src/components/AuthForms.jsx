import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Conexión a la base de datos

export default function AuthForm({ onLoginSuccess }) {
  const [esLogin, setEsLogin] = useState(true); // Controla si se muestra Login o Registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (esLogin) {
      // Lógica de Inicio de Sesión
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        // CORREGIDO: Se agregaron las comillas invertidas faltantes
        alert(`Error al iniciar sesión: ${error.message}`);
      } else {
        alert('¡Sesión iniciada con éxito!');
        onLoginSuccess(data.user); // Avisa a App.jsx que el usuario ingresó
      }
    } else {
      // Lógica de Registro
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        // CORREGIDO: Se agregaron las comillas invertidas faltantes
        alert(`Error al registrarse: ${error.message}`);
      } else {
        alert('¡Registro exitoso! Revisa tu correo para confirmar la cuenta.');
      }
    }
    setCargando(false);
  };

  return (
    <div className="card shadow p-4 text-start bg-dark text-light border-secondary mx-auto" style={{ maxWidth: '450px' }}>
      <h2 className="text-center mb-4 text-info">
        {esLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Correo Electrónico</label>
          <input 
            type="email" 
            className="form-control bg-secondary text-white border-0" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-bold">Contraseña</label>
          <input 
            type="password" 
            className="form-control bg-secondary text-white border-0" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        
        <button type="submit" className="btn btn-info w-100 fw-bold mb-3" disabled={cargando}>
          {cargando ? 'Procesando...' : esLogin ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>

      {/* BOTÓN COMODÍN: Intercambia el estado visual del formulario */}
      <div className="text-center mt-2">
        <button 
          className="btn btn-link text-info p-0 text-decoration-none" 
          onClick={() => setEsLogin(!esLogin)}
        >
          {esLogin ? '¿No tienes cuenta? Regístrate aquí' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
}
