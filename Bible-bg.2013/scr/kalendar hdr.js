_load._new('scr/kalendar hdr.js')
var yday=new Array(12); // TotalIssue=0
/* --------------------------------------------------------  */
function setydays(y /*,Mpg,Epg */){// init: setydays(nyy); Workday/Holyday/Endweek
// Holydays: h(official national)/+(official religious)/-(not official)
//  define days: yday[1.12][1..31].*
  for (m=1;  m<=12; m++){ ld=ldm(m,y);
    yday[m-1]=new Array(31);
    for (d=1; d<=ld; d++) { weekday=dowi(d,m,y)// + day of week 0..6
      yday[m-1][d-1]=new Array(4+2)  // pages: A3-40/32, A2-16
      yday[m-1][d-1].wd =weekday
      yday[m-1][d-1].w='w'
    //yday[m-1][d-1].mpg=Mpg // main body pages - 24/20
    //yday[m-1][d-1].epg=Epg // econ body pages - 16/12
      yday[m-1][d-1].h='n'
      if ((weekday==0)|(weekday==6)) 
        {yday[m-1][d-1].h='e'; yday[m-1][d-1].w='n'}
      yday[m-1][d-1].t =''
    }
  }
//  setHday ( ?, ?, y,'+','+')
// h(official)/+(orthodox fixed)/†(orthodox float)/-(not official)
// h официални
    setHday ( 1, 1, y,'h','Нова година')
    setHday ( 3, 3, y,'h','Освобождение на България')
    setHday ( 6, 5, y,'h','Ден на храбростта и Българската армия')
    setHday (24, 5, y,'h','Ден на българската просвета и култура и на славянската писменост')
    setHday ( 6, 9, y,'h','Ден на Съединието на България')
    setHday (22, 9, y,'h','Ден на независимостта на България')
    setHday (25,12, y,'h','Коледа')
// - неофициални - понякога са работни
    setHday ( 1, 5, y,'-','-Ден на труда')// ? "6 дни работи а 7-мия е на твоя Бог"
    setHday ( 2, 6, y,'-','-Поклонение пред паметника на Ботев в Козлодуй')
    setHday ( 1,11, y,'-','-Ден на Народните будители')
// + църковни постоянни
    setHday ( 1, 1, y,'+','+св.Василий Велики(Васильовден)')
    setHday ( 6, 1, y,'+','+Богоявление(Йордановден)')
    setHday ( 7, 1, y,'+','+св.прор.Предтеча Йоан Кръстител (Ивановден)')
    setHday ( 2, 2, y,'+','+Сретение Господне')
    setHday (25, 3, y,'+','+Благовещение')
    setHday ( 6, 5, y,'+','+св.вмчк.Георги Победоносец(Гергьовден)')
    setHday (11, 5, y,'+','+св.Кирил и Методий')
    setHday (29, 6, y,'+','+св.ап.Петър и Павел(Петровден)')
    setHday (20, 7, y,'+','+св.прор.Илия(Илинден)')
    setHday ( 6, 8, y,'+','+Преображение Господне')
    setHday (15, 8, y,'+','+Успение на Пресвета Богородица')
//            1, 9          Начало на Църковната нова година
    setHday ( 8, 9, y,'+','+Рождество на Пресвета Богородица')
    setHday (14, 9, y,'+','+Въздвижение на светия кръст Господен(Кръстовден)')
    setHday (19,10, y,'+','+преп.Йоан Рилски')
    setHday (26,10, y,'+','+вмчк.Димитрий Мироточивец(Димитровден)')
//  setHday (32, ?, y,'†','†Задушница. събота преди Архангеловден') //    
    setHday ( 8,11, y,'+','+св.Архангел Михаил(Архангеловден)')
    setHday (21,11, y,'+','+Въведение Богородично')
    setHday ( 6,12, y,'+','+св.Николай Мирликийски(Никулден)')
    setHday (25,12, y,'+','+Рождество Христово (Коледа)')// и официален
    setHday (26,12, y,'+','+Събор на Пресвета Богородица')
    setHday (27,12, y,'+','+св.първомъченик и архидякон Стефан(Стефановден)')
    setHday (31,12, y,'h','')
// ---
//?  Томина неделя
//?  Игнажден
//?  12-те Господски и Богородични празници
//?  Богородични пости
//?  Коледни пости - от Коледни заговезни до Въведение Богородично
//?  Светлата седмица
/* pesah[d,m]
  if (y==2004){
    setHday ( 1, 5, y,'h','+Възкресение Христово (Великден)')+2
    setHday ( 9, 6, y,'+','+Възнесение Господне (Спасовден)') 
    setHday (19, 6, y,'+','+Петдесетница')
    setHday (20, 6, y,'+','+св.Дух')
  }
// + православни подвижни --- = не е зададено в момента -- 18 дни
//  setPesah(y);setydays(y) 
    setHday (?, ?, y,'†','†Задушница. събота преди неделя Месопустна')//
    setHday (?, ?, y,'†','†неделя Месопустна(Местни Заговезни)')   // Мест?ни
    setHday (?, ?, y,'†','†неделя Сиропустна(Сирни Заговезни)')
    setHday (?, ?, y,'†','†Тодоровден')
    setHday (?, ?, y,'†','†1-ва неделя на Великия пост.Православна')
    setHday (?, ?, y,'†','†3-та неделя на Великия пост.Кръстопоклонна')
    setHday (?, ?, y,'†','†5-та неделя на Великия пост.')
    setHday (?, ?, y,'†','†Лазаровден')
    setHday (?, ?, y,'†','†6-та неделя на Великия пост.(Цветниза,Връбница)')
    setHday (?, ?, y,'†','†Възкресение Христово') // 3 дни
    setHday (?, ?, y,'†','†Томина неделя')
    setHday (?, ?, y,'†','†Неделя на Мироносците') // ?
    setHday (?, ?, y,'†','†Неделя на Слепия')
    setHday (?, ?, y,'†','†(Спасовден) Възнесение Господне')
    setHday (?, ?, y,'†','†Неделя на св.Отци')
//  setHday (?, ?, y,'†','†Задушница. събота преди Петдесетница') //
    setHday (?, ?, y,'†','†Петдесетница')                       //
    setHday (?, ?, y,'†','†св.Дух')
    setHday (?, ?, y,'†','†Неделя на Всички светии(Петрови Заговезни)')
    setHday (?, ?, y,'†','†Неделя на Всички Български светии')
/* */ // ---
// for (i=0; i<=lhd; i++) {with (hday[i]) buf+='hday:'+(i)+' '
//     +dowbg[W].substring(0,2+1)+':' +monbg[M-1]+'-'+z2(D)+'-'+Y+ln2)}
}/*   --------------------------------------------------------- */

