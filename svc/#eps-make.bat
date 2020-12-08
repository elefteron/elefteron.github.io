@echo off
set root=%CD%
cd /d %root%

   set  user=%USERNAME%
   if "%user%"=="elefter" ( 
     set   desk=C:\$desk
     set   pers=C:\$desk\#pers
   ) else (
     :: %USERPROFILE% = c:\users\%user%
     set   desk=c:\users\%user%\Desktop
     set   pers=c:\users\%user%\Desktop\#pers
   )
   set data=%pers%\#data
   set  log=%pers%\#pers_%user%.log
   set tmp=%data%\tmp

:: '\\192.168.1.215\User\+Tery\barcodes' CMD does not support UNC paths as current directories. --- 
set zint="u:\+Tery\barcodes\zint 2.6.0.portable\Zint.exe"
:: set zint="F:\!prog.run\zint 2.6.2.portable\App\Zint\Zint.exe"
@if %user%==elefter set zint="F:\!prog.run\zint 2.6.2.portable\App\Zint\Zint.exe"

echo zint=%zint%
echo pers=%pers%
echo data=%data%
echo tmp =%tmp%

if NOT exist %zint% ( echo zint missing && @pause && @goto :EOF )

if NOT exist %data%\NUL ( echo #data dir. missing && @pause && @goto :EOF )
if NOT exist %tmp%\NUL  md %tmp%
cd /d %tmp%

set bt=%1
set ft=%2
set file=%data%\%3
echo barcodetype=%bt% filetype=%ft% file=%file%

if '%bt%'==''   ( @echo barcode type miss && @pause && @goto :EOF )
if '%file%'=='' ( @echo barcode datafile miss && @pause && @goto :EOF )
if NOT exist %file% ( @echo datafile not exist:: %file% && @pause && @goto :EOF )
if NOT exist %zint% ( @echo zint not exist:: %zint% && @pause && @goto :EOF )

:: if NOT exist %nm% ( @echo make single eps:: %nm%.eps && @pause
:: %zint% -o %tmp%\%nm%.eps -b %bt% -d "%nm%"	

set msg=... eps make start %time% %date% ::  user:%USERNAME% 
echo %msg% && pause

set starttime=%time:~0,2%:%time:~3,2%:%time:~6,2%
set msg=... eps make start %starttime% %date%::  user:%USERNAME% 
echo %msg%>>%log%

%zint% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
set stoptime=%time:~0,2%:%time:~3,2%:%time:~6,2%

set msg=... eps make  stop %stoptime% 
echo %msg%>>%log%
echo %msg%
pause
   :: err 102: Unable to read input file
   :: =0 was unexpected at this time.
:: if NOT ERRORLEVEL=0 @echo %err% ERRORLEVEL


:: cd /d %root%
:EOF