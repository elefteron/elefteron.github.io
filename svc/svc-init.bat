@echo off
rem encoding ansi
set err=
set svcusr=$svc.usr
@echo.=== run "svc-setup.bat" %date% %time% ===
:: (by elefter@abv.bg at 2020-11-27..)
:: F:\!prog.run\SVC\SVC-8
:: F:\elefter.dev\!GitHub.local\svc-9
   set  user=%USERNAME%
   echo user="%user%">%svcusr%
:: \\UNC not supported, so cannot start
   if "%user%"=="elefter" (
     set   desk=C:\$desk
     echo desk="C:\\$desk\\">>%svcusr%
     set   pers=C:\$desk\#pers
     echo pers="C:\\$desk\\#pers\\">>%svcusr%
   ) else (
     :: %USERPROFILE% = c:\users\%user%
     set   desk=c:\users\%user%\Desktop
     echo desk="c:\\users\\%user%\\Desktop\\">>%svcusr%
     set   pers=c:\users\%user%\Desktop\#pers
     echo pers="c:\\users\\%user%\\Desktop\\#pers\\">>%svcusr%
   )
ver | find "Microsoft Windows XP [Version 5.1.260" >NUL && ( set OS_=XP&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.1.760" >NUL && ( set OS_=7&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.2.920" >NUL && ( set OS_=8&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.3.960" >NUL && ( set OS_=8.1& goto end_os_chk )
set OS_=?
:end_os_chk
   echo os  ="windows %OS_%">>%svcusr%
   echo comp="%COMPUTERNAME%">>%svcusr%
   set data=%pers%\#data
   set  log=%pers%\$svc_%user%.log

:: set test=skip/test if case of miss/bad assoc see assoc.repair dir
set test=skip
set ass=%pers%\$assoc.log
echo ... %test%: export assoc to %ass%

goto %test%
:test
  echo --- %test%: export assoc to %ass%>%ass%
  assoc .bat >>%ass%
  assoc .cmd >>%ass%
  assoc .com >>%ass%
  assoc .exe >>%ass%
  assoc .reg >>%ass%
  echo. >>%ass%
  assoc .hta >>%ass%
  assoc .htm >>%ass%
  assoc .html >>%ass%
  assoc .js >>%ass%
  assoc .vbs >>%ass%
:skip

echo ... user: %user%
echo ... desk: %desk%
echo ... pers: %pers%

set msg=
if NOT exist %desk% set msg='... NOT exist desktop folder: %desk%'
if NOT "%msg%"=="" echo.%msg%
if NOT "%msg%"=="" set err=y

@echo ... pers: %pers%
if NOT exist %pers%\NUL md %pers%

@echo ... data: %data%
if NOT exist %data%\NUL md %data%

@echo ... _log: %log%
set msg=
if NOT exist %log%  echo.>%log%
if NOT exist %log%  set msg='... cannot make log file: %log%'
if NOT "%msg%"==""  echo.%msg%
if NOT "%msg%"==""  set err=y

if NOT "%err%"=="" (
  echo ... errors occured
  goto :hlp
)

set cust=%pers%\desktop.ini
if NOT exist %cust% (
  echo.[.ShellClassInfo]>%cust%
  echo.IconResource=C:\Windows\system32\SHELL32.dll,305>>%cust%
  attrib %cust% +s +h
)

if NOT exist %systemroot%\fonts\Anastasia.ttf (
:: copy font\Anastasia.ttf %systemroot%\fonts
:: echo.To install font "Anastasia.ttf" UAC can ask confirm for regedit run::
:: regedit /s addfnt.reg
  echo ... missing font anastasia, try to install it manually
  pause
)

@echo ... %USERNAME% SVC at %date% %time% on %pers%
echo.>>%log%
@echo ... %USERNAME% SVC at %date% %time% on %pers%>>%log%

@echo.=== %date% %time% ===
:: @pause
goto :run

:hlp
@echo.
@echo usage: #pers-init.bat
@echo.
@echo make pers dir: %pers%
@echo make data dir: %pers%\#data
@echo make log file: %log%
@echo.
@echo.=== %date% %time% ===
   @pause

:run
:: set br=iexplore
:: set br=firefox
:: set br=seamonkey
:: start %br% svc.htm

:: START mshta.exe svc.hta
@echo START svc.hta
 pause

:eof
