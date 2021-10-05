_load._new('scr/colors.js')
{
//  --- 8 color var's below needs in *.htm (not correspond to .css yet)  
//  control-idx.js:            ntclr,otclr,           btnB, btnR, btnY  
//  Bible-BG.find.htm          ntclr,otclr,fghi,bghi, btnY
//  Bible-BG.books.htm:        ntclr,otclr,clr1,bkidxclr,bknameclr
var clr1      ='#808080', bkidxclr  ='#404050', bknameclr='#000000' 
//  Bible-BG.important.htm     clr1
//  Bible-BG.etc.htm           clr1
//  find-util,js:              bgshow,fghi,bghi 
//  utils.js: row1(),row2()    defrow1clr,defrow2clr
   ,defrow1clr='#303030', defrow2clr='#000000'
//  Bible-BG.show.htm:         bgsrch,bgshow,bgno,bgtab,fghi,bghi
   ,bgsrch    ='#203040' /*'#303040' #506070*/  
   ,bgshow    ='#001010' /*'#001020'*/ 
   ,bgtab     ='#203040'
//  --- 5 color vars (correspond to .css)
   ,otclr     ='#100070' // 800000   601010   420000
   ,ntclr     ='#700010' // 6040E0   404080   4A4A0A  707010  C39000 - from gold
   ,bgno      ='#000000'
   ,fghi      ='#000000', bghi='00FFFF'
   ,icobg     ='#404010' // 37371E like a gold
//--------------------------------------------------------------------------
//  --- colors defined in Bible-bg.css used everywhere (copied from .css)
/*  colors: #000000=black   #FFFFFF=white  #FF0000=red   #FFD700=gold  #FFCC00=dark_gold  
            #FFFF00=yellow  #00FFFF=cyan   #99CCFF=bl?   #6699CC=bl?     */
var BibleBGcolors=[                                 // vars that correspond to .css:
     ['body  ','#FFFFFF','#000000',''           ]   // -
    ,['a:vis.','#66CCFF','#000000',''           ]   // -
    ,['a:act.','#00AAFF','#000000',''           ]   // -
    ,['a:link','#00FFAA','#000000',''           ]   // -
    ,['a:hov.','#000000','#FFD700',''           ]   // -
    
              /* <input class= */
    // these has no effect for crnt btn def: 'border-color:'  'border:'
    ,['.btnB ','#FFFFFF','#404010','ntclr='     ]   // ntclr  
    ,['.btnR ','#FFFFFF','#700010','otclr='     ]   // otclr 
    ,['.btnY ','#000000','#FFFF00',''           ]   //  
//  .btnK      {COLOR: white  ;background-color:gray   ;   // unused                       
//  .btnYr     {COLOR: maroon ;background-color:yellow ;   // unused
    
              /* span id= */
    ,['#hi   ','#000000','#00FFFF',''           ]   // fghi,bghi
    ,['#NT   ','#FFFFFF','#700010',''           ]   // ntclr 404010
    ,['#OT   ','#FFFFFF','#100070',''           ]   // otclr 700010
    ,['#hd   ','#FFFFFF','#000000','hdr        ']   //
    ,['#bk   ','#FFCC00','#000000','book       ']   //
    ,['#ch   ','#7B68EE','#000000','chapter    ']   //
    ,['#no   ','#00FFAA','#000000','[b.c.v]/vno']   // , bgno
    ,['#txt  ','#FFFFFF','#000000','text       ']   //
    ,['#txq1 ','#66CCFF','#000000',"'...'      "]   //
    ,['#txq2 ','#FF0000','#000000','"..."      ']   //
    ,['#txrm ','#FFD700','#000000','*(remark)  ']   //
    ,['#txtr ','#7B68EE','#000000','{translate}'] ] //
//  --- ? set colors from .css to var
//  --- ? set colors from var  to .css
//  --- colors defined in all .htm: <body BGCOLOR="#000000" text="#FFFFFF">
    
//  --- see color table in: Bible-BG.web-clr.htm
//  --- !edit colors in form
}
_load._end()