load+='order '
//var order=new Array()   
// ordered row format
//  [drv_lnk ,free,max,used ,vol_n,vol_id ,f_sys,drv_type,no] -- full body
//  [0       ,2   ,3  ,4    ,5    ,6      ,7    ,8       ,1]
    order_body=[0,2,3,4  ,5,6,7  ,1/*,8*/] // -- body
    order_hdr =[1,2,3,4  ,5,6,7  ,1/*,8*/] // -- hdr,ftr
    tblW=order_body.length*8         // cols*pix  9*6
    vollng=17;
    order_chars=[2,3*11,vollng,9,2,7  ,10] //  -- chars by columns .. later
var chars=0;for (i=0; i<=7; i++) chars+=order_chars[i] ; // -- chars by columns .. later
// --------------------------------------------------
   val=new Array(9); bg=new Array(9); fg=new Array(9); aln =new Array(9); //  sz=new Array(9);
function OrdRowFmt(order){// drv_no ,free   ,max    ,used   ,vol_n  ,vol_id ,f_sys  ,drv_type
   var s=''
   d=val[1]; //'<LABEL FOR="get" ACCESSKEY="'+x.DriveLetter+'"></LABEL>' ?
   val[0]='<a href="'+d+'" title="open '+d+'"'  +' target="self_"'+ '>'+d+'</a>' // file:///
   bg[0]=bg[1]; fg[0]=fg[1]; aln[0]=aln[1]; // sz[0]=sz[1]; 
   for (var i=0; i<=order.length-1; i++) {
     j=order[i];  s+=tb_col(bg[j],fg[j],val[j],aln[j])
   } //,sz[j]
   return s
}// --------------------------------------------------
DriveList='';tfu_sum=[0,0,0]
function addDrv(drv, freeB, maxB, usedB, volNam, volID, volFS, drvTyp){ sp='&nbsp;'
    if(drv%2==0) {bga=bg2a;bgb=bg2b;fga=fg2a;fgb=fg2b}//line-1:col-a,col=b
    else         {bga=bg1a;bgb=bg1b;fga=fg1a;fgb=fg1b}
    drvNo=drv//+':'
    tfu_sum[0]+=freeB; tfu_sum[1]+=maxB; tfu_sum[2]+=usedB;  
    freeB=groupCharsBy(b2mb(freeB).toString(),3,3,sp)
    maxB =groupCharsBy(b2mb(maxB ).toString(),3,3,sp)
    usedB=groupCharsBy(b2mb(usedB).toString(),3,3,sp)
  //drvtype="CD/DVD/BD"; // zip/tape/MO/emulated cd/dvd?    
    val[1]=drvNo ;          bg[1]=bga;  fg[1]=fgb;  aln[1]=''      ; 
    val[2]=freeB ;          bg[2]=bgb;  fg[2]=fga;  aln[2]='right' ; 
    val[3]=maxB  ;          bg[3]=bgb;  fg[3]=fgb;  aln[3]='right' ; 
    val[4]=usedB ;          bg[4]=bga;  fg[4]=fga;  aln[4]='right' ;   
    val[5]=volNam;          bg[5]=bga;  fg[5]=fgb;  aln[5]='left'  ; 
    val[6]=hex8Vol(volID);  bg[6]=bgb;  fg[6]=fgb;  aln[6]='right' ; 
    val[7]='('+volFS+')';   bg[7]=bgb;  fg[7]=fga;  aln[7]=''      ; 
    val[8]=drvTyp;          bg[8]=bga;  fg[8]=fga;  aln[8]='center'; 
    DriveList+='<tr>'+OrdRowFmt(order_body)+'</tr>'
}// --------------------------------------------------
