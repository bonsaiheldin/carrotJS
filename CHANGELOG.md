# 🥕 Changelog 🥕

---


## Version 0.0.8 - 23th May 2018

Sprites can now be limited in speed using `Sprite.body.maxVelocity`, measured in pixels squared.

Added some basic math functions and the mouse object now stores its coordinates in the world, too.

### New Features

* `Sprite.style` A shortcut to the CSS rules of a sprite's image. Changing `Sprite.style` also changes `Sprite.image.style`.

* `Sprite.body.maxVelocity(x,y)` Limit the max speed a physics body can rach. Default: `10000` on each `x` and `y`.

* `Group.destroy(destroyChildren)` If `true` is passed when destroying a group, all its children and their children are destroyed altogether. Otherwise all its children are added to the world container as standalone sprites. Default: `false`.

* `Sprite.destroy(destroyChildren)` If `true` is passed when destroying a group, all its children and their children are destroyed altogether. Otherwise all its children are added to the world container as standalone sprites. Default: `false`.

* `game.math.angleBetween(a, b)` Calculates the angle between two sprites (or other objects) in radians. They both must have x / y coordinates. Use `game.math.radToDeg(radians)` if degrees are needed.

* `game.math.angleBetweenPoints(x1, y1, x2, y2)` Same as above, but the coordinates can be any.

* `game.math.distanceBetween(a, b)` Calculates the distance between to sprites (or other) in pixels. Both must have x / y coordinates.

* `game.math.distanceBetweenPoints(x1, y1, x2, y2)` Same as above, but the coordinates can be any.

* `game.math.degToRad(degrees)` Converts degrees into radians. Alternative: `number * game.math.DEG_TO_RAD`.

* `game.math.radToDeg(radians)` Converts radians into degrees. Alternative: `number * game.math.RAD_TO_DEG`.

* `game.mouse.worldX / worldY` Stores the position of the mouse inside the game world. Note: `game.mouse.x / y` only stores its position relative to the game container.

---

## Version 0.0.7 - 22th May 2018

The physics system got a nice addition: Overlap detection between rectangles. Sprites can only be rectangles for now. Note: This is only an overlap detection, there is no actual collision happening which would mean physics like repelling. Actual collision detection will follow later.

Sprites can now have thei own custom update loops, too. They are are called right **after** their internal `update` loop which has been renamed to `_update` just like `_render`. Use them for running custom code for sprites (or only one of them).

### New Features

* `game.physics.overlap(entity1, entity2, callback)` Checks a group or a sprite against a group or sprite for overlaps. In addition, one can give a callback as the third parameter which will be fired when the overlap is detected and which returns the two given entities in the same order they were given. Put that function in a custom `update` loop.

* `Sprite.update` By default `null`. Pass a function that is called right **after** the internal `_update` loop of the sprite. Makes code organizing easier and helps performance. One can use it for custom code for sprites, so there's no need to iterate all of them each frame.

* `Sprite.body.acceleration(x,y)` Allows for "softer" movement if moving instantly at full speed is not desired. Measured in pixels per second squared.

* `Group.setAll(property, value)` has been modified to allow for changing nested objects, too. For example: `Group.setAll("body.enabled", false)` would disable physics on all the bodies of the children of the group. While `Group.setAll("x", 0)` still works as before. It scans down to the third level, so this would also work: `Group.setAll(object.object.property, value)`.

* `Carrot.Color` stores the hex values of the 140 standard HTML & CSS colors, so there is no need to memorize them.

* `Carrot.Keyboard` not only is the keyboard handler but now also stores the keyCodes of keyboard buttons. Access them by using, for example, `Carrot.Keyboard.W` for the `w` button or `Carrot.Keyboard.ENTER` for the `enter` button.

* `Carrot.Mouse` not only is the mouse handler but now also stores common keyCodes of mouse buttons. For example `Carrot.Mouse.LEFT_BUTTON` equals `0`.

### Bug fixes

* The follow function of the camera is working again.

* Creating the game container was still not functioning well. If a parent div is passed when creating a game, CarrotJS takes that as its background div, creates a second one inside it and use that for game objects. If no parent div is passed, then CarrotJS creates a background div, adds it to the page's body and does the same: It puts a second div inside it as its main one. Now it should work. Note: If a debug display or else is needed above the game container, it makes more sense to prepare the HTML structure for that and pass a div, instead of letting CarrotJS do its thing.

---

## Version 0.0.6 - 21th May 2018

CarrotJS now has a very basic asset loader. Load images and sounds by using `game.load.image(key, path)` and `game.load.sound(key, path)`. They get automatically added to the list of files to download and if all are loaded, the game starts. This introduces a fourth custom state: `preload`. This one can be used to load assets and be added to `Carrot.Game` as an additional state beside `create`, `upload` and `render`. Assets have to be loaded and therefore ready to use before the update and render loops should run. Also, the example i uploaded yesterday got updated accordingly.

