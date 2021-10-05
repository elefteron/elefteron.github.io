_load._new('scr/web-colors.js')
var lclr=-1; color=[]//new Array();
function adclr(n,c){// NAME, RGB_Value
  lclr++; color[lclr]=[]//new Array(2);  
  color[lclr].name=n; color[lclr].clr=c; 
}//--------------------------
function initcolors(){
adclr("BLACK"               ,"000000");
// grays, greys
adclr("DARKGRAY"            ,"A9A9A9"); adclr("DIMGRAY"             ,"696969");
adclr("GRAY"                ,"808080"); adclr("LIGHTSLATEGRAY"      ,"778899");
adclr("SLATEGRAY"           ,"708090"); adclr("SILVER"              ,"C0C0C0");
adclr("LIGHTGREY"           ,"D3D3D3"); adclr("DARKSLATEGREY"       ,"2F4F4F")
// blues
adclr("ALICEBLUE"           ,"F0F8FF"); adclr("BLUE"                ,"0000FF")
adclr("BLUEVIOLET"          ,"8A2BE2"); adclr("CADETBLUE"           ,"5F9EA0")
adclr("DARKBLUE"            ,"00008B"); adclr("DARKSLATEBLUE"       ,"483D8B");
adclr("DEEPSKYBLUE"         ,"00BFFF"); adclr("DODGERBLUE"          ,"1E90FF") 
adclr("LIGHTBLUE"           ,"ADD8E6"); adclr("LIGHTSKYBLUE"        ,"87CEFA");
adclr("LIGHTSTEELBLUE"      ,"B0C4DE"); adclr("MEDIUMBLUE"          ,"0000CD");
adclr("MEDIUMSLATEBLUE"     ,"7B68EE"); adclr("MIDNIGHTBLUE"        ,"191970");
adclr("POWDERBLUE"          ,"B0E0E6"); adclr("ROYALBLUE"           ,"4169E1")
adclr("SKYBLUE"             ,"87CEEB"); adclr("SLATEBLUE"           ,"6A5ACD");
adclr("STEELBLUE"           ,"4682B4"); adclr("CORNFLOWER"          ,"6495ED")
adclr("AQUA"                ,"00FFFF"); adclr("CYAN"                ,"00FFFF");
adclr("NAVY"                ,"000080"); adclr("DARKCYAN"            ,"008B8B")
adclr("LIGHTCYAN"           ,"E0FFFF"); adclr("INDIGO"              ,"4B0082");
// greens                               
adclr("AQUAMARINE"          ,"7FFFD4"); adclr("DARKGREEN"           ,"006400") 
adclr("DARKOLIVEGREEN"      ,"556B2F"); adclr("DARKSEAGREEN"        ,"8FBC8B")
adclr("FORESTGREEN"         ,"228B22"); adclr("GREEN"               ,"008000")
adclr("GREENYELLOW"         ,"ADFF2F"); adclr("LAWNGREEN"           ,"7CFC00")
adclr("LIGHTGREEN"          ,"90EE90"); adclr("LIGHTSEAGREEN"       ,"20B2AA")
adclr("LIMEGREEN"           ,"32CD32"); adclr("LIME"                ,"00FF00");
adclr("MEDIUMSEAGREEN"      ,"3CB371"); adclr("MEDIUMSPRINGGREEN"   ,"00FA9A")
adclr("PALEGREEN"           ,"98FB98"); adclr("SEAGREEN"            ,"2E8B57")
adclr("YELLOWGREEN"         ,"9ACD32"); adclr("SPRINGGREEN"         ,"00FF7F")
adclr("CHARTREUSE"          ,"7FFF00"); adclr("DARKTURQUOISE"       ,"00CED1");
adclr("AZURE"               ,"F0FFFF"); adclr("MEDIUMTURQUOISE"     ,"48D1CC");
adclr("PALETURQUOISE"       ,"AFEEEE"); adclr("TURQUOISE"           ,"40E0D0")
adclr("TEAL"                ,"008080"); adclr("OLIVE"               ,"808000")
adclr("OLIVEDRAB"           ,"6B8E23"); adclr("MEDIUMAQUAMARINE"    ,"66CDAA")
adclr("DARKKHAKI"           ,"BDB76B"); adclr("KHAKI"               ,"F0E68C"); 
// yellow-red
adclr("YELLOW"              ,"FFFF00"); adclr("LIGHTGOLDENRODYELLOW","FAFAD2"); 
adclr("LIGHTYELLOW"         ,"FFFFE0"); adclr("DARKORANGE"          ,"FF8C00")
adclr("ORANGERED"           ,"FF4500"); adclr("ORANGE"              ,"FFA500")
adclr("DARKRED"             ,"8B0000"); adclr("INDIANRED"           ,"CD5C5C")
adclr("MEDIUMVIOLETRED"     ,"C71585"); adclr("RED"                 ,"FF0000");  
adclr("PALEVIOLETRED"       ,"DB7093"); adclr("MAROON"              ,"800000");
adclr("CRIMSON"             ,"DC143C"); adclr("TOMATO"              ,"FF6347"); 
adclr("DARKGOLDENROD"       ,"B8860B"); adclr("GOLD"                ,"FFD700"); 
adclr("GOLDENROD"           ,"DAA520"); adclr("PALEGOLDENROD"       ,"EEE8AA");
adclr("BROWN"               ,"A52A2A"); adclr("FIREBRICK"           ,"B22222");
adclr("BURLYWOOD"           ,"DEB887"); adclr("TAN"                 ,"D2B48C")
adclr("PERU"                ,"CD853F"); adclr("ROSYBROWN"           ,"BC8F8F"); 
adclr("SADDLEBROWN"         ,"8B4513"); adclr("SANDYBROWN"          ,"F4A460"); 
adclr("DEEPPINK"            ,"FF1493"); adclr("LIGHTPINK"           ,"FFB6C1") 
adclr("SIENNA"              ,"A0522D"); adclr("CHOCOLATE"           ,"D2691E")
adclr("CORAL"               ,"FF7F50"); adclr("LIGHTCORAL"          ,"F08080");
adclr("DARKSALMON"          ,"E9967A"); adclr("LIGHTSALMON"         ,"FFA07A");
adclr("SALMON"              ,"FA8072")
// magentas 
adclr("DARKMAGENTA"         ,"8B008B"); adclr("MAGENTA"             ,"FF00FF")
adclr("DARKVIOLET"          ,"9400D3"); adclr("VIOLET"              ,"EE82EE");
adclr("HOTPINK"             ,"FF69B4"); adclr("PINK"                ,"FFC0CB")
adclr("FUCHIA"              ,"FF00FF"); adclr("ORCHID"              ,"DA70D6")
adclr("PURPLE"              ,"800080"); adclr("MEDIUMPURPLE"        ,"9370DB");
adclr("DARKORCHID"          ,"9932CC"); adclr("MEDIUMORCHID"        ,"BA55D3") 
adclr("PLUM"                ,"DDA0DD"); adclr("THISTLE"             ,"D8BFD8")
// whites&lites                                                                    
adclr("ANTIQUEWHITE"        ,"FAEBD7"); adclr("FLORALWHITE"         ,"FFFAF0")
adclr("GHOSTWHITE"          ,"F8F8FF"); adclr("NAVAJOWHITE"         ,"FFDEAD");
adclr("WHITE"               ,"FFFFFF"); adclr("WHITESMOKE"          ,"F5F5F5")
adclr("SNOW"                ,"FFFAFA");
//                                      
adclr("BEIGE"               ,"F5F5DC"); adclr("BISQUE"              ,"FFE4C4"); 
adclr("BLANCHEDALMOND"      ,"FFEBCD"); adclr("CORNSILK"            ,"FFF8DC"); 
adclr("GAINSBORO"           ,"DCDCDC"); adclr("HONEYDEW"            ,"F0FFF0"); 
adclr("IVORY"               ,"FFFFF0"); adclr("LAVENDER"            ,"E6E6FA");
adclr("LAVENDERBLUSH"       ,"FFF0F5"); adclr("LEMONCHIFFON"        ,"FFFACD");  
adclr("LINEN"               ,"FAF0E6"); adclr("MINTCREAM"           ,"F5FFFA");
adclr("MISTYROSE"           ,"FFE4E1"); adclr("MOCCASIN"            ,"FFE4B5");
adclr("OLDLACE"             ,"FDF5E6"); adclr("PAPAYAWHIP"          ,"FFEFD5"); 
adclr("PEACHPUFF"           ,"FFDAB9"); adclr("SEASHELL"            ,"FFF5EE"); 
adclr("WHEAT"               ,"F5DEB3"); 
}//--------------------------
  hx1=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
  hx2=new Array(255)
  function gen_hx2(i,j){ r=hx1[i]+hx1[j];   return r}// i,j=0..15 