function setHday(d,m,y,fl,tx){
  yday[m-1][d-1].t+=tx
  yday[m-1][d-1].h=fl  // +(orthodox fixed)/†(orthodox float)/h(official)/-(not official)/e/n
  if ((fl=='h')|(fl=='e') )
    yday[m-1][d-1].w='n' // not workday if official holiday/weekend!
}
function Hday(d,m,y){return yday[m-1][d-1].h}  // holyday=h/+/-/e/n
/*   --------------------------------------------------------- */  
function setWday(d,m,y/*,Mpg,Epg*/,tx){
  yday[m-1][d-1].t+='('+tx+')'
  yday[m-1][d-1].w='w'  // workday=w/n
  //if (!((Mpg==0)&&(Epg==0))){
  //  yday[m-1][d-1].mpg=Mpg // main body pages - 24/20
  //  yday[m-1][d-1].epg=Epg // econ body pages - 16/12
  //}
}
function Wday(d,m,y){ 
  //Mpg   =yday[m-1][d-1].mpg
  //Epg   =yday[m-1][d-1].epg
  return yday[m-1][d-1].w
}/*   --------------------------------------------------------- */
function daytitle(d,m,y){return yday[m-1][d-1].t}
/*   --------------------------------------------------------- */
//function setTotalIssue(y,n){TotalIssue=n}
/*   --------------------------------------------------------- */
function ldm(m,y){// last day in month
  var day=new Date(y,m,0).getDate()
  return day
}/*   --------------------------------------------------------- */
function dowi(d,m,y){// day of week index  0..6
  var day=new Date(y,m-1,d).getDay()
  return day
}/*   --------------------------------------------------------- */
function z2(n){ if (n<=9){return('0'+n)} else return n}
/*   --------------------------------------------------------- */
function sameday(d1,m1,y1 ,d2,m2,y2){
  return ((y1==y2)&(m1==m2)&(d1==d2))
}/*   --------------------------------------------------------- */
var al=' valign="bottom"'
function cell(bg,fg,bold,sz){
  var sbg=''; if (bg!='') sbg=' bgcolor="'+bg+'"'
  return '<td'+al+sbg+'><font color="'+fg+'" size="'+sz+'">'+bold
}/*   --------------------------------------------------------- */
function getwdays(dd,mm,yy){ wdays=0 // work days from 1.jan 
  for (m=1; m<=mm;   m++) { // buf+=ln+' mm-yy:'+m+'-'+yy+ln)
    for (d=1; d<=ldm(m,yy); d++) {
      // buf+=' '+d)
      if(Wday(d,m,yy)=='w')  wdays++
      if ((m==mm) & (d==dd)) break
    }
  }
//for (d=1; d<=dd; d++){ 
//  buf+=ln+' dd-mm-yy:'+d+'-'+m+'-'+yy+' dow:'+dowi(d,mm,yy)+' '+ln)
//  if(isWorkday(d,mm,yy)) wdays++
//}
  return (wdays)
}/*   --------------------------------------------------------- */
function fcl(n,xx,ch){// fcl: fill chars leftward
  var s=''; c=ch; if(c=='') c=' '; x=xx; if (x<1) x=1
  for (var i=1; i<=x; i++)s+=c; s=s+n; l=s.length; 
  str=''; for (var i=x; i>=0; i--) str+=s.charAt(l-i)
  return str
}// -------------------------------------------------
function clnk(info,txt){
  return '<a href="" title="'+info+'">'+txt+'</a>'+'&nbsp;'
}/*   --------------------------------------------------------- */

// date.toLocaleString() date.toGMTString()
// -- todo:
// 1.auto refresh on new day for clock & kalendar
// 2.православни празници
// 3.day descr!?
// 4.select days, mark with color, save/read selection, 
// 5.run cmd if click/hh:mm on day
// 6.btn+/-/sel: year/month
// 7.config (clr/size/day descr): read/save/form+preview
_load._end()