const EclipseCommands = (() => {
    const terminal = EclipseTerminal;
    const sequences = EclipseSequences;
    let input = null;
    let initialized = false;
    let inputCursor = null;
    let preambleComplete = false;
    const commands = {
        help: () => sequences.help(),
        status: () => sequences.status(),
        archive: () => sequences.archive(),
        observe: async () => {

    if (preambleComplete) {
        await terminal.system('PREAMBLE ALREADY COMPLETE');
        return;
    }

    await sequences.observe();

    preambleComplete = true;

    await terminal.blank();
    await terminal.system('INITIALIZING PROTOCOL I...');
    await terminal.system('ESTABLISHING CONNECTION...');

    await terminal.wait(1500);

    window.location.assign('protocol/001/');
        }}
    function updateInputCursor() {
        if (!input || !inputCursor) return;
        // A narrow input keeps the block cursor immediately after typed text.
        input.style.width = `${Math.max(1, Array.from(input.value).length + 0.3)}ch`;
    }
    function setInputEnabled(enabled) {
        if (!input) return;
        input.disabled = !enabled;
        if (inputCursor) inputCursor.hidden = !enabled;
        updateInputCursor();
        if (enabled) input.focus({ preventScroll: true });
    }
    function normalizeCommand(value) { return String(value).trim().toLowerCase(); }
    async function execute(value) {
        const command = normalizeCommand(value);
        if (!command || terminal.isBusy()) return false;
        return terminal.run(async () => {
            setInputEnabled(false);
            EclipseEffects.stopAnomaly();
            try {
                await terminal.command(command);
                terminal.blank();
                if (Object.prototype.hasOwnProperty.call(commands, command)) {
                    await commands[command]();
                } else {
                    await terminal.system('COMMAND NOT RECOGNIZED');
                }
                terminal.blank();
            } catch (error) {
                console.error('Eclipse command error:', error);
                await terminal.system('SYSTEM ERROR: EXECUTION INTERRUPTED');
            } finally {
                setInputEnabled(true);
                terminal.scroll();
            }
        });
    }
    function handleKeydown(event) {
        if (event.key !== 'Enter' || event.isComposing) return;
        event.preventDefault();
        if (terminal.isBusy()) return;
        const value = input.value;
        if (!value.trim()) return;
        input.value = '';
        updateInputCursor();
        void execute(value);
    }
    function init() {
        if (initialized) return;
        input = document.getElementById('command');
        inputCursor = document.getElementById('input-cursor');
        if (!input || !inputCursor) throw new Error('EclipseCommands: command input/cursor not found.');
        input.addEventListener('input', updateInputCursor);
        updateInputCursor();
        input.addEventListener('keydown', handleKeydown);
        initialized = true;
    }
    return { init, execute, setInputEnabled, get preambleComplete() { return preambleComplete; } };
})();
