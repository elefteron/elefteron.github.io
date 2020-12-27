load_new('../lib/date.js'); // _load._new
//----------------------------------------
/*  getTime() - Number of milliseconds since 1/1/1970 @ 12:00 AM
    getSeconds() - Number of seconds (0-59)
    getMinutes() - Number of minutes (0-59)
    getHours() - Number of hours (0-23)
    getDay() - Day of the week(0-6). 0 = Sunday, ... , 6 = Saturday
    getDate() - Day of the month (0-31)
    getMonth() - Number of month (0-11)
    getFullYear() - The four digit year (1970-9999)
*/
// utc to local !? in FdatT()
//     Sat Sep 1 02:22:44 UTC+0300 2012           ?UTC+03
//     Sun Dec 12 08:21:10 UTC+0200 2010          ?UTC+02
  function date_a2x(t_arr,to_){// t_arr=[yr,mo,dy,hr,mi,se?] to=str|num|obj
    if(arguments.length<1) return '?-?-? ?:?'
    if(undef(to_))         var to='str'; else var to=to_;
    var t_obj={yr:t_arr[0],mo:t_arr[1],dy:t_arr[2],hr:t_arr[3],mi:t_arr[4]}
    if (t_obj.mo<10) t_obj.mo='0'+t_obj.mo;
    if (t_obj.dy<10) t_obj.dy='0'+t_obj.dy;
    if (t_obj.hr<10) t_obj.hr='0'+t_obj.hr;
    if (t_obj.mi<10) t_obj.mi='0'+t_obj.mi;
    var t_str=t_obj.hr+':'+t_obj.mi+' '+t_obj.dy+'-'+t_obj.mo+'-'+t_obj.yr
    var t_num=t_obj.yr    +t_obj.mo    +t_obj.dy+'.'+t_obj.hr    +t_obj.mi
    var se=''; if(typeof(t_arr[5])!='undefined') se=t_arr[5]
    if(se!=''){ t_obj.se=se;
      if (t_obj.se<10) t_obj.se='0'+t_obj.se;
      t_str=t_obj.hr+':'+t_obj.mi+':'+t_obj.se+' '+t_obj.dy+'-'+t_obj.mo+'-'+t_obj.yr
      t_num+=t_obj.se
    }
    if     (to=='str') return t_str
    else if(to=='obj') return t_obj
    else if(to=='num') return t_num // t_num.toFixed(4) -- n.4
    else               return t_str
  }
