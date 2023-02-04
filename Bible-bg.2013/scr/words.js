_load._new('scr/words.js')
function countwords(zNm,bMin_,bMax_,win,ofmt){// win=1:ask, ofmt=js|htm
  var bMin=bMin_,bMax=bMax_
  // ofmt='htm' // links 
  //      'js'  // first word without convert to lower case
  var w=[]; w[0]=['word','cnt',['links'],'']; lw=-1;  
  var           wword=0, wcount=1, wlinks=2 , wnotess=3
  // w[i][wno],w[i][wword],w[i][wcount],w[lw][wlinks]
  var eol='<br>\n', i,j,k,l,buf,wrd,ch
  var d_=0,w_=0,a_=0,buf;
  var N=(zNm==Zavet.nt.name) ,bMinName=bMaxName='?'
  if(N) {maxbooks=27;bMinName=nh[bMin][0];bMaxName=nh[bMax][0];} 
  else  {maxbooks=50;bMinName=oh[bMin][0];bMaxName=oh[bMax][0];}
  err=''; 
  if(undef(oh[50][2])) {err+='oh за '+zNm+eol;}
  if(undef(nh[27][2])) {err+='nh за '+zNm+eol;}
  if(undef(ot[50][1])) {err+='ot за '+zNm+eol;}
  if(undef(nt[27][1])) {err+='nt за '+zNm+eol;}
  if(err!='') {out(txt_,'Грешки:'+eol+err); return ''}
// ---

// wn[0]=["*","От",290,2,"от"]                  -- old [type,word,cnt,lng,w2]
//[no,wrd,cnt,[lnk,..],"notes"]
//[1,"Матея",1,["NT.1.1.1"],""]
  function addword(wrd,bcv2,links) {var n=true, wrd_=wrd.toLowerCase(); 
    for (var i=0; i<=lw; i++) {//ch_=wrd_.charAt(0);
      if(wrd_==w[i][wword].toLowerCase()) { n=false; // w[i][wword].toLowerCase()
        w[i][wcount]++; 
        if(links) w[i][wlinks].push(zNm+'.'+bcv2)
        break;
      }
    }
    if(n){lw++; w[lw]=[] 
        w[lw][wword]=wrd; w[lw][wcount]=1; w[lw][wlinks]=[];
        if(links) w[i][wlinks].push(zNm+'.'+bcv2)
    }
  }// --- 
  function tabwords(w_,d_,a_,links){
    var n=true ,s_=0 ,lcnt=0 ,ac_=0 ,tbuf='',maxLnkInLine=100;
    var nn='ot_words'; if(N) nn='nt_words'; 
    for (var i=0; i<=lw; i++) { 
      s_+=w[i][wcount]; ac_+=w[i][wcount]*w[i][wword].length;
      tbuf+=',['+i+',\''+w[i][wword]+'\'' 
      lcnt+=w[i][wlinks].length
      tbuf+=','+w[i][wcount]
      if(links){
        tbuf+=',['
        var links=w[i][wlinks]
        for(var j=0; j<links.length; j++){
          if(j==0) tbuf+= "'"+links[j]+"'"
          else     tbuf+=",'"+links[j]+"'"
          if(j==maxLnkInLine) tbuf+=eol // br?
        }
        tbuf+='],""'
      }
      tbuf+=']'+eol
    }
    tbuf='// adw:'+lw+' aw:'+w_+' (atc:'+d_+' + awc:'+ac_+' = '+(d_+ac_)
        +'=?=ac) ac#:'+a_+' w2='+lcnt+eol
        +nn+'=['+eol 
        +'//[no,wrd,cnt,[lnk,..],"notes"]'+eol
        +tbuf+']'
    return tbuf
  }// --- 
  
  var ts='// Bible-BG words Честотен речник за '+zNm+' кн.'+bMin+'('+bMinName+')'; 
  if(bMax>bMin) ts+='-'+bMax+'('+bMaxName+')';
  leg='// * легенда : OT/NT=стар/нов завет'+eol
     +'//  aw =all words=OT:602308/NT:147185'+eol
     +'// (adw=all dict. words, adc=all dict. chars)'+eol
     +'//  awc=all words chars count ,atc=all token chars ,ac=all chars'+eol
     +'//  adc/adw=средна дължина на дума ,ac-awc-atc=? знаци'+eol
     +'//  aw/aVS=среден брой думи в стих  (aBS=all verses  =29129/7954)'+eol
     +'//  aw/aCH=среден брой думи в глава (aCH=all chapters= 1101/ 260)'+eol
     +'//  aw/aBK=среден брой думи в книга (aBK=all books   =   50/  27)'+eol

  if(win==1){/* ask */
    out(log_,'countwords:'+zNm+' '+bMin+':'+bMax+eol);// cancel -> null
  //var n0=window.prompt('NT/OT:', zNm ); if(n0==null)n0=zNm ; else zNm=n0; 
    var n1=window.prompt(' bkFrom:',bMin); if(n1!=null) bMin=n1;
    var n2=window.prompt('   bkTo:',bMax); if(n2!=null) bMax=n2;
    var lnks='n'
    var n3=window.prompt('  links:',lnks); if(n3!=null) lnks=n3;
    var links=(lnks=='y')
    out(log_,'Tst:'+zNm+' bkFrom:'+bMin+' bkTo:'+bMax+' links:'+lnks+eol);
    ts='Bible-BG words Честотен речник за '+zNm+' кн.'+bMin; if(bMax>bMin) ts+='-'+bMax;
    if(!window.confirm(ts+' : Start/Cancel')) return ''
    ts='// '+ts
  }
  ts+=eol; 
  f1=getdate();dt1=dt;
/* get from nt/ot,b,c,v: */  
  out(log_,eol+'b:'+bMin+'-'+bMax) 
  var pauseCnt=0
  for (var bNo=bMin; bNo<=bMax; bNo++){         var min_cNo=1, max_cNo;
    if(N) max_cNo=nh[bNo][2]; else max_cNo=oh[bNo][2];
    out(log_,eol+'b:'+bNo+' c:'+min_cNo+'-'+max_cNo+': ');
    if(N) buf=nt[bNo][0]; else buf=ot[bNo][0]
    pauseCnt++
    if(pauseCnt==21){ pauseCnt=1
      var n1=window.prompt(' bk:',bNo); 
      if(n1==null) break;
    }
    for (var cNo=min_cNo; cNo<=max_cNo; cNo++){ var min_vNo=1, max_vNo;     
      if(N) max_vNo=nh[bNo][2+cNo]; else max_vNo=oh[bNo][2+cNo];
      out(log_,' '+cNo); 
    
      var bkextra='' // nt[ 1][ 1][ 0]='|ГЛАВА 1| ???????';
      if(N) bkextra=nt[bNo][cNo][0]; else bkextra=ot[bNo][cNo][0];
      var i=bkextra.lastIndexOf('|')
      var l=bkextra.length
      if(l>i) {bkextra=bkextra.substring(i+1,l); buf+=bkextra}
      Vcnt=0
      
      for (var vNo=min_vNo; vNo<=max_vNo; vNo++){ 
        if(( N && undef(nt[bNo][cNo][vNo])) 
        || (!N && undef(ot[bNo][cNo][vNo])) ){ 
          out(log_,' (-'+vNo+')'); continue // skip miss vNo==2/3 in some books
        } 
        Vcnt++; if(Vcnt>1){buf=''}// find into bk.name and ch.name
        if(N) buf+=nt[bNo][cNo][vNo]; else buf+=ot[bNo][cNo][vNo];
        // ---
        var i=0; wrd=''; ln=buf.length; a_+=ln; 
        for (j=0; j<=ln-1; j++){ ch=buf.substr(j,1);
            if(intok(ch)) { d_++; 
              if(wrd!=''){ addword(wrd,bNo+'.'+cNo+'.'+vNo,links);  w_++; wrd=''}
            } else wrd+=ch
        }// ---
      }
    }
  }
/* collect OT *-/
   if(win==1) out(log_,eol+'1 ..'+lw0); 
   for (var i=0; i<=lw0; i++){ w[i]=[] 
     w[i][wtype]=w0[i][0]; w[i][wword]=w0[i][1]; w[i][wcount]=w0[i][2]; w[i][wlinks]=w0[i][4]; 
     w_+=w[i][wcount];
   }; lw=lw0;
/* */  
/* *-/  
  function aw(typ,wrd,cnt,w2){n=true; 
    for (var i=0; i<=lw; i++) {
      if(wrd==w[i][wword]) { n=false;
        w[i][wcount]+=cnt; // w[i][wtype]=typ; w[i][wlinks]=w2
        break;
      }
    }
    if(n){lw++; w[lw]=[] 
      w[lw][wtype]=typ; w[lw][wword]=wrd; w[lw][wcount]=cnt; w[lw][wlinks]=w2; 
    }
  }// --- 
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'2 ..'+lw1); for (var i=0; i<=lw1; i++){aw(w1[i][0],w1[i][1],w1[i][2],w1[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'3 ..'+lw2); for (var i=0; i<=lw2; i++){aw(w2[i][0],w2[i][1],w2[i][2],w2[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'4 ..'+lw3); for (var i=0; i<=lw3; i++){aw(w3[i][0],w3[i][1],w3[i][2],w3[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'5 ..'+lw4); for (var i=0; i<=lw4; i++){aw(w4[i][0],w4[i][1],w4[i][2],w4[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'6 ..'+lw5); for (var i=0; i<=lw5; i++){aw(w5[i][0],w5[i][1],w5[i][2],w5[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
   if(win==1) out(log_,eol+'7 ..'+lw6); for (var i=0; i<=lw6; i++){aw(w6[i][0],w6[i][1],w6[i][2],w6[i][4],''); w_++;}
   f2=getdate();dt2=dt; out(log_,' dur:'+((f2-f1)/60).toFixed(0)+eol)
/* */  
  f2=getdate();dt2=dt;
  ftr='// work from:'+dt1+' to:'+dt2+eol//' dur:'+((f2-f1)/60).toFixed(0)+'min'+eol ?
  var hdr=''
  if(ofmt=='htm'){
    hdr='<html><head><title>Bible-BG bookwords<\/title>\n'
       +'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n'
       +'<style>\n'
       +"*{font-family:Verdana,Tahoma,'Arial Cyr',Arial,Helvetica,'MS Sans Serif','Sans Serif',Geneva;}"
       +'a:hover{color:black;background-color:gold;}\n<\/style>\n'
       +'<script>\nfunction o(){if(parent.txt!=undefined)parent.txt.document.write(" "); else document.write(" ");};\n<\/script>\n<\/head>\n'
       +'<body BGCOLOR="black" text="#FFCC00" link="cyan" alink="red" vlink="#7B68EE">\n'
       +'<font face="Arial Cyr,Arial,Tahoma,Verdana" size=3>\n'; 
  }     
  out(not_,ftr,leg)
  return hdr+ts+tabwords(w_,d_,a_,links) // +ftr+leg
  // sort1: by cnt, then by alpha; sort2: by word length, then alpha;
//if(win==1)document.close()
//if(win==3)clsf()
}// ---
// todo: 
//0+ пълен списък на срещанията
//1+ export format: wn=[ [,,,] ,...]
//   crnt-> wn[keywrd#]=[type,keywrd,wrdcnt,wrdlng,w2] - wn[0]=["*","книга",16,5,""]
//   new!->            ,[keywrd,wrd#,wrdcnt,[link,...],notes] 

//2. sort by keywrd, idispell by keywrd -> note=!
//3. sort by note, goto bcv, use his note
// - събиране на двата речника с флаг н/с
// ? редуциране на речника по словоформи!
//   добавяне на обяснения към някои думи
//   търсене по речник ( и словоформи)
_load._end()