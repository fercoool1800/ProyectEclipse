
const EclipseCommands = (() => {

    // ================================================
    // DEPENDENCIES
    // ================================================

    const terminal = EclipseTerminal;
    const sequences = EclipseSequences;

    // ================================================
    // CONFIGURATION
    // ================================================

    const config = {
        protocolUrl: "protocol/001/",
        redirectDelay: 1500
    };

    // ================================================
    // STATE
    // ================================================

    let input = null;
    let inputCursor = null;
    let initialized = false;
    let preambleComplete = false;
    let redirecting = false;

    // ================================================
    // INPUT CURSOR
    // ================================================

    function updateInputCursor() {

        if (!input || !inputCursor) return;

        const length = Array.from(input.value).length;

        input.style.width =
            `${Math.max(1, length + 0.3)}ch`;
    }

    // ================================================
    // INPUT CONTROL
    // ================================================

    function setInputEnabled(enabled) {

        if (!input) return;

        const active = enabled && !redirecting;

        input.disabled = !active;

        if (inputCursor) {
            inputCursor.hidden = !active;
        }

        updateInputCursor();

        if (active) {
            input.focus({ preventScroll: true });
        }
    }

    // ================================================
    // COMMAND NORMALIZATION
    // ================================================

    function normalizeCommand(value) {
        return String(value).trim().toLowerCase();
    }

    // ================================================
    // PROTOCOL REDIRECTION
    // ================================================

    async function redirectToProtocol() {

        redirecting = true;

        terminal.blank();

        await terminal.system(
            "INITIALIZING PROTOCOL I..."
        );

        await terminal.system(
            "ESTABLISHING CONNECTION..."
        );

        await terminal.wait(config.redirectDelay);

        const destination = new URL(
            config.protocolUrl,
            document.baseURI
        );

        window.location.assign(destination.href);
    }

    // ================================================
    // OBSERVE DIRECTIVE
    // ================================================

    async function handleObserve() {

        if (preambleComplete) {

            await terminal.system(
                "PREAMBLE ALREADY COMPLETE"
            );

            return;
        }

        await sequences.observe();

        preambleComplete = true;

        await redirectToProtocol();
    }

    // ================================================
    // COMMAND REGISTRY
    // ================================================

    const commands = {
        help: () => sequences.help(),
        status: () => sequences.status(),
        archive: () => sequences.archive(),
        observe: handleObserve
    };

    // ================================================
    // COMMAND EXECUTION
    // ================================================

    async function execute(value) {

        const command = normalizeCommand(value);

        if (
            !command ||
            terminal.isBusy() ||
            redirecting
        ) {
            return false;
        }

        return terminal.run(async () => {

            setInputEnabled(false);

            EclipseEffects.stopAnomaly();

            try {

                await terminal.command(command);

                terminal.blank();

                if (
                    Object.prototype.hasOwnProperty.call(
                        commands,
                        command
                    )
                ) {

                    await commands[command]();

                } else {

                    await terminal.system(
                        "COMMAND NOT RECOGNIZED"
                    );
                }

                if (!redirecting) {
                    terminal.blank();
                }

            } catch (error) {

                console.error(
                    "Eclipse command error:",
                    error
                );

                redirecting = false;

                await terminal.system(
                    "SYSTEM ERROR: EXECUTION INTERRUPTED"
                );

            } finally {

                if (!redirecting) {
                    setInputEnabled(true);
                    terminal.scroll();
                }
            }
        });
    }

    // ================================================
    // KEYBOARD HANDLER
    // ================================================

    function handleKeydown(event) {

        if (
            event.key !== "Enter" ||
            event.isComposing
        ) {
            return;
        }

        event.preventDefault();

        if (
            terminal.isBusy() ||
            redirecting
        ) {
            return;
        }

        const value = input.value;

        if (!value.trim()) return;

        input.value = "";

        updateInputCursor();

        void execute(value);
    }

    // ================================================
    // INITIALIZATION
    // ================================================

    function init() {

        if (initialized) return;

        input = document.getElementById("command");

        inputCursor = document.getElementById(
            "input-cursor"
        );

        if (!input || !inputCursor) {

            throw new Error(
                "EclipseCommands: command input/cursor not found."
            );
        }

        input.addEventListener(
            "input",
            updateInputCursor
        );

        input.addEventListener(
            "keydown",
            handleKeydown
        );

        updateInputCursor();

        initialized = true;
    }

    // ================================================
    // PUBLIC API
    // ================================================

    return {
        init,
        execute,
        setInputEnabled,

        get preambleComplete() {
            return preambleComplete;
        }
    };

})();
