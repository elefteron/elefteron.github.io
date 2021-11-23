@echo off
:: https://stackoverflow.com/questions/9922498/calculate-time-difference-in-windows-batch-file
set start_time=%1
set stop_time=%2
rem Get start time:
for /F "tokens=1-4 delims=:.," %%a in ("%start_time%") do (
   set /A "start=(((%%a*60)+1%%b %% 100)*60+1%%c %% 100)*100+1%%d %% 100"
)

rem Get stop time:
for /F "tokens=1-4 delims=:.," %%a in ("%stop_time%") do (
   set /A "stop=(((%%a*60)+1%%b %% 100)*60+1%%c %% 100)*100+1%%d %% 100"
)

rem Get elapsed time:
set /A dur=stop-start

rem Show elapsed time:
set /A hh=dur/(60*60*100), rest=dur%%(60*60*100), mm=rest/(60*100), rest%%=60*100, ss=rest/100, cc=rest%%100
if %mm% lss 10 set mm=0%mm%
if %ss% lss 10 set ss=0%ss%
if %cc% lss 10 set cc=0%cc%
set dur=%hh%:%mm%:%ss%,%cc%
rem echo.... dur:%dur% = stop:%stop_time% - start:%start_time%
