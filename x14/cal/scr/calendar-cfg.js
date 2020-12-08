   load+='cfg';
// -------------------------------------------------------
if((colorset<1) || (colorset>2)) colorset=1; // set default 2
if((winset  <1) || (winset  >4)) winset  =3; // set default 2
// -------------------------------------------------------
   //-- get current year,month     
     yr=new Date().getYear();
     if (yr<1900) yr=yr+1900; // current (in IE 2005, in MZ/FF 105 !?)
     m1  =new Date().getMonth() +1; 
   // -- get window size
     maxx=screen.width;       maxy=screen.height;
//  alert('screen:av.w='+screen.availWidth+' av.h='+screen.availHeight)
   if (screen.availHeight<maxy) maxy=screen.availHeight; 
   if (screen.availWidth<maxx)  maxx=screen.availWidth;
    // winresize=false;               // =true for .hta only 
// -------------------------------------------------------
// -- weeks order= (h): in 1 line; (v): in 5 lines
// -- months order x*y order=h12/v12, h6/v6, h4/v4
   wk_ord='h'; mo_ord='v12'; // default

// ---
// seeclock in ['-','L','R','T','B']
// yrfr=,yrto=
// setydaysFile=
     hd_fg    ='#9932CC'; // holydays
     wrk_fg   ="white";   // workdays F0E68C
     we_fg    ='orange';  // weekend: sat,sun #40E0D0
     
     r_fg     ='red';     // official    orthodox holydays #DAA520 gold
     f_fg     ='magenta'; // floating    orthodox
     rn_fg    ='maroon';  // nonofficial religion holydays
	 
colhd_sz=1; colhd_bold='<b>'; colhd_bg='#505050'; colhd_fg='white';
if(colorset<1 || colorset>2) colorset=1;
if (winset <1 || winset  >4) winset  =3;
//---
function maketblhdr(bsz,bclr){
  return 
}
// -------------------------------------------------------
{// default (colorset==1)
   // -- days (sizes 0..7,colors)  
     daysz=2;  daysbold ='';// <b>/''  
     crntday  ='#5050A0'; // #708090
   // -- week #
     weeksz   =1; weekno_fg="#5050A0"; weekno_bg="#040404"; weekno_bold='';
   // -- month   
     monname_sz=2; monhd_bg='black'; monhd_fg='orange';  monbold='<b>';
     wrkdays_sz=1; wrkdays_fg='blue';// month workdays
     rowbg1   ='#151520'; rowbg2   ='#303035'; 
   //           gray/#606060   #303030/#151515
     clr2     =[4,5,6 ,10,11,12]; // second bg color on these months - see hdron!
   // -- hdr line
     colhd_sz=1; colhd_bold='<b>'; colhd_bg='#505050'; colhd_fg='white';
   // -- table  
     border=0; bordercolor='#505050'; // black  #202020
   // -- outside table: default text size,clr
     out_bg='#202020'; out_fg='#a0a0a0';
   // -- clock
     cvalign='middle'; // clockpos='position:relative;left:0;top:0;'  
     fontsize=5; fontface='Verdana' ,fontcolor='gold' ,fontbold=true;
} if    (colorset==2){
     colhd_sz=2; // -- hdr line
     border=1;  // -- table 
}// -------------------------------------------------------

     bdyhdr='<'+'body bgcolor="'+out_bg+'"' // 
           +' marginwidth="0" marginheight="0" leftmargin="0" topmargin="0"'
           +' link="black" vLink="gold" hlink="maroon" alink="deeppink">'+'\n';
     bdyfnt='<'+'basefont size="2" color="'+out_fg+'" face="'
           +'Verdana ,Tahoma ,Arial ,Arial Cyr, Helvetica ,Sans Serif ,Hebar">'+'\n';
     tblhdr='<table border="'+border+'" bordercolor="'+bordercolor+'"'
           +' cellspacing="0" cellpadding="0">\n';
     out_beg=bdyhdr+bdyfnt+tblhdr;
     out_end='</table>';
// -------------------------------------------------------
{// default (winset==1){// ----------------------------------- small 1mon
     wk_ord='h'; mo_ord='v12'; 
     y1=yr; y2=yr; m2=m1; //-- years,months: y1..y2; m1..m2
     seeclock='L';         //-- show clock:L/R/-
     showstat=false;
   // -- window
     hdron=1;              // colhdr on every 1/3/4/6/12 months
     lines  =(m2-m1+1 + 1)*(y2-y1+1);// 1=(12/hdron) for m1..m2
     scrline=1; // 1: .htm/.hta (scroll ="yes")
     titline=1; // 1: .htm/.hta (caption="yes")
       w= 990; h=20*(lines+scrline+titline);
       if (wk_ord=='v') {w=285; h=160;}   
       x=0;y=maxy-h; //*fontsize!?
       if(seeclock!='-') w+=130;
}if (winset==2){// ----------------------------------- big 12mon
     wk_ord='h'; mo_ord='v12'; 
     y1=yr; y2=yr; m1=1; m2=12; //-- years,months: y1..y2; m1..m2
     seeclock='-';         //-- show clock:L/R/-
     showstat=true;
   // -- window
     hdron=3;              // colhdr on every 1/3/4/6/12 months
     lines=(m2-m1+1 + 4)*(y2-y1+1); // 4=(12/hdron) for (m2-m1+1) 
     scrline=1; // 1: .htm/.hta (scroll ="yes")
     titline=1; // 1: .htm/.hta (caption="yes")
       w=985; h=21.1*(lines+scrline+titline); 
       if (wk_ord=='v') {w=285; h=maxy;}    
       x=maxx-w;y=0; //*fontsize!?
       if(seeclock!='-') {w+=130;x=x-130;}
}else if (winset==3){// ----------------------------------- small 1mon v
     wk_ord='v'; mo_ord='v12'; 
     y1=yr; y2=yr; m2=m1; //-- years,months: y1..y2; m1..m2
     seeclock='D';         //-- show clock:L/R/U/D/-
     showstat=false;
   // -- window
     hdron=1;              // colhdr on every 1/3/4/6/12 months
     lines  =(m2-m1+1 + 1)*(y2-y1+1);// 1=(12/hdron) for m1..m2
     scrline=0; // 1: .htm/.hta (scroll ="yes")
     titline=1; // 1: .htm/.hta (caption="yes")
       w= 955; h=20*(lines+scrline+titline);
       if (wk_ord=='v') {w=250; h=165;}   
       x=maxx-w;y=0; //*fontsize!?
       if(seeclock=='L' || seeclock=='R') {w+=130;x=x-130;}
       if(seeclock=='T' || seeclock=='B') {h+=20;}
}else if (winset==4){// ----------------------------------- big 12mon v
     wk_ord='v'; mo_ord='v12'; 
     y1=yr; y2=yr; m1=1; m2=12; //-- years,months: y1..y2; m1..m2
     seeclock='-';         //-- show clock:L/R/-
     showstat=true;
   // -- window
     hdron=3;              // colhdr on every 1/3/4/6/12 months
     lines=(m2-m1+1 + 4)*(y2-y1+1); // 4=(12/hdron) for (m2-m1+1) 
     scrline=1; // 1: .htm/.hta (scroll ="yes")
     titline=1; // 1: .htm/.hta (caption="yes")
       w=985; h=21.8*(lines+scrline+titline); 
       if (wk_ord=='v') {w=295; h=maxy-30;}    
       x=maxx-w;y=0; //*fontsize!?
       if(seeclock!='-') {w+=130;x=x-130;}
}// -------------------------------------------------------
   load+='.';