import{ getlista, getremove, forms} from './globals.js';

let tareas = [];

const datosLocalStorage = localStorage.getItem('tareas');

function contador(num){
    let contador = num + tareas.length;
    return contador;
}

function printAll(tareas) {
    for (let i = 0; i < tareas.length; i++) {
        printTarea(tareas[i]);
    }
}
function datosStorage(datos) {
    if (datos) {
        tareas = JSON.parse(datos);
    }
}

datosStorage(datosLocalStorage);

function printTarea (tarea, clase) {
    //lista
    const li = document.createElement('li');
    li.className = 'lista_li';
    //checkbox
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', `tarea-${tarea.contador}`);
    checkbox.setAttribute('class','float');
    checkbox.checked = tarea.complete;
    checkbox.dataset.taskId = tarea.contador;
    //icono de la clase de la tarea
    const icono = document.createElement('img');
    if (clase == 'study' || tarea.class == 'study') {
        icono.setAttribute('src', 'img/estudio.jpeg');
    }else if (clase == 'pets' || tarea.class == 'pets') {
        icono.setAttribute('src', 'img/mascotas.jpeg');
    }else if (clase == 'homework' || tarea.class == 'homework') {
        icono.setAttribute('src', 'img/tareas_de_la_casa.jpeg');
    }
    icono.className = 'icono float';
    //nombre de la Tarea
    let nameTarea = document.createElement('p');
    nameTarea.setAttribute('for', `tarea-${tarea.name}`);
    if (clase == 'study' || tarea.class == 'study') {
        nameTarea.className = 'blue float';
    }else if (clase == 'pets' || tarea.class == 'pets') {
        nameTarea.className = 'red float';
    } else if (clase == 'homework' || tarea.class == 'homework'){
        nameTarea.className = 'green float';  
    }
    nameTarea.innerHTML = `${tarea.name}`;
    //edita la tarea
    const editTarea = document.createElement('button');
    editTarea.className = 'edit';
    editTarea.setAttribute('id', `edit-${tarea.contador}`);
    editTarea.dataset.taskId = tarea.contador;
    editTarea.innerHTML = 'editar';
    //Clase de la tarea
    const classTarea = document.createElement('label');
    classTarea.innerHTML = `${tarea.class}`;
    //Tiempo
    const timeTarea = document.createElement('label');
    timeTarea.innerHTML = `${tarea.time}`;
    //Borrar
    const deleteTarea = document.createElement('button');
    deleteTarea.className = 'delete';
    deleteTarea.setAttribute('id', `delete-${tarea.contador}`);
    deleteTarea.dataset.taskId = tarea.contador;
    deleteTarea.innerHTML = 'Borrar';
    //agregar
    li.appendChild(checkbox);
    li.appendChild(icono);
    li.appendChild(nameTarea);
    li.appendChild(classTarea);
    li.appendChild(timeTarea);
    li.appendChild(editTarea);
    li.appendChild(deleteTarea);
    getlista().appendChild(li);
    // encargado de comprobar el checkbox
    checkbox.addEventListener('click', (event) => {
        const editname = event.currentTarget.parentNode.getElementsByTagName('p')[0].innerHTML;
        const editclass = event.currentTarget.parentNode.getElementsByTagName('label')[0].innerHTML;
        const editTime = event.currentTarget.parentNode.getElementsByTagName('label')[1].innerHTML;
        const checkcontador = event.currentTarget.dataset.taskId;
        if (checkbox.checked) {
            const tareacheked = {
                name: editname,
                complete: true,
                class: editclass,
                time: editTime,
                contador: checkcontador
            }
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].contador == checkcontador) {
                    tareas.splice(i, 1);
                    tareas.push(tareacheked)
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                }
            }
        }else if (!checkbox.checked) {
            const tareacheked = {
                name: editname,
                complete: false,
                class: editclass,
                time: editTime,
                contador: checkcontador
            }
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].contador == checkcontador) {
                    tareas.splice(i, 1);
                    tareas.push(tareacheked)
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                }
            }
        }
    });
    // encargado de la edicion y guardado de la tarea actualizada
    editTarea.addEventListener('click', (event) =>{
        nameTarea.setAttribute('contentEditable', 'true');
        const editname = event.currentTarget.parentNode.getElementsByTagName('p')[0].innerHTML;
        const editclass = event.currentTarget.parentNode.getElementsByTagName('label')[0].innerHTML;
        let editstatus = event.currentTarget.parentNode.getElementsByTagName('checkbox');
        const editTime = event.currentTarget.parentNode.getElementsByTagName('label')[1].innerHTML;
        const editcontador = event.currentTarget.dataset.taskId;
        if (editstatus.checked) {
            editstatus = true;
        }else{
            editstatus = false
        }
        const tareaEditata = {
            name: editname,
            complete: editstatus,
            class: editclass,
            time: editTime,
            contador: editcontador
        }
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].contador == editcontador) {
                tareas.splice(i, 1);
                tareas.push(tareaEditata)
                localStorage.setItem('tareas', JSON.stringify(tareas));
            }
        }
    });
    // encargado de borrar solo una tarea
    deleteTarea.addEventListener('click', (event) =>{
        const deleteid = event.currentTarget.dataset.taskId;

        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].contador == deleteid) {
                tareas.splice(i, 1);
                localStorage.setItem('tareas', JSON.stringify(tareas));
                li.remove();
            }
        }
    });
    //remueve todas las tareas checked
    getremove().addEventListener('click', (event) =>{
        if(checkbox.checked){
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].complete == true) {
                    tareas.splice(i, 1);
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                    li.remove();
                }
            }
        }
    });
}
// imprime todas las tareas
printAll(tareas);

// se cra nuevo objeto
class addTarea {
    constructor(nombreTarea, clase, completoTarea, cont){
        this.name = nombreTarea;
        this.class = clase;
        this.completoTarea = completoTarea;
        this.contador = cont;
    }
    //limpiar el form
    limpiaImput() {
        forms().elements[0].value = '';
    }
    //obtiene la informacion para llamar a la funcion que va a
    //crear la nueva tarea
    add(){
        const tiempo = 0;
        if (this.class == 'study') {
            this.class = 'study'
        }else if (this.class == 'pets') {
            this.class = 'pets';
        } else {
            this.class = 'homework';
        }
        const nuevaTarea ={
            name: this.name,
            complete: this.completoTarea,
            class: this.class,
            time: tiempo,
            contador: this.contador
        }
        tareas.push(nuevaTarea);
        
        printTarea(nuevaTarea, this.class);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        
    }
}


export {
    addTarea,
    contador,
    forms
}