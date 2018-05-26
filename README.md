# ![carrotJS](https://raw.githubusercontent.com/bonsaiheldin/carrotJS/master/carrotjs-logo.svg?sanitize=true) **carrotJS** - HTML5 Game Framework

> Please note that **carrotJS** is in a **very** early state and **not ready to use**. Issues are disabled for now.

**carrotJS** is a 2D game framework for making HTML5 games which follows a different approach: Instead of using Canvas2D or WebGL for rendering it is entirely based on DOM elements (divs, to be exactly) and CSS. It's an experiment to see what is possible since it is commonly known that DOM manipulations are rather slow in comparison to Canvas2D or WebGL. I'm also developing it just because it's fun and a possibility to learn more about Javascript, CSS and the DOM. ✨

---

## Introduction

A game can be created and started by a single line of code:

`var game = new Carrot.Game();`

This creates an empty game container and returns the core object which one should reference. One can also pass that function a few parameters as well, in the following order:

* `width` Defines the width of the game container. Optional. The default is `800`.
* `height` Defines the height of the game container. Optional. The default is `600`.
* `container` If one already has a div on the page ready to be taken by carrotJS, pass its id. If the div cannot be found or if none is passed (for example, because none exists), **carrotJS** will create one itself. The default is `''`.
* `scene` An object which contains the custom states for the game as the properties `preload`, `create`, `update` and `render`. One can also leave that parameter empty or only pass one, two or three of the functions. The default is `null`.
* `transparent` Defines if the container div shall be have a transparent background. If `false` or parameter not passed, the container will have a black background. The default is `false`.

## About scene states

A game is made of scenes. For example a loading scene, a credits scene, the actual game scene, ... **carrotJS** uses states to define such a scene.

* `preload` is immediately called when the game is created and is used for loading assets (images, sounds, JSON, ...).
* `create` is being called once all assets are successfully loaded and the game starts.
* `update` is then being called each logic frame (60 per second, most of the time) **after** the internal `_update` core loop.
* `render` is being called as fast as possble with a maximum of 60 per second **after** the internal `_render` core loop. `render` could be used to display debug info.

Example on what the passed scene object could look like: `{ preload: function(){}, create: function(){}, update: function(){}, render: function(){} }`.

---

## Examples
https://github.com/bonsaiheldin/carrotJS/tree/master/examples/basics

## Documentation
https://bonsaiheldin.github.io/carrotJS/

![](https://raw.githubusercontent.com/bonsaiheldin/carrotJS/master/preview.gif)

---

## Credits


For now **carrotJS** uses https://github.com/IceCreamYou/MainLoop.js (MIT licensed) for the two core loops. Thank you!

The carrot logo was made by [**@qubodup**](https://github.com/qubodup) and released under the Creative Commons 0 License (Public Domain). https://opengameart.org/content/easter-carrot-pick-up-item - Thank you!
