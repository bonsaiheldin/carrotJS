# Changelog

---

## Version 0.0.2 - 19th May 2018

Domy now has two internal running core loops: One for updating the game logic and one for rendering. The rendering loop just updates the styles of the HTML elements since they're being drawn automatically by default anyway.

A simple image loader has been made and sprites can now be added, too. Sprites already have some internal update functions running, for e.g. movement. Movement can be activated using `sprite.velocity.x / y`. If the sprite has `collideWorldBounds` set to `true` it never leaves the game container! If set to `false` but `outOfBoundsKill` set to `true` the sprite will be removed from the game if it leaves the game container.

### New Features

* `new Domy.Sprite(game, x, y, key)` Creates a new sprite with the given x / y coordinates and an image. If `key` doesn't get passed or is left empty, the sprite will be a green rectangle. The first parameter must be the game you created with `new Domy.Game()`.

* `Dome.Sprite.alpha` Ranges from 0 to 1 and defines the transparency of a sprite. Is being applied as CSS opacity.

* `Dome.Sprite.velocity.x / y` If not set to `0` the sprite will move x / y pixels per second.

* `Domy.Sprite.collideWorldBounds` If set to `true`, the sprite will collide with the world bounds, thus never leaving the game container (as the world cannot be bigger than the container as there is no camera yet).

* `Domy.Sprite.outOfBoundsKill` If set to `true`, the sprite will be remove from the game if it leaves the game container. Note that `outOfBoundsKill` cannot work if `collideWorldBounds` is set to `true` as the sprite cannot leave.

* `Domy.loadImage(key, path)` Loads an image using `new Image()`. There is no asset loader yet, but as we use HTML elements to render the game, images will be drawn as soon as they're loaded anyway.

* `Domy.Time` Stores the time the game has started and also the delta time for each frame. This is also where the measured FPS will be stored.

* `Domy.World` This container stores all sprites in its `children` array.

There is more stuff which i won't address for now. I will need to create a documentation anyway.

---

## Version 0.0.1 - first release - 18th May 2018

### New Features

* `new Domy.Game(width, height, parent, transparent);` Well... The very first feature: A game container. One can create a DIV on the page and assign it to the game when creating. Otherwise if there is none or if the DIV cannot be found, Domy will just create one and use that. All sprites will be added as children to that DIV, so the rest of the page won't get polluted. That way a game made with Domy could safely be included into a website. One can also decide if the DIV should be transparent, with the forth parameter. If `false` or left empty, it will be colored black. Standard dimensions are 960x540 for now.

There are no working update and render loops yet. Just a container and nothing more. Enough for a 0.0.1!
