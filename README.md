# ModuleBU - 'Hey bu'

 The goal is: no one sees the dirt.

ModuleBU is a util library and a stack that could help you create stunning & magical UI w/ interactions,
    cross platform, mobile-first, SPA (Single Page Applications) for interactive and creative HTML5.

These patterns are under patents and preliminary patents and are licensed under Attribution Assurance License (  http://opensource.org/licenses/AAL )
So, in your index.html or similar in view source you must indicate that your designs are derived from http://raw.github.com/shawea/ModuleBU to comply w/ our offered license.
If you can't agree to the license then go away, or maybe write us a large check for a custom license.

It is DOM centric(vs .js centric) with easy to teach setup.  Some features is that it lets you load dom modules and event bus, plus PhoneGap support.

Since you agree to the A.A. license, here you go: http://scdn-primus.netdna-ssl.com/latest/ModuleBU.js
Yes this is all the functions we have to make patterns work.


Here are example of the type of application you can/should build with this.
- http://intothearctic.gp by HelloMonday
- http://www.google.com/nexus

For example, we can animate a div/section after loading. But the key to ModuleBU is that it is hard to do nice UI in .js views, here the views are HTML DOM, not .js emitted.

To run examples, you'll need a localhost http server or WebStorm IDE.

After you download, you may want to watch a 10 minute video: http://www.youtube.com/watch?v=YWUGC3wKe14.

Recipe:
- Download the 'starter' folder to get the start structure and edit. Copy 'latest' folder into aCDN/libs.
- Remove sections(div) and save in 'CDN/views' or similar
- Load view using provided open() or forward(). On open: animate as needed, using greenSock.
- Recommend running of CDN (ex MaxCDN)


If you have bugs, issues, just file an ticket here on github.
If you want, you can follow me on twitter: @puppetMaster3
