let tareas = [];

const lista = document.getElementById('lista');
const form = document.getElementById('newwork');
const removeall = document.getElementById('remove'); 

const datosLocalStorage = localStorage.getItem('tareas');

function contador(num){
    let contador = num + tareas.length;
    return contador;
}

if (datosLocalStorage) {
    tareas = JSON.parse(datosLocalStorage);
}

console.log(tareas);
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
    lista.appendChild(li);

    checkbox.addEventListener('click', (event) => {
        const editname = event.currentTarget.parentNode.getElementsByTagName('p')[0].innerHTML;
        const editclass = event.currentTarget.parentNode.getElementsByTagName('label')[0].innerHTML;
        const editTime = event.currentTarget.parentNode.getElementsByTagName('label')[1].innerHTML;
        const editcontador = event.currentTarget.dataset.taskId;
        if (checkbox.checked) {
            const tareacheked = {
                name: editname,
                complete: true,
                class: editclass,
                time: editTime,
                contador: editcontador
            }
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].contador == editcontador) {
                    tareas.splice(i, 1);
                    tareas.push(tareacheked)
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                    console.log(tareas);
                }
            }
        }else if (!checkbox.checked) {
            const tareacheked = {
                name: editname,
                complete: false,
                class: editclass,
                time: editTime,
                contador: editcontador
            }
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].contador == editcontador) {
                    tareas.splice(i, 1);
                    tareas.push(tareacheked)
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                    console.log(tareas);
                }
            }
        }
    });

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
                console.log(tareas);
            }
        }
        console.log(editcontador);
    });

    deleteTarea.addEventListener('click', (event) =>{
        const deleteid = event.currentTarget.dataset.taskId;

        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].contador == deleteid) {
                tareas.splice(i, 1);
                localStorage.setItem('tareas', JSON.stringify(tareas));
                console.log(tareas);
                li.remove();
            }
        }
    });

    removeall.addEventListener('click', (event) =>{
        if(checkbox.checked){
            for (let i = 0; i < tareas.length; i++) {
                if (tareas[i].complete == true) {
                    tareas.splice(i, 1);
                    localStorage.setItem('tareas', JSON.stringify(tareas));
                    console.log(tareas);
                    li.remove();
                }
            }
        }
    });
}

for (let i = 0; i < tareas.length; i++) {
    console.log(tareas[i]);
    printTarea(tareas[i]);
}

class addTarea {
    constructor(nombreTarea, clase, completoTarea, cont){
        this.name = nombreTarea;
        this.class = clase;
        this.completoTarea = completoTarea;
        this.contador = cont;
    }
    limpiaImput() {
        form.elements[0].value = '';
    }
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
}