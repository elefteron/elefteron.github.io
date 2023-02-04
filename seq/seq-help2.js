load_new('seq-help2.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита!  encoding:utf-8 */
  help=[];seq_sch='seq-scheme-3.svg'; var xbg=' style="background-color:#400000;"'
  // [<a href="#label1">link to content 1</a>,...] -> [<a id="label1">content 1</a>,...]
  {help[0]=["<a id='0'><hr><u><b>SEQ</b> Sequencer</u> версия 9a 2022-06",''
,"• <b>Цел и функции:</b></a> " 
," а) прави <e>o-seq</e> серия от подредени стойности по зададени параметри"
," - префикс, суфикс, от,до,стъпка, бр.цифри, колони, редове"
," б) прочита <e>u-seq</e> серия от неподредени стойности от .csv файл (напр. за допечатка), със/без заглавие, колони(стр.), редове(ст-ти на стр.)"
," -  и ги допълва при нужда с празни стойности до ред*кол"
,''
," в) <e>запазва готовите стойности на серия</e> в два вида <u>'*.csv'</u>  файлове:"
," - прави <u>'*.eps-list.csv'</u> от серия за да генерира <e>баркодове</e> (като <u>'.eps'</u> файлове)"
," - прави <u>'*.ind-list.csv'</u> от серия със заглавeн ред за да замести позиция в стр. с баркодове/стойности в Indesign при <e>персонализация</e> на печатни продуктия"
,""
," г) запазва задачата във файл <u>*.seq-job</u> (параметри/неподр. стойности на серия, параметри на задачата) "
," -  прочита запазените задачи <u>*.seq-job</u> като  <e>библиотека задачи</e> за копиране като текуща задача"
,""
," д) продуцира баркодове: eps>pdf | svg ?"
," - <e>val>eps</e> извиква Zint за да продуцира баркодове като '.eps' от <u>'*.eps-list.csv'</u>"  
," - <e>eps>ps</e>  прави .ps със променено eps съдържание: rgb>grayscale,font-name replace"
," - <e>ps>pdf</e>  прави .pdf за по-бърз импорт в Indesign (eps/ps е 10 пъти по-бавен)"
,"   -- @Acrodistiller е най-бърз, но прави големи файлове в A4"
,"      !<e> не е автоматизирано още</e>" 
,"   -- @SumatraPDF е по-добър & свободен (авто обрязване по рамера на баркода, по-малък размер на файл)"
,"      ! използва GS:  'C:\Program Files\gs\gs9.55.0\bin\gswin64c.exe'"
,"      !<e> не е автоматизирано още</e>" 
,"   -- комбиниране на всички .pdf's в един файл с Acrobat XI е бързо" 
,"      ? обрязване на всички стр"
," 	    ? заместване от комбиниран файл: A19H#.pdf:pg#" 
,""
,"• <b>Конфигурация и Организация</b>"
,'- <k>изтегли локално <a class="bRun" href="'
    +'https://elefteron.github.io/SEQ/SEQ.zip'
+'">SEQ.zip</a> и разархивирай</k> в папка <u>SEQ/</u>'
,'- <k>изтегли локално <a class="bRun" href="' 
//  +'http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip'
//  +'https://sourceforge.net/projects/zint/files/latest/download'
//=>+'https://jztkft.dl.sourceforge.net/project/zint/zint/2.10.0/zint-2.10.0-win32.zip'
    +'http://www.sourceforge.net/projects/zint/files/zint/2.10.0/zint-2.10.0-win32rc2.zip' // !?
+'">Zint</a> и разархивирай</k> в папка <u>zint/</u>'
,"- от папка <u>seq/</u> старирай <u><k>'setup.cmd'</k></u> за начално конфигуриране: "
,".. 1: прави файл <u>'seq-user.js'</u> със системни променливи"
,".. 2: прави/проверява работната папка <u>$seq-jobs/</u>"
,".. 3: в <u>'$seq-jobs/'</u> записва лог-файл на работата <u>'seq-user.log'</u>"
	,'- *.eps-list.csv - стойностите на баркодовете за Zint'
	,'- *.ind-list.csv - таблицата за съответствие на баркод с колона и ред (стр) за Indesign '

,".. - <u>'/eps/'</u>, <u>'/ps/'</u> ,<u>'/pdf/'</u> "
,'',"- стариране <u><k>'seq.hta'</k></u>",''
    
    ,'- Работим локално и накрая качваме на сървър/архив папка <u>/ind</u> с <u>архивирани баркодове</u>, генериращите файлове, и генерираната персонализация '
  ].join('<br>\n')}
  {help[1]=['<a id="1"><hr><b>Процеси</b></a>'// bcn
    +' - Последователност: 1.серия, 2.баркодове и 3.сглобяване'
	,''//,'<b>Последователност на действията</b>'
    ,'1a. Правим последователнa серия  по зададени начално число, брой стойности и текстов низ преди и след числото'
	,'1b. или Импортираме готова серия (от .csv) - напр. при непоследователни стойности/допечатка '
    ,''
	,'2a. Записваме в <u>/eps/</u> направена/импортирана серия:'
	+' <u><e>order</e>.eps-list.csv</u>'//  (<e>type</e> <e>range</e>)
    ,'- всички стойности са в една колона без заглавен ред'
	,'2b. Правим баркодове в <u>/eps/*.eps</u> с <u><e>order</e>.eps-list.csv</u> чрез <u>ZINT.exe</u> '
    +'(<k>csv2eps.cmd</k>)'
	,'2c. Прецизираме готовите от <u>/eps/</u> във <u>/ps/</u> '
    ,'- заменя шрифт и преобразува цветността от RGB в Gray' // - ключ cmyk в zint
//  fnd_=["/Helvetica findfont", "0.00 0.00 0.00 setrgbcolor", "1.00 1.00 1.00 setrgbcolor"]
//  rep_=["/Arial findfont",     "0 setgray",                  "100 setgray"]
    ,''
	,'*  означаваме с <e>order</e> (job №) номера на поръчка в името на файла '
//  +', с <e>type</e> типa на баркода, с <e>range</e> броя стойности'
    ,''
    ,'3а. Записваме направена/импортирана серия:'
	+'<u><e>order</e>.ind-list.csv</u>'// ? (<e>type</e>.<e>range</e>)
	,'3b. Заместваме <e><<полета>></e> в Indesign с <e>.eps</e>/<e>стойност</e> според тази таблица (всичко е в <u>/ind/</u>)'
    ,'3c. Генерираме .pdf за печат'
    ,'<k>*** виж още в <a href="#3">3.Сглобяване в Indesign</a></k>'
  ].join('<br>\n')}
  {help[2]=['<a id="2"><hr><b>Серия, csv, eps</b></a>'
    ,'<u>SEQ полета с параметри - легенда</u>'
	,tbl(row(col('<u>order</u>') +col('поръчка номер') )
	    +row(col('<u>id</u>')    +col('идентификатор - фирма_изделие_цена' ) )
	    +row(col('<u>bcn</u>')   +col('вида баркод в Zint,ако е > 0, стойностите са имена на файлове - @file_#' ) )
		
	    +row(col('<u>pref/bef</u>    ',xbg)+col('символен низ в началото (преди числото - напр.A19G)' ) )
	    +row(col('<u>suf/after</u>    ',xbg)+col('символен низ в края') )
	    +row(col('<u>dig</u>    ',xbg)+col('брой цифри в числото (с водещи нули), не по-малък от крайното число') )
        +row(col('<u>from</u>    ',xbg)+col('начално число в серията') )
	    +row(col('<u>total</u>   ',xbg)+col('брой стойности в серията') )

	    +row(col('<u>col</u>     ')+col('брой колони в таблицата (в страницата)') )
	    +row(col('<u>row</u>     ')+col('брой редове (брой страници) <u>r=val/k</u>') )
        +row(col('<u>to</u>    ')+col('крайно число в серията') )
	 )
     // file: order client issue note
    ,'... за следните параметри на серия'
    ,"pr:A sc:H dg:5 fr:2001 to:4000 К:4 bcn:20 id:'193408_4'" 
    ,''
    ,'... ще генерираме файл "193408_4.ind.csv"'
    ,'<u>@file_1,@file_2,@file_3,@file_4        </u>'
    ,'<u>A19H02001.eps,A19H02501.eps,A19H03001.eps,A19H03501.eps</u>'
    ,'<u>A19H02002.eps,A19H02502.eps,A19H03002.eps,A19H03502.eps</u>'
    ,'<u>A19H02003.eps,A19H02503.eps,A19H03003.eps,A19H03503.eps</u>'
    ,'...'
    ,'<u>A19F02500.eps,A19F03000.eps,A19F03500.eps,A19F04000.eps</u>'
    //,'* стойностите може да се генерират в 1 колона и без име на колона (без DataMerge) в първата стр. в Indesign'
    ,'*** заради запълването чрез DataMerge в Indesign, добавяме имена на колоните в първи ред - header, ако стойностите в дадена колона са имена на файлове, името на колона в header започва с @ '
   ,''
   ,'<b>*. Алтернативно генериране на .csv таблицата:</b>'
   ,'<b>+</b> Приготвяме първия ред с началните стойности на колоните и влачим няколко колони едновременно до броя редове (листове)'
   ,' -  Препоръчва се ползването на OpenOffice, защото в него може да контролира разчитането/извеждането на "," при import/export '
   +', в Excell не може да се увеличават (с влачене) стойностите на няколко колони едновременно, символът @ e проблем.'
   ,'<b>+</b> Добавяме заглавие (header) с имена на колоните: @file_1,... и експортираме в .csv файл'
   ,'<b>+</b> Добавяме .eps след всяко име на баркод чрез текстов редактор.'
   ,' '
   ,'* проверяваме поредността на генерираните стойности и ги записваме в .csv файл'

  ,'<hr>'
      ,'*.<b>Алтернативно генериране със Zint</b> - настройки в интерфейса:'
      ,'<u>(пример за тип Code 128)</u>'
      ,'* стартира се qtZint.exe <u>download:<a href="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip" target="_blank" title="http://www.sourceforge.net/projects/zint/files/zint/2.6.3/zint-2.6.3-win32rc2.zip"> Zint barcode studio 2.6</a></u>'  
      ,'.. в General/Symbology: Code 128 (ISO 15417)'
      ,'.. в Code 128: Standard'
      ,'.. в General/Data to Encode: 123 -> '
      ,'..... start value: 1, end value: 4000, increment by: 1, format: A19F$$$$$'
      ,'..... Sequence: create бутон - показва последователните стойности за баркодовете  в една колона'
      ,'..... Generate bar codes: export бутон '
      ,'........ destination path: <u>".../eps"</u> (ползвайте локален път за по-бърза работа)'
      ,'........ File Name Prefix: (празно)'
      ,'........ File Name: Same as Data'
      ,'........ File Format: (*.eps)'
      ,'........ ок бутон - създава по един файл за всеки баркод!'
    ,'<hr><a id="4а"><br/>some Zint symbology table</a><table>'
	  +row(col("номер")    +col("баркод име"                                  ),'' )
      +row(col(" 0")       +col("без баркод, само стойност"                   ),'' )
      +row(col(" 1")       +col("Code 11"                                     ),'' )
      +row(col(" 2")       +col("Standard Code 2 of 5"                        ),'' )
      +row(col(" 3")       +col("Interleaved 2 of 5"                          ),'' )
      +row(col(" 4")       +col("Code 2 of 5 IATA"                            ),'' )
      +row(col(" 6")       +col("Code 2 of 5 Data Logic"                      ),'' )
      +row(col(" 7")       +col("Code 2 of 5 Industrial"                      ),'' )
      +row(col(" 8")       +col("Code 3 of 9 (Code 39)"                       ),'' )
      +row(col(" 9")       +col("Extended Code 3 of 9 (Code 39+)"             ),'' )
      +row(col("<u>13</u>")+col("<u>EAN (Including EAN-8 and EAN-13)</u>"     ),'' )
      +row(col("14")       +col("EAN + Check Digit"                           ),'' )
      +row(col("16")       +col("GS1-128 (UCC.EAN-128)"                       ),'' )
      +row(col("18")       +col("Codabar"                                     ),'' )
      +row(col("<u>20</u>")+col("<u>Code 128 (automatic subset switching)</u>"),'' )
      +row(col(" 58")      +col("QR Code"                                     ),'' )
      +row(col(" 60")      +col("Code 128 (Subset B)"                         ),'' )
      +row(col(" 69")      +col("ISBN (EAN-13 with verification stage)"       ),'' )
      +row(col(" 71")      +col("Data Matrix (ECC200)"                        ),'' )
      +row(col(" 72")      +col("EAN-14"                                      ),'' )
      +row(col("128")      +col("Aztec Runes"                                 ),'' )
      +row(col("129")      +col("Code 32"                                     ),'' )
      +row(col("142")      +col("Grid Matrix"	                              ),'' )
    +'</table>'
  ].join('<br>\n')}
  {help[3]=['<a id="3"><hr><b>Сглобяване в Indesign</b></a>'
  +' - <i>персонализация на *.pdf преди печат <i>'
	,''
    ,'* <u>SVC</u> <k>разбива order.ind.csv на по (100,200,250 или 500) реда</k> (1 ред генерира 1 лист)'
	,'1.<k>Създаваме (свързани*) карета</k> в <e>MasterPage</e> и чрез <e>DataMerge/SelectDataSource</e> запълваме полетата с подредените баркодове според имената на колоните им в <u><e>order</e>.ind.csv</u>'
    ,''
	,'-- За всяка колона от .csv избираме поредното каре и кликаме върху полето в палетата DataMerge'
	,'-- напр: за полетата от колона <u>@file_1</u> карето ще се запълни с <u>«file_1»</u>'
	,'-- символът @ в името на колона (*.csv) указва, че стойностите в колоната са файлове,'
	,'-- а *.eps файловете и *.indd.csv са в една папка'
    
    ,''
    ,'.. стойностите са в колони, със заглавен ред и ".eps" в края на всяка стойност' 
	,'- този файл e таблица за съответствие на всеки *.eps с <e>data merge</e> поле в Indesign'
	,'- при допечатка ползваме направените вече баркодове (*.eps), но с друга <u>ind.csv</u> таблица.'
	,'.. колоните (K) съответстват на елементите в страница, а редовете (R) на страниците, '
	,'.. като целта е стойностите във всяка колона да са последователни - cut&stack'
    ,''
    ,'-------- колекция: '
	,'*  Събираме серии в колекция (всяка нова серия се добавя отдясно):'
	,'.. броят стойности трябва да е еднакъв или да допълним по-късата серия '
	,'.. задаваме брой колони - К, на които се разделя всяка серия в колекцията'
    ,''
	,'.. името на колона в hdr е "@seria-order_seria-kol_#" - напр: @197106.1_kol_7'
    ,'-------- '
    ,''
    ,'* (ако ползваме копие на стар файл новата таблица трябва да се замени в links със relink,'
    +' например при частична допечатка ползваме друга таблица) '
	,''
	,'2.След всеки DataMerge, който прави нов файл, <k>записваме всяка персонализация в нов файл</k> order.pers.#.indd.'
    ,'-- от всеки файл order.#pers.indd с персонализация генерираме *.pdf за печат '
    ,''
	,'*** може едновременно да пуснем няколко процеса за генериране на pdf '
	+' background tasks показва прогресът им '//'(4 процеса едновременно, следващите чакат)'
	,'*** за да не блокираме файловия мениджър (Explorer) с бавни файлови процеси (.csv над 500 реда) първо стартираме Indesign и после зареждаме файл с двоен клик, иначе  Explorer  ще стои блокиран до завършване на операцията DataMerge, която е бавна за големи файлове! '
	,'*** ползваме по-къси имена' 

    ,'- <k>разбиваме *.ind-list.csv за merge и print-pdf в Indesign на по (100,200,250 или 500) реда(стр)</k> (1 ред генерира 1 лист)'+' поради следните причини: 1.по-бърза работа с Indesign, 2.по-бързо зареждане на готовия .pdf в принтера, 3.по-лесно проследяване при грешка, 4.по-малки файлове, 5.не въвеждаме ръчно диапазон на datamerge в Indesign'
    
  ].join('<br>\n')}
  {help[4]=['<a id="4"><hr><b>Техно инфо</b></a> - single page web app.',''
    ,'• Технологии и зависимости'
,'1.<e>операционна система</e>: <u>windows xp,vista,7</u>, език на диалога: <u>en/bg</u>, файлова кодировка: <u>utf-8</u>'
,'2.<e>работна среда</e>: <u>msHTA</u> / ie-8..10 или edge, chrome, firefox с инсталиран плъгин ietab'
,'3.<e>Езици и UI</e>:<u>Html, css, JavaScript, html GUI</u>, без външни библиотеки, javascript, <u>batch/cmd</u>'
,'4.<u>ActiveX</u>: достъп до оборудването на оп.с-сма, стартиране на скриптови командни файлове batch, файлова с-сма за вх/изх - запис/четене на данни в/от *.csv'
," - (ActiveXObject(): 'Scripting.FileSystemObject','WScript.Network','WScript.Shell')"
,'5.<u>Zint barcode studio</u> (2.6.0,2.6.3/2.10.0) генерира баркодове през batch'
,"6.<e>batch/cmd</e>: <u>'#pers-init.bat'</u>, <u>'svc-eps-make.cmd'</u></li>"// <u>"#eps-make.bat"<u> - run Zint'
,'7.<e>редактиране на код</e>: <u>Notepad++</u> за <u>svc_pers.js</u> с описание на серии'

  ,'<hr><a id="5b"><b>Data flow scheme</b></a>' // use id="" , dont use name=""
    ,'<img style="background-color:#999999; align-content: center; width:630px" src="'+seq_sch+'">'
  ].join('<br>\n')}
  {help[5]=['<a id="5"><hr><b>Todo</b></a> ','+ ok, ~ halfwork, ! need, - not yet'
  ,'+  subfields: init,parerr,seqjob'
  ,'+  help toc'
  
  ,'+  imp-seq, no hdr'
  ,'-  imp-seq, with hdr->cols'
  
  ,'+  hta win height +/-'
  
  ,'!  chk-seq-val/imp-val'
  ,'!  seq-val step>1'
  ,'-  exam -> clear err'
  ,'!  status:: seq-par: ok/err, data: imported/maked'
  
  ,'-  make-seq/load-seq -> log msg+date, hdr=undef?'
    
  
  ,'-  seq-job param check: msg + input-field class=d|e'
  
  ,'+  seq-lib show/copy to crnt '
  ,'+  seq-lib edit grp/elem '
  ,'~  seq-lib copy to crnt trim, chk to clear err'
  ,'-  seq-lib add crnt to lib - old grp or new grp'
  ,'-  seq-lib show/hide all grp (err in ff on show)'
  ,'-  seq-lib filter+sort by date,ord,client,prefix'
  
  ,'-  help-redesign, bg+en'
  ,'-  dataflow schema redesign en/bg'

  ,'?  titles bg/en'
  ,'?  eps2pdf: latex/distil 2:20k/ sumatra: 2:2k'
  ,'?  impose colected pdf barcodes from one file!?'
  ].join('<br>\n')}
/* todo: +=work, ~=partial_work -=miss, !=work_err, ?=how_todo
=== mainstream work
=get seria
=todo pers->svc-proj-lib in json
=todo collect dif serias in one table
--- etc
-?ind.csv(ff)
-autocheck for all main functions
-todo expand/colate flag > to ^ to >
-todo make/check md5

-xp: set_val():: id:xfil innerHTML: (No-barcode_00000)!=(No-barcode_00000) 
-xp: ... eps repl: open inp:...\eps\A19E00001.eps event:"Error: File not found" may be not created

seria  imp: file,hdr,byK          [>imp]  [+col]
seria  out: [val] ,ord,id,bcn,k,r [>out: csv_bcn,csv_ind,make-barcode ]  
colect out: [+val],ord,id,bcn,k,r [>out: csv_ind]
--- 	
// + file "#pers.js": read all, copy pers[i] to crnt "csv par"
// + make barcode: eps (svg)

// + preview
// ~ import 
// + seria 
// ~ export pers

// + set-hdr: which kol is @file_# or val_#; and then append .eps after files, but not after values
// ? combine val and file in 2kol
// ? (x) repeat values column for same ticket 

// - init by activex, not batch
// - eps-make by activex, not batch

// - import csv (n column) / set csv par+make csv
// ? import values from .csv get by rows (r1 from all kols, then r2,...) or by kols (k1 from all rows, then k2,...)
// -- inp/out csv delimiters[',',';','\t']

// ? append data at bottom or right, save appended 

// -- inp_matrix for Rm rows by Km kols, but get by kols or by rows (4kol*3row to eof) -> ar[k*r]

// - seria values by step +/-n
 
// + Zint.exe --batch --mirror --filetype=eps --cmyk -b 20 -i zint-data.txt

// ? run as indesign script or load it

*/
load_end();