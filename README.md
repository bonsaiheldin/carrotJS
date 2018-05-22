# ![CarrotJS](carrotjs-logo.svg) CarrotJS - HTML5 Game Framework

> Please note that CarrotJS is in active development and **not ready to use**.

CarrotJS is a 2D game framework for making HTML5 games which follows a different approach: Instead of using Canvas2D or WebGL for rendering it is entirely based on DOM elements (divs, to be exactly) and CSS. It's an experiment to see what is possible since it is commonly known that DOM manipulations are rather slow in comparison to Canvas2D or WebGL. I'm also developing it just because it's fun and a possibility to learn more about Javascript, CSS and the DOM. ✨

For now it includes https://github.com/IceCreamYou/MainLoop.js (MIT licensed) for the two core loops. Thank you!

### Introduction

A game can be created and started by a single line of code:

`new Carrot.Game();`

This creates an empty game container. One can also give that function a few parameters as well, in the following order:

* `width` Defines the width of the game container. Optional. The default is `800`.
* `height` Defines the height of the game container. Optional. The default is `600`.
* `container` If onealready have a div on ones page ready to be taken by CarrotJS, give its id. If the div cannot be found or if none is given, CarrotJS will create one itself. The default is `null`.
* `states` An object which contains the custom code for ones game as the properties `preload`, `create`, `update` and `render`. For example: `{ preload: function(){}, create: function(){}, update: function(){}, render: function(){} }`. One can also leave that parameter empty or only pass one, two or three of the functions.
* `transparent` Defines if the container div shall be have a transparent background. If `false` or parameter not given, the container will have a black background. The default is `null`.

### Info about states
* `preload` is immediately called when the game is created and is used for loading assets (images, sounds, ...).
* `create` is being called once all assets are loaded and the game starts.
* `update` is then being called each logic frame (60 per second, most of the time) **after** the internal `_update` loop.
* `render` is being called as fast as possble with a maximum of 60 per second **after** the internal `_render` loop.

**Note:** Creating the game returns its core object and one should reference it to a variable to be able to use most of the engine's functions. For example:
`var game = new.Carrot.Game()` and then `game` contains the functions to setup the game.

Want to see more? Check out the very first (and very simple) example: https://github.com/bonsaiheldin/carrotjs/tree/master/examples/basics

There is a documentation, too:

## Documentation
https://bonsaiheldin.github.io/carrotjs/

---

The carrot logo was made by [**@qubodup**](https://github.com/qubodup) and released under the Creative Commons 0 License (Public Domain). https://opengameart.org/content/easter-carrot-pick-up-item - Thank you! 🥕
