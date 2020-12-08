_load._new('scr/pages.js')
  var idx_hdr =par('BGCOLOR',clr1)     +' border=0 cellspacing="1" cellpadding="1" '
  var mnu_hdr =par('bgcolor',"black")  +' border=1 cellspacing="0" cellpadding="0" '
  var idx_bg  =par('BGCOLOR',defrow1clr)
//--------------------------------------------------------------------------- 
//  write url to block: id.src=url
function urlCont(trgNM,href){ 
  if(undef(trgNM) || undef(href)) return
  var trgNO=nm2no(trgNM) // nm2no(box[trgNO].nm) -> trgNO
  if(trgNO==null || href=='') return  
  var plc=box[trgNO].plc // =document.getElementById(box[trgNO].id)
  var ifr_id=box[trgNO].id+".ifr"
  plc.innerHTML=htm_(['iframe'
         ,' id="'+ifr_id+'"' //?
         +' name="'+ifr_id+'"'
         +' src="'+href+'"'
         +' frameborder="0" scrolling="auto"'
         ,''])
  var ifr_=document.getElementById(ifr_id)
  ifr_.style.width =(box[trgNO].sz.w-4)+box[trgNO].sz.un;
  ifr_.style.height=(box[trgNO].sz.h-4)+box[trgNO].sz.un;
}//--
function show_url_onclick(trgNM,url_,tx,waitflag){
  if(undef(trgNM) || undef(url_)) return
  var trgNO=nm2no(trgNM) 
  if(trgNO==null || url_=='') return  
  var wait=''; 
  if(!undef(waitflag) && waitflag!='') 
      wait=''//'out('+box[trgNO].nm+',\'wait:... \');'
  var redirect=' onclick="'+wait+'urlCont(\''+    trgNM    +'\',\''+url_+'\');" '
  var title   =' '  +par('title',url_+'\n->' +box[trgNO].id)
  var target  =' '       //+par('target',    +box[trgNO].id) // '#' 
  var href    =' '//+url_//+par('href',url_)
  return ('<a '+href+target+title+redirect+'>'+tx+'</a>'+eol) 
}// --- 
function htmCont(trgNM,html_){ 
  if(undef(trgNM) || undef(html_)) return
  var trgNO=nm2no(trgNM) 
  if(dbg>1) out(log_,'htmCont(): trg:'+box[trgNO].nm+' cont:'+html_.substring(0,50))
  if(trgNO==null || html_=='') return
  box[trgNO].plc.innerHTML=html_
}// --- 
function show_htm_onclick(trgNM,html_,tx,waitflag){
  var trgNO=nm2no(trgNM) 
  var wait=''; 
  if(!undef(waitflag) && waitflag!='') 
      wait=''//box[trgNO].plc.innerHTML='wait:...';
  var redirect=' onclick="'+wait+'htmCont(\''+trgNM +'\','+html_+');" '
  var title   =' '  +par('title','html->'    +trgNM)
  var target  =' '//+par('target',     +box[trgNO].id) // '#' 
  var href    =' '//+par('href',?)
  return ('<a '+'#'+target+title+redirect+'>'+tx+'</a>'+eol) 
}// ---  

function pg_mnu(){        //+ (+ means ready to work, - not yet)
var va=' valign="top"'
  with(box[_mnu]) var w=par('width',sz.w+sz.un)
  var html=htm_(['table',mnu_hdr+w , ''
    +row_(va,[
       ['',show_htm_onclick('idx_','html_buf.pg_idx'   ,'меню'   )]
      ,['',show_htm_onclick('idx_','html_buf.pg_find'  ,'търси'  )] 
      ]) 
    ])
  return '<center>'+html+'</center>'
}//--
  var editableON="javascript:document.body.contentEditable=true;" 
  var editableOFF="javascript:document.body.contentEditable=false;"
  var designModeON="javascript:document.designMode='on';"
  var designModeOFF="javascript:document.designMode='off';"
function pg_idx(){        //+ use ' not "      !?hide: pg_sel_ot,pg_sel_ot,сервизни
  with(box[_idx]) var w=par('width',sz.w+sz.un)
  var html=
  htm_(['table',idx_hdr+w,'' // show_url_onclick(boxNM ,href,txt ,wait) 
/* */    
    +row_(idx_bg,[ ['',selgen(Zavet.ot.name,'† Стар',oh,'OTopen')] ])
    +row_(idx_bg,[ ['',selgen(Zavet.nt.name,'† Нов' ,nh,'NTopen')] ])
/* */    
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_10GodCom'   ,'† Десетте Божи заповеди'  )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_FaithSym'   ,'† Символът на вярата'     )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_beatitudes' ,'† Блаженствата'           )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_prayers'    ,'† Молитви'                )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_album_icons','† Икони'                  )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_theme_list' ,'  Тематични списъци'      )] ])
//  +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_bib_list'   ,'  Библейски списък'       )] ]) 
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','show_biblist()'         ,'  Библейски списък'       )] ]) 
//  +row_(idx_bg,[ ['',show_biblist() ]])
    
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_bib_urls'   ,'  Православни връзки'     )] ])
//  +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_history'    ,'  Хронология на събитията')] ]) //
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_holydays'   ,'  Християнски празници'   )] ]) //
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_kalendar'   ,'  Календар'               )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_welcome'    ,'  начало'                 )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_about_this' ,'  за Bible-bg'            )] ])
/* */    
//  +row_(idx_bg,[ ['',show_htm_onclick('idx_','html_buf.pg_ext'        ,'  сервизни'               )] ])
    +row_(idx_bg,[ ['',
       '<a href="javascript:ShowHide(\'service\');">сервизни</a>'
      +'<span id="service" style="display:none" '// block none
        +par('onclick','ShowHide(\'service\')')+'>'
        +htm_(['a',par('onclick',"htmCont('txt_',ar2obj('NT'))"                ),'Ген.масиви->об. NT' ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',ar2obj('OT'))"                ),'Ген.масиви->об. OT' ])+br
        +htm_(['a',par('onclick',"test_obj_fmt()"                              ),'Тест об. '          ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',dump_some())"                 ),'DOM some:'          ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',dump_elem('box'))"            ),'DOM all:'           ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',gen_arrdef())"                ),'Ген. масиви NT/OT:' ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',gen_ar('OT','js'))"           ),'Ген. OT-##.bg.js:'  ])+br // file | js
        +htm_(['a',par('onclick',"htmCont('txt_',gen_ar('NT','js'))"           ),'Ген. NT-##.bg.js:'  ])+br // file | js
        +htm_(['a',par('onclick',"htmCont('txt_',countwords('OT',1,50,1,'js'))"),'!речник OT 1..50:'  ])+br // (zNm,bkFr,bkTo,3|1, js|htm)
        +htm_(['a',par('onclick',"htmCont('txt_',countwords('NT',1,27,1,'js'))"),'!речник NT 1..27:'  ])+br // 1:ask range; 3:no ask range
        +htm_(['a',par('onclick',"htmCont('txt_',checkBCV_hdr('NT',nt,nh))"    ),'Загл. книги в NT'   ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',checkBCV_hdr('OT',ot,oh))"    ),'Загл. книги в OT'   ])+br
        +htm_(['a',par('onclick',"editableON   "                               ),'contentEditable ON' ])+br
        +htm_(['a',par('onclick',"editableOFF  "                               ),'contentEditable OFF'])+br
//      +htm_(['a',par('onclick',"designModeON "                               ),'designMode ON'      ])+br
//?     +htm_(['a',par('onclick',"designModeOFF"                               ),'designMode OFF'     ])+br // ?
        +htm_(['a',par('onclick',"htmCont('txt_',html_buf.pg_web_clr)"         ),'Избор на цветове'   ])+br
//      +htm_(['a',par('onclick',"hdr_.innerHTML=''"                           ),'hdr_'               ])+br // 
        +htm_(['a',par('onclick',"htmCont('txt_','')"                          ),'txt_'               ])+br // 
//      +htm_(['a',par('onclick',"not_.innerHTML=''"                           ),'not_'               ])+br // 
        +htm_(['a',par('onclick',"log_.innerHTML=''"                           ),'log_'               ])+br // 
//      +htm_(['a',par('onclick',"idx_.innerHTML=''"                           ),'idx_'               ])+br // 
      +'</span>'
    ] ])
/* */    
  ])
//  row_(rowpar,[ [colpar,coldata],...]) 
  return '<center>'+html+'</center>'
}//--
function pg_hdr(){        //+
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',
     row_('',[[va,'<span class="ch">Bible-bg</span>']   
             ,[va,'<span class="log" id="liveymd">y-m-d</span> '
                 +'<span class="log" id="livehms">h:m:s</span>']// clock place
             ])
  ])
  +'</FONT>'
//out(hdr_,' '+progID)
//htm_(['img',' src="Bible-bg.ico" height="25px"',''])
  return '<center>'+html+'</center>'
}//-----------------      //  pathpages+'Bible-bg.'+ ... +'.htm'

