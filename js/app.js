import TypeMachine from "./typemachine.js";

document.addEventListener('DOMContentLoaded', function() {

    const banner = document.querySelector(".text");
    let audio = new Audio('key-press.wav');

    const cfg = {
        onWrite(text, count) {
            banner.innerHTML = "";

            [...text].forEach(el => {
                const span = document.createElement('span');
                span.classList.add('letter');
                span.innerHTML = (el !== " ")? el : "&nbsp;";
                banner.appendChild(span);
            })
            console.log(text)
            audio.play();
        },
        onStart() {
            console.warn('Początek');
        },
        onEnd() {
            console.warn('Koniec!!!');
            document.querySelector('.cursor').style.visibility = "hidden"
            document.querySelector(".banner").classList.add('banner-anim')
        },
        onStartWrite() {
            document.querySelector('.cursor').style.animationName = ""
        },
        onEndWrite() {
            document.querySelector('.cursor').style.animationName = 'anim';
        },
        onStartBack() {
            document.querySelector('.cursor').style.animationName = ""
        },
        onEndBack() {
            document.querySelector('.cursor').style.animationName = 'anim';
        }
    }

    const tm = new TypeMachine(cfg);
    tm.write("Kurs", 100);
    tm.pause(200);
    tm.write(" Javask", 100)
    tm.pause(400);
    tm.back(3, 150);
    tm.pause(400);
    tm.write("ascript", 100);
    tm.pause(300);
    tm.start();


});
