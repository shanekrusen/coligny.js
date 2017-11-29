function colignyMonth(name, days) {
  this.name = name;
  this.days = days;
}

function colignyYear(year, isMetonic) {
  if (typeof isMetonic == "null") { isMetonic = false; }
  this.year = year;
  this.isMetonic = isMetonic;
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

  if ((this.isMetonic && this.year < 4999) || 
      (!this.isMetonic && this.year < 4998)) 
  {
    var isEarly = true;
  } else {
    var isEarly = false;
  }

  if (this.isMetonic) {
    if (isEarly) {
      var yearDiff = 4999 - this.year;
    } else {
      var yearDiff = this.year - 4999;
    }
  } else {
    if (isEarly) {
      var yearDiff = 4998 - this.year;
    } else {
      var yearDiff = this.year - 4998;
    }
  }

  // Populate optional months
  if (!this.isMetonic) {
    // Populate Equos for Sat. cycle
    if  (isEarly && (yearDiff % 5 === 1 || yearDiff % 5 === 0)) {
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
    }  else if (!isEarly && (yearDiff % 5 === 0 || yearDiff % 5 === 4)) {
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
    } else {
      this.months.splice(8, 0, new colignyMonth("Equos", 29));
    }

    // Populate Quimonios for Sat. cycle
    if (yearDiff % 5 === 0) {
      this.months.splice(0, 0, new colignyMonth("Quimonios", 29));
    }

    // Populate Rantaranos for Sat. cycle
    if (isEarly) {
      if (yearDiff % 5 === 3 && yearDiff % 30 !== 3) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    } else {
      if (yearDiff % 5 === 2 && yearDiff % 30 !== 27) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    }
  } else {
    // Function to see if year in question matches specific cases
    // for month placement, since metonic cycle checks must be done
    // on 19 year cycle, and "% 5" can't be used.
    function testCases (cases) {
      for (var i = 0; i < cases.length; i++) {
        if (yearDiff % 19 === cases[i]) {
          return true
        }
      }
      return false
    }
    
    // Populate Equos for Met. cycle
    if (isEarly) {
      if (testCases([1, 5, 6, 10, 11, 15, 16])) {
        this.months.splice(8, 0, new colignyMonth("Equos", 30));
      } else {
        this.months.splice(8, 0, new colignyMonth("Equos", 29));
      }
    } else if (testCases([3, 4, 8, 9, 13, 14, 18])) {
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
    } else {
      this.months.splice(8, 0, new colignyMonth("Equos", 29));
    }
    
    // Populate Quimonios for Met. cycle
    if (isEarly) {
      if (testCases([5, 10, 15])) {
        this.months.splice(0, 0, new colignyMonth("Quimonios", 29));
      }
    } else if (testCases([4, 9, 14])) {
      this.months.splice(0, 0, new colignyMonth("Quimonios", 29));
    }

    // Populate Rantaranos for Met. cycle
    if (isEarly) {
      if (testCases([3, 8, 13, 18])) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    } else if (testCases([1, 6, 11, 16])) {
      this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
    }
  }

  if (!this.isMetonic) {
    // Saturn Longcycle Equos Correction
    if (this.isEarly) {
      if ((this.yearDiff > 197.97) &&
         (this.yearDiff % 197.97 <= 5) && 
         (this.yearDiff % 5 === 1))
      {
        for (var i = 0; i < this.months.length; i++) {
          if (this.months[i].name === "Equos") {
            this.months[i].days -= 1;
          }
        }
      }
    } else {
      if ((this.yearDiff > 197.97) &&
         (this.yearDiff % 197.97 <= 5) && 
         (this.yearDiff % 5 === 4))
      {
        for (var i = 0; i < this.months.length; i++) {
          if (this.months[i].name === "Equos") {
            this.months[i].days -= 1;
          }
        }
      }
    }
    // Saturn Longcycle Rantaranos Correction
    if (this.isEarly) {
      if ((this.yearDiff > 635.04) &&
         (this.yearDiff % 635.04 <= 30) &&
         (this.yearDiff % 30 === 3))
      {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    } else {
      if ((this.yearDiff > 635.04) && 
         (this.yearDiff % 635.04 <= 30) &&
         (this.yearDiff % 30 === 27))
      {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    }
  } else {
    // Metonic Longcycle Equos Correction
    if (this.isEarly) {

    } else {

    }
    // Metonic Longcycle Rantaranos Correction
    if (this.isEarly) {

    } else {

    }
  } 
}

function colignyDate(year, month, day, isMetonic) {
  if (typeof isMetonic === "undefined") { isMetonic = false; }
  this.year = year;
  this.month = month;
  this.day = day;
  this.isMetonic = isMetonic

  if (this.isMetonic) {
    this.startYear = 4999;
    this.startDate = new Date(1999, 4, 22);
    this.months = new colignyYear(year, true).months;
  } else {
    this.startYear = 4998;
    this.startDate = new Date(1998, 4, 3);
    this.months = new colignyYear(year).months;
  }

  for (var i = 0; i < this.months.length; i++) {
    if (this.months[i].name === month) {
      this.month = this.months[i];
    }
  }
}

colignyDate.prototype.calcDays = function(add) {
  this.day += add

  while (this.day > this.month.days) {
    if (this.months[this.months.indexOf(this.month) + 1] == null) {
      this.day = this.day - this.month.days;
      this.year += 1;
      if (this.isMetonic) {
        this.months = new colignyYear(this.year, true).months;
      } else {
        this.months = new colignyYear(this.year).months;
      }
      this.month = this.months[0];
    } else {
      this.day = this.day - this.month.days
      this.month = this.months[this.months.indexOf(this.month) + 1]
    }
  }

  while (this.day < 1) {
    if (this.month === this.months[0]) {
      this.year -= 1;
      if (this.isMetonic) {
        this.months = new colignyYear(this.year, true).months;
      } else {
        this.months = new colignyYear(this.year).months;
      }
      this.month = this.months[this.months.length - 1];
      this.day = this.month.days + this.day;
    } else {
      this.month = this.months[months.indexOf(this.month) - 1];
      this.day = this.month.days + this.day;
    }
  }
  return this
}

colignyDate.prototype.toGregorianDate = function() {
  if (this.isMetonic) {
    var start = new colignyDate(4999, "Samonios", 1, true);
  } else {
    var start = new colignyDate(4998, "Quimonios", 1);
  }

  var dayCount = 0;

  if (this.year < this.startYear) {
    while (true)
    {
      if (this.month.name === start.month.name &&
           this.day === start.day &&
           this.year === start.year) 
      {     
        break;
      }
      this.calcDays(1);
      dayCount -= 1;
    }
  } else {
    while (true)
    {
      if (this.month.name === start.month.name &&
           this.day === start.day &&
           this.year === start.year)
      {
        break;
      }
      start.calcDays(1);
      dayCount += 1;
    }
  }
  
  console.log(dayCount);

  var output = new Date(this.startDate.getTime());
  output.setDate(this.startDate.getDate() + dayCount);
  return output;
}