function dateAsFloat(date){ md=date+' '// date_s2n
  var nd=''
  for(var i=0; i<md.length-1; i++){
    n=md.charAt(i)
    if(n=='-' || n==':' || n==':' || n==',') nd+=' '; else nd+=n
  }
  var d=nd.split(' ')
  for(var i=0; i<=d.length-1; i++) d[i]=Number(d[i]); // Number()|parseInt()|*1
//outl(' d:'+d+br); // 'md:'+md+' nd:'+nd+' d:'+d+br
  for(var i=1; i<=d.length-1; i++) if(d[i]<10) d[i]='0'+d[i];
  md=parseFloat(''+d[0]+d[1]+d[2]+'.'+d[3]+d[4]);
  if(d[4]==0 || d[4]%10==0) md=md+'0';// because parseFloat() cut last zero
  return md
}
//----------------------------------------
function getymd(tch){//=>{yr:y,mo:m,dy:d,str:ymd_}
// get date&time end in format yyyy-mm-dd
  var y,m,d,y_,m_,d_, newdate=new Date(); 
  var  tc='.'; if(typeof(tch)!='undefined' && tch!='') tc=tch;
// date='+date+' locale date='+newdate.toLocaleString()
  with (newdate) {
    y=getYear()
// _brws=browserID();// brws[_brws][0]
    if (_net || _mon || _fox || _kml || _knq || _saf || _opr) y+=1900;//  ?:_gog
//  if (y<1900) warn!
//  old MZ/FF y=105
    m=getMonth()+1; m_=m; if(m<10) m_='0'+m;
    d=getDate();    d_=d; if(d<10) d_='0'+d;
  }
  var ymd_=y+tc+m_+tc+d_
  return {yr:y,mo:m,dy:d,str:ymd_} 
}// ---------------------------------- 
function gethms(sec,tch){//=>{hr:h,mi:m,sc:s,str:hms_}
  var newdate=new Date(),h_,m_,s_;
  var  tc=':'; if(typeof(tch)!='undefined' && tch!='') tc=tch;
  with (newdate) {
    var h=getHours(), m=getMinutes(), s=getSeconds();
    h_=h; if(h<10) h_='0'+h;
    m_=m; if(m<10) m_='0'+m;
    s_=s; if(s<10) s_='0'+s;
    var hms_=h+tc+m; 
	  if(typeof(sec)!='undefined' && sec) hms_+=tc+s
  }
  return {hr:h,mi:m,sc:s,str:hms_}
}// ---------------------------------- 
var dt1=[0,0,0,0,0,0]; var dt2=[0,0,0,0,0,0]; 
//-----------------------------------
function getdate_(k,sec){// get date&time, format yyyy-mm-dd hh-mm
  var date,y,m,d,h,n,s, y1,m1,d1 ,y2,m2,d2 ,date, newdate=new Date();
  with (newdate) {
    y=getYear();  m=getMonth()+1; d=getDate();
    h=getHours(); n=getMinutes(); s=getSeconds();
    if (_net || _mon || _fox || _kml || _knq || _saf || _opr) y+=1900;
    if      (k==1){dt1=[y,m,d,h,n,s]; dt2  =[0,0,0,0,0,0]; dtdur=[0,0,0,0,0,0]}
    else if (k==2){dt2=[y,m,d,h,n,s]; }
                     if(m<=9)m='0'+m; if(d<=9)d='0'+d;
    if(h<=9)h='0'+h; if(n<=9)n='0'+n; if(s<=9)s='0'+s;
    if      (k==1){ y1_=y; m1_=m; d1_=d;   h1_=h; n1_=n; s1_=s    }
    else if (k==2){ y2_=y; m2_=m; d2_=d;   h2_=h; n2_=n; s2_=s    }
    date=y+'-'+m+'-'+d +' '+h+':'+n; if (sec) date+=':'+s
  }
//outl(' date='+date+' locale date='+newdate.toLocaleString())
  return (date);
}//-----------------------------
var newdate='?'
var d1_,m1_,y1_,h1_,n1_,s1_, d2_,m2_,y2_,h2_,n2_,s2_
function getdate2(k,sec){// get date&time, format yyyy-mm-dd hh-mm
  var date, newdate=new Date();
  with (newdate) {
    var y=getYear();  var m=getMonth()+1; var d=getDate();   
    var h=getHours(); var n=getMinutes(); var s=getSeconds();
  //if (_net || _mon || _fox || _kml || _knq || _saf || _opr) y+=1900;
    if (!_iex) y+=1900;
                     if(m<=9)m='0'+m; if(d<=9)d='0'+d; 
    if(h<=9)h='0'+h; if(n<=9)n='0'+n; if(s<=9)s='0'+s; 
    if      (k==1){ y1_=y; m1_=m; d1_=d;   h1_=h; n1_=n; s1_=s    }
    else if (k==2){ y2_=y; m2_=m; d2_=d;   h2_=h; n2_=n; s2_=s    }
    date=y+'-'+m+'-'+d +' '+h+'-'+n; if (sec) date+='-'+s
  }
//outw(log,' date='+date+' locale date='+newdate.toLocaleString()+ln)
  return (date);
}// ---------------------------------- 
function day_cmp(d1,m1,y1, d2,m2,y2){ var r,lt='<',gt='>',eq='=';
  if (y1 < y2) { return (lt)}  //  outl('y'+y1+'<' +'y'+y2+' ');
  if (y1 > y2) { return (gt)}  //  outl('y'+y1+'>' +'y'+y2+' ');
                               //  outl('y'+y1+'=' +'y'+y2+' ') 
  if (m1 < m2) { return (lt)}  //  outl('m'+m1+'<' +'m'+m2+' ');
  if (m1 > m2) { return (gt)}  //  outl('m'+m1+'>' +'m'+m2+' ');
                               //  outl('m'+m1+'=' +'m'+m2+' ') 
  if (d1 < d2) { return (lt)}  //  outl('d'+d1+'<' +'d'+d2+' ');
  if (d1 > d2) { return (gt)}  //  outl('d'+d1+'>' +'d'+d2+' ');
                 return (eq)   //  outl('d'+d1+'=' +'d'+d2+' ');
}// -------------------------------------------------
function FdatT(fd){
// Fri Jun 9 02:12:25 UTC+0300 2006
// Tue Jun  8 22:48:22 UTC+0300 2004    - must be
// 0123456789-123456789-123456789-12
// ^   ^   !! ^  ^  ^           ^
  var s='', moeng=new Array ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
  var dat=new Date(fd); 
  var d2=dat.toString()+' ' // "Tue Jun 8 22:48:22 UTC+0300 2004"
  d=d2;
  if (d.charAt(9)==' ') {d=d2.substring(0,7+1)+'0'+d2.substring(8,31+1)} // insert "0" at pos 8
// substring(from,to+1)  //pos+lng=to+1   c="0123456789"; c.substring(2,2+1) -> 2
  p=29; l=4; yr=d.substring(p,p+l)
  p= 4; l=3; mo=d.substring(p,p+l)
  p= 8; l=2; da=d.substring(p,p+l)
  p=11; l=2; th=d.substring(p,p+l)
  p=14; l=2; tm=d.substring(p,p+l)
  p=17; l=2; ts=d.substring(p,p+l)
  for (i=1; i<=12; i++) { if(mo==moeng[i-1]) {mo=i; if(i<10) mo='0'+mo; i=13} }
//s=da+t'+mo+t+yr+t+tm
  ss="____-__-__"     +" "+"__:__"    // +":__"
  s=yr+'-'+mo+'-'+da  +' '+th+":"+tm  // +":"+ts
  if (fd=='?') s=ss
  return(s);
}// -------------------------------------------------

