const refs = {
    days: document.querySelector('[data-value="days"]'),
    hours: document.querySelector('[data-value="hours"]'),
    mins: document.querySelector('[data-value="mins"]'),
    secs: document.querySelector('[data-value="secs"]'),
    btnStart: document.querySelector('[data-action="start"]'),
    btnStop: document.querySelector('[data-action="stop"]'),
    calendar: document.querySelector('.calendar')
}

const CountdownTimer = function({selector, targetDate}){
    selector = selector;
    targetDate = targetDate;
    intervalId = null;
    isActivTimer = false;   
      
};

CountdownTimer.prototype.start = function() {
    if(this.isActivTimer) {
        return;
    }

    if(!getValueCalendar()){
        return alert('Укажите дату!!!');
    }

    this.isActivTimer = true;
    const targetDate = new Date(getValueCalendar()).getTime()                

    this.intervalId = setInterval(()=>{
        const currentTime = Date.now();
        const time = targetDate - currentTime;
        updateClockFace(time);                    
    },1000)
};

CountdownTimer.prototype.stop = function(){
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isActivTimer = false;
    updateClockFace(0);
};

const timer = new CountdownTimer({   
    selector: '#timer-1',
    targetDate: new Date('Jan-14-2021'),
});

function updateClockFace(time) {
    const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;    
}

function pad(value) {
    return String(value).padStart(2,'0');
}

function getValueCalendar(){
    return refs.calendar.value;
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
refs.btnStop.addEventListener('click', timer.stop.bind(timer));