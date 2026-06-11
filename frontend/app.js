const API_BASE = '/api/decimas';

async function cargarDecimas() {
  document.getElementById('status').textContent = 'Cargando...';
  try {
    const res = await fetch(API_BASE);
    const data = await res.json();
    renderDecimas(data);
    document.getElementById('status').textContent = `${data.length} décima(s) encontrada(s).`;
  } catch (err) {
    document.getElementById('status').textContent = 'Error al conectar con el servidor.';
    console.error(err);
  }
}

function renderDecimas(decimas) {
  const tbody = document.getElementById('tbodyDecimas');
  tbody.innerHTML = '';

  if (decimas.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#9ca3af;">No hay décimas registradas.</td></tr>';
    return;
  }

  decimas.forEach(d => {
    const resumen = d.contenido.length > 60 ? d.contenido.substring(0, 60) + '...' : d.contenido;
    const fecha = new Date(d.fecha_creacion).toLocaleDateString('es-CL');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${d.id}</td>
      <td>${d.titulo}</td>
      <td>${d.autor}</td>
      <td class="contenido-cell">${resumen}</td>
      <td>${fecha}</td>
      <td><button class="btn btn-danger" onclick="eliminarDecima(${d.id})">Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function guardarDecima() {
  const titulo = document.getElementById('inputTitulo').value.trim();
  const autor = document.getElementById('inputAutor').value.trim();
  const contenido = document.getElementById('inputContenido').value.trim();

  if (!titulo || !autor || !contenido) {
    alert('Por favor completa todos los campos.');
    return;
  }

  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autor, contenido }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Error al guardar.');
      return;
    }

    limpiarFormulario();
    await cargarDecimas();
  } catch (err) {
    alert('Error al conectar con el servidor.');
    console.error(err);
  }
}

async function eliminarDecima(id) {
  if (!confirm(`¿Eliminar la décima #${id}?`)) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || 'Error al eliminar.');
      return;
    }
    await cargarDecimas();
  } catch (err) {
    alert('Error al conectar con el servidor.');
    console.error(err);
  }
}

function limpiarFormulario() {
  document.getElementById('inputTitulo').value = '';
  document.getElementById('inputAutor').value = '';
  document.getElementById('inputContenido').value = '';
  document.getElementById('formTitle').textContent = 'Nueva décima';
}

cargarDecimas();
