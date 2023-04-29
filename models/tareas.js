const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    tareasTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listdoCompleto() {
        this.listadoArr.forEach((tarea, i) => {
            const indx = `${i + 1}.green`;
            const { desc, completadEn } = tarea;

            const estado = completadEn ? "Completado".green : "Pendiente".red;

            console.log(`${indx}  ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();

        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const { desc, completadEn } = tarea;
            const estado = completadEn ? "Completado ".green : "Pendiente".red;

            if (completadas) {
                if (completadEn) {
                    contador = +1;
                    console.log(
                        `${contador.toString().green}. ${desc} :: ${estado}`
                    );
                } else {
                    if (!completadEn) {
                        contador = +1;
                        console.log(
                            `${contador.toString().green} ${desc} :: ${estado}`
                        );
                    }
                }
            }
        });
    }
}

module.exports = Tareas;
