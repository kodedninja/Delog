# Delog
A web visualiser for [Log](https://joshavanier.itch.io/log).

## Usage
- Download ```Delog.js``` and include it to your page.
- Make a ```div```. (It must be ```position: relative``` and have a defined ```height```!)
- Export your logs from Log
- Use it like this:
```javascript
var elem = document.getElementById('total-wrapper');
var log = new Delog('example/data.json', function() {
  log.total(elem, {color: '#000', empties: true});
});
```

## API
#### ```log.total(element, properties);```
Draws a one color chart of your total hours/day.
```properties``` is a JSON, with ```color``` and ```empties``` fields. The ```color``` is the hex code of the colors of the bars. If ```empties``` is true empty days are marked with a line.
#### ```log.overview(element, properties);```
Draws a colorful chart of your total hours/day. The colors are the same as in Log or ```propterties.color``` if not set.
```properties``` is a JSON, with ```color``` and ```empties``` fields. The ```color``` is the default color for the sectors without set colors. If ```empties``` is true empty days are marked with a line.
