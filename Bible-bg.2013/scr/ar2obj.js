_load._new('scr/ar2obj.js')
function ar2obj(zNm_){
  var zNm=zNm_, bMin=1, bMax, N=(zNm==Zavet.nt.name), err; 
  var ts='Bible-BG ar2obj(): '+zNm//+' bkFrom:'+bMin+'   bkTo:'+bMax
  if(N) {maxbooks=27;}// bMinName=nh[bMin][0];bMaxName=nh[bMax][0];} 
  else  {maxbooks=50;}// bMinName=oh[bMin][0];bMaxName=oh[bMax][0];}
  bMax=maxbooks
  do{err='' // cancel -> null
    var n1=window.prompt(ts+' bkFrom:',bMin); 
    if(n1==null) return ''; else bMin=n1;
    var n2=window.prompt(ts+'   bkTo:',bMax); 
    if(n2==null) return ''; else bMax=n2;
    if(bMin<0 || bMax>maxbooks || bMax<bMin) err=' невалидни стойности! '
    ts='Bible-BG ar2obj за '+zNm+' кн.'+bMin+'-'+bMax+err;
  } while (err!='')
  if(!window.confirm(ts+' : Start/Cancel')) return ''
  ts='// '+ts+eol;  out(not_,ts+eol);
  
  var buto='',bufr='',pauseCnt=0, bkextra='';
/* --- */  f1=getdate();dt1=dt;
  for (var bNo=bMin; bNo<=bMax; bNo++){
    pauseCnt++
    if(pauseCnt==21){ pauseCnt=1
      var n1=window.prompt(' bk:',bNo); if(n1==null) break;
    }  
    var min_cNo=1, max_cNo;
    if(N) max_cNo=nh[bNo][2]; else max_cNo=oh[bNo][2];
    var bNo_=bNo; if(bNo_<10) bNo_='0'+bNo_
//  out(log_,br+'b:'+bNo+' c:'+min_cNo+'-'+max_cNo+': ');
    buto+="_load_new('../Bible.text/bible."+zNm+'-'+bNo_+".bg.js')"+br
    if(N) bufr=nt[bNo][0]; else bufr=ot[bNo][0]
    var adr="bible["+zNm+"_]["+bNo+"]"
    var i=bkextra.IndexOf('#')
    var j=bkextra.lastIndexOf('#')
    var l=bkextra.length
    bufr=bufr.substring(i+1,j)+bufr.substring(j+1,l)

    buto+=adr+".bktitle='"+bufr+"'"+br
    buto+=adr+".bkname='"+zNm+"."+bNo2bNm(zNm,bNo)+"' //-- formated at " +dt1+br
    buto+=adr+".bkdescr={src:'',enc:'windows-1251',lang:'bulgarian'}"+br
    
    buto+='{'+adr+".bknotes=[[// n,c,v,'(...)#^ (...)'"+br
    buto+="  ],[ 0,0,0,''"+br
    buto+="]]}"+br
    
    for (var cNo=min_cNo; cNo<=max_cNo; cNo++){ var min_vNo=1, max_vNo;     
      if(N) max_vNo=nh[bNo][2+cNo]; else max_vNo=oh[bNo][2+cNo];
//    out(log_,' '+cNo); 
      Vcnt=0 // nt[ 1][ 1][ 0]='|ГЛАВА 1| ???????';
      if(N) bkextra=nt[bNo][cNo][0]; else bkextra=ot[bNo][cNo][0];
      var i=bkextra.lastIndexOf('|')
      var l=bkextra.length
      if(l>i) {bufr=bkextra.substring(1,i);bkextra=bkextra.substring(i+1,l) }
      buto+=adr+".bkchapters["+cNo+"]={chtitle:'"+bufr+"'"+br
      if(bkextra!='') buto+=",chtext:'"+bkextra+"'"+br
      buto+=",vs:[["+br

      for (var vNo=min_vNo; vNo<=max_vNo; vNo++){ 
        if(( N && undef(nt[bNo][cNo][vNo])) 
        || (!N && undef(ot[bNo][cNo][vNo])) ){ 
//        out(log_,' (-'+vNo+')'); continue // skip miss vNo==2/3 in some books
        } 
        Vcnt++; // find into bk.name and ch.name
        if(N) bufr=nt[bNo][cNo][vNo]; else bufr=ot[bNo][cNo][vNo];
        buto+="],["+vNo+",'"+bufr+"'"+br
      }
      buto+="]]}"+br
    }
  } 
/* --- */  f2=getdate();dt2=dt;
  ftr='// work from:'+dt1+' to:'+dt2+br//' dur:'+((f2-f1)/60).toFixed(0)+'min'+eol ?
  out(not_,ts+ftr+br);
  return '<code>'+buto+"_load_end()"+br+'</code>'
}
_load._end()