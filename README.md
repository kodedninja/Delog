# Delog
A web visualiser for [Log](https://joshavanier.itch.io/log).

## Usage
- Download ```Delog.js``` and include it to your page.
- Make a ```div```. (It must be ```position: relative``` and have a defined ```height```!)
- Export your logs from Log
- Use it like this:
```
var elem = document.getElementById('total-wrapper');
var log = new Delog('example/data.json', function() {
  log.total(elem, {color: '#000', empties: true});
});
```

## API
Currently only the ```total``` method is available.
#### ```log.total(element, properties);```
```properties``` is a JSON, with ```color``` and ```empties``` fields. The ```color``` is the color of the bars, if ```empties``` is true empty days are marked with a line.
