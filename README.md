# coligny.js

This JavaScript library is essentially a port of my Ruby gem, coligny.
More information here: https://github.com/shanekrusen/coligny

This library is intended to provide a JavaScript resource for the use of the Coligny Calendar, according to its alignment by Helen McKay. 

## To-Do

- Comments

## Usage

The main functionality of this project is the conversion of dates to and from the Coligny Calendar.

To convert a Gregorian date to Coligny:

Using the 30-year cycle of Saturn:

```javascript
var date = new Date(2017, 6, 24);
var newDate = date.toColignyDate();
```

Using the 19-year Metonic Cycle:

```javascript
var example = new Date(2017, 6, 24);
var newExample = example.toColignyDate(true);
```

To convert a Coligny Date to a Gregorian Date:

The colignyDate object is constructed with the same arguments as JavaScript's Date object, i.e. (year, month, day), with one exception:

- The method of counting years in the Coligny Calendar is:

`(gregorian year) + 3000`

Using the 30-year Saturn cycle:

```javascript
var example = new colignyDate(5017, 2, 10);
var newExample = example.toGregorianDate();
>Tue Aug 08 2017 00:00:00 
```

Using the 19-year Metonic cycle:

```javascript
var example = new colignyDate(5017, 2, 10, true);
var newExample = example.toGregorianDate();
>Tue Aug 08 2017 00:00:00 
```

Attributes for dates in the Coligny calendar can be accessed:

```javascript
var example = new ColignyDate(5017, 2, 10);
example.year
> 5017
example.month.name
> "Riuros"
example.month.days
> 30
example.day
> 10
example.inscription();
> ["MD"]
```

Days can be added to a Coligny Date to find the resulting date:

```javascript
example.calcDays(5);
```
or 

```javascript
example.calcDays(-5);
```

Coligny Dates can also be subtracted from one another to get the days between them.
```javascript
dateOne = new colignyDate(5017, 2, 10);
dateTwo = new colignyDate(5017, 2, 30);
dateOne.diff(dateTwo);
> 20
dateTwo.diff(dateOne);
> 20
```

They can also be tested for equality.
```javascript
dateOne.equals(dateTwo);
> false
```

For the purpose of creating a calendar of the year, the ColignyYear class can be used.

```javascript
var example = new colignyYear(5017);
```

A ColignyYear class has the attribute "months" which is an array of instances of the ColignyMonths class:

```javascript
example.months
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Credit

Developer - Shane Krusen

The model of the Coligny Calendar used for this project is the product of the work of the brilliant and lovely Helen McKay, the leading expert on the calendar.

Support and feedback from the Modern Gaulish Community, Steve Hansen, Helen McKay, and my mentor, Klint Thrasher.
