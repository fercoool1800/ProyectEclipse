// =========================================================
// ECLIPSE ARCHIVE ENGINE
// =========================================================
//
// Motor común para los archivos del sistema Eclipse.
//
// Este archivo controla:
//
// - Escritura de texto
// - Cursor
// - Scroll automático
// - Velocidad
// - Aceleración
// - Líneas del sistema
// - Comandos
// - Espaciado
//
// NO contiene la historia de ningún fragmento específico.
// =========================================================


const EclipseArchive = (() => {

    // -------------------------
    // ELEMENTOS DEL TERMINAL
    // -------------------------

    const output =
        document.getElementById("terminal-output");

    const cursor =
        document.getElementById("cursor");


    // -------------------------
    // ESTADO
    // -------------------------

    let speedMultiplier = 1;


    // -------------------------
    // ESPERA
    // -------------------------

    function wait(ms) {

        return new Promise(resolve => {

            setTimeout(
                resolve,
                ms / speedMultiplier
            );

        });
    }


    // -------------------------
    // CREAR LÍNEA
    // -------------------------

    function createLine(className = "") {

        const line =
            document.createElement("div");

        line.className =
            `line ${className}`;

        output.insertBefore(
            line,
            cursor
        );

        return line;
    }


    // -------------------------
    // SCROLL AUTOMÁTICO
    // -------------------------

    function scroll() {

        if (!cursor) return;


        const rect =
            cursor.getBoundingClientRect();


        const bottomMargin =
            window.innerWidth <= 600
                ? 110
                : 80;


        const limit =
            window.innerHeight -
            bottomMargin;


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

    async function print(
        text = "",
        className = "",
        delay = 35
    ) {

        const line =
            createLine(className);


        // Cursor dentro de la línea activa

        line.appendChild(cursor);


        for (const character of text) {

            const charNode =
                document.createTextNode(
                    character
                );


            line.insertBefore(
                charNode,
                cursor
            );


            scroll();

            await wait(delay);
        }


        // Cursor vuelve al final

        output.appendChild(cursor);

        scroll();


        return line;
    }


    // -------------------------
    // TEXTO DEL SISTEMA
    // -------------------------

    async function system(text = "") {

        return print(
            text,
            "system",
            8
        );
    }


    // -------------------------
    // COMANDO
    // -------------------------

    async function command(text) {

        return print(
            `> ${text}`,
            "command",
            45
        );
    }


    // -------------------------
    // LÍNEA VACÍA
    // -------------------------

    function blank() {

        createLine();

        scroll();
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


    // Recalcular scroll si cambia
    // el tamaño de la pantalla

    window.addEventListener(
        "resize",
        scroll
    );


    // =====================================================
    // API PÚBLICA
    // =====================================================

    return {

        wait,
        createLine,
        scroll,

        print,
        system,
        command,
        blank,

        output,
        cursor

    };

})();