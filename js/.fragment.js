const output = document.getElementById("terminal-output");
const cursor = document.getElementById("cursor");

let speedMultiplier = 1;


// -------------------------
// UTILIDADES
// -------------------------

function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms / speedMultiplier);
    });

}


function createLine(className = "") {

    const line = document.createElement("div");

    line.className = `line ${className}`;

    output.insertBefore(line, cursor);

    return line;
}


// -------------------------
// SEGUIMIENTO DEL CURSOR
// -------------------------

function scrollTerminal() {

    if (!cursor) return;

    const rect = cursor.getBoundingClientRect();

    /*
        En móvil dejamos más espacio debajo
        para las barras del navegador y para
        que la línea activa respire.
    */

    const bottomMargin =
        window.innerWidth <= 600 ? 110 : 80;

    /*
        Esta es nuestra "línea invisible".

        El cursor puede moverse libremente
        hasta llegar aquí.
    */

    const limit =
        window.innerHeight - bottomMargin;


    /*
        Si el cursor intenta bajar del límite,
        desplazamos exactamente la diferencia.

        No usamos smooth porque la animación
        de scroll quedaría retrasada respecto
        a la escritura.
    */

    if (rect.bottom > limit) {

        const difference =
            rect.bottom - limit;

        window.scrollBy({
            top: difference,
            behavior: "auto"
        });

    }
}


// -------------------------
// IMPRIMIR TEXTO
// -------------------------

async function printLine(
    text = "",
    className = "",
    delay = 35
) {

    const line = createLine(className);


    /*
        El cursor entra en la línea que
        estamos escribiendo.
    */

    line.appendChild(cursor);


    for (const character of text) {

        const charNode =
            document.createTextNode(character);

        line.insertBefore(
            charNode,
            cursor
        );


        /*
            Después de cada carácter
            comprobamos la posición real
            del cursor.

            Esto también funciona si una
            línea hace wrap en Android.
        */

        scrollTerminal();

        await wait(delay);
    }


    /*
        Terminada la línea, devolvemos
        el cursor al final del terminal.
    */

    output.appendChild(cursor);

    scrollTerminal();

    return line;
}


// -------------------------
// TEXTO DEL SISTEMA
// -------------------------

async function systemLine(text = "") {

    await printLine(
        text,
        "system",
        8
    );

}


// -------------------------
// COMANDOS
// -------------------------

async function command(text) {

    await printLine(
        `> ${text}`,
        "command",
        45
    );

}


// -------------------------
// ESPACIO VACÍO
// -------------------------

function blank() {

    createLine();

    scrollTerminal();
}


// -------------------------
// BARRA DE PROGRESO
// -------------------------

async function progressBar() {

    const line =
        createLine("system");

    /*
        Mientras cambia la barra,
        ponemos el cursor dentro de
        esa misma línea.
    */

    line.appendChild(cursor);

    const blocks = 16;


    for (let i = 0; i <= blocks; i++) {

        const filled =
            "█".repeat(i);

        const empty =
            "░".repeat(blocks - i);

        const percentage =
            Math.round(
                (i / blocks) * 100
            );


        /*
            Como textContent borraría
            también el cursor, primero
            escribimos el contenido y
            después volvemos a añadirlo.
        */

        line.textContent =
            `DECRYPTING [${filled}${empty}] ${percentage}%`;

        line.appendChild(cursor);

        scrollTerminal();

        await wait(
            120 + Math.random() * 130
        );
    }


    output.appendChild(cursor);

    scrollTerminal();
}


// -------------------------
// ANOMALÍA OBSERVE
// -------------------------

async function observeAnomaly() {

    // -------------------------
    // FRASE CORRUPTA
    // -------------------------

    await printLine(
        "But looking and obs▓▓▓▓▓",
        "fragment",
        12
    );

    await printLine(
        "are not the same thing.",
        "fragment",
        12
    );

    await wait(900);


    // -------------------------
    // DETECCIÓN DEL SECTOR
    // -------------------------

    await systemLine(
        "> unstable sector detected."
    );

    await systemLine(
        "> attempting reconstruction..."
    );

    blank();

    await wait(350);


    // -------------------------
    // RECONSTRUCCIÓN
    // -------------------------

    const recovery =
        createLine("corrupted");

    recovery.appendChild(cursor);


    const reconstruction = [
        ["0x04A3  obs▓▓▓▓▓", 420],
        ["0x04A3  ob▓e▓▓▓", 300],
        ["0x04A3  ▓bser▓▓", 350],
        ["0x04A3  obse▓v▓", 380]
    ];


    for (const [text, duration] of reconstruction) {

        recovery.textContent = text;

        recovery.appendChild(cursor);

        scrollTerminal();

        await wait(duration);
    }


    // -------------------------
    // DATO RECUPERADO
    // -------------------------

    recovery.classList.remove(
        "corrupted"
    );

    recovery.textContent =
        "0x04A3  OBSERVE";

    recovery.appendChild(cursor);


    /*
        El cursor deja de parpadear.

        Durante un instante todo queda
        completamente estable.
    */

    cursor.classList.add("paused");

    scrollTerminal();

    await wait(650);


    // -------------------------
    // EL DATO VUELVE A DEGRADARSE
    // -------------------------

    cursor.classList.remove("paused");

    recovery.classList.add(
        "corrupted"
    );


    recovery.textContent =
        "0x04A3  ob▓erv▓";

    recovery.appendChild(cursor);

    scrollTerminal();

    await wait(250);


    recovery.textContent =
        "0x04A3  ▓▓serv▓";

    recovery.appendChild(cursor);

    scrollTerminal();

    await wait(220);


    recovery.textContent =
        "0x04A3  ▓▓▓▓▓▓▓";

    recovery.appendChild(cursor);

    scrollTerminal();

    await wait(300);


    // -------------------------
    // FIN DE RECONSTRUCCIÓN
    // -------------------------

    output.appendChild(cursor);

    recovery.classList.remove(
        "corrupted"
    );

    blank();


    await systemLine(
        "> reconstruction unstable."
    );

    await systemLine(
        "> recovered data discarded."
    );

}

