   load+='hdr'
var yday=[]// new Array(12); // TotalIssue=0
/* --------------------------------------------------------  */
function setydays(y /*,Mpg,Epg */){// init: setydays(nyy); Workday/Holyday/Endweek
// Holydays: h(official national)/+(official religious)/-(not official)
//  define days: yday[1.12][1..31].*
  var m,d
  for (m=1;  m<=12; m++){ ld=ldm(m,y);
    yday[m-1]=[]; 
    for (d=1; d<=31; d++) {
      yday[m-1][d-1]=[];   yday[m-1][d-1].wd=null; yday[m-1][d-1].w='';
      yday[m-1][d-1].h=''; yday[m-1][d-1].t =''
    }
    for (d=1; d<=ld; d++) { weekday=dowi(d,m,y)// + day of week 0..6
      yday[m-1][d-1]=[]//new Array(4+2)  // pages: A3-40/32, A2-16
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
// unmovable - h(official)/+(orthodox fixed)/�(orthodox float)/-(not official)
{// h ���������
    setHday ( 1, 1, y,'h','���� ������')
    setHday ( 3, 3, y,'h','������������ �� ��������')
    setHday ( 6, 5, y,'h','��� �� ���������� � ����������� �����')
    setHday (24, 5, y,'h','��� �� ����������� �������� � ������� � �� ����������� ���������')
    setHday ( 6, 9, y,'h','��� �� ����������  �� ��������')
    setHday (22, 9, y,'h','��� �� �������������� �� ��������')
    setHday (25,12, y,'h','������')
// - ����������� - �������� �� �������
    setHday ( 1, 5, y,'-','-��� �� �����')// ? "6 ��� ������ � 7-��� � �� ���� ���"
    setHday ( 2, 6, y,'-','-���������� ���� ��������� �� ����� � ��������')
    setHday ( 1,11, y,'-','-��� �� ��������� ��������')
// + �������� ���������
    setHday ( 1, 1, y,'+','+��.������� ������(�����������)')
    setHday ( 6, 1, y,'+','+�����������(�����������)')
    setHday ( 7, 1, y,'+','+��.����.�������� ���� ��������� (���������)')
    setHday ( 2, 2, y,'+','+�������� ��������')
    setHday (25, 3, y,'+','+������������')
    setHday ( 6, 5, y,'+','+��.����.������ �����������(����������)')
    setHday (11, 5, y,'+','+��.����� � �������')
    setHday (29, 6, y,'+','+��.��.����� � �����(���������)')
    setHday (20, 7, y,'+','+��.����.����(�������)')
    setHday ( 6, 8, y,'+','+������������ ��������')
    setHday (15, 8, y,'+','+������� �� �������� ����������')
//            1, 9          ������ �� ���������� ���� ������
    setHday ( 8, 9, y,'+','+��������� �� �������� ����������')
    setHday (14, 9, y,'+','+����������� �� ������ ����� ��������(����������)')
    setHday (19,10, y,'+','+����.���� ������')
    setHday (26,10, y,'+','+����.�������� �����������(�����������)')
//  setHday (32, ?, y,'�','����������. ������ ����� �������������') //    
    setHday ( 8,11, y,'+','+��.�������� ������(�������������)')
    setHday (21,11, y,'+','+��������� �����������')
    setHday ( 6,12, y,'+','+��.������� �����������(��������)')
    setHday (25,12, y,'+','+��������� �������� (������)')// � ���������
    setHday (26,12, y,'+','+����� �� �������� ����������')
    setHday (27,12, y,'+','+��.������������ � ��������� ������(�����������)')
    setHday (31,12, y,'h','')
    // ---
//?  ������ ������
//?  ��������
//?  12-�� ��������� � ����������� ��������
//?  ����������� �����
//?  ������� ����� - �� ������� ��������� �� ��������� �����������
//?  �������� �������
}
/*
// + ����������� �������� --- = �� � �������� � ������� -- 18 ���
    setHday (?, ?, y,'�','����������. ������ ����� ������ ����������')//
    setHday (?, ?, y,'�','������� ����������(����� ���������)')   
    setHday (?, ?, y,'�','������� ����������(����� ���������)')
    setHday (?, ?, y,'�','�����������')
    setHday (?, ?, y,'�','�1-�� ������ �� ������� ����.�����������')
    setHday (?, ?, y,'�','�3-�� ������ �� ������� ����.��������������')
    setHday (?, ?, y,'�','�5-�� ������ �� ������� ����.')
    setHday (?, ?, y,'�','�����������')
    setHday (?, ?, y,'�','�6-�� ������ �� ������� ����.(��������,��������)')
    setHday (?, ?, y,'�','������������ ��������') // 3 ���
    setHday (?, ?, y,'�','������� ������')
    setHday (?, ?, y,'�','������� �� �����������') // ?
    setHday (?, ?, y,'�','������� �� ������')
    setHday (?, ?, y,'�','�(���������) ���������� ��������')
    setHday (?, ?, y,'�','������� �� ��.����')
//  setHday (?, ?, y,'�','����������. ������ ����� ������������') //
    setHday (?, ?, y,'�','�������������')                       //
    setHday (?, ?, y,'�','���.���')
    setHday (?, ?, y,'�','������� �� ������ ������(������� ���������)')
    setHday (?, ?, y,'�','������� �� ������ ��������� ������')
/* */ // ---
// for (i=0; i<=lhd; i++) {with (hday[i]) buf+='hday:'+(i)+' '
//     +dowbg[W].substring(0,2+1)+':' +monbg[M-1]+'-'+z2(D)+'-'+Y+ln2)}
}/*   --------------------------------------------------------- */

function setHday(d,m,y,fl,tx){
  yday[m-1][d-1].t+=tx
  yday[m-1][d-1].h=fl  // holyday=h/+/-/e/n
  if ((fl=='h')|(fl=='e') )
    yday[m-1][d-1].w='n' // not workday if official holiday/weekend!
}
function Hday(d,m,y){var h
  try {    h=yday[m-1][d-1].h
  } catch (error) {h='?'; alert('Hday(d,m,y):'+d+','+m+','+y+' > '+(error));}
  return h 
}  // holyday=h/+/-/e/n
/*   --------------------------------------------------------- */  
function setWday(d,m,y/*,Mpg,Epg*/,tx){
  yday[m-1][d-1].t+='('+tx+')'
  yday[m-1][d-1].w='w'  // workday=w/n
  //if (!((Mpg==0)&&(Epg==0))){
  //  yday[m-1][d-1].mpg=Mpg // main body pages - 24/20
  //  yday[m-1][d-1].epg=Epg // econ body pages - 16/12
  //}
}
function Wday(d,m,y){ var w // Mpg   =yday[m-1][d-1].mpg; Epg   =yday[m-1][d-1].epg
  try {    w=yday[m-1][d-1].w 
  } catch (error) {w='?'; alert('Wday(d,m,y):'+d+','+m+','+y+' > '+(error));}
  return w 
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
 haldef='right'; valdef='bottom'; 
function cell(val,bg_,fg_,bld_,fsz_,csp_,hal_,val_){// wid
  var  bg=''; if (bg_!='') bg=' bgcolor="'+bg_+'"'
  var  fg=''; if (fg_!='') fg=  ' color="'+fg_+'"'
  var bldbeg='',bldend=''; if (bld_=='<b>' || bld_==true) 
    {bldbeg='<b>';bldend='</b>'}
  var fsz=''; if (fsz_!='') fsz=  ' size="'+fsz_+'"'
  var fntbeg='',fntend=''; if (fg!='' || fsz!='') 
    {fntbeg='<font'+fg+fsz+'>';fntend='</font>'}
  var csp=''; if (csp_!=undefined && csp_!='' && csp_>1) csp=' colspan="'+csp_+'"'
  var halnew=haldef; if(hal_!=undefined && hal_!='') halnew=hal_; halnew= ' align="'+halnew+'"'
  var valnew=valdef; if(val_!=undefined && val_!='') valnew=val_; valnew=' valign="'+valnew+'"'
 
  var cell_='<td'+halnew+valnew+bg+csp+'>'+fntbeg+bldbeg +val +bldend+fntend+'</td>'
  return cell_;
}/*   --------------------------------------------------------- */
cellempty='<td>&nbsp;</td>';
function getwdays(dd,mm,yy){ wdays=0; // work days from 1.jan 
  for (m=1; m<=mm;   m++) { // buf+=ln+' mm-yy:'+m+'-'+yy+ln)
    for (d=1; d<=ldm(m,yy); d++) {
      // buf+=' '+d)
      if(Wday(d,m,yy)=='w')  wdays++;
      if ((m==mm) & (d==dd)) break;
    }
  }
//for (d=1; d<=dd; d++){ 
//  buf+=ln+' dd-mm-yy:'+d+'-'+m+'-'+yy+' dow:'+dowi(d,mm,yy)+' '+ln)
//  if(isWorkday(d,mm,yy)) wdays++
//}
  return (wdays);
}/*   --------------------------------------------------------- */
function fcl(n,xx,ch){// fcl: fill chars leftward
  var s=''; c=ch; if(c=='') c=' '; x=xx; if (x<1) x=1;
  for (var i=1; i<=x; i++)s+=c; s=s+n; l=s.length; 
  str=''; for (var i=x; i>=0; i--) str+=s.charAt(l-i);
  return str;
}// -------------------------------------------------
function clnk(info,txt){sp='';//'&nbsp;'
  var lnk=// '<a href="" title="'+info+'">'+txt+'</a>'+sp
          txt;
  return lnk;
}/*   --------------------------------------------------------- */

// date.toLocaleString() date.toGMTString()
// -- todo:
// 1.auto refresh on new day for clock & kalendar
// 2.����������� ��������
// 3.day descr!?
// 4.select days, mark with color, save/read selection, 
// 5.run cmd if click/hh:mm on day
// 6.btn+/-/sel: year/month
// 7.config (clr/size/day descr): read/save/form+preview
   load+='.';