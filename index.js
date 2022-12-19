function crearFilaEmpleado(employee) {
  const bodyTable = document.getElementById("employee_data");

  // Celdas de los datos del employee
  const celdaNombre = document.createElement("td");
  celdaNombre.innerText = employee.name;
  const celdaCiudad = document.createElement("td");
  celdaCiudad.innerText = employee.city;
  const celdaCumpleanos = document.createElement("td");
  celdaCumpleanos.innerText = employee.birthday;
  const celdaEmail = document.createElement("td");
  celdaEmail.innerText = employee.email;
  const celdaId = document.createElement("td");
  celdaId.innerText = employee.id;

  // Celda Botones
  const celdaBotones = document.createElement("td");
  const botonEditar = document.createElement("button");
  const botonEliminar = document.createElement("button");
  botonEditar.innerText = "Editar";
  botonEditar.onclick = () => {
    renderizarFormularioEditar(employee);
  };
  botonEliminar.innerText = "Eliminar";
  botonEliminar.onclick = () => {
    renderizarFormularioEliminar(employee);
  };
  celdaBotones.appendChild(botonEditar);
  celdaBotones.appendChild(botonEliminar);

  // Fila
  const fila = document.createElement("tr");
  fila.appendChild(celdaNombre);
  fila.appendChild(celdaCiudad);
  fila.appendChild(celdaCumpleanos);
  fila.appendChild(celdaEmail);
  fila.appendChild(celdaBotones);
  fila.appendChild(celdaId);

  bodyTable.appendChild(fila);
}

const app = document.getElementById("app");

function renderizarListado() {
  app.innerHTML = `
  <table>
    <thead>
    <th>Nombre</th>
    <th>Ciudad</th>
    <th>Cummpleaños</th>
    <th>Email</th>
    <th<ID></ID>
    </thead>
    <tbody id="employee_data"></tbody>
    </table>
    `;

  fetch("https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees")
    .then((response) => response.json())
    .then((employees) => {
      employees.forEach(crearFilaEmpleado);
    });
}

const botonListar = document.getElementById("listar");
botonListar.addEventListener("click", renderizarListado);

function renderizarFormularioCrear() {
  app.innerHTML = `
    <form id="form_crear">
    <label>Nombre <input name="name" type="text" /></label>
    <label>Ciudad <input name="city" type="text" /></label>
    <label>Cummpleaños <input name="birthday" type="text" /></label>
    <label>Email <input name="email" type="text" /></label>
    <button type="submit">Enviar</button>
    </form>
    `;

  function onSubmit(event) {
    // Para evitar que el submit refresque la pagina
    event.preventDefault();
    
    fetch(
      `https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: event.target.name.value }),
        body: JSON.stringify({ city: event.target.city.value }),
        body: JSON.stringify({ birthday: event.target.birthday.value }),
        body: JSON.stringify({ email: event.target.email.value })
      }
    );
  }

  document.getElementById("form_crear").addEventListener("submit", onSubmit);
}

const botonCrear = document.getElementById("crear");
botonCrear.addEventListener("click", renderizarFormularioCrear);

function renderizarFormularioEditar(employee) {
  app.innerHTML = `
    <form id="form_editar">
    <label>Nombre <input name="name" type="text" value="${employee.name}" /></label>
    <label>Ciudad <input name="city" type="text" value="${employee.city}" /></label>
    <label>Cummpleaños <input name="birthday" type="text" value="${employee.birthday}" /></label>
    <label>Email <input name="email" type="text" value="${employee.email}" /></label>
    <button type="submit">Enviar</button>
    </form>
  `;

  function onSubmit(event) {
    // Para evitar que el submit refresque la pagina
    event.preventDefault();

    fetch(
      `https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees/${employee.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: event.target.name.value }),
        body: JSON.stringify({ city: event.target.city.value }),
        body: JSON.stringify({ birthday: event.target.birthday.value }),
        body: JSON.stringify({ email: event.target.email.value })
      }
    );
  }

  document.getElementById("form_editar").addEventListener("submit", onSubmit);
}


function renderizarFormularioEliminar(employee) {

  function onSubmit(event) {
    event.preventDefault();
  
    fetch(
      `https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees/${employee.id}`,
      {
        method: "DELETE"
      }
    );
  }
  BotonEliminar.addEventListener("submit", onSubmit);
;
}