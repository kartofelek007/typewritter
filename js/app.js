document.addEventListener('DOMContentLoaded', function() {
    const cfg = {
        onWrite(text, count) {
            console.log(text)
            document.querySelector(".test").innerHTML = text;
        },
        onStart() {
            console.warn('Początek');
        },
        onEnd() {
            console.warn('Koniec!!!');
        },
        onStartWrite() {
        },
        onEndWrite() {
        },
        onStartBack() {
        },
        onEndBack() {
        }
    }

    const tm = new TypeMachine(cfg);
    tm.write("lorem ipsum sit dolor", 100);
    tm.write("\n", 100);
    tm.write("<span style='color: red'>");
    tm.write(" lorem ipsum", 100);
    tm.write("</span>");
    tm.write("<span style='color: dodgerblue'>");
    tm.write(" sit dolor", 100);
    tm.write("</span>");
    tm.write("<br>");

    tm.write(" lorem", 100);
    tm.write("\n", 100);
    tm.write("<span style='color: red'>");
    tm.write(" ipsum", 100);
    tm.write("</span>");
    tm.write("<span style='color: green'>");
    tm.write(" sit dolor", 100);
    tm.write("</span>");
    tm.write(" sit doror", 100);
    tm.pause(400);
    tm.back(3, 150);
    tm.write("lor", 100);
    tm.pause(400);
    tm.start();
});