require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
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
            case "1":
                const desc = await leerInput("Descripción: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listdoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas();
                break;
            case "4":
                tareas.listarPendientesCompletadas();
                break;
        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== "0");
};

main();
