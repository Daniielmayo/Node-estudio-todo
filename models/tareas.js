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

    borrarTarea(id = "") {
        if (this._listado[id]) {
            delete this._listado[id];
        }
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
            const estado = completadEn ? "Completada".green : "Pendiente".red;
            if (completadas) {
                // mostrar completadas
                if (completadEn) {
                    contador += 1;
                    console.log(
                        `${(contador + ".").green} ${desc} :: ${
                            completadEn.green
                        }`
                    );
                }
            } else {
                // mostrar pendientes
                if (!completadEn) {
                    contador += 1;
                    console.log(
                        `${(contador + ".").green} ${desc} :: ${estado}`
                    );
                }
            }
        });
    }

    togg1leCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];
            if (!tarea.completadEn) {
                tarea.completadEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadEn = null;
            }
        });
    }
}

module.exports = Tareas;
