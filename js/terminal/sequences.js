const EclipseSequences = (() => {
    const terminal = EclipseTerminal;
    const effects = EclipseEffects;
    const config = { shortPause: 250, mediumPause: 500, longPause: 850 };
    async function boot() {
        await terminal.system('SIGNAL DETECTED.');
        await terminal.wait(config.mediumPause);
        await terminal.system('Establishing connection...');
        await terminal.wait(config.shortPause);
        await terminal.system('Connection established.');
        terminal.blank();
        await terminal.print('[ ECLIPSE ]', 'system');
        terminal.blank();
        await terminal.print('This interface does not provide answers.');
        await terminal.print('It responds to those who know what to ask.');
        terminal.blank();
        await terminal.system("Type 'help' to inspect available commands.");
    }
    async function help() {
        await terminal.system('AVAILABLE COMMANDS');
        terminal.blank();
        await terminal.print('help       Display available commands.');
        await terminal.print('status     Display system status.');
        await terminal.print('archive    Query archive connection.');
        terminal.blank();
        await terminal.system('Not all directives are documented.');
    }
    async function status() {
        await terminal.system('SYSTEM DIAGNOSTIC');
        terminal.blank();
        await terminal.print('INPUT CHANNEL: ACTIVE');
        await terminal.print('ARCHIVE LINK: UNSTABLE');
        await terminal.print('DIRECTIVE REGISTER: CORRUPTED');
        terminal.blank();
        await terminal.wait(config.mediumPause);
        await effects.observeAnomaly();
    }
    async function archive() {
        await terminal.system('ARCHIVE CONNECTION REQUESTED');
        await terminal.wait(config.mediumPause);
        await terminal.print('Access point detected.');
        await terminal.print('Archive index unavailable.');
        terminal.blank();
        await terminal.system('Further information required.');
    }
    async function observe() {
        await terminal.system('DIRECTIVE RECOGNIZED');
        await terminal.wait(config.mediumPause);
        await terminal.print('Observation is the first requirement.');
        terminal.blank();
        await terminal.system('PREAMBLE COMPLETE');
        await terminal.wait(config.longPause);
        await terminal.system('PROTOCOL I: INITIALIZATION PENDING');
    }
    return { boot, help, status, archive, observe };
})();
