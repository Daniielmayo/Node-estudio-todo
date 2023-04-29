const { v4: uuidv4 } = require("uuid");

class Tarea {
    id = "";
    desc = "";
    completadEn = null;

    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
        this.completadEn = null;
    }
}

module.exports = Tarea;
