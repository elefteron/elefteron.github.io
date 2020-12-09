_load._new('scr/show.js')
function showchap(zNm,bNo_,cNo_,vNo1_,vNo2_,fndstr){ var html=''// showchap('NT',3,10,27,0,'');
// out -> txt if exist
//function opn(){
//	if(parent.txt && parent.txt.document)parent.txt.document.open();
//	else document.open();
//}
//function cls(){
//	if(parent.txt && parent.txt.document)parent.txt.document.close();
//	else document.close();
//}
//function out(s)   { // write txt frame if exist
//	if(parent.txt && parent.txt.document) parent.txt.document.write(s); 
//	else document.write(s)
//}// ---
  function chkshow(zNm,bNo,cNo,vNo,vNo2){ fatal=false; var msg=''; err='';
     if(!(zNm==Zavet.nt.name || zNm==Zavet.ot.name)){err+='неправилно име на завет: zNm='+zNm+'\n';}
     maxb=50; if(zNm==Zavet.nt.name) maxb=27;  
     tttt =zNm+'.'+bNo+'.'+cNo+'.'+vNo ; tttt2=zNm+'.'+bNo+'.'+cNo+'.'+vNo2
     if(undef(bNo ) || bNo ==NaN || bNo <1 || bNo >maxb){err+=' Невалиден номер на книга:'+tttt+eol; fatal=true;}
     if(undef(cNo ) || cNo ==NaN || cNo <1 || cNo >151) {err+=' Невалиден номер на глава:'+tttt+eol; fatal=true;}
     if(undef(vNo ) || vNo ==NaN || vNo <1 || vNo >176) {err+=' Невалиден номер на стих :'+tttt+eol; fatal=true;}
     if(undef(vNo2) || vNo2==NaN || vNo2<0 || vNo2>176) {err+=' Невалиден номер на стих2:'+tttt+eol; fatal=true;}
   // ---
     msg='неуспешно зареждане на:';
     if(undef(nh)) {err+='недостъпен е nt-hdr.js\n'; if(zNm==Zavet.nt.name)fatal=true;}
     if(undef(oh)) {err+='недостъпен е OT-hdr.js\n'; if(zNm==Zavet.ot.name)fatal=true;}
	   if(undef(nt)) {err+='недостъпен е NT.js\n';     if(zNm==Zavet.nt.name)fatal=true;}
     if(undef(ot)) {err+='недостъпен е OT.js\n';     if(zNm==Zavet.ot.name)fatal=true;}
   // ---
       inContext=(parent.idx && parent.txt && parent.fnd)
       if(inContext){// loaded by bible-bg.index.htm
         if(zNm==Zavet.nt.name){tt=parent.idx.nt; th=parent.idx.nh;} 
         else                  {tt=parent.idx.ot; th=parent.idx.oh;}
       }else{// loaded by show.htm
         if(zNm==Zavet.nt.name){tt=nt; th=nh;} else {tt=ot; th=oh;}
       } 
     if(undef(tt) || tt==null || tt=='') {err+=msg+'tt за '+zNm+eol;      fatal=true;}
     if(undef(th) || th==null || th=='') {err+=msg+'th за '+zNm+eol;      fatal=true;}
     if(!fatal && (cNo >th[bNo][2])    ) {err+=' Неверен # глава:'+tttt ; fatal=true;}
     if(!fatal && (vNo >th[bNo][2+cNo])) {err+=' Неверен # стих :'+tttt ; fatal=true;}
     if(!fatal && (vNo2>th[bNo][2+cNo])) {err+=' Неверен # стих2:'+tttt2; fatal=true;}
     if(!fatal){ // 'has no properties'!?
       if(undef(tt[bNo][cNo][vNo ])) {err+=' Не е зареден:'+tttt ; fatal=true;} 
       if(undef(tt[bNo][cNo][vNo2])) {err+=' Не е зареден:'+tttt2; fatal=true;} 
     } 
     if(err!='' || fatal){out(log_,'<pre>chkshow: Грешки:'+err+'</pre>');}
    return !fatal
  }// ---------------------------------
   
   vNo2=0; if(!undef(vNo2_) && vNo2_!=null && vNo2_>0) vNo2=vNo2_;
   bNo=bNo_/1; cNo=cNo_/1; vNo1=vNo1_/1; vNo_2=vNo2_/1;
   if(!chkshow(zNm,bNo,cNo,vNo1,vNo2)) { return ''}//cls();
   
// cls(); opn(); brw=browserID()
   if(showjstest){  out(log_,'show: fnd='+par('fndstr',fndstr))
     if(parent.fnd) out(log_,' .fnd.='   +par('fndstr',parent.fnd.fndstr))
     out(log_,eot)
   } 
//if((parent.fnd && parent.fnd.fndstr!='') && (fndstr=='' || brw=='FF' )) fndstr=parent.fnd.fndstr
   if(undef(fndstr))fndstr=''
   return_bcv_to_idx(zNm,bNo_,cNo_,vNo1_,vNo2_) // when called by fnd !?
    
// format&show 1 chapter:cNo in a book:bNo 
   var j,buf3=''//  text="#FFCC00"
// bNo_=n2(bNo); cNo_=n2(cNo); if( cNo>99)cNo_=n3(cNo);
// vNo_=n2(vNo1);if(vNo1>99)vNo_=n3(vNo1); vNo2_=n2(vNo2);if(vNo2>99)vNo2_=n3(vNo2)
   bkhdr=th[bNo][0]
   buf3 =tt[bNo][0]; j=buf3.lastIndexOf('|')
     if(j>0 && cNo>1){buf3=buf3.substring(0,j)} // for 2,... chap's skip preface
   if(showjstest){ 
     out(log_,'show: '+zNm+'.'+bNo_+'.'+cNo_+'.'+vNo1_+'-'+vNo2_+par('fndstr',fndstr)+eot)
     out(log_,' th['+bNo+'][0]:'+th[bNo][0]+eol
         +' ch:1..'+th[bNo][2]+' vs:1..'+th[bNo][2+cNo]+eol
         +' buf3:'+buf3+eot)//+' all chapter:'+tt[bNo][cNo]+eol) 
   }
   if(zNm==Zavet.nt.name)bkbg=ntclr; else bkbg=otclr;
   html+='\n<table'+par('BGCOLOR',bgtab  ) +par('width','100%') //row2wid)
      +' border="0" cellpadding="1" cellspacing="1">'
      +'\n<tr'+par('BGCOLOR',bkbg   )+'><td colspan=2>'+outFmt(buf3)           +'</td></tr>'
      +'\n<tr'+par('BGCOLOR','black')+'><td colspan=2>'+outFmt(tt[bNo][cNo][0])+'</td></tr>'
   p1='<P>'; p2='</P>'; p=true
   for (var vNo=1; vNo<=th[bNo][2+cNo]; vNo++){//vNo_=n2(vNo);if(vNo>99)vNo_=n3(vNo) 
       _tbcv   ='[\''+zNm+'\','+bNo+','+cNo+','+vNo+']'
       bcvfull =zNm+'.'+bNo+'.'+cNo+'.'+vNo; 
       bcvstd  =bkhdr+' '+cNo+'.'+vNo
       t1=par('BGCOLOR',bgshow);
       t2=par('BGCOLOR',bgno);
       if      (vNo2==0){ 
             if(vNo1==vNo)              t1=par('BGCOLOR',bgsrch) 
       }else if(vNo2>0){
             if(vNo>=vNo1 && vNo<=vNo2) t1=par('BGCOLOR',bgsrch)
       }
       if(tt[bNo][cNo][vNo]!=undefined){
         html+='<tr valign="top">'
             +'<td'+t2+par('align',"right")+'>' //  BGCOLOR="black" <- no need
               +'<a'+par('name',bcvfull)
            // +par('href','Bible-BG.show.htm#'+bcvfull)
               +par('title',bcvstd+'\n^_ добави към библейския списък')
               +par('onclick',"javascript:add_biblist("+_tbcv+")") 
               +'>'+'<span id="no">'+vNo+'</span>' //  vNo <-+-> bcvstd  ?!
               +'</a>'
             +'</td>'
             +'<td'+t1+'>'+outFmt(p1+tt[bNo][cNo][vNo]+p2)+'</td></tr>\n' // zNm,bkhdr,''/*bcv*/,
             // !? vNo1=vNo; & reload page!?
         p=false; if(!p){p1=p2=''}
       }
   }
   html+='</table>\n'
   html+='<hr>'

   if(fndstr && fndstr!=''){//f_=repl_1quotes(fndstr)
     // bghi='lime',fghi='black'
     count=highlight(fndstr,bghi,fghi); // -1:text empty,0..n:count
   //if(count>0) out(txt_,'маркирани са '+count+' фрази "'+fndstr+'"\n')
   }
   
// cls();
   return html
}// ---
_load._end()