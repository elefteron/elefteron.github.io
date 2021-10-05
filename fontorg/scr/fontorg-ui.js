load_new('scr/fontorg_ui.js')
//if (dbg) log('>>>')
function fontorg_status(){
  sta('at '+getdate2(1,false)+'> '
    +' Sets:'+(LastSet+1)+' Paths:'+(LastPath+1)+' Fonts:'+(LastFont+1));
}

function fontorg_ui(){ 
inload='fontorg-ui'; 

   butBlu='color:white ;background-color:#6699CC;border-color:#99CCFF;'
   butOrn='color:black ;background-color:orange; border-color:darkorange;'
   butAcc='color:yellow;background-color:maroon ;border-color:red;'
   butRed='color:white ;background-color:maroon ;border-color:red;'
   butYel='color:black ;background-color:yellow ;border-color:darkorange;'
   butstl='font-size:10pt;line-height:12pt;border-width:1px;border-style:outset;'
         +'text-align:left;padding:0px;height:20px;'// text-shadow: 0px 1px 1px white;
   butBlu=butBlu+butstl+'width:22px;'
   butBl2=butOrn+butstl+'width:140px;'//+2*btn1+10
   butBl1=butOrn+butstl+'width:65px;'
   butAcc=butAcc+butstl+'width:65px;'
   butRed=butRed+butstl+'width:65px;'
   butYel=butYel+butstl+'width:65px;'
// border-width:thin medium thick 10px;border-color:red green blue pink;  - top,right,bot,left
// border-color:transparent  
// border-style:hidden 	The same as "none", except in border conflict resolution for table elements
// border-style:none/dotted/dashed/solid/double/inherit
// border-style:groove/ridge/inset/outset <- 3D borders, the effect depends on the border-color value 
//              вдлъбнат/набразден/вмъкнат?/начален?
// vertical-align: baseline, sub, super, top, text-top, middle, bottom, text-bottom, length, value%
// text-align: left,center,right;

   inpstyle='color:orange;background-color:#444;border:solid 1px darkorange inset;'
           +'font-size:10pt; line-height:12pt;font-weight:bold;'
// --------------------------------------------------------
// activex cant work with relative path
   //   'E:/programs/+font mng/fontorg3.js/'
   pfr   =rootlocx_+'/'+'fontorg'+'/'+'fonts-data'+'/'   // '\\'
   pto   =pfr //.htm -> .js :data only
   catalog="2010.12 ea";  
   //ext='afs'
// window size and pos
// if (fo3.caption=='yes') caption=25; else caption=0
   maxx=screen.width; maxy=screen.height; 
   // screen.availHeight screen.availWidth 
   w1=800; h1=900; x1=10;     y1=30;   //icohta="string.ico"  // control scr  -- good for 1024/768 and up
   w2=w1;  h2=650; x2=x1;     y2=h1+y1;  icolog='string.ico'  // log scr
   w3=800; h3=h2;  x3=x1+300; y3=h1+y1;  icohlp='string.ico'  // hlp scr
// clrY  ='<font color="yellow">'; clrM  ='<font color="magenta">'
// clrW  ='<font color="white">' ; endclr='</font>'
   ln='\n'; sl='\\';br='<br>'
   var s='';colapsed=true;
// --------------------------------------------------------
   if(_iex) setw(w1,h1,x1,y1);                 // control scr  
   var dlog=getdate2(1,false)                 // yyyy-mm-dd_hh:mm:ss
// openlog(w2,h2,x2,y2,Pid,'log '+dlog,icolog) // log scr
// report=fname+"-log"; icorep='../string.ico' // htm
//+"make_frep(Pid,pfr,pto,report,'js',icorep);initrep(); " 
   empty='';
// log('<'+'xmp>') // test
// ---
   var s='&nbsp;'
// if(dbg>0) log(areload_());
   var run='',foriex="log('for activeX under IE!'+eol+br);"; 
   getvalues="pfr=f.wrkdir.value; pto=pfr; catalog=f.cat_.value; "
        //  +"fileafs=f.afs_.value; filejs=f.js_.value;  filertf=f.rtf_.value; "
  Win_Mac='?'; // W:'Wnam=' or M:'Mnam=' Win_Mac:char; 
  if(_iex) run="Win_Mac=AFS_load(pfr,catalog,'.afs');StatSets();fontorg_status();"; 
  else run=foriex;		
   getafs_btn =btn("get.AFS",butAcc,getvalues+"if (catalog!=empty)"+run ) 
  if(_iex) run="REG_load(pfr,catalog,'.reg');StatSets();fontorg_status();"; 
  else run=foriex;		
   getreg_btn =btn("get.REG",butAcc,getvalues+"if (catalog!=empty)"+run ) 
   
   nulldata="LastSet=LastPath=LastFont=-1; Fnt=Set=Pth=''; fontorg_status();"
   statdata='Sets='+(LastSet+1)+' Paths='+(LastPath+1)+' Font='+(LastFont+1)
   run="var file=pfr+catalog+'.js';" 
   /**-/+nulldata+"loadjs_0(file,0);" +"fontorg_status();alert('>0.');"/* iex- mon- fox? saf? gog? opr? */
   /* *-/+nulldata+"loadjs_1(file,0);" +"fontorg_status();alert('>1.');"/* iex- mon- fox? saf- gog? opr? */
   /* *-/+nulldata+"loadjs_2(file,0);" +"fontorg_status();alert('>2.');"/* iex+ mon- fox? saf- gog? opr? */
   /* *-/+nulldata+"loadjs_3(file,0);" +"fontorg_status();alert('>3.');"/* iex+ mon- fox? saf- gog? opr? */
   /* */+nulldata+"loadjs_s(file,0);" +"fontorg_status();alert('>s.');"/* iex+ mon- fox? saf- gog? opr? */
   getjs_btn  =btn("get.JS" ,butRed,getvalues+"if(catalog!=empty)"+run+"StatSets();")

  if(_iex) run="JsExport(pto,catalog,'.js',Win_Mac,getdate2(2,false));"; else run=foriex;		
   putjs_btn  =btn("put.JS" ,butAcc,getvalues+"if(catalog!=empty)"+run)                
   
  if(_iex) run="RtfExport(pto,catalog,'.rtf',Win_Mac,getdate2(2,false));"; else run=foriex;	
   putrtf_btn =btn("put.RTF",butAcc,getvalues+"if(catalog!=empty)"+run)

   check_btn  =btn("check" ,butBl1 // check dir&files existing!
                 ,"log('=== check font names '+eol+br);"
                 +"log(CheckDblWinNames()+CheckDblPSnames()+ShowBadNames());"
                 +"log('=== check end.'+eol+br);")

   info_btn   =btn("info",butYel,"info=newwin(Pid,'fontorg-info.htm','info',w3,h3,x3,y3,icolog,false);")
// listsp_btn =btn("ListS&P"    ,butBl1,"log(ListSets()+ListPaths());")
   showsp_btn =btn("ShowS&P"    ,butBl1,"log(show_sets()+show_paths());")
   listfnt_btn=btn("ListFonts"  ,butBl1,"log(ListFonts());") 
   showfnt_btn=btn("ShowFonts"  ,butBl1,"log("+"ShowFontCatalog()"+");")
   
   var formula_style='3/5'
   get_clr="formula_style=eval(f.formula.value);f.formula.value=formula_style;new_style(formula_style);"   
   new_style_btn  =btn("clr",butBlu,get_clr)
   new_style_run  =inText("formula",8,formula_style,"3/5")  +new_style_btn  
   
   green_style_btn=btn("g" ,butBlu,"f.formula.value='1/3';" +get_clr) 
   lime_style_btn =btn("l" ,butBlu,"f.formula.value='1/4';" +get_clr) 
   blue_style_btn =btn("b" ,butBlu,"f.formula.value='3/5';" +get_clr) 
   cyan_style_btn =btn("c" ,butBlu,"f.formula.value='1/2';" +get_clr) 
  orange_style_btn=btn("o" ,butBlu,"f.formula.value='1/7';" +get_clr) 
   mag_style_btn  =btn("v" ,butBlu,"f.formula.value='0.8';" +get_clr) 
   red_style_btn  =btn("r" ,butBlu,"f.formula.value='1/60';"+get_clr) 
   clr_btn= green_style_btn+s+lime_style_btn+s+blue_style_btn
         +s+cyan_style_btn+s+orange_style_btn+s+red_style_btn+s+mag_style_btn    
   inv_style_btn  =btn("inv"  ,butBlu,"inv_style();") 

   edit_mode_btn  =btn("edit_mode"  ,butBlu,"edit_mode();")  
   get_style_btn  =btn("get_style"  ,butBlu,"get_style();") 
// close_btn  =btn("x"          ,butRed,"if(!(typeof(info)=='undefined'))info.close();"
//                                +"if(!(typeof(log_)=='undefined'))closelog();"+"window.close();") 
   clrdata_btn=btn("clearData"  ,butYel,nulldata)
   clrlog_btn =btn("clearLog"   ,butYel,"log("+''+");")
//    "if(!(typeof(log_)=='undefined'))closelog();"+"openlog(w2,h2,x2,y2,Pid,'log '+dlog,icolog);")

   dirlng=58; filelng=20; extlng=5;
   workdir_inp='<LABEL FOR="wrkdir" ACCESSKEY="w"></LABEL>'// ACCESSKEY="w" -> Alt+w 
              +inText("wrkdir",dirlng,pfr,inpstyle) //  readonly="readonly"
   cat_fileinp='<LABEL FOR="cat_"   ACCESSKEY="c"></LABEL>'     
              +inText("cat_"  ,filelng,catalog,inpstyle)
/**-/             
   afs_fileinp='<LABEL FOR="afs_"   ACCESSKEY="a"></LABEL>'     
              +inText("afs_"  ,filelng,fileafs,inpstyle) //+inText("",extlng,'.afs',inpstyle)
   js_fileinp ='<LABEL FOR="js_"    ACCESSKEY="j"></LABEL>'    
              +inText("js_"   ,filelng,filejs ,inpstyle) //+inText("",extlng,'.js' ,inpstyle)
   rtf_fileinp='<LABEL FOR="rtf_"   ACCESSKEY="r"></LABEL>' 
              +inText("rtf_"  ,filelng,filertf,inpstyle) //+inText("",extlng,'.rtf',inpstyle) 
/**/
   fontfamily='Lucida Console'; fontsize=11;// setFont(fontfamily,fontsize)// "Segoe UI",13
   fontbig_btn=btn("T+"   ,butYel,"if(fontsize<32)fontsize=fontsize+1; setFont(fontfamily,fontsize);")
   fontsma_btn=btn("T-"   ,butYel,"if(fontsize> 4)fontsize=fontsize-1; setFont(fontfamily,fontsize);")
// --------------------------
   eapage='mailto:elefter@abv.bg'; eades='EA design ('+eapage+')';
   eadesign='<a'+pp_('href',eapage)+pp_('alt',eades)+pp_('title',eades)+'><b>EA</b></a> design'; 
// --------------------------
/**/
  var ui_hdr=
   '<span style="text-align:left;'
  +'font-size:12pt;line-height:12pt;color:#ffa;'
  +'text-shadow: 0px 2px 2px black;">'
  +'<a href="fontorg.htm">'+Pid.toUpperCase()+'</a> '+id2+s+s+eadesign+s+'</span>'
  +'<form name="f">'+'<table>'
  +'<tr><td>'+workdir_inp                                         +'</td><td>'+cat_fileinp  +'</td></tr>'
  +'<tr><td>'+getafs_btn+s+getreg_btn +s+putjs_btn +s+getjs_btn  +s+putrtf_btn +'</td><td>'+clrdata_btn+s+clrlog_btn +'</td></tr>'
  +'<tr><td>'+check_btn +s+listfnt_btn+s+showsp_btn+s+showfnt_btn+'</td><td>'+info_btn +'</td></tr>'
  +'<tr><td>'+inv_style_btn+s+new_style_run+s+clr_btn+'</td><td>'+'</td><td>'+'</td></tr>' 
/*+edit_mode_btn+s+get_style_btn         fontbig_btn+s+fontsma_btn*/
  +'</table>'+'</form>';
  
  hdr(''); hdr(ui_hdr)
/**/
// -- check default datafile:
sta('')
fontorg_status();StatSets();
CheckDblWinNames();CheckDblPSnames();ShowBadNames();
ListPaths();
if(_iex)init_cond_ieax();
// ---
//log(show_sets()+show_paths());
//if(iex) log(sys())
// --------------------------	
/**-/ todo:
-.mon,fox - load htm to load scr in htm hdr
-.path: file counters, set: tt/ps/ot counters 
-.data -1?->*

0.?font info to file: perl/py/exe
1.?rename font names by batch 
2.font types: TT(ttf)/T1(ps1)/T3(ps3)/OT/MM(?)/MMI(?): T/1/3/O/M/I, 
  PS(.pfb+.pfm+.pfa),(.fon)=screen(vector or raster)
3.catalog styles
4.files exist?
5.move-to-set/copy-to-set/del-file/del-set/rename-set/rename-file/rename-font - then back save to afs and reload it
--- catalog todo:
1.show catalog initial: pats&sets, -fonts- (colapsed), -teststr
2.show only errors: ?diff listfonts - check
3.show catalog (show fonts) buttons for every set/all by set, every path/all by path, 
  -all/+all with target=under-set/under-path/comparision-window
4.select testchars:
   lat,cyr,oldcyr,accentedcyr,serbcyr,num,
   table(dtp,ascii-range-list, utf-range-list)
--- data todo: 
1.second datafile get for check of new/old with diff/old no diff
  - load from .reg/registry?: winname,type,path,file; ?compare with loaded info?
  - csv to js with row names
2.?temporary fonts: how todo, where
/**/
}// ---
//if (dbg) log('ui<<<')
load_end()