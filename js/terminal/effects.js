
const EclipseEffects = (() => {

    // ================================================
    // DEPENDENCIES
    // ================================================

    const terminal = EclipseTerminal;

    // ================================================
    // CONFIGURATION
    // ================================================

    const config = {
        corruptionSymbol: "▓",
        frameDelay: 90,
        anomalyMinDelay: 200,
        anomalyMaxDelay: 300
    };

    // ================================================
    // UTILITIES
    // ================================================

    const wait = ms => terminal.wait(ms);

    const setLine = (line, text) => {
        terminal.replaceLine(line, text);
    };

    function random(min, max) {
        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    // ================================================
    // GENERIC CORRUPTION
    // ================================================

    function corrupt(text, probability = 0.5) {

        const chance = Math.max(
            0,
            Math.min(1, probability)
        );

        return Array.from(String(text))
            .map(character => {

                if (character === " ") {
                    return character;
                }

                return Math.random() < chance
                    ? config.corruptionSymbol
                    : character;
            })
            .join("");
    }

    // ================================================
    // FLICKER
    // ================================================

    async function flicker(
        line,
        frames,
        delay = config.frameDelay
    ) {

        if (!Array.isArray(frames)) return;

        for (const frame of frames) {
            setLine(line, frame);
            await wait(delay);
        }
    }

    // ================================================
    // RECONSTRUCTION
    // ================================================

    async function reconstruct(
        line,
        target,
        options = {}
    ) {

        const {
            steps = 12,
            delay = 100,
            corruption = 0.75,
            hold = 600,
            decay = false
        } = options;

        const text = String(target);

        const count = Math.max(
            1,
            Math.floor(steps)
        );

        setLine(
            line,
            corrupt(text, corruption)
        );

        await wait(delay);

        for (let i = 1; i <= count; i++) {

            const probability =
                corruption * (1 - i / count);

            setLine(
                line,
                corrupt(text, probability)
            );

            await wait(delay);
        }

        setLine(line, text);

        await wait(hold);

        if (decay) {

            for (let i = 1; i <= count; i++) {

                setLine(
                    line,
                    corrupt(text, i / count)
                );

                await wait(delay);
            }
        }
    }

    // ================================================
    // GLITCH
    // ================================================

    async function glitch(
        line,
        text,
        options = {}
    ) {

        if (!line) return;

        const {
            frames = 8,
            delay = 80,
            intensity = 0.5,
            restore = true
        } = options;

        const original = line.textContent;

        for (let i = 0; i < frames; i++) {

            const probability = Math.min(
                1,
                intensity * (0.5 + Math.random())
            );

            setLine(
                line,
                corrupt(text, probability)
            );

            await wait(
                Math.max(
                    0,
                    delay + random(-20, 20)
                )
            );
        }

        if (restore) {
            setLine(line, original);
        }
    }

    // ================================================
    // ANOMALY STATE
    // ================================================

    let anomalyTimer = null;
    let anomalyLine = null;

    // ================================================
    // ANOMALY FRAMES
    // ================================================

    const anomalyFrames = [

        // Partial corruption
        "O▓S▓R▓E",
        "OB▓▓RV▓",
        "▓B▓E▓V▓",
        "O▓▓ER▓▓",
        "▓▓SE▓▓E",
        "O▓S▓▓VE",
        "OB▓▓RVE",
        "O▓SE▓▓E",
        "▓B▓E▓▓▓",
        "O▓▓▓R▓▓",

        // Incorrect numeric readings
        "0B▓E▓V▓",
        "O▓S3R▓E",
        "▓8SE▓▓E",
        "OB▓3RV▓",
        "O▓5▓R▓E",
        "0▓S▓R▓3",
        "O8▓E▓V▓",
        "▓B5E▓▓E",
        "O▓S▓RV3",
        "0B▓▓RV▓",

        // Special characters
        "O▓S#R▓E",
        "▓B▓E%V▓",
        "O!▓E▓V▓",

        // Severe corruption
        "▓▓▓E▓▓▓",
        "O▓▓▓▓▓E",
        "▓B▓▓▓V▓",
        "▓▓S▓R▓▓",
        "▓▓▓▓RV▓",
        "▓▓▓▓▓▓▓"
    ];

    // Occasional diagnostic messages
    const diagnosticFrames = [
        "BAD DATA",
        "RETRYING",
        "ERROR"
    ];


    // ================================================
    // RANDOM FRAME SELECTION
    // ================================================

    let previousFrame = "";

    function getRandomFrame() {

        // 15% diagnostic messages
        // 85% corrupted data

        const pool = Math.random() < 0.05
            ? diagnosticFrames
            : anomalyFrames;

        let frame;

        do {

            const index = Math.floor(
                Math.random() * pool.length
            );

            frame = pool[index];

        } while (
            frame === previousFrame &&
            pool.length > 1
        );

        previousFrame = frame;

        return "0x04A3  " + frame;
    }

    // ================================================
    // STOP ANOMALY
    // ================================================

    function stopAnomaly() {

        if (anomalyTimer !== null) {

            clearTimeout(anomalyTimer);

            anomalyTimer = null;
        }

        // Keep the final corrupted line visible.
        anomalyLine = null;
    }

    // ================================================
    // UPDATE ANOMALY
    // ================================================

 function updateAnomaly() {

    if (!anomalyLine || !anomalyLine.isConnected) {
        stopAnomaly();
        return;
    }

    const frame = getRandomFrame();

    setLine(anomalyLine, frame);

    const isDiagnostic =
        frame.includes("BAD DATA") ||
        frame.includes("RETRYING") ||
        frame.includes("ERROR");

    const delay = isDiagnostic
        ? 900
        : random(
            config.anomalyMinDelay,
            config.anomalyMaxDelay
        );

    anomalyTimer = setTimeout(
        updateAnomaly,
        delay
    );
}

    // ================================================
    // OBSERVE ANOMALY
    // ================================================

    async function observeAnomaly() {

        // Stop any previous anomaly.

        stopAnomaly();

        // Create one line for the corrupted register.

        const line = terminal.createLine(
            "system anomaly"
        );

        // The output cursor follows this line
        // during the initial reconstruction.

        terminal.showOutputCursor(line);

        const initialFrames = [
            "0x04A3  ▓▓▓▓▓▓▓",
            "0x04A3  O▓▓▓R▓▓",
            "0x04A3  ▓B▓E▓V▓",
            "0x04A3  OB▓▓RVE",
            "0x04A3  O▓S▓R▓E"
        ];

        for (const frame of initialFrames) {

            setLine(line, frame);

            await wait(200);
        }

        terminal.blank();

        await terminal.system(
            "RECONSTRUCTION INCOMPLETE"
        );

        // Start the persistent background anomaly.
        // The terminal can return control to the user.

        anomalyLine = line;

        previousFrame = "";

        anomalyTimer = setTimeout(
            updateAnomaly,
            random(
                config.anomalyMinDelay,
                config.anomalyMaxDelay
            )
        );

        return line;
    }

    // ================================================
    // PUBLIC API
    // ================================================

    return {
        corrupt,
        flicker,
        reconstruct,
        glitch,
        observeAnomaly,
        stopAnomaly
    };

})();
