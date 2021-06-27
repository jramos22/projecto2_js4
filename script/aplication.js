import{ addTarea, contador, forms } from'./util.js';

const form = forms();


form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const tarea = new addTarea(form.elements[0].value, form.elements[1].value, false, contador(0));
    tarea.add();
    tarea.limpiaImput();
});