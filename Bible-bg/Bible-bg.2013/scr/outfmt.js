_load._new('scr/outfmt.js')
function outFmt(text){ // форматиране за "Bible-BG" v5  Ж 
 if (text==undefined) {return ''}
//usage: #{b# book title}# |chapter title| [b#.c#.s#] "..." '...' (remark) <voc> =newline * 
  lkey=8; keys=[lkey]; for (i=0; i<=lkey; i++) {keys[i]=['','','','','']};// new Array()
// key[i]=(openkey,closekey,openstr,closestr) 
//        0     1    --- 2 ---------------- --- 3 -------
keys[0]=['#' ,'#' ,'<span id="bk">'       ,     '</span>'] // #book name #          
keys[1]=['|' ,'|' ,'<span id="ch">'       ,     '</span>'] // |chapter no|          
keys[2]=['[' ,']' ,'<span id="no">'  +'[' ,']' +'</span>'] // [b.c.v]          
keys[3]=['"' ,'"' ,'<span id="txq2">'+'"' ,'"' +'</span>'] // "god words"   
keys[4]=['\'','\'','<span id="txq1">'+'\'','\''+'</span>'] // 'words'   
keys[5]=['(' ,')' ,'<span id="txrm">'+'(' ,')' +'</span>'] // (remark)
keys[6]=['{' ,'}' ,'<span id="txtr">'+'{' ,'}' +'</span>'] // {translation} 
keys[8]=['*' ,''  ,'<span id="txrm">'     ,     '</span>'] // *(remark)          
keys[7]=['=' ,' ' ,'<br>\n'                         ,''  ] // newline
keyOp=''; for (var i=0; i<=lkey;   i++) {keyOp+=keys[i][0]}
keyCl=''; for (var i=0; i<=lkey-2; i++) {keyCl+=keys[i][1]}
newbook=0; newchap=1; newverse=2; newline=7; star=8  
  buf=''
  if(text.substr(0,3)!='<P>') buf+='<span id="txt">' 
//if(test)buf+='formatter:'
  var k,opened,ch,s; newlineONeveryVerse=true // true | false  // table: col1=[b#.c#.s#] col2=words
  function tostopchar(k,i,skip,L){var k2 //  key[i]=(openkey,closekey,openstr,closestr)
    for (var j=i; j<=L; j++) { ch=text.charAt(j);  k2=keyCl.indexOf(ch); 
      if (k2==k){if(skip!='-')s+=ch; s+=keys[k][3]; return j}
      else s+=ch;
    }
  }// ---  
  s='';L=text.length;
  for (var i=0; i<=L-1; i++){ ch=text.charAt(i)
    k=keyOp.indexOf(ch); 
    if(k>-1){switch(k){ //  key[i]=(openkey,closekey,openstr,closestr)
      case newbook: case newchap:      // 0 #___#   1 |___|          
                     s+=keys[k][2];    i=tostopchar(k,i+1,'-',L); s+='&nbsp;'; 
                                                                  break;
      case 2: case 3: case 4: case 5: case 6:  // 3 "___"   4 '___'   5 (...) 6 Ж<...>   
                     s+=keys[k][2];    i=tostopchar(k,i+1,'-',L); break;
      case newline:  s+=keys[k][2];                               break; // 7 =  
      case star:     s+=keys[k][2]+ch+keys[k][3];                 break; // 8 *   
      default  :     s+=ch;                                       break; // copy
    }}else {s+=ch;}
    buf+=s; s=''
  }
  return buf
}// --- 
_load._end()