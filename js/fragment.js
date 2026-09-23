const output = document.getElementById("terminal-output");

let speedMultiplier = 1;


// -------------------------
// UTILIDADES
// -------------------------

function wait(ms) {

    return new Promise(resolve => {
        setTimeout(resolve, ms / speedMultiplier);
    });

}


const cursor = document.getElementById("cursor");

function createLine(className = "") {

    const line = document.createElement("div");

    line.className = `line ${className}`;

    output.insertBefore(line, cursor);

    return line;
}



function scrollTerminal() {

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}


// -------------------------
// IMPRIMIR TEXTO
// -------------------------

async function printLine(text = "", className = "", delay = 35) {

    const line = createLine(className);

    // Movemos el cursor a la línea que se está escribiendo
    line.appendChild(cursor);

    for (const character of text) {

        const charNode = document.createTextNode(character);

        line.insertBefore(charNode, cursor);

        scrollTerminal();

        await wait(delay);
    }

    // Al terminar, devolvemos el cursor al final del terminal
    output.appendChild(cursor);

    return line;
}


// Texto rápido
async function systemLine(text = "") {

    await printLine(text, "system", 8);

}


// Comando escrito por la máquina
async function command(text) {

    await printLine(`> ${text}`, "command", 45);

}


// Espacio vacío
function blank() {

    createLine();

}


// -------------------------
// BARRA DE PROGRESO
// -------------------------

async function progressBar() {

    const line = createLine("system");

    const blocks = 16;

    for (let i = 0; i <= blocks; i++) {

        const filled = "█".repeat(i);
        const empty = "░".repeat(blocks - i);

        const percentage = Math.round((i / blocks) * 100);

        line.textContent =
            `DECRYPTING [${filled}${empty}] ${percentage}%`;

        scrollTerminal();

        await wait(120 + Math.random() * 130);

    }

}


// -------------------------
// ANOMALÍA OBSERVE
// -------------------------

async function observeAnomaly() {

    const line = createLine("fragment");

    line.textContent = "But looking and obs▓▓▓▓▓";

    await wait(900);

    await systemLine("> unstable sector detected.");
    await systemLine("> attempting reconstruction...");

    blank();

    const recovery = createLine("corrupted");

    recovery.textContent = "obs▓▓▓▓▓";

    await wait(500);

    recovery.textContent = "obse▓▓▓";

    await wait(500);

    recovery.textContent = "OBSERVE";

    await wait(850);

    recovery.textContent = "obser▓▓";

    await wait(250);

    recovery.textContent = "observing";

    recovery.classList.remove("corrupted");

    blank();

    await systemLine("> reconstruction unstable.");
    await systemLine("> continuing...");

}


// -------------------------
// FRAGMENTO
// -------------------------

async function printFragment() {

    blank();

    await systemLine("[FRAGMENT_001]");

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

    await systemLine("[DATA CORRUPTED]");

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

    await printLine(
        "are not the same thing.",
        "fragment",
        12
    );

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

    await systemLine("[END OF FRAGMENT]");

}


// -------------------------
// SECUENCIA PRINCIPAL
// -------------------------

async function startSequence() {

    await wait(600);

    await systemLine("ECLIPSE ARCHIVE SYSTEM");

    blank();

    await command("establish connection");

    await wait(300);

    await systemLine("SOURCE: UNKNOWN");
    await systemLine("FILE: FRAGMENT_001");
    await systemLine("STATUS: ENCRYPTED");

    blank();

    await command("initialize decryption");

    blank();

    await progressBar();

    blank();

    await systemLine("BLOCK 0x04A1 ........ OK");
    await systemLine("BLOCK 0x04A2 ........ OK");
    await systemLine("BLOCK 0x04A3 ........ CORRUPTED");
    await systemLine("BLOCK 0x04A4 ........ OK");
    await systemLine("BLOCK 0x04A5 ........ OK");

    blank();

    await command("verify integrity");

    blank();

    await systemLine("INTEGRITY: 91.4%");
    await systemLine("CORRUPTED SECTORS: 03");

    blank();

    await command("attempt recovery");

    blank();

    await systemLine("SECTOR 0x04A3 ........ PARTIAL");
    await systemLine("SECTOR 0x0B51 ........ UNSTABLE");
    await systemLine("SECTOR 0x0F21 ........ LOST");

    blank();

    await systemLine("WARNING: RECOVERY INCOMPLETE");

    blank();

    await command("mount fragment");

    await wait(500);

    await systemLine("MOUNTED.");

    blank();

    await command("cat fragment_001.log");

    await wait(800);

    await printFragment();

    blank();

    await command("verify residual data");

    await wait(400);

    blank();

    await systemLine("7 bytes unresolved.");

    blank();

    await systemLine("> connection stable.");

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
document.addEventListener("keydown", accelerate);
document.addEventListener("keyup", normalSpeed);


// Android / táctil
document.addEventListener("touchstart", accelerate);
document.addEventListener("touchend", normalSpeed);


// -------------------------
// INICIO
// -------------------------

startSequence();