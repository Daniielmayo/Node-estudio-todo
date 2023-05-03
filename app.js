require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

const main = async () => {
    let opt = "";
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //cargar tareas

        tareas.tareasTareasFromArray(tareasDB);
    }

    do {
        //Imprimir el menu
        opt = await inquirerMenu();
        // console.log({ opt });

        switch (opt) {
            case "1": //crear opcion
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listdoCompleto();
                break;
            case "3": // listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case "4": // listar pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5": // completad | pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.togg1leCompletadas(ids);
                break;
            case "6": // Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar("¿ Esta seguro ?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== "0");
};

main();
