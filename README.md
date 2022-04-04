# ZERO TO HERO: Javascript & ES6+

Väčšina vedomostí čerpaná z dostpných kurzov a snahe učiť sa kažý deň niečo nové

## Odporúčané knihy na prečítanie

## Základy Javascriptu

### Funkcie

Môžeš vytvárať aj anonymné funkcie čo je niekedy dobré a užitočné hlavne pri
ES6 pretože to môže sprehladniť kód ale väčšinou sa odporúča pomenovať vždy
svoje funkcie, pretože tieto funkcie sa objavujú v **Call Stack** v
_Developer tools_ v prehliadači. Tak sa dozvieme v nejakom breakpointe napr. z
akej funkcie se sa práve do daného breakpointu dostali. Pozri príklad nižšie

```javascript
function keyPress(e) {
  // Na dalsom riadku si dame breakpoint
  console.log('You pressed the key ' + e.key)
}

// Priklad anonymnej funkcie na listenery
document.body.addEventListener('keyup', function (e) {
  keyPress(e)
}

// Priklad pomenovanej funkcie na listnery
document.body.addEventListener('keyup', function keyListener(e) {
  keyPress(e)
}
```

![Anonymous function picture call stack](/images/anonymous_function_callstack.png 'Anonymous function picture call stack')
![Named function picture call stack](/images/named_function_callstack.png 'Named function picture call stack')
