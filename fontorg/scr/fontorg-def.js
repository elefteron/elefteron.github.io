load_new('scr/fontorg-def.js')
{catalog='';ln='\n'; br=hteol='<br>'; eol='\r\n'; hsp='&nbsp'; l=hteol+eol;rtfTab='\\tab '; 
rtfNwln='\\par';// \x0D=13 \x0A=10 lf+cr
htmNwln=ln+hteol
// ------------------------------------------------
  latWin='ABCDEFGHIJKLMNOPQRSTUVWXYZ '
        +'abcdefghijklmnopqrstuvwxyz '
  dtpch =" πßàï∞∑Ö-ñóÜáâëíÇìîÑãõ´ª§¨±µ∂ " // small defice?
  serb  =" °¢•ÅÉçùéûêèü°¢äöåú "
// \xdd   Character with Latin-1 encoding by 2 hexadecimal digits 
// \udddd Character with Unicode encoding by 4 hexadecimal digits - utf-16/utf-8 ?
//? utf-8:\xD1\xA0 == utf-16: \u0460
  
// http://0xcc.net/jsescape/
// http://www.atm.ox.ac.uk/user/iwi/charmap.html
// http://www.wazu.jp/gallery/Test_CyrOCS.html
// http://www.wazu.jp/gallery/Test_CyrNS.html
// http://titus.fkidg1.uni-frankfurt.de/didact/idg/slav/slavalpx.htm
/**/ // unicode hexadec: \uxxxx or \uxxxxxxxx
   oldbg ='\u0460\u0461\u0462\u0463\u0464\u0465\u0466\u0467'   
         +'\u0468\u0469\u046A\u046B\u046C\u046D\u046E\u046F' 
         +'\u0470\u0471\u0472\u0473\u0474\u0475\u0476\u0477'
         +'\u0478\u0479\u047A\u047B\u047C\u047D\u047E\u047F\u0480\u0481'
// oldbg bad=ie8,       ok=seamonkey,firefox,safari,opera,chrome; 
/**/ 
  acl='\u0300'; // utf8 accent topleft  to downright 
  acr='\u0301'; // utf8 accent topright to downleft
  acvCap=['¿','≈','»','Œ','”','⁄','ﬁ','ﬂ'] // cyr vowels to be accented
  acvSma=['‡','Â','Ë','Ó','Û','˙','˛','ˇ']
  var sl=sr='';
  for (i=0; i<acvCap.length; i++) {
    sl+=acvCap[i]+acl+acvSma[i]+acl; 
    sr+=acvCap[i]+acr+acvSma[i]+acr; 
  }
  acv1=sl+' '+sr
// acv1   bad=ie8,opera, ok=seamonkey,firefox,safari,chrome
// 'a\u02cbA\u02cb a\u0300A\u0300 a\u02caa\u02ca' ≈(\u0400\u0450)
  acv2='¿\u00c0\u00e0 ≈\u00c8\u00e8 »\u040d\u045d Œ\u00d2\u00f2 ”\u00dd\u00fd \u0404\u0454 \u0401\u0451 '
// --- 
  cyrWinCap='¿¡¬√ƒ≈∆«»… ÀÃÕŒœ–—“”‘’÷◊ÿŸ⁄€‹›ﬁﬂ '// also sort order
  cyrWinSma='‡·‚„‰ÂÊÁËÈÍÎÏÌÓÔÒÚÛÙıˆ˜¯˘˙˚¸˝˛ˇ '
  cyrWin=cyrWinCap+cyrWinSma
  others=" 0123456789'\";,. `~!@#$%^&-_=+[]{}()<> "
  badfsch='/\\:'; wrnch='ô©Æ'// bad for hdfs cdfs; 
  okchars=latWin+cyrWin+others+wrnch; // mac!?
  cyrMac='\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f'
        +'\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9c\x9e\x9f'
        +'\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef'
        +'\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xdf\x7f'
//      /*hex:80..9a,9c,9e,9f->dec:128..154,156,158,159*/
//      /*hex:e0..fe,df,7f->dec:224..254,223,127*/ 
// ------------------- output text --------------------------------------------------------  
   TESThtmwin=latWin +htmNwln+cyrWin +htmNwln+acv2+serb 
                                     +htmNwln+oldbg
                                     +htmNwln+dtpch+wrnch+others;
   TESThtmmac=latWin +htmNwln+cyrMac +htmNwln+dtpch+wrnch+others;
   TESTrtfwin=latWin +rtfNwln+cyrWin +rtfNwln+dtpch+wrnch+others;
   TESTrtfmac=latWin +rtfNwln+cyrMac +rtfNwln+dtpch+wrnch+others;
/*use "charset=Windows-1251" on MAC&WIN*/
// ---------------------------------------------------------------------------------------- 
      if (typeof(dbg)=='undefined') dbg=0; // TestLvl usage: if (Test(1)) ... 1/2/3
      //function Test(Lvl){ return (TestLvl>0)&&(TestLvl>=Lvl)}
// ------------------- control chars (define depend of language=js)
      // tab='\t'      // \x09            =Chr(9) - .pas
      hdrbgclr='black'; hdrtxtclr="white"; tblclr='#8888cc'; // darkorange
      txtbgclr='#999999';/* #666699 lila*/ 
	  txtfgTESTclr='black';
      errclr='<font color="red">'; wrnclr='<font color="blue">'; endclr='</font>'
// ------------------- max values
      DefTxtSz=8;  /*default text size in points (1pt=0.72"=1.8288mm ?)*/
      TestTxtSz=24;/*Test strings text size in points*/
//    MaxPath=100; MaxFont=4000; MaxSet= 64; // .pas only
      MaxPathLng=40; FntNameLng=40; SetNameLng=18;
// ------------------- structs --- 3:adFont() 1,2:adSet() 4:adPath() 7:vol
      CrntSetName:String//(SetNameLng) // new String(SetNameLng) typeof(*): "object"
      PrevFont   :String//(FntNameLng) // string[FntNameLng]     typeof(*): "string"
// --------------------------------------------------------
  Fonts =[]; /* new Array(MaxFont) */ LastFont=-1; CrntFont=-1 
}
//function adFont(WinName_,StyleCh_,TypeCh_ ,PSname_,FileName_   ,PathNo_ ,SetNo_       
function adFont(TypeCh_,StyleCh_,WinName_,PSname_,FileName_   ,PathNo_ ,SetNo_       
               ,Flag_,Bad_  ,RepWin_ ,RepPs_ ,RepStWin_,RepStPs_)
