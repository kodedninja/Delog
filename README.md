# Delog
A web visualiser for [Log](https://joshavanier.itch.io/log).

## Usage
- Download ```Delog.js``` and include it to your page.
- Make a ```div```. (It must be ```position: relative``` and have a defined ```height``` for charts!)
- Export your logs from Log
- Use it like this:
```javascript
var elem = document.getElementById('total-wrapper');
var latest = document.getElementById('latest-wrapper');
var specific_el = document.getElementById('specific-wrapper');
var log = new Delog('example/data.json', function() {
  log.total(elem, 60, {color: '#000', empties: true});
  log.query({sector: 'Writing', project: 'Delog'}, specific_el, 30, {color: '#000', empties: true});
  log.latest(elem, 5, ' ~ ');
  // other functions
});
```

## API
#### ```log.total(element, days, properties);```
Draws a one color chart of your total hours/day for the last ```days``` days.
The ```properties``` JSON has two fields:<br>
```color```:  the hex code of the colors of the bars<br>
```empties```: if true empty days are marked with a line

#### ```log.overview(element, days, properties);```
Draws a colorful chart of your total hours/day for the last ```days``` days. The colors are the same as in Log or ```properties.color``` if not set.
The ```properties``` JSON has two fields:<br>
```color```:  the default color for the sectors without a set color<br>
```empties```: if true empty days are marked with a line

#### ```log.query(query, element, days, properties);```
Draws a one color chart for a specific project/sector for the last ```days``` days.
Query could contain a ```sector``` or/and a ```project``` field. If both are present, the entries having both will be counted.
The ```properties``` JSON has two fields:<br>
```color```:  the hex code of the colors of the bars<br>
```empties```: if true empty days are marked with a line

#### ```log.sectors(element);```
Prints every sector with total hours, total logs and focus percentage.

#### ```log.projects(element);```
Prints every project with total hours, total logs and focus percentage.

#### ```log.days(element);```
Prints how many days have passed since the first log.

#### ```log.latest(element, x, separator);```
Prints the ```x``` latest entries. The separator is a string which separates the different properties of the entry. The default separator is ``` - ```.

#### ```log.sector_colors(element, properties);```
Prints the palette of sectors. The ```properties``` JSON has only two fields:<br>
```fontSize```: the size of the font and of the square (which shows the color)<br>
```block```: if true the sectors will be printed under each other, otherwise in a line
