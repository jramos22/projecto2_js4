function getarray() {
    let tareas = [];
    return tareas;
}


function getlista() {
    const lista = document.getElementById('lista');
    return lista;
}
function getform() {
    const form = document.getElementById('newwork');
    return form;
}
function getremove() {
    const removeall = document.getElementById('remove');
    return removeall;
}

function localestorage(tareas) {
    const datosLocalStorage = localStorage.getItem('tareas');
    if (datosLocalStorage) {
        tareas = JSON.parse(datosLocalStorage);
    }
    return tareas;
}


function contador(num, tareas) {
    let contador = num + tareas.length;
    return contador;
}

function print(tareas) {
    let tarea = tareas;
    for (let i = 0; i < tarea.length; i++) {
        console.log(tarea[i]);
        printTarea(tarea[i]);
    }
}

export {
    getarray,
    getlista,
    getform,
    getremove,
    localestorage,
    contador,
    print
}
