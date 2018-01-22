var _colignyErrors = {
  "argNotSpecified":new Error ("Missing arguments."),
  "wrongParamType":new Error ("Argument(s) of wrong data type."),
  "invalidMonth":new Error ("Invalid Month number specified."),
  "invalidDays":new Error("Days specified outside possible day range."),
  "invalidCycles":new Error("Cannot compare dtes of different cycle types.")
}

function colignyMonth(name, days) {
  if (typeof (name || days) == 'undefined') {
    throw _colignyErrors["argNotSpecified"];
  } else if (typeof name != "string" || typeof days != "number") {
    throw _colignyErrors["wrongParamType"];
  }

  this.name = name;
  this.days = days;
  this.index = 0;
}

function colignyYear(year) {
  if (typeof year != "number") {
    throw _colignyErrors["wrongParamType"];
  }
  
  this.year = year;  
  this.months = [
    new colignyMonth("Samonios", 30),
    new colignyMonth("Dumanios", 29),
    new colignyMonth("Riuros", 30),
    new colignyMonth("Anagantios", 29),
    new colignyMonth("Ogronios", 30),
    new colignyMonth("Cutios", 30),
    new colignyMonth("Giamonios", 29),
    new colignyMonth("Simiuisonna", 30),
    new colignyMonth("Elembi", 29),
    new colignyMonth("Aedrinni", 30),
    new colignyMonth("Cantlos", 29)
  ];

  switch (Math.abs(this.year % 5)) {
    case 3:
      this.months.splice(0, 0, new colignyMonth("Quimonios", 29));
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
      break;
    case 0:
      this.months.splice(8, 0, new colignyMonth("Equos", 29));
      if (Math.abs(year % 30) !== 15) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
      break;
    case 2:
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
      break;
    default:
      this.months.splice(8, 0, new colignyMonth("Equos", 29));
      break;
  }

  //Sat. Cycle Year Remaider Map
  //1st year of cycle => 3
  //2nd => 4
  //3rd => 0
  //4th => 1
  //5th => 2  
  
  this.yearDays = 0;

  for (i = 0; i < this.months.length; i++) {
    this.months[i].index = i;
    this.yearDays += this.months[i].days;
  } 
}

function colignyDate(year, month, day) {
  if (typeof (year || month || day) == 'undefined') {
    throw _colignyErrors["argNotSpecified"];
  } else if (typeof (year || month || day) != "number") {
    throw _colignyErrors["wrongParamType"];
  }

  this.year = year;
  this.day = day;
  this.fullYear = new colignyYear(year);
  if (month >= this.fullYear.months.length || month < 0) {
    throw _colignyErrors["invalidMonth"]
  } else {
    this.month = this.fullYear.months[month];
  }
  
  this.calcDateDiffs();
}

colignyDate.prototype.calcDateDiffs = function() {
  this.yearToBegin = 0;

  for (var i = 0; i <= this.month.index; i++) {
    if (i === this.month.index) {
      this.yearToBegin += this.day;
    } else {
      this.yearToBegin += this.fullYear.months[i].days;
    }
  }

  this.yearToEnd = this.fullYear.yearDays - this.yearToBegin;
}

colignyDate.prototype.calcDays = function(add) {
  var output = new colignyDate(this.year, this.month.index, this.day);
  output.day += add;
  
  while (output.day > output.month.days) {
    if (output.month.index === output.fullYear.months.length - 1) {
      output.day -= output.month.days;
      output.year++;
      output.fullYear = new colignyYear(output.year);
      output.month = output.fullYear.months[0];
      output.calcDateDiffs();
    } else {
      output.day -= output.month.days;
      output.month = output.fullYear.months[output.month.index + 1];
    }
  }

  while (output.day < 1) {
    if (output.month.index === 0) {
     output.day += output.month.days;
     output.year -= 1;
     output.fullYear = colignyYear(output.year);
     output.month = output.fullYear.months[output.fullYear.months.length - 1];
     output.calcDateDiffs();
    } else {
      output.day += output.month.days;
      output.month = output.fullYear.months[output.month.index - 1];
    }
  }
  return output;
}

colignyDate.prototype.equals = function(target) {
  if (this.year === target.year &&
      this.month.index === target.month.index &&
      this.day === target.day) {
    return true;
  } else {
    return false;
  }
}

colignyDate.prototype.before = function(target) {
  if (this.equals(target)) {
    return false;
  } else if (this.year < target.year) {
    return true;
  } else if (this.year > target.year) {
    return false;
  } else if (this.month.index < target.month.index) {
    return true;
  } else if (this.month.index > target.month.index) {
    return false;
  } else if (this.day < target.day) {
    return true;
  } else {
    return false;
  }
}

colignyDate.prototype.difference = function(target) {
  var count = 0;
  
  if (this.equals(target)) {  
    return 0;
  } else if (this.year === target.year && 
             this.month.index === target.month.index) {
    return Math.abs(this.day - target.day);
  } else if (this.before(target)) {
    if (this.year === target.year) {
      count += this.month.days - this.day + target.day;
      for (i = this.month.index + 1; i < target.month.index; i++) {
        count += this.fullYear.months[i].days;
      }
    } else {
      count += this.yearToEnd + target.yearToBegin;
      for (var i = this.year + 1; i < target.year; i++) {
        var current = new colignyYear(i);
        count += current.yearDays;
      }
    }
  } else {
    return target.difference(this);
  }

  return count;
}

colignyDate.prototype.toGregorianDate = function() {
  var start = new colignyDate(4998, 0, 1)
  var change = this.difference(start);

  var gregDate = new Date(1998, 4, 3);
  var output = new Date(gregDate);

  if (this.before(start)) {
    output.setDate(output.getDate() - change);
  } else {
    output.setDate(output.getDate() + change);
  }

  return output;
}






