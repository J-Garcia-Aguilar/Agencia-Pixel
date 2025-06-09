
document.addEventListener('DOMContentLoaded', () => {
    // Formularios
    const contactForm = document.getElementById('contact-form');
    const budgetForm = document.getElementById('budget-form');
  
    // Campos de contacto
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
  
    // Campos de presupuesto
    const productoSelect = document.getElementById('producto');
    const plazoInput = document.getElementById('plazo');
    const extrasInputs = document.querySelectorAll('input[name="extras"]');
    const precioFinalSpan = document.getElementById('precio-final');
    const condicionesCheckbox = document.getElementById('condiciones');
  
    // Validaciones
    const validarNombre = nombre => /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre) && nombre.length <= 15;
    const validarApellidos = apellidos => /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(apellidos) && apellidos.length <= 40;
    const validarTelefono = tel => /^[0-9]{1,9}$/.test(tel);
    const validarEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
    // Cálculo dinámico de presupuesto
    function calcularPresupuesto() {
      const option = productoSelect.selectedOptions[0];
      const base = Number(option?.dataset.precio) || 0;
      const meses = Number(plazoInput.value) || 0;
      const descuento = base * 0.05 * meses;
      let extrasTotal = 0;
      extrasInputs.forEach(cb => { if (cb.checked) extrasTotal += Number(cb.value); });
      const total = base - descuento + extrasTotal;
      precioFinalSpan.textContent = `€${total.toFixed(2)}`;
    }
  
    // Recalcular al cambiar opciones
    productoSelect.addEventListener('change', calcularPresupuesto);
    plazoInput.addEventListener('input', calcularPresupuesto);
    extrasInputs.forEach(cb => cb.addEventListener('change', calcularPresupuesto));
  
    calcularPresupuesto();
  
    // Manejo de envío
    budgetForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
  
      // Validar contacto
      if (!validarNombre(nombreInput.value)) {
        alert('Nombre inválido: solo letras, max 15 caracteres.'); valid = false;
      }
      if (!validarApellidos(apellidosInput.value)) {
        alert('Apellidos inválidos: solo letras, max 40 caracteres.'); valid = false;
      }
      if (!validarTelefono(telefonoInput.value)) {
        alert('Teléfono inválido: solo números, max 9 dígitos.'); valid = false;
      }
      if (!validarEmail(emailInput.value)) {
        alert('Email inválido.'); valid = false;
      }
  
      // Validar condiciones
      if (!condicionesCheckbox.checked) {
        alert('Debes aceptar las condiciones de privacidad.'); valid = false;
      }
  
      // Validar presupuesto
      if (!productoSelect.value) {
        alert('Selecciona un producto.'); valid = false;
      }
      if (Number(plazoInput.value) < 1) {
        alert('El plazo debe ser al menos 1 mes.'); valid = false;
      }
  
      if (valid) {
        alert('Formulario enviado correctamente.');
        contactForm.reset();
        budgetForm.reset();
        calcularPresupuesto();
      }
    });
  });
  