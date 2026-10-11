const EclipseTerminal = (() => {
    const config = { typingDelay: 22, systemDelay: 12, bottomMargin: 24 };
    let busy = false;
    let speedMultiplier = 1;
    let output = null;
    let cursor = null;
    let inputRow = null;
    let input = null;
    let initialized = false;
    let scrollScheduled = false;
    let focusTimers = [];

    function init() {
        if (initialized) return;
        output = document.getElementById('terminal-output');
        cursor = document.getElementById('cursor');
        inputRow = document.querySelector('.command-row');
        input = document.getElementById('command');
        if (!output || !cursor || !inputRow || !input) {
            throw new Error('EclipseTerminal: missing DOM elements.');
        }
        cursor.hidden = true;

        // The entire command row is tappable, while input width remains dynamic.
        inputRow.addEventListener('click', () => {
            if (input.disabled || busy) return;
            input.focus({ preventScroll: true });
            scheduleScroll();
        });
        input.addEventListener('focus', () => {
            scheduleScroll();
            // Mobile keyboards animate in; correct again as the viewport settles.
            focusTimers.forEach(clearTimeout);
            focusTimers = [80, 200, 400, 700, 1000].map(ms =>
                setTimeout(() => {
                    if (document.activeElement === input) scheduleScroll();
                }, ms)
            );
        });
        input.addEventListener('blur', () => {
            focusTimers.forEach(clearTimeout);
            focusTimers = [];
            document.documentElement.style.removeProperty('--keyboard-clearance');
        });

        window.addEventListener('resize', scheduleScroll);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', scheduleScroll);
            window.visualViewport.addEventListener('scroll', scheduleScroll);
        }

        document.addEventListener('touchstart', () => { speedMultiplier = 3; }, { passive: true });
        document.addEventListener('touchend', () => { speedMultiplier = 1; }, { passive: true });
        document.addEventListener('touchcancel', () => { speedMultiplier = 1; }, { passive: true });
        initialized = true;
    }

    function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    function scheduleScroll() {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(() => {
            scrollScheduled = false;
            scroll();
        });
    }

    function scroll() {
        const target = !cursor.hidden ? cursor : inputRow;
        if (!target) return;
        const viewport = window.visualViewport;
        const visibleBottom = viewport
            ? viewport.offsetTop + viewport.height
            : window.innerHeight;
        const rect = target.getBoundingClientRect();
        const overflow = rect.bottom - (visibleBottom - config.bottomMargin);
        // Give the page enough scrollable room even when the terminal is short.
        // visualViewport is smaller than the layout viewport while the keyboard is up.
        const keyboardHeight = viewport
            ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
            : 0;
        if (document.activeElement === input) {
            document.documentElement.style.setProperty(
                '--keyboard-clearance', `${Math.ceil(keyboardHeight)}px`
            );
        }
        if (overflow > 0) window.scrollBy({ top: overflow, behavior: 'instant' });
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
        if (active) {
            line.appendChild(cursor);
            scroll();
        }
        // A persistent anomaly updating an old line must not scroll the page.
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
