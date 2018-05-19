# Changelog

---

## Version 0.0.3 - 19th May 2018

Groups have been added. A group is meant as a container storing sprites and to make organizing a game easier. Games work without, too but one could, for example, add all bullets to a bullet group. Later there will be useful group functions, for now they are not much more than mere arrays. Everything is updated automatically.

And a camera has been added with a simple follow function. That means that the game world can now be bigger than the game container and if the camera is set to follow a sprite, the game world will move when the sprite moves.

Domy now also has some helper functions for defining simple shapes like points, rectangles and circles. The world container already uses a rectangle for its bounds and the sprites use points for their anchors (see below) and velocity and a rectangle for its bounds.

### New Features

`Domy.Sprite` now has a fifth parameter: `group`. If a group is given, the sprite will be added to that group instead of directly to the world.

`Sprite.anchor.x / y` Ranges from 0 to 1 and defines the center of the sprite. Its image is being drawn according to the sprite's anchor. For example, if one sets it to `0.5`, the image is being drawn exactly in the middle of the sprite. If set to `0` the image is drawn at the x/y coordinates of the sprite, to the right bottom.

`Sprite.inCamera` Stores if the sprite is inside the camera bounds, so visible to the player, `true` / `false`.

`new Domy.Group(game)` Adds a group the game. Gets added as a child to `Domy.World`.

`Group.addChild(sprite)` Adds a sprite to the group.

`Group.removeChild(sprite)` Removes a sprite from the group.

`Domy.Camera` A 2d camera storing x, y, width and height of the viewport.

`Domy.Camera.follow(sprite)` Makes the camera follow the given sprite.

`Domy.Camera.unfollow()` Makes the camera don't follow any sprite and lets it stay at its last position.

`new Domy.Point(x, y)` Creates a point storing x / y coordinates.

`new Domy.Rectangle(x, y, width, height)` Creates a rectangle storing x, y, width and height.

`new Domy.Circle(x, y, diameter)` Creates a rectangle storing x, y, width and height.

---

## Version 0.0.2 - 19th May 2018

Domy now has two internal running core loops: One for updating the game logic and one for rendering. The rendering loop just updates the styles of the HTML elements since they're being drawn automatically by default anyway.

A simple image loader has been made and sprites can now be added, too. Sprites already have some internal update functions running, for e.g. movement. Movement can be activated using `sprite.velocity.x / y`. If the sprite has `collideWorldBounds` set to `true` it never leaves the game container! If set to `false` but `outOfBoundsKill` set to `true` the sprite will be removed from the game if it leaves the game container.

### New Features

* `new Domy.Sprite(game, x, y, key)` Creates a new sprite with the given x / y coordinates and an image. If `key` doesn't get passed or is left empty, the sprite will be a green rectangle. The first parameter must be the game one created with `new Domy.Game()`.

* `Sprite.alpha` Ranges from 0 to 1 and defines the transparency of a sprite. Is being applied as CSS opacity.

* `Sprite.velocity.x / y` If not set to `0` the sprite will move x / y pixels per second.

* `Sprite.collideWorldBounds` If set to `true`, the sprite will collide with the world bounds, thus never leaving the game container (as the world cannot be bigger than the container as there is no camera yet).

* `Sprite.outOfBoundsKill` If set to `true`, the sprite will be remove from the game if it leaves the game container. Note that `outOfBoundsKill` cannot work if `collideWorldBounds` is set to `true` as the sprite cannot leave.

* `Domy.loadImage(key, path)` Loads an image using `new Image()`. There is no asset loader yet, but as we use HTML elements to render the game, images will be drawn as soon as they're loaded anyway.

* `Domy.Time` Stores the time the game has started and also the delta time for each frame. This is also where the measured FPS will be stored.

* `Domy.World` This container stores all sprites in its `children` array.

There is more stuff which i won't address for now. I will need to create a documentation anyway.

---

## Version 0.0.1 - first release - 18th May 2018

### New Features

* `new Domy.Game(width, height, parent, transparent);` Well... The very first feature: A game container. One can create a DIV on the page and assign it to the game when creating. Otherwise if there is none or if the DIV cannot be found, Domy will just create one and use that. All sprites will be added as children to that DIV, so the rest of the page won't get polluted. That way a game made with Domy could safely be included into a website. One can also decide if the DIV should be transparent, with the fourth parameter. If `false` or left empty, it will be colored black. Standard dimensions are 960x540 for now.

There are no working update and render loops yet. Just a container and nothing more. Enough for a 0.0.1!