// outw(log,'i='+i+',j='+j+' hx2='+hx1[i]+hx1[j]+'\n')
  function sethx2(){
    k=-1; for (i=0; i<=15; i++) for (j=0; j<=15; j++) {k++; hx2[k]=gen_hx2(i,j)}
  }// ---
  sethx2(); 
  function hexclr(r,g,b){
    return hx2[r]+hx2[g]+hx2[b]
  }// ---
// -------------------------
function showallcolors(){ bg='708090'; t='&nbsp'
  s='<font color="black"><table bgcolor="#'+bg+'">'+'\n' // '<xmp>'+
  r=100; g=100; kbg='000000'; step=15 // step=63,31,15
  for (r=0; r<=255; r++)     {  s+='<tr>'+'\n'; // outw(log,' r='+r+'\n')
    for (g=0; g<=255; g++)   {  s+='<tr>'+'\n'; // outw(log,' g='+g+'\n')
      for (b=0; b<=255; b++) {//s+='<td>';      // outw(log,' b='+b)
        h=hexclr(r,g,b     ); s+=cellclr2('#'+h,h); 
        h=hexclr(r,g,b+step); s+=cellclr2('#'+h,h); 
      //s+='</td>'+'\n'
        b=b+step;
      }s+='</tr>'+'\n'
      g=g+step
    }s+='</tr>'+'\n'
    r=r+step
  }s+='</table></font>'+'\n' // +'</xmp>'
  return (s)
}//-------------------------- 
function cellclr2(bg,s){ return '<td bgcolor="'+bg+'">'+s+'</td>'}
function cellclr(bg,fg,sz,s,chg){ 
  sbg=''; if (bg!='') sbg=' bgcolor="'+bg+'"'
  sfg=''; if (fg!='') sfg=' color="'  +fg+'"'
                      ssz=' size="'   +sz+'"'
  r= '<td'+sbg
  if(chg) r+=' onclick="document.bgColor=\''+bg+'\'"'+' title="'+bg+'"'
  r+='>'+'<font'+sfg+ssz+'">'+s+'</font></td>'
  return r
}// ------------------------
function showcolors(){ var bg='708090', fg='000000', fg2='ffffff',h='',s,n;
  s='<table'+'>' // +' bgcolor="#'+bg+'"'
  for (var i=0; i<=lclr; i++){s+='<tr>'
    h=color[i].clr; n=color[i].name; s+=cellclr('','#'+fg2,2,n,false)+cellclr('#'+h,'#'+fg,2,h,true)
    i++; if(i<=lclr){h=color[i].clr; n=color[i].name; s+=cellclr('','#'+fg2,2,n,false)+cellclr('#'+h,'#'+fg,2,h,true)}
    i++; if(i<=lclr){h=color[i].clr; n=color[i].name; s+=cellclr('','#'+fg2,2,n,false)+cellclr('#'+h,'#'+fg,2,h,true)}
  //i++; if(i<=lclr){h=color[i].clr; n=color[i].name; s+=cellclr('','#'+fg2,2,n,false)+cellclr('#'+h,'#'+fg,2,h,true)}
    s+='</tr>' +'\n'
  }
  return(s+'</table>') // </xmp>
}//-------------------------- initcolors(); showcolors()
initcolors(); //showcolors(); showallcolors()
_load._end()