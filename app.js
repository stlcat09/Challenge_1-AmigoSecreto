var input = document.getElementById('amigo');
var resultadoUl = document.getElementById('resultado');

var amigos = [];

// Mostrar el resultado en pantalla
function mostrarResultado(texto) {
  resultadoUl.innerHTML = '';
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(texto));
  resultadoUl.appendChild(li);
}

// Agregar un nombre
function agregarAmigo() {
  var nombre = input.value;
  if (nombre) nombre = nombre.trim();

  if (!nombre) {
    mostrarResultado('Escribe un nombre válido.');
    input.focus();
    return;
  }

  // evitar duplicados
  for (var i = 0; i < amigos.length; i++) {
    if (amigos[i].toLowerCase() === nombre.toLowerCase()) {
      mostrarResultado('Ese nombre ya está en la lista.');
      input.select();
      return;
    }
  }

  amigos.push(nombre);
  input.value = '';
  mostrarResultado('Nombre agregado.');
  input.focus();
}

// Sortear y eliminar el elegido
function sortearAmigo() {
  if (amigos.length < 2) {
    mostrarResultado('Necesitas al menos 2 nombres para sortear.');
    return;
  }

  var idx = Math.floor(Math.random() * amigos.length);
  var elegido = amigos[idx];

  mostrarResultado('🎁 Tu amigo secreto es: ' + elegido);

  // quitar de la lista para no repetir
  amigos.splice(idx, 1);
}

// Conectar con los botones del HTML
window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;

