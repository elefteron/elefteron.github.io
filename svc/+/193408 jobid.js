jobs={ job:"193408", usr:"Tehnopolis Karti" /* ,own:"mouse print" */} // set_at:date, termin: date
// ---
seria[1]={ sid:"020lv", pr:"A19E" ,fr:7001 ,to:9000 ,dg:5 ,su:"" ,barcode:"Code-128"}// 4x500
seria[2]={ sid:"050lv", pr:"A19F" ,fr:5001 ,to:9000 ,dg:5 ,su:"" ,barcode:"Code-128"}// 4x1000
seria[3]={ sid:"100lv", pr:"A19G" ,fr:5001 ,to:9000 ,dg:5 ,su:"" ,barcode:"Code-128"}// 4x1000
seria[4]={ sid:"200lv", pr:"A19H" ,fr:2001 ,to:4000 ,dg:5 ,su:"" ,barcode:"Code-128"}// 4x500
// ---
print[1]={
 [job:"193408_1"  ,jid:"print 020lv" ,sz:[330,487] ,pg:  500, cutpg:4  ,seria[1]]
,[job:"193408_1"  ,jid:"dop1 020lv"  ,sz:[330,487] ,pg:    1, cutpg:4  ,seria[1]] // list 4
,[job:"193408_1"  ,jid:"dop2 020lv"  ,sz:[330,487] ,pg:    1, cutpg:4  ,seria[1]] // list 4
}                                                          
print[2]={                                                 
 [job:"193408_2"  ,jid:"print 050lv" ,sz:[330,487] ,pg: 1000, cutpg:4  ,seria[2]]
 [job:"193408_2"  ,jid:"dop 050lv"   ,sz:[330,487] ,pg:   13, cutpg:4  ,seria[2]] // 50 el+2
}                                                          
print[3]={                                                 
 [job:"193408_3"  ,jid:"print 100lv" ,sz:[330,487] ,pg: 1000, cutpg:4  ,seria[3]]
 [job:"193408_3"  ,jid:"dop 100lv"   ,sz:[330,487] ,pg:   10, cutpg:4  ,seria[3]] // 39 el+1
}                                                          
print[4]={                                                 
 [job:"193408_4"  ,jid:"print 200lv" ,sz:[330,487] ,pg:  500, cutpg:4  ,seria[4]]
 [job:"193408_4"  ,jid:"dop 200lv"   ,sz:[330,487] ,pg:    5, cutpg:4  ,seria[4]] // 17 el+3
}
// ---