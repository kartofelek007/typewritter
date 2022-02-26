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

    const speed = 50;
    const tm = new TypeMachine(cfg);

    tm.write("\n", speed);
    tm.write("<span style='color: red'>");
    tm.write(" lorem ipsum", speed);
    tm.write("</span>");

    tm.write("<span style='color: dodgerblue'>");
    tm.write(" sit dolor", speed);
    tm.write("</span>");
    tm.write("<br>");

    tm.write(" lorem", speed);
    tm.write("\n", speed);
    tm.write("<span style='color: red'>");
    tm.write(" ipsum", speed);
    tm.write("</span>");

    tm.write("<span style='color: green'>");
    tm.write(" sit dolor", speed);
    tm.write("</span>");
    tm.write(" sit dolor kororowe", speed);

    tm.pause( 1000 );
    tm.customAction( () => {
        document.querySelector(".test").classList.add( "mark" );
    } )
    tm.pause( 500 );
    tm.customAction( () => {
        document.querySelector(".test").classList.remove( "mark" );
    } )
    tm.pause( 500 );
    tm.eraseAll()
    tm.write("aaaa", speed);
    tm.pause( 1000 )
    tm.back(4, speed*4);
    tm.write("kolorowe kasztany!!!", speed);

    tm.start();
});