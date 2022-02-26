# Type Writter Class

Klasa służąca do wypisywania liter w animowany sposób.

Demo: https://kartofelek007.github.io/typewritter/

### Metody
* `write(text, speedWriteTime = 0)` - dodaje tekst i zaczyna go pisać z szybkością `speedWriteText` (ms)
* `pause(pauseTime = 0)` - pauzuje odtwarzanie kolejnych akcji
* `back(count = 0, speedWriteTime = 0)` - wraca `count` liter z szybkością `speedWriteTime`
* `eraseAll()` - czyści cały tekst
* `customAction(fn)` - dodaje przekazaną w parametrze funkcję jako kolejną akcję do odtworzenia
* `start()` - rozpoczyna odgrywanie kolejnych akcji. Odpal po dodaniu akcji.
* `setText(text, cursorPosition = null)` - ustawia nowy tekst
* `setCount(cursorPosition)` - pozycję kursora w tekście. Parametr `cursorPosition` może przyjąć liczbę oznaczającą indeks litery, ale też słowa `start` (początek tekstu) i `end` - koniec tekstu
* `getCount()` - zwraca aktualną pozycję w tekście
* `getText()` - zwraca aktualny tekst

### Przykład użycia
```js

const cfg = {
    //funkcja odpalana w czasie pisania każdej litery
    onWrite(text, count) {
        console.log(text)
        document.querySelector(".test").innerHTML = text;
    },
    //funkcja odpalana przy rozpoczęciu pisania
    onStart() {
        console.warn('Początek');
    },
    //funkcja odpalana przy zakończeniu wszystkich akcji
    onEnd() {
        console.warn('Koniec!!!');
    },
    //funkcja odpalana tuż przed napisaniem pojedynczej litery
    onStartWrite() {
    },
    //funkcja odpalana tuż po napisaniu pojedynczej litery
    onEndWrite() {
    },
    //funkcja odpalana tuż przez rozpoczęciem cofania (można zamiennie stosować customowe akcje - patrz poniżej kod)
    onStartBack() {
    },
    //funkcja odpalana tuż po zakończeniu cofnięcia (można zamiennie stosować customowe akcje - patrz poniżej kod)
    onEndBack() {
    }
}

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

tm.pause( 500 );

tm.customAction(() => {
    document.querySelector(".test").classList.add( "mark" );
});

tm.pause( 500 );

tm.customAction(() => {
    document.querySelector(".test").classList.remove( "mark" );
});

tm.back(8, speed);
tm.write("kolorowe", speed);

tm.pause( 500 );
tm.eraseAll();
tm.pause( 500 );

tm.write("kolorowe kasztany!!!", speed);
tm.start();
```