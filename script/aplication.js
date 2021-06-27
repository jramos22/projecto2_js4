import{ addTarea, contador } from'./util.js';
const form = document.getElementById('newwork');



form.addEventListener('submit', (event) =>{
    event.preventDefault();
    console.log(form.elements[0].value);
    const tarea = new addTarea(form.elements[0].value, form.elements[1].value, false, contador(0));
    tarea.add();
    tarea.limpiaImput();
});