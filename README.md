# coligny.js

This JavaScript library is essentially a port of my Ruby gem, coligny.
More information here: https://github.com/shanekrusen/coligny

This library is intended to provide a JavaScript resource for the use of the Coligny Calendar, according to its alignment by Helen McKay. 

## To-DO

- Add Inscriptions for dates(?)
- Comments

## Installation

For usage:

- Download the compressed version, denoted with the "-min" suffix

or

- Add this line to your HTML `<head>` tag:

`<script type="text/javascript" src="https://raw.githubusercontent.com/shanekrusen/coligny.js/master/coligny-0.2.0-min.js"></script>`

For development, download the readable version, denoted with the "-dev" suffix. 

## Usage

The main functionality of this project is the conversion of dates to and from the Coligny Calendar.

To convert a Gregorian date to Coligny:

Using the 30-year cycle of Saturn:

```javascript
var date = new Date(2017, 6, 24);
var newDate = date.toColignyDate;
```

Using the 19-year Metonic Cycle:

```javascript
example = new Date(2017, 6, 24)
newExample = example.toColignyDate(true);
```

To convert a Coligny Date to a Gregorian Date:

The colignyDate object is constructed with the same arguments as JavaScript's Date object, i.e. (year, month, day), with two exceptions:

- The Coligny Months **must** be passed as strings. 
- The method of counting years in the Coligny Calendar is:

`(current gregorian year) + 3000`

Using the 30-year Saturn cycle:

```javascript
example = new colignyDate(5017, "Rivros", 10)
newExample = example.toGregorianDate
```

Using the 19-year Metonic cycle:

```javascript
example = new colignyDate(5017, "Rivros", 10, true)
newExample = example.toGregorianDate
```

Attributes for dates in the Coligny calendar can be accessed:

```javascript
example = new ColignyDate(5017, "Rivros", 10)
example.year
> 5017
example.month.name
> "Rivros"
example.month.days
> 30
example.day
> 10
```

Days can be added to a Coligny Date to find the resulting date:

```javascript
example.calcDays(5)
```
or 

```javascript
example.calcDays(-5)
```

For the purpose of creating a calendar of the year, the ColignyYear class can be used.

```javascript
example = new colignyYear(5017)
```

A ColignyYear class has the attribute "months" which is an array of instances of the ColignyMonths class:

```javascript
example.months
```

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

## Credit

Developer - Shane Krusen

The model of the Coligny Calendar used for this project is the product of the work of the brilliant and lovely Helen McKay, the leading expert on the calendar.

Support and feedback from the Modern Gaulish Community, Steve Hansen, Helen McKay, and my mentor, Klint Thrasher.
