function colignyMonth(t,i){this.name=t,this.days=i}function colignyYear(t,i){function s(t){for(var i=0;i<t.length;i++)if(h%19===t[i])return!0;return!1}if("null"==typeof i&&(i=!1),this.year=t,this.isMetonic=i,this.months=[new colignyMonth("Samonios",30),new colignyMonth("Dumanios",29),new colignyMonth("Riuros",30),new colignyMonth("Anagantios",29),new colignyMonth("Ogronios",30),new colignyMonth("Cutios",30),new colignyMonth("Giamonios",29),new colignyMonth("Simiuisonna",30),new colignyMonth("Elembi",29),new colignyMonth("Aedrinni",30),new colignyMonth("Cantlos",29)],this.isMetonic&&this.year<4999||!this.isMetonic&&this.year<4998)n=!0;else var n=!1;if(this.isMetonic)if(n)h=4999-this.year;else h=this.year-4999;else if(n)h=4998-this.year;else var h=this.year-4998;if(this.isMetonic?(n?s([1,5,6,10,11,15,16])?this.months.splice(8,0,new colignyMonth("Equos",30)):this.months.splice(8,0,new colignyMonth("Equos",29)):s([3,4,8,9,13,14,18])?this.months.splice(8,0,new colignyMonth("Equos",30)):this.months.splice(8,0,new colignyMonth("Equos",29)),n?s([5,10,15])&&this.months.splice(0,0,new colignyMonth("Quimonios",29)):s([4,9,14])&&this.months.splice(0,0,new colignyMonth("Quimonios",29)),n?s([3,8,13,18])&&this.months.splice(6,0,new colignyMonth("Rantaranos",30)):s([1,6,11,16])&&this.months.splice(6,0,new colignyMonth("Rantaranos",30))):((!n||h%5!=1&&h%5!=0)&&(n||h%5!=0&&h%5!=4)?this.months.splice(8,0,new colignyMonth("Equos",29)):this.months.splice(8,0,new colignyMonth("Equos",30)),h%5==0&&this.months.splice(0,0,new colignyMonth("Quimonios",29)),n?h%5==3&&h%30!=3&&this.months.splice(6,0,new colignyMonth("Rantaranos",30)):h%5==2&&h%30!=27&&this.months.splice(6,0,new colignyMonth("Rantaranos",30))),this.isMetonic)this.isEarly,this.isEarly;else{if(this.isEarly){if(this.yearDiff>197.97&&this.yearDiff%197.97<=5&&this.yearDiff%5==1)for(o=0;o<this.months.length;o++)"Equos"===this.months[o].name&&(this.months[o].days-=1)}else if(this.yearDiff>197.97&&this.yearDiff%197.97<=5&&this.yearDiff%5==4)for(var o=0;o<this.months.length;o++)"Equos"===this.months[o].name&&(this.months[o].days-=1);this.isEarly?this.yearDiff>635.04&&this.yearDiff%635.04<=30&&this.yearDiff%30==3&&this.months.splice(6,0,new colignyMonth("Rantaranos",30)):this.yearDiff>635.04&&this.yearDiff%635.04<=30&&this.yearDiff%30==27&&this.months.splice(6,0,new colignyMonth("Rantaranos",30))}}function colignyDate(t,i,s,n){void 0===n&&(n=!1),this.year=t,this.month=i,this.day=s,this.isMetonic=n,this.isMetonic?(this.startYear=4999,this.startDate=new Date(1999,4,22),this.months=new colignyYear(t,!0).months):(this.startYear=4998,this.startDate=new Date(1998,4,3),this.months=new colignyYear(t).months);for(var h=0;h<this.months.length;h++)this.months[h].name===i&&(this.month=this.months[h])}colignyDate.prototype.calcDays=function(t){for(this.day+=t;this.day>this.month.days;)null==this.months[this.months.indexOf(this.month)+1]?(this.day=this.day-this.month.days,this.year+=1,this.isMetonic?this.months=new colignyYear(this.year,!0).months:this.months=new colignyYear(this.year).months,this.month=this.months[0]):(this.day=this.day-this.month.days,this.month=this.months[this.months.indexOf(this.month)+1]);for(;this.day<1;)this.month===this.months[0]?(this.year-=1,this.isMetonic?this.months=new colignyYear(this.year,!0).months:this.months=new colignyYear(this.year).months,this.month=this.months[this.months.length-1],this.day=this.month.days+this.day):(this.month=this.months[months.indexOf(this.month)-1],this.day=this.month.days+this.day);return this},colignyDate.prototype.toGregorianDate=function(){if(this.isMetonic)t=new colignyDate(4999,"Samonios",1,!0);else var t=new colignyDate(4998,"Quimonios",1);var i=0;if(this.year<this.startYear)for(;;){if(this.month.name===t.month.name&&this.day===t.day&&this.year===t.year)break;this.calcDays(1),i-=1}else for(;;){if(this.month.name===t.month.name&&this.day===t.day&&this.year===t.year)break;t.calcDays(1),i+=1}console.log(i);var s=new Date(this.startDate.getTime());return s.setDate(this.startDate.getDate()+i),s};