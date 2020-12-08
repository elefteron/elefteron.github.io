load_=[]; crnt_load=-1;
function load_new(nm){
  crnt_load++;       load_[crnt_load]=[];
                     load_[crnt_load].file =nm; load_[crnt_load].state='-'; 
  // ok              load_[crnt_load]={file:nm, state:'-'}
  // but err on load_[crnt_load].state='+'
};

function load_end(){ load_[crnt_load].state='+' };
// ---

load_new('lib/root&load.js'); 
function load_list(fmt,cols){ var buf=''; // fmt='txt'|'tab'
var tblstyle='style="border:1px solid red; border-color:gray;border-collapse:collapse;"' //?
  if(fmt=='txt') buf+='<pre>'; else {buf+='<table '+tblstyle+'><tr>'} 
  var col=cols; if (col<1) col=1; if (col>6) col=4;
  var k=0,newline;// (k==col)
  var j; 
  for (var i=0; i<=(load_.length-1); i++) { j=i+1; // not from 0
  //alert(i+' '+load_[i].file+' '+load_[i].state)
    k++; newline=false; 
    if (k>col) { newline=true; k=1; // on col=4 -> 5,9,13
      // or: (k2>Math.floor(j/col)*col)
    }; 
    var clr='red'; if(load_[i].state=='+') clr='lime'; 
    if(load_[i].state=='?') clr='orange';
    if(fmt=='txt' && j>1) {buf+='\n'
      buf+='<font color="cyan">'+j+':'+'</font>'
          +'<font color="'+clr+'">'+load_[i].state+'</font>'
                               +' '+load_[i].file ;      
    } 
    else {if (newline) buf+='</tr><tr>'
      buf+='<td align="right"><font color="cyan">'+j+'</font></td>'   
          +'<td><font color="'+clr+'">'+load_[i].state+'</font></td>'
                                +'<td>'+load_[i].file +'</td>';
    };
  }
  if(fmt=='txt') buf+='</pre>'
  else           buf+='</tr></table>';
  return buf
};
 
{// --------------------------------------- 
  function clr2(tx,fg,bg){
    //      '<font '+par('color',fg)+'>'+tx+'</font>'
    return ("<span style={background-color:"+bg+";color:"+fg+";}>"+tx+"</span>")
  }
// --------------------------------------- 
  function loaded(){ 
    return 'browser:'+brws[_brws][0]+eol+' os:'+osID()+br+eol
      +'*.js sources load status: '
      +' ('+clr2('+','lime','black')+' means ok)'
      +' ('+clr2('-','red' ,'black')+' means err on load/miss)'
      +'<span >'  
      +load_list('tbl',4) // txt or tbl
      +'</span>'
  } 
}// --------------------------------------- 
 
{// --- root
_root_='../'; // relative paths
roots=
/* *-/ {vol:'maxtor 81',       drv:'e:', dir:'/Tedy/my-dev/'}     /* */
/* *-/ {vol:'hitachi 82',      drv:'d:', dir:'/elefter/my-dev~/'} /* */
/* */  {vol:'quantum ex 6.4a', drv:'c:', dir:'/elefter/my-dev+/'} /* */ 
    drive_=roots.drv; rootloc_=roots.drv+roots.dir;
// rootlocx_ - with \\ for activex    
}// ---

load_end();
// usage: load_new('?'); ... load_end();