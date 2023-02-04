@echo off
echo... 2.dir2js: recreate %src%\seq-user.js and dump vars inside 
set msg='undefined src'
if '%src%'=='' (echo %msg% && goto :eof)
if '%sequsr%'=='' set sequsr=%src%\seq-user.js
:: for folders replace '\' to '/' because of js syntax rules
:: folder/file name chars that can make problems in batch (.cmd/.bat): %*% !*! (*) ^* cyrillic
set msg={src:"%src:\=/%/", jobs:"%jobs:\=/%/", file:"seq-%user%.log" made_by:'SEQ-init.cmd', at:'%date% %start_all%'}

echo.load_new('seq-user.js') > %sequsr%
echo.// -- %msg% -- >> %sequsr%
:: echo. src="%src:\=/%/">>%sequsr%
   echo. src="%src:\=\\%\\">>%sequsr%

   echo.root="%root:\=/%/">>%sequsr%
   echo.jobs="%jobs:\=/%/">>%sequsr%
   echo. eps="%eps:\=/%/">>%sequsr%
   echo.  ps="%ps:\=/%/">>%sequsr%
   echo. pdf="%pdf:\=/%/">>%sequsr%
   echo. log="%log:\=/%">>%sequsr%

   echo.zintdir="%zintdir:\=/%/">>%sequsr%
   echo.zint="%zint:\=/%">>%sequsr%
   
   echo.user="%user:\=/%">>%sequsr%
   echo.comp="%COMPUTERNAME%">>%sequsr%
   echo.  os="%OS_%">>%sequsr%
echo.load_end()// -- >>%sequsr%
:: if "%test%"=="y" ( type %sequsr% | more && set /p ask=... ? is ok "%sequsr%" )
:eof
echo... end 
:: @pause