//adFont(/*   0*/ "M","N","TektoMM"    ,"TektonMM","ZJRG____.MMM",-1,0 ,"*" ,0,0, 0,"-","-")
//adFont(/*   0*/ "T","B","AharoniBold","Aharoni" ,"ahronbd.ttf" ,-1,0 ,"*" ,0,0,62,"-","test")
{//if(LastFont>=MaxFont) return
  LastFont++;//out('\n adFont['+LastFont+']='+TypeCh_+';'+StyleCh_+';'+WinName_)
  Fonts[LastFont]=[]// new String(n)
  Fonts[LastFont].TypeCh   =''//String(1)          //=TypeCh  /*TT/PS/MM/MMI*/
  Fonts[LastFont].StyleCh  =''//String(1)          //=StyleCh /*N/B/I/T*/ ;
  Fonts[LastFont].Flag     =''//String(1)          //=Flag    /*Cyr/Lat=another char*/
  Fonts[LastFont].Bad      =''//String(1)          //=Bad     /*0=ok,1=win,2=ps,3=both*/
                                                
  Fonts[LastFont].FileName ='?'//String(100)        //=FileName 
  Fonts[LastFont].WinName  ='?'//String(FntNameLng) //=WinName  
  Fonts[LastFont].PSname   ='?'//String(FntNameLng) //=PSname   
  Fonts[LastFont].PathNo   =-1 /*:integer       */ //=PathNo  /*index in Paths[8]*/
  Fonts[LastFont].SetNo    =-1 /*:integer       */ //=SetNo   /*index in Sets[*]*/
                                                 
  Fonts[LastFont].RepWin   =-1 /*:integer       */ //=RepWin   
  Fonts[LastFont].RepPs    =-1 /*:integer       */ //=RepPs    
  Fonts[LastFont].RepStWin ='-'//String(1)          //=RepStWin 
  Fonts[LastFont].RepStPs  ='-'//String(1)          //=RepStPs 

   if (!(typeof(WinName_ )=='undefined')) Fonts[LastFont].WinName =WinName_    
   if (!(typeof(TypeCh_  )=='undefined')) Fonts[LastFont].TypeCh  =TypeCh_     
   if (!(typeof(StyleCh_ )=='undefined')) Fonts[LastFont].StyleCh =StyleCh_    
   if (!(typeof(PSname_  )=='undefined')) Fonts[LastFont].PSname  =PSname_     
   if (!(typeof(FileName_)=='undefined')) Fonts[LastFont].FileName=FileName_   
   if (!(typeof(Flag_    )=='undefined')) Fonts[LastFont].Flag    =Flag_       
   if (!(typeof(PathNo_  )=='undefined')) Fonts[LastFont].PathNo  =PathNo_     
   if (!(typeof(RepWin_  )=='undefined')) Fonts[LastFont].RepWin  =RepWin_     
   if (!(typeof(RepStWin_)=='undefined')) Fonts[LastFont].RepStWin=RepStWin_  
   if (!(typeof(Bad_     )=='undefined')) Fonts[LastFont].Bad     =Bad_     
   if (!(typeof(SetNo_   )=='undefined')) Fonts[LastFont].SetNo   =SetNo_        
   if (!(typeof(RepPs_   )=='undefined')) Fonts[LastFont].RepPs   =RepPs_        
   if (!(typeof(RepStPs_ )=='undefined')) Fonts[LastFont].RepStPs =RepStPs_ 
  // out('\n adFont='+Fonts[LastFont].WinName )
  return LastFont 
}// --------------------------------------------------------
  Sets  =[];/*new Array(MaxSet)/**/  LastSet =-1; CrntSet =-1
