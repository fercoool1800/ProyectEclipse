const EclipseTerminal = (() => {
    const config = { typingDelay: 22, systemDelay: 12, bottomMargin: 90 };
    let busy = false;
    let speedMultiplier = 1;
    let output = null;
    let cursor = null;
    let inputRow = null;
    let initialized = false;

    function init() {
        if (initialized) return;
        output = document.getElementById('terminal-output');
        cursor = document.getElementById('cursor');
        inputRow = document.querySelector('.command-row');
        if (!output || !cursor || !inputRow) {
            throw new Error('EclipseTerminal: missing DOM elements.');
        }
        cursor.hidden = true;
        window.addEventListener('resize', scroll);
        document.addEventListener('touchstart', () => { speedMultiplier = 3; }, { passive: true });
        document.addEventListener('touchend', () => { speedMultiplier = 1; }, { passive: true });
        document.addEventListener('touchcancel', () => { speedMultiplier = 1; }, { passive: true });
        initialized = true;
    }

    function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function scroll() {
        const target = !cursor.hidden ? cursor : inputRow;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        const limit = window.innerHeight - config.bottomMargin;
        if (rect.bottom > limit) window.scrollBy(0, rect.bottom - limit);
    }

    function showOutputCursor(line) {
        if (!line || !output.contains(line)) return;
        line.appendChild(cursor);
        cursor.hidden = false;
        cursor.classList.add('paused');
        scroll();
    }

    function hideOutputCursor() {
        cursor.hidden = true;
        cursor.classList.remove('paused');
    }

    function createLine(className = '') {
        if (!output) throw new Error('EclipseTerminal: call init() first.');
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`.trim();
        output.appendChild(line);
        scroll();
        return line;
    }

    function blank() { return createLine('blank'); }

    function replaceLine(line, text) {
        if (!line || !output.contains(line)) return;
        const active = cursor.parentNode === line && !cursor.hidden;
        line.textContent = String(text);
        if (active) line.appendChild(cursor);
        scroll();
    }

    async function print(text, className = '', delay = config.typingDelay) {
        const line = createLine(className);
        const content = document.createTextNode('');
        line.appendChild(content);
        showOutputCursor(line);
        for (const character of String(text)) {
            content.textContent += character;
            scroll();
            if (delay > 0) await wait(delay / speedMultiplier);
        }
        return line;
    }

    function system(text) { return print(text, 'system', config.systemDelay); }
    function command(text) { return print(`> ${text}`, 'command', config.typingDelay); }
    function isBusy() { return busy; }

    async function run(task) {
        if (busy) return false;
        busy = true;
        try { await task(); return true; }
        finally { hideOutputCursor(); busy = false; scroll(); }
    }

    return {
        init, wait, scroll, createLine, blank, replaceLine, print, system,
        command, showOutputCursor, hideOutputCursor, isBusy, run,
        get output() { return output; },
        get cursor() { return cursor; }
    };
})();
