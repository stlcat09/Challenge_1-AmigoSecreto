// Referencias al DOM
var input = document.getElementById('amigo');
var listaUl = document.getElementById('listaAmigos');
var resultadoUl = document.getElementById('resultado');

// Estado
var amigos = [];
var usados = []; 

// Lista de amigos
function renderLista() {
  listaUl.innerHTML = '';
  for (var i = 0; i < amigos.length; i++) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(amigos[i] + ' '));

    var btn = document.createElement('button');
    btn.innerHTML = 'Eliminar';

    btn.onclick = (function(index) {
      return function() { eliminarAmigo(index); };
    })(i);

    li.appendChild(btn);
    listaUl.appendChild(li);
  }
}

// Resultado
function mostrarResultado(texto) {
  resultadoUl.innerHTML = '';
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(texto));
  resultadoUl.appendChild(li);
}

// Agregar un nombre a la lista
function agregarAmigo() {
  var nombre = input.value;

  // limpiar espacios al inicio/fin
  if (nombre) {
    nombre = nombre.replace(/^\s+|\s+$/g, '');
  }

  if (!nombre) {
    mostrarResultado('Escribe un nombre válido.');
    input.focus();
    return;
  }

  // Evitar duplicados 
  var existe = false;
  for (var i = 0; i < amigos.length; i++) {
    if (amigos[i].toLowerCase() === nombre.toLowerCase()) {
      existe = true;
      break;
    }
  }
  if (existe) {
    mostrarResultado('Ese nombre ya está en la lista.');
    input.select();
    return;
  }

  amigos.push(nombre);
  input.value = '';
  mostrarResultado('');
  renderLista();
  input.focus();
}

// Eliminar un amigo por índice
function eliminarAmigo(index) {
  var borrado = amigos[index];
  amigos.splice(index, 1);

  // si estaba en usados, se saca
  var nuevosUsados = [];
  for (var i = 0; i < usados.length; i++) {
    if (usados[i] !== borrado) {
      nuevosUsados.push(usados[i]);
    }
  }
  usados = nuevosUsados;

  renderLista();
  mostrarResultado('');
}

// Sortear un nombre sin repetir 
function sortearAmigo() {
  if (amigos.length < 2) {
    mostrarResultado('Necesitas al menos 2 nombres para sortear.');
    return;
  }

  // Si ya salieron todos, reiniciamos
  if (usados.length === amigos.length) {
    usados = [];
  }

  // Elegir un nombre que no haya salido
  var elegido = null;
  var intentos = 0;
  while (elegido === null && intentos < 1000) {
    var idx = Math.floor(Math.random() * amigos.length);
    var candidato = amigos[idx];

    var yaSalio = false;
    for (var i = 0; i < usados.length; i++) {
      if (usados[i] === candidato) {
        yaSalio = true;
        break;
      }
    }

    if (!yaSalio) {
      elegido = candidato;
    }
    intentos++;
  }

  if (elegido === null) {
    mostrarResultado('No se pudo sortear. Intenta de nuevo.');
    return;
  }

  usados.push(elegido);
  mostrarResultado('🎁 Tu amigo secreto es: ' + elegido);
}

window.agregarAmigo = agregarAmigo;
window.sortearAmigo = sortearAmigo;


renderLista();
