load+="load"
eol='\r\n'; br='<br>';
if(typeof(dbg)=='undefined') dbg=0
// ---
function pp_(n,v)  {return ' '+n+'="'+v+'"'}
// -------------------------- 
// window.onerror = loaderr
function loaderr(msg,url,ln){// _iex?
 function errclr(msg){return '<font color="red">'+ msg+ '</font>'}
  var msg="JS Error="+errclr(msg)+" id="+errclr(inload)
  // + (/^javascript:/(url) ? "(bookmarklet)" : " line="+errclr(ln) 
  // +eol+br+"file="+errclr(url)+eol+br); 
  // if(alog_===undefined) out(msg); else log(msg);
  return true;// suppress default error message 
// return false;// default handler run.
}// ---

function loadcss_(file){
  if(dbg>0)log('loadcss: '+file+' ')
  out('<link  href="'+file+'" type="text/css" rel="stylesheet" />');
  if(dbg>0)log(' '+eol+br)                             
}
function loadjs_0(file){
  if(dbg>0)log('loadjs_0: '+file+' ')
  log('<script src="'+file+'"><\/script>');
if(dbg>0)log(' '+eol+br)                             
}// hdr only
function loadjs_s(file,i){
  if(dbg>0)log('loadjs_s: '+i+' '+file+' ')
// http://www.nczonline.net/blog/2009/06/23/loading-javascript-without-blocking/
  var script=document.createElement("script");
  script.type="text/javascript"; script.src=file;  //  load: mon+,fox+,opr+,chr?,saf?,net,knq
  if(!_iex){                
    script.onload = function(){
	if(typeof(_stat[i])!='undefined')_stat[i]='y';//status: mon+,fox+,opr+,saf?,chr?,net?,knq?
	//alert(i+' '+file+" loaded!"); 
  //?callback();
	}
  }else if(_iex){//trident engine:_iex=+; _kml+ in hdr,   
    script.onreadystatechange = function(){
      if (script.readyState=="loaded" || script.readyState=="complete"){
         script.onreadystatechange = null; 
         if(typeof(_stat[i])!='undefined')_stat[i]='y';
	   //alert(i+' '+file+" loaded!");
	   //?callback();
      }
    }
  }
  document.body.appendChild(script);
//document.getElementsByTagName("head")[0].appendChild(script);
  if(dbg>0)log(' '+eol+br)                             
}// ---
function loadjs_0(file){
  if(dbg>0)log('loadjs_0: '+file+' ')
  var body='<script src="'+file+'"><\/script>'
  document.write(body); 
  if(dbg>0)log(' '+eol+br)                             
}
function loadjs_1(file){
  if(dbg>0)log('loadjs_1: '+file+' ')
  var body='<html><head><script src="'+file+'"><\/script><\/head><body><\/body>'
  loadjs=window.open('','loadjs','');
  loadjs.document.write(body);
  loadjs.close();   
  if(dbg>0)log(' '+eol+br)                             
}
function loadjs_2(file,i){
  if(dbg>0)log('loadjs_2: '+i+' '+file+' ')
  var script=document.createElement("script");
  script.type="text/javascript"; script.src=file;
//script.onload = function(){alert(i+' '+file+" ");} 
  document.body.appendChild(script);
  if(dbg>0)log(' '+eol+br)                             
}
function loadjs_3(file,i){
  if(dbg>0)log('loadjs_3: '+i+' '+file+' ')
  var script=document.createElement("script");
  script.type="text/javascript"; script.src=file;
//script.onload = function(){alert(i+' '+file+" ");} 
  document.getElementsByTagName("head")[0].appendChild(script);  
  if(dbg>0)log(' '+eol+br)                             
}

_cond=[]; _stat=[]; _file=[]; loadstatus='';// globals
function areload_(){ var buf='<pre>';
  { buf+='<table><tr>';col=2;	
    for(var i=0; i<=_file.length-1; i++){ 
      var clr='red'; if(_stat[i]=='y') clr='lime'; if(_stat[i]=='?') clr='orange';
	  if(i==Math.floor(i/col)*col) buf+='</tr><tr>';	
	  buf+='<td>'+i+':</td>'   +'<td>'+_cond[i]+'</td>'
	     +'<td><font color="'+clr+'">'+_stat[i]+'</font></td>'
	                           +'<td>'+_file[i]+'</td>';
    }
    buf+='</tr></table>'+'</pre>'
  }
  return buf
}
function load_file(){// <- _file[],_cond[]; ->_stat[]
   var lastload=0;
   for(var i=0; i<=_file.length-1; i++){_stat[i]='n'
     if(_cond[i]=='+'){ lastload++;
	   inload=_file[i]; // -- caller when onerror: loaderr() 
       if(_file[i].lastIndexOf('.css')>0) { _stat[i]='?';
	         loadcss_(_file[i]); 
	   }else{
       if(_iex || _mon || _fox || _kml) loadjs_s(_file[i],i); 
       else if(_saf)            loadjs_0(_file[i],i);          
       else                     loadjs_1(_file[i],i); // 0,1,a,b,s               
	   }
	 }
   }
}
// ---
load+="."