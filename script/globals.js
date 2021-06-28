let course;

function timer (){
    const timeEnd = new Date ();
    return timeEnd
}
function getlista() {
    const lista = document.getElementById('lista');
    return lista;
}
function forms() {
    return document.getElementById('newwork');
}

function getremove() {
    const removeall = document.getElementById('remove');
    return removeall;
}
function newpush(comparador, checked, tareas) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].contador == comparador) {
            tareas.splice(i, 1);
            tareas.push(checked)
            localStorage.setItem('tareas', JSON.stringify(tareas));
        }
    }
}

function tareaTime(time) {
    course = timer().getTime() - time;
    let segs = Math.floor((course / 1000) % 60);
    let mins = Math.floor((course / (1000 * 60)) % 60);
    let hrs = Math.floor((course / (1000 * 60 * 60)) % 24);
    if (course < 60000) {
        return `hace ${segs} seg`;
    } else if (course >= 60000 & course <= 3599999) {
        return `hace ${mins} mins y ${segs} segs`;
    } else if (course >= 3600000) {
        return `hace ${hrs} hr y ${mins} min`;
    }
}

export {
    getlista,
    forms,
    getremove,
    newpush,
    tareaTime,
    timer
}
