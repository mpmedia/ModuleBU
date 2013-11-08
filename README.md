# ModuleBU - 'Hey bu'

 The goal is: Make magical UI, no one sees the dirt.

ModuleBU is a util library and a stack that could help you create stunning & magical UI w/ interactions,
    cross platform, mobile-first, SPA (Single Page Applications) for interactive and creative HTML5.
It is DOM centric(vs .js centric) with easy to teach setup.  Features include: it lets you load dom modules and event bus, plus PhoneGap support.
This util lib can help animate a div/section after loading. But the key to ModuleBU is that it is hard to do nice UI in .js views, here the views are HTML DOM, not .js emitted.

These patterns are under patents and preliminary patents and are licensed under Attribution Assurance License (  http://opensource.org/licenses/AAL ).
So, in your index.html or similar in view source you must indicate that your designs are
"derived from http://github.com/puppetMaster3/ModuleBU " to comply w/ our offered license.

Module BUs is:
    http://scdn-primus.netdna-ssl.com/latest/ModuleBU.js
Yes this is all the functions we have to make patterns work.

Here are example of the type of application you can/should build with this.
- http://intothearctic.gp by HelloMonday
- http://www.google.com/nexus

To run examples, you'll need a localhost http server or WebStorm IDE.

Recipe:
-Download the 'starter' folder to get the start structure and edit. Copy 'latest' folder into aCDN/libs.
- Load the ModuleBU.js.
- Now you should set where you modules are:

```
    Module.moduleDir = 'CDN/modules/'
```
- And load a module:

```
    Module.domAdd('HomePg.html',document.getDocumentById('container'), onLoaded)
```
- Or remove modules:

```
    Module.domRem(document.getDocumentById('container'),0)
```
- Since you loaded the module, you can animate it, for example w/ #GSAP.

-Or/and you can listen to hash/routes:

```
    AppBU.route(onRoute)

    function onRoute(hash) {
        console.log(hash)
    ....
```
- or other events, like scroll or mouse.

More in the codes, pdf of 'train the trainer folder'.

If you have bugs, issues, just file an ticket here on github.
