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
       ['',show_htm_onclick('idx_','html_buf.pg_idx'   ,'����'   )]
      ,['',show_htm_onclick('idx_','html_buf.pg_find'  ,'�����'  )] 
      ]) 
    ])
  return '<center>'+html+'</center>'
}//--
  var editableON="javascript:document.body.contentEditable=true;" 
  var editableOFF="javascript:document.body.contentEditable=false;"
  var designModeON="javascript:document.designMode='on';"
  var designModeOFF="javascript:document.designMode='off';"
function pg_idx(){        //+ use ' not "      !?hide: pg_sel_ot,pg_sel_ot,��������
  with(box[_idx]) var w=par('width',sz.w+sz.un)
  var html=
  htm_(['table',idx_hdr+w,'' // show_url_onclick(boxNM ,href,txt ,wait) 
/* */    
    +row_(idx_bg,[ ['',selgen(Zavet.ot.name,'� ����',oh,'OTopen')] ])
    +row_(idx_bg,[ ['',selgen(Zavet.nt.name,'� ���' ,nh,'NTopen')] ])
/* */    
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_10GodCom'   ,'� ������� ���� ��������'  )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_FaithSym'   ,'� �������� �� ������'     )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_beatitudes' ,'� ������������'           )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_prayers'    ,'� �������'                )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_album_icons','� �����'                  )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_theme_list' ,'  ��������� �������'      )] ])
//  +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_bib_list'   ,'  ��������� ������'       )] ]) 
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','show_biblist()'         ,'  ��������� ������'       )] ]) 
//  +row_(idx_bg,[ ['',show_biblist() ]])
    
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_bib_urls'   ,'  ����������� ������'     )] ])
//  +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_history'    ,'  ���������� �� ���������')] ]) //
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_holydays'   ,'  ����������� ��������'   )] ]) //
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_kalendar'   ,'  ��������'               )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_welcome'    ,'  ������'                 )] ])
    +row_(idx_bg,[ ['',show_htm_onclick('txt_','html_buf.pg_about_this' ,'  �� Bible-bg'            )] ])
