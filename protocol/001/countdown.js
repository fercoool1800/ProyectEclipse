(() => {
    'use strict';

    // November 30, 2026 at midnight in Colombia (UTC-05:00).
    const activationTime = new Date('2026-11-30T00:00:00-05:00').getTime();
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    const heading = document.getElementById('heading');
    const message = document.getElementById('message');
    const countdown = document.querySelector('.countdown');
    const pad = value => String(value).padStart(2, '0');
    let intervalId = null;

    function updateCountdown() {
        const remaining = Math.max(0, activationTime - Date.now());
        const secondsTotal = Math.floor(remaining / 1000);
        const days = Math.floor(secondsTotal / 86400);
        const hours = Math.floor((secondsTotal % 86400) / 3600);
        const minutes = Math.floor((secondsTotal % 3600) / 60);
        const seconds = secondsTotal % 60;

        elements.days.textContent = pad(days);
        elements.hours.textContent = pad(hours);
        elements.minutes.textContent = pad(minutes);
        elements.seconds.textContent = pad(seconds);

        if (remaining === 0) {
            heading.textContent = 'ACTIVATION WINDOW REACHED';
            message.textContent = 'PROTOCOL I: AWAITING FURTHER INSTRUCTIONS.';
            countdown.setAttribute('aria-label', 'Protocol I activation time reached');
            if (intervalId !== null) clearInterval(intervalId);
        }
    }

    updateCountdown();
    if (Date.now() < activationTime) intervalId = setInterval(updateCountdown, 1000);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) updateCountdown();
    });
})();
