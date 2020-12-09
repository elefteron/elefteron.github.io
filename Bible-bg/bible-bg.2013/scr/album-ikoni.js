_load._new('scr/album-ikoni.js')
// *** за albumfile, albumdir, scandir: името на файла е в текущата папка или със пълен път    
// *** ако името включва път обърнете \ във / или го повторете \\ 
// *** ако името на файла е със пълен път трябва да почва с file:// или http://
var root=''//pathicons
var albumdir=root+""; /* снимки за преглед на екран */ 
var scandir =root+""//+"big/"; /* сканирани снимки - големи  */
var scanext ="tif";
var head    ='<h1><center>'
        +'албум Православни икони'
        +'</center></h1>'+eol
var foot ='' 
//      +'<h0>'+eot
//      +  'В името на любовта, истината и живота'+eot
//      +'</h0>'
     // +'<div class="footer">'
     // +  '<a href="mailto:elefter@abv.bg" title="Елефтер Арнаудов">Теди</a>. '
     // +'</div>'
var album=[ ['','']
//  NAME,EXT,SIZE,DATE,TIME,ATTR
    ,['HristosPantokrator'        ,'jpg',30,'','','','Христос Пантократор']
    ,['ISUS2'                     ,'jpg',30,'','','','Исус']
    ,['sv.Bogorodica'             ,'jpg',30,'','','','св.Богородица']
    ,['sv.Bogorodica Jerusalem'   ,'jpg',30,'','','','св.Богородица Йерусалимска']
    ,['RojdestvoHristovo'         ,'jpg',30,'','','','Рождество Христово']
    ,['sv.IvanRilski'             ,'jpg',30,'','','','св.Иван Рилски']
    ,['Sv Georgi'                 ,'jpg',30,'','','','св.Георги']
    ,['sv.Georgi 2'               ,'jpg',30,'','','','св.Георги']
    ,['Sv Nikolai'                ,'jpg',30,'','','','св.Николай Мирликийски']
    ,['sv.Mina'                   ,'jpg',30,'','','','св.Мина']
    ,['Sofia,Viara Nadejda,Ljubov','jpg',30,'','','','св.св.Вяра, Надежда и Любов и майка им София']
    ,['arh.Serafim Sobolev'       ,'jpg',30,'','','','св.Серафим Софийски чудотворец']
    ]
//  f[##]=['?'                         ,'jpg',30,'','','','?']
//  fname=0; fext=1; fsize=2; fdate=3; ftime=4; fatr=5; desc=6; 
_load._end()