/* */    
//  +row_(idx_bg,[ ['',show_htm_onclick('idx_','html_buf.pg_ext'        ,'  ��������'               )] ])
    +row_(idx_bg,[ ['',
       '<a href="javascript:ShowHide(\'service\');">��������</a>'
      +'<span id="service" style="display:none" '// block none
        +par('onclick','ShowHide(\'service\')')+'>'
        +htm_(['a',par('onclick',"htmCont('txt_',ar2obj('NT'))"                ),'���.������->��. NT' ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',ar2obj('OT'))"                ),'���.������->��. OT' ])+br
        +htm_(['a',par('onclick',"test_obj_fmt()"                              ),'���� ��. '          ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',dump_some())"                 ),'DOM some:'          ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',dump_elem('box'))"            ),'DOM all:'           ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',gen_arrdef())"                ),'���. ������ NT/OT:' ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',gen_ar('OT','js'))"           ),'���. OT-##.bg.js:'  ])+br // file | js
        +htm_(['a',par('onclick',"htmCont('txt_',gen_ar('NT','js'))"           ),'���. NT-##.bg.js:'  ])+br // file | js
        +htm_(['a',par('onclick',"htmCont('txt_',countwords('OT',1,50,1,'js'))"),'!������ OT 1..50:'  ])+br // (zNm,bkFr,bkTo,3|1, js|htm)
        +htm_(['a',par('onclick',"htmCont('txt_',countwords('NT',1,27,1,'js'))"),'!������ NT 1..27:'  ])+br // 1:ask range; 3:no ask range
        +htm_(['a',par('onclick',"htmCont('txt_',checkBCV_hdr('NT',nt,nh))"    ),'����. ����� � NT'   ])+br
        +htm_(['a',par('onclick',"htmCont('txt_',checkBCV_hdr('OT',ot,oh))"    ),'����. ����� � OT'   ])+br
        +htm_(['a',par('onclick',"editableON   "                               ),'contentEditable ON' ])+br
        +htm_(['a',par('onclick',"editableOFF  "                               ),'contentEditable OFF'])+br
//      +htm_(['a',par('onclick',"designModeON "                               ),'designMode ON'      ])+br
//?     +htm_(['a',par('onclick',"designModeOFF"                               ),'designMode OFF'     ])+br // ?
        +htm_(['a',par('onclick',"htmCont('txt_',html_buf.pg_web_clr)"         ),'����� �� �������'   ])+br
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

function selgen(zNm,tstname,th,Tform){// selgen(Zavet.nt.name,'���' ,nh,'NTopen')
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
   var fnd='������� ������� ��'; 
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
             +inText(zNm+"bcv_" ,14,bcv,'��.��.��-��',''
          //  inText(n          ,sz,val,t            ,evnt_) 
          /**-/ +par('onChange',// ?
                 "bcv="+zNm+"bcv_.value; "                       
                +"p=parselink("+zNm+'.'+"bcv"+"); "
                +"if(err==''){bNo=p[1];cNo=p[2];vNo1=p[3];vNo2=p[4]}"
                +"bcvNo2val('"+zNm+"')" ) /**/
              )
       +'</td><td>'                                              
           +'<a>'+btn("=" ,btnY,btnYst,"��� ���� �����" ,// val2bcvNo(zNm) 
                 "bcv="+zNm+"bcv_.value; "
                +"err=''; var p=parselink('"+zNm+".'+bcv);"
                +"if(err==''){bNo=p[1];cNo=p[2];vNo1=p[3];vNo2=p[4]}"
                +bcvNo2val(zNm)
             +loadrun,'=')
           +'</a>'               
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
        +'<td>'+'��'+'</td><td>'// �� ^ v
           +'<a>'+btn("^" ,btnT,btnTst,"����� �����"    ,
             bcvgo(zNm,'B',"F"))// -> bcvNo2val(zNm)
           +'</a>'
           +'<a>'+btn("<" ,btnT,btnTst,"�������� �����" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"-"))
           +'</a>'
       +'</td><td>'
           +sellistBH(zNm+'b_','?',th,1,"bNo="+zNm+"b_.value;cNo=1;vNo1=1;vNo2='';"
            +"bcv=bcv2str(zNm,bNo,cNo,vNo1,vNo2);"// "bNo+'.'+cNo+'.'+vNo1+'-'+vNo2;"
            +bcvNo2val(zNm),'')
       +'</td><td>'
           +'<a>'+btn(">" ,btnT,btnTst,"�������� �����" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"+"))
           +'</a>'
           +'<a>'+btn("v" ,btnT,btnTst,"�������� �����" ,"bNo="+zNm+"b_.value;" 
            +bcvgo(zNm,'B',"L"))
           +'</a>'
       +'</td><td>'
           +'<a>'+btn("w",btnY,btnYst,"�������� ������ �� �����",val2bcvNo(zNm)
            +"htmCont('txt_',countwords('"+zNm+"',bNo,bNo,1,'js'))")
           +'</a>'
            //+'a,LABEL,button,input,select,textarea: ACCESSKEY="d" // Alt+d key_mod_str
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
       +'<td>'+'��'+'</td><td>'
           +'<a>'+btn("^" ,btnT,btnTst,"����� ����� "   ,val2bcvNo(zNm)+bcvgo(zNm,'C',"F"))+'</a>'
           +'<a>'+btn("<" ,btnT,btnTst,"�������� ����� ",val2bcvNo(zNm)+bcvgo(zNm,'C',"-"))+'</a>'
       +'</td><td>'
                 +inText(zNm+"c_" ,6,'1','�����'  ,'')   
       +'</td><td>'
           +'<a>'+btn(">" ,btnT,btnTst,"�������� ����� ",val2bcvNo(zNm)+bcvgo(zNm,'C',"+"))+'</a>'
           +'<a>'+btn("v" ,btnT,btnTst,"�������� ����� ",val2bcvNo(zNm)+bcvgo(zNm,'C',"L"))+'</a>'
       +'</td><td>'
           +'<a>'+btn("=" ,btnY,btnYst,"��� ���� �����"  ,
             val2bcvNo(zNm)+loadrun,'=')
           +'</a>'        
           +'<a>'+btn("<" ,btnY,btnYst,"��� ������ ��."  ,
             val2bcvNo(zNm)+"CgoL('"+zNm+"',bNo,cNo,'-');"+bcvNo2val(zNm)+loadrun,'-')
           +'</a>'
           +'<a>'+btn(">" ,btnY,btnYst,"��� �������� ��.",
             val2bcvNo(zNm)+"CgoL('"+zNm+"',bNo,cNo,'+');"+bcvNo2val(zNm)+loadrun,'+')
           +'</a>'
   buf+='</td></tr><tr'+par('valign',"top")+par('BGCOLOR',mnucol1clr)+'>'+eol
       +'<td>'+'��'+'</td><td>'
           +'<a>'+btn("^" ,btnT,btnTst,"����� ����"      ,val2bcvNo(zNm)+bcvgo(zNm,'V',"F"))+'</a>'
       +'</td><td>'
           +      inText(zNm+"v1_",1,'1','�� ����','') 
           +  '-'+inText(zNm+"v2_",1,'' ,'�� ����','')
       +'</td><td>'+' &nbsp;&nbsp; '
           +'<a>'+btn("v" ,btnT,btnTst,"�������� ����"   ,val2bcvNo(zNm)+bcvgo(zNm,'V',"L"))+'</a>'
       +'</td><td>'
           +'<a'+par('title',zNm+' ������') //+par('href','Bible-BG.books.htm#'+zNm)
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
  function find_chk_and_load(zNm,tt,th){   ok=true; err=''; ftx='�������';
     //out(log_,'chkfind: begin'+eot)  
     if(!(zNm==Zavet.nt.name || zNm==Zavet.ot.name)){err+='���������� ��� �� �����: zNm='+zNm+'\n'; ok=false;}
     var msg='��������� ��������� ��:';
     if(ok){
       if(undef(tt) || tt==null || tt=='') {err+=msg+'tt �� '+zNm+'\n'; ok=false;}
       if(undef(th) || th==null || th=='') {err+=msg+'th �� '+zNm+'\n'; ok=false;}
     }
     if(err!=''){out(log_,'find:'+err+br)}//  ������ ��� '+ftx?+':\n'
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
      if( (Nbk>0) && (find_chk_and_load(Zavet.nt.name,nt,nh)) ) // parent.idx.nt, parent.idx.nh
  	  findTT(Zavet.nt.name,nt,nh);// parent.idx.nt,parent.idx.nh
      if( (�bk>0) && (find_chk_and_load(Zavet.ot.name,ot,oh)) ) 
  	  findTT(Zavet.ot.name,ot,oh);
    }else{out(log_,errNOTODO+eot)}
  }// ---
  function fndform(){// ->htmlform -> check_and_run()
     winsub2style=' overflow:auto; padding:0px; text-align:left; border:1px inset; margin:0px;'
     f1exp='������'//'������ ���'
     errNOTODO='���� ����� ��� �� � ������� ����� �� �������!' 
     wt=''; if(wait) wt+='out(txt_,\'wait:... \'+eot);';
     buffnd=
      '<table bgcolor="black" border=0 cellpadding="0" cellspacing="0"'
      +' width="'+'100%'+'">'// row1wid 310
     +'<tr valign="top">'+eol+'<td>'+'������� � �������� '
       +'<a>'+btn("�����",'btnY','width:50px;font-size:12px;',"����� ������",wt
           //+"out(log_,'get form:'+eot);"
           +"Nbk=Nbk_.value;Nbl=Nbl_.value; �bk=�bk_.value;�bl=�bl_.value;"+eol
           +"f1exp=f1exp_.value;f1wrd=f1wrd_.value;f1reg=f1reg_.value;"+eol
           +"f2exp=f2exp_.value;f2wrd=f2wrd_.value;f2reg=f2reg_.value;f2plc=f2plc_.value;"+eol
           +"f3exp=f3exp_.value;f3wrd=f3wrd_.value;f3reg=f3reg_.value;"+eol
           /* */
           +"out(log_,'test find form:'+eot);" 
           + "a='  Nbk=['+Nbk  +']   Nbl=['+Nbl +'] Obk=['+�bk +'] Obl=['+�bl+']';"
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
           +'<tr'+par('bgcolor',ntclr)+'>'+eol+'<td>'+'��� �����'
           +'</td>'+eol+'<td>'
             +sellist('Nbk_', 1,['�����','������','������'],1,'',"")+' ��.'
              +inText('Nbl_',6,'','������: ����a,...'          ,"")//25
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr'+par('bgcolor',otclr)+'>'+eol+'<td>'+'���� �����'
           +'</td>'+eol+'<td>'
             +sellist('�bk_', 0,['�����','������','������'],1,'',"")+' ��.'
              +inText('�bl_',6,'','������: ����a,...'          ,"")
           +'</td>'+eol+'</tr>'+eol
           /**/// ������,�����
           +'<tr valign="top">'+eol+'<td>'+'�����' 
           +'</td>'+eol+'<td>'+ inText('f1exp_',22,f1exp,'�����','')
             +'<table>'
               + '<tr><td>'+' ������� '   +'</td><td>'+sellist('f1wrd_', 1,['�����','����','�����'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ���/�� '    +'</td><td>'+sellist('f1reg_', 1,['�����','��� ����.']   ,1,'','')+'</td></tr>'
             +'</table>'
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr valign="top">'+eol+'<td>'+'��� '
           +'</td>'+eol+'<td>'+ inText('f2exp_',22,f2exp,'�����','')
             +'<table>'
               + '<tr><td>'+' ������� '   +'</td><td>'+sellist('f2wrd_', 1,['�����','����','�����'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ���/�� '    +'</td><td>'+sellist('f2reg_', 1,['�����','��� ����.']   ,1,'','')+'</td></tr>'
               + '<tr><td>'+' ����� '     +'</td><td>'+sellist('f2plc_', 1,['�����','����','� �����','� �������'],1,'','')+'</td></tr>'
             +'</table>'
           +'</td>'+eol+'</tr>'+eol
           /**/
           +'<tr valign="top">'+eol+'<td>'+'��� '     
           +'</td>'+eol+'<td>'+ inText('f3exp_',22,f3exp,'�����','')
             +'<table>'
               + '<tr><td>'+' ������� '   +'</td><td>'+sellist('f3wrd_', 1,['�����','����','�����'],1,'','')+'</td></tr>'
               + '<tr><td>'+' ���/�� '    +'</td><td>'+sellist('f3reg_', 1,['�����','��� ����.']   ,1,'','')+'</td></tr>'
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
        ,icon("HristosPantokrator.jpg"     ,"������� �����������"       ,220) 
        +icon("sv.Bogorodica Jerusalem.jpg","��.���������� ������������",220)
      ],
      [va  +par('bgcolor',icobg),''
        +biblink('OT.����.06.04-07')+biblink('NT.����.10.12')      
        +biblink('NT.����.12.29-30')+biblink('NT.����.10.27')+'<br>'
        +'������, ��� ���, � ������ ����; ������ �������, ���� ���,'
        +' �� �������� �� �����, �� �������� �� ���� � � �������� �� ����.'+'<br>' 
        +'��� ����, ����� �� ���������� ����, �� ����� � ������� �� (� � ������ ��);'+'<br>'
        +biblink('NT.����.12.31')+'<br>'
        +'�����, ������� ���, �: "������� ������� �� ���� ���� ��". ����� �������, ��-������ �� ���, ����.'+'<br>'
        +biblink('NT.����.14.06')+'<br>'
        +'�� ��� ����� � �������� � �������;'+'<br>'
        +'����� �� ������� ��� ����, ����� ���� ����.'+'<br>'
        +biblink('NT.����.13.34-35')+'<br>'
        +'���� ������� �� �����, �� ������ ���� �������; ����� �� ��������, �� ������ � ��� ���� �������.<br>'
        +'�� ���� �� ������� ������, �� ��� ��� �������, ��� ����� ����� ������� ��.<br>'
        
        +biblink('NT.����.15.12-13')+'<br>'
        +'���� � ����� �������: �� ������ ���� �������, ����� �� �� ��������.<br>'
        +'����� ���� ����� ��-������ �� ���, �� ������ ������ �� �� ������ ��������.<br>'
        
        +biblink('NT.2����.01.06-07')+'<br>'
        +'� ������� �� ������ � ����, �� ���������� �� �������� ��������.<br>' 
        +'���� � ���������, ����� ��� ���� ��������, �� �� ���������� �� ���;<br>'
        +'������ � ����� ������� ������� �����������, ����� �� ����������,<br>' 
        +'�� ����� ������� � ����� � ����; ����� ����� � ���������� � ���������.<br>'
        
        +biblink('NT.����.22.19')+'<br>'
        +'� ��� ����� ������ ���� �� ������ �� ������� �� ���� �����������, <br>'
        +'��� �� ������ ���� �� �� ������� �� ������ � �� ������ ���� � �� ���������� � ��� �����.<br>'
        
        +biblink('NT.����.16.15')+'<br>'  
        +'� ���� ��: ����� �� ��� ���� � ������������� ����������� �� ������ �����. <br>' 
        +'����� ������� � �� ������, �� ���� ������, � ����� �� �������, �� ���� ������.'
      ] ]) 
    ])
    +'</FONT>'
  return html
}//-----------------
function pg_10GodCom(){   //+ 'OT-10GodCom'   
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
 +'<span id="bk"><center>� ������� ���� ��������</center></span>'
 +biblink('OT.���.20.02-17')
 +htm_(['table','',''
   +row_(va,[['',' 1.'],['','�� ��� ������, ��� ����; �� ����� ����� ������ ����� ����.'] ])
   +row_(va,[['',' 2.'],['','�� �� ����� ����� � ������� ����������� �� �����, �� � ���� �� ������ , �� � ���� �� ������ � �� � ��� ������ ��� ������, �� �� �� ������ � �� �� �����.'] ])
   +row_(va,[['',' 3.'],['','�� ��������� �������� ����� �� �������, ���� ���.'] ])
   +row_(va,[['',' 4.'],['','����� �������� ���<sup><font color=\'lime\'>*</font></sup>, �� �� �� ������: ���� ���� ������ � ����� � ��� �������� �� ������; � ������� ��� � ������ �� �������, ���� ���.'] ])
   +row_(va,[['',' 5.'],['','������� ���� �� � ����� ��, �� �� �� ���� ����� � �� ������ ����� �� ������.'] ])
   +row_(va,[['',' 6.'],['','�� ������.'         ] ])
   +row_(va,[['',' 7.'],['','�� ���������������.'] ])
   +row_(va,[['',' 8.'],['','�� �����.'          ] ])
   +row_(va,[['',' 9.'],['','�� ����������������� ������ ������� ��.' ] ])
   +row_(va,[['','10.'],['','�� ��������� ���� �� ������� ��; �� ��������� ������ �� ������� ��; ���� ������ ��; ���� ���� ��; �� �������� ��; �� ���� ��; �� ����� ��; ���� ������� ����� ������� - ����, ����� � �� ������� ��.'] ])
  ])
+'<font size="2" color="gold">'
+'<sup>* </sup> (�� ����������� ��� �� ���������� ����� ���� �'
+' ����� �� ���������� ����������� - ������)</font></font>'
  return html
}//-----------------
function pg_FaithSym(){   //+ 'NT-FaithSymbol'
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['span',' id="bk"','<center>� �������� �� ������</center>'])
  +htm_(['table',' cellpadding="5" cellspacing="3" border="0"',
      row_(va,[['', 1.],['','������ � ���� ��� ����, �����������, ������ �� ������ � ������, �� ������ ������ � ��������.']])
     +row_(va,[['', 2.],['','� � ���� ������ ����� �������, ���� �����, �����������, ����� � ����� �� ���� ����� ������ ������; �������� �� ��������; ��� ������� �� ��� �������, �����, ����������, ���������� � ����, ���� ������ ������ � �������.']])
     +row_(va,[['', 3.],['','����� ������ ���, ��������, � ������ ������ �������� ����� �� �������� � �� ������� �� ���� ������� � ���� ����� � ����� �����.']])
     +row_(va,[['', 4.],['','� �� ������� �� ��� ��� ������ ������, � ������, � �� ��������.']])
     +row_(va,[['', 5.],['','� ��������� � ������ ���, ������ ���������.']])
     +row_(va,[['', 6.],['','� ������� �� �������� � ���� ������� �� ����.']])
     +row_(va,[['', 7.],['','� ��� �� ����� ��� ����� �� ���� ���� � ������ � ��������� �� �� �� ��� ����.']])
     +row_(va,[['', 8.],['','� � ���� �������, �������, ������������, ����� �� ���� �������, ������ �� ��������� � �� ������ ������� � ���� � ����, � ����� � ������� ���� ���������.']])
     +row_(va,[['', 9.],['','� ���� �����, ��������� � ���������� ������.']])
     +row_(va,[['',10.],['','���������� ���� �������� �� ���������� �� ���������.']])
     +row_(va,[['',11.],['','����� ����������� �� ��������.']])
     +row_(va,[['',12.],['','� ����� � ������� ���! ����!']])
    ]) 
  +'</FONT><font size="2" color="gold"><sup>* </sup>'
  +'����������� �������� �� ������� ���� �� 7-��� ��������� ����� � ����� ���� 787�<br>'
  +'</font>'
  return html
}//-----------------
function pg_beatitudes(){ //+ 'NT-beatitudes' 
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4"><a NAME="������������"></a>'
  +htm_(['table','',
     row_('',[[va,'<span id="bk"><center>� ������������</center></span>']])
    +row_('',[[va,biblink('NT.���.05.03-12') +biblink('NT.����.06.20-23')]])   
    +row_('',[[va,'������� ������� �����, ������ ����� � ��������� �������.']])
    +row_('',[[va,'������� ���������, ������ �� �� �� ������.']])
    +row_('',[[va,'������� ��������, ������ �� �� �������� ������.']])
    +row_('',[[va,'������� �������� � ������� �� ������, ������ �� �� �� �������.']])
    +row_('',[[va,'������� �����������, ������ �� �� ����� ����������.']])
    +row_('',[[va,'������� ������� �� �����, ������ �� �� ����� ����.']])
    +row_('',[[va,'������� ������������, ������ �� �� �� ������� ������ �����.']])
    +row_('',[[va,'������� ���������� ������ ������, ������ ����� � ��������� �������.']])
    +row_('',[[va,'������� ��� ���, ������ �� ������� � �������, � ����� ������ ��� ������� ����� � �� � ���� ���� ������ ����.']])
    +row_('',[[va,'�������� �� � �� ��������, ������ ������ � ��������� �� �� ��������; ��� ���� ������ � ���������, ����� ���� ����� ���.']])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_prayers(){    //+ 'NT-prayers'    
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va,''
   +'<span id="bk"><center>� �������</center></span>'
   
   +'<span id="ch"><center>���� � ������-������</center></span>'
   +biblink('OT.��.6.3')
   +'<br>�����, ����, ���� � ������-������!'
   +'<br>����� �� ������ � ������ � ������ �����!�'
   
   +'<span id="ch"><center>���������� �������</center></span>'
   +biblink('NT.���.6.9-13')+biblink('NT.����.11.2-4')
   +'<br>����� ���, ����� �� �� ��������!'
   +'<br>�� �� ����� ������ ���; �� ����� ������ �������;'
   +'<br>�� ���� ������ ����, ����� �� ������ ��� � �� ������;'
   +'<br>��������� �� ���� ��� �� ����; � ������ ��� ��������� ��,'
   +'<br>����� � ��� ��������� �� ���������� ��;'
   +'<br>� �� ������ ��� � ���������, �� ������ �� �� �������;'
   +'<br>������ ���� � ���������, � ������, � ������� ������.'
   +'<br>����!�'

   +'<span id="ch"><center>������� �������</center></span>'
   +'�����, ��������� ��, �� �� ������ ���� ��������� � ���� ���� ���.'
   +'������� �� �� �� �� �������� � ������� ���� � �� ������� ������� ��� '
   +'������ �� ��� � ���������� �� ���.'
   +'<br>����!�'

   +'<span id="ch"><center>������� �������</center></span>'
   +'��������, ���� ���, ���� ���� � �����������,'
   +'������ �� ������� �������� ���� ��� � ����, ���� � �������.'
   +'������� �� ����� � ������� ���. ����� ���� ����� �������'
   +'�� �� ������� � ���� �� ����� ���, ������ �� �� ������� �� ������ � ������ ��,'
   +'� �� ��� - ����, ���� � ������ ���, ��������� �����, ���� � �������, � �� ���� �����.'
   +'<br>����!�'

   +'<span id="ch"><center>������� ����� �������</center></span>'
   +'�����������, �������, ������� � ������� �� ������ ����, '
   +'������ �� ���� ���� � ������ � ��� ����� ������.'
   +'<br>����!�'

   +'<span id="ch"><center>������� ���� �������</center></span>'
   +'����������� ��, ������ ���� ���, �� �� ������ � ������ ����� �����.'
   +'�� �� ������� � �� ��������� �� �������!'
   +'<br>����!�'

// +'<span id="ch"><center>������� ����� ������</center></span> 
// +'<span id="ch"><center>������� ���� ������</center></span> 
// +'<span id="ch"><center>������� ����� ������</center></span> 
// +'<span id="ch"><center>������� ���� ������</center></span> 

   +'<span id="ch"><center>������� ������� ��� ������-�������</center></span> '
   +'������� �������, ��� ���� ������� � ����������'
   +'�� ������ � ������ ��,'
   +'������ �� ������, ������� ���� ��� ��������,'
   +'� �� ������ �� ����� ��������� �� ������������ �� ����,'
   +'��� �� � ������� ���� �� �� �������� ��� ���.'
   +'���� �� �� ���� ������� � ��������� ���,'
   +'�� �� �� �������� ������� �� ��������� � ��������'
   +'�� �������� ������, �� ������� �� ��� ������, ����� �������'
   +'� �� ������ ������. ����.'

// +'<span id="ch"><center>�������� ��� ������������� ���� �������� � ���������: </center></span><br>'
// +biblink('NT.���.21.9')          // ����.11:1-10;
// +biblink('NT.����.19.37-38')     // ���� 19-28-38;
// +biblink('NT.����.12.12-13')     // ����.12:12-19.
    ]])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_album_icons(){//+ 'ikons-album'    err:?
{// === globals, some loaded from albumfile
  var albumfile="scr/album-ikoni.js" 
  //  f=[]; // ����� �� ����� .jpg � ��������
  var fname=0, fext=1, fsize=2, fdate=3, ftime=4, fatr=5, desc=6; 
  //  root=''//pathicons
  //  albumdir='' // pathicons+"album/";/* ������ �� ������� */ 
  //  scandir ='' // pathicons+"scan/"; /* ��������� ������ - ������ */
  //  scanext="tif";
  //  head='', foot=''
  var allfiledetails=false // true,false
  var eot='<br>'+eol
  // *** �� albumfile, albumdir, scandir: ����� �� ����� � � �������� ����� ��� ��� ����� ���    
  // *** ��� ����� ������� ��� �������� \ ��� / ��� �� ��������� \\ 
  // *** ��� ����� �� ����� � ��� ����� ��� ������ �� ����� � file:// ��� http://
}// ===   
  function albumShow(f){// ������� ������ ������� � �������� �� ����� f[] � �������
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
  +biblink('NT.����.14.6')+'<br>'
     +'�� ��� ����� � �������� � �������;'+'<br>'
     +'����� �� ������� ��� ����, ����� ���� ����.'+'<br>'
  +albumShow(album)
  +'</FONT>'
  return html
}//-----------------

function pg_theme_list(){ //+ 'themes'         err: show/hide sublist
var va=' valign="top"'
{var theme1=[['','',0,0,0],'����� ����������� �� �������� �� ���� ������� <br> � �������� � ����� �����' 
  ,['OT','���' ,  3,14,15],' �������� ������ ��� ����� ���� ���� - "������� ����"' 
  ,['OT','���' , 12, 1   ],' ����� ������� �� ��������� �� ������ �� �������'
  ,['OT','���' , 12, 2, 3],' ��� ������� ���������� �� ������� � ������ �����'
  ,['NT','���' ,  1, 1   ],' ������������ - ������������ �� ������������� �� ��������� � ��������� �� ����� � ����'
  ,['OT','���' , 17,19   ],' �� ������ ������ ���������� ���������, �. �. �� ���� �������'
  ,['OT','���' , 24,15,19],' ����������� � ���, ��� ��������� ���������� �� ������, 3-�� �� ����������'
  ,['OT','���' , 49, 8,10],' ������� ���������� �� ������ ������, �� ������ �� ����� �������. ����������� � �����������, ������� ������ �� ������ ���� ����� ��������� ��� ����������� ������� ���� �������, ������� ��� �� ����� �� ������������, �� �����, � ���������'
  ,['OT','��'  ,  9, 7   ],' �� ������������� ����� ������� �������� ����������� ���� ������, �. �. �������� ���������.'
  ,['NT','����',  1,30,33],'-'//��� ����� ��������� �������� ��.9.7' 
  ,['OT','���' ,  4, 1   ],'�� ��������� �������� ��� ������� - ��. ����� -8�.'
  ,['OT','���' ,  4, 6,7 ],'-'
  ,['OT','���' ,  5, 2,4 ],'-'
  ,['NT','���' ,  2, 4,6 ],'-'
  ,['OT','���' ,  9,20,27],'���������� ������� �� ������� �� ��������� ��������. � ��������� ��� "�������" �� ��������� ������ �� 7�, 69 ������� �� 483� (����������# -458�)'
  ,['OT','��'  ,  7,14   ],'������� �������� � �� ���� ������� '
  ,['OT','���' , 31,15,16],'�������� �� ����������'
  ,['OT','����', 11, 1   ],'������������� �������� �� �������� - "�� ������ ������� ���� �����"'
  ,['OT','���' ,  3, 1   ],'���������� ���� �� �������, ������� �� ������'
  ,['NT','���' , 11, 9,10],'-'
  ,['OT','��'  ,  2, 7   ],'������� � ��� ����, ������ �� ����������� �� �� ������, � �� ��. �����, �� ��� ����'
  ,['OT','��'  ,  9, 1, 2],'������� ������ ������������� � �������'
  ,['OT','����', 18,15   ],'������� - ��������� ������'
  ,['OT','����', 34,10   ],'-'
  ,['NT','����',  3,22   ],'-'
  ,['OT','��'  , 61, 1, 2],'������ �� ������ �� ���������� �� �����, �������������� �������� ������'
  ,['NT','����',  4,21,22],'-'
  ,['OT','��'  , 53, 3   ],'����� �� ������ ��� '
  ,['NT','����',  1,11   ],'-'
  ,['OT','���' ,  9, 9   ],'� ������������� ����� ������� � ���������'
  ,['OT','��'  , 40,10   ],'� �������������'
  ,['OT','���' , 11,12   ],'� ������� �� 30 �����������'
  ,['OT','��'  , 34,11   ],'����������� � ���, ��� �� ������ ����� ��������������������; '
  ,['OT','��'  , 53, 7   ],'� ��������� ����� ������������'
  ,['OT','��'  , 50, 6   ],'� ��������� � ��������� �������'
  ,['OT','��'  , 34,19,20],'� ���������� ���������� �� �������'
  ,['NT','����', 15,24,25],'-'
  ,['OT','��'  , 53, 5   ],'��������� ��� �� ����� ���� � ����� �� ���������� ����'
  ,['NT','1���',  2,23,24],'-'
  ,['OT','��'  , 53,12   ],'� ��������� � �������'
  ,['NT','����', 15,27,28],'-'
  ,['OT','���' , 12,10   ],'� ���������'
  ,['NT','����', 19,37   ],'-'
  ,['OT','��'  , 21, 8,9 ],'� ���, ��� ��� �������� �������� � ��������'
  ,['NT','���' , 27,39,40],'-'
  ,['OT','��'  , 68,22   ],'�� ������, ������� �������� �������'
  ,['NT','���' , 27,34   ],'-'
  ,['OT','��'  ,108, 4,5 ],'��� ������� ������� �� ������'
  ,['NT','����', 23,34   ],'-'
  ,['OT','��'  , 21,18,19],'� ������, ������� ������� �� ������ ������ ������'
  ,['OT','��'  , 33,21   ],'��� ����� ������ ����� �� ���� ���������. � �������������� ����� ����� �� ���� ���������, ��� ��� �� ������� ��������� � ��������, � ��� ������� �� ��������� ������� ���������. ��� ����������� � � ������������ ������, ������� ���� �� ���� ����� ����.'
  ,['NT','����', 19,36   ],'-'
  ,['OT','��'  , 53, 9   ],'� ���������� � ��������'
  ,['NT','���' , 27,57   ],'-'
  ,['OT','��'  , 15,10   ],'� �����������'
  ,['NT','����',  2,25   ],'-'
  ,['NT','����', 13,35   ],'-'
  ,['OT','��'  , 67,19   ],'� ����������'
  ,['NT','��'  ,  4, 7,10],'-'
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
      //    +par('title',bcvstd/**-/+'\n^_ ������ ��� ���������� ������'/**/)
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
      +'<td><a href="javascript:ShowHide(\'biblist_\');">��������� ������('+(biblist.length)+')</a>'
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
    +'<b>Bible-BG ��������� �������� ������:</b>'
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
  // row_('',[[va,biblink('NT.���.05.03-12') +biblink('NT.����.06.20-23')]])   
     row_('',[[va,'???']])
  ])
  +'</FONT>'
  return html
}//-----------------
function pg_holydays(){   //~ 'NT-holydays'    // !
var va=' valign="top"'
var html='<FONT face="Tahoma" size="4">'
  +htm_(['table','',row_('',[[va,''
+'<span id="bk"><center>� ����������� ��������</center></span><br>'
+'<br>'
+'�� ��������� ���������� ��:<br>'
+'- <font color="red"    >�����(������� �� ����������)</font><br>'
+'- <font color="#66CCFF">12 ������ (8 ��������� � 4 �����������)</font><br> '
+'- <font color="lime"   >���������</font><br>'
+'<br>'
+'�� �������� ��: <u>�������� (���������� � �����)</u> � ����������<br>'
+'�� ������ ��������� ����� � 325 �. ������� ���� ������ ������������� ����� �� �� �������� '
+'� ������� ������� ��� ���� ����������� ����������, ������ � ���������� �����, '
+'�� �� �� �������� ������ � ���. ���� ��������� � � ���� �� 35-�� ��� �� ��������� '
+'<u>( 4-�����  8-���)</u> �� ��� ���� <br>'
+'<br>'
+'�� ���� �� �������� �� ���������� ������ - 1.��� '+biblink('NT.����.4.16-19')+'<br>'
+'_1) <font color="#66CCFF">08.��� - ��������� �� �������� ���� �����   </font><br>'
+'_2) <font color="#66CCFF">14.��� - ��������� �� ������� ����� ��������</font><br>'
+'_3) <font color="#66CCFF">21.��� - ��������� �����������              </font><br>'
+'_4) <font color="#66CCFF">25.��� - ��������� �������� � ������������ �� ��������� </font><br>'
+'_5) <font color="#66CCFF">06.��� - ����������� (�����������)          </font><br>'
+'_6) <font color="#66CCFF">02.��� - ��������� � �������� ��������      </font><br>'
+'_7) <font color="#66CCFF">__.___ - <u>���� �������� � �������� (��������, ��������) �������� ����� �����</u></font><br>'
+'_8) <font color="#66CCFF">25.��� - ������������ �����������           </font><br>'
+'__) <font color="lime"   >__.___ - <u>�������� ��������</u>           </font><br>'
+'_�_ <font color="red"    >__.___ - <u>����� - ����������� ��������<u> </font><br>'
+'__) <font color="lime"   >__.___ - ������� �� ���� ����� � ���������  </font><br>'
+'__) <font color="lime"   >__.___ - �������� ��������                  </font><br>'
+'__) <font color="lime"   >__.___ - �������� ������� �� ���� ��������  </font><br>'
+'_9) <font color="#66CCFF">__.___ - <u>���������� �������� �� 40-�� ��� ���� ����� </u></font><br>'
+'10) <font color="#66CCFF">__.___ - <u>������������ - ��������� �� ��. ��� ��� ���������� �� 50-�� ��� ���� �����</u></font><br>'
+'11) <font color="#66CCFF">06.��� - ������������ ��������              </font><br>'
+'12) <font color="#66CCFF">15.��� - ������� � ������ �� �������� ����������  </font><br>'
+'<br>'
+'��. ���,<br> '
+'�������� �� ����� � ����� ���������,<br> '
+'����������,<br> '
+'������ �����������,<br> '
+'��������,<br> '
+'������ ���������, ����� � ������.<br>'
// BulgarianHolidays.ics 
// http://www.mozilla.org/projects/calendar/caldata/BulgarianHolidays.ics
/* ���� 2000 ������:
<br><b>������: </b><br>
1 - �����������; 
6 - ����������� (�����������); 
7 - ���������; <br>
<b>��������:</b><br>
2 - �������� ��������; 
<br><b>����: </b><br>
25 - ������������; 
<br><b>�����: </b><br>
30 �����, 1 � 2 ��� - ����������� ��������;  <br>
<br><b>���: </b><br>
6 - ����������; 
11 - ��. ��. ����� � �������; 
<br><b>���: </b><br>
8 - ���������� �������� (���������); 
18 - ������������; 
19 - ��. ���; 
29 - ��. �������� ����� � ����� (���������);  
<br><b>���: </b><br>
20 - ��. ������ ����; 
<br><b>������: </b><br>
6 - ������������ ��������; 
15 - ������� �� �������� ����������; 
<br><b>���������: </b><br>
8 - ��������� �� �������� ����������;  
14 - ����������; 
<br><b>��������: </b><br>
19 - ���������� ���� ������;  
26 - �����������; 
<br><b>�������: </b><br>
8 - �������������;  
21 - ��������� �����������; 
<br><b>��������: </b><br>
6 - ��������; 
25 - ��������� ��������; 
26 - ����� �� �������� ����������; 
27 - ��. ������������ � ��������� ������ (�����������)
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
      +'<span id="bk" ><font size="5"><b>������ �� ���������</b></font>&nbsp;</span>'
+'<br>'
+'<span id="hid"><font size="2">'+_ver()+'</font></span>' // _ver(st,bg,fg)
+'<br>'
+'<span id="bej" >'
+'<b>"�������� ������� � �������������� � ������� �� �����, ������������,' 
+' ��������� � ���������� � ��������, �� �� ���� ������ ����� '
+' �������� � ����� �� ����� ����� ����."</b>'
+'<br>'+biblink('NT.2���.3.16-17') 
+'</span>'
+'<br> ������� �� ���� ������ � �� ������� � ��������� �� '
+' ������ ����� �� ����������� ����������� ������ (����� 1992).'
+'<br>'
+'<br><b>�������� � ������� � �������������� �����. '
+'<br> �� � ������������� �� ��� ������ ��� ������� ������.'
+'<br> �������� � �� �������������� ������� � ������������� ��������, '
+'� ��� ������������ � ���� ����������� �� ������� ����.'
+'<br></b> '
+'<br> �� ����������� ������ � ����� ����� �� ����������.'
+'<br> �� ������ ����� �� � ������� ��������� �����������.'
+' ��� ���������, ����������� � ��������� �����. '
+'</span>'
/* */
+'<hr><span id="bej"><h2><b>����� �������� Bible-BG</b></h2></span>'
+'<span id="bej">'
+'<br> 1.������ �� ����������� ������ �� ���������. ����� �� ������� ������� ��� �� ����, ���� �������*</span>'
+'<br> * ��������� ������ � �������� ��������'

+'<br><span id="bej">'
+'<br> 2.������������ ����� �� �������� (windows-1251) '
+'���� �� �� ���� ���� ��������� ����� ����� ����� ����� ������.</span> '
+'<br> ������� � ��� �������������� �����: '
+lnk('NT.js','../Bible-bg.text/text/NT.js')+'=  945Kib '
+lnk('OT.js','../Bible-bg.text/text/OT.js')+'=3 836Kib '
+'<br> �� ������ � ����������� ��� - ��� ��-������:'

+'<br><span id="bej">'
+'<br> 3.������� �� ���������� ����� �� ����� � ��������� �� �������������: </span>'
+'���������� ��������� � ������, ������ � ������ �� ������'
+'<br>������ ^ ����� v �������� < �������� > ������� '
+'<br><li>����� �� �����,�����,���� '
+'<br><li>(=) ������� �� ��������� ����� � ����� � ��������� �� �������� ����'
+'<br><li>(-) (+) ������� �� ��������/�������� ����� '
+'<br><li>(���) (����) ������-���� �� ������ ����� � ����� ������ � ������ ������'
+'<br><li>(w) ������ �� ������ � ����� ��� ���������� '

+'<br><li>���������� �� 77 �����, 1 361 �����, 37 018 �����, ���� ���������� ���������: �����.�����.���� -> '
+biblink('NT.����.22.19')
+'<br> � ��������� ��� �� �������� �� ����� ������ '
+'[����.22.19] ���� +[27.22.19]. ��� - � ���� �����, + � ���, � ������� � � �������� �� �����.'
+'<br><li>������ �� ������ �������� (bookmarks) ��� �����,���� � Bible-bg � �� �� ��������� ����� ��������� �� �����(���� ������, ��� �����������).'
+'<br><li>������ �� ��������� ������ � ������� � ������� � ���� �� ������ � \'��������� ������\', �� ���� �� �� ������ ����� �������.'
+'<br>'
+'<span id="bej">'
+'<br> 4.�������:</span> �������� ������ ������� � ����� � �� ������� ������, ���� ��� � �������� � ����'
+'<br><li>����� �� ��������: ����� � �����'

//+'<br><li>����� �� ������� ����� �� ������� � ��������/����� ���������� � �������� �����/��'
//+'<br><li>����� �� ����� ����� � ����� ������ ������'
//+'<br><li>����� �� ��������� �����'
//+'��������� �� ��������� � �������� �������� � ������'

+'<br>'
+'<span id="bej">'
+'<br> 5.����������� �� ���������� ����� � ����������� ��� �����������:</span>'
+'<br><li>��������� ���������� ����������� ������� � ������: '
+'<br>   ��� �� ����� #...#, ����� ����� |...|, ����� "..." � \'...\', '
+'<br>   ������� �� ������ (���){�����},�������� * � (...), ��� ��� = '
+'<br>   �������: � ������ [�] ->  � ���� �� ������ [�:����.22.19,...]'
+'<br><li>������ ������ � "..." �� ���� ���������� � ���������, �� �������� ������� '
+'� ���� �� ���� � �������� �� ���������, �� �� ��� ����� ���� ������������� �����������'
+'<br><li>����������� ��� �������: '
+'������������ �� �����������, ���������� � ���������� ������ �� '
+'bible-bg.css � ���������� ������ �� �����������<br>'
+'<span id="bej">'
+'<br>6.����� ����� �� �������� � ��������� � ������������� ������:</span> '
+'<br><li>������� ���� ��������'
+'<li>�������� �� ������ '
+'<li>������������ '
+'<li>�������'
+'<br>'
+'<span id="bej">'
+'<br>7.�� ���������� � ���������, ����� ��������:</span> '
+'<br><li>������ �������� '
+'<li>���������� �� ��������� '
+'<li>�������� � ���������� � �������� '
+'<br>'
+'<span id="bej">'
+'<br>8.�� �������</span> '
+'<br><li>!'
+'<li>����� ����� '
+'<br>'
+'<span id="bej">'
+'<br>9.���� - �������� ������ ������ �� ������ ����</span>'
+'<br><li>���� ������� ���� ���� \'����������� �� �������\' '
+'<br><li>������ �� ���� �� ��������'
+'<br>'
+'<span id="bej">'
+'<br>10.������ � �������� � ������� ������(links)</span> '
+'<br><li>�������� ������ '
+'<br>'
+'<span id="bej">'
+'<br>11.�������� �� ���������/��������/�������</span>'
+'<br><li>������� '
+lnk('colors.js','scr/colors.js')+' � '+lnk('Bible-BG.css','scr/Bible-BG.css')
+'<br><li>����� ����   '
+lnk('web-clr.htm','scr/web-clr.htm')
+'<br>'
+'<span id="bej">'
+'<br>12.��������(download) � �����������(zip) ��� �� ������, ��� �� ����� �� ������� ��������:</span> '
+'<br> + ����� Bible-bg (��� ������� �� ������ � ������): '
+lnk('Bible-bg.09.zip','../~down/Bible-bg.zip')+'=13 314Kib -> ?Kib '
+'<br> - ������ �� �������� 2 ����� � .js ������ (javasript �����) '
+'<br> - '+lnk('Bible.js2.zip','../~down/Bible.js2.zip')+'=1 523Kib -> ?Kib ���� ���������������'
+'<br> - ������ �� �������� 27+50 ����� � .js ������ - �������� �� ����� '
+'<br> - '+lnk('Bible.js77.zip','../~down/Bible.js77.zip')+'=?Kib -> ?Kib'
+'<br> - ������� �� ������ �� Bible-bg: '
+'<br> - '+lnk('icons.zip','../~down/icons.zip')+'=2 679Kib -> ?Kib '
+'<br> - ����� Bible-bg - ��� ������� �� ������ � ������: '
+'<br> - '+lnk('Bible-bg.09.zip','../~down/Bible-bg.zip')+'=?Kib -> ?Kib '
+'<br> * 1 �������� - 1Kib=1024b, �� ������� �� 1Kb=1000b'
+'<br> * ������ �� �������� � � 2 �������� �� �����, 2 ������ ����� ��� 77(�� �����)'
+'<br> --- ��� �������� �� �����, ��������������� � �������� ��������� ����� '
+' (dirs, folds) � ��������� �� ������ Bible-bg/:'
+'<br> --- Bible-bg/ - ������ ����� �� *.htm ���������, � ������ ���� index.htm'
+'<br> --- Bible-bg/scr/ - ��������� *.js � ������� *.css  �� �����'
+'<br> --- Bible-bg/Bible/ - ������ �� �������� NT*.js, OT*.js'
+'<br> --- Bible-bg/icons/ - ������� �� ������ *.jpg'
/** **/
/** **-/
+'<hr><pre><span id="bej">�����������/��������:</span>'
+' ��������'
+' �� �������'
+' ���������� �� ����������� ������� '
+' ����: ����������� �� ������� - ���� ���������'
+' ������� �� ��������� - ����, ����� ��� ����'
+' ������� �� ����� � ����� �����'
+' �����������:'
+'	�������: [a:bcv,...] � �� ������� � title ������������ �� '
+'	������: ��� {�����} �� ����� (���){�����} � �������� �� ������ �� ?'

+' ��������, ������ ��� �������� �� ��� �:'
+' 	����� �� ������/�����/������'
+' 	������� �� ���������� '
+' 	�����������/�������� �� ����� '
+' 	� ���������� �� ��������� ��������'
+' 	������ �������� ���/�� ������'

+' �������, ������ � ���� ��� �� ����� �������? '
+'    ����/���:     -> (Shift/Alt)+'
+'	��: (^ v < >) -> (home end pgup pgdn) Shift+home/Alt+home,... '
+'	��: (^ v < >) -> (up down left right)'
+'	��: (^ v)     -> (ins del) ?'
+'	������ �� �������: (-) (+) (=)/(s)how '
+'	������:(d)ocs (o)ld-index (n)ew-index (h)olydays (i)cons (w)ords (f)ind (b)iblist (a)dd-to-biblist/del? (t)hemes (c)alendar'
/* *-/
+' ������������ ��������� � �������� � ������� �� ������� � �������'
+'    ���������� ��������� ��� ����� �� ������� � ������ �����:'
+'    [��##] �=K|N|A: ���������,�����������,��������� - �����������'
+'    --------- �=T|N|K: �����(Thora=5), �������(Neviim=8), �������(Kethobim=11) - ��������'
+'    --------- ##|--: �������� ��������� ����� 1..24, -- ���.�������
+'    (12) - ������������ ����� �������, ��. - �����, ��. - ������

//+'���� ����� �� Bible-BG'
+' ������ �� ���������� '
   
+' �����������/���������� �� ������ ��� ����� �������� �+/-'
+' ������������ ������������ �� �������� � ����(fnd<-txt/?) � ������� �� ������!?'
+'</pre>'
/* */

+'<hr> <span id="bej">�������� ��������� �� ��������: </span> -'+bible_bg_web 
+'<br> <span id="bej">�����������, �������� � ��.:    </span> +'+bible_bg_mail

+'<br> ����������� ����� � ���� �� ����� �� ���������:'
+lnk('bsbible.zip',"http://123.dir.bg/bsbible.zip")
+'<br> ����� ��� ����� �����: '
+lnk('������ � ����������� ������ � �������',"../scr/links.htm")

+'<hr> <span id="hi">'
+'     �������� ��� �� ��������� ������ ��� ������ �� ��������, '
+'<br> ����� ��� ������������ ������ � ����������.  '
+'<br> "���������������� � ���������� �� ��������� �������: '
+'<br> \'����� � ��� ���������\' � �������� � ��������� �� �� �� ����� '
+'<br> ����,������ ��� ����������� �� ���� '
+'<br> , ��� ���� ���� ��������, ���� �������� �� ��������� � ���� ���"'
+'<br> �� ������������� ���� ������� �� ������� ����, ���� �������� ��� �� ���� �����!'
+'<br> ������ ����, ������� �� ��� �� ������ � ��������� ��� ������,'
+'<br> �� ����� �������� ��-�����. '
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