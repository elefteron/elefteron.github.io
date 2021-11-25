@echo off
set start_all=%time%
set root=%CD%
   set  user=%USERNAME%
   
   echo zint:%zint%
   set zint="F:\elefter.dev\zint-2.10.0\Zint.exe"
   if exist %zint% ( echo. ok && goto zint_end )
   echo. miss
:zint_end

   set  desk=%homedrive%\$desk
   echo desk=%desk%
if NOT exist %desk%\NUL md %desk%
if NOT exist %desk%\NUL ( echo.... missing %desk% dir. && @pause && @goto :EOF )
   echo. ok
   
   set  jobs=%homedrive%\$desk\$svc.jobs
   echo jobs=%jobs%
if NOT exist %jobs%\NUL md %jobs%
if NOT exist %jobs%\NUL ( echo.... missing %jobs% dir. && @pause && @goto :EOF )
   echo. ok

   set   log=%jobs%\svc.%user%.log
   echo. log=%log%

   set  eps=%jobs%\eps
   echo eps=%eps%
if NOT exist %eps%\NUL ( echo.... missing %eps% dir. && @pause && @goto :EOF )
   echo. ok

   cd /d %eps%
   
rem --- 3 input par
:: bt=20 - code-128
set bt=%1
:: ft=eps
set ft=%2
set file=%jobs%\%3

set msg=%0 %bt% %ft% %file%
echo ... %msg%
echo ... %msg%>>%log%
:: echo @%msg%>re-make.cmd
set msg=
if '%bt%'==''       set msg=%msg% barcode type miss;
if '%file%'==''     set msg=%msg% barcode datafile miss;
if NOT exist %file% set msg=%msg% datafile not exist: %file%;
if NOT exist %zint% set msg=%msg% zint not exist: %zint%;
if '%msg%'=='' goto epsmake

@echo %msg%
@echo %msg%>>%log%
@pause
@goto :EOF 

:epsmake
set starttime=%time:~0,2%:%time:~3,2%:%time:~6,2%
set msg=... 'svc-eps-make.cmd' begin %starttime% user:%USERNAME% 
echo %msg%>>%log%
echo %msg% && pause

:: %zint% -o %eps%\%nm%.eps -b %bt% -d "%nm%"	

%zint% --batch --mirror --filetype=%ft% --cmyk -b %bt% -i %file%
set stoptime=%time:~0,2%:%time:~3,2%:%time:~6,2%

:: --- calculate duration
::  set start_all=%time%
    set stop_all=%time%
    call %root%\dur.cmd %start_all% %stop_all%
:: ---

set msg=... 'svc-eps-make.cmd' final: %stoptime% dur:%dur%
echo %msg%>>%log%
echo %msg%
   :: err 102: Unable to read input file
   :: =0 was unexpected at this time.
if NOT ERRORLEVEL=0 @echo %err% ERRORLEVEL
set /p ask=... end ...

:: cd /d %root%
:EOF