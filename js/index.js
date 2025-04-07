$(document).ready(function () {
  // Inicializar Materialize y el rango de precios
  $('select').formSelect();
  const slider = $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: true,
    min: 0,
    max: 1000000,
    from: 0,
    to: 1000000,
    prefix: "$"
  }).data("ionRangeSlider");

  // Cargar ciudades y tipos desde PHP
  $.getJSON("cargarOpciones.php", function (data) {
    data.ciudades.forEach(ciudad => {
      $('#selectCiudad').append(`<option value="${ciudad}">${ciudad}</option>`);
    });
    data.tipos.forEach(tipo => {
      $('#selectTipo').append(`<option value="${tipo}">${tipo}</option>`);
    });
    $('select').formSelect();
  });

  // Enviar el formulario por AJAX
  $('#formulario').submit(function (e) {
    e.preventDefault(); // Evita recargar

    const ciudad = $('#selectCiudad').val();
    const tipo = $('#selectTipo').val();
    const precio = $('#rangoPrecio').val();

    $.ajax({
      url: 'buscador.php',
      method: 'POST',
      data: { ciudad, tipo, precio },
      success: function (response) {
        $('#resultados').html(response);
      }
    });
  });

  // Botón "Mostrar Todos"
  $('#mostrarTodos').click(function () {
    $('#selectCiudad').val('');
    $('#selectTipo').val('');
    slider.update({ from: 0, to: 1000000 });
    $('select').formSelect();
    setTimeout(() => $('#formulario').submit(), 100);
  });






  
});
