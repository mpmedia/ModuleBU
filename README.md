# ModuleBU - 'Hey bu.'

 The goal is: Creative UI, non-goal is: no one sees the dirt.

ModuleBU is a util library and a stack that could help you be creative w/ UI interactions,
    cross platform, mobile-first, SPA (Single Page Applications) .
It is DOM centric(vs .js centric) with easy to teach setup.  Features include: it lets you load dom Mods and event bus, plus PhoneGap support.
This util lib can help animate a div/section after loading. But the key to ModuleBU is that it is hard to do nice UI in .js views, here the views are HTML DOM, not .js emitted.

These patterns are licensed under Attribution Assurance License (  http://opensource.org/licenses/AAL ).
So, in your index.html or similar in view source you must indicate that your designs are
"derived from http://github.com/puppetMaster3/ModuleBU " to comply w/ our offered license.


Therefore:
    http://scdn-primus.netdna-ssl.com/latest/ModlueBU.js
Yes this is all the functions we have to make these patterns work.

Here are example of the type of application you can/should build with this.
- http://intothearctic.gp by HelloMonday
- http://www.google.com/nexus

To run examples, you'll need a localhost http server or WebStorm IDE, since it loads the DOM (Rachet does the same).


Recipe:
-Download the 'starter' folder to get the start structure and edit. Copy 'latest' folder into aCDN/libs.
- Load the ModuleBU.js, via script tag or require.js or such.
- Now you should set where you dom modules are:

```
    Mod.moduleDir = 'CDN/Mods/'
```
- And load a module:

```
    Mod.domAdd('HomePg.html',document.getDocumentById('container'), onLoaded)
```
- Or remove Mods:

```
    Mod.domRem(document.getDocumentById('container'),0)
```
- Since you loaded the Mod, you can animate it, for example w/ #GSAP.

-Or/and you can listen to hash/routes:

```
    AppBU.route(onRoute)

    function onRoute(hash) {
        console.log(hash)
    ....
```
- or other events, like scroll or mouse. Yes, it's an Event Bus, that is not the point.

More in the codes, pdf of 'train the trainer' folder.

Also, the rest of the recommended stack: #MaxCDN, #WebStorm, #TypeScript, #LESS, #Require.js, #GSAP, BaaS API - such as PrimusAPI.com, #TopCoat, #PhoneGap, etc.

If you have bugs, issues, just file an ticket here on github.