function selgen(zNm,tstname,th,Tform){// selgen(Zavet.nt.name,'Нов' ,nh,'NTopen')
   // ---
   function sellistBH(n,defNo,sar,vsz_,evnt_){var vsz='' ,evnt='' ,tit='',val='';
     if (vsz_  && parseInt(vsz_)>0) vsz =par('size'    ,vsz_)
     if (evnt_ && evnt_!='')        evnt=par('onchange',evnt_)// onchange,onselect,....?
     s='<select'+par('id',n)+vsz+evnt+'>'+eol // name,id
     for (i=1; i<=sar.length-1; i++) { sdef='' // i=0
       if (i==defNo) sdef=' selected '   // sar[i]...
       tit=par('title',n2(i)+': '+sar[i][1])
       val=par('value',i)
       s+='<option'+sdef+val+tit+'>'+sar[i][0] +eol
     }//end for
     s+='</select>'
     return s
   }// ---

   // showmnu=' display:none;'; //if(zNm=='NT')showmnu=' display:block;' // none | block
   winsub2style=''//' width:'+(col1wid+col2wid)+'px; height:'+col2hig+'px;'
   +'; overflow:auto; padding:0px; text-align:left; border:0px inset; margin:0px;'
   wt2=''; if(wait) wt2+='out(log_,\'wait:... \');'; wt3=''; 
   if(wait) wt3+='out(not_,\'wait:... \');'
   cm='R' // call method: Load show.js or Run javascript:
   btnY='btnY'; btnYst='width:15px;font-size:11px;'; 
                btnTst='width:12px;font-size:10px;';
   if(zNm==Zavet.nt.name){btnT='btnB'; zNo=Zavet.nt.num; mnucol1clr=ntclr;} // tstNM
   else                  {btnT='btnB'; zNo=Zavet.ot.num; mnucol1clr=otclr;}
   var fnd='възлюби ближния си'; 
   var bNo=cNo=vNo1=1,vNo2=''
      ,bcv=bcv2str(zNm,bNo,cNo,vNo1) // buf <- form.value 
   showfile=pathpages+'Bible-BG.show.htm'
   formaction="document.forms."+Tform+".action='"+showfile+'#'
   TTbcv="zbcv2str(zNm,bNo,cNo,vNo1,vNo2);" // zNm+"'+'.'+bNo+'.'+cNo+'.'+vNo1+'-'+vNo2+'';"
// formsubmit='document.'+Tform+'.submit();'
   if(cm=='L'){
        //loadrun="ShowLoad('"+zNm+"');"+'document.'+Tform+'.submit();'
          loadrun=formaction+TTbcv      +'document.'+Tform+'.submit();'
   }else{ loadrun="htmCont('txt_',showchap('"+zNm+"',bNo,cNo,vNo1,vNo2,''));";// ,vNo1,vNo2,fnd
   }
   // ================ 
   // bk_key=[home, end,'<','>']; 
   // ch_key=[pgup,pgdn,'-','+']; 
   // vs_key=['f','l','v' ,'^' ];
   // key_mod=[old:ctrl,new:alt];
   // key_mod_str='&nbsp;&nbsp;'; 
   // if(zNo==Zavet.ot.num) key_mod_str+='ctrl-'; else key_mod_str+=' alt-';
   buf='<form '+par('name',Tform)
   // +par('target','txt_')+par('method','post')//+par('encode','windows-1251')
   // +par('action',showfile+'#"OT[2.20.2-17]')/* !replaced by v4 */ 
      +'>'+eol
          +'<table border=0 bordercolor="#a0a0a4" cellpadding="0" cellspacing="0"'//+' width="'+mnu1wid+'"' //  Opera "330"  mz "310"
          +' style="'+winsub2style+'"'  +'>'
       +'<tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
   buf+='<td></td><td colspan="3">'+zNm+'.'
             +inText(zNm+"bcv_" ,14,bcv,'кн.гл.ст-ст',''
          //  inText(n          ,sz,val,t            ,evnt_) 
          /**-/ +par('onChange',// ?
                 "bcv="+zNm+"bcv_.value; "                       
                +"p=parselink("+zNm+'.'+"bcv"+"); "
                +"if(err==''){bNo=p[1];cNo=p[2];vNo1=p[3];vNo2=p[4]}"
                +"bcvNo2val('"+zNm+"')" ) /**/
              )
       +'</td><td>'                                              
           +'<a>'+btn("=" ,btnY,btnYst,"виж тази глава" ,// val2bcvNo(zNm) 
                 "bcv="+zNm+"bcv_.value; "
                +"err=''; var p=parselink('"+zNm+".'+bcv);"
                +"if(err==''){bNo=p[1];cNo=p[2];vNo1=p[3];vNo2=p[4]}"
                +bcvNo2val(zNm)
             +loadrun,'=')
           +'</a>'               
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
        +'<td>'+'кн'+'</td><td>'// «» ^ v
           +'<a>'+btn("^" ,btnT,btnTst,"Първа книга"    ,
             bcvgo(zNm,'B',"F"))// -> bcvNo2val(zNm)
           +'</a>'
           +'<a>'+btn("<" ,btnT,btnTst,"Предишна книга" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"-"))
           +'</a>'
       +'</td><td>'
           +sellistBH(zNm+'b_','?',th,1,"bNo="+zNm+"b_.value;cNo=1;vNo1=1;vNo2='';"
            +"bcv=bcv2str(zNm,bNo,cNo,vNo1,vNo2);"// "bNo+'.'+cNo+'.'+vNo1+'-'+vNo2;"
            +bcvNo2val(zNm),'')
       +'</td><td>'
           +'<a>'+btn(">" ,btnT,btnTst,"Следваща книга" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"+"))
           +'</a>'
           +'<a>'+btn("v" ,btnT,btnTst,"Последна книга" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"L"))
           +'</a>'
       +'</td><td>'
           +'<a>'+btn("w",btnY,btnYst,"Честотен речник за книга",val2bcvNo(zNm)
            +"htmCont('txt_',countwords('"+zNm+"',bNo,bNo,1,'js'))")
           +'</a>'
            //+'a,LABEL,button,input,select,textarea: ACCESSKEY="d" // Alt+d key_mod_str
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
       +'<td>'+'гл'+'</td><td>'
           +'<a>'+btn("^" ,btnT,btnTst,"Първа глава "   ,val2bcvNo(zNm)+bcvgo(zNm,'C',"F"))+'</a>'
           +'<a>'+btn("<" ,btnT,btnTst,"Предишна глава ",val2bcvNo(zNm)+bcvgo(zNm,'C',"-"))+'</a>'
       +'</td><td>'
                 +inText(zNm+"c_" ,6,'1','глава'  ,'')   
       +'</td><td>'
           +'<a>'+btn(">" ,btnT,btnTst,"Следваща глава ",val2bcvNo(zNm)+bcvgo(zNm,'C',"+"))+'</a>'
           +'<a>'+btn("v" ,btnT,btnTst,"Последна глава ",val2bcvNo(zNm)+bcvgo(zNm,'C',"L"))+'</a>'
       +'</td><td>'
           +'<a>'+btn("=" ,btnY,btnYst,"виж тази глава"  ,
             val2bcvNo(zNm)+loadrun,'=')
           +'</a>'        
           +'<a>'+btn("<" ,btnY,btnYst,"виж предна гл."  ,
             val2bcvNo(zNm)+"CgoL('"+zNm+"',bNo,cNo,'-');"+bcvNo2val(zNm)+loadrun,'-')
           +'</a>'
           +'<a>'+btn(">" ,btnY,btnYst,"виж следваща гл.",
             val2bcvNo(zNm)+"CgoL('"+zNm+"',bNo,cNo,'+');"+bcvNo2val(zNm)+loadrun,'+')
           +'</a>'
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
       +'<td>'+'ст'+'</td><td>'
           +'<a>'+btn("^" ,btnT,btnTst,"Първи стих"      ,val2bcvNo(zNm)+bcvgo(zNm,'V',"F"))+'</a>'
       +'</td><td>'
           +      inText(zNm+"v1_",1,'1','от стих','') 
           +  '-'+inText(zNm+"v2_",1,'' ,'до стих','')
       +'</td><td>'+' &nbsp;&nbsp; '
           +'<a>'+btn("v" ,btnT,btnTst,"Последен стих"   ,val2bcvNo(zNm)+bcvgo(zNm,'V',"L"))+'</a>'
       +'</td><td>'
           +'<a'+par('title',zNm+' индекс') //+par('href','Bible-BG.books.htm#'+zNm)
            +par('href'   ,'javascript:ShowHide(\'idx.\'+\''+zNm+'\')')
        //  +par('onClick',           'ShowHide(\'idx.\'+\''+zNm+'\')') // ->idxgen(zNm)
           +'>'+tstname+'</a>' 
   buf+='</td></tr></table>'
       +'<span id="idx.'+zNm+'" style="display:none">'+idxgen(zNm)+'</span>' 
   buf+='</form>'
   return buf
}// ---
function idxgen(zNm){
   function bookFile(zNm, bNo,cNo,vNo1,vNo2){
     cm='R' // call method: 'L'oad show.js or 'R'un javascript
   //if(!(zNm=='NT' || zNm=='OT'))     outf('\nbookFile: bad zNm='+zNm)
   //if(  zNm=='NT' && (bNo<1 || bNo>27))  outf('\nbookFile: bad nt bNo='+bNo)
   //if(  zNm=='NT' && (cNo<1 || cNo>28))  outf('\nbookFile: bad nt cNo='+cNo)
   //if(  zNm=='OT' && (bNo<1 || bNo>50))  outf('\nbookFile: bad nt bNo='+bNo)
   //if(  zNm=='OT' && (cNo<1 || cNo>151)) outf('\nbookFile: bad nt cNo='+cNo)
     var s ,e='' ,lnk='' 
   //Set_bcv_to_idx(zNm,bNo,cNo,vNo1) // to see how load menu - slow
   //Get_bcv_from_idx(zNm)// -> bNo.cNo.vNo1-vNo2
   	var s0=scrpath+'show.htm'
     var c=n2(cNo); if(cNo>99)c=n3(cNo); // show name
   	var s3=zbcv2str(zNm,bNo,cNo,vNo1,vNo2);// href#s1 // title
   	var trg='txt'
     if(cm=='L') {//  e="parent.idx.document.getElementById('"+zNm+"bcv_').value='"+bcv+"';"
       wt=''; if(wait) wt='outt(\'wait:... \');'
     //lnk='<a href="'+s0+'#'+s1+'"'+par('target',trg)+par('title',s3)+par('onclick',e)+'>'+c+'</a>'
       lnk=bib_lnk([zNm,bNo,cNo,vNo1,vNo2],c,e+wt,'','','','N')
        // bib_lnk([lnk],name,evnt,tit,cm_,fndstr,spanbgclr) lnk=zNm+bcv ,cmodel='L', spanbgclr='N'
     }else       { // showchap() need of: show.js, outfmt.js
     //e = "out(txt_,showchap('"+zNm+"',"+bNo+","+cNo+","+vNo1+",'',''));"; 
       e = "htmCont('txt_',showchap('"+zNm+"',"+bNo+","+cNo+","+vNo1+",'',''));"; 
       lnk='<a href="javascript:'+e+'"'+'>'+c+'</a>'
     }
     return lnk
   }// ---
   if      (zNm==Zavet.nt.name){ tstname=Zavet.nt.fullname; tsthdr=nh; mnucol1clr=ntclr;
   }else if(zNm==Zavet.ot.name){ tstname=Zavet.ot.fullname; tsthdr=oh; mnucol1clr=otclr;
   }
   cw=220 // 225,row1wid,col2wid+col1wid+15 
   showmnu1=' display:block;'; showmnu2=' display:none;' // none | block
   winsub2style=' width:100%;'//+cw+'px;'
   +' overflow:auto;'// height:'+col2hig+'px;'
   +' padding:0px; text-align:left; border:0px inset; margin:0px;'
   var statB=statC=statV=0
   var buf=''
   buf+='<table border=0 BGCOLOR="'+clr1+'" cellpadding="1" cellspacing="0"'
      +par('width',cw)                                                    //
      +'>\n'
   buf+='<tr>'//+'<a href="javascript:ShowHide(\''+zNm+'\');">'+tstname+'</a></tr>' // 1,2+3
      +'\n<tr BGCOLOR="'+mnucol1clr+'"><td'
    //+par('width',220)                                    //col1wid      // 1
      +'></td>'
      +'<td '+par('BGCOLOR',mnucol1clr) //+par('width',cw)+'">'             // 2+3
      +'\n<div style="'+showmnu1+winsub2style+'"'+par('id',zNm)+par('name',zNm)+'>\n'  
      +'\n<table border=0 BGCOLOR="'+mnucol1clr+'" cellpadding="1" cellspacing="0"'    
    //+par('width',cw)                                                    //--
      +'>\n'
   for (var book=1; book<=(tsthdr.length-1); book++) { if(stat)statB++
     var ref="javascript:ShowHide('"+zNm+n2(book)+"');"
     kna_code=''; // if(zNm=='OT') kna_code=' ['+Os[book]+'] '
     buf+='\n<tr><td valign="top" BGCOLOR="'+bkidxclr+'">'+n2(book)+'</td>'             // 2
        +'<td '+par('BGCOLOR',bknameclr)+'">'                             // book name  // 3
        +'\n<a href="'+ref+'">'+kna_code+tsthdr[book][1]+'</a>\n'    
        +'\n<div style="'+showmnu2+'" id="'+zNm+n2(book)+'">\n' // show/hide
        +'\n<table border=0 BGCOLOR="'+bkidxclr+'" cellpadding="1" cellspacing="0"'     
      //+par('width',210)   //col3wid                                     //--
        +'><tr><td>\n'
     for (var i=1; i<=(tsthdr[book][2]); i++){
       buf+=bookFile(zNm,book,i,1,0)+' \n'; 
       if(stat){statC++; statV+=tsthdr[book][i+2]}
     }// cNo: 01 ... 
     buf+='</td></tr></table>\n'+'</div></td></tr>\n'  
   } 
   buf+='</td></tr></table>\n</div></td></tr></table>\n'+eol
   if(stat) buf+='stat-'+zNm+':'+statB+'.'+statC+'.'+statV+eol
   return buf
}//--
function pg_find(){       //~ 'find.htm'       err:?
  function find_chk_and_load(zNm,tt,th){   ok=true; err=''; ftx='търсене';
     //out(log_,'chkfind: begin'+eot)  
     if(!(zNm==Zavet.nt.name || zNm==Zavet.ot.name)){err+='неправилно име на завет: zNm='+zNm+'\n'; ok=false;}
     var msg='неуспешно зареждане на:';
     if(ok){
       if(undef(tt) || tt==null || tt=='') {err+=msg+'tt за '+zNm+'\n'; ok=false;}
       if(undef(th) || th==null || th=='') {err+=msg+'th за '+zNm+'\n'; ok=false;}
     }
     if(err!=''){out(log_,'find:'+err+br)}//  Грешки при '+ftx?+':\n'
     return ok
  }// ---
// --- global find parameters
   Nbk=Obk=-1;  f1exp='';        f2exp='';              f3exp='';
   Nbl=Obl='';  f1wrd=f1reg=-1;  f2wrd=f2reg=f2plc=-1;  f3wrd=f3reg=-1;
// --- show globals
   bg='black'; fg='white'; nlnk='blue'; vlnk='darkblue'; alnk='red'; 
   bghi='cyan',fghi='black'
   p=pathpages+"Bible-BG.show.htm"
   f=[], lf=0;// founded links array, last found=1..// 0=id,1=name,2=txt,n=index
   cm='R'// call method: Load file show.js | Run javascript:showchap()
// ---
  function check_and_run(){// ->findTT(Zavet.nt.name,nt,nh);
    if(f1exp!=''){f=[]; lf=0;
      if((Nbk>0) && (find_chk_and_load(Zavet.nt.name,nt,nh)) ) // parent.idx.nt, parent.idx.nh
  	  findTT(Zavet.nt.name,nt,nh);// parent.idx.nt,parent.idx.nh
      if((Obk>0) && (find_chk_and_load(Zavet.ot.name,ot,oh)) ) 
  	  findTT(Zavet.ot.name,ot,oh);
    }else{out(log_,errNOTODO+eot)}
  }// ---
  function fndform(){// ->htmlform -> check_and_run()
     winsub2style=' overflow:auto; padding:0px; text-align:left; border:1px inset; margin:0px;'
     f1exp='ослица'//'господ мой'
     errNOTODO='Няма текст или не е избрано място за търсене!' 
     wt=''; if(wait) wt+='out(txt_,\'wait:... \'+eot);';
     buffnd=
      '<table bgcolor="black" border=0 cellpadding="0" cellspacing="0"'
      +' width="'+'100%'+'">'// row1wid 310
     +'<tr valign="top">'+eol+'<td>'+'Търсене в Библията '
       +'<a>'+btn("почни",'btnY','width:50px;font-size:12px;',"почни тъсене",wt
           //+"out(log_,'get form:'+eot);"
           +"Nbk=Nbk_.value;Nbl=Nbl_.value; Оbk=Оbk_.value;Оbl=Оbl_.value;"+eol
           +"f1exp=f1exp_.value;f1wrd=f1wrd_.value;f1reg=f1reg_.value;"+eol
           +"f2exp=f2exp_.value;f2wrd=f2wrd_.value;f2reg=f2reg_.value;f2plc=f2plc_.value;"+eol
           +"f3exp=f3exp_.value;f3wrd=f3wrd_.value;f3reg=f3reg_.value;"+eol
           /* */
           +"out(log_,'test find form:'+eot);" 
           + "a='  Nbk=['+Nbk  +']   Nbl=['+Nbl +'] Obk=['+Оbk +'] Obl=['+Оbl+']';"
           +"a1='f1exp=['+f1exp+'] f1wrd='+f1wrd+' f1reg='+f1reg;"+eol
           +"a2='f2exp=['+f2exp+'] f2wrd='+f2wrd+' f2reg='+f2reg+' f2plc='+f2plc;"+eol
           +"a3='f3exp=['+f3exp+'] f3wrd='+f3wrd+' f3reg='+f3reg;"+eol
           +"out(log_,a+eot+a1+eot+a2+eot+a3+eot);"+eol 
           /* */
           //+"out(log_,'check for empty & run:'+eot);"
           +"check_and_run();"// clsl();
         )
       +'</a>'
     +'</td></tr>'+eol
     +'<tr valign="top">'+eol+'<td>'
     //+'<form'+par('id','fnd')+'>'+eol
         +'<table border=0 cellpadding="1" cellspacing="0"'//+' width="'+200+'"'
           +winsub2style+'>'+eol// 305
           /**/
           +'<tr'+par('bgcolor',ntclr)+'>'+eol+'<td>'+'нов завет'
           +'</td>'+eol+'<td>'
             +sellist('Nbk_', 1,['никоя','всички','списък'],1,'',"")+' кн.'
              +inText('Nbl_',6,'','списък: книгa,...'          ,"")//25
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr'+par('bgcolor',otclr)+'>'+eol+'<td>'+'стар завет'
           +'</td>'+eol+'<td>'
             +sellist('Оbk_', 0,['никоя','всички','списък'],1,'',"")+' кн.'
              +inText('Оbl_',6,'','списък: книгa,...'          ,"")
           +'</td>'+eol+'</tr>'+eol
           /**/// изрази,фрази
           +'<tr valign="top">'+eol+'<td>'+'търси' 
           +'</td>'+eol+'<td>'+ inText('f1exp_',22,f1exp,'израз','')
             +'<table>'
               + '<tr><td>'+' съвпада '   +'</td><td>'+sellist('f1wrd_', 1,['точно','част','корен'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ред/гл '    +'</td><td>'+sellist('f1reg_', 1,['точно','без знач.']   ,1,'','')+'</td></tr>'
             +'</table>'
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr valign="top">'+eol+'<td>'+'със '
           +'</td>'+eol+'<td>'+ inText('f2exp_',22,f2exp,'израз','')
             +'<table>'
               + '<tr><td>'+' съвпада '   +'</td><td>'+sellist('f2wrd_', 1,['точно','част','корен'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ред/гл '    +'</td><td>'+sellist('f2reg_', 1,['точно','без знач.']   ,1,'','')+'</td></tr>'
               + '<tr><td>'+' място '     +'</td><td>'+sellist('f2plc_', 1,['преди','след','в стиха','в главата'],1,'','')+'</td></tr>'
             +'</table>'
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr valign="top">'+eol+'<td>'+'без '     
           +'</td>'+eol+'<td>'+ inText('f3exp_',22,f3exp,'израз','')
             +'<table>'
               + '<tr><td>'+' съвпада '   +'</td><td>'+sellist('f3wrd_', 1,['точно','част','корен'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ред/гл '    +'</td><td>'+sellist('f3reg_', 1,['точно','без знач.']   ,1,'','')+'</td></tr>'
             +'</table>'
           +'</td>'+eol+'</tr>'+eol
            /**/
        +'</table'+eol
     //+'</form>'
     +'</td></tr></table'+eol
     return buffnd
  }// ---
//?if(dbg>0) out(log_,load_tst('find',load,file.join('; ')));
  var va=' valign="top"'
  var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va,fndform()]]) ])  //out(idx_,fndform()+eot)
  +'</FONT>'
  return html
}//-----------------

function pg_welcome(){    //+ 'welcome'       
var va=' valign="top"',tpar=' cellpadding="5" cellspacing="3" border="0"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table',tpar,
    row_('',[
      [va+par('width',150)+par('bgcolor',icobg)
        ,icon("HristosPantokrator.jpg"     ,"Христос Пантократор"       ,220) 
        +icon("sv.Bogorodica Jerusalem.jpg","св.Богородица Йерусалимска",220)
      ],
      [va  +par('bgcolor',icobg),''
        +biblink('OT.Втор.06.04-07')+biblink('NT.Деян.10.12')      
        +biblink('NT.Марк.12.29-30')+biblink('NT.Лука.10.27')+'<br>'
        +'Господ, Бог наш, е Господ един; обичай Господа, твоя Бог,'
        +' от всичкото си сърце, от всичката си душа и с всичките си сили.'+'<br>' 
        +'Тия думи, които ти заповядвам днес, да бъдат в сърцето ти (и в душата ти);'+'<br>'
        +biblink('NT.Марк.12.31')+'<br>'
        +'Втора, подобна ней, е: "възлюби ближния си като себе си". Друга заповед, по-голяма от тия, няма.'+'<br>'
        +biblink('NT.Иоан.14.06')+'<br>'
        +'Аз съм пътят и истината и животът;'+'<br>'
        +'никой не дохожда при Отца, освен чрез Мене.'+'<br>'
        +biblink('NT.Иоан.13.34-35')+'<br>'
        +'Нова заповед ви давам, да любите един другиго; както ви възлюбих, да любите и вие един другиго.<br>'
        +'По това ще познаят всички, че сте Мои ученици, ако любов имате помежду си.<br>'
        
        +biblink('NT.Иоан.15.12-13')+'<br>'
        +'Тази е Моята заповед: да любите един другиго, както Аз ви възлюбих.<br>'
        +'Никой няма любов по-голяма от тая, да положи душата си за своите приятели.<br>'
        
        +biblink('NT.2Иоан.01.06-07')+'<br>'
        +'А любовта се състои в това, да постъпваме по Неговите заповеди.<br>' 
        +'Тази е заповедта, която сте чули отначало, за да постъпвате по нея;<br>'
        +'защото в света влязоха мнозина прелъстници, които не изповядват,<br>' 
        +'че Иисус Христос е дошъл в плът; такъв човек е прелъстник и антихрист.<br>'
        
        +biblink('NT.Откр.22.19')+'<br>'
        +'и ако някой отнеме нещо от думите на книгата на това пророчество, <br>'
        +'Бог ще отнеме дела му от книгата на живота и от светия град и от написаното в тая книга.<br>'
        
        +biblink('NT.Марк.16.15')+'<br>'  
        +'И рече им: идете по цял свят и проповядвайте Евангелието на всички твари. <br>' 
        +'Който повярва и се кръсти, ще бъде спасен, а който не повярва, ще бъде осъден.'
      ] ]) 
    ])
    +'</FONT>'
  return html
}//-----------------
function pg_10GodCom(){   //+ 'OT-10GodCom'   
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
 +'<span id="bk"><center>† Десетте Божи заповеди</center></span>'
 +biblink('OT.Изх.20.02-17')
 +htm_(['table','',''
   +row_(va,[['',' 1.'],['','Аз съм Господ, Бог твой; да нямаш други богове освен Мене.'] ])
   +row_(va,[['',' 2.'],['','Не си прави кумир и никакво изображение на онова, що е горе на небето , що е долу на земята и що е във водата под земята, не им се кланяй и не им служи.'] ])
   +row_(va,[['',' 3.'],['','Не изговаряй напразно името на Господа, твоя Бог.'] ])
   +row_(va,[['',' 4.'],['','Помни съботния ден<sup><font color=\'lime\'>*</font></sup>, за да го светиш: шест дена работи и върши в тях всичките си работи; а седмият ден е събота на Господа, твоя Бог.'] ])
   +row_(va,[['',' 5.'],['','Почитай баща си и майка си, за да ти бъде добре и да живееш дълго на земята.'] ])
   +row_(va,[['',' 6.'],['','Не убивай.'         ] ])
   +row_(va,[['',' 7.'],['','Не прелюбодействай.'] ])
   +row_(va,[['',' 8.'],['','Не кради.'          ] ])
   +row_(va,[['',' 9.'],['','Не лъжесвидетелствай против ближния си.' ] ])
   +row_(va,[['','10.'],['','Не пожелавай дома на ближния си; не пожелавай жената на ближния си; нито нивата му; нито роба му; ни робинята му; ни вола му; ни осела му; нито някакъв негов добитък - нищо, което е на ближния ти.'] ])
  ])
+'<font size="2" color="gold">'
+'<sup>* </sup> (За християните още от апостолско време това е'
+' денят на Христовото Възкресение - неделя)</font></font>'
  return html
}//-----------------
function pg_FaithSym(){   //+ 'NT-FaithSymbol'
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['span',' id="bk"','<center>† Символът на вярата</center>'])
  +htm_(['table',' cellpadding="5" cellspacing="3" border="0"',
      row_(va,[['', 1.],['','Вярвам в един Бог Отец, Вседържител, Творец на небето и земята, на всичко видимо и невидимо.']])
     +row_(va,[['', 2.],['','И в един Господ Иисус Христос, Сина Божий, Единородния, Който е роден от Отца преди всички векове; Светлина от Светлина; Бог истинен от Бог истинен, роден, несътворен, единосъщен с Отца, чрез когото всичко е станало.']])
     +row_(va,[['', 3.],['','Който заради нас, човеците, и заради нашето спасение слезе от небесата и се въплъти от Духа Светаго и Дева Мария и стана човек.']])
     +row_(va,[['', 4.],['','И бе разпнат за нас при Понтия Пилата, и страда, и бе погребан.']])
     +row_(va,[['', 5.],['','И възкръсна в третия ден, според Писанията.']])
     +row_(va,[['', 6.],['','И възлезе на небесата и седи отдясно на Отца.']])
     +row_(va,[['', 7.],['','И пак ще дойде със слава да съди живи и мъртви и царството Му не ще има край.']])
     +row_(va,[['', 8.],['','И в Духа Светаго, Господа, Животворящия, Който от Отца изхожда, Комуто се покланяме и Го славим наравно с Отца и Сина, и Който е говорил чрез пророците.']])
     +row_(va,[['', 9.],['','В една света, вселенска и апостолска Църква.']])
     +row_(va,[['',10.],['','Изповядвам едно кръщение за опрощаване на греховете.']])
     +row_(va,[['',11.],['','Чакам възкресение на мъртвите.']])
     +row_(va,[['',12.],['','И живот в бъдещия век! Амин!']])
    ]) 
  +'</FONT><font size="2" color="gold"><sup>* </sup>'
  +'Окончателно съставен от Светите отци на 7-мия Вселенски събор в Никея през 787г<br>'
  +'</font>'
  return html
}//-----------------
function pg_beatitudes(){ //+ 'NT-beatitudes' 
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4"><a NAME="Блаженствата"></a>'
  +htm_(['table','',
     row_('',[[va,'<span id="bk"><center>† Блаженствата</center></span>']])
    +row_('',[[va,biblink('NT.Мат.05.03-12') +biblink('NT.Лука.06.20-23')]])   
    +row_('',[[va,'Блажени бедните духом, защото тяхно е царството небесно.']])
    +row_('',[[va,'Блажени плачещите, защото те ще се утешат.']])
    +row_('',[[va,'Блажени кротките, защото те ще наследят земята.']])
    +row_('',[[va,'Блажени гладните и жадните за правда, защото те ще се наситят.']])
    +row_('',[[va,'Блажени милостивите, защото те ще бъдат помилувани.']])
    +row_('',[[va,'Блажени чистите по сърце, защото те ще видят Бога.']])
    +row_('',[[va,'Блажени миротворците, защото те ще се нарекат синове Божии.']])
    +row_('',[[va,'Блажени изгонените заради правда, защото тяхно е царството небесно.']])
    +row_('',[[va,'Блажени сте вие, когато ви похулят и изгонят, и кажат против вас лъжовно каква и да е лоша дума заради Мене.']])
    +row_('',[[va,'Радвайте се и се веселете, защото голяма е наградата ви на небесата; тъй бяха гонени и пророците, които бяха преди вас.']])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_prayers(){    //+ 'NT-prayers'    
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va,''
   +'<span id="bk"><center>† Молитви</center></span>'
   
   +'<span id="ch"><center>Свет е Господ-Саваот</center></span>'
   +biblink('OT.Ис.6.3')
   +'<br>„Свет, свет, свет е Господ-Саваот!'
   +'<br>Пълни са небето и земята с Твоята слава!”'
   
   +'<span id="ch"><center>Господнята молитва</center></span>'
   +biblink('NT.Мат.6.9-13')+biblink('NT.Лука.11.2-4')
   +'<br>„Отче наш, Който си на небесата!'
   +'<br>Да се свети Твоето име; да дойде Твоето царство;'
   +'<br>да бъде Твоята воля, както на небето тъй и на земята;'
   +'<br>насъщният ни хляб дай ни днес; и прости нам дълговете ни,'
   +'<br>както и ние прощаваме на длъжниците си;'
   +'<br>и не въведи нас в изкушение, но избави ни от лукавия;'
   +'<br>защото Твое е царството, и силата, и славата вовеки.'
   +'<br>Амин!”'

   +'<span id="ch"><center>Утринна молитва</center></span>'
   +'„Боже, благодаря Ти, че ме запази така милостиво и през тази нощ.'
   +'Помогни ми да не те наскърбя с никакъв грях и да изживея днешния ден '
   +'угодно на Теб и спасително за мен.'
   +'<br>Амин!”'

   +'<span id="ch"><center>Вечерна молитва</center></span>'
   +'„Господи, Боже наш, като благ и човеколюбец,'
   +'прости ми каквото съгреших този ден с думи, дела и помисъл.'
   +'Дарувай ми мирен и спокоен сън. Прати Твоя Ангел пазител'
   +'да ни закриля и пази от всяко зло, защото Ти си пазител на душите и телата ни,'
   +'и на Теб - Отца, Сина и Светия Дух, въздаваме слава, сега и всякога, и во веки веков.'
   +'<br>Амин!”'

   +'<span id="ch"><center>Молитва преди хранене</center></span>'
   +'„Благослови, Господи, ястието и питието на Твоите чеда, '
   +'защото си свят сега и винаги и във вечни векове.'
   +'<br>Амин!”'

   +'<span id="ch"><center>Молитва след хранене</center></span>'
   +'„Благодарим Ти, Христе Боже наш, че ни насити с Твоите земни блага.'
   +'Не ни лишавай и от Небесното си царство!'
   +'<br>Амин!”'

// +'<span id="ch"><center>Молитва преди работа</center></span> 
// +'<span id="ch"><center>Молитва след работа</center></span> 
// +'<span id="ch"><center>Молитва преди учение</center></span> 
// +'<span id="ch"><center>Молитва след учение</center></span> 

   +'<span id="ch"><center>Вечерна молитва към ангела-пазител</center></span> '
   +'„Ангеле Христов, мой свят пазител и покровител'
   +'на душата и тялото ми,'
   +'прости ми всичко, каквото днес съм съгрешил,'
   +'и ме избави от всяко лукавство на преследващия ме враг,'
   +'тъй че с никакъв грях да не разгневя моя Бог.'
   +'Моли се за мене грешния и недостоен раб,'
   +'та да ме направиш достоен за благостта и милостта'
   +'на Пресвета Троица, на Майката на моя Господ, Иисус Христос'
   +'и на всички светии. Амин”.'

// +'<span id="ch"><center>Хваление при тържественият Вход Господен в Йерусалим: </center></span><br>'
// +biblink('NT.Мат.21.9')          // Марк.11:1-10;
// +biblink('NT.Лука.19.37-38')     // Лука 19-28-38;
// +biblink('NT.Иоан.12.12-13')     // Иоан.12:12-19.
    ]])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_album_icons(){//+ 'ikons-album'    err:?
{// === globals, some loaded from albumfile
  var albumfile="scr/album-ikoni.js" 
  //  f=[]; // масив за имена .jpg и описания
  var fname=0, fext=1, fsize=2, fdate=3, ftime=4, fatr=5, desc=6; 
  //  root=''//pathicons
  //  albumdir='' // pathicons+"album/";/* снимки за преглед */ 
  //  scandir ='' // pathicons+"scan/"; /* сканирани снимки - големи */
  //  scanext="tif";
  //  head='', foot=''
  var allfiledetails=false // true,false
  var eot='<br>'+eol
  // *** за albumfile, albumdir, scandir: името на файла е в текущата папка или със пълен път    
  // *** ако името включва път обърнете \ във / или го повторете \\ 
  // *** ако името на файла е със пълен път трябва да почва с file:// или http://
}// ===   
  function albumShow(f){// показва всички файлове и описания от масив f[] в таблица
     var s='',buf;cols=2;v=0 //  width="'+row2wid+'"
     s+='<table cellpadding="5" cellspacing="0"'
       +' style="background-color: #37371E;"'
       +'><tr>'+eol
     for (var i=1; i<=f.length-1; i++){v++
        scanfile=scandir +f[i][fname]+'.'+scanext    // big
       albumfile=albumdir+f[i][fname]+'.'+f[i][fext] // small
       caption=f[i][desc]//'<font size=3><p>'+f[i][desc] +'</p></font>'
       footer ='<font color="dimgray" size=1>'+albumfile
       if(allfiledetails)footer+= +'<br>'+f[i][fsize]+' b ' +f[i][fdate]+' '+f[i][ftime]
       footer+='</font>'
       target='_blank'// open with default : "windows picture and fax viewer"
       pic='&nbsp;';if(f[i] && f[i][fname]!='')pic=icon(albumfile,caption)
       buf='<td>'+eol
        //+'<div class="caption">'+caption+'</div>'+eol
          +pic
        //+'<a href="'+scanfile+'" target="'+target+'">'+'<img src="'+albumfile+'"></a>'+eol
        //+'<div class="caption">'+footer+'</div>'+eol
          +'</td>'+eol
       if(v==cols){buf=buf+'</tr><tr>'; v=0}
       s+=buf
     }
     s+='</tr></table>'+eol
     s+=foot
     if(dbg>1) out(log_,htm_(['xmp','',s])+br)
     if(dbg>0) out(log_,f+br)
     return s
  }// ---  
var html='<FONT face="Tahoma" size="4">'
  +head+br
  +biblink('NT.Иоан.14.6')+'<br>'
     +'Аз съм пътят и истината и животът;'+'<br>'
     +'никой не дохожда при Отца, освен чрез Мене.'+'<br>'
  +albumShow(album)
  +'</FONT>'
  return html
}//-----------------

function pg_theme_list(){ //+ 'themes'         err: show/hide sublist
var va=' valign="top"'
{var theme1=[['','',0,0,0],'групи Пророчества за идването на Исус Христос <br> и паралели в Новия завет' 
  ,['OT','Бит' ,  3,14,15],' бъдещата победа над злото чрез жена - "нейното семе"' 
  ,['OT','Бит' , 12, 1   ],' Иисус Христос ще произлезе от семето на Авраама'
  ,['OT','Бит' , 12, 2, 3],' при второто позоваване на Авраама в земята Харан'
  ,['NT','Мат' ,  1, 1   ],' родословието - изпълнението на пророчеството се упоменава в Евангелие от Матея и Лука'
  ,['OT','Бит' , 17,19   ],' от семени Исаака произойдет Спаситель, т. е. от сына Авраама'
  ,['OT','Чис' , 24,15,19],' Пророчество о том, что Спаситель произойдет от Иакова, 3-го из патриархов'
  ,['OT','Бит' , 49, 8,10],' Господь произойдет от колена Иудова, от одного из детей Израиля. пророчество о Примирителе, скипетр отошел от колена Иуды когда воцарился над израильским народом Ирод Великий, который был по крови не израильтянин, не иудей, а идумеянин'
  ,['OT','Ис'  ,  9, 7   ],' по происхождению Иисус Христос является наследником царя Давида, т. е. является давидидом.'
  ,['NT','Лука',  1,30,33],'-'//Это почти дословный перифраз Ис.9.7' 
  ,['OT','Мих' ,  4, 1   ],'за рождество Господне във Витлеем - пр. Михей -8в.'
  ,['OT','Мих' ,  4, 6,7 ],'-'
  ,['OT','Мих' ,  5, 2,4 ],'-'
  ,['NT','Мат' ,  2, 4,6 ],'-'
  ,['OT','Дан' ,  9,20,27],'удивителна точност за времето на рождество Господне. В древноста под "седмини" се разбирало период от 7г, 69 седмини са 483г (Артаксеркс# -458г)'
  ,['OT','Ис'  ,  7,14   ],'Христос Спасител е от рода Давидов '
  ,['OT','Иер' , 31,15,16],'избиване на младенците'
  ,['OT','Осия', 11, 1   ],'типологическо сходство на ситуации - "Из Египта воззвал сына Моего"'
  ,['OT','Мал' ,  3, 1   ],'приготвяне пътя на Господа, Ангелът на завета'
  ,['NT','Мат' , 11, 9,10],'-'
  ,['OT','Пс'  ,  2, 7   ],'Христос е Син Божи, думите са произнесени не на Иордан, а на пл. Фавор, от Бог Отец'
  ,['OT','Ис'  ,  9, 1, 2],'Христос начнет проповедовать в Галилее'
  ,['OT','Втор', 18,15   ],'Христос - особенный Пророк'
  ,['OT','Втор', 34,10   ],'-'
  ,['NT','Деян',  3,22   ],'-'
  ,['OT','Ис'  , 61, 1, 2],'Господ Ме помаза да благовестя на бедни, благоприятната Господня година'
  ,['NT','Лука',  4,21,22],'-'
  ,['OT','Ис'  , 53, 3   ],'народ не принял Его '
  ,['NT','Иоан',  1,11   ],'-'
  ,['OT','Зах' ,  9, 9   ],'О торжественном входе Господа в Иерусалим'
  ,['OT','Пс'  , 40,10   ],'О предательстве'
  ,['OT','Зах' , 11,12   ],'О продаже за 30 сребреников'
  ,['OT','Пс'  , 34,11   ],'пророчества о том, что на Христа будут лжесвидетельствовать; '
  ,['OT','Ис'  , 53, 7   ],'О безгласии перед обвинителями'
  ,['OT','Ис'  , 50, 6   ],'О поругании и оплевании Господа'
  ,['OT','Пс'  , 34,19,20],'О неправедно враждующих на Господа'
  ,['NT','Иоан', 15,24,25],'-'
  ,['OT','Ис'  , 53, 5   ],'изъязвлен был за грехи наши и мучим за беззакония наши'
  ,['NT','1Пет',  2,23,24],'-'
  ,['OT','Ис'  , 53,12   ],'О причтении к злодеям'
  ,['NT','Марк', 15,27,28],'-'
  ,['OT','Зах' , 12,10   ],'о пронзении'
  ,['NT','Иоан', 19,37   ],'-'
  ,['OT','Пс'  , 21, 8,9 ],'О том, как над Господом ругались и поносили'
  ,['NT','Мат' , 27,39,40],'-'
  ,['OT','Пс'  , 68,22   ],'Об уксусе, который поднесли Господу'
  ,['NT','Мат' , 27,34   ],'-'
  ,['OT','Пс'  ,108, 4,5 ],'как Господь молился за врагов'
  ,['NT','Лука', 23,34   ],'-'
  ,['OT','Пс'  , 21,18,19],'О жребии, который бросали за одежде Иисуса Христа'
  ,['OT','Пс'  , 33,21   ],'что кость Нового Агнца не была сокрушена. У ветхозаветного агнца кость не была сокрушена, так как он целиком запекался и съедался, а все остатки от священной трапезы сжигались. Это повторилось и с Новозаветным Агнцем, Который взял на себя грехи мира.'
  ,['NT','Иоан', 19,36   ],'-'
  ,['OT','Ис'  , 53, 9   ],'О погребении у богатого'
  ,['NT','Мат' , 27,57   ],'-'
  ,['OT','Пс'  , 15,10   ],'О Воскресении'
  ,['NT','Деян',  2,25   ],'-'
  ,['NT','Деян', 13,35   ],'-'
  ,['OT','Пс'  , 67,19   ],'о Вознесении'
  ,['NT','Еф'  ,  4, 7,10],'-'
  ]} 
  bibthemetest=false // true false
  //document.body.contentEditable = 'true'; document.designMode='on';
function show_bibtheme(theme){// p=parent.idx; // hide!?
  last_bibtheme=theme.length; themedescr=theme[1]
  cm='L'// call method: Load file show.js | Run javascript:showchap()
  var r1=eol+'<tr valign="top">'+eol; r2=eol+'</tr>'+eol;
  var t1=par('BGCOLOR',bgshow), t2=par('BGCOLOR',bgno);
  var tabmax=1,i,j,k=0, descr=''
  var bibthemebuf='<table border=0 cellpadding="0" cellspacing="1">'
  for (i=2; i<=last_bibtheme-1; i++){
    if(bibthemetest) out(log_,'bibtheme['+i+']:'+theme[i]+br)/**/
    var lnk=theme[i]; 
    var zNm=lnk[0],bNm=lnk[1],cNo=lnk[2],vNo1=lnk[3],vNo2=0;
    if(!undef(lnk[4])) vNo2=lnk[4]; if(vNo2<vNo1) vNo2=vNo1
    bNo  =bNm2bNo(zNm,bNm)
    if(bibthemetest) out(log_,'bibtheme:'+zbcv2str(zNm,bNo,cNo,vNo1,vNo2)+' lnk='+lnk+br)
    var lnk=bib_lnk([zNm,bNo,cNo,vNo1,vNo2]); 

    var p1='<P>', p2='</P>', firstletter=true; /**/ firstletter=false; p1=p2=''; /**/
    vfr=vNo1;vto=vNo2 // replaced by biblink()
    if(theme[i+1]!='-'){k++// - -> the same subtheme
      linksdescr='<span id="txrm">'+theme[i+1]+'</span>'
      bibthemebuf+=r1+'<td colspan=2'+par('bgcolor',icobg)+'>('+k+')&nbsp;'+linksdescr+'</td>'+r2 
    }
    bibthemebuf+=r1+'<td valign="top"'
    +par('width','100%') // row2wid/tabmax
    +par('bgcolor',"black")+' colspan=2>'
                +lnk+'&nbsp;'+'</td>'+r2
    for (j=vfr; j<=vto; j++){ // + -
      bibthemebuf+=r1
      bcvfull =[zNm,bNo,cNo,j]; 
      bcvstd  =bcv2str(zNm,bNm2bNo(zNm,bNm),cNo,j)//bNm+'.'+cNo+':'+j
      lnk=bib_lnk(bcvfull)
      if(bibthemetest) out(log_,'bibtheme::\''+zbcv2str(zNm,bNo,cNo,vNo1,vNo2)+'\' lnk='+lnk+br)
      if(bibthemetest) out(log_,'..'+bcvfull+br)/**/
      if(zNm==Zavet.nt.name){
        if(undef(nt[bNo]) || undef(nt[bNo][cNo]) || undef(nt[bNo][cNo][j])) 
          {out(log_,'.. undef:'+br); descr='undef.'+br}
        else descr=nt[bNo][cNo][j] 
      }else if(zNm==Zavet.ot.name){
        if(undef(ot[bNo]) || undef(ot[bNo][cNo]) || undef(ot[bNo][cNo][j])) 
          {out(log_,'.. undef:'+br); descr='undef.'+br}
        else descr=ot[bNo][cNo][j]
      }else { //
      }
      //_tbcv   ='[\''+zNm+'\','+bNo+','+cNo+','+vNo+']'
      bibthemebuf+=
         '<td'+par('align',"right")+t2+'>' //  BGCOLOR="black" <- no need
      //    +'<a'+par('name',bcvfull)+par('href','Bible-BG.show.htm#'+bcvfull)
      //    +par('title',bcvstd/**-/+'\n^_ добави към библейския списък'/**/)
      //  //+par('onclick',"javascript:add_biblist("+_tbcv+")") 
      //    +'>'+'<span id="no">'+j+'</span>' //  vNo <-+-> bcvstd  ?!
      //    +'</a>'
        +'</td>'
        +'<td'+t1+'>'
          +'<span'+par('title',bcvstd)
          +outFmt(p1+descr+p2
          +'</span>'
        +'</td>')
      firstletter=false; if(!firstletter){p1=p2=''}
      bibthemebuf+=r2
    }
    i++; 
  } 
  bibthemebuf+='</tr></table>'+eol
  // ---
  showmnuY='display:block;'; showmnuN='display:none;' // block ->expanded | none ->colapsed
  bibthemebuf=
    '<table'+par('bgcolor',icobg)+' border=0 cellpadding="1" cellspacing="1"><tr>'+eol
   +'<td'+par('bgcolor','DIMGRAY')+'>'
     +'<a href="javascript:ShowHide(\'bibtheme_\');">'+'('+(k)+') '+themedescr+'</a>'
   +'</td></tr>'+eol+'<tr><td>'
   +'<div'+par('style',showmnuY)+par('id','bibtheme_')+par('id','bibtheme_')+'>'+eol
     +bibthemebuf+'</div>'+eol//name
   +'</td></tr></table>'+eol
  // ---
  return bibthemebuf
}// ---

var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va, show_bibtheme(theme1) ]]) ])
  +'</FONT>'
  return html
}//-----------------

  var biblist=[], test_biblist=false; //-- global -- todo: clear,load,save ?
  function add_biblist(a){// by pages.js:pg_bib_list(), show.js:showchap(), findres.js:showtxt()
    var zNm=a[0],b=a[1],c=a[2],v=a[3]
    var txt //p=parent.idx;
    if(zNm!=Zavet.ot.name && zNm!=Zavet.nt.name) { 
      out(log_,'add_biblist: bad adr='+zNm+'.'+b+'.'+c+'.'+v+eot); 
      return
    }
    if(isNaN(b)) { bNm=b; bNo=bNm2bNo(zNm,bNm)
    }else        { bNo=b; bNm=bNo2bNm(zNm,bNo)
    }
    lnk1=[zNm,bNo,c,v] 
    if(dbg>0) out(log_,'add_biblist:'+zbcv2str(zNm,bNo,c,v)
                 +' -> b:'+b+'  bNm:'+bNm+' a='+a+eot); 
    if     (zNm==Zavet.nt.name) txt=nt[bNo][c][v] // get verse text
    else if(zNm==Zavet.ot.name) txt=ot[bNo][c][v] // get verse text
    txt=repl_1quotes(txt)
    txt=repl_2quotes(txt)
    // skip if repeat
    last_biblist=biblist.length-1
    for (j=0; j<=last_biblist; j++){
      lnk2=[biblist[j][0],biblist[j][1],biblist[j][2],biblist[j][3]]     
      if(lnk1[0]==lnk2[0] && lnk1[1]==lnk2[1] && lnk1[2]==lnk2[2] && lnk1[3]==lnk2[3]){
        if(test_biblist) 
          out(log_,'addBibList('+last_biblist+'):'+lnk1+' <- already exists'+eot)
        return 
      }
    }
    last_biblist++; biblist[last_biblist]=[zNm,bNo,c,v,txt]; // <- add
    if(test_biblist) 
      out(log_,'addBibList('+last_biblist+'):'+[zNm,bNo,c,v]+' '+eot) 
  //html_buf.pg_bib_list   =pg_bib_list()
  }// ---
  function show_biblist(){ // show biblinks with tooltip=verse
     //p=parent.idx_ 
     biblistbuf='<table border=0 cellpadding="0" cellspacing="1"><tr>'+eol
     cm='R'// call method: Load file show.js | Run javascript:showchap()
     var tabcnt=0 ,tabmax=2 ,f1=''
     last_biblist=biblist.length-1
     for (var i=0; i<=last_biblist; i++){
       tabcnt++; if(tabcnt==tabmax+1) {f1='</tr><tr valign="top">'+eol; tabcnt=1;} else f1=''
       zNm=biblist[i][0]; cNo=biblist[i][2]; vNo=biblist[i][3];
       var b=biblist[i][1];
       if(isNaN(b)) { bNm=b; bNo=bNm2bNo(zNm,bNm)
       }else        { bNo=b; bNm=bNo2bNm(zNm,bNo)
       }
       vNo2=0
       descr=biblist[i][4];
       var lnk=[zNm,bNo,cNo,vNo,vNo2]; 
       if(dbg>1) out(log_,'show_biblist:['+i+']='+biblist[i]+br
                          +' bNm:'+bNm+' [lnk]='+lnk+' descr:'+descr+br)
        
     //         bib_lnk([lnk],name,evnt,tit,cm_,fndstr,spanbgclr) ,cmodel='L', spanbgclr='N'
       var e = ''//"htmCont('txt_',showchap('"+zNm+"',"+bNo+","+cNo+","+vNo1+",'',''));"; 
       var link=bib_lnk(lnk,'',e,descr,cm,'','')
       biblistbuf+=f1+'<td>'+(i+1)+':&nbsp;'+link+'&nbsp;'+'</td>'+eol
     } 
     biblistbuf+='</tr></table>'+eol
  // ---
     biblistbuf=
       '<table bgcolor="black" border=0 cellpadding="1" cellspacing="1"><tr>'+eol
      +'<td><a href="javascript:ShowHide(\'biblist_\');">Библейски списък('+(biblist.length)+')</a>'
      +'</td></tr>'+eol
      +'<tr><td>'
      +'<div'+par('id','biblist_')+par('id','biblist_')+'>'+eol+biblistbuf+'</div>'+eol//name
      +'</td></tr></table>'+eol
  // ---
     return biblistbuf
  }// ---