// -------------------------
// FRAGMENTO
// -------------------------

async function printFragment() {

    blank();

    await systemLine(
        "[FRAGMENT_001]"
    );

    blank();


    await printLine(
        "Eclipse began with a simple idea:",
        "fragment",
        18
    );


    blank();


    await printLine(
        "Knowledge is not defined by how much",
        "fragment",
        12
    );

    await printLine(
        "a person already knows,",
        "fragment",
        12
    );


    blank();


    await printLine(
        "but by what they are willing",
        "fragment",
        12
    );

    await printLine(
        "to discover.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "We believe curiosity has value.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "That different minds can build",
        "fragment",
        12
    );

    await printLine(
        "better things together.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "That an idea should be questioned,",
        "fragment",
        12
    );

    await printLine(
        "tested and improved.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "And that knowledge becomes more valuable",
        "fragment",
        12
    );

    await printLine(
        "when it is used to create.",
        "fragment",
        12
    );


    blank();


    await systemLine(
        "[DATA CORRUPTED]"
    );


    await wait(700);


    blank();


    await printLine(
        "We are not looking for everyone.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "Nor are we looking for those",
        "fragment",
        12
    );

    await printLine(
        "who already have all the answers.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "We are looking for people willing",
        "fragment",
        12
    );

    await printLine(
        "to search for them.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "If you found this fragment,",
        "fragment",
        12
    );

    await printLine(
        "you have already done something",
        "fragment",
        12
    );

    await printLine(
        "most people would not.",
        "fragment",
        12
    );


    blank();


    await printLine(
        "You looked beyond what was presented",
        "fragment",
        12
    );

    await printLine(
        "to you.",
        "fragment",
        12
    );


    blank();


    await observeAnomaly();



    blank();


    await printLine(
        "What you do with what you have found",
        "fragment",
        12
    );

    await printLine(
        "is entirely your decision.",
        "fragment",
        12
    );


    blank();


    await systemLine(
        "[END OF FRAGMENT]"
    );

}


// -------------------------
// SECUENCIA PRINCIPAL
// -------------------------

async function startSequence() {

    await wait(600);


    await systemLine(
        "ECLIPSE ARCHIVE SYSTEM"
    );


    blank();


    await command(
        "establish connection"
    );


    await wait(300);


    await systemLine(
        "SOURCE: UNKNOWN"
    );

    await systemLine(
        "FILE: FRAGMENT_001"
    );

    await systemLine(
        "STATUS: ENCRYPTED"
    );


    blank();


    await command(
        "initialize decryption"
    );


    blank();


    await progressBar();


    blank();


    await systemLine(
        "BLOCK 0x04A1 ........ OK"
    );

    await systemLine(
        "BLOCK 0x04A2 ........ OK"
    );

    await systemLine(
        "BLOCK 0x04A3 ........ CORRUPTED"
    );

    await systemLine(
        "BLOCK 0x04A4 ........ OK"
    );

    await systemLine(
        "BLOCK 0x04A5 ........ OK"
    );


    blank();


    await command(
        "verify integrity"
    );


    blank();


    await systemLine(
        "INTEGRITY: 91.4%"
    );

    await systemLine(
        "CORRUPTED SECTORS: 03"
    );


    blank();


    await command(
        "attempt recovery"
    );


    blank();


    await systemLine(
        "SECTOR 0x04A3 ........ PARTIAL"
    );

    await systemLine(
        "SECTOR 0x0B51 ........ UNSTABLE"
    );

    await systemLine(
        "SECTOR 0x0F21 ........ LOST"
    );


    blank();


    await systemLine(
        "WARNING: RECOVERY INCOMPLETE"
    );


    blank();


    await command(
        "mount fragment"
    );


    await wait(500);


    await systemLine(
        "MOUNTED."
    );


    blank();


    await command(
        "cat fragment_001.log"
    );


    await wait(800);


    await printFragment();


    blank();


    await command(
        "verify residual data"
    );


    await wait(400);


    blank();


    await systemLine(
        "7 bytes unresolved."
    );


    blank();


    await systemLine(
        "> connection stable."
    );

}


// -------------------------
// ACELERACIÓN
// -------------------------

function accelerate() {

    speedMultiplier = 3;

}


function normalSpeed() {

    speedMultiplier = 1;

}


// PC

document.addEventListener(
    "keydown",
    accelerate
);

document.addEventListener(
    "keyup",
    normalSpeed
);


// Android / táctil

document.addEventListener(
    "touchstart",
    accelerate
);

document.addEventListener(
    "touchend",
    normalSpeed
);

document.addEventListener(
    "touchcancel",
    normalSpeed
);


// -------------------------
// CAMBIO DE TAMAÑO
// -------------------------

window.addEventListener(
    "resize",
    scrollTerminal
);


// -------------------------
// INICIO
// -------------------------

startSequence();