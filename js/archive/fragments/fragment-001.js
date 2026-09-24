// =========================================================
// ECLIPSE ARCHIVE
// FRAGMENT 001
// =========================================================


const archive = EclipseArchive;


// =========================================================
// BARRA DE PROGRESO
// =========================================================

async function progressBar() {

    const line =
        archive.createLine("system");

    const cursor =
        archive.cursor;


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


        line.textContent =
            `DECRYPTING [${filled}${empty}] ${percentage}%`;


        line.appendChild(cursor);

        archive.scroll();


        await archive.wait(
            120 + Math.random() * 130
        );
    }


    archive.output.appendChild(
        cursor
    );

    archive.scroll();
}


// =========================================================
// ANOMALÍA OBSERVE
// =========================================================

async function observeAnomaly() {

    await archive.print(
        "But looking and obs▓▓▓▓▓",
        "fragment",
        12
    );

    await archive.print(
        "are not the same thing.",
        "fragment",
        12
    );


    await archive.wait(900);


    await archive.system(
        "> unstable sector detected."
    );

    await archive.system(
        "> attempting reconstruction..."
    );


    archive.blank();

    await archive.wait(350);


    const recovery =
        archive.createLine("corrupted");

    const cursor =
        archive.cursor;


    recovery.appendChild(cursor);


    const reconstruction = [

        ["0x04A3  obs▓▓▓▓▓", 420],

        ["0x04A3  ob▓e▓▓▓", 300],

        ["0x04A3  ▓bser▓▓", 350],

        ["0x04A3  obse▓v▓", 380]

    ];


    for (
        const [text, duration]
        of reconstruction
    ) {

        recovery.textContent = text;

        recovery.appendChild(cursor);

        archive.scroll();

        await archive.wait(duration);
    }


    // -------------------------
    // OBSERVE RECUPERADO
    // -------------------------

    recovery.classList.remove(
        "corrupted"
    );


    recovery.textContent =
        "0x04A3  OBSERVE";


    recovery.appendChild(cursor);


    cursor.classList.add(
        "paused"
    );


    archive.scroll();


    await archive.wait(650);


    // -------------------------
    // PÉRDIDA DEL DATO
    // -------------------------

    cursor.classList.remove(
        "paused"
    );


    recovery.classList.add(
        "corrupted"
    );


    const degradation = [

        ["0x04A3  ob▓erv▓", 250],

        ["0x04A3  ▓▓serv▓", 220],

        ["0x04A3  ▓▓▓▓▓▓▓", 300]

    ];


    for (
        const [text, duration]
        of degradation
    ) {

        recovery.textContent = text;

        recovery.appendChild(cursor);

        archive.scroll();

        await archive.wait(duration);
    }


    archive.output.appendChild(
        cursor
    );


    recovery.classList.remove(
        "corrupted"
    );


    archive.blank();


    await archive.system(
        "> reconstruction unstable."
    );


    await archive.system(
        "> recovered data discarded."
    );
}


// =========================================================
// CONTENIDO DEL FRAGMENTO
// =========================================================

async function printFragment() {

    archive.blank();


    await archive.system(
        "[FRAGMENT_001]"
    );


    archive.blank();


    await archive.print(
        "Eclipse began with a simple idea:",
        "fragment",
        18
    );


    archive.blank();


    await archive.print(
        "Knowledge is not defined by how much",
        "fragment",
        12
    );

    await archive.print(
        "a person already knows,",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "but by what they are willing",
        "fragment",
        12
    );

    await archive.print(
        "to discover.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "We believe curiosity has value.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "That different minds can build",
        "fragment",
        12
    );

    await archive.print(
        "better things together.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "That an idea should be questioned,",
        "fragment",
        12
    );

    await archive.print(
        "tested and improved.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "And that knowledge becomes more valuable",
        "fragment",
        12
    );

    await archive.print(
        "when it is used to create.",
        "fragment",
        12
    );


    archive.blank();


    await archive.system(
        "[DATA CORRUPTED]"
    );


    await archive.wait(700);


    archive.blank();


    await archive.print(
        "We are not looking for everyone.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "Nor are we looking for those",
        "fragment",
        12
    );

    await archive.print(
        "who already have all the answers.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "We are looking for people willing",
        "fragment",
        12
    );

    await archive.print(
        "to search for them.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "If you found this fragment,",
        "fragment",
        12
    );

    await archive.print(
        "you have already done something",
        "fragment",
        12
    );

    await archive.print(
        "most people would not.",
        "fragment",
        12
    );


    archive.blank();


    await archive.print(
        "You looked beyond what was presented",
        "fragment",
        12
    );

    await archive.print(
        "to you.",
        "fragment",
        12
    );


    archive.blank();


    await observeAnomaly();


    archive.blank();


    await archive.print(
        "What you do with what you have found",
        "fragment",
        12
    );

    await archive.print(
        "is entirely your decision.",
        "fragment",
        12
    );


    archive.blank();


    await archive.system(
        "[END OF FRAGMENT]"
    );
}


// =========================================================
// SECUENCIA PRINCIPAL
// =========================================================

async function startFragment001() {

    await archive.wait(600);


    await archive.system(
        "ECLIPSE ARCHIVE SYSTEM"
    );


    archive.blank();


    await archive.command(
        "establish connection"
    );


    await archive.wait(300);


    await archive.system(
        "SOURCE: UNKNOWN"
    );

    await archive.system(
        "FILE: FRAGMENT_001"
    );

    await archive.system(
        "STATUS: ENCRYPTED"
    );


    archive.blank();


    await archive.command(
        "initialize decryption"
    );


    archive.blank();


    await progressBar();


    archive.blank();


    await archive.system(
        "BLOCK 0x04A1 ........ OK"
    );

    await archive.system(
        "BLOCK 0x04A2 ........ OK"
    );

    await archive.system(
        "BLOCK 0x04A3 ........ CORRUPTED"
    );

    await archive.system(
        "BLOCK 0x04A4 ........ OK"
    );

    await archive.system(
        "BLOCK 0x04A5 ........ OK"
    );


    archive.blank();


    await archive.command(
        "verify integrity"
    );


    archive.blank();


    await archive.system(
        "INTEGRITY: 91.4%"
    );

    await archive.system(
        "CORRUPTED SECTORS: 03"
    );


    archive.blank();


    await archive.command(
        "attempt recovery"
    );


    archive.blank();


    await archive.system(
        "SECTOR 0x04A3 ........ PARTIAL"
    );

    await archive.system(
        "SECTOR 0x0B51 ........ UNSTABLE"
    );

    await archive.system(
        "SECTOR 0x0F21 ........ LOST"
    );


    archive.blank();


    await archive.system(
        "WARNING: RECOVERY INCOMPLETE"
    );


    archive.blank();


    await archive.command(
        "mount fragment"
    );


    await archive.wait(500);


    await archive.system(
        "MOUNTED."
    );


    archive.blank();


    await archive.command(
        "cat fragment_001.log"
    );


    await archive.wait(800);


    await printFragment();


    archive.blank();


    await archive.command(
        "verify residual data"
    );


    await archive.wait(400);


    archive.blank();


    await archive.system(
        "7 bytes unresolved."
    );


    archive.blank();


    await archive.system(
        "> connection stable."
    );
}


// =========================================================
// INICIO
// =========================================================

startFragment001();