function pg_bib_urls(){   //+ 'links'         
  var html='<font face="Arial Cyr,Arial,Tahoma,Verdana" size=3>'
    +'<font color="#FFBB77">'
    +'<b>Bible-BG библейски интернет връзки:</b>'
     ,t=' target="_blank"' // _blank _self 
  for (var i=0; i<=(links.length-1); i++){ 
    html+=br+(i+1)+'. '
    +'<a'+par('href' ,links[i].href)
         +par('title',links[i].href)+'>'
                     +links[i].title
    +'</a>'
  }
  html+='</font></font>'+br
  return html
}

function pg_history(){    //- 'history'        // !
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',
  // row_('',[[va,biblink('NT.Мат.05.03-12') +biblink('NT.Лука.06.20-23')]])   
     row_('',[[va,'???']])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_holydays(){   //~ 'NT-holydays'    // !
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va,''
+'<span id="bk"><center>† Християнски празници</center></span><br>'
+'<br>'
+'По значимост празниците са:<br>'
+'- <font color="red"    >Пасха(празник на празниците)</font><br>'
+'- <font color="#66CCFF">12 велики (8 Господски и 4 Богородични)</font><br> '
+'- <font color="lime"   >светийски</font><br>'
+'<br>'
+'По календар са: <u>подвижни (свързаните с Пасха)</u> и неподвижни<br>'
+'На Първия вселенски събор в 325 г. Светите отци решили Християнската Пасха да се празнува '
+'в първият неделен ден след мартенското пълнолуние, когато е еврейската Пасха, '
+'за да не съвпадне никога с нея. Така празникът е в един от 35-те дни на интервала '
+'<u>( 4-Април  8-Май)</u> по нов стил <br>'
+'<br>'
+'По дати от Началото на Църковната година - 1.Сеп '+biblink('NT.Лука.4.16-19')+'<br>'
+'_1) <font color="#66CCFF">08.Сеп - Рождество на Пресвета Дева Мария   </font><br>'
+'_2) <font color="#66CCFF">14.Сеп - Въздигане на Честния Кръст Господен</font><br>'
+'_3) <font color="#66CCFF">21.Ное - Въведение Богородично              </font><br>'
+'_4) <font color="#66CCFF">25.Дек - Рождество Христово и поклонението на пастирите </font><br>'
+'_5) <font color="#66CCFF">06.Яну - Богоявление (Йордановден)          </font><br>'
+'_6) <font color="#66CCFF">02.Фев - Обрезание и Сретение Господне      </font><br>'
+'_7) <font color="#66CCFF">__.___ - <u>Вход Господен в Ерусалим (Цветница, Връбница) неделята преди Пасха</u></font><br>'
+'_8) <font color="#66CCFF">25.Мар - Благовещение Богородично           </font><br>'
+'__) <font color="lime"   >__.___ - <u>Разпятие Христово</u>           </font><br>'
+'_†_ <font color="red"    >__.___ - <u>Пасха - Възкресение Христово<u> </font><br>'
+'__) <font color="lime"   >__.___ - Срещата на Дева Мария с Елисавета  </font><br>'
+'__) <font color="lime"   >__.___ - Кръщение Господне                  </font><br>'
+'__) <font color="lime"   >__.___ - Отсичане главата на Йоан Предтеча  </font><br>'
+'_9) <font color="#66CCFF">__.___ - <u>Възнесение Господне на 40-ия ден след Пасха </u></font><br>'
+'10) <font color="#66CCFF">__.___ - <u>Петдесетница - Съшествие на Св. Дух над апостолите на 50-ия ден след Пасха</u></font><br>'
+'11) <font color="#66CCFF">06.Авг - Преображение Господне              </font><br>'
+'12) <font color="#66CCFF">15.Авг - Успение и Покров на Пресвета Богородица  </font><br>'
+'<br>'
+'Св. Дух,<br> '
+'неделите на месни и сирни заговезни,<br> '
+'Тодоровден,<br> '
+'Неделя Православна,<br> '
+'Връбница,<br> '
+'Велики Четвъртък, Петък и Събота.<br>'
// BulgarianHolidays.ics 
// http://www.mozilla.org/projects/calendar/caldata/BulgarianHolidays.ics
/* През 2000 година:
<br><b>Януари: </b><br>
1 - Васильовден; 
6 - Богоявление (Йордановден); 
7 - Ивановден; <br>
<b>Февруари:</b><br>
2 - Сретение Господне; 
<br><b>Март: </b><br>
25 - Благовещение; 
<br><b>Април: </b><br>
30 април, 1 и 2 май - Възкресение Христово;  <br>
<br><b>Май: </b><br>
6 - Гергьовден; 
11 - Св. св. Кирил и Методий; 
<br><b>Юни: </b><br>
8 - Възнесение Господне (Спасовден); 
18 - Петдесетница; 
19 - Св. Дух; 
29 - Св. апостоли Петър и Павел (Петровден);  
<br><b>Юли: </b><br>
20 - св. пророк Илия; 
<br><b>Август: </b><br>
6 - Преображение Господне; 
15 - Успение на Пресвета Богородица; 
<br><b>Септември: </b><br>
8 - Рождество на Пресвета Богородица;  
14 - Кръстовден; 
<br><b>Октомври: </b><br>
19 - Преподобни Йоан Рилски;  
26 - Димитровден; 
<br><b>Ноември: </b><br>
8 - Архангеловден;  
21 - Въведение Богородично; 
<br><b>Декември: </b><br>
6 - Никулден; 
25 - Рождество Христово; 
26 - Събор на Пресвета Богородица; 
27 - Св. първомъченик и архидякон Стефан (Стефановден)
*/
  ]])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_kalendar(){   //~ 'kalendar-y'    
//  "scr/pesah.js"
// "scr/kalendar hdr.js"
// "scr/kalendar cfg.js"
// "scr/kalendar.js"    
  var colorset=2 // 1:no frames  ,2:frames 
  var winset  =3 // 1:crnt month line, 2:year months line 3:crnt month std, 4:year months std 
  var tday =new Date(),yr=tday.getYear(), tmm=tday.getMonth()+1;
  if (yr<1900) yr+=1900
  setPesah(yr); setydays(yr);
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +showyear(yr,tmm,tmm);
  +'</FONT>'
  return html
}//-----------------
function pg_web_clr(){    //- 'web-clr'        // !
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +'???'
  +'</FONT>'
  return html
}//-----------------
function pg_about_this(){ //~ 'about'         
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',
    row_('',[[va,'<span id="big"><font size="5"><b>Bible-BG</b></font>&nbsp;</span>'
      +'<span id="bk" ><font size="5"><b>Библия на български</b></font>&nbsp;</span>'
+'<br>'
+'<span id="hid"><font size="2">'+_ver()+'</font></span>' // _ver(st,bg,fg)
+'<br>'
+'<span id="bej" >'
+'<b>"Всичкото Писание е боговдъхновено и полезно за поука, изобличаване,' 
+' изправяне и назидаване в правдата, за да бъде Божият човек '
+' съвършен и годен за всяко добро дело."</b>'
+'<br>'+biblink('NT.2Тим.3.16-17') 
+'</span>'
+'<br> Текстът на тази Библия е от превода и изданието на '
+' Светия синод на Българската Православна Църква (София 1992).'
+'<br>'
+'<br><b>Библията е Свещена и Боговдъхновена книга. '
+'<br> Тя е Богооткровена от Дух Светий към избрани човеци.'
+'<br> Записана е от старозаветните пророци и новозаветните апостоли, '
+'а при преписването е била редактирана от избрани хора.'
+'<br></b> '
+'<br> За християните Стария и Новия завет са неотделими.'
+'<br> Не всички книги са с еднакво канонично достойнство.'
+' Има канонични, неканонични и апокрифни книги. '
+'</span>'
/* */
+'<hr><span id="bej"><h2><b>Какво предлага Bible-BG</b></h2></span>'
+'<span id="bej">'
+'<br> 1.Достъп до Православна Библия на български. Можеш да ползваш локално или от сайт, чрез браузър*</span>'
+'<br> * продуктът работи с повечето браузъри'

+'<br><span id="bej">'
+'<br> 2.Оригиналният текст на кирилица (windows-1251) '
+'може да се чете като обикновен текст върху много слаби машини.</span> '
+'<br> Текстът в два некомпресирани файла: '
+lnk('NT.js','../Bible-bg.text/text/NT.js')+'=  945Kib '
+lnk('OT.js','../Bible-bg.text/text/OT.js')+'=3 836Kib '
+'<br> За текста в компресиран вид - виж по-надолу:'

+'<br><span id="bej">'
+'<br> 3.Преглед на библейския текст по глави и Навигация на преглеждането: </span>'
+'стандартен интерфейс с бутони, менюта и полета за писане'
+'<br>бутони ^ първи v последен < предишен > следващ '
+'<br><li>избор на книга,глава,стих '
+'<br><li>(=) Преглед на избраната книга и глава с маркиране на избрания стих'
+'<br><li>(-) (+) Преглед на предишна/следваща глава '
+'<br><li>(Нов) (Стар) индекс-меню за всички книги и глави излиза в лявата колона'
+'<br><li>(w) списък на думите в глава със статистика '

+'<br><li>Адресиране на 77 книги, 1 361 глави, 37 018 стиха, чрез стандартна номерация: книга.глава.стих -> '
+biblink('NT.Откр.22.19')
+'<br> В статусния ред на браузъра се вижда адреса '
+'[Откр.22.19] като +[27.22.19]. Тук - е стар завет, + е нов, а книгата е с поредния си номер.'
+'<br><li>Можете да пазите връзките (bookmarks) към глава,стих в Bible-bg и да ги извиквате извън контекста на сайта(само текста, без навигацията).'
+'<br><li>Можете да маркирате цитати в Преглед и Търсене и така ги пазите в \'библейски списък\', но сега не се помнят извън сесията.'
+'<br>'
+'<span id="bej">'
+'<br> 4.Търсене:</span> генерира списък стихове в които е от намерен израза, като той е маркиран в цвят'
+'<br><li>избор на диапазон: завет и книги'

//+'<br><li>избор на основен израз за търсене с частично/точно съвпадение и регистър точно/не'
//+'<br><li>избор на втори израз и място спрямо първия'
//+'<br><li>избор на отхвърлящ израз'
//+'сравнения на промените в различни редакции и версии'

+'<br>'
+'<span id="bej">'
+'<br> 5.Форматиране на библейския текст и форматиране при преглеждане:</span>'
+'<br><li>минимално количество форматиращи символи в текста: '
+'<br>   име на книга #...#, глава номер |...|, цитат "..." и \'...\', '
+'<br>   вариант на превод (Ева){Живот},коментар * и (...), нов ред = '
+'<br>   паралел: в текста [а] ->  в края на текста [а:Откр.22.19,...]'
+'<br><li>Когато текста в "..." от стих продължава в следващия, са ДОБАВЕНИ кавички '
+'в края на този и началото на следващия, за да има всеки стих самостоятелно форматиране'
+'<br><li>Форматиране при преглед: '
+'Определянето на ошрифтяване, оцветяване и подреждане зависи от '
+'bible-bg.css и зададената логика на форматиране<br>'
+'<span id="bej">'
+'<br>6.Важни части от библията и документи в първостепенна връзка:</span> '
+'<br><li>Десетте Божи заповеди'
+'<li>Символът на вярата '
+'<li>Блаженствата '
+'<li>Молитви'
+'<br>'
+'<span id="bej">'
+'<br>7.За празниците и събитията, които честваме:</span> '
+'<br><li>Видове празници '
+'<li>Хронология на събитията '
+'<li>Календар с празниците и светиите '
+'<br>'
+'<span id="bej">'
+'<br>8.За Иконите</span> '
+'<br><li>!'
+'<li>албум Икони '
+'<br>'
+'<span id="bej">'
+'<br>9.Теми - разгънат списък връзки по дадена тема</span>'
+'<br><li>сега съдържа само тема \'Пророчества за Христос\' '
+'<br><li>Търсят се теми за добавяне'
+'<br>'
+'<span id="bej">'
+'<br>10.Библии в интернет и полезни връзки(links)</span> '
+'<br><li>интернет връзки '
+'<br>'
+'<span id="bej">'
+'<br>11.Настойка на цветовете/шрифтове/размери</span>'
+'<br><li>файлове '
+lnk('colors.js','scr/colors.js')+' и '+lnk('Bible-BG.css','scr/Bible-BG.css')
+'<br><li>избор цвят   '
+lnk('web-clr.htm','scr/web-clr.htm')
+'<br>'
+'<span id="bej">'
+'<br>12.Смъкване(download) в компресиран(zip) вид на всичко, или на части за локално ползване:</span> '
+'<br> + сайта Bible-bg (със иконите от албума и текста): '
+lnk('Bible-bg.09.zip','../~down/Bible-bg.zip')+'=13 314Kib -> ?Kib '
+'<br> - текста на библията 2 файла в .js формат (javasript масив) '
+'<br> - '+lnk('Bible.js2.zip','../~down/Bible.js2.zip')+'=1 523Kib -> ?Kib след разкомпресиране'
+'<br> - текста на библията 27+50 файла в .js формат - разделен по книги '
+'<br> - '+lnk('Bible.js77.zip','../~down/Bible.js77.zip')+'=?Kib -> ?Kib'
+'<br> - иконите от албума на Bible-bg: '
+'<br> - '+lnk('icons.zip','../~down/icons.zip')+'=2 679Kib -> ?Kib '
+'<br> - сайта Bible-bg - без иконите от албума и текста: '
+'<br> - '+lnk('Bible-bg.09.zip','../~down/Bible-bg.zip')+'=?Kib -> ?Kib '
+'<br> * 1 килобайт - 1Kib=1024b, за разлика от 1Kb=1000b'
+'<br> * текста на библията е в 2 варианта по избор, 2 големи файла или 77(по книги)'
+'<br> --- ако смъквате на части, разкомпресирате в следната структура папки '
+' (dirs, folds) в избраната за главна Bible-bg/:'
+'<br> --- Bible-bg/ - главна папка за *.htm файловете, с главен файл index.htm'
+'<br> --- Bible-bg/scr/ - скриптове *.js и стилове *.css  за сайта'
+'<br> --- Bible-bg/Bible/ - текста на библията NT*.js, OT*.js'
+'<br> --- Bible-bg/icons/ - иконите за албума *.jpg'
/** **/
/** **-/
+'<hr><pre><span id="bej">незавършени/липсващи:</span>'
+' Празници'
+' За иконите'
+' Хронология на библейските събития '
+' Теми: Пророчества за Христос - като търсенето'
+' Промяна на цветовете - меню, запис във файл'
+' Търсене на втори и трети израз'
+' форматиране:'
+'	паралел: [a:bcv,...] и да показва с title съдържанието му '
+'	речник: Ева {Живот} да стане (Ева){Живот} и събиране на речник за ?'

+' Календар, файлът със светиите по дни е:'
+' 	смяна на година/месец/формат'
+' 	цветове на празниците '
+' 	изчисляване/задаване на Пасха '
+' 	и изчисление на плаващите празници'
+' 	списък празници под/до месеца'

+' клавиши, бутони и меню ако си върху елемент? '
+'    стар/нов:     -> (Shift/Alt)+'
+'	кн: (^ v < >) -> (home end pgup pgdn) Shift+home/Alt+home,... '
+'	гл: (^ v < >) -> (up down left right)'
+'	ст: (^ v)     -> (ins del) ?'
+'	бутони за преглед: (-) (+) (=)/(s)how '
+'	менюта:(d)ocs (o)ld-index (n)ew-index (h)olydays (i)cons (w)ords (f)ind (b)iblist (a)dd-to-biblist/del? (t)hemes (c)alendar'
/* *-/
+' допълнително групиране и коментар в индекса на книгите и главите'
+'    Използвани означения към името на книгата в Стария Завет:'
+'    [пе##] п=K|N|A: Канонични,Неканонични,Апокрифни - православни'
+'    --------- е=T|N|K: Закон(Thora=5), Пророци(Neviim=8), Писания(Kethobim=11) - еврейски'
+'    --------- ##|--: еврейски каноничен номер 1..24, -- евр.апокриф
+'    (12) - дванадесетте малки пророка, кн. - книга, пр. - пророк

//+'лого кръст за Bible-BG'
+' статия за кръстовете '
   
+' увеличаване/намаляване на шрифта във всеки прозорец А+/-'
+' пренасочване съдържанието на прозорец в друг(fnd<-txt/?) и таблица за преход!?'
+'</pre>'
/* */

+'<hr> <span id="bej">Свободно изтегляне от интернет: </span> -'+bible_bg_web 
+'<br> <span id="bej">Редактиране, корекции и др.:    </span> +'+bible_bg_mail

+'<br> Библейският текст е взет от сайта за глухонеми:'
+lnk('bsbible.zip',"http://123.dir.bg/bsbible.zip")
+'<br> вижте още много други: '
+lnk('Библии и Православни връзки в мрежата',"../scr/links.htm")

+'<hr> <span id="hi">'
+'     Свободни сте да променяте всичко без текста на Библията, '
+'<br> освен ако отстранявате грешки и неточности.  '
+'<br> "Рапространението и ползването на цялостния продукт: '
+'<br> \'текст и уеб интерфейс\' е свободно с условието да НЕ се искат '
+'<br> пари,облаги или обезщетения за него '
+'<br> , тъй като нито библията, нито продукта са направени с тази цел"'
+'<br> Не ограничавайте тази свобода на другите хора, чрез продажба или по друг начин!'
+'<br> Вместо това, поучете се ако не знаете и помогнете ако можете,'
+'<br> да стане продукта по-добър. '
+'</span>     '
+'<hr>'
    ]])
  ])
  +'</FONT>'
  return html
}//-----------------
_load._end()

//function clear(p_){alert(p_);htmCont(p_,'')} // htmCont('txt_','')

// --- <a href="#aaa">...</a>   -> <a name="aaa">...</a>
// function showch_(zNm,bNo,cNo,vNo1,vNo2){ // ,bcv
// //parent.idx.document.getElementById(zNm+"bcv_").value=bcv
// //if(wait) out(txt_,'wait:... ')
//   showchap(zNm,bNo,cNo,vNo1,vNo2,'')
// }// ---