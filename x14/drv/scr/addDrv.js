load_new('scr/addDrv.js');
{// globals:
  var DriveList=[]; var Drives=-1; var drvN=-1;
  var tfu_sum=[0,0,0];
}
function isok(v,nm,minv,maxv){ var err='';
  if(undef(v)) err=nm+': undef.;';
  else{
    if(!undef(minv) && v<minv) err=nm+':'+v+'<'+minv+';';
    if(!undef(maxv) && v>maxv) err=nm+':'+v+'>'+maxv+';';
  }
  return err;
}
function addDrv(vol){ // -> DriveList[Drives][col]=[val,bg,fg,aln]
//  vol[drv]={_disk:'<-',ord_:'#',upDate:'date'} 
// str_to_int: a=a.toNumber(); a=a.valueOf(); a=parseInt(a,10); a=Number(a);
    drv=vol.ord_; drvNm=vol.drv; freeB=Number(vol.free); maxB=Number(vol.size); 
    volNam=vol.volID; volID=vol.volSER; volFS=vol.fs; drvTyp=vol.drvtype;
    if(dbg>1) out(log_,'>>'+drv+','+drvNm+','+freeB+','+maxB
              +','+volNam+','+volID+','+volFS+','+drvTyp+'<br/>\n');

    var err=[]; err[0]='';
    err[1]=isok(drv   ,'drv'   ,0);
    err[2]=isok(drvNm ,'drvNm' ,'A','Z');
    err[3]=isok(freeB ,'freeB' ,0);
    err[4]=isok(maxB  ,'maxB'  ,0);
    err[5]=isok(volNam,'volNam');
    err[6]=isok(volID ,'volID' );
    err[7]=isok(volFS ,'volFS' );
    err[8]=isok(drvTyp,'drvTyp');
    for(var i=1; i<=8; i++) if(err[i]!='') err[0]+=err[i]+br; 
    if(err[0]!='') { out(log_,err[0]); return;};
    var usedB=maxB-freeB;
    tfu_sum[0]+=freeB; tfu_sum[1]+=maxB; tfu_sum[2]+=usedB;  
//  drvtype="CD/DVD/?"; // zip/tape/MO/emulated cd/dvd?
    Drives++; 
    DriveList[Drives]=[]; 
//  DriveList[Drives][0]=''// unused
  function nextClr(k,drvNm){// (k_col,drv_nm) -> bg,fg
    var j=0,bg,fg;
//  [drv_lnk ,free,max,used ,vol_n,vol_id ,f_sys,drv_type,no] -- full body
//  [0       ,2   ,3  ,4    ,5    ,6      ,7    ,8       ,1]
//  order_body=[0,2,5,3,4,6,7,8] // -- body
    for (i=0; i<=order_body.length-1; i++) {
      if(k==order_body[i]) { j=i; break;}
    }// -> j
    if(j%2==0) fg=fg1b; // 2a 2b; //line-1:col-a,col-b
    else       fg=fg1a; // 1a 1b; 

    var d='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(drvNm.charAt(0));
    // alert('"'+drvNm+'" '+typeof(drvNm)+' d="'+d+'"') // d string 3
    if(d%2==0) bg=bg1b; // 2a 2b;
    else       bg=bg1a; // 1a 1b;
    return [bg,fg];
  }
  var clr=['bg?','fg?'];   
  clr=nextClr(1,drvNm); DriveList[Drives][1]=[drvNm+':',clr[0],clr[1],''      ];// val,bg,fg,aln
  clr=nextClr(2,drvNm); DriveList[Drives][2]=[freeB    ,clr[0],clr[1],'right' ]; 
  clr=nextClr(3,drvNm); DriveList[Drives][3]=[maxB     ,clr[0],clr[1],'right' ]; 
  clr=nextClr(4,drvNm); DriveList[Drives][4]=[usedB    ,clr[0],clr[1],'right' ];   
  clr=nextClr(5,drvNm); DriveList[Drives][5]=[volNam   ,clr[0],clr[1],'left'  ]; 
  clr=nextClr(6,drvNm); DriveList[Drives][6]=[volID    ,clr[0],clr[1],'right' ];// hex8Vol(volID) 
  clr=nextClr(7,drvNm); DriveList[Drives][7]=[volFS    ,clr[0],clr[1],''      ];// '('+volFS+')' 
  clr=nextClr(8,drvNm); DriveList[Drives][8]=[drvTyp   ,clr[0],clr[1],'center'];
  if (volNam>voll_) voll_=volNam.length;
  if(dbg>1) out(log_,br+'addDrv(): DriveList['+drv+']='+DriveList[drv]+br);
}// --------------------------------------------------
load_end();