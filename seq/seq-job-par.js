load_new('seq-job-par.js');
/* utf-8: ах, чудна българска земьо, полюшвай цъфтящи жита! */
lib_=[ // fill by = row (default) | col
 ["grp","#[seq]","job-order" ,"client"    ,"issue"   ,"date / barcode" ,"pref","suff" ,"dig", "frm", 'tot', "cols","rows","fill"] 
// 0     1        2            3            4           5                6         7      8      9      10     11     12
,["<",2   ,"190413"    ,"Praktiker","Karti"      ,"2019-01-25","U:\\P\\Praktiker\\2019\\190413 Karti podaruk"]     // => grp-sum, val-sum
,['',"ord","190413_1"  ,"Praktiker","20lv"          , 20  , "R19E"  ,""   ,  5 ,    1, 6000,   4 ]  
,['',"ord","190413_2"  ,"Praktiker","50lv"          , 20  , "R19F"  ,""   ,  5 ,    1, 4000,   4 ]  
,['>']   
/* */
,["<",1  ,"193010"     ,"Praktiker","Karti 200lv","2019-06-06","U:\\P\\Praktiker\\2019\\193010 Karti podaruk 200 leva"]                                            
,['',"ord","193010"    ,"Praktiker","200lv"         , 20  , "R19H",""   ,  5 ,    1, 4000,   4 ]  
,['>']  

,["<",1  ,"194890_2"   ,"Praktiker","Karti 100lv","2019-09-25","u:\\p\\Praktiker\\2019\\194890 Karti podaruk 100 leva"]
,['',"ord","194890_2"  ,"Praktiker","100lv"         , 20  , "R19G",""   ,  5 ,    1, 6000,   4 ]  
,['>']   

,["<",4  ,"190734"     ,"Technopolis","Karti"      ,"2019-02-15","U:\\T\\technopolis\\2019\\190734 karti TEHNOPOLIS"] // t same p (was U:/P/Praktiker/2019/)
,['',"ord","190734_1"  ,"Technopolis","020lv"       , 20  , "A19E",""   ,  5 , 0001, 1500,   4 ] 
,['',"ord","190734_2"  ,"Technopolis","050lv"       , 20  , "A19F",""   ,  5 , 0001, 4000,   4 ] 
,['',"ord","190734_3"  ,"Technopolis","100lv"       , 20  , "A19G",""   ,  5 , 0001, 4000,   4 ] 
,['',"ord","190734_4"  ,"Technopolis","200lv"       , 20  , "A19H",""   ,  5 , 0001, 1500,   4 ] 
,['>']   

,["<",1  ,"193009_1"   ,"Technopolis","Karti","2019-05-23","u:\\t\\technopolis\\2019\\193009 Karti Tehnopolis 20 leva"]
,['',"ord","193009_1"  ,"Technopolis","020lv"       ,20   ,"A19E",""   ,  5 , 2001, 4000,   4 ]  
,['>']  

,["<",4,"193408"       ,"Technopolis","Karti","2019-06-07","U:\\t\\technopolis\\2019\\193408 Karti podaryk"]
,['',"ord","193408_1"  ,"Technopolis","020lv"       , 20  , "A19E",""   ,  5 , 7001, 2000,   4 ]  
,['',"ord","193408_2"  ,"Technopolis","050lv"       , 20  , "A19F",""   ,  5 , 5001, 4000,   4 ]  
,['',"ord","193408_3"  ,"Technopolis","100lv"       , 20  , "A19G",""   ,  5 , 5001, 4000,   4 ]  
,['',"ord","193408_4"  ,"Technopolis","200lv"       , 20  , "A19H",""   ,  5 , 2001, 2000,   4 ]  
,['>']   

,["<",4,"193408_*.1"   ,"Techn.","Karti dopechatka","2019-06-21","U:\\t\\technopolis\\2019\\193408 Karti podaryk"] // dopechatka 
,['',"val","193408_1.1","Technopolis","020lv"       , 20  , "A19E",""   ,  5 , 7001,   04,   4 ]  // import from list
,['',"val","193408_2.1","Technopolis","050lv"       , 20  , "A19F",""   ,  5 , 5001,   50,   4 ]  // import from list
,['',"val","193408_3.1","Technopolis","100lv"       , 20  , "A19G",""   ,  5 , 5001,   39,   4 ]  // import from list
,['',"val","193408_4.1","Technopolis","200lv"       , 20  , "A19H",""   ,  5 , 2001,   17,   4 ]  // import from list
,['>']   //  ord         id                               bcn    pr     sc     dg     fr     val  kol

,["<",3,"196086_2"     ,"Technopolis","Karti","2019-10-22","U:\\t\\technopolis\\2019\\196086 Karti podaruk 3 vida"] 
,['',"ord","196086_2.1","Technopolis","020lv"       , 20  , "A19E",""   ,  5 ,10001, 2000,   4 ]  
,['',"ord","196086_2.2","Technopolis","050lv"       , 20  , "A19F",""   ,  5 ,10001, 4000,   4 ]  
,['',"ord","196086_2.3","Technopolis","100lv"       , 20  , "A19G",""   ,  5 ,10001, 1000,   4 ]  
,['>']   //  ord         id                               bcn    pr     sc     dg     fr     val  kol

,["<",4,"200030"       ,"Technopolis","Karti","2020-01-07","U:\\t\\technopolis\\2020\\200030 Karti podaruk 4 vida"] // gen & pdf: 1000 per 9 min
,['',"ord","200030_2"  ,"Technopolis","020lv"       , 20  , "A20E",""   ,  5 , 0001, 2000,   4 ]  
,['',"ord","200030_3"  ,"Technopolis","050lv"       , 20  , "A20F",""   ,  5 , 0001, 6000,   4 ]  
,['',"ord","200030_4"  ,"Technopolis","100lv"       , 20  , "A20G",""   ,  5 , 0001, 2000,   4 ]  
,['',"ord","200030_5"  ,"Technopolis","200lv"       , 20  , "A20H",""   ,  5 , 0001, 2000,   4 ]  
,['>']   //  ord         id                               bcn    pr     sc     dg     fr     val  kol

,["<",6,"197106"       ,"Joy fashion","Vouchers","2019-12-02","U:\\J\\Joy fashion\\2019\\197106_Vouchers_6 vida_370 br"]
,['',"ord","197106.1"  ,"Joy fashion","0050lv"   ,  0  , "ST"  ,""   ,  5 ,  501,   50,   2 ]  
,['',"ord","197106.2"  ,"Joy fashion","0100lv"   ,  0  , "ST"  ,""   ,  5 , 1001,  100,   4 ]  
,['',"ord","197106.3"  ,"Joy fashion","0150lv"   ,  0  , "ST"  ,""   ,  5 , 1501,  100,   4 ]  
,['',"ord","197106.4"  ,"Joy fashion","0300lv"   ,  0  , "ST"  ,""   ,  5 , 3001,   50,   2 ]  
,['',"ord","197106.5"  ,"Joy fashion","0500lv"   ,  0  , "ST"  ,""   ,  5 , 5001,   50,   2 ]  
,['',"ord","197106.6"  ,"Joy fashion","1000lv"   ,  0  , "ST"  ,""   ,  5 ,10001,   20,   2 ]  
,['>']   //  ord         id                               bcn    pr     sc     dg     fr     val  kol

,["<",1  ,"200225"     ,"MTK sport","Garancionni karti","2020-01-15","U:\\m\\MTK Sport\\2020\\200225_Garancionni_karti.Pers"]
,['',"ord","200255"    ,"MTK sport","-"   ,  0  , "№ "  ,""   ,  6, 15001, 3000,   8 ] 
,['>']   //  ord         id                               bcn    pr     sc     dg     fr     val  kol
/* */

]; pp=lib_.length-1; // total lib values:69480 
load_end();