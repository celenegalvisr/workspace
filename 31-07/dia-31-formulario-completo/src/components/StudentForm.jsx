import React, { useState } from 'react';

export default function StudentForm() {
  // 1. Inicializamos el estado con un único objeto para todos los inputs
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    edad: '',
    fechaNacimiento: '',
    experiencia: '5',
    lenguajes: [],
    modalidad: '',
    pais: '',
    terminos: false,
    archivo: null
  });

  // 2. Función manejadora de cambios global
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === 'checkbox' && name === 'lenguajes') {
      setFormData((prev) => ({
        ...prev,
        lenguajes: checked 
          ? [...prev.lenguajes, value] 
          : prev.lenguajes.filter((lang) => lang !== value)
      }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // Guardamos el primer archivo seleccionado
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 3. Función para procesar el envío sin recargar la página
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos listos para enviar a Supabase:', formData);
    alert('¡Formulario validado! Revisa la consola de desarrollador para ver los datos.');
  };

  return (
    <div className="card shadow-sm p-4 text-start bg-dark text-light border-secondary">
      <h2 className="mb-4 text-center border-bottom pb-2 border-secondary text-info">
        Registro de Estudiante
      </h2>
      
      <form onSubmit={handleSubmit}>
        
        {/* Fila 1: Nombre y Correo */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Nombre Completo</label>
            <input 
              type="text" 
              className="form-control bg-secondary text-white border-0" 
              name="nombre" 
              value={formData.nombre} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control bg-secondary text-white border-0" 
              name="correo" 
              value={formData.correo} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>

        {/* Fila 2: Contraseña y Edad */}
        <div className="row g-3 mb-3">
          <div className="col-md-8">
            <label className="form-label fw-bold">Contraseña</label>
            <input 
              type="password" 
              className="form-control bg-secondary text-white border-0" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="col-md-4">
            <label className="form-label fw-bold">Edad</label>
            <input 
              type="number" 
              className="form-control bg-secondary text-white border-0" 
              name="edad" 
              min="0"
              value={formData.edad} 
              onChange={handleChange} 
            />
          </div>
        </div>

        {/* Fila 3: Fecha de Nacimiento y País */}
        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">Fecha de Nacimiento</label>
            <input 
              type="date" 
              className="form-control bg-secondary text-white border-0" 
              name="fechaNacimiento" 
              value={formData.fechaNacimiento} 
              onChange={handleChange} 
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">País de Residencia</label>
            <select 
              className="form-select bg-secondary text-white border-0" 
              name="pais" 
              value={formData.pais} 
              onChange={handleChange}
            >
              <option value="">Selecciona un país</option>
              <option value="colombia">Colombia</option>
              <option value="mexico">México</option>
              <option value="argentina">Argentina</option>
            </select>
          </div>
        </div>

        {/* Nivel de Experiencia (Rango) */}
        <div className="mb-3">
          <label className="form-label fw-bold">
            Nivel de experiencia en programación: <span className="text-info">{formData.experiencia}/10</span>
          </label>
          <input 
            type="range" 
            className="form-range" 
            name="experiencia" 
            min="1" 
            max="10" 
            value={formData.experiencia} 
            onChange={handleChange} 
          />
        </div>

        {/* Lenguajes y Modalidad alineados lado a lado */}
        <div className="row g-3 mb-3">
          {/* Checkboxes múltiples */}
          <div className="col-md-6">
            <label className="form-label fw-bold d-block">Lenguajes que conoce</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="js" name="lenguajes" value="JS" checked={formData.lenguajes.includes('JS')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="js">JavaScript</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="python" name="lenguajes" value="Python" checked={formData.lenguajes.includes('Python')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="python">Python</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="java" name="lenguajes" value="Java" checked={formData.lenguajes.includes('Java')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="java">Java</label>
            </div>
          </div>

          {/* Radio Buttons excluyentes */}
          <div className="col-md-6">
            <label className="form-label fw-bold d-block">Modalidad de Estudio</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" id="presencial" name="modalidad" value="presencial" checked={formData.modalidad === 'presencial'} onChange={handleChange} />
              <label className="form-check-label" htmlFor="presencial">Presencial</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" id="virtual" name="modalidad" value="virtual" checked={formData.modalidad === 'virtual'} onChange={handleChange} />
              <label className="form-check-label" htmlFor="virtual">Virtual</label>
            </div>
          </div>
        </div>

        {/* Botón de Adjuntar Archivo */}
        <div className="mb-4">
          <label className="form-label fw-bold">Adjuntar Documento de Identidad (PDF/Imagen)</label>
          <input 
            type="file" 
            className="form-control bg-secondary text-white border-0" 
            name="archivo" 
            onChange={handleChange} 
          />
        </div>

        {/* Términos y Condiciones */}
        <div className="form-check mb-4">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="terminos" 
            name="terminos" 
            checked={formData.terminos} 
            onChange={handleChange} 
            required 
          />
          <label className="form-check-label text-muted" htmlFor="terminos">
            Acepto los términos y condiciones de registro.
          </label>
        </div>

        {/* Botón de envío */}
        <button type="submit" className="btn btn-info w-100 fw-bold py-2">
          Enviar Información
        </button>
      </form>
    </div>
  );
}