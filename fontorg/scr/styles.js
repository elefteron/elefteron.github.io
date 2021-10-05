load_new('scr/styles.js')
// http://www.squarefree.com/bookmarklets/
function edit_mode(){
  javascript:document.body.contentEditable = 'true'; document.designMode='on'; void 0
}// ---
//   if (!window.getComputedStyle) {// --- iex
//     window.getComputedStyle = function(el, pseudo) {
//       this.el = el;
//       this.getPropertyValue = function(prop) {
//         var re = /(\-([a-z]){1})/g;
//         if (prop == 'float') prop = 'styleFloat';
//         if (re.test(prop)) {
//           prop = prop.replace(re, function () {
//           return arguments[2].toUpperCase();
//           });
//         }
//         return el.currentStyle[prop] ? el.currentStyle[prop] : null;
//       }
//       return this;
//     }
//   }
	  
	function RGBtoHSL(RGBColor){
		with(Math){
			var R,G,B;var cMax,cMin;var sum,diff;var Rdelta,Gdelta,Bdelta;var H,L,S;
			R=RGBColor[0];G=RGBColor[1];B=RGBColor[2];
			cMax=max(max(R,G),B);cMin=min(min(R,G),B); sum=cMax+cMin;diff=cMax-cMin;L=sum/2;
			if(cMax==cMin){S=0;H=0;
			}else{
				if(L<=(1/2))S=diff/sum;else S=diff/(2-sum);
				Rdelta=R/6/diff;Gdelta=G/6/diff;Bdelta=B/6/diff;
				if(R==cMax)H=Gdelta-Bdelta;else if(G==cMax)H=(1/3)+Bdelta-Rdelta;else H=(2/3)+Rdelta-Gdelta;
				if(H<0)H+=1;if(H>1)H-=1;
			}
			return[H,S,L];
		}
	}
	function getRGBColor(node,prop){var rgb,r,g,b; 
		
		if (!window.getComputedStyle){
		  var prop_=prop; if (prop == 'float') prop_ = 'styleFloat';        //iex ?
		  prop_=prop_.toUpperCase()                                          //iex ?
		  rgb=node.currentStyle[prop_] ? node.currentStyle[prop_] : null;   //iex ?
		}else 
		  rgb=getComputedStyle(node,null).getPropertyValue(prop);
		if(/rgb\((\d+),\s(\d+),\s(\d+)\)/.exec(rgb)){
			r=parseInt(RegExp.$1,10);g=parseInt(RegExp.$2,10);b=parseInt(RegExp.$3,10);
			return[r/255,g/255,b/255];
		}
		return rgb;
	}
	function hslToCSS(hsl){
		return "hsl("+Math.round(hsl[0]*360)+", "+Math.round(hsl[1]*100)+"%, "+Math.round(hsl[2]*100)+"%)";
	}
// ---
  props=["color","background-color","border-left-color","border-right-color"
        ,"border-top-color","border-bottom-color"];
  props2=["color","backgroundColor","borderLeftColor","borderRightColor"
         ,"borderTopColor","borderBottomColor"];
inv_style=function(){
	if(typeof getRGBColor(document.documentElement,"background-color")=="string")
		document.documentElement.style.backgroundColor="white";
	revl(document.documentElement);
	function revl(n){
		var i,x,color,hsl;
		if(n.nodeType==Node.ELEMENT_NODE){
			for(i=0;x=n.childNodes[i];++i) revl(x); // !
			for(i=0;x=props[i];++i){
				color=getRGBColor(n,x);
				if(typeof(color)!="string"){
				    hsl=RGBtoHSL(color);
					hsl[2]=1-hsl[2];// <-- 
					n.style[props2[i]]=hslToCSS(hsl);
				}
			}
		}
	}
}//---
f_cyan=1/2; f_green=1/3; f_lime=1/4; f_yellowgreen=1/6; f_orangegreen=1/7; f_blue=3/5
new_style=function(formula){// 
	if(typeof getRGBColor(document.documentElement,"background-color")=="string")
		document.documentElement.style.backgroundColor="white";
	revl(document.documentElement);
	function revl(n){
		var i,x,color,hsl;
		if(n.nodeType==Node.ELEMENT_NODE){// iex Node ?
			for(i=0;x=n.childNodes[i];++i)revl(x);
			for(i=0;x=props[i];++i){
				color=getRGBColor(n,x);
				if(typeof(color)!="string"){
				    hsl=RGBtoHSL(color);
					hsl[0] = formula; // <--
					n.style[props2[i]]=hslToCSS(hsl);
				}
			}
		}
	}
}// ---
get_style=function(){outlog_('get_style:'+eol+br);  
//  if(typeof getRGBColor(document.documentElement,"background-color")=="string")
//    log('document.documentElement.style.backgroundColor'+'="'
//            +document.documentElement.style.backgroundColor+'"'+eol+br);
	cnt=0;revl(document.documentElement);
	
	function revl(n){
		var i,x,color,hsl;
		if(n.nodeType==Node.ELEMENT_NODE){
			for(i=0;x=n.childNodes[i];++i) revl(x);
			for(i=0;x=props[i];++i){cnt++; if(cnt>20)break;
				color=  getRGBColor(n,x);
				      //getComputedStyle(n,null).getPropertyValue(x)
				if(typeof(color)!="string"){
				    log(cnt+' n:'+n+' x:'+x+' rgb:'+color
				//  +' hsl:'+RGBtoHSL(color)
					+eol+br)
				}
			}
		}
	}
log('---'+eol+br);	
}
load_end()