function adSet(Name_,TTfil_,PSfil_){
//alert('adSet:'+Name_+','+TTfil_+','+PSfil_)
//if(LastSet>=MaxSet) return
  LastSet++; 
  Sets[LastSet]=[]  
  Sets[LastSet].Name=''//String(SetNameLng)           //=Name 
//Sets[LastSet].TTfon =-1/*:integer*/                 //=TTfon
//Sets[LastSet].PSfon =-1/*:integer*/                 //=PSfon
  Sets[LastSet].TTfil =-1/*:integer*/                 //=TTfil
  Sets[LastSet].PSfil =-1/*:integer*/                 //=PSfil
   if (Name_ !=undefined) Sets[LastSet].Name =Name_
   if (TTfil_!=undefined) Sets[LastSet].TTfil=TTfil_
   if (PSfil_!=undefined) Sets[LastSet].PSfil=PSfil_
  return LastSet
}// --------------------------------------------------------
  Paths =[];/*new Array(MaxPath)*/ LastPath=-1; CrntPath=-1
function adPath(Name_,Pfiles_){
//if(LastPath>=MaxPath) return
  LastPath++;
  Paths[LastPath]=[]  
  Paths[LastPath].Name=''//String(P)               //=Name  
  Paths[LastPath].Pfiles                           //=Pfiles 
  /*files counter for this path*/
   if (Name_  !=undefined) Paths[LastPath].Name  =Name_
   if (Pfiles_!=undefined) Paths[LastPath].Pfiles=Pfiles_
  return LastPath
}// --------------------------------------------------------
function GetFontErr(k){ //=Bad     /*0=ok,1=win,2=ps,3=both*/ 
  var mes=wrn=err='', i;
  with (Fonts[k]) {
    if      (RepStWin=='E')  err+=errclr+' Err: Win name.'+endclr
    else if (RepStWin=='W')  wrn+=wrnclr+' Wrn: Win name.'+endclr;
    if (RepStWin!='-')  {
      if(RepWin===undefined || RepWin<0| RepWin>LastFont){ 
	    mes+=hteol+' sys:[bad RepWin='+RepWin+']'+hteol
      }else{ i=Fonts[RepWin].SetNo;
        mes+=' exist as# '+'<a href="#'+RepWin+'">'+RepWin+'</a>'+' in set ('+i+') '+Sets[i].Name+hteol;
      }
    };
    if      (RepStPs =='E')  err+=errclr+' Err: PS name. '+endclr
    else if (RepStPs =='W')  wrn+=wrnclr+' Wrn: PS name. '+endclr;
    if (RepStPs !='-')  {
      if(RepPs===undefined || RepPs<0|| RepPs>LastFont) 
	    mes+=hteol+' sys:[bad RepPs='+RepPs+']'+hteol
      else{ i=Fonts[RepPs].SetNo;
        mes+=' exist as# '+'<a href="#'+RepPs+'">'+RepPs+'</a>'+' in set ('+i+') '+Sets[i].Name+hteol;
      }
    };
	 //=Bad     /*0=ok,1=win,2=ps,3=both*/
    if ((Bad==1) || (Bad==3))  err+=errclr+' Err: Win name. bad chars'+endclr;
    if ((Bad==2) || (Bad==3))  wrn+=wrnclr+' Wrn: PS name.  bad chars'+endclr;
  };
  if (mes!='')  mes=' #'+k+' '+err+wrn+hteol+mes // '#'+k
  return mes; // fc(k,4,' ')
}// ------------------------------------------------

