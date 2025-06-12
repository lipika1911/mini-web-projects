window.onload = function () {
    // Stopwatch Logic
    let min = 0, sec = 0, msec = 0;
    let appendMinutes = document.getElementById("minutes");
    let appendSeconds = document.getElementById("seconds");
    let appendMilliseconds = document.getElementById("milliseconds");
    let startBtn = document.getElementById("start");
    let stopBtn = document.getElementById("stop");
    let resetBtn = document.getElementById("reset");
    let interval;

    const startTimer = () => {
        msec++;
        appendMilliseconds.innerHTML = msec <= 9 ? "0" + msec : msec;

        if (msec > 99) {
            sec++;
            msec = 0;
            appendMilliseconds.innerHTML = "00";
            appendSeconds.innerHTML = sec <= 9 ? "0" + sec : sec;
        }

        if (sec > 59) {
            min++;
            sec = 0;
            appendMinutes.innerHTML = min <= 9 ? "0" + min : min;
            appendSeconds.innerHTML = "00";
        }
    };

    startBtn.addEventListener("click", () => {
        clearInterval(interval);
        interval = setInterval(startTimer, 10);
    });

    stopBtn.addEventListener("click", () => {
        clearInterval(interval);
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(interval);
        min = 0;
        sec = 0;
        msec = 0;
        appendMinutes.innerHTML = "00";
        appendSeconds.innerHTML = "00";
        appendMilliseconds.innerHTML = "00";
    });

    // Digital Clock Logic
    const updateDigitalClock = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        const formattedHours = hours.toString().padStart(2, '0');
        document.getElementById("digital-time").textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    };

    setInterval(updateDigitalClock, 1000);
    updateDigitalClock();

    // Countdown Timer Logic
    let countdownInterval;
    function startCountdown() {
        clearInterval(countdownInterval);
        let minutes = parseInt(document.getElementById("count-minutes").value, 10);
        if (isNaN(minutes) || minutes <= 0) return;

        let totalSeconds = minutes * 60;

        countdownInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                document.getElementById("countdown-time").textContent = "00:00";
                return;
            }
            totalSeconds--;
            const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
            const secs = (totalSeconds % 60).toString().padStart(2, '0');
            document.getElementById("countdown-time").textContent = `${mins}:${secs}`;
        }, 1000);
    }

    function resetCountdown() {
        clearInterval(countdownInterval);
        document.getElementById("count-minutes").value = "";
        document.getElementById("countdown-time").textContent = "00:00";
    }

    window.startCountdown = startCountdown;
    window.resetCountdown = resetCountdown;

    // Tab Switching Logic
    window.showSection = function (id) {
        const sections = document.querySelectorAll(".watch-section");
        sections.forEach(section => {
            section.style.display = "none";
        });
        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.style.display = "block";
        }
        const buttons = document.querySelectorAll(".tabs button");
        buttons.forEach(button => button.classList.remove("active-tab"));
        const tabButton = document.querySelector(`.tabs button[onclick="showSection('${id}')"]`);
        if (tabButton) {
            tabButton.classList.add("active-tab");
        }
    };

    // Show default tab on load
    showSection("digital");
};
