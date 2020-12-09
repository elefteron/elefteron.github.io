@echo off
set dbg=n
:: set root=F:\elefter.dev\my-dev+\proj\
   set root=%~dp0
   set p=%1
echo.root='%root%' par:'%p%'
if %dbg%==y pause

ver | find "Microsoft Windows XP [Version 5.1.260" >NUL && ( set OS_=XP&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.1.760" >NUL && ( set OS_=7&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.2.920" >NUL && ( set OS_=8&  goto end_os_chk )
ver | find "Microsoft Windows [Version 6.3.960" >NUL && ( set OS_=8.1& goto end_os_chk )
ver | find "Windows NT [Version 10.0." >NUL && ( set OS_=10& goto end_os_chk )
set OS_=?
:end_os_chk

 set sys={p:"%p%",os:"window$ %OS_%",comp:"%COMPUTERNAME%", user:"%USERNAME%"}
:: , date:"%date%", time:"%time:~0,2%.%time:~3,2%"}
echo.sys=%sys%;>"%root%$sys.js"
if %dbg%==y pause

echo.run: START %root%proj.hta %p%;
:: 32:
:: START /wait mshta.exe %root%proj.hta %p%;
:: START       mshta.exe %root%proj.hta %p%;
:: 64:
   START                 %root%proj.hta %p%;
:end
:: pause
