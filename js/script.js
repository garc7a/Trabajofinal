document.addEventListener("DOMContentLoaded", function () {
    const ciudadSelect = document.getElementById("ciudad");
    const tipoSelect = document.getElementById("tipo");
    const precioSelect = document.getElementById("precio");
    const buscarBtn = document.getElementById("buscar");
    const resultadosDiv = document.getElementById("resultados");
  
    let propiedades = [];
  
    // Cargar JSON
    fetch("data-1.json")
      .then(response => response.json())
      .then(data => {
        propiedades = data;
        llenarFiltros(propiedades);
        mostrarResultados(propiedades); // Mostrar todos al inicio
      })
      .catch(error => console.error("Error al cargar el JSON:", error));
  
    // Llenar filtros sin duplicados
    function llenarFiltros(data) {
      const ciudades = new Set();
      const tipos = new Set();
  
      data.forEach(prop => {
        ciudades.add(prop.Ciudad);
        tipos.add(prop.Tipo);
      });
  
      ciudades.forEach(ciudad => {
        const option = document.createElement("option");
        option.value = ciudad;
        option.textContent = ciudad;
        ciudadSelect.appendChild(option);
      });
  
      tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo;
        option.textContent = tipo;
        tipoSelect.appendChild(option);
      });
    }
  
    // Filtrar resultados
    buscarBtn.addEventListener("click", () => {
      const ciudad = ciudadSelect.value;
      const tipo = tipoSelect.value;
      const precio = precioSelect.value; // "1000;2000"
  
      const [minPrecio, maxPrecio] = precio.split(";").map(p => parseInt(p));
  
      const filtrados = propiedades.filter(prop => {
        const precioProp = parseInt(prop.Precio.replace(/[$,]/g, ""));
        return (
          (ciudad === "" || prop.Ciudad === ciudad) &&
          (tipo === "" || prop.Tipo === tipo) &&
          (precio === "" || (precioProp >= minPrecio && precioProp <= maxPrecio))
        );
      });
  
      mostrarResultados(filtrados);
    });
  
    // Mostrar propiedades en el HTML
    function mostrarResultados(data) {
      resultadosDiv.innerHTML = "";
  
      if (data.length === 0) {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
  
      data.forEach(prop => {
        const card = document.createElement("div");
        card.className = "item";
        card.innerHTML = `
          <img src="img/home.jpg" alt="Propiedad">
          <div class="info">
            <h5>${prop.Direccion}</h5>
            <p><strong>Ciudad:</strong> ${prop.Ciudad}</p>
            <p><strong>Teléfono:</strong> ${prop.Telefono}</p>
            <p><strong>Código Postal:</strong> ${prop.Codigo_Postal}</p>
            <p><strong>Tipo:</strong> ${prop.Tipo}</p>
            <p><strong>Precio:</strong> <span class="precio">${prop.Precio}</span></p>
          </div>
        `;
        resultadosDiv.appendChild(card);
      });
    }
  });
  

