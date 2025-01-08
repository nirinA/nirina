var month = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'Decembre'];
var mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
var volana = ['Janoary', 'Febroary', 'Martsa', 'Aprily', 'May', 'Jona',
              'Jolay', 'Aogostra', 'Septambra', 'Oktobra', 'Novambra', 'Desambra'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
var andro = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];

var JustNow = new Date();
var JustDay = JustNow.getDay();

var FormatDate = {
    Current : function ( lang ) {
        var now = new Date();
        var yyyy = now.getFullYear();
        var mo = now.getMonth();
        var da = now.getDay();
        var dd = now.getDate();
		var marainasahariva;
        if (10 > dd) {
            dd = '0' + dd;
        }
        var hr = now.getHours();
        if (10 > hr) {
            hr = '0' + hr;
        }
        var min = now.getMinutes();
        if (10 > min) {
            min = '0' + min;
        }
        var sec = now.getSeconds();
        if (10 > sec) {
            sec = '0' + sec;
        }
        if (lang == "en") {
            mo = month[mo];
            da = days[da];
            return yyyy+"/"+mo+"/"+da+"/"+dd+"T"+hr+":"+min+":"+sec; 
        }
        if (lang == "fr") {
            mo = mois[mo];
            da = jours[da];
            return yyyy+"/"+mo+"/"+da+"/"+dd+"T"+hr+":"+min+":"+sec; 
        }
        if (lang == "mg") {
            mo = volana[mo];
            da = andro[da];
            if ( hr <= 10 ) {
                marainasahariva = "maraina";
            } else if ( (hr <= 12) && (hr >= 11) ) {
                marainasahariva = "atoandro";
            } else if ( (hr <= 15) && (hr >= 13) ) {
                marainasahariva = "tolakandro";
            } else if ( (hr <= 19) && (hr >= 16) ) {
                marainasahariva = "hariva";
            } else if ( (hr <= 23) && (hr >= 20) ) {
                marainasahariva = "alina";
            } else {
                marainasahariva = "tsy fantatra";
            }
            if (hr > 12) {
                hr = hr - 12;
            }
         /*   if (hr < 10) {
                hr = '' + hr;
            }*/
            return "androany: "+da+" faha "+dd+" ny volana "+mo+", taona "+yyyy+",<br /> amin'ny "+hr+" ora "+marainasahariva+" sy "+min+" minitra ary "+sec+ " segondra izao"; 
        }
        if (lang == "plain_mg") {
            mo = volana[mo];
            da = andro[da];
            if ( hr <= 5 ) {
                marainasahariva = "alina";
            } else if ( hr < 5 && hr <= 6 ) {
                marainasahariva = "hadivaraina";
            } else if ( hr < 6 && hr <= 11 ) {
                marainasahariva = "maraina";
            } else if ( (hr <= 12) && (hr >= 11) ) {
                marainasahariva = "atoandro";
            } else if ( (hr <= 15) && (hr >= 13) ) {
                marainasahariva = "tolakandro";
            } else if ( (hr <= 19) && (hr >= 16) ) {
                marainasahariva = "hariva";
            } else if ( (hr <= 23) && (hr >= 20) ) {
                marainasahariva = "alina";
            } else {
                marainasahariva = "tsy fantatra";
            }
            if (hr > 12) {
                hr = hr - 12;
            }
         /*   if (hr < 10) {
                hr = '' + hr;
            }*/
            return "androany: "+da/*+" "+marainasahariva*/+"<br />"+dd+ " "+mo+" "+yyyy; 
        }
        if (lang == "utc") {
/*            var y = now.getUTCFullYear();
            var m = now.getUTCMonth();
            var d = now.getUTCDay();
            var dt = now.getUTCDate();
            var h = now.getUTCHours();
            var min = now.getUTCMinutes();
            var s = now.getUTCSeconds();
            var ms = now.getUTCMilliseconds();
            return "UTC: "+y+"-"+m+"-"+d+"T"+h+":"+min+":"+s+"."+ms;
*/
            /*var ms = now.getUTCMilliseconds();*/
            return /*"UTC: "+*/now.toUTCString()/*+"<br />ms : "+ms*/;
        }
    }
    ,
    TimeToday : function () {
        var d = FormatDate.Current("en");
        document.writeln("<html><body>today is "+d+"<br />");
        document.writeln("use the 'Back' button of your browser to go back to the previous page!<br />or click this button <form ><input type='button' value=' < < BACK ' onClick='window.history.back();'></form>");
        document.writeln("or click <a href=http://www.chez.com/raseliarison/nirinA.html> here </a> to go to nirinA! yo<br /></body></html>");
        window.status='nirinA' ;
    }
    ,
    HeureMaintenant : function () {
        var d = FormatDate.Current("fr");
        alert("aujourd'hui " + d);
    }
    ,
    OraAndroany : function () {
        var d = FormatDate.Current("mg");
        document.getElementById("ora").innerHTML = d;
        //document.forms.oragasy.text.value = "e";
    }
    ,
    Clock : function () {
        setTimeout(FormatDate.Clock, 100);
        document.getElementById("datebox").innerHTML = FormatDate.Current("plain_mg");
    }
    ,
    FullClock : function () {
        setTimeout(FormatDate.FullClock, 100);
        document.getElementById("datebox").innerHTML = FormatDate.Current("mg");
    }
    ,
    Fafao : function () {
        document.getElementById("ora").innerHTML = "amin'ny firy hoe?";
        //document.forms.oragasy.text.value = "amin'ny firy hoe?";
    }
    ,
    UTC : function () {
        setTimeout(FormatDate.UTC, 100);
        document.getElementById("utcdatebox").innerHTML = FormatDate.Current("utc");
    }
        
};
