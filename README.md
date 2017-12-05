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
The ```properties``` JSON has two fields:<br>
```color```:  the hex code of the colors of the bars<br>
```empties```: if true empty days are marked with a line

#### ```log.overview(element, properties);```
Draws a colorful chart of your total hours/day. The colors are the same as in Log or ```properties.color``` if not set.
The ```properties``` JSON has two fields:<br>
```color```:  the default color for the sectors without a set color<br>
```empties```: if true empty days are marked with a line

#### ```log.sectors(element, properties);```
Prints the palette of sectors. The ```properties``` JSON has only two fields:<br>
```fontSize```: the size of the font and of the square (which shows the color)<br>
```block```: if true the sectors will be printed under each other, otherwise in a line
