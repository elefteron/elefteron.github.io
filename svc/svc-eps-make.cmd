@echo off
set start_all=%time%
set root=%CD%
cd /d %root%
   set  user=%USERNAME%

:: '\\192.168.1.215\User\+Tery\barcodes' CMD does not support UNC paths as current directories. --- 
:: set zint="F:\!prog.run\zint 2.6.2.portable\App\Zint\Zint.exe"
:: set zint="u:\+Tery\barcodes\zint 2.6.0.portable\Zint.exe"
   set zint="..\zint-2.10.0\Zint.exe"
if NOT exist %zint% ( echo zint missing && @pause && @goto :EOF )
   echo zint=%zint%
   
:: set  desk=C:\$desk
   set  desk=%homedrive%\$desk
   echo desk=%desk%
if NOT exist %desk%\NUL md %desk%
if NOT exist %desk%\NUL ( echo.... missing %desk% dir. && @pause && @goto :EOF )
   
:: set  pers=C:\$desk\$svc.jobs
   set  jobs=%homedrive%\$desk\$svc.jobs
   echo jobs=%jobs%
if NOT exist %jobs%\NUL md%jobs%
if NOT exist %jobs%\NUL ( echo.... missing %jobs% dir. && @pause && @goto :EOF )
   set   log=%jobs%\svc.%user%.log

   set  eps=%jobs%\eps
if NOT exist %jobs%\NUL ( echo.... missing %jobs% dir. && @pause && @goto :EOF )
   echo eps=%jobs%
      
:: set  tmp=%jobs%\tmp
   set  tmp=%jobs%\eps
if NOT exist %tmp%\NUL  md %tmp%
   echo tmp=%tmp%
   
:: cd /d %tmp%
   cd /d %eps%

:: bt=20 - code-128
set bt=%1
:: ft=eps
set ft=%2
set file=%jobs%\%3

set starttime=%time:~0,2%:%time:~3,2%:%time:~6,2%
set msg=... 'svc-eps-make.cmd' begin %starttime% %date%::  user:%USERNAME% 
echo %msg%>>%log%
echo %msg% && pause

set msg=%0 %bt% %ft% %file%
echo ... %msg%
echo ... %msg%>>%log%
:: echo @%msg%>re-make.cmd

if '%bt%'==''       ( set msg=' barcode type miss'           && echo %msg% && echo %msg%>>%log% && @pause && @goto :EOF )
if '%file%'==''     ( set msg=' barcode datafile miss'       && echo %msg% && echo %msg%>>%log% && @pause && @goto :EOF )
if NOT exist %file% ( set msg=' datafile not exist:: %file%' && echo %msg% && echo %msg%>>%log% && @pause && @goto :EOF )
if NOT exist %zint% ( set msg=' zint not exist:: %zint%'     && echo %msg% && echo %msg%>>%log% && @pause && @goto :EOF )

:: %zint% -o %eps%\%nm%.eps -b %bt% -d "%nm%"	

%zint% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
set stoptime=%time:~0,2%:%time:~3,2%:%time:~6,2%

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
    call %root%\dur.cmd %start_all% %stop_all%
:: ---

set msg=... 'svc-eps-make.cmd' final %stoptime% dur:%dur%
echo %msg%>>%log%
echo %msg%
   :: err 102: Unable to read input file
   :: =0 was unexpected at this time.
if NOT ERRORLEVEL=0 @echo %err% ERRORLEVEL
set /p ask=... end ...

:: cd /d %root%
:EOF