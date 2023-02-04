load_new('zint-barcodes.js');
/* ах, чудна българска земьо, полюшвай цъфтящи жита! 
https://www.zint.org.uk/manual/chapter/4
*/
bcn_=[ 
 {bcnum:  0,bcid:""               ,bcnm:"no barcode"} // +[95]
,{bcnum:  1,bcid:"CODE11         ",bcnm:"Code 11                                                                "}
,{bcnum:  2,bcid:"C25STANDARD    ",bcnm:"Standard Code 2 of 5                                                   "}
,{bcnum:  3,bcid:"C25INTER       ",bcnm:"Interleaved 2 of 5                                                     "}
,{bcnum:  4,bcid:"C25IATA        ",bcnm:"Code 2 of 5 IATA                                                       "}
,{bcnum:  6,bcid:"C25LOGIC       ",bcnm:"Code 2 of 5 Data Logic                                                 "}
,{bcnum:  7,bcid:"C25IND         ",bcnm:"Code 2 of 5 Industrial                                                 "}
,{bcnum:  8,bcid:"CODE39         ",bcnm:"Code 3 of 9 (Code 39)                                                  "}
,{bcnum:  9,bcid:"EXCODE39       ",bcnm:"Etended Code 3 of 9 (Code 39+)                                         "}
,{bcnum: 13,bcid:"EANX           ",bcnm:"EAN (Including EAN-8 and EAN-13)                                       "}
,{bcnum: 14,bcid:"EANX_CHK       ",bcnm:"EAN + Check Digit                                                      "}
,{bcnum: 16,bcid:"GS1_128        ",bcnm:"GS1-128 (UCC.EAN-128)                                                  "}
,{bcnum: 18,bcid:"CODABAR        ",bcnm:"Codabar                                                                "}
,{bcnum: 20,bcid:"CODE128        ",bcnm:"Code 128 (automatic subset switching)                                  "}
,{bcnum: 21,bcid:"DPLEIT         ",bcnm:"Deutshe Post Leitcode                                                  "}
,{bcnum: 22,bcid:"DPIDENT        ",bcnm:"Deutshe Post Identcode                                                 "}
,{bcnum: 23,bcid:"CODE16K        ",bcnm:"Code 16K                                                               "}
,{bcnum: 24,bcid:"CODE49         ",bcnm:"Code 49                                                                "}
,{bcnum: 25,bcid:"CODE93         ",bcnm:"Code 93                                                                "}
,{bcnum: 28,bcid:"FLAT           ",bcnm:"Flattermarken                                                          "}
,{bcnum: 29,bcid:"DBAR_OMN       ",bcnm:"GS1 DataBar Omnidirectional (including GS1 DataBar Truncated)          "}
,{bcnum: 30,bcid:"DBAR_LTD       ",bcnm:"GS1 DataBar Limited                                                    "}
,{bcnum: 31,bcid:"DBAR_EXT       ",bcnm:"GS1 DataBar Etended                                                    "}
,{bcnum: 32,bcid:"TELEPEN        ",bcnm:"Telepen Alpha                                                          "}
,{bcnum: 34,bcid:"UPCA           ",bcnm:"UPC-A                                                                  "}
,{bcnum: 35,bcid:"UPCA_CHK       ",bcnm:"UPC-A + Check Digit                                                    "}
,{bcnum: 37,bcid:"UPCE           ",bcnm:"UPC-E                                                                  "}
,{bcnum: 38,bcid:"UPCE_CHK       ",bcnm:"UPC-E + Check Digit                                                    "}
,{bcnum: 40,bcid:"POSTNET        ",bcnm:"PostNet                                                                "}
,{bcnum: 47,bcid:"MSI_PLESSEY    ",bcnm:"MSI Plessey                                                            "}
,{bcnum: 49,bcid:"FIM            ",bcnm:"FIM                                                                    "}
,{bcnum: 50,bcid:"LOGMARS        ",bcnm:"LOGMARS                                                                "}
,{bcnum: 51,bcid:"PHARMA         ",bcnm:"Pharmacode One-Track                                                   "}
,{bcnum: 52,bcid:"PZN            ",bcnm:"PZN                                                                    "}
,{bcnum: 53,bcid:"PHARMA_TWO     ",bcnm:"Pharmacode Two-Track                                                   "}
,{bcnum: 55,bcid:"PDF417         ",bcnm:"PDF417                                                                 "}
,{bcnum: 56,bcid:"PDF417COMP     ",bcnm:"Compact PDF417 (Truncated PDF417)                                      "}
,{bcnum: 57,bcid:"MAXICODE       ",bcnm:"Maxicode                                                               "}
,{bcnum: 58,bcid:"QRCODE         ",bcnm:"QR Code                                                                "}
,{bcnum: 60,bcid:"CODE128B       ",bcnm:"Code 128 (Subset B)                                                    "}
,{bcnum: 63,bcid:"AUSPOST        ",bcnm:"Australia Post Standard Customer                                       "}
,{bcnum: 66,bcid:"AUSREPLY       ",bcnm:"Australia Post Reply Paid                                              "}
,{bcnum: 67,bcid:"AUSROUTE       ",bcnm:"Australia Post Routing                                                 "}
,{bcnum: 68,bcid:"AUSREDIRECT    ",bcnm:"Australia Post Redirection                                             "}
,{bcnum: 69,bcid:"ISBNX          ",bcnm:"ISBN (EAN-13 with verification stage)                                  "}
,{bcnum: 70,bcid:"RM4SCC         ",bcnm:"Royal Mail 4 State (RM4SCC)                                            "}
,{bcnum: 71,bcid:"DATAMATRIX     ",bcnm:"Data Matrix (ECC200)                                                   "}
,{bcnum: 72,bcid:"EAN14          ",bcnm:"EAN-14                                                                 "}
,{bcnum: 73,bcid:"VIN            ",bcnm:"Vehicle Identification Number (America)                                "}
,{bcnum: 74,bcid:"CODABLOCKF     ",bcnm:"Codablock-F                                                            "}
,{bcnum: 75,bcid:"NVE18          ",bcnm:"NVE-18                                                                 "}
,{bcnum: 76,bcid:"JAPANPOST      ",bcnm:"Japanese Postal Code                                                   "}
,{bcnum: 77,bcid:"KOREAPOST      ",bcnm:"Korea Post                                                             "}
,{bcnum: 79,bcid:"DBAR_STK       ",bcnm:"GS1 DataBar Stacked (stacked version of GS1 DataBar Truncated)         "}
,{bcnum: 80,bcid:"DBAR_OMNSTK    ",bcnm:"GS1 DataBar-14 Stacked Omnidirectional                                 "}
,{bcnum: 81,bcid:"DBAR_EXPSTK    ",bcnm:"GS1 DataBar Expanded Stacked                                           "}
,{bcnum: 82,bcid:"PLANET         ",bcnm:"PLANET                                                                 "}
,{bcnum: 84,bcid:"MICROPDF417    ",bcnm:"MicroPDF417                                                            "}
,{bcnum: 85,bcid:"USPS_IMAIL     ",bcnm:"USPS Intelligent Mail (OneCode)                                        "}
,{bcnum: 86,bcid:"PLESSEY        ",bcnm:"Plessey Code                                                           "}
,{bcnum: 87,bcid:"TELEPEN_NUM    ",bcnm:"Telepen Numeric                                                        "}
,{bcnum: 89,bcid:"ITF14          ",bcnm:"ITF-14                                                                 "}
,{bcnum: 90,bcid:"KIX            ",bcnm:"Dutch Post KIX Code                                                    "}
,{bcnum: 92,bcid:"AZTEC          ",bcnm:"Aztec Code                                                             "}
,{bcnum: 93,bcid:"DAFT           ",bcnm:"DAFT Code                                                              "}
,{bcnum: 96,bcid:"DPD            ",bcnm:"DPD Code                                                               "}
,{bcnum: 97,bcid:"MICROQR        ",bcnm:"Micro QR Code                                                          "}
,{bcnum: 98,bcid:"HIBC_128       ",bcnm:"HIBC Code 128                                                          "}
,{bcnum: 99,bcid:"HIBC_39        ",bcnm:"HIBC Code 39                                                           "}
,{bcnum:102,bcid:"HIBC_DM        ",bcnm:"HIBC Data Matrix (ECC200)                                              "}
,{bcnum:104,bcid:"HIBC_QR        ",bcnm:"HIBC QR Code                                                           "}
,{bcnum:106,bcid:"HIBC_PDF       ",bcnm:"HIBC PDF417                                                            "}
,{bcnum:108,bcid:"HIBC_MICPDF    ",bcnm:"HIBC MicroPDF417                                                       "}
,{bcnum:110,bcid:"HIBC_BLOCKF    ",bcnm:"HIBC Codablock-F                                                       "}
,{bcnum:112,bcid:"HIBC_AZTEC     ",bcnm:"HIBC Aztec Code                                                        "}
,{bcnum:115,bcid:"DOTCODE        ",bcnm:"DotCode                                                                "}
,{bcnum:116,bcid:"HANXIN         ",bcnm:"Han Xin (Chinese Sensible) Code                                        "}
,{bcnum:121,bcid:"MAILMARK       ",bcnm:"Royal Mail 4-State Mailmark                                            "}
,{bcnum:128,bcid:"AZRUNE         ",bcnm:"Aztec Runes                                                            "}
,{bcnum:129,bcid:"CODE32         ",bcnm:"Code 32                                                                "}
,{bcnum:130,bcid:"EANX_CC        ",bcnm:"Composite Symbol with EAN linear component                             "}
,{bcnum:131,bcid:"GS1_128_CC     ",bcnm:"Composite Symbol with GS1-128 linear component                         "}
,{bcnum:132,bcid:"DBAR_OMN_CC    ",bcnm:"Composite Symbol with GS1 DataBar-14 linear component                  "}
,{bcnum:133,bcid:"DBAR_LTD_CC    ",bcnm:"Composite Symbol with GS1 DataBar Limited component                    "}
,{bcnum:134,bcid:"DBAR_EXP_CC    ",bcnm:"Composite Symbol with GS1 DataBar Etended component                    "}
,{bcnum:135,bcid:"UPCA_CC        ",bcnm:"Composite Symbol with UPC A linear component                           "}
,{bcnum:136,bcid:"UPCE_CC        ",bcnm:"Composite Symbol with UPC E linear component                           "}
,{bcnum:137,bcid:"DBAR_STK_CC    ",bcnm:"Composite Symbol with GS1 DataBar-14 Stacked component                 "}
,{bcnum:138,bcid:"DBAR_OMNSTK_CC ",bcnm:"Composite Symbol with GS1 DataBar-14 Stacked Omnidirectional component "}
,{bcnum:139,bcid:"DBAR_EXPSTK_CC ",bcnm:"Composite Symbol with GS1 DataBar Epanded Stacked component            "}
,{bcnum:140,bcid:"CHANNEL        ",bcnm:"Channel Code                                                           "}
,{bcnum:141,bcid:"CODEONE        ",bcnm:"Code One                                                               "}
,{bcnum:142,bcid:"GRIDMATRIX     ",bcnm:"Grid Matrix                                                            "}
,{bcnum:143,bcid:"UPNQR          ",bcnm:"UPNQR - Univerzalni Plačilni Nalog QR                                  "}
,{bcnum:144,bcid:"ULTRA          ",bcnm:"Ultracode                                                              "}
,{bcnum:145,bcid:"RMQR           ",bcnm:"Rectanglular Micro QR Code (rMQR)                                      "}
];
for(var i=0; i<=bcn_.length-1;i++) { bcn_[i].bcid=bcn_[i].bcid.trim();  bcn_[i].bcnm=bcn_[i].bcnm.trim(); }
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
*/
  function bcn_id(bcn_num){ // usage: bcn_[bcn_id(bcn)].bcid
  //msg('bcn_id('+bcn_num+')=')
    for(var i=0; i<=bcn_.length-1;i++){ 
	  if(bcn_num==bcn_[i].bcnum) {
	  // msg(i+':"'+bcn_[i].bcid+'"\n')
	     return bcn_[i].bcid; 
	  }
	}
    return null
  }
  // alert(bcn_.length); // 50
  // _ISBN=69; _ean14=72; _ean13=13; _code128=20;       barcodetype=_code128
load_end();
