# Domy - HTML5 Game Framework
Domy is a 2D game framework for making HTML5 games which follows a different approach of rendering: Instead of using Canvas2D or WebGL for rendering it is entirely based upon DOM elements (divs, to be exactly) and CSS. It's an experiment to see what is possible since it is commonly known that DOM manipulations are rather slow in comparison to Canvas2D or WebGL.

For now it thankfully includes https://github.com/IceCreamYou/MainLoop.js for the two core loops.

### Example:

A game can be created and started by a single line of code:

`new Domy.Game();`

You can also give that function a few parameters as well, in the following order:

* `width` Defines the width of the game container.
* `height` Defines the height of the game container.
* `parent` If you already have a div on your page ready to be taken by Domy, give its id. If the div cannot be found or if none is given, Domy will create one itself.
* `states` An object which contains the custom code for your game as the properties `create`, `update` and `render`. For example: `{ create: function(){}, update: function(){}, render: function(){} }`. You can also leave that parameter empty or only give one or two functions. Info: `create` is being called once the game starts, `update` is being called each logic frame (60 most of the time) **after** the internal update loop and `render` is being called as fast as possble (using `requestAnimationFrame`) **after** the internal render loop.

* `transparent` Defines if the container div shall be have a transparent background. If `false` or parameter not given, the container will have a black background.

Note: `new Domy.Game()` returns the game core object and you should reference it to a variable to be able to use most of the engine's functions.

For everything else, check the documentation. Keep in mind that it is a work on progress, just like the engine itself is still very basic.

## Documentation
https://bonsaiheldin.github.io/domy/
