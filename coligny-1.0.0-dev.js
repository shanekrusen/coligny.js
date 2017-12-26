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
      this.yearDiff = 4999 - this.year;
    } else {
      this.yearDiff = this.year - 4999;
    }
  } else {
    if (isEarly) {
      this.yearDiff = 4998 - this.year;
    } else {
      this.yearDiff = this.year - 4998;
    }
  }

  // Populate optional months
  if (!this.isMetonic) {
    // Populate Equos for Sat. cycle
    if  (isEarly && (this.yearDiff % 5 === 1 || this.yearDiff % 5 === 0)) {
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
    }  else if (!isEarly && (this.yearDiff % 5 === 0 || this.yearDiff % 5 === 4)) {
      this.months.splice(8, 0, new colignyMonth("Equos", 30));
    } else {
      this.months.splice(8, 0, new colignyMonth("Equos", 29));
    }

    // Populate Quimonios for Sat. cycle
    if (this.yearDiff % 5 === 0) {
      this.months.splice(0, 0, new colignyMonth("Quimonios", 29));
    }

    // Populate Rantaranos for Sat. cycle
    if (isEarly) {
      if (this.yearDiff % 5 === 3 && this.yearDiff % 30 !== 3) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    } else {
      if (this.yearDiff % 5 === 2 && this.yearDiff % 30 !== 27) {
        this.months.splice(6, 0, new colignyMonth("Rantaranos", 30));
      }
    }
  } else {
    // Function to see if year in question matches specific cases
    // for month placement, since metonic cycle checks must be done
    // on 19 year cycle, and "% 5" can't be used.
    function testCases (cases) {
      for (var i = 0; i < cases.length; i++) {
        if (this.yearDiff % 19 === cases[i]) {
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
      if ((this.yearDiff > 60.97) &&
         (this.yearDiff % 60.97 <= 19) &&
         (this.yearDiff % 19 === 15))
      {
        for (var i = 0; i < this.months.length; i++) {
          if (this.months[i].name === "Equos") {
            this.months[i].days -= 1;
          }
        }
      }
    } else {
      if ((this.yearDiff > 60.97) &&
         (this.yearDiff % 60.97 <= 19) &&
         (this.yearDiff % 19 === 3))
      {
        for (var i = 0; i < this.months.length; i++) {
          if (this.months[i].name === "Equos") {
            this.months[i].days -= 1;
          }
        }
      }
    }
    // Metonic Longcycle Rantaranos Correction
    if (this.isEarly) {
      if ((this.yearDiff > 6568.62) &&
         (this.yearDiff % 6568.62 <= 19) &&
         (this.yearDiff % 19 === 1))
      {
        this.months.splice(6, 1);
      }
    } else {
      if ((this.yearDiff > 6568.62) &&
         (this.yearDiff % 6568.62 <= 19) &&
         (this.yearDiff % 19 === 17))
      {
        this.months.splice(6, 1);
      }
    }
  } 
}

function colignyDate(year, month, day, isMetonic) {
  if (typeof isMetonic === "undefined") { isMetonic = false; }
  this.year = year;
  this.day = day;
  this.isMetonic = isMetonic

  if (this.isMetonic) {
    this.startYear = 4999;
    this.startDate = new Date(1999, 4, 22);
    this.months = new colignyYear(year, true).months;
    this.yearDiff = new colignyYear(year, true).yearDiff;
  } else {
    this.startYear = 4998;
    this.startDate = new Date(1998, 4, 3);
    this.months = new colignyYear(year).months;
    this.yearDiff = new colignyYear(year).yearDiff;
  }

  if (year > this.startYear) {
    this.isEarly = false;
  } else {
    this.isEarly = true;
  }

  var monthCheck = 0;

  for (var i = 0; i < this.months.length; i++) {
    if (this.months[i].name === month) {
      this.month = this.months[i];
      monthCheck = 1;
      break;
    }
  }

  if (monthCheck === 0) {
    throw new Error ("Month specified does not exist in the specified year.");
  }

  if ((this.day) > this.month.days) {
    throw new Error ("Day specified outside of date range for this month");
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

  var output = new Date(this.startDate.getTime());
  output.setDate(this.startDate.getDate() + dayCount);
  return output;
}

colignyDate.prototype.inscription = function() {
  var inscrips = {
    "Samonios 1 2":["N DUMANNI", "IVOS"],
    "Samonios 2 2":["ITI MD", "IVOS"],
    "Samonios 3 2":["TII D DUM ALE", "IVOS"],
    "Samonios 4 2":["MD"],
    "Samonios 5 2":["D AMB"],
    "Samonios 6 2":["MD"],
    "Samonios 7 2":["PRINI LOUDIN"],
    "Samonios 8 2":["D DUMANI"],
    "Samonios 9 2":["IIT MD"],
    "Samonios 10 2":["MD"],
    "Samonios 11 2":["D AMB"],
    "Samonios 12 2":["MD"],
    "Samonios 13 2":["TII MD"],
    "Samonios 14 2":["ITI MD"],
    "Samonios 15 2":["IIT MD"],
    "Samonios 16 2":["D DUMANNI"],
    "Samonios 17 2":["IIT MD TRINUX SAM"],
    "Samonios 18 2":["D AMB"],
    "Samonios 19 2":["TII MD"],
    "Samonios 20 2":["ITI D AMB"],
    "Samonios 21 2":["IIT MD"],
    "Samonios 22 2":["D AMB"],
    "Samonios 23 2":["N INIS R"],
    "Samonios 24 2":["N INIS R"],
    "Samonios 25 2":["TII MD"],
    "Samonios 26 2":["ITI D AMB", "IVOS"],
    "Samonios 27 2":["IIT MD", "IVOS"],
    "Samonios 28 2":["D AMB", "IVOS"],
    "Samonios 29 2":["MD", "IVOS"],
    "Samonios 30 2":["D AMB", "IVOS"],
    "Dumanios 1 2":["SAM PRINI LOUD EXO", "IVOS"],
    "Dumanios 2 2":["N", "IVOS"],
    "Dumanios 3 2":["D", "IVOS"],
    "Dumanios 4 2":["D", "IVOS"],
    "Dumanios 5 2":["PRINI LAGET"],
    "Dumanios 6 2":["D"],
    "Dumanios 7 2":["N INIS R"],
    "Dumanios 8 2":["ITI MD SAMONI"],
    "Dumanios 9 2":["D"],
    "Dumanios 10 2":["D"],
    "Dumanios 11 2":["N INIS R"],
    "Dumanios 12 2":["D"],
    "Dumanios 13 2":["D"],
    "Dumanios 14 2":["D"],
    "Dumanios 15 2":["D"],
    "Dumanios 16 2":["MD SAMONI"],
    "Dumanios 17 2":["MD SAMONI"],
    "Dumanios 18 2":["ITI D AMB"],
    "Dumanios 19 2":["IIT D"],
    "Dumanios 20 2":["D AMB"],
    "Dumanios 21 2":["IIT M D"],
    "Dumanios 22 2":["D AMB"],
    "Dumanios 23 2":["TII D"],
    "Dumanios 24 2":["N INIS R"],
    "Dumanios 25 2":["IIT D"],
    "Dumanios 26 2":["D AMB"],
    "Dumanios 27 2":["N INIS R"],
    "Dumanios 28 2":["D AMB"],
    "Dumanios 29 2":["NSDS"],
    "Riuros 1 2":["D ANAGANT"],
    "Riuros 2 2":["PRINI LOUD"],
    "Riuros 3 2":["N"],
    "Riuros 4 2":["(MD) BRIGIOMU RIVRI"],
    "Riuros 5 2":["N INIS R"],
    "Riuros 6 2":["MD"],
    "Riuros 7 2":["MD"],
    "Riuros 8 2":["PRINI LOUD"],
    "Riuros 9 2":["ITI MD"],
    "Riuros 10 2":["IIT MD"],
    "Riuros 11 2":["N INIS R"],
    "Riuros 12 2":["MD"],
    "Riuros 13 2":["DEC/VOR LUG RIV"],
    "Riuros 14 2":["NSDS", "IVOS"],
    "Riuros 15 2":["DSNS", "IVOS"],
    "Riuros 16 2":["MD", "IVOS"],
    "Riuros 17 2":["MD", "IVOS"],
    "Riuros 18 2":["D AMB", "IVOS"],
    "Riuros 19 2":["MD", "IVOS"],
    "Riuros 20 2":["TII D AMB", "IVOS"],
    "Riuros 21 2":["ITT MD"],
    "Riuros 22 2":["IIT D AMB"],
    "Riuros 23 2":["D PETIUX ANAG"],
    "Riuros 24 2":["D AMB"],
    "Riuros 25 2":["IIT MD PETIUX RIVRI"],
    "Riuros 26 2":["TII D AMB", "IVOS"],
    "Riuros 27 2":["ITI MD", "IVOS"],
    "Riuros 28 2":["IIT D AMB", "IVOS"],
    "Riuros 29 2":["MD", "IVOS"],
    "Riuros 30 2":["D AMB", "IVOS"],
    "Anagantios 1 2":["MD RIVRI IX", "IVOS"],
    "Anagantios 2 2":["D", "IVOS"],
    "Anagantios 3 2":["D", "IVOS"],
    "Anagantios 4 2":["N OGIOUMU RIVRI"],
    "Anagantios 5 2":["N INIS R"],
    "Anagantios 6 2":["PRINI LAG"],
    "Anagantios 7 2":["D"],
    "Anagantios 8 2":["D"],
    "Anagantios 9 2":["D"],
    "Anagantios 10 2":["D"],
    "Anagantios 11 2":["D AMB"],
    "Anagantios 12 2":["D"],
    "Anagantios 13 2":["D"],
    "Anagantios 14 2":["D"],
    "Anagantios 15 2":["D"],
    "Anagantios 16 2":["D"],
    "Anagantios 17 2":["D"],
    "Anagantios 18 2":["TII D AMB"],
    "Anagantios 19 2":["ITI D"],
    "Anagantios 20 2":["IIT D AMB"],
    "Anagantios 21 2":["N INIS R"],
    "Anagantios 22 2":["N INIS R"],
    "Anagantios 23 2":["D"],
    "Anagantios 24 2":["N INIS R"],
    "Anagantios 25 2":["ITI D"],
    "Anagantios 26 2":["IIT D AMB"],
    "Anagantios 27 2":["D"],
    "Anagantios 28 2":["D AMB"],
    "Anagantios 29 2":["D"],
    "Ogronios 1 2":["MD"],
    "Ogronios 2 2":["MD"],
    "Ogronios 3 2":["PRINI LOUD"],
    "Ogronios 4 2":["ITI MD"],
    "Ogronios 5 2":["N INIS R"],
    "Ogronios 6 2":["MD"],
    "Ogronios 7 2":["MD"],
    "Ogronios 8 2":["MD"],
    "Ogronios 9 2":["TII MD"],
    "Ogronios 10 2":["ITI MD"],
    "Ogronios 11 2":["IIT D AMB"],
    "Ogronios 12 2":["MD"],
    "Ogronios 13 2":["MD"],
    "Ogronios 14 2":["MD"],
    "Ogronios 15 2":["N"],
    "Ogronios 16 2":["TII MD CVTI"],
    "Ogronios 17 2":["ITI MD CVTI"],
    "Ogronios 18 2":["IIT D CVTI AMB"],
    "Ogronios 19 2":["MD"],
    "Ogronios 20 2":["D AMB"],
    "Ogronios 21 2":["TIT MD"],
    "Ogronios 22 2":["ITI D AMB"],
    "Ogronios 23 2":["ITI MD QVTI"],
    "Ogronios 24 2":["D AMB"],
    "Ogronios 25 2":["MD"],
    "Ogronios 26 2":["D AMB"],
    "Ogronios 27 2":["N INIS R"],
    "Ogronios 28 2":["ITI D AMB"],
    "Ogronios 29 2":["IIT MD"],
    "Ogronios 30 2":["D AMB"],
    "Cutios 1 2":["MD"],
    "Cutios 2 2":["MD"],
    "Cutios 3 2":["MD"],
    "Cutios 4 2":["PRINI LOUD"],
    "Cutios 5 2":["N INIS R"],
    "Cutios 6 2":["N"],
    "Cutios 7 2":["MD"],
    "Cutios 8 2":["MD"],
    "Cutios 9 2":["N INIS R"],
    "Cutios 10 2":["TII MD"],
    "Cutios 11 2":["ITI D AMB"],
    "Cutios 12 2":["IIT MD"],
    "Cutios 13 2":["MD"],
    "Cutios 14 2":["MD"],
    "Cutios 15 2":["MD"],
    "Cutios 16 2":["MD OGRON"],
    "Cutios 17 2":["MD OGRON"],
    "Cutios 18 2":["D OGRON AMB"],
    "Cutios 19 2":["N INIS R"],
    "Cutios 20 2":["D AMB"],
    "Cutios 21 2":["N INIS R"],
    "Cutios 22 2":["TII D AMB"],
    "Cutios 23 2":["IIT MD OGRONI"],
    "Cutios 24 2":["IIT D AMB"],
    "Cutios 25 2":["MD"],
    "Cutios 26 2":["D AMB"],
    "Cutios 27 2":["MD"],
    "Cutios 28 2":["TII D AMB", "IVOS"],
    "Cutios 29 2":["ITI MD", "IVOS"],
    "Cutios 30 2":["IIT D AMB", "IVOS"],
    "Giamonios 1 2":["MD SIMUISONNA EXO", "IVOS"],
    "Giamonios 2 2":["D", "IVOS"],
    "Giamonios 3 2":["D", "IVOS"],
    "Giamonios 4 2":["D"],
    "Giamonios 5 2":["D AMB"],
    "Giamonios 6 2":["D"],
    "Giamonios 7 2":["N PRINI LAG"],
    "Giamonios 8 2":["D"],
    "Giamonios 9 2":["N INIS R"],
    "Giamonios 10 2":["D"],
    "Giamonios 11 2":["D AMB"],
    "Giamonios 12 2":["D"],
    "Giamonios 13 2":["TII D"],
    "Giamonios 14 2":["ITI D"],
    "Giamonios 15 2":["IIT D"],
    "Giamonios 16 2":["D"],
    "Giamonios 17 2":["NSDS"],
    "Giamonios 18 2":["D AMB"],
    "Giamonios 19 2":["TII D"],
    "Giamonios 20 2":["ITI D AMB"],
    "Giamonios 21 2":["IIT D"],
    "Giamonios 22 2":["N INIS R"],
    "Giamonios 23 2":["N INIS R"],
    "Giamonios 24 2":["D AMB"],
    "Giamonios 25 2":["TII D"],
    "Giamonios 26 2":["N INIS R"],
    "Giamonios 27 2":["IIT D"],
    "Giamonios 28 2":["D AMB"],
    "Giamonios 29 2":["D"],
    "Simiuisonna 1 2":["GIAM PRINI LAG"],
    "Simiuisonna 2 2":["MD"],
    "Simiuisonna 3 2":["D EQVI"],
    "Simiuisonna 4 2":["MD"],
    "Simiuisonna 5 2":["N INIS R"],
    "Simiuisonna 6 2":["D EQVI"],
    "Simiuisonna 7 2":["IIT MD TIOCOBREXTIO"],
    "Simiuisonna 8 2":["N"],
    "Simiuisonna 9 2":["MD SINDIU", "IVOS"],
    "Simiuisonna 10 2":["MD"],
    "Simiuisonna 11 2":["TII D AMB"],
    "Simiuisonna 12 2":["ITI MD"],
    "Simiuisonna 13 2":["D EQVI"],
    "Simiuisonna 14 2":["D EQVI"],
    "Simiuisonna 15 2":["D EQVI"],
    "Simiuisonna 16 2":["D EQVI"],
    "Simiuisonna 17 2":["D EQVI"],
    "Simiuisonna 18 2":["D AMB EQVI"],
    "Simiuisonna 19 2":["IIT MD"],
    "Simiuisonna 20 2":["D AMB"],
    "Simiuisonna 21 2":["IIT D EQVI"],
    "Simiuisonna 22 2":["D AMB"],
    "Simiuisonna 23 2":["TII MD"],
    "Simiuisonna 24 2":["ITI D AMB"],
    "Simiuisonna 25 2":["IIT MD"],
    "Simiuisonna 26 2":["D AMB"],
    "Simiuisonna 27 2":["MD"],
    "Simiuisonna 28 2":["D AMB"],
    "Simiuisonna 29 2":["NSDS (AMB)"],
    "Simiuisonna 30 2":["DSNS AMB"],
    "Equos 1 2":["D"],
    "Equos 2 2":["PRINI LAG"],
    "Equos 3 2":["MD SINIVIS"],
    "Equos 4 2":["D"],
    "Equos 5 2":["D AMB"],
    "Equos 6 2":["ITI MD SIMIVISO"],
    "Equos 7 2":["D"],
    "Equos 8 2":["PRINI LAG"],
    "Equos 9 2":["N"],
    "Equos 10 2":["D"],
    "Equos 11 2":["D AMB"],
    "Equos 12 2":["D"],
    "Equos 13 2":["IIT MD SIMI"],
    "Equos 14 2":["MD SIMI"],
    "Equos 15 2":["MD SIMI"],
    "Equos 16 2":["MD SIMIVIS"],
    "Equos 17 2":["TII MD SIMIVIS"],
    "Equos 18 2":["ITI D AMB SIMIVIS"],
    "Equos 19 2":["D"],
    "Equos 20 2":["TII D AMB"],
    "Equos 21 2":["IIT (M)D SIMIVIS"],
    "Equos 22 2":["D AMB"],
    "Equos 23 2":["D"],
    "Equos 24 2":["D AMB"],
    "Equos 25 2":["D"],
    "Equos 26 2":["TII D AMB", "IVOS"],
    "Equos 27 2":["ITI D", "IVOS"],
    "Equos 28 2":["IIT D AMB", "IVOS"],
    "Equos 29 2":["D", "IVOS"],
    "Elembi 1 2":["D", "IVOS"],
    "Elembi 2 2":["D", "IVOS"],
    "Elembi 3 2":["PRINI LAG", "IVOS"],
    "Elembi 4 2":["D", "IVOS"],
    "Elembi 5 2":["D AMB"],
    "Elembi 6 2":["D"],
    "Elembi 7 2":["D"],
    "Elembi 8 2":["D"],
    "Elembi 9 2":["PRINI LAG"],
    "Elembi 10 2":["N INIS R"],
    "Elembi 11 2":["D AMB"],
    "Elembi 12 2":["D"],
    "Elembi 13 2":["D"],
    "Elembi 14 2":["D"],
    "Elembi 15 2":["(N)"],
    "Elembi 16 2":["MD EDRIN"],
    "Elembi 17 2":["MD EDRIN"],
    "Elembi 18 2":["TII D EDRIN AMB"],
    "Elembi 19 2":["D"],
    "Elembi 20 2":["D AMB"],
    "Elembi 21 2":["IIT D"],
    "Elembi 22 2":["D AMB"],
    "Elembi 23 2":["D"],
    "Elembi 24 2":["D AMB"],
    "Elembi 25 2":["D"],
    "Elembi 26 2":["D AMB"],
    "Elembi 27 2":["TII D"],
    "Elembi 28 2":["ITI D AMB"],
    "Elembi 29 2":["IIT D"],
    "Aedrinni 1 2":["D CANTLI", "IVOS"],
    "Aedrinni 2 2":["MD", "IVOS"],
    "Aedrinni 3 2":["MD", "IVOS"],
    "Aedrinni 4 2":["MD"],
    "Aedrinni 5 2":["D AMB"],
    "Aedrinni 6 2":["PRINI LOUD"],
    "Aedrinni 7 2":["ITI MD TIOGBR?"],
    "Aedrinni 8 2":["IIT MD TIOCOBREXTIO"],
    "Aedrinni 9 2":["MD"],
    "Aedrinni 10 2":["MD"],
    "Aedrinni 11 2":["N"],
    "Aedrinni 12 2":["TII MD"],
    "Aedrinni 13 2":["ITI MD"],
    "Aedrinni 14 2":["IIT MD"],
    "Aedrinni 15 2":["MD"],
    "Aedrinni 16 2":["D ELEMB"],
    "Aedrinni 17 2":["D ELEMB"],
    "Aedrinni 18 2":["D ELEMB AMB"],
    "Aedrinni 19 2":["ITI MD"],
    "Aedrinni 20 2":["IIT D AMB"],
    "Aedrinni 21 2":["IIT MD"],
    "Aedrinni 22 2":["D AMB"],
    "Aedrinni 23 2":["MD"],
    "Aedrinni 24 2":["TII D AMB"],
    "Aedrinni 25 2":["ITI D SINDIV", "IVOS"],
    "Aedrinni 26 2":["IIT D AMB"],
    "Aedrinni 27 2":["MD"],
    "Aedrinni 28 2":["D AMB"],
    "Aedrinni 29 2":["MD"],
    "Aedrinni 30 2":["N"],
    "Cantlos 1 2":["MD AEDRIN"],
    "Cantlos 2 2":["D"],
    "Cantlos 3 2":["D"],
    "Cantlos 4 2":["PRINI LAG"],
    "Cantlos 5 2":["D AMB"],
    "Cantlos 6 2":["D"],
    "Cantlos 7 2":["D"],
    "Cantlos 8 2":["D"],
    "Cantlos 9 2":["D"],
    "Cantlos 10 2":["D"],
    "Cantlos 11 2":["D AMB"],
    "Cantlos 12 2":["N"],
    "Cantlos 13 2":["D"],
    "Cantlos 14 2":["D"],
    "Cantlos 15 2":["D TIOCOBREXTIO"],
    "Cantlos 16 2":["D"],
    "Cantlos 17 2":["D"],
    "Cantlos 18 2":["D AMB"],
    "Cantlos 19 2":["N INIS R"],
    "Cantlos 20 2":["D AMB"],
    "Cantlos 21 2":["IIT D"],
    "Cantlos 22 2":["D AMB"],
    "Cantlos 23 2":["D"],
    "Cantlos 24 2":["D AMB"],
    "Cantlos 25 2":["D"],
    "Cantlos 26 2":["D AMB"],
    "Cantlos 27 2":["D"],
    "Cantlos 28 2":["TII D AMB", "IVOS"],
    "Cantlos 29 2":["ITI D", "IVOS"],
    "Samonios 1 3":["N DUMANNI", "IVOS"],
    "Samonios 2 3":["ITI MD", "IVOS"],
    "Samonios 3 3":["TII D DUM ALE", "IVOS"],
    "Samonios 4 3":["MD"],
    "Samonios 5 3":["D AMB"],
    "Samonios 6 3":["MD"],
    "Samonios 7 3":["PRINI LOUDIN"],
    "Samonios 8 3":["D DUMANI"],
    "Samonios 9 3":["IIT MD"],
    "Samonios 10 3":["MD"],
    "Samonios 11 3":["D AMB"],
    "Samonios 12 3":["MD"],
    "Samonios 13 3":["N"],
    "Samonios 14 3":["ITI MD"],
    "Samonios 15 3":["IIT MD"],
    "Samonios 16 3":["D DUMANNI"],
    "Samonios 17 3":["IIT MD TRINUX SAM"],
    "Samonios 18 3":["D AMB"],
    "Samonios 19 3":["TII MD"],
    "Samonios 20 3":["ITI D AMB"],
    "Samonios 21 3":["IIT MD"],
    "Samonios 22 3":["D AMB"],
    "Samonios 23 3":["N INIS R"],
    "Samonios 24 3":["N INIS R"],
    "Samonios 25 3":["TII MD"],
    "Samonios 26 3":["ITI D AMB", "IVOS"],
    "Samonios 27 3":["IIT MD", "IVOS"],
    "Samonios 28 3":["D AMB", "IVOS"],
    "Samonios 29 3":["MD", "IVOS"],
    "Samonios 30 3":["D AMB", "IVOS"],
    "Dumanios 1 3":["SAM PRINI LOUD EXO", "IVOS"],
    "Dumanios 2 3":["N", "IVOS"],
    "Dumanios 3 3":["D", "IVOS"],
    "Dumanios 4 3":["D", "IVOS"],
    "Dumanios 5 3":["PRINI LAGET"],
    "Dumanios 6 3":["D"],
    "Dumanios 7 3":["N INIS R"],
    "Dumanios 8 3":["ITI MD SAMONI"],
    "Dumanios 9 3":["D"],
    "Dumanios 10 3":["D"],
    "Dumanios 11 3":["N INIS R"],
    "Dumanios 12 3":["D"],
    "Dumanios 13 3":["D"],
    "Dumanios 14 3":["N"],
    "Dumanios 15 3":["D"],
    "Dumanios 16 3":["MD SAMONI"],
    "Dumanios 17 3":["MD SAMONI"],
    "Dumanios 18 3":["D AMB"],
    "Dumanios 19 3":["D"],
    "Dumanios 20 3":["D AMB"],
    "Dumanios 21 3":["IIT D"],
    "Dumanios 22 3":["D AMB"],
    "Dumanios 23 3":["D"],
    "Dumanios 24 3":["N INIS R"],
    "Dumanios 25 3":["D"],
    "Dumanios 26 3":["D AMB (N AMB)"],
    "Dumanios 27 3":["N INIS R"],
    "Dumanios 28 3":["D AMB"],
    "Dumanios 29 3":["D"],
    "Riuros 1 3":["D ANAGANT"],
    "Riuros 2 3":["PRINI LOUD"],
    "Riuros 3 3":["N"],
    "Riuros 4 3":["(MD) BRIGIOMU RIVRI"],
    "Riuros 5 3":["N INIS R"],
    "Riuros 6 3":["MD"],
    "Riuros 7 3":["MD"],
    "Riuros 8 3":["PRINI LOUD"],
    "Riuros 9 3":["ITI MD"],
    "Riuros 10 3":["IIT MD"],
    "Riuros 11 3":["N INIS R"],
    "Riuros 12 3":["MD"],
    "Riuros 13 3":["DEC/VOR LUG RIV"],
    "Riuros 14 3":["NSDS", "IVOS"],
    "Riuros 15 3":["N", "IVOS"],
    "Riuros 16 3":["MD", "IVOS"],
    "Riuros 17 3":["MD", "IVOS"],
    "Riuros 18 3":["D AMB", "IVOS"],
    "Riuros 19 3":["MD", "IVOS"],
    "Riuros 20 3":["TII D AMB", "IVOS"],
    "Riuros 21 3":["ITT MD"],
    "Riuros 22 3":["IIT D AMB"],
    "Riuros 23 3":["D PETIUX ANAG"],
    "Riuros 24 3":["N"],
    "Riuros 25 3":["IIT MD PETIUX RIVRI"],
    "Riuros 26 3":["TII D AMB", "IVOS"],
    "Riuros 27 3":["ITI MD", "IVOS"],
    "Riuros 28 3":["IIT D AMB", "IVOS"],
    "Riuros 29 3":["MD", "IVOS"],
    "Riuros 30 3":["D AMB", "IVOS"],
    "Anagantios 1 3":["MD RIVRI IX", "IVOS"],
    "Anagantios 2 3":["D", "IVOS"],
    "Anagantios 3 3":["D", "IVOS"],
    "Anagantios 4 3":["N OGIOUMU RIVRI"],
    "Anagantios 5 3":["N INIS R"],
    "Anagantios 6 3":["PRINI LAG"],
    "Anagantios 7 3":["NSDS"],
    "Anagantios 8 3":["D"],
    "Anagantios 9 3":["D"],
    "Anagantios 10 3":["D"],
    "Anagantios 11 3":["D AMB"],
    "Anagantios 12 3":["D"],
    "Anagantios 13 3":["D"],
    "Anagantios 14 3":["D"],
    "Anagantios 15 3":["D"],
    "Anagantios 16 3":["N"],
    "Anagantios 17 3":["D"],
    "Anagantios 18 3":["D AMB"],
    "Anagantios 19 3":["D"],
    "Anagantios 20 3":["D AMB"],
    "Anagantios 21 3":["N INIS R"],
    "Anagantios 22 3":["N INIS R"],
    "Anagantios 23 3":["D"],
    "Anagantios 24 3":["N INIS R"],
    "Anagantios 25 3":["D"],
    "Anagantios 26 3":["D AMB"],
    "Anagantios 27 3":["D"],
    "Anagantios 28 3":["D AMB"],
    "Anagantios 29 3":["D"],
    "Ogronios 1 3":["MD"],
    "Ogronios 2 3":["MD"],
    "Ogronios 3 3":["PRINI LOUD"],
    "Ogronios 4 3":["ITI MD"],
    "Ogronios 5 3":["N INIS R"],
    "Ogronios 6 3":["MD"],
    "Ogronios 7 3":["MD"],
    "Ogronios 8 3":["MD"],
    "Ogronios 9 3":["TII MD"],
    "Ogronios 10 3":["ITI MD"],
    "Ogronios 11 3":["IIT D AMB"],
    "Ogronios 12 3":["MD"],
    "Ogronios 13 3":["MD"],
    "Ogronios 14 3":["MD"],
    "Ogronios 15 3":["N"],
    "Ogronios 16 3":["TII MD CVTI"],
    "Ogronios 17 3":["N CVTI"],
    "Ogronios 18 3":["IIT D CVTI AMB"],
    "Ogronios 19 3":["MD"],
    "Ogronios 20 3":["D AMB"],
    "Ogronios 21 3":["TIT MD"],
    "Ogronios 22 3":["ITI D AMB"],
    "Ogronios 23 3":["ITI MD QVTI"],
    "Ogronios 24 3":["D AMB"],
    "Ogronios 25 3":["MD"],
    "Ogronios 26 3":["D AMB"],
    "Ogronios 27 3":["N INIS R"],
    "Ogronios 28 3":["ITI D AMB"],
    "Ogronios 29 3":["IIT MD"],
    "Ogronios 30 3":["D AMB"],
    "Cutios 1 3":["MD"],
    "Cutios 2 3":["MD"],
    "Cutios 3 3":["MD"],
    "Cutios 4 3":["PRINI LOUD"],
    "Cutios 5 3":["N INIS R"],
    "Cutios 6 3":["N"],
    "Cutios 7 3":["MD"],
    "Cutios 8 3":["MD"],
    "Cutios 9 3":["N INIS R"],
    "Cutios 10 3":["TII MD"],
    "Cutios 11 3":["ITI D AMB"],
    "Cutios 12 3":["IIT MD"],
    "Cutios 13 3":["MD"],
    "Cutios 14 3":["MD"],
    "Cutios 15 3":["MD"],
    "Cutios 16 3":["MD OGRON"],
    "Cutios 17 3":["MD OGRON"],
    "Cutios 18 3":["N OGRON"],
    "Cutios 19 3":["N INIS R"],
    "Cutios 20 3":["D AMB"],
    "Cutios 21 3":["N INIS R"],
    "Cutios 22 3":["TII D AMB"],
    "Cutios 23 3":["IIT MD OGRONI"],
    "Cutios 24 3":["IIT D AMB"],
    "Cutios 25 3":["MD"],
    "Cutios 26 3":["D AMB"],
    "Cutios 27 3":["MD"],
    "Cutios 28 3":["TII D AMB", "IVOS"],
    "Cutios 29 3":["ITI MD", "IVOS"],
    "Cutios 30 3":["IIT D AMB", "IVOS"],
    "Rantaranos 1 3":["D SAMON DUMAN", "IVOS"],
    "Rantaranos 2 3":["D DUMANI", "IVOS"],
    "Rantaranos 3 3":["(ITI) MD RIVRI", "IVOS"],
    "Rantaranos 4 3":["MD OCIOMV RIVRI AN\n--]T ANAG"],
    "Rantaranos 5 3":["N OGRON\nINNIS R"],
    "Rantaranos 6 3":["(IIT) MD CUTI"],
    "Rantaranos 7 3":["GIAMON PRINI LAG\n[---\n[---"],
    "Rantaranos 8 3":["D GIAM SIMVIS"],
    "Rantaranos 9 3":["N GIAMO EQVI\nINNIS R"],
    "Rantaranos 10 3":["N ELEMB INIS R"],
    "Rantaranos 11 3":["D EDRINI AMB"],
    "Rantaranos 12 3":["IIT D CANTLI"],
    "Rantaranos 13 3":["TII MD SAMONI"],
    "Rantaranos 14 3":["D DUMANNI"],
    "Rantaranos 15 3":["DS MD NS RIVR"],
    "Rantaranos 16 3":["D ANAGAN"],
    "Rantaranos 17 3":["ITI MD QVTI OGRON"],
    "Rantaranos 18 3":["D OGRONI QVT (AMB)"],
    "Rantaranos 19 3":["D GIAMONI"],
    "Rantaranos 20 3":["D SIMIS AMB"],
    "Rantaranos 21 3":["IIT D SIMIS EQUI"],
    "Rantaranos 22 3":["N GIAMONI\nELEMBI"],
    "Rantaranos 23 3":["N GIAMONI\nAEDRINNI"],
    "Rantaranos 24 3":["D GIAMO CANT\nAMB RIXR"],
    "Rantaranos 25 3":["TII MD SAMON"],
    "Rantaranos 26 3":["D DUMAN AMB"],
    "Rantaranos 27 3":["ITI MD RIVRI"],
    "Rantaranos 28 3":["D ANAG AMB"],
    "Rantaranos 29 3":["IIT D M OGRONV"],
    "Rantaranos 30 3":["IIT D AMB QVT"],
    "Giamonios 1 3":["MD SIMUISONNA"],
    "Giamonios 2 3":["D"],
    "Giamonios 3 3":["D"],
    "Giamonios 4 3":["D"],
    "Giamonios 5 3":["D AMB"],
    "Giamonios 6 3":["D"],
    "Giamonios 7 3":["IIT MD SIMIU TIOCOBREXTIO"],
    "Giamonios 8 3":["MD SIMIUSONNA"],
    "Giamonios 9 3":["MD SIMIU SINDIU", "IVOS"],
    "Giamonios 10 3":["D"],
    "Giamonios 11 3":["D AMB"],
    "Giamonios 12 3":["D"],
    "Giamonios 13 3":["D"],
    "Giamonios 14 3":["D"],
    "Giamonios 15 3":["D"],
    "Giamonios 16 3":["D"],
    "Giamonios 17 3":["NSDS"],
    "Giamonios 18 3":["D AMB"],
    "Giamonios 19 3":["D"],
    "Giamonios 20 3":["D AMB"],
    "Giamonios 21 3":["IIT D"],
    "Giamonios 22 3":["D SIMIUI AMB"],
    "Giamonios 23 3":["TII MD SIMIUISONNA"],
    "Giamonios 24 3":["ITI D SIMIUIS AMB"],
    "Giamonios 25 3":["D"],
    "Giamonios 26 3":["N INIS R"],
    "Giamonios 27 3":["D"],
    "Giamonios 28 3":["D AMB"],
    "Giamonios 29 3":["D"],
    "Simiuisonna 1 3":["GIAM PRINI LAG"],
    "Simiuisonna 2 3":["MD"],
    "Simiuisonna 3 3":["D EQVI"],
    "Simiuisonna 4 3":["MD"],
    "Simiuisonna 5 3":["N INIS R"],
    "Simiuisonna 6 3":["D EQVI"],
    "Simiuisonna 7 3":["D EQVI"],
    "Simiuisonna 8 3":["PRINI LAG EQVI"],
    "Simiuisonna 9 3":["D EQVI"],
    "Simiuisonna 10 3":["MD"],
    "Simiuisonna 11 3":["TII D AMB"],
    "Simiuisonna 12 3":["ITI MD"],
    "Simiuisonna 13 3":["D EQVI"],
    "Simiuisonna 14 3":["NSDS EQVI"],
    "Simiuisonna 15 3":["DSND EQVI"],
    "Simiuisonna 16 3":["D EQVI"],
    "Simiuisonna 17 3":["D EQVI"],
    "Simiuisonna 18 3":["D EQVI AMB"],
    "Simiuisonna 19 3":["IIT MD"],
    "Simiuisonna 20 3":["D AMB"],
    "Simiuisonna 21 3":["ITT D EQVI"],
    "Simiuisonna 22 3":["D EQVI AMB"],
    "Simiuisonna 23 3":["D EQVI"],
    "Simiuisonna 24 3":["D AMB EQVI"],
    "Simiuisonna 25 3":["IIT MD"],
    "Simiuisonna 26 3":["D AMB", "IVOS"],
    "Simiuisonna 27 3":["MD", "IVOS"],
    "Simiuisonna 28 3":["D AMB", "IVOS"],
    "Simiuisonna 29 3":["NSDS", "IVOS"],
    "Simiuisonna 30 3":["DSNS", "IVOS"],
    "Equos 1 3":["D", "IVOS"],
    "Equos 2 3":["PRINI LAG", "IVOS"],
    "Equos 3 3":["MD SIMIVIS", "IVOS"],
    "Equos 4 3":["D", "IVOS"],
    "Equos 5 3":["D AMB"],
    "Equos 6 3":["ITI MD SIMIVISO"],
    "Equos 7 3":["D ELEMB"],
    "Equos 8 3":["D ELEMB"],
    "Equos 9 3":["D ELEMB"],
    "Equos 10 3":["D"],
    "Equos 11 3":["D AMB"],
    "Equos 12 3":["D"],
    "Equos 13 3":["IIT MD SIMI"],
    "Equos 14 3":["MD SIMI"],
    "Equos 15 3":["MD SIMI"],
    "Equos 16 3":["MD SIMIVIS"],
    "Equos 17 3":["TII MD SIMIVIS"],
    "Equos 18 3":["ITI D AMB SIMIVIS"],
    "Equos 19 3":["D"],
    "Equos 20 3":["TII D AMB"],
    "Equos 21 3":["IIT MD SIMIVIS"],
    "Equos 22 3":["D ELEMB AMB"],
    "Equos 23 3":["D ELEMB"],
    "Equos 24 3":["D AMB ELEMB"],
    "Equos 25 3":["D"],
    "Equos 26 3":["D AMB"],
    "Equos 27 3":["D"],
    "Equos 28 3":["D AMB"],
    "Equos 29 3":["D"],
    "Elembi 1 3":["D", "IVOS"],
    "Elembi 2 3":["D", "IVOS"],
    "Elembi 3 3":["PRINI LAG", "IVOS"],
    "Elembi 4 3":["D"],
    "Elembi 5 3":["D AMB"],
    "Elembi 6 3":["D"],
    "Elembi 7 3":["ITI MD EDRINNI TIOGBR?"],
    "Elembi 8 3":["IIT MD EDRI TIOCOBREXTIO"],
    "Elembi 9 3":["MD EDRINNI"],
    "Elembi 10 3":["N INIS R"],
    "Elembi 11 3":["D"],
    "Elembi 12 3":["D"],
    "Elembi 13 3":["D"],
    "Elembi 14 3":["D"],
    "Elembi 15 3":["D"],
    "Elembi 16 3":["MD EDRIN"],
    "Elembi 17 3":["MD EDRIN"],
    "Elembi 18 3":["TII D EDRIN AMB"],
    "Elembi 19 3":["D"],
    "Elembi 20 3":["D AMB"],
    "Elembi 21 3":["IIT D"],
    "Elembi 22 3":["D EDRIN AMB"],
    "Elembi 23 3":["MD EDRINI"],
    "Elembi 24 3":["TII D AMB EDRINI"],
    "Elembi 25 3":["D SINDIU IVOS"],
    "Elembi 26 3":["D AMB"],
    "Elembi 27 3":["D"],
    "Elembi 28 3":["D AMB"],
    "Elembi 29 3":["D"],
    "Aedrinni 1 3":["D CANTLI"],
    "Aedrinni 2 3":["MD"],
    "Aedrinni 3 3":["MD"],
    "Aedrinni 4 3":["MD"],
    "Aedrinni 5 3":["D AMB"],
    "Aedrinni 6 3":["PRINI LOUD"],
    "Aedrinni 7 3":["D CANTI"],
    "Aedrinni 8 3":["D CANTI"],
    "Aedrinni 9 3":["D CANTI"],
    "Aedrinni 10 3":["MD"],
    "Aedrinni 11 3":["D AMB"],
    "Aedrinni 12 3":["TII MD"],
    "Aedrinni 13 3":["ITI MD"],
    "Aedrinni 14 3":["IIT MD"],
    "Aedrinni 15 3":["MD"],
    "Aedrinni 16 3":["D ELEMB"],
    "Aedrinni 17 3":["D ELEMB"],
    "Aedrinni 18 3":["D AMB ELEMB"],
    "Aedrinni 19 3":["ITI MD"],
    "Aedrinni 20 3":["IIT D AMB"],
    "Aedrinni 21 3":["IIT MD"],
    "Aedrinni 22 3":["D CANTLAMB"],
    "Aedrinni 23 3":["D CANTL"],
    "Aedrinni 24 3":["D CANTLAMB"],
    "Aedrinni 25 3":["ITI MD"],
    "Aedrinni 26 3":["IIT D AMB"],
    "Aedrinni 27 3":["MD"],
    "Aedrinni 28 3":["D AMB", "IVOS"],
    "Aedrinni 29 3":["MD", "IVOS"],
    "Aedrinni 30 3":["N", "IVOS"],
    "Cantlos 1 3":["MD AEDRIN", "IVOS"],
    "Cantlos 2 3":["D", "IVOS"],
    "Cantlos 3 3":["D", "IVOS"],
    "Cantlos 4 3":["PRINI LAG"],
    "Cantlos 5 3":["D AMB"],
    "Cantlos 6 3":["D"],
    "Cantlos 7 3":["SAMON PRINI LOUD"],
    "Cantlos 8 3":["D DUMANNI (SAMONI)"],
    "Cantlos 9 3":["MD SAMONI"],
    "Cantlos 10 3":["D"],
    "Cantlos 11 3":["D AMB"],
    "Cantlos 12 3":["D"],
    "Cantlos 13 3":["D"],
    "Cantlos 14 3":["D"],
    "Cantlos 15 3":["D TIOCOBREXTIO"],
    "Cantlos 16 3":["D"],
    "Cantlos 17 3":["D"],
    "Cantlos 18 3":["D AMB"],
    "Cantlos 19 3":["N INIS R"],
    "Cantlos 20 3":["D AMB"],
    "Cantlos 21 3":["IIT D"],
    "Cantlos 22 3":["D AMB SAMONI"],
    "Cantlos 23 3":["N SAMONI INIS R"],
    "Cantlos 24 3":["N SAMONI INIS R"],
    "Cantlos 25 3":["D"],
    "Cantlos 26 3":["D AMB", "IVOS"],
    "Cantlos 27 3":["D", "IVOS"],
    "Cantlos 28 3":["D AMB", "IVOS"],
    "Cantlos 29 3":["D", "IVOS"],
    "Samonios 1 4":["D DUMANNI", "IVOS"],
    "Samonios 2 4":["MD", "IVOS"],
    "Samonios 3 4":["D EXINGI DUM", "IVOS"],
    "Samonios 4 4":["MD", "IVOS"],
    "Samonios 5 4":["D AMB"],
    "Samonios 6 4":["MD"],
    "Samonios 7 4":["N DUMAN INIS R"],
    "Samonios 8 4":["MD SAMONI"],
    "Samonios 9 4":["D DUMANI"],
    "Samonios 10 4":["MD"],
    "Samonios 11 4":["D AMB"],
    "Samonios 12 4":["MD"],
    "Samonios 13 4":["TII MD"],
    "Samonios 14 4":["ITI MD"],
    "Samonios 15 4":["IIT MD"],
    "Samonios 16 4":["D DUMANI"],
    "Samonios 17 4":["(M)D PRINI (TRINUX) SAM SINDIV", "(IVOS)"],
    "Samonios 18 4":["D AMB"],
    "Samonios 19 4":["TII MD"],
    "Samonios 20 4":["ITI D AMB"],
    "Samonios 21 4":["IIT MD"],
    "Samonios 22 4":["D DUM AMB"],
    "Samonios 23 4":["D DUMANI"],
    "Samonios 24 4":["N DUM INIS R"],
    "Samonios 25 4":["TII MD"],
    "Samonios 26 4":["ITI D AMB"],
    "Samonios 27 4":["IIT MD"],
    "Samonios 28 4":["D AMB"],
    "Samonios 29 4":["MD"],
    "Samonios 30 4":["D AMB"],
    "Dumanios 1 4":["SAMON PRINI LOUD"],
    "Dumanios 2 4":["D"],
    "Dumanios 3 4":["D"],
    "Dumanios 4 4":["D"],
    "Dumanios 5 4":["PRINI LAG"],
    "Dumanios 6 4":["D"],
    "Dumanios 7 4":["MD RIVRI"],
    "Dumanios 8 4":["MD RIVRI"],
    "Dumanios 9 4":["MD RIVRI"],
    "Dumanios 10 4":["D"],
    "Dumanios 11 4":["N INIS R"],
    "Dumanios 12 4":["D"],
    "Dumanios 13 4":["D", "IVOS"],
    "Dumanios 14 4":["D", "IVOS"],
    "Dumanios 15 4":["D", "IVOS"],
    "Dumanios 16 4":["MD SAMONI", "IVOS"],
    "Dumanios 17 4":["MD SAMONI", "IVOS"],
    "Dumanios 18 4":["D AMB", "IVOS"],
    "Dumanios 19 4":["D", "IVOS"],
    "Dumanios 20 4":["D AMB", "IVOS"],
    "Dumanios 21 4":["IIT D"],
    "Dumanios 22 4":["IIT D RIVRI AMB"],
    "Dumanios 23 4":["D PETIUX RIV ANAG"],
    "Dumanios 24 4":["D AMB RIVRI"],
    "Dumanios 25 4":["D"],
    "Dumanios 26 4":["D AMB", "[IVOS]"],
    "Dumanios 27 4":["N INIS R", "[IVOS]"],
    "Dumanios 28 4":["D AMB", "IVOS"],
    "Dumanios 29 4":["D", "IVOS"],
    "Riuros 1 4":["D ANAGANT EXO", "IVOS"],
    "Riuros 2 4":["PRINI LOUD", "IVOS"],
    "Riuros 3 4":["MD", "IVOS"],
    "Riuros 4 4":["(MD) BRIGIOMU RIVRI"],
    "Riuros 5 4":["N INIS R"],
    "Riuros 6 4":["MD"],
    "Riuros 7 4":["D ANAGANTIOS"],
    "Riuros 8 4":["D ANAGANT"],
    "Riuros 9 4":["D ANAGANT"],
    "Riuros 10 4":["MD"],
    "Riuros 11 4":["N INIS R"],
    "Riuros 12 4":["MD"],
    "Riuros 13 4":["DEC/VOR LUG RIVRI"],
    "Riuros 14 4":["NSDS MAT"],
    "Riuros 15 4":["DS MAT NS"],
    "Riuros 16 4":["MD"],
    "Riuros 17 4":["MD"],
    "Riuros 18 4":["D AMB"],
    "Riuros 19 4":["MD"],
    "Riuros 20 4":["TII D AMB"],
    "Riuros 21 4":["ITT MD"],
    "Riuros 22 4":["N ANAG INIS R"],
    "Riuros 23 4":["D ANAG"],
    "Riuros 24 4":["N ANAG INIS R"],
    "Riuros 25 4":["MD PETIUX RIVRI"],
    "Riuros 26 4":["TII D AMB"],
    "Riuros 27 4":["ITI MD"],
    "Riuros 28 4":["IIT D AMB"],
    "Riuros 29 4":["MD"],
    "Riuros 30 4":["D"],
    "Anagantios 1 4":["MD RIVRI"],
    "Anagantios 2 4":["D"],
    "Anagantios 3 4":["D"],
    "Anagantios 4 4":["MD OGIOUMU RIVRI"],
    "Anagantios 5 4":["N INIS R"],
    "Anagantios 6 4":["PRINI LAG (ANAG)"],
    "Anagantios 7 4":["MD OGRONI"],
    "Anagantios 8 4":["MD OGRONI"],
    "Anagantios 9 4":["MD OGRONI"],
    "Anagantios 10 4":["D"],
    "Anagantios 11 4":["D AMB"],
    "Anagantios 12 4":["D"],
    "Anagantios 13 4":["D"],
    "Anagantios 14 4":["D"],
    "Anagantios 15 4":["D"],
    "Anagantios 16 4":["D"],
    "Anagantios 17 4":["D"],
    "Anagantios 18 4":["D AMB"],
    "Anagantios 19 4":["D"],
    "Anagantios 20 4":["D AMB"],
    "Anagantios 21 4":["N INIS R"],
    "Anagantios 22 4":["ITI D AMB OGRON"],
    "Anagantios 23 4":["ITI MD CVTI OGRON"],
    "Anagantios 24 4":["D OGRON AMB"],
    "Anagantios 25 4":["NSDS"],
    "Anagantios 26 4":["D AMB"],
    "Anagantios 27 4":["D"],
    "Anagantios 28 4":["D AMB"],
    "Anagantios 29 4":["D"],
    "Ogronios 1 4":["MD"],
    "Ogronios 2 4":["MD"],
    "Ogronios 3 4":["PRINI LOUD"],
    "Ogronios 4 4":["MD"],
    "Ogronios 5 4":["N INIS R"],
    "Ogronios 6 4":["MD"],
    "Ogronios 7 4":["MD CVTIO"],
    "Ogronios 8 4":["MD CVTIO"],
    "Ogronios 9 4":["N CVTIO INIS R"],
    "Ogronios 10 4":["MD"],
    "Ogronios 11 4":["D AMB"],
    "Ogronios 12 4":["MD"],
    "Ogronios 13 4":["MD"],
    "Ogronios 14 4":["MD"],
    "Ogronios 15 4":["N"],
    "Ogronios 16 4":["TII MD CVTI"],
    "Ogronios 17 4":["ITI MD CVTI"],
    "Ogronios 18 4":["TII D CVTI AMB"],
    "Ogronios 19 4":["MD"],
    "Ogronios 20 4":["D AMB"],
    "Ogronios 21 4":["TIT MD"],
    "Ogronios 22 4":["TII D AMB QVTI"],
    "Ogronios 23 4":["ITI MD OGRON QVTI"],
    "Ogronios 24 4":["IIT D AMB QVTI"],
    "Ogronios 25 4":["MD"],
    "Ogronios 26 4":["D AMB"],
    "Ogronios 27 4":["N INIS R"],
    "Ogronios 28 4":["ITI D AMB", "IVOS"],
    "Ogronios 29 4":["IIT MD", "IVOS"],
    "Ogronios 30 4":["D AMB", "IVOS"],
    "Cutios 1 4":["MD"],
    "Cutios 2 4":["MD"],
    "Cutios 3 4":["MD"],
    "Cutios 4 4":["PRINI LOUD"],
    "Cutios 5 4":["N INIS R"],
    "Cutios 6 4":["MD"],
    "Cutios 7 4":["MD CVTIO"],
    "Cutios 8 4":["MD CVTIO"],
    "Cutios 9 4":["N CVTIO INIS R"],
    "Cutios 10 4":["MD"],
    "Cutios 11 4":["D AMB"],
    "Cutios 12 4":["MD"],
    "Cutios 13 4":["MD"],
    "Cutios 14 4":["MD"],
    "Cutios 15 4":["MD"],
    "Cutios 16 4":["MD OGRON"],
    "Cutios 17 4":["MD OGRON"],
    "Cutios 18 4":["D OGRON AMB"],
    "Cutios 19 4":["N INIS R"],
    "Cutios 20 4":["D AMB"],
    "Cutios 21 4":["N INIS R"],
    "Cutios 22 4":["TII D AMB QVTI"],
    "Cutios 23 4":["ITI MD OGRON QVTIO"],
    "Cutios 24 4":["TII D AMB QVTI"],
    "Cutios 25 4":["MD"],
    "Cutios 26 4":["D AMB"],
    "Cutios 27 4":["MD"],
    "Cutios 28 4":["TII D AMB", "IVOS"],
    "Cutios 29 4":["ITI MD", "IVOS"],
    "Cutios 30 4":["IIT D AMB", "IVOS"],
    "Giamonios 1 4":["N SIMIUISONNA EXO", "IVOS"],
    "Giamonios 2 4":["ITI D", "IVOS"],
    "Giamonios 3 4":["IIT D", "IVOS"],
    "Giamonios 4 4":["D"],
    "Giamonios 5 4":["D AMB"],
    "Giamonios 6 4":["D"],
    "Giamonios 7 4":["PRINI LAG"],
    "Giamonios 8 4":["ITI D"],
    "Giamonios 9 4":["N INIS R"],
    "Giamonios 10 4":["D"],
    "Giamonios 11 4":["D AMB"],
    "Giamonios 12 4":["D"],
    "Giamonios 13 4":["TII D"],
    "Giamonios 14 4":["ITI D"],
    "Giamonios 15 4":["IIT D"],
    "Giamonios 16 4":["D"],
    "Giamonios 17 4":["NSDS"],
    "Giamonios 18 4":["D AMB"],
    "Giamonios 19 4":["TII D"],
    "Giamonios 20 4":["ITI D AMB"],
    "Giamonios 21 4":["IIT D"],
    "Giamonios 22 4":["N INIS R"],
    "Giamonios 23 4":["N INIS R"],
    "Giamonios 24 4":["D AMB"],
    "Giamonios 25 4":["TII D"],
    "Giamonios 26 4":["N INIS R"],
    "Giamonios 27 4":["IIT D"],
    "Giamonios 28 4":["D AMB"],
    "Giamonios 29 4":["D"],
    "Simiuisonna 1 4":["GIAM PRINI LAG"],
    "Simiuisonna 2 4":["N"],
    "Simiuisonna 3 4":["ITI D EQVI"],
    "Simiuisonna 4 4":["MD"],
    "Simiuisonna 5 4":["N INIS R"],
    "Simiuisonna 6 4":["D EQVI"],
    "Simiuisonna 7 4":["MD TIOCOBREXTIO"],
    "Simiuisonna 8 4":["MD"],
    "Simiuisonna 9 4":["MD SINIDIU", "IVOS"],
    "Simiuisonna 10 4":["MD"],
    "Simiuisonna 11 4":["D AMB"],
    "Simiuisonna 12 4":["MD"],
    "Simiuisonna 13 4":["D EQVI"],
    "Simiuisonna 14 4":["NSDS EQVI"],
    "Simiuisonna 15 4":["DSNS EQVI"],
    "Simiuisonna 16 4":["D EQVI"],
    "Simiuisonna 17 4":["D EQVI"],
    "Simiuisonna 18 4":["D AMB EQVI"],
    "Simiuisonna 19 4":["IIT MD"],
    "Simiuisonna 20 4":["D AMB"],
    "Simiuisonna 21 4":["ITT D EQVI"],
    "Simiuisonna 22 4":["D AMB"],
    "Simiuisonna 23 4":["TII MD"],
    "Simiuisonna 24 4":["ITI D AMB"],
    "Simiuisonna 25 4":["IIT MD"],
    "Simiuisonna 26 4":["D AMB"],
    "Simiuisonna 27 4":["MD"],
    "Simiuisonna 28 4":["D AMB"],
    "Simiuisonna 29 4":["NSDS"],
    "Simiuisonna 30 4":["DSNS"],
    "Equos 1 4":["D"],
    "Equos 2 4":["PRINI LAG"],
    "Equos 3 4":["N SIMIVIS"],
    "Equos 4 4":["IIT D"],
    "Equos 5 4":["D AMB"],
    "Equos 6 4":["MD SIMIVISO"],
    "Equos 7 4":["D"],
    "Equos 8 4":["PRINI LAG"],
    "Equos 9 4":["ITI D"],
    "Equos 10 4":["IIT D"],
    "Equos 11 4":["D AMB"],
    "Equos 12 4":["D"],
    "Equos 13 4":["MD SIMI"],
    "Equos 14 4":["MD SIMI"],
    "Equos 15 4":["MD SIMI"],
    "Equos 16 4":["MD SIMIVIS"],
    "Equos 17 4":["TII MD SIMIVIS"],
    "Equos 18 4":["ITI D AMB SIMIVIS"],
    "Equos 19 4":["D"],
    "Equos 20 4":["TII D AMB"],
    "Equos 21 4":["IIT MD SIMIVIS"],
    "Equos 22 4":["IIT D AMB"],
    "Equos 23 4":["D"],
    "Equos 24 4":["D AMB"],
    "Equos 25 4":["D"],
    "Equos 26 4":["TII D AMB", "IVOS"],
    "Equos 27 4":["ITI D", "IVOS"],
    "Equos 28 4":["IIT D AMB", "IVOS"],
    "Equos 29 4":["D", "IVOS"],
    "Elembi 1 4":["D", "IVOS"],
    "Elembi 2 4":["D", "IVOS"],
    "Elembi 3 4":["PRINI LAG", "IVOS"],
    "Elembi 4 4":["N", "IVOS"],
    "Elembi 5 4":["IIT D AMB"],
    "Elembi 6 4":["D"],
    "Elembi 7 4":["D"],
    "Elembi 8 4":["D"],
    "Elembi 9 4":["PRINI LAG"],
    "Elembi 10 4":["N INIS R"],
    "Elembi 11 4":["IIT D AMB"],
    "Elembi 12 4":["D"],
    "Elembi 13 4":["D"],
    "Elembi 14 4":["D"],
    "Elembi 15 4":["N"],
    "Elembi 16 4":["MD EDRIN"],
    "Elembi 17 4":["MD EDRIN"],
    "Elembi 18 4":["TII D EDRIN AMB"],
    "Elembi 19 4":["D"],
    "Elembi 20 4":["D AMB"],
    "Elembi 21 4":["TIT D"],
    "Elembi 22 4":["ITI D AMB"],
    "Elembi 23 4":["IIT D"],
    "Elembi 24 4":["D AMB"],
    "Elembi 25 4":["D"],
    "Elembi 26 4":["D AMB"],
    "Elembi 27 4":["TII D"],
    "Elembi 28 4":["ITI D AMB"],
    "Elembi 29 4":["IIT D"],
    "Aedrinni 1 4":["D CANTLI", "IVOS"],
    "Aedrinni 2 4":["MD", "IVOS"],
    "Aedrinni 3 4":["MD", "IVOS"],
    "Aedrinni 4 4":["MD"],
    "Aedrinni 5 4":["N"],
    "Aedrinni 6 4":["PRINI LOUD"],
    "Aedrinni 7 4":["MD [TIOGBR?]"],
    "Aedrinni 8 4":["MD TIOCOBREXTIO"],
    "Aedrinni 9 4":["MD"],
    "Aedrinni 10 4":["MD"],
    "Aedrinni 11 4":["D AMB"],
    "Aedrinni 12 4":["MD"],
    "Aedrinni 13 4":["MD"],
    "Aedrinni 14 4":["MD"],
    "Aedrinni 15 4":["MD"],
    "Aedrinni 16 4":["D ELEMB"],
    "Aedrinni 17 4":["D ELEMB"],
    "Aedrinni 18 4":["D ELEMB AMB"],
    "Aedrinni 19 4":["ITI MD"],
    "Aedrinni 20 4":["IIT D AMB"],
    "Aedrinni 21 4":["IIT MD"],
    "Aedrinni 22 4":["D AMB"],
    "Aedrinni 23 4":["MD"],
    "Aedrinni 24 4":["TII D AMB"],
    "Aedrinni 25 4":["ITI D SINDIV", "IVOS"],
    "Aedrinni 26 4":["IIT D AMB"],
    "Aedrinni 27 4":["MD"],
    "Aedrinni 28 4":["D AMB"],
    "Aedrinni 29 4":["MD"],
    "Aedrinni 30 4":["N"],
    "Cantlos 1 4":["MD AEDRIN"],
    "Cantlos 2 4":["D"],
    "Cantlos 3 4":["D"],
    "Cantlos 4 4":["PRINI LAG"],
    "Cantlos 5 4":["ITI D AMB"],
    "Cantlos 6 4":["N"],
    "Cantlos 7 4":["D"],
    "Cantlos 8 4":["D"],
    "Cantlos 9 4":["D"],
    "Cantlos 10 4":["TII D"],
    "Cantlos 11 4":["ITI D AMB"],
    "Cantlos 12 4":["IIT D"],
    "Cantlos 13 4":["D"],
    "Cantlos 14 4":["D"],
    "Cantlos 15 4":["D TIOCOBREXTIO"],
    "Cantlos 16 4":["TII D"],
    "Cantlos 17 4":["ITI D"],
    "Cantlos 18 4":["IIT D AMB"],
    "Cantlos 19 4":["N INIS R"],
    "Cantlos 20 4":["D AMB"],
    "Cantlos 21 4":["IIT D"],
    "Cantlos 22 4":["TII D AMB"],
    "Cantlos 23 4":["ITI D"],
    "Cantlos 24 4":["IIT D AMB"],
    "Cantlos 25 4":["D"],
    "Cantlos 26 4":["D AMB"],
    "Cantlos 27 4":["D"],
    "Cantlos 28 4":["TII D AMB", "IVOS"],
    "Cantlos 29 4":["ITI D", "IVOS"],
    "Samonios 1 0":["D DUMANNI", "IVOS"],
    "Samonios 2 0":["MD", "IVOS"],
    "Samonios 3 0":["TII D DUM ALE", "IVOS"],
    "Samonios 4 0":["MD"],
    "Samonios 5 0":["D AMB"],
    "Samonios 6 0":["MD"],
    "Samonios 7 0":["N PRINI LOUDIN"],
    "Samonios 8 0":["D DUMANI"],
    "Samonios 9 0":["MD"],
    "Samonios 10 0":["MD"],
    "Samonios 11 0":["D AMB"],
    "Samonios 12 0":["MD"],
    "Samonios 13 0":["MD"],
    "Samonios 14 0":["MD"],
    "Samonios 15 0":["MD"],
    "Samonios 16 0":["D DUMANNI"],
    "Samonios 17 0":["MD TRINO SAM"],
    "Samonios 18 0":["D AMB"],
    "Samonios 19 0":["TII MD"],
    "Samonios 20 0":["ITI D AMB"],
    "Samonios 21 0":["IIT MD"],
    "Samonios 22 0":["D AMB"],
    "Samonios 23 0":["N INIS R"],
    "Samonios 24 0":["N INIS R"],
    "Samonios 25 0":["TII MD"],
    "Samonios 26 0":["ITI D AMB", "IVOS"],
    "Samonios 27 0":["IIT MD", "IVOS"],
    "Samonios 28 0":["D AMB", "IVOS"],
    "Samonios 29 0":["MD", "IVOS"],
    "Samonios 30 0":["D AMB", "IVOS"],
    "Dumanios 1 0":["SAM PRINI LOUD EXO", "IVOS"],
    "Dumanios 2 0":["D", "IVOS"],
    "Dumanios 3 0":["D", "IVOS"],
    "Dumanios 4 0":["D", "IVOS"],
    "Dumanios 5 0":["PRINI LAGET"],
    "Dumanios 6 0":["ITI D"],
    "Dumanios 7 0":["N INIS R"],
    "Dumanios 8 0":["N SAMONI"],
    "Dumanios 9 0":["D"],
    "Dumanios 10 0":["D"],
    "Dumanios 11 0":["N INIS R"],
    "Dumanios 12 0":["ITI D"],
    "Dumanios 13 0":["IIT D"],
    "Dumanios 14 0":["D"],
    "Dumanios 15 0":["D"],
    "Dumanios 16 0":["MD SAMONI"],
    "Dumanios 17 0":["MD SAMONI"],
    "Dumanios 18 0":["ITI D AMB"],
    "Dumanios 19 0":["IIT D"],
    "Dumanios 20 0":["D AMB"],
    "Dumanios 21 0":["IIT M D"],
    "Dumanios 22 0":["D AMB"],
    "Dumanios 23 0":["TII D"],
    "Dumanios 24 0":["N INIS R"],
    "Dumanios 25 0":["IIT D"],
    "Dumanios 26 0":["D AMB"],
    "Dumanios 27 0":["N INIS R"],
    "Dumanios 28 0":["D AMB"],
    "Dumanios 29 0":["NSDS"],
    "Riuros 1 0":["D ANAGANT"],
    "Riuros 2 0":["PRINI LOUD"],
    "Riuros 3 0":["MD"],
    "Riuros 4 0":["(MD) BRIGIOMU RIVRI"],
    "Riuros 5 0":["N INIS R"],
    "Riuros 6 0":["MD"],
    "Riuros 7 0":["MD"],
    "Riuros 8 0":["PRINI LOUD"],
    "Riuros 9 0":["N"],
    "Riuros 10 0":["MD"],
    "Riuros 11 0":["N INIS R"],
    "Riuros 12 0":["MD"],
    "Riuros 13 0":["DEC/VOR LUG RIV"],
    "Riuros 14 0":["MD", "IVOS"],
    "Riuros 15 0":["MD", "IVOS"],
    "Riuros 16 0":["MD", "IVOS"],
    "Riuros 17 0":["MD", "IVOS"],
    "Riuros 18 0":["D AMB", "IVOS"],
    "Riuros 19 0":["MD", "IVOS"],
    "Riuros 20 0":["[TII] D AMB", "IVOS"],
    "Riuros 21 0":["[ITT] IIT MD"],
    "Riuros 22 0":["[IIT] D AMB"],
    "Riuros 23 0":["D PETIUX ANAG"],
    "Riuros 24 0":["D AMB"],
    "Riuros 25 0":["MD PETIUX RIVRI"],
    "Riuros 26 0":["TII D AMB", "IVOS"],
    "Riuros 27 0":["ITI MD", "IVOS"],
    "Riuros 28 0":["IIT D AMB", "IVOS"],
    "Riuros 29 0":["MD", "IVOS"],
    "Riuros 30 0":["D AMB", "IVOS"],
    "Anagantios 1 0":["MD RIVRI IX", "IVOS"],
    "Anagantios 2 0":["D", "IVOS"],
    "Anagantios 3 0":["D", "IVOS"],
    "Anagantios 4 0":["MD OGIOUMU RVRI"],
    "Anagantios 5 0":["N INIS R"],
    "Anagantios 6 0":["PRINI LAG"],
    "Anagantios 7 0":["ITI D"],
    "Anagantios 8 0":["IIT D"],
    "Anagantios 9 0":["D"],
    "Anagantios 10 0":["N"],
    "Anagantios 11 0":["D AMB"],
    "Anagantios 12 0":["TII D"],
    "Anagantios 13 0":["ITI D"],
    "Anagantios 14 0":["IIT D"],
    "Anagantios 15 0":["D"],
    "Anagantios 16 0":["D"],
    "Anagantios 17 0":["D"],
    "Anagantios 18 0":["TII D AMB"],
    "Anagantios 19 0":["ITI D"],
    "Anagantios 20 0":["IIT D AMB"],
    "Anagantios 21 0":["N INIS R"],
    "Anagantios 22 0":["N INIS R"],
    "Anagantios 23 0":["D"],
    "Anagantios 24 0":["N INIS R"],
    "Anagantios 25 0":["ITI D"],
    "Anagantios 26 0":["IIT D AMB"],
    "Anagantios 27 0":["D"],
    "Anagantios 28 0":["D AMB"],
    "Anagantios 29 0":["D"],
    "Ogronios 1 0":["MD"],
    "Ogronios 2 0":["MD"],
    "Ogronios 3 0":["PRINI LOUD"],
    "Ogronios 4 0":["MD"],
    "Ogronios 5 0":["N INIS R"],
    "Ogronios 6 0":["MD"],
    "Ogronios 7 0":["MD"],
    "Ogronios 8 0":["MD"],
    "Ogronios 9 0":["MD"],
    "Ogronios 10 0":["MD"],
    "Ogronios 11 0":["N"],
    "Ogronios 12 0":["MD"],
    "Ogronios 13 0":["MD"],
    "Ogronios 14 0":["MD"],
    "Ogronios 15 0":["MD"],
    "Ogronios 16 0":["MD CVTIO"],
    "Ogronios 17 0":["MD CVTIO"],
    "Ogronios 18 0":["D CVTIO AMB"],
    "Ogronios 19 0":["MD"],
    "Ogronios 20 0":["D AMB"],
    "Ogronios 21 0":["IIT MD"],
    "Ogronios 22 0":["D AMB"],
    "Ogronios 23 0":["MD QVTIO"],
    "Ogronios 24 0":["D AMB"],
    "Ogronios 25 0":["MD"],
    "Ogronios 26 0":["D AMB"],
    "Ogronios 27 0":["N INIS R"],
    "Ogronios 28 0":["ITI D AMB"],
    "Ogronios 29 0":["IIT MD"],
    "Ogronios 30 0":["D AMB"],
    "Cutios 1 0":["MD"],
    "Cutios 2 0":["MD"],
    "Cutios 3 0":["MD"],
    "Cutios 4 0":["PRINI LOUD"],
    "Cutios 5 0":["N INIS R"],
    "Cutios 6 0":["MD"],
    "Cutios 7 0":["MD"],
    "Cutios 8 0":["MD"],
    "Cutios 9 0":["N INIS R"],
    "Cutios 10 0":["MD"],
    "Cutios 11 0":["D AMB"],
    "Cutios 12 0":["N"],
    "Cutios 13 0":["MD"],
    "Cutios 14 0":["MD"],
    "Cutios 15 0":["MD"],
    "Cutios 16 0":["MD OGRON"],
    "Cutios 17 0":["MD OGRON"],
    "Cutios 18 0":["D OGRON AMB"],
    "Cutios 19 0":["N INIS R"],
    "Cutios 20 0":["D AMB"],
    "Cutios 21 0":["N INIS R"],
    "Cutios 22 0":["D AMB"],
    "Cutios 23 0":["MD OGRONI"],
    "Cutios 24 0":["D AMB"],
    "Cutios 25 0":["MD"],
    "Cutios 26 0":["D AMB"],
    "Cutios 27 0":["MD"],
    "Cutios 28 0":["D AMB", "IVOS"],
    "Cutios 29 0":["MD", "IVOS"],
    "Cutios 30 0":["D AMB", "IVOS"],
    "Giamonios 1 0":["N SIMIUISONNA EXO", "IVOS"],
    "Giamonios 2 0":["ITI D", "IVOS"],
    "Giamonios 3 0":["IIT D", "IVOS"],
    "Giamonios 4 0":["D"],
    "Giamonios 5 0":["D AMB"],
    "Giamonios 6 0":["D"],
    "Giamonios 7 0":["PRINI LAG"],
    "Giamonios 8 0":["ITI D"],
    "Giamonios 9 0":["N INIS R"],
    "Giamonios 10 0":["D"],
    "Giamonios 11 0":["D AMB"],
    "Giamonios 12 0":["D"],
    "Giamonios 13 0":["N"],
    "Giamonios 14 0":["ITI D"],
    "Giamonios 15 0":["IIT D"],
    "Giamonios 16 0":["D"],
    "Giamonios 17 0":["NSDS"],
    "Giamonios 18 0":["D AMB"],
    "Giamonios 19 0":["TII D"],
    "Giamonios 20 0":["ITI D AMB"],
    "Giamonios 21 0":["IIT D"],
    "Giamonios 22 0":["N INIS R"],
    "Giamonios 23 0":["N INIS R"],
    "Giamonios 24 0":["D AMB"],
    "Giamonios 25 0":["TII D"],
    "Giamonios 26 0":["N INIS R"],
    "Giamonios 27 0":["IIT D"],
    "Giamonios 28 0":["D AMB"],
    "Giamonios 29 0":["D"],
    "Simiuisonna 1 0":["GIAM PRINI LAG"],
    "Simiuisonna 2 0":["N"],
    "Simiuisonna 3 0":["ITI D EQVI"],
    "Simiuisonna 4 0":["MD"],
    "Simiuisonna 5 0":["N INIS R"],
    "Simiuisonna 6 0":["D EQVI"],
    "Simiuisonna 7 0":["MD TIOCOBREXTIO"],
    "Simiuisonna 8 0":["MD"],
    "Simiuisonna 9 0":["MD SINDIU", "IVOS"],
    "Simiuisonna 10 0":["MD"],
    "Simiuisonna 11 0":["D AMB"],
    "Simiuisonna 12 0":["MD"],
    "Simiuisonna 13 0":["D EQVI"],
    "Simiuisonna 14 0":["N EQVI"],
    "Simiuisonna 15 0":["DSNS EQVI"],
    "Simiuisonna 16 0":["D EQVI"],
    "Simiuisonna 17 0":["D EQVI"],
    "Simiuisonna 18 0":["D AMB EQVI"],
    "Simiuisonna 19 0":["MD"],
    "Simiuisonna 20 0":["D AMB"],
    "Simiuisonna 21 0":["ITT D EQVI"],
    "Simiuisonna 22 0":["D AMB"],
    "Simiuisonna 23 0":["MD"],
    "Simiuisonna 24 0":["D AMB"],
    "Simiuisonna 25 0":["MD"],
    "Simiuisonna 26 0":["D AMB"],
    "Simiuisonna 27 0":["MD"],
    "Simiuisonna 28 0":["D AMB"],
    "Simiuisonna 29 0":["MD"],
    "Simiuisonna 30 0":["D AMB"],
    "Equos 1 0":["D"],
    "Equos 2 0":["PRINI LAG"],
    "Equos 3 0":["N SIMIVIS"],
    "Equos 4 0":["IIT D"],
    "Equos 5 0":["D AMB"],
    "Equos 6 0":["MD SIMIVISO"],
    "Equos 7 0":["D"],
    "Equos 8 0":["PRINI LAG"],
    "Equos 9 0":["ITI D"],
    "Equos 10 0":["IIT D"],
    "Equos 11 0":["D AMB"],
    "Equos 12 0":["D"],
    "Equos 13 0":["MD SIMIV"],
    "Equos 14 0":["MD SIMIV"],
    "Equos 15 0":["N SIMIV"],
    "Equos 16 0":["MD SIMIVIS"],
    "Equos 17 0":["MD SIMIVIS"],
    "Equos 18 0":["D AMB SIMIVIS"],
    "Equos 19 0":["D"],
    "Equos 20 0":["TII D AMB"],
    "Equos 21 0":["IIT MD SIMIVIS"],
    "Equos 22 0":["IIT D AMB"],
    "Equos 23 0":["D"],
    "Equos 24 0":["D AMB"],
    "Equos 25 0":["D"],
    "Equos 26 0":["TII D AMB", "IVOS"],
    "Equos 27 0":["ITI D", "IVOS"],
    "Equos 28 0":["IIT D AMB", "IVOS"],
    "Equos 29 0":["D", "IVOS"],
    "Equos 30 0":["D AMB", "IVOS"],
    "Elembi 1 0":["D", "IVOS"],
    "Elembi 2 0":["D", "IVOS"],
    "Elembi 3 0":["PRINI LAG", "IVOS"],
    "Elembi 4 0":["N", "IVOS"],
    "Elembi 5 0":["IIT D AMB"],
    "Elembi 6 0":["D"],
    "Elembi 7 0":["D"],
    "Elembi 8 0":["D"],
    "Elembi 9 0":["PRINI LAG"],
    "Elembi 10 0":["N INIS R"],
    "Elembi 11 0":["IIT D AMB"],
    "Elembi 12 0":["D"],
    "Elembi 13 0":["D"],
    "Elembi 14 0":["D"],
    "Elembi 15 0":["N"],
    "Elembi 16 0":["N EDRIN"],
    "Elembi 17 0":["MD EDRIN"],
    "Elembi 18 0":["D EDRIN AMB"],
    "Elembi 19 0":["D"],
    "Elembi 20 0":["D AMB"],
    "Elembi 21 0":["TIT D"],
    "Elembi 22 0":["ITI D AMB"],
    "Elembi 23 0":["IIT D"],
    "Elembi 24 0":["D AMB"],
    "Elembi 25 0":["D"],
    "Elembi 26 0":["D AMB"],
    "Elembi 27 0":["TII D"],
    "Elembi 28 0":["ITI D AMB"],
    "Elembi 29 0":["IIT D"],
    "Aedrinni 1 0":["D CANTLI", "IVOS"],
    "Aedrinni 2 0":["MD", "IVOS"],
    "Aedrinni 3 0":["MD", "IVOS"],
    "Aedrinni 4 0":["MD"],
    "Aedrinni 5 0":["N"],
    "Aedrinni 6 0":["PRINI LOUD"],
    "Aedrinni 7 0":["MD [TIOGBR?]"],
    "Aedrinni 8 0":["MD TIOCOBREXTIO"],
    "Aedrinni 9 0":["MD"],
    "Aedrinni 10 0":["MD"],
    "Aedrinni 11 0":["D AMB"],
    "Aedrinni 12 0":["MD"],
    "Aedrinni 13 0":["MD"],
    "Aedrinni 14 0":["MD"],
    "Aedrinni 15 0":["MD"],
    "Aedrinni 16 0":["D ELEMB"],
    "Aedrinni 17 0":["N ELEMB"],
    "Aedrinni 18 0":["D ELEMB AMB"],
    "Aedrinni 19 0":["MD"],
    "Aedrinni 20 0":["D AMB"],
    "Aedrinni 21 0":["IIT MD"],
    "Aedrinni 22 0":["D AMB"],
    "Aedrinni 23 0":["MD"],
    "Aedrinni 24 0":["D AMB"],
    "Aedrinni 25 0":["MD SINDIV IVOS"],
    "Aedrinni 26 0":["D AMB"],
    "Aedrinni 27 0":["MD"],
    "Aedrinni 28 0":["D AMB"],
    "Aedrinni 29 0":["MD"],
    "Aedrinni 30 0":["N"],
    "Cantlos 1 0":["MD AEDRIN"],
    "Cantlos 2 0":["D"],
    "Cantlos 3 0":["D"],
    "Cantlos 4 0":["PRINI LAG"],
    "Cantlos 5 0":["ITI D AMB"],
    "Cantlos 6 0":["N"],
    "Cantlos 7 0":["D"],
    "Cantlos 8 0":["D"],
    "Cantlos 9 0":["D"],
    "Cantlos 10 0":["TII D"],
    "Cantlos 11 0":["ITI D AMB"],
    "Cantlos 12 0":["IIT D"],
    "Cantlos 13 0":["D"],
    "Cantlos 14 0":["D"],
    "Cantlos 15 0":["D TIOCOBREXTIO"],
    "Cantlos 16 0":["TII D"],
    "Cantlos 17 0":["ITI D"],
    "Cantlos 18 0":["N"],
    "Cantlos 19 0":["N INIS R"],
    "Cantlos 20 0":["D AMB"],
    "Cantlos 21 0":["IIT D"],
    "Cantlos 22 0":["TII D AMB"],
    "Cantlos 23 0":["ITI D"],
    "Cantlos 24 0":["IIT D AMB"],
    "Cantlos 25 0":["D"],
    "Cantlos 26 0":["D AMB"],
    "Cantlos 27 0":["D"],
    "Cantlos 28 0":["TII D AMB", "IVOS"],
    "Cantlos 29 0":["(ITI) D", "IVOS"]
  }

  var metYearSet = { 
    1:0,
    2:4,
    3:3,
    4:2,
    5:1,
    6:0,
    7:4,
    8:3,
    9:2,
    10:1,
    11:0,
    12:4,
    13:3,
    14:2,
    15:1,
    16:0,
    17:4,
    18:3,
    0:2
  }

  var satYearSet = {
    1:0,
    2:4,
    3:3,
    4:2,
    0:1
  }

  if (this.isMetonic) {
    if (this.isEarly) {
      var testDate = this.month.name + " " +
                     this.day + " " + metYearSet[this.yearDiff % 19];
      console.log(this.yearDiff % 19)
      console.log(testDate);
      return inscrips[testDate];
    } else {
      var testDate = this.month.name + " " + 
                     this.day + " " + (((this.yearDiff % 19) + 2) % 5);
      console.log(this.yearDiff % 19)
      console.log(testDate);
      return inscrips[testDate];
    }
  } else {
    if (this.isEarly) {
      var testDate = this.month.name + " " +
                     this.day + " " + satYearSet[this.yearDiff % 5];
      console.log(this.yearDiff % 5)
      console.log(testDate);
      return inscrips[testDate];
    } else {
      var testDate = this.month.name + " " +
                     this.day + " " + ((this.yearDiff - 1) % 5);
      console.log(this.yearDiff % 5)
      console.log(testDate);
      return inscrips[testDate];
    }
  }
}

Date.prototype.toColignyDate = function(isMetonic) {
  if (typeof isMetonic == "null") { isMetonic = false; }
  if (isMetonic) {
    var start = new Date(1999, 4, 22);
    var endDate = new Date(this.getTime());
    var timeDiff = Math.abs(endDate.getTime() - start.getTime());
    var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    startColig = new colignyDate(4999, "Samonios", 1, true);
    startColig.calcDays(diff);
    return startColig;
  } else {
    var start = new Date(1998, 4, 3);
    var endDate = new Date(this.getTime());
    var timeDiff = Math.abs(endDate.getTime() - start.getTime());
    var diff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    startColig = new colignyDate(4998, "Quimonios", 1);
    startColig.calcDays(diff);
    return startColig;
  }
}

