_load._new('scr/album-ikoni.js')
// *** �� albumfile, albumdir, scandir: ����� �� ����� � � �������� ����� ��� ��� ����� ���    
// *** ��� ����� ������� ��� �������� \ ��� / ��� �� ��������� \\ 
// *** ��� ����� �� ����� � ��� ����� ��� ������ �� ����� � file:// ��� http://
var root=''//pathicons
var albumdir=root+""; /* ������ �� ������� �� ����� */ 
var scandir =root+""//+"big/"; /* ��������� ������ - ������  */
var scanext ="tif";
var head    ='<h1><center>'
        +'����� ����������� �����'
        +'</center></h1>'+eol
var foot ='' 
//      +'<h0>'+eot
//      +  '� ����� �� �������, �������� � ������'+eot
//      +'</h0>'
     // +'<div class="footer">'
     // +  '<a href="mailto:elefter@abv.bg" title="������� ��������">����</a>. '
     // +'</div>'
var album=[ ['','']
//  NAME,EXT,SIZE,DATE,TIME,ATTR
    ,['HristosPantokrator'        ,'jpg',30,'','','','������� �����������']
    ,['ISUS2'                     ,'jpg',30,'','','','����']
    ,['sv.Bogorodica'             ,'jpg',30,'','','','��.����������']
    ,['sv.Bogorodica Jerusalem'   ,'jpg',30,'','','','��.���������� ������������']
    ,['RojdestvoHristovo'         ,'jpg',30,'','','','��������� ��������']
    ,['sv.IvanRilski'             ,'jpg',30,'','','','��.���� ������']
    ,['Sv Georgi'                 ,'jpg',30,'','','','��.������']
    ,['sv.Georgi 2'               ,'jpg',30,'','','','��.������']
    ,['Sv Nikolai'                ,'jpg',30,'','','','��.������� �����������']
    ,['sv.Mina'                   ,'jpg',30,'','','','��.����']
    ,['Sofia,Viara Nadejda,Ljubov','jpg',30,'','','','��.��.����, ������� � ����� � ����� �� �����']
    ,['arh.Serafim Sobolev'       ,'jpg',30,'','','','��.������� �������� ����������']
    ]
//  f[##]=['?'                         ,'jpg',30,'','','','?']
//  fname=0; fext=1; fsize=2; fdate=3; ftime=4; fatr=5; desc=6; 
_load._end()