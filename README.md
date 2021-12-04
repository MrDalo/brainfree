# BrainFree
ITU project 2021/2022

Created by:
Dalibor Králik (xkrali20)
Patrik Sehnoutek (xsehno01)
Adam Kulla (xkulla01)


BrainFree je aplikácia, ktorá pomáha zlepšiť Time management študentov a bežných ľudí. Implementuje techniku Eisenhowerovej matice.



## Web-version
**Author:** Dalibor Králik (xkral20)
```
    1.Spustenie, instalace: 
        -Webova verzia bolo vyvíjaná na live serveri vo Visual studio Code. Pre spustenie webovej aplikacie otvorte prosim v priecinku "web-version" subor index.html.
            V priehliadaci sa otvori webova stranka, ktora je plne funkcna. Pre presmerovanie do uzivatelskeho dashboardu s Eisenhowerovou maticou je potrebne sa prihlasit.
            Mozete si uzivatelky ucet vytvorit alebo pouzit uzivatelsky ucet, pomocou ktoreho sa vyvijala webova aplikacia. 
            Username: example1
            Password: example1
    2. online webova verzia aplikacie sa nachadza na: http://www.stud.fit.vutbr.cz/~xkrali20/brainfree/web-version/
        - Je potrebne web otvarat s protokolom http a nie s protokolom https. Pri protokole https vznikne problem v komunikaci s databazou, pretoze AJAX requesty podporuju iba http komunikaciu a nie https.
```


## Desktop-version
**Autor:** Patrik Sehnoutek (xsehno01)
1.  Požiadavky na spustenie desktop-verzie:
```
OS: Windows

python3 - version < 3.10
PyQt5
PySide2
requests
```
2.  Spustenie desktopovej verzie aplikacie:
Po nainštalovaní potrebných závislostí je možné spustiť aplikáciu, napríklad cez príkazový riadok(cmd) v adresári **brainfree/desktop-version** niektorým z nižšie uvedených príkazov:
```
python application.py
python3 application.py
```

Z dôvodu obmedzenej veľkosti odovzdávaného zip archívu sa v adresári nenachádza .exe súbor aplikácie.


## Mobile-version
**Autor:** Adam Kulla (xkulla01)