// msg='== ? beg:'+getdate2(1,t_)+ln;
// msg='== ? end:'+getdate2(2,t_)+' duration:'+duration()+ln;
// function dur     (d1,m1,y1,h1,n1,s1,  d2,m2,y2,h2,n2,s2) 

function duration(){ var str=msg=''
// outl(' t1='+d1_+'-'+m1_+'-'+y1_+' '+h1_+':'+n1_+':'+s1_+ln)
// outl(' t2='+d2_+'-'+m2_+'-'+y2_+' '+h2_+':'+n2_+':'+s2_+ln)
   if (!okin(s1_,0,59))msg+='s1 '; if (!okin(s2_,0,59))msg+='s2 '; 
   if (!okin(n1_,0,59))msg+='n1 '; if (!okin(n2_,0,59))msg+='n2 '; 
   if (!okin(h1_,0,59))msg+='h1 '; if (!okin(h2_,0,59))msg+='h2 ';
   if (msg!='') msg=' !bad time numbers:'+msg+ln
      +' t1='+d1_+'-'+m1_+'-'+y1_+' '+h1_+':'+n1_+':'+s1_+ln
      +' t2='+d2_+'-'+m2_+'-'+y2_+' '+h2_+':'+n2_+':'+s2_+ln
   var time1, time2, timedur
   time1=s1_+n1_*60+h1_*360 // fix(s1_)  int ???
   time2=s2_+n2_*60+h2_*360
   timedur=time2-time1 // +00000000
/*
?  m=Math.ceil(timedur/60)
?  h=Math.ceil(m/60); 
?  m=m - h*60
?  s=timedur - h*360 - m*60
   str=h+':'+m+':'+s
*/
   return (timedur+' s '+msg) //' t1='+time1+' t2='+time2
}// -------------------------------------------------

/* *-/
 FdatT(fd)
var newdate='?'
    newdate
    d1,m1,y1,h1,n1,s1, d2,m2,y2,h2,n2,s2
= getdate2  (k,sec)
= duration ()
= day_cmp  (d1,m1,y1, d2,m2,y2)

// old:
function getdate2(){// get date&time end in format yyyy-mm-dd hh-mm
  var date,w;
  newdate=new Date();
  with (newdate) {
    date=getYear()+'-'
    w=getMonth()+1; if (okin(w,0,9)) w='0'+w; date+=w+'-'
    w=getDate();    if (okin(w,0,9)) w='0'+w; date+=w+' '
    w=getHours();   if (okin(w,0,9)) w='0'+w; date+=w+'-'
    w=getMinutes(); if (okin(w,0,9)) w='0'+w; date+=w+'-'
    w=getSeconds(); if (okin(w,0,9)) w='0'+w; date+=w
  }
//outl(' date='+date+' locale date='+newdate.toLocaleString()+ln)
  return (date);
}// ------------------------------------
function FdatT(fd){// dd~Ìon~yyyy~hh:mm:ss  
// Tue Jun 8 22:48:22 UTC+0300 2004  -->
// Jun 08 22:48:22 2004 <--
// 0123456789-123456789-123456789-12

  var s='', moeng=new Array ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec')
  var dat=new Date(fd);   var d=dat.toString()+' ';
  d2=d.substring(4,18)+d.substring(27,33);  d=d2;
  if (d.charAt(5)==' ') {d2=d.substring(0,3)+' 0'+d.substring(4,19); d=d2}
  p=0;  l=3; mo=d.substring(p,p+l); 
  p=4;  l=2; da=d.substring(p,p+l); 
  p=7;  l=8; tm=d.substring(p,p+l);  
  p=16; l=4; yr=d.substring(p,p+l); 
  for (i=1; i<=12; i++) { if(mo==moeng[i-1]) {mo=i; if(i<10) mo='0'+mo; i=13} }
//s=da+t'+mo+t+yr+t+tm
  if (fd==null) s='****-**-** **:**:**';
  else          s=yr+'-'+mo+'-'+da+' '+tm // + '('+d2+')'
  return(s);
}// ------------------------------------
/* */
load_end()