function show_paths(){ var buf='',buf2='';
  buf+='<table  id="paths"  '+hp('border',"0")+' >'
  buf+=ht_('tr',hp('bgcolor',hdrbgclr)
         ,ht('td',ht_('font',hp('color',hdrtxtclr),'#'        ) )
         +ht('td',ht_('font',hp('color',hdrtxtclr),'path Name') )
         +ht('td',ht_('font',hp('color',hdrtxtclr),'Pfiles?'  ) )  )  
  for (k=0; k<=LastPath; k++) with (Paths[k]) {
    buf+= ht('tr',ht('td',k)+ht('td',Name)+ht('td',Pfiles) )
  }
  buf+='</table>';
  {buf2 ='<table  id="paths+" '+hp('border',"0")+' >'
        +ht_('tr',hp('bgcolor',hdrbgclr) // summary row
	      ,ht_('td',hp('align'  ,"right"), ht_('font',hp('color',hdrtxtclr),LastPath+1) )
          +ht_('td',hp('align'  ,"right"), ht_('font',hp('color',hdrtxtclr),'summary:') )
          +ht_('td',hp('align'  ,"right"), ht_('font',hp('color',hdrtxtclr),'?'       ) ) )
        +'</table>';
  } 
  return '<span>'+ht_('a',hp('name',"paths"),'&GT; paths:')+(LastPath+1)+'</span>'+buf+buf2
};
function show_sets(){ var buf='';
  buf+='<table id="sets" border="0">'+eol
  buf+='<tr bgcolor="'+hdrbgclr+'">'
    +ht('td',ht_('font',hp('color',hdrtxtclr),'#'       ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'set Name'))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'TT'      ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'PS'      ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'all'     ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'paths'   ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'wrn'     ))
    +ht('td',ht_('font',hp('color',hdrtxtclr),'err'     ))
    +'</tr>'                                       
  var _TTfil=0; _PSfil=0;
  for (k=0; k<=LastSet; k++) with (Sets[k]) { _TTfil+=TTfil; _PSfil+=PSfil;
     buf+='<tr bgcolor="'+tblclr+'">'+'<td align="right">'+k+'</td>'
      +'<td>'+'<a href="#'+Name+'">'+Name+'</a></td>'
      +'<td align="right">'+TTfil+'</td>'+'<td align="right">'+PSfil+'</td>'
      +'<td align="right">'+(TTfil+PSfil)+'</td>'+'</tr>'
  }
  {// summary  
     buf+='<tr bgcolor="'+hdrbgclr+'">'
	  +'<td align="right">'+ht_('font',hp('color',hdrtxtclr),(LastSet+1)    )+'</td>'
      +'<td align="right">'+ht_('font',hp('color',hdrtxtclr),'summary:'     )+'</td>'
      +'<td align="right">'+ht_('font',hp('color',hdrtxtclr),_TTfil         )+'</td>'
	  +'<td align="right">'+ht_('font',hp('color',hdrtxtclr),_PSfil         )+'</td>'
      +'<td align="right">'+ht_('font',hp('color',hdrtxtclr),(_TTfil+_PSfil))+'</td>'
	  +'</tr>'
  }
  buf+='</table>'
  return '<span><a name="sets"> </a>&GT; sets:'+(LastSet+1)+'</span>'+buf
};
function show_fonts(){var buf='';var colapsed=true; 
// 1. colapse-expand inside sets
// 2. "select font" in set list to show one font 
// 3. btn "show all fonts in set" 
// 4. btn "show all"
  FontsHdr='<tr bgcolor="'+hdrbgclr+'"width=900px>'
  +'<th width="10"><font color="white"><b>Set#     </b></font></td>'
  +'<th width="10"><font color="white"><b>Font#    </b></font></td>'
  +'<th width="10"><font color="white"><b>Type     </b></font></td>'
  +'<th width="10"><font color="white"><b>Style    </b></font></td>'
  +'<th width="90"><font color="white"><b>Win_Name </b></font></td>'
  +'<th width="90"><font color="white"><b>PS_name  </b></font></td>'
  +'<th width="90"><font color="white"><b>File_Name</b></font></td>'
//+'<th width="50"><font color="white"><b>Flag     </b></font></td>'+'<td><font color="white"><b>Bad      </b></font></td>'
//+'<th width="50"><font color="white"><b>RepWin   </b></font></td>'+'<td><font color="white"><b>RepPs    </b></font></td>'
//+'<th width="50"><font color="white"><b>RepStWin </b></font></td>'+'<td><font color="white"><b>RepStPs  </b></font></td>'
  +'<th width="90"><font color="white"><b>wrn/err  </b></font></td>'
  +'<th width="50"><font color="white"><b>Path#    </b></font></td>'
  +'</tr>'

  var CrntSet=-1
   for (k=0; k<=LastFont; k++) with (Fonts[k]) {
    var WRNclr='red',TESThtm
// if (FileName.length>FntNameLng || WinName.length>FntNameLng || PSname.length>FntNameLng) WRNclr='red'
    if (Win_Mac=='W') TESThtm=TESThtmwin; else TESThtm=TESThtmmac;
    if      (StyleCh=='B') TESThtm='<b>'   +TESThtm+'</b>'
    else if (StyleCh=='I') TESThtm='<i>'   +TESThtm+'</i>'
    else if (StyleCh=='T') TESThtm='<b><i>'+TESThtm+'</b></i>'
/**/
    if (SetNo!=CrntSet)  { 
      if (CrntSet==-1) buf+='</table></div>'; 
      CrntSet=SetNo
      buf+='<B><a name="'+Sets[SetNo].Name+'" href="#sets" title="goto set">^</a></B> '
		 +'<div style="cursor:pointer;" onclick=\'ShowHideIDs(["'+CrntSet+'"])\' title="expand/colapse">'
		 +' fonts in set# '+SetNo+': '+Sets[SetNo].Name+'</div>'
		 
	     +'<div id="'+CrntSet+'"><table border="0" width=900px ">' // style="display:none;
      //  +'<tr bgcolor="'+tblclr+'">'
	  //  +'<td colspan=14>'
	  //  +'</td></tr>' 
         +FontsHdr
    }
/**/
    buf+='<tr valign="top" bgcolor="'+txtbgclr+'">'
    +'<td align="right" bgcolor="'+tblclr+'">'+SetNo+'</td>'
    +'<td align="right">'+'<a name="'+k+'"></a>'+k+'<a href="#sets">^</a>'+'</td>'       
    +'<td>'+TypeCh   +'</td>' +'<td>'+StyleCh  +'</td>'  
    +'<td>'+WinName  +'</td>'             +'<td>'+PSname   +'</td>' +'<td>'+FileName +'</td>'
//  +'<td>'+Flag     +'</td>'  +'<td>'+Bad      +'</td>' 
//  +'<td>'+RepWin   +'</td>'  +'<td>'+RepPs    +'</td>'  
//  +'<td>'+RepStWin +'</td>'  +'<td>'+RepStPs  +'</td>'
    +'<td bgcolor="white" >'+GetFontErr(k)+'</td>'
    +'<td>'+PathNo   +'</td>'
    +'</tr>'
	
//  if(!colapsed || (dbg>0 && k<=3)) // expand all family !?
//    buf+='<tr>'
//        +'<td colspan=13 bgcolor="gray">'
//        +'<font color="'+txtfgTESTclr+'" face="'+WinName+'" size=+2>'+TESThtm+'</font>'
//        +'</td>'
//        +'</tr>'

  }
  buf+='</table>'
  return '<div >&GT; Fonts:'+(LastFont+1)+'</div >'+buf
}// ------------------------------------------------

