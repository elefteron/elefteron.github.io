xcfg={ name_en:"X-widget",name_bg:"X-джаджа",vers:14, ymd:'2015-10-21'
  ,descr:
' части: часовник, календар, устройства, icard, xcfg\n\
+ за устройствата ползва ActiveX и mshta.exe (не InternetExplorer),\n\
  изисква разрешение при стартиране\n\
+ работи под win-98/xp/vista/7\n\
--- инсталиране: в отделна папка, "D:/!prog.run/x-widget/" \n\
--- стартиране:  "x-widget.hta" или "x-widget.hta.cmd"\n\
--- настройка на средата за "устройства":\n\
+   ако пита с какво да се стартира *.hta, значи няма асоциация за него\n\
+   може да стартира без да променяте асоциациите си,\n\
     чрез зареждане на файла "x-widget.htm" в Internet Explorer понеже поддържа ActiveX\n\
'}
xcfg.path={ root:''// d:/!prog.run/x-widget/
	 // relative to run:
	,clk  :'../clk/' 
    ,cal  :'../cal/' 
	,drv  :'../drv/' 
	,icard:'../icard/' 
	,lib  :'../lib/' 
	,ico  :'../ico/' 
	,run  :'../run/' 
} 
  xcfg.pos={
     max:{x:0,y:0},min:{x:0, y:0},bar:{x:0,y:0,pos:'L'},scroll:{w:0,h:0} // screen
	,win:{x:0,y:0,w:0,h:0,capsz:0} // window
	,ap_h_:0,L:0,T:0,R:0,B:0 ,drvrows:0, txtH:0,ap_h:[]
  }
//  https://developer.mozilla.org/en-US/docs/Web/API/Document/width
//  http://www.javascriptkit.com/howto/newtech3.shtml
//  x = document.body.clientWidth; y = document.body.clientHeight
//  window.outerWidth; window.outerHeight
  with(xcfg.pos){
	win.capsz=26;                      // <--- select ?how to get caption sz
	scroll.w=20 | screen.scrollWidth   // <--- select ?how to get scroll sz
	scroll.h=20 | screen.scrollHeight  // <---  
    max.x =window.screen.width; max.y =window.screen.height
	drvrows=3; 
	txtH=20                            // <--- select ?how to get font height
    ap_h=[36,24,128,txtH*drvrows + scroll.h]
    for (i=0; i<=ap_h.length-1; i++) ap_h_+=ap_h[i];
	win.h=win.capsz + scroll.w + 4*2 + ap_h_;	
    win.w=136; 
	R=max.x-win.w; B=max.y-win.h;
//	--- bar.pos -> +- L,R,T,B
	bar.pos='D' // D=def ?=ask LR TB  // <--- select ?how to get 
	aw=window.screen.availWidth; ah=window.screen.availHeight;
	bw=max.x-aw;                 bh=max.y-ah;
	if(bw>0)         { bp='w'; bar.sz=bw }// L or R <---?
	if(bh>0)         { bp='h'; bar.sz=bh }// T or B <---?
	if(bw<1 && bh<1) { bp='-'; bar.sz=0  }// hidden
    if(bp=='w' && bar.pos=='D') bar.pos='R' // default 
    if(bp=='h' && bar.pos=='D') bar.pos='B' // default 
	if(bar.pos=='?') {// ask L/R or T/B
	  // 
	}
	if     (bar.pos=='L') { L+=bar.sz; }
	else if(bar.pos=='R') { R-=bar.sz; }
	else if(bar.pos=='T') { T+=bar.sz; }
	else if(bar.pos=='B') { B-=bar.sz; }
//  ---
    win.y=B; win.x=R                // <--- select this win pos y:T|B, x:L|R
  }
// old cfg:
    // define frameset and window size,pos:
    colorset =1 // 1:no frames  ,2:frames 
    winset   =3 // 1:crnt month line, 2:year months line, 3:crnt month std, 4:year months std
	winresize=true // for .hta only
// -----------------------
test=false; // true|false
