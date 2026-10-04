// =========================================================
// ECLIPSE ARCHIVE
// FRAGMENT 002
// =========================================================


const archive = EclipseArchive;


// Archivo cifrado

const ENCRYPTED_FILE =
    "../../data/archive/fragment-002.enc";


let encryptedFragment = null;


// =========================================================
// CARGAR ARCHIVO CIFRADO
// =========================================================

async function loadFragment() {

    try {

        encryptedFragment =
            await EclipseCrypto
                .loadEncryptedArchive(
                    ENCRYPTED_FILE
                );


        return true;

    }

    catch (error) {

        await archive.system(
            "ARCHIVE LOAD FAILURE."
        );


        return false;
    }
}


// =========================================================
// EJECUTAR SECUENCIA DESCIFRADA
// =========================================================

async function executeSequence(fragment) {

    if (
        !fragment ||
        !Array.isArray(fragment.sequence)
    ) {

        await archive.system(
            "INVALID ARCHIVE STRUCTURE."
        );

        return;
    }


    for (
        const instruction
        of fragment.sequence
    ) {

        switch (instruction.type) {


            // -------------------------
            // SYSTEM
            // -------------------------

            case "system":

                await archive.system(
                    instruction.text || ""
                );

                break;


            // -------------------------
            // TEXT
            // -------------------------

            case "text":

                await archive.print(

                    instruction.text || "",

                    "fragment",

                    instruction.delay ?? 12

                );

                break;


            // -------------------------
            // BLANK
            // -------------------------

            case "blank":

                archive.blank();

                break;

        }
    }
}


// =========================================================
// DESBLOQUEAR
// =========================================================

async function tryUnlock(password) {

    try {

        /*
            No comparamos hashes.

            Intentamos directamente descifrar
            el archivo utilizando la contraseña.
        */

        const fragment =
            await EclipseCrypto
                .decryptArchive(

                    encryptedFragment,

                    password

                );


        return fragment;

    }

    catch (error) {

        /*
            AES-GCM rechazará el contenido
            si la contraseña produce una
            clave incorrecta.
        */

        return null;
    }
}


// =========================================================
// PEDIR CLAVE
// =========================================================

function requestKeyInput() {

    const inputLine =
        archive.createLine("command");


    const prompt =
        document.createTextNode("> ");


    const input =
        document.createElement("input");


    input.type = "text";

    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;

    input.className =
        "archive-input";


    inputLine.appendChild(prompt);

    inputLine.appendChild(input);


    archive.cursor.style.display =
        "none";


    input.focus();


    input.addEventListener(
        "keydown",

        async event => {

            if (event.key !== "Enter") {
                return;
            }


            const password =
                input.value.trim();


            if (password === "") {
                return;
            }


            input.disabled = true;


            /*
                Dejamos visualmente escrita
                la clave introducida.
            */

            input.remove();


            inputLine.appendChild(

                document.createTextNode(
                    password
                )

            );


            archive.cursor.style.display =
                "";


            archive.output.appendChild(
                archive.cursor
            );


            archive.blank();


            await archive.system(
                "VERIFYING KEY..."
            );


            archive.blank();


            const fragment =
                await tryUnlock(
                    password
                );


            // -------------------------
            // CLAVE INCORRECTA
            // -------------------------

            if (!fragment) {

                await archive.system(
                    "KEY REJECTED."
                );


                archive.blank();


                await archive.wait(600);


                requestKeyInput();


                return;
            }


            // -------------------------
            // CLAVE CORRECTA
            // -------------------------

            await archive.system(
                "KEY ACCEPTED."
            );


            archive.blank();


            await archive.command(
                "decrypt archive"
            );


            archive.blank();


            await archive.system(
                "DECRYPTION COMPLETE."
            );


            await archive.system(
                "MOUNTING FRAGMENT..."
            );


            await archive.wait(700);


            archive.blank();


            await executeSequence(
                fragment
            );

        }
    );
}


// =========================================================
// INICIO
// =========================================================

async function startFragment002() {

    await archive.wait(500);


    await archive.system(
        "ECLIPSE ARCHIVE SYSTEM"
    );


    archive.blank();


    await archive.system(
        "FILE: FRAGMENT_002"
    );


    await archive.system(
        "STATUS: LOCKED"
    );


    archive.blank();


    /*
        Descargamos el archivo cifrado.

        Esto NO lo descifra.
    */

    const loaded =
        await loadFragment();


    if (!loaded) {
        return;
    }


    await archive.system(
        "ACCESS KEY REQUIRED"
    );


    archive.blank();


    requestKeyInput();
}


// =========================================================
// START
// =========================================================

startFragment002();