function out(s){document.write(s);}
function hp(name,val)    {return ' '+name+'="'+val+'"'}// html parameter
function ht_(tag,val_,body){var val='';
  if(typeof(val_)!='undefined') val=val_
  return '<'+tag+val+'>'+body+'<\/'+tag+'>'
}// html tag
function ht(tag,body){var val='';
  return '<'+tag+'>'+body+'<\/'+tag+'>'
}// html tag

function a2def(){// after load catalog.js
  if( typeof(Set)=='undefined' || typeof(Pth)=='undefined' || typeof(Fnt)=='undefined' ){
    alert('js data not load!'); // + Win_Mac="W"; catalog="ea-2010";
  }else{
    LastSet=-1;LastPath=-1;LastFont=-1;
    var sl=Set.length-1, pl=Pth.length-1, fl=Fnt.length-1;
    for (var k=0; k<=sl; k++) adSet(Set[k][ 2],Set[k][ 0],Set[k][ 1]); // [TT,PS,Set]
    for (var k=0; k<=pl; k++)adPath(Pth[k][ 1],Pth[k][ 0]);
    for (var k=0; k<=fl; k++)adFont(Fnt[k][ 0],Fnt[k][ 1]
      ,Fnt[k][ 4],Fnt[k][ 5],Fnt[k][ 6] ,Fnt[k][ 2],Fnt[k][ 3]
	  ,Fnt[k][ 7],Fnt[k][ 8],Fnt[k][ 9],Fnt[k][10],Fnt[k][11],Fnt[k][12])
  }
}
function ShowFontCatalog(){
var buf='' // <div id="log_" name="log_"><br></div>
    a2def(); // after load catalog
    buf+='<BODY FACE=Arial" size=3 COLOR=black BGcolor=gray VALIGN="bottom">'
    buf+='<H1><CENTER> '+catalog+'</CENTER></H1><HR/>'
    buf+=show_sets()
    buf+=show_fonts();
	buf+=show_paths()
    log(buf)
	log('<font SIZE=1><HR/>Generated by Fontorg</font>')
}
function ShowHideIDs(ids){ var i,e,l=ids.length
    for(i=0; i<=l-1; i++){ e=document.getElementById(ids[i]); 
      if(e==null || e==undefined) log('showhide['+i+']='+ids[i]+' miss!')
      if(e.style.display!="none"){ e.style.display="none";} else { e.style.display="inline-block";}
	}
} 
// ---
load_end()