load+='time '
function getdate2(){// format yyyy-mm-dd
  var newdate=new Date();
  with (newdate) {
    var y=getYear();  var m=getMonth()+1; var d=getDate();
    if(m<10)m='0'+m;
    if(d<10)d='0'+d;
    var ymd=y+'-'+m+'-'+d
  }
//outw(log,' date='+date+' locale date='+newdate.toLocaleString()+ln)
  return (ymd);
}// ----------------------------------
function gettime2(sec){//  format hh:mm:ss
  var newdate=new Date();
  with (newdate) {
    var h=getHours(); var m=getMinutes(); var s=getSeconds();
    if(h<10)h='0'+h;
    if(m<10)m='0'+m;
    if(s<10)s='0'+s;
    var hms=h+':'+m; if (sec) hms+=':'+s
  }
//outw(log,' date='+date+' locale date='+newdate.toLocaleString()+ln)
  return (hms);
}// ----------------------------------
