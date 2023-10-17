const fs = require('fs');

function Usuario(nombre, correoElectronico) {
  this.nombre = nombre;
  this.correoElectronico = correoElectronico;
}

Usuario.prototype.registrar = function() {
  const usuario = {
    nombre: this.nombre,
    correoElectronico: this.correoElectronico
  };

  fs.readFile('usuarios.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        data = '[]';
      } else {
        console.error(err);
        return;
      }
    }

    const usuarios = JSON.parse(data);
    usuarios.push(usuario);

    fs.writeFile('usuarios.json', JSON.stringify(usuarios), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Usuario registrado con éxito.');
    });
  });
};

function listarUsuarios() {
  fs.readFile('usuarios.json', 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('No hay usuarios registrados.');
        return;
      } else {
        console.error(err);
        return;
      }
    }

    const usuarios = JSON.parse(data);

    if (usuarios.length === 0) {
      console.log('No hay usuariosados.');
    } else {
      console.log('Lista de usuarios registrados:');
      usuarios.forEach((usuario, index) => {
        console.log(`${index + 1}. Nombre: ${usuario.nombre}, Correo electrónico: ${usuario.correoElectronico}`);
      });
    }
  });
}

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Uso: node registroUsuarios.js <nombre> <correoElectrónico>');
  return;
}

const usuario = new Usuario(args[0], args[1]);
usuario.registrar();

listarUsuarios();