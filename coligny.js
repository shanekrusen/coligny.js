var _colignyErrors = {
  "argNotSpecified":new Error ("Missing arguments."),
  "wrongParamType":new Error ("Argument(s) of wrong data type."),
  "invalidMonth":new Error ("Invalid Month number specified."),
  "invalidDays":new Error("Days specified outside possible day range.")
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

  (year < 4998) ? this.early = true : this.early = false;
  this.yearDiff = Math.abs(year - 4998);

  //Sat. Cycle Year Remaider Map
  //1st year of cycle => 3
  //2nd => 4
  //3rd => 0
  //4th => 1
  //5th => 2

  switch (Math.abs(year % 5)) {
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
  
  var internal = this;
  
  this.calcDateDiffs();
}

colignyDate.prototype.calcDateDiffs = function() {
  this.yearToBegin = 0;

  for (var i = 0; i <= this.month.index; i++) {
    if (i === this.month.index) {
      this.yearToBegin += this.day - 1;
    } else {
      this.yearToBegin += this.fullYear.months[i].days;
    }
  }

  this.yearToEnd = this.fullYear.yearDays - this.yearToBegin - 1;
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
     output.fullYear = new colignyYear(output.year);
     output.month = output.fullYear.months[output.fullYear.months.length - 1];
     output.calcDateDiffs();
    } else {
      output.day += output.month.days;
      output.month = output.fullYear.months[output.month.index - 1];
    }
  }
  return output;
}






