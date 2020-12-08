/* ах, чудна българска земьо, полюшвай цъфтящи жита! */
bcn_=[{bcnum: 0,bcid:'No-barcode'   ,bcnm:'no barcode'} 
     ,{bcnum:  1,bcid:'Code-11'      ,bcnm:'Code 11'}
/* 
+ The barcodes used by GS1 include 
EAN-13, UPC-A, EAN-8, UPC-E, GS1 DataBar family of symbols, GS1-128, ITF-14, GS1 DataMatrix, GS1 QR Code, and Composite Component.
https://www.gs1.org/standards/get-barcodes

+ GS1 префикс: 380 GS1-България
https://www.gs1bg.org/

+ EAN/UPC family
Instantly recognisable 1D barcodes used in retail all over the world.
https://www.gs1.org/barcodes/ean-upc

+ DataBar family
Compact 1D barcodes that can hold additional product attributes such as the weight of fresh foods. 
https://www.gs1.org/barcodes/databar

+ One-dimensional (1D) barcodes used exclusively in general distribution and logistics
Versatile 1D barcodes used to represent ID keys and attributes in a distribution environment.
https://www.gs1.org/barcodes/1d-general-distribution

+ Two-dimensional (2D) barcodes
Compact, high-capacity 2D symbols suitable for representing all GS1 keys and attributes.
https://www.gs1.org/barcodes/2d

See details>
*-/
//  ,{bcnum:  2,bcid:'Code2of5'     ,bcnm:'Standard Code 2 of 5'}
//  ,{bcnum:  3,bcid:'     '        ,bcnm:'Interleaved 2 of 5'}
//  ,{bcnum:  4,bcid:'     '        ,bcnm:'Code 2 of 5 IATA'}
//  ,{bcnum:  6,bcid:'     '        ,bcnm:'Code 2 of 5 Data Logic'}
//  ,{bcnum:  7,bcid:'     '        ,bcnm:'Code 2 of 5 Industrial'}
/* */
    ,{bcnum:  8,bcid:'Code-39'      ,bcnm:'Code 3 of 9 (Code 39)'}
    ,{bcnum:  9,bcid:'Code-39+'     ,bcnm:'Extended Code 3 of 9 (Code 39+)'}
    ,{bcnum: 13,bcid:'EAN-13'       ,bcnm:'EAN (Including EAN-8 and EAN-13)'}			//
    ,{bcnum: 14,bcid:'EAN+'         ,bcnm:'EAN + Check Digit'}
    ,{bcnum: 16,bcid:'GS1-128'      ,bcnm:'GS1-128 (UCC.EAN-128)'}
    ,{bcnum: 18,bcid:'Codabar'      ,bcnm:'Codabar'}
    ,{bcnum: 20,bcid:'Code-128'     ,bcnm:'Code 128 (automatic subset switching)'}    //
//  ,{bcnum: 21,bcid:'     '        ,bcnm:'Deutshe Post Leitcode'}
//  ,{bcnum: 22,bcid:'     '        ,bcnm:'Deutshe Post Identcode'}
    ,{bcnum: 23,bcid:'Code-16K'     ,bcnm:'Code 16K'}
    ,{bcnum: 24,bcid:'Code-49'      ,bcnm:'Code 49'}
    ,{bcnum: 25,bcid:'Code-93'      ,bcnm:'Code 93'}
/* */
//  ,{bcnum: 28,bcid:'?'            ,bcnm:'Flattermarken'}
    ,{bcnum: 29,bcid:'GS1 DataBar-14' ,bcnm:'GS1 DataBar-14'}
    ,{bcnum: 30,bcid:'GS1 DataBar Lim',bcnm:'GS1 DataBar Limited'}
    ,{bcnum: 31,bcid:'GS1 DataBar Ext',bcnm:'GS1 DataBar Extended'}
//  ,{bcnum: 32,bcid:'?'            ,bcnm:'Telepen Alpha'}
/* */
    ,{bcnum: 34,bcid:'UPC-A'        ,bcnm:'UPC A'}
    ,{bcnum: 35,bcid:'UPC-A+'       ,bcnm:'UPC A + Check Digit'}
    ,{bcnum: 37,bcid:'UPC-E'        ,bcnm:'UPC E'}
    ,{bcnum: 38,bcid:'UPC-E+'       ,bcnm:'UPC E + Check Digit'}
    ,{bcnum: 40,bcid:'PostNet'      ,bcnm:'PostNet'}
/* *-/
//  ,{bcnum: 47,bcid:'?'            ,bcnm:'MSI Plessey'}
//  ,{bcnum: 49,bcid:'?'            ,bcnm:'FIM'}
//  ,{bcnum: 50,bcid:'?'            ,bcnm:'LOGMARS'}
//  ,{bcnum: 51,bcid:'?'            ,bcnm:'Pharmacode One-Track'}
//  ,{bcnum: 52,bcid:'?'            ,bcnm:'PZN'}
//  ,{bcnum: 53,bcid:'?'            ,bcnm:'Pharmacode Two-Track'}
/* */
    ,{bcnum: 55,bcid:'PDF417'       ,bcnm:'PDF417'}
    ,{bcnum: 56,bcid:'PDF417-Tr'    ,bcnm:'PDF417 Truncated'}
    ,{bcnum: 57,bcid:'Maxicode'     ,bcnm:'Maxicode'}
    ,{bcnum: 58,bcid:'QR-Code'      ,bcnm:'QR Code'}
    ,{bcnum: 60,bcid:'Code-128B'    ,bcnm:'Code 128 (Subset B)'}
/* *-/
//  ,{bcnum: 63,bcid:'Australia-Post-Stdm' ,bcn:'Australia Post Standard Customer'}
//  ,{bcnum: 66,bcid:'Australia-Post-RP'm  ,bcn:'Australia Post Reply Paid'}
//  ,{bcnum: 67,bcid:'Australia-Post-PR'm  ,bcn:'Australia Post Routing'}
//  ,{bcnum: 68,bcid:'Australia-Post-Redm' ,bcn:'Australia Post Redirection'}
/* */
    ,{bcnum: 69,bcid:'ISBN'         ,bcnm:'ISBN (EAN-13 with verification stage)'}
    ,{bcnum: 70,bcid:'RM4SCC'       ,bcnm:'Royal Mail 4 State (RM4SCC)'}
    ,{bcnum: 71,bcid:'ECC200'       ,bcnm:'Data Matrix (ECC200)'}
    ,{bcnum: 72,bcid:'EAN-14'       ,bcnm:'EAN-14'}
    ,{bcnum: 74,bcid:'Codablk-F'    ,bcnm:'Codablock-F'}
    ,{bcnum: 75,bcid:'NVE-18'       ,bcnm:'NVE-18'}
    ,{bcnum: 76,bcid:'JP-Code'      ,bcnm:'Japanese Postal Code'}
    ,{bcnum: 77,bcid:'Korea-Post'   ,bcnm:'Korea Post'}
    ,{bcnum: 79,bcid:'GS1-DB14S'    ,bcnm:'GS1 DataBar-14 Stacked'}
    ,{bcnum: 80,bcid:'GS1-DB14So'   ,bcnm:'GS1 DataBar-14 Stacked Omnidirectional'}
    ,{bcnum: 81,bcid:'GS1-DBexpS'   ,bcnm:'GS1 DataBar Expanded Stacked'}
    ,{bcnum: 82,bcid:'PLANET'       ,bcnm:'PLANET'}
    ,{bcnum: 84,bcid:'mPDF417'      ,bcnm:'MicroPDF417'}
    ,{bcnum: 85,bcid:'USPS'         ,bcnm:'USPS OneCode'}
    ,{bcnum: 86,bcid:'Plessey'      ,bcnm:'Plessey Code'}
    ,{bcnum: 87,bcid:'Telepen-N'    ,bcnm:'Telepen Numeric'}
    ,{bcnum: 89,bcid:'ITF-14'       ,bcnm:'ITF-14'}
    ,{bcnum: 90,bcid:'Dutch-KIX'    ,bcnm:'Dutch Post KIX Code'}
    ,{bcnum: 92,bcid:'Aztec'        ,bcnm:'Aztec Code'}
    ,{bcnum: 93,bcid:'DAFT'         ,bcnm:'DAFT Code'}
    ,{bcnum: 97,bcid:'m-QR-Code'    ,bcnm:'Micro QR Code'}
/* *-/
//  ,{bcnum: 98,bcid:'HIBC-Code-128',bcnm:'HIBC Code 128'}
//  ,{bcnum: 99,bcid:'HIBC-Code-39' ,bcnm:'HIBC Code 39'}
//  ,{bcnum:102,bcid:'HIBC-ECC200'  ,bcnm:'HIBC Data Matrix ECC200'}
//  ,{bcnum:104,bcid:'HIBC-QR'      ,bcnm:'HIBC QR Code'}
//  ,{bcnum:106,bcid:'HIBC-PDF417'  ,bcnm:'HIBC PDF417'}
//  ,{bcnum:108,bcid:'HIBC-mPDF417' ,bcnm:'HIBC MicroPDF417'}
//  ,{bcnum:112,bcid:'HIBC-Aztec'   ,bcnm:'HIBC Aztec Code'}
/* */
    ,{bcnum:115,bcid:'DotCode'      ,bcnm:'DotCode'}
    ,{bcnum:116,bcid:'Han-Xin'      ,bcnm:'Han Xin (Chinese Sensible) Code'}
    ,{bcnum:128,bcid:'Aztec-Runes'  ,bcnm:'Aztec Runes'}
    ,{bcnum:129,bcid:'Code-32'      ,bcnm:'Code 32'}
/* *-/
//  ,{bcnum:130,bcid:'?'            ,bcnm:'Composite Symbol with EAN linear component'}
//  ,{bcnum:131,bcid:'?'            ,bcnm:'Composite Symbol with GS1-128 linear component'}
//  ,{bcnum:132,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar-14 linear component'}
//  ,{bcnum:133,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar Limited component'}
//  ,{bcnum:134,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar Extended component'}
//  ,{bcnum:135,bcid:'?'            ,bcnm:'Composite Symbol with UPC A linear component'}
//  ,{bcnum:136,bcid:'?'            ,bcnm:'Composite Symbol with UPC E linear component'}
//  ,{bcnum:137,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar-14 Stacked component'}
//  ,{bcnum:138,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar-14 Stacked Omnidirectional component'}
//  ,{bcnum:139,bcid:'?'            ,bcnm:'Composite Symbol with GS1 DataBar Expanded Stacked component'}
/* */
    ,{bcnum:140,bcid:'Channel-Code' ,bcnm:'Channel Code'}
    ,{bcnum:141,bcid:'Code-One'     ,bcnm:'Code One'}
    ,{bcnum:142,bcid:'Grid-Matrix'  ,bcnm:'Grid Matrix'}
  ]; 
  
  function bcn_id(bcn_num){ var l=bcn_.length, i  // usage: bcn_[bcn_id(par[p].bcn)].bcid
  for(i=1; i<=l-1;i++){ if(bcn_num==bcn_[i].bcnum) return bcn_[i].bcid; }
    return bcn_[0].bcid
  }
  // alert(bcn_.length); // 50  
  // _ISBN=69; _ean14=72; _ean13=13; _code128=20;       barcodetype=_code128