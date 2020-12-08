load+='show';
// --
var mday_l=7*5+2, mday;
function mdayInit(){
  mday=new Array(mday_l); // 37
  for (var d=0; d<=(mday_l-1); d++){
    mday[d]=new Array(); // mday[d]=['a','b','c','d','e','f']
    mday[d].bg=''; mday[d].fg=''; mday[d].bd=''; 
    mday[d].tx=''; mday[d].no=-1; mday[d].sz=''; 
  }
}
function setdaycell(d,bg_,fg_,bd_,tx_,no_,sz_){
  if (d<0 || d>mday_l) return false;
  mday[d].bg=bg_; mday[d].fg=fg_; mday[d].bd=bd_; 
  mday[d].tx=tx_; mday[d].no=no_; mday[d].sz=sz_; 
  return true;
}
function emptydaycell(d){
  if (d<0 || d>mday_l) return false;
  mday[d].bg=''; mday[d].fg=''; mday[d].bd=''; 
  mday[d].tx=''; mday[d].no=0;  mday[d].sz=''; 
  return true;
}
function movedaycell(f,t){
  mday[t].bg=mday[f].bg; mday[t].fg=mday[f].fg; mday[t].bd=mday[f].bd; 
  mday[t].tx=mday[f].tx; mday[t].no=mday[f].no; mday[t].sz=mday[f].sz;
  emptydaycell(f); 
}
function dump_mdays(){ var s='<pre>'; 
  for (var j=0; j<=mday_l-1; j++) with (mday[j]) {
    s+=' mday['+fcl(j ,2,' ')+']: '+'.no="' +fcl(no,2,' ')+'"'
      +'.bg="' +fcl(bg,7,' ')+'"'  +'.fg="'+fcl(fg,7,' ')+'"' +'.sz="'+fcl(sz, 1,' ')+'"'
      //+'.bd="'+fcl(sz,3,' ')+'"' +'.tx="'+fcl(tx,30,' ')+'"' 
      +'\n';
  }
  return s+'</pre>';
}    
// --
function showyear(sy,m1,m2){  var ln='\n', ln2='<br>', test=true;
  mdayInit();
  tday =new Date();     // get
  tdow =tday.getDay  ();// this day day of week
  tdd  =tday.getDate ();// this day dd-mm-yyy
  tmm  =tday.getMonth() +1;
  tyy  =tday.getYear ();
  y=sy;  

//var dowbg=new Array
//('неделя','понеделник','вторник','сряда','четвъртък','петък','събота')
  weeknm=['п','в','с','ч','п','с','н'];
  var monbg=
  ['Яну','Фев','Мар','Апр','Май','Юни','Юли','Авг','Сеп','Окт','Ное','Дек'];
/* kalendar clr-cfg.js */

  ky=0;wy=0; hy=0; ry=0; fy=0; wey=0;  buf=''; 
  
  colhdr=''; weekhdr=''; sp='&nbsp;';
  for (var i=0; i<=6; i++) {var bg=''; if (i>=6) bg=colhd_bg;
    weekhdr+=cell(sp+weeknm[i]+sp,bg,colhd_fg,colhd_bold,colhd_sz,'','center')+'\n';
  } 
  colhdr=weekhdr
   +cell(sp+'.',weekno_bg,colhd_fg,colhd_bold,colhd_sz)+'\n';  // 8th col=week#
  
  if (wk_ord=='v') s=colhdr; else s=colhdr+colhdr+colhdr+colhdr+colhdr;        // 5weeks 
  colhdr='<tr bgcolor="'+colhd_bg+'" align="center">'+'\n' +s+'</tr>\n';
//if 1-jan is not monday then this week(#53) begin at previous year
  week=0; s=new Date(y,1-1,1).getDay(); 
  lastWeek_prvMonth=0; if (s!=1) {week=52-1; lastWeek_prvMonth=1;} // 52 or 53(2001,2007)
  //----------------------------------------------------------------------------
  for (var m=1;    m<=12;   m++){ ld=ldm(m,y); km=0; wm=0; j38=0; rowbg='';
    var inmonth=(m>=m1 && m<=m2);
    s=new Date(y,m-1,1).getDay(); if (s==0) s=7;
    for (var i=1; i<=s-1; i++){ j38++; if(inmonth) {emptydaycell(j38-1);} }
    
    for (var d=1;    d<=ld;   d++){ ky++;km++; j38++; // 7*5+2=37
      var s1='', h=false; // not a holiday
      bgclr=rowbg; if (sameday(d,m,y ,tdd,tmm,tyy)) bgclr=crntday;
      tclr=''; iss=''; // Wday:w/n; Hday:h/+/-/e/n;
      if  (Wday(d,m,y)=='w') {iss+='работен'; // also work on holidays
        wm++; wy++;    tclr=wrk_fg;
        iss=' #'+wy+'['+wm+'] '+iss;
        if      (Hday(d,m,y)=='+')         {tclr=r_fg; ry++;}
      }else{                  iss+='неработен';// holiday or/and weekend
        if      (Hday(d,m,y)=='h') { hy++;  tclr=hd_fg;}
        else if (Hday(d,m,y)=='e') { wey++; tclr=we_fg;}
        else if (Hday(d,m,y)=='+')          tclr=we_fg;// gold
      }
      if (inmonth){
        s=daytitle(d,m,y); if(s!='') iss+='\n'+s;
        err=setdaycell(j38-1,bgclr,tclr,daysbold,iss,d,daysz); 
      }
    }// end d
    for (i=j38; i<(35); i++){j38++; if(inmonth) emptydaycell(j38-1);}// to end of week
    //----------------------------------------------------------------------------
    // -- output -- if d=1 is not monday dont increment week (except 1 jan) 
    var ymw=y+'-'+monbg[m-1]+'<font color="'+'black'+'"> ('+wm+')</font>'; // wrk_fg
    if (inmonth){
      rowbg=rowbg1; for (var i in clr2) if(m==clr2[i]) {rowbg=rowbg2;break;}
      if (wk_ord=='v') buf+='<tr bgcolor="'+colhd_bg+'" align="center">' 
          +cell(ymw,colhd_bg,colhd_fg,'<b>',2,7,'center')+'</tr>\n';
      if ((m%hdron)==1 || hdron==1)  buf+=colhdr;
//   cell(wm,weekno_bg,wrkdays_fg,weekno_bold,wrkdays_sz)+'\n' // workdays

      if (mday[36].no>0) movedaycell(36,1); // move 31 vtornik at first week
      if (mday[35].no>0) movedaycell(35,0); // move 30 pon
    }
    for (d=1; d<=mday_l-2; d++) with (mday[d-1]) {// loop by cells (not by days)
      if (d==1 || d==8 || d==15 || d==22 || d==29 || d==36) { week++;  
        if (m>1 && d==1 && (no!=1)) {// in first week of month, month is not 1.
          week--;
          if (lastWeek_prvMonth>0) week++; // 2007: may-1==18w(+1) aug-1==31w(+1)
        } 
        if (week==(52+1)) week=1; // from next year
      }
      if (wk_ord=='v' && (d==8 || d==15 || d==22 || d==29)){
        if (inmonth) buf+='<tr bgcolor="'+rowbg+'">'+'\n'; // +cellempty+'\n'
      }
      if(no>0){ sp='';// '&nbsp;
        if (inmonth) buf+= cell(sp+clnk(tx,no),bg,fg,bd,sz)+'\n'; // clnk(tx,no), +no 
      }else if (inmonth) buf+=cellempty;
      if ((inmonth) && (d==7 || d==14 || d==21 || d==28 || d==35)) { // week?
        sp=''; if (week<10) sp='&nbsp;';
        buf+= cell(sp+week,weekno_bg,weekno_fg,weekno_bold,weeksz)+'\n';
      }
    }
//  if (inmonth) 
//     buf+=cell(wm,weekno_bg,wrkdays_fg,weekno_bold,wrkdays_sz)+'\n' // workdays
    if (inmonth && wk_ord=='h')  
       buf+=cell(ymw,colhd_bg,colhd_fg,'<b>',2,7,'center')+'\n';

    if (inmonth) buf+='</tr>'+'\n';
    lastWeek_prvMonth=0; if (mday[1].no==30 || mday[1].no==31) lastWeek_prvMonth=1;  
  } // end m
  //out(dump_mdays())
  //----------------------------------------------------------------------------
  s=''; if (showstat){
    fy=18; //?
    h=((y%4)==0) && ((y%100)!=0) || ((y%400)==0);
    if (h) {s1='366 дни';} else s1='365 дни';// +' всички дни='+ky
    s=ln2+'Легенда:'+ln2+'година '+y+' c '+s1+' по слънчевия календар'+ln2
     +' <font color="'+weekno_fg+'"> # седмица (52*5+52*2)=52*7 =(раб.260 + поч.104)=364дни'+'</font> '+ln2                                          
     +' <font color="'+wrk_fg   +'"> работни:'+wy                    +' </font> '
     +' <font color="'+we_fg    +'"> почивни(съб/нед):'+wey          +' </font> '+ln2
     +'празници '+(hy+ry+fy)+': '
     +' <font color="'+hd_fg    +'"> официални:'            +hy      +' </font> '+ln2
     +' <font color="'+r_fg     +'"> + православни твърди :'+ry      +' </font> '+ln2
     +' <font color="'+f_fg     +'"> † православни плаващи:'+fy      +' </font> '+ln2
     +' <font color="gray">'    
     +'err on week#35 at 1-st week of sep-2009'+ln2
     +'todo: see today, see note without _ clnk(tx)'+ln2
     +'</font> '+ln2+ln2;
  }
  return out_beg +'<table bgcolor="#202830">'+buf+'</table>'+s +out_end; 
}/*   --------------------------------------------------------- */
load+='.';