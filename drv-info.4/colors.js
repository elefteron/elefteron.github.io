load+='colors '
   // line:1/2-bg grays; col:a/b-fg:yellow/orange
   bg0 ="#404040"; fg0 ="#b0b0b0" // out of tbl
   bg1a="#202020"; fg1a="#f0f0f0"
   bg1b="#202020"; fg1b="#f0b000"
   bg2a="#404040"; fg2a="#f0f0f0"
   bg2b="#404040"; fg2b="#f0b000"
   bg3 ="#808080"; fg3 ="black"   // tbl header/footer color
   fclr='gold'
   
function tb_col(bg,fg,tx,al){
  var a=''; if (al!=null && al!='') a=' align="'+al+'"'
  tc_='<td bgcolor="'+bg+'"'+a+'><font ' //  +' size="'+sz+'"'
    +' color="'+fg+'">'+tx+'</font></td>'
    return tc_
//'<td bgcolor="'+bg+'"'+a+'><font size="'+sz+'" color="'+fg+'">'+tx+'</font></td>'
}// --------------------------------------------------
