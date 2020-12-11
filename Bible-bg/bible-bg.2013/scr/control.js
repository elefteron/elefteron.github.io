_load._new('scr/control.js')// select menu navigation control
function Set_bcv_to_idx(zNm,bNo,cNo,vNo1,vNo2_){ 
//if(parent.idx){pid=parent.idx.document//.getElementById().value;
  vNo2=''; if(vNo2_)vNo2=vNo2_;
  //out(log_,'Set_bcv_to_idx:'+b+'.'+c+'.'+v1+'-'+v2+eot)
  document.getElementById(zNm+"b_"   ).value=bNo; 
  document.getElementById(zNm+"c_"   ).value=cNo;
  document.getElementById(zNm+"v1_"  ).value=vNo1;
  document.getElementById(zNm+"v2_"  ).value=vNo2;
  document.getElementById(zNm+"bcv_" ).value=bcv2str(zNm,bNo2bNm(zNm,bNo),cNo,vNo1,vNo2)
//}
}// ---
function return_bcv_to_idx(zNm,bNo_,cNo_,vNo1_,vNo2_){ // --- return bcv to idx if diff 
//if(parent.idx){pid=parent.idx.document//.getElementById().value;
    // Get_bcv_from_idx
    _bNo =document.getElementById(zNm+"b_" ).value; 
    _cNo =document.getElementById(zNm+"c_" ).value;
    _vNo1=document.getElementById(zNm+"v1_").value;
    _vNo2=document.getElementById(zNm+"v2_").value;
    bcvidx=bcv2str(zNm,_bNo, _cNo, _vNo1, _vNo2)
    bcvpar=bcv2str(zNm, bNo_, cNo_, vNo1_, vNo2_)
  //_bcv =document.getElementById(zNm+"bcv_" ).value; 
  //out(log_,'return_bcv_to_idx: bcv par='+bcvpar+' bcvidx='+bcvidx+eot)
    if(bcvidx!=bcvpar) Set_bcv_to_idx(zNm,bNo_,cNo_,vNo1_,vNo2_)
//}
}// ---
/* *-/
function Get_bcv_from_idx(zNm){
//pid=parent.idx.document//.getElementById().value
  out(log_,'Get_bcv_from_idx:'+zNm+'=')
  bNo =document.getElementById(zNm+"b_" ).value;
  cNo =document.getElementById(zNm+"c_" ).value;
  vNo1=document.getElementById(zNm+"v1_").value;
  vNo2=document.getElementById(zNm+"v2_").value;
  out(log_,zbcv2str(zNm,bNo,cNo,vNo1,vNo2)+eot)
  return a
}/* */
function val2bcvNo(zNm){      // 2.go val2bcvNo
  return "bNo=" +zNm+"b_.value;" +"cNo=" +zNm+"c_.value;"
        +"vNo1="+zNm+"v1_.value;"+"vNo2="+zNm+"v2_.value;"
}// ---
function bcvNo2val(zNm){      // ..nav bcvNo2val
  return zNm+"b_.value=bNo;"  +zNm+"c_.value=cNo; "
        +zNm+"v1_.value=vNo1;"+zNm+"v2_.value=vNo2;"
        +"var bNm=bNo2bNm('"+zNm+"',bNo);"
        +zNm+"bcv_.value=bcv2str(zNm,bNo,cNo,vNo1,vNo2);"
}// ---
function bcvgo(zNm,obj,op){// 2.nav bcvgo  -> bcvNo2val
// obj: {Bgo|Cgo|Vgo}(zNm,b,c,v,op)->bNo,cNo,vNo1,vNo2
  if(zNm==Zavet.nt.name || zNm==Zavet.ot.name){
    return obj+"go('"+zNm+"',bNo,cNo,vNo1,'"+op+"');" +bcvNo2val(zNm)
  }
}// ---
function Bgo(zNm,b,c,v,op){// go to book first,last,prev,next globals:<->bNo,cNo,vNo1,vNo2,bcv
  var c,i,j,l, books,err='';
  bNo=b/1; cNo=1; vNo1=1; vNo2=''; bcv='' /* bNo,cNo,vNo1,vNo2,bcv <- get/put globals!*/
  out(log_,'Bgo:old '+zNm+' bcv='+bNo+'.'+cNo+'.'+vNo1+eol)
  if     (zNm==Zavet.nt.name){books=27; chaps=nh[bNo][2]; vers=nh[bNo][2+cNo]}
  else if(zNm==Zavet.ot.name){books=50; chaps=oh[bNo][2]; vers=oh[bNo][2+cNo]}
  else  {err+=' Невалидно име на завет:'  +zNm+br; zNm='+'}
  if(bNo <1 || bNo >books || bNo ==NaN || undef(bNo))
    {err+=' Невалиден номер на книга:'+bNo  +eol;bNo =1}
  if(err!='') out(log_,err+bg)
	if      (op=='+'){ bNo++; cNo=1;vNo1=1;if(bNo>books) bNo=books;
	}else if(op=='-'){ bNo--;     cNo=1;vNo1=1;if(bNo<1)     bNo=1;
	}else if(op=='F'){ bNo=1;     cNo=1;vNo1=1;
	}else if(op=='L'){ bNo=books; cNo=1;vNo1=1;
	}else if(op=='#'){ //  get bNo
	}else {out(log_,'Bgo:bad op='+op+eol);return 0}
  bcv=zbcv2str(zNm,bNo,cNo,vNo1) 
  out(log_,'Bgo:new '+bcv+eot);
}// --- 
function Cgo(zNm,b,c,v,op){// goto chap first,last,prev,next 
  var c,i,j,l, books,chaps,err='';
  bNo=b/1; cNo=c/1; vNo1=1; vNo2='';bcv='' /* bNo,cNo,vNo1, vNo2 <- get/put globals!*/
  //out(log_,'Cgo:old '+zNm+' bcv='+bNo+'.'+cNo+'.'+vNo1+eol)
  if     (zNm==Zavet.nt.name){books=27; chaps=nh[bNo][2]; vers=nh[bNo][2+cNo];zNo=Zavet.nt.num}
  else if(zNm==Zavet.ot.name){books=50; chaps=oh[bNo][2]; vers=oh[bNo][2+cNo];zNo=Zavet.ot.num}
  else {err+=' Невалидно име на завет:'+zNm+eol; zNm=Zavet.nt.name}
  if(bNo <1 || bNo >books || bNo ==NaN || undef(bNo)){err+=' Невалиден номер на книга:'+bNo+eol;bNo =1}
  if(cNo <1 || cNo >chaps || cNo ==NaN || undef(cNo)){err+=' Невалиден номер на глава:'+cNo+eol;cNo =1}
  if(err!='') out(log_,err+br)
	if(zNm==Zavet.nt.name) {chaps=nh[bNo][2]} else if(zNm==Zavet.ot.name) {chaps=oh[bNo][2]}
	if      (op=='+'){ cNo++;    vNo1=1;if(cNo>chaps) cNo=chaps;//1;
	}else if(op=='-'){ cNo--;    vNo1=1;if(cNo<1)     cNo=1;    //chaps;
	}else if(op=='F'){ cNo=1;    vNo1=1;
	}else if(op=='L'){ cNo=chaps;vNo1=1;
	}else if(op=='#'){ //  get cNo
	}else {out(log_,'Cgo:bad op='+op+eol);return 0}
  bcv=zbcv2str(zNm,bNo,cNo,vNo1) 
  if(dbg>0) out(log_,'Cgo:new '+bcv+eot);
}// ---
function Vgo(zNm,b,c,v,op){// first,last,prev,next 
  var c,i,j,l, vers,err=''; 
  bNo=b/1; cNo=c/1; vNo1=v/1;bcv='' /* bNo,cNo,vNo1,vNo2 <- get/put globals!*/
  //out(log_,'Vgo:old '+zNm+' bcv='+bNo+'.'+cNo+'.'+vNo1+eol)
  if     (zNm==Zavet.nt.name){books=27; chaps=nh[bNo][2]; vers=nh[bNo][2+cNo]}
  else if(zNm==Zavet.ot.name){books=50; chaps=oh[bNo][2]; vers=oh[bNo][2+cNo]}
  else {err+=' Невалидно име на завет:'  +zNm+eol; zNm=Zavet.nt.num}
  if(bNo <1 || bNo >books || bNo ==NaN || undef(bNo )){err+=' Невалиден номер на книга:'+bNo  +eol;bNo =1}
  if(cNo <1 || cNo >chaps || cNo ==NaN || undef(cNo )){err+=' Невалиден номер на глава:'+cNo  +eol;cNo =1}
  if(vNo1<0 || vNo1>vers  || vNo1==NaN || undef(vNo1)){err+=' Невалиден номер на стих :'+vNo1 +eol;vNo1=1}
  if(err!='')out(log_,eot+err+eot)
	if      (op=='F'){ vNo1=1; vNo2=''
	}else if(op=='L'){ vNo1=1; vNo2=vers;
	}else if(op=='#'){ //  get vNo1
	}else    {out(log_,'Vgo:bad op='+op+eol); return 0}
  bcv=zbcv2str(zNm,bNo,cNo,vNo1) 
  if(dbg>0) out(log_,'Vgo:new '+bcv+eot); 
}// ---
function CgoL(zNm,b,c,op){ // first,last,prev,next chapter in list for read
  var c,i,j,l, books,chaps,pchaps,err='';
  bNo=b/1; cNo=c/1; vNo1=1; vNo2=''; bcv=''
  if     (zNm==Zavet.nt.name){books=27; chaps=nh[bNo][2]; vers=nh[bNo][2+cNo]}
  else if(zNm==Zavet.ot.name){books=50; chaps=oh[bNo][2]; vers=oh[bNo][2+cNo]}
  else {err+=' Невалидно име на завет:'  +zNm+eol; zNm=Zavet.nt.num}
  if(bNo <1 || bNo >books || bNo ==NaN || undef(bNo )){err+=' Невалиден номер на книга:'+bNo  +eol;bNo =1}
  if(cNo <1 || cNo >chaps || cNo ==NaN || undef(cNo )){err+=' Невалиден номер на глава:'+cNo  +eol;cNo =1}
  if(err!='')out(log_,err+br)
  if(dbg>0)  out(log_,'CgoL:old '+  zbcv2str(zNm,bNo,cNo,vNo1)+eol)
  if      (op=='+'){           cNo++;
    if(cNo>chaps)  {
      if(bNo<books){bNo++;     cNo=1;}
      else         {bNo=books; cNo=chaps;} // last
    }
  }else if(op=='-'){           cNo--;
    if(cNo<1)      {           
      if(bNo>=2)   {bNo--;     
                    if(zNm==Zavet.nt.name) {chaps=nh[bNo][2]} else {chaps=oh[bNo][2]}; 
                    cNo=chaps
                   }
      else         {bNo=1;     cNo=1;}     // first
    }
  }else if(op=='F'){bNo=1;     cNo=1;        
  }else if(op=='L'){bNo=books; cNo=chaps; //vNo2=vers;
  }else {out(log_,'bad list op(-+FL)='+op+eol); return 0}
  bcv=zbcv2str(zNm,bNo,cNo,vNo1) 
  if(dbg>0)  out(log_,'CgoL:new '+bcv+eot); 
}// ---
/* *-/
// --- HIGHLIGHT CURRENT SELECTION: <a target="..." class="n" onclick="h(this);" href="...">...</a>
var last=null;
function h(t) {
	if (typeof last =='undefined') {last = document.anchors[0];}
	last.className = 'n';
	t.className = 'nh';
	t.blur();
	last = t;
}// ---
/* *-/
function c(u) {parent.content.location = u;}
/* */
// --- BUTTONS: F < = > L
// var OTlist=[],v='01'
// for (var book=1; book<=(oh.length-1); book++) {OTlist[book]=[]
//   OTlist[book][0]=oh[book][0]
//   for (var i=1; i<=(oh[book][2]); i++){ b=n2(book); c=n2(i); bcv=b+'.'+c+'.'+v 
//     OTlist[book][i]=v
//   }
// }
_load._end()