Also, physics can now be disabled on a body by setting its `enabled` property to `false` which disables physics completely or partly by setting `allowBounce`, `allowDrag`, `allowGravity` or `allowAcceleration` to `false`. Note: `Body.velocity` is an exception and cannot be disabled that way because other physics functions depend on it. Use `Body.enabled` for that instead.

The follow function of the camera has been disabled because of a bug.

### New features

* `preload()` A new custom state one can pass when creating the game. Use it for loading images and sounds. It will be called upon game creation and the game only starts the internal `update` and `render` loops if all assets have been loaded.

* `game.load.image(key, path)` Loads an image. Needs to be put in the `preload` function.

* `game.load.sound(key, path)` Load a sound. Needs to be put in the `preload` function.

* `Sprite.body.enabled` Disables physics on the sprite if set to `false`. Default: `true`.

* `Sprite.body.allowBounce` Allows for disabling bouncing on the body without disabling other types of physics. Default: `true`.

* `Sprite.body.allowDrag` Allows for disabling drag on the body without disabling other types of physics. Default: `true`.

* `Sprite.body.allowGravity` Allows for disabling gravity on the body without disabling other types of physics. Default: `true`.

* `Sprite.body.allowAcceleration` Allows for disabling acceleration on the body without disabling types of other physics. Default: `true`.

### Bug fixes

* When the camera was set to follow a sprite it moved the game's background, too. The solution: CarrotJS now creates a second container as a background and puts the main one inside it. The background one can stay where it is.

* Sprites wouldn't update their position outside of the camera because that only happened when their `inCamera` property was set to `true`. Yes, very funny. Of course, sprites should always update their positions!

---

## Version 0.0.5 - 20th May 2018

Basic physics like bouncing, dragging and gravity have been added. As the properties of sprites become more and more, i decided to pack all physics related stuff into a new `body` object which is a property of the Sprite. So, for example, `Sprite.velocity.x` is now `Sprite.body.velocity.x` and the same goes for every other physics related function. Note: `collideWorldBounds` is not a physics function as it just checks for the sprite boundaries and therefore remains a property of the sprite itself.

### New Features

* `new Carrot.Physics.Body(x,y)` Creates a physics body with `collideWorldBounds`, `velocity`, `bounce`, `drag`, `gravity` and `touching` as properties. `x` and `y` are by default set to `0` as the relative center of the Sprite. All sprites have physics bodies added by default. This will be changed later.

* `Body.bounce(x,y)` Use this for making sprites bounce back when a collision happens. `0,0` (0%) disables it. `1,1` makes sprites bounce back with the same speed they moved before (100%). Any more than that makes them faster after bouncing.

* `Body.drag(x,y)` Setting it to `0,0` disables it and `1,1` makes a sprite immediately stop (and actually not move ever). Measured in percent. `0.01,0.01` could be used for very slow deceleration of a spaceship.

* `Body.gravity(x,y)` Makes the sprite decelerate over time. Setting it to `0,0` disables it. Measured in pixels per second squared.

* `Body.touching` Stores information about collision of the bounds of a Sprite. For example, if the sprite touches the floor of the game world `Body.touches.bottom` will be `true`. Available properties are `left`, `right`, `top`, `bottom` and `none` which is `true` if all the others are `false` (use that, for example, to determine if the player is in the air).

* Sprites now have `left`, `right`, `top` and `bottom` properties. They store the bounds of the sprite (most of the time its image).

---

## Version 0.0.4 - 20th May 2018

Good news: I got jsDocs working which means that CarrotJS now has a documentation! It's still very basic and i don't like the default theme at all, but here it is: https://bonsaiheldin.github.io/CarrotJS/

Keyboard and mouse controls have been added. They're not perfect yet, but it is a start.

### New Features

* A central object factory has been made. Instead of using `new Carrot.Sprite` one should now use the global game object like this: `game.add.sprite`. The benefit of this change is that the first parameter, the global game object, doesn't has to be passed anymore. So `new Carrot.Sprite(game, x, y, key)` became `game.add.sprite(x, y, key)`. Same goes for groups any other game object expect things like points, circles and rectangles. Note: Creating the game itself stays the same `new Carrot.Game`.

* The `Carrot.Keyboard` class offers keyboard shortcuts like `Carrot.Keyboard.W` for the `W` button. That way one doesn't need to know the internal codes browsers use for buttons. So checking if the `W` button is down goes by using `if (app.game.keyboard.isDown(Carrot.Keyboard.W))` in ones update loop.

* `Carrot.Mouse` does the same and offers mouse button shortcuts like `Carrot.Mouse.LEFT_BUTTON`. Checking for a button being down works the same as with the keyboard: `if (game.mouse.isDown(Carrot.Mouse.LEFT_BUTTON))`.

