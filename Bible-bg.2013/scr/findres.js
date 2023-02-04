_load._new('scr/findres.js')
// --- globals
  a=[],f=[], lf=0;// founded links array, last found=1..// f[]=[0:id,1-2-3:b,c,v, 4:bname,5:txt]
  function findres(fndstr){  
    cm='R'// call method: Load file show.js | Run javascript:showchap()
    // b='<script>highlight(\''+fndstr+'\',bghi,fghi)<\/script>'// \'-> "..." // '..' ?
    wt="document.write('wait..');"
    out(txt_,hdr+'<hr>'+showtxt(fndstr)+'<hr>')// \u043E='о'
//  if(fndstr && fndstr!=''){// bghi='lime',fghi='black'
//    count=highlight(fndstr,bghi,fghi); // -1:text empty,0..n:count
//    if(count>0) outl('маркирани са '+count+' фрази "'+fndstr+'"\n')
//  }
// -----------------------------------------------------------------------------
    function showtxt(fndstr){ var i,j,a,lnk2 
      b='\n<table'+par('BGCOLOR',bgtab  )
        +par('width','100%') // row2wid/*550*/
        +' border="0" cellpadding="1" cellspacing="1">' 
      t1=par('BGCOLOR',bgshow);
      for (i=1; i<=lf; i++){
      //f[]=[0:id,1-2-3:b,c,v, 4:bname,5:txt]
        zNm=f[i][0];bNo_=f[i][1]/1;cNo_=f[i][2]/1;vNo_=f[i][3]/1; 
        bcv_    =             bNo_+'.'+cNo_+'.'+vNo_
      //_tbcv   ="'"+zNm+"."+bNo_+"."+cNo_+"."+vNo_ +"'"
        _tbcv   ='[\''+zNm+'\','+bNo+','+cNo+','+vNo+']'
        bcvfull =[zNm,bNo_,cNo_,vNo_]
        bcvstd  =          f[i][4]+'.'+cNo_+'.'+vNo_
        p=parent.idx; 
        if     (zNm==Zavet.nt.name){if(p)txt=p.nt[bNo_][cNo_][vNo_];else txt=f[i][5]}
        else if(zNm==Zavet.ot.name){if(p)txt=p.ot[bNo_][cNo_][vNo_];else txt=f[i][5]}
      //outl('showtxt:'+par('bcvfull',bcvfull)+par('bname',f[i][4])/**-/+par('txt',txt_)/**/+eot)
      //     bib_lnk(lnk    ,name  ,evnt,tit   ,cm_,fndstr,spanbgclr) lnk=zNm+bcv ,cmodel='L', spanbgclr='N'
        lnk2=bib_lnk(bcvfull,bcvstd,wt  ,bcvstd,cm ,fndstr,'')
        b+='<tr BGCOLOR="black" valign="top"><td'+t1+'>'
         +'<a name="'+bcvstd+'"'+' title=" <-добави към библейския списък"'
         +par('onclick',"javascript:add_biblist("+_tbcv+")")+'>'+i+'</a>:&nbsp;'+lnk2+'</a>'
       //+'<br>'
         +'&nbsp;&nbsp;'
       //+'</td><td>'
         +outFmt(txt)+'</td></tr>\n'
      }
      b+='</table>\n'
      return b
    }// ---
////out -> txt if exist
//  function opn(){
//  	if(parent.txt && parent.txt.document)parent.txt.document.open();
//  	else document.open();
//  }// ---
//  function cls(){
//  	if(parent.txt && parent.txt.document)parent.txt.document.close();
//  	else document.close();
//  }// ---
// function out(s)   { // write txt frame if exist
// 	if(parent.txt && parent.txt.document) parent.txt.document.write(s); 
// 	else document.write(s)
// }// ---
}// ---
_load._end()