* `Group.setAll(property, value)` Iterates all children of a group and sets their `property` to the passed `value`.

---

## Version 0.0.3 - 19th May 2018

Groups have been added. A group is meant as a container storing sprites and to make organizing a game easier. Games work without, too but one could, for example, add all bullets to a bullet group. Later there will be useful group functions, for now they are not much more than mere arrays. Everything is updated automatically.

And a camera has been added with a simple follow function. That means that the game world can now be bigger than the game container and if the camera is set to follow a sprite, the game world will move when the sprite moves.

CarrotJS now also has some helper functions for defining simple shapes like points, rectangles and circles. The world container already uses a rectangle for its bounds and the sprites use points for their anchors (see below) and velocity and a rectangle for its bounds.

### New Features

* `Carrot.Sprite` now has a fifth parameter: `group`. If a group is passed, the sprite will be added to that group instead of directly to the world.

* `Sprite.anchor.x / y` Ranges from 0 to 1 and defines the center of the Sprite. Its image is being drawn according to the sprite's anchor. For example, if one sets it to `0.5`, the image is being drawn exactly in the middle of the Sprite. If set to `0` the image is drawn at the x/y coordinates of the sprite, to the right bottom.

* `Sprite.inCamera` Stores if the sprite is inside the camera bounds, so visible to the player, `true` / `false`.

* `new Carrot.Group(game)` Adds a group the game. Gets added as a child to `Carrot.World`.

* `Group.addChild(sprite)` Adds a sprite to the group.

* `Group.removeChild(sprite)` Removes a sprite from the group.

* `Carrot.Camera` A 2d camera storing x, y, width and height of the viewport. It is created automatically when the game starts.

* `Carrot.Camera.follow(sprite)` Makes the camera follow the passed Sprite.

* `Carrot.Camera.unfollow()` Makes the camera don't follow any sprite and lets it stay at its last position.

* `new Carrot.Point(x, y)` Creates a point storing x / y coordinates.

* `new Carrot.Rectangle(x, y, width, height)` Creates a rectangle storing x, y, width and height.

* `new Carrot.Circle(x, y, diameter)` Creates a rectangle storing x, y, width and height.

---

## Version 0.0.2 - 19th May 2018

CarrotJS now has two internal running core loops: One for updating the game logic and one for rendering. The rendering loop just updates the styles of the HTML elements since they're being drawn automatically by default anyway.

A simple image loader has been made and sprites can now be added, too. Sprites already have some internal update functions running, for e.g. movement. Movement can be activated using `Sprite.velocity.x / y`. If the sprite has `collideWorldBounds` set to `true` it never leaves the game container! If set to `false` but `outOfBoundsKill` set to `true` the sprite will be removed from the game if it leaves the game container.

### New Features

* `new Carrot.Sprite(game, x, y, key)` Creates a new sprite with the pass x / y coordinates and an image. If `key` doesn't get passed or is left empty, the sprite will be a green rectangle. The first parameter must be the game one created with `new Carrot.Game()`.

* `Sprite.alpha` Ranges from 0 to 1 and defines the transparency of a Sprite. Is being applied as CSS opacity.

* `Sprite.velocity.x / y` If not set to `0` the sprite will move x / y pixels per second.

* `Sprite.collideWorldBounds` If set to `true`, the sprite will collide with the world bounds, thus never leaving the game container (as the world cannot be bigger than the container as there is no camera yet).

* `Sprite.outOfBoundsKill` If set to `true`, the sprite will be remove from the game if it leaves the game container. Note that `outOfBoundsKill` cannot work if `collideWorldBounds` is set to `true` as the sprite cannot leave.

* `Carrot.loadImage(key, path)` Loads an image using `new Image()`. There is no asset loader yet, but as we use HTML elements to render the game, images will be drawn as soon as they're loaded anyway.

* `Carrot.Time` Stores the time the game has started and also the delta time for each frame. This is also where the measured FPS will be stored. It is created automatically when the game starts.

* `Carrot.World` This container stores all sprites in its `children` array. It is created automatically when the game starts.

There is more stuff which i won't address for now. I will need to create a documentation anyway.

---

## Version 0.0.1 - first release - 18th May 2018

### New Features

* `new Carrot.Game(width, height, parent, transparent);` Well... The very first feature: A game container. One can create a DIV on the page and assign it to the game when creating. Otherwise if there is none or if the DIV cannot be found, CarrotJS will just create one and use that. All sprites will be added as children to that DIV, so the rest of the page won't get polluted. That way a game made with CarrotJS could safely be included into a website. One can also decide if the DIV should be transparent, with the fourth parameter. If `false` or left empty, it will be colored black. Standard dimensions are 960x540 for now.

There are no working update and render loops yet. Just a container and nothing more. Enough for a 0.0.1!
