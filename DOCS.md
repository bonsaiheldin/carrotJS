# ![carrotJS](https://raw.githubusercontent.com/bonsaiheldin/carrotJS/master/carrotjs-logo.svg?sanitize=true) carrotJS

carrotJS is a 2D game framework for making HTML5 games which follows a different approach: Instead of using Canvas2D or WebGL for rendering it is entirely based on DOM elements (divs, to be exactly) and CSS. It's an experiment to see what is possible since it is commonly known that DOM manipulations are rather slow in comparison to Canvas2D or WebGL. I'm also developing it just because it's fun and a possibility to learn more about Javascript, CSS and the DOM. ✨

> See [README](https://github.com/bonsaiheldin/carrotJS/blob/master/README.md) for a guide to getting started with carrotJS.

# API

**Via:** If a class has an entry in the _Via_ column it means you can quickly access it through a local reference: e.g., you can control the camera via `this.camera` from any state, or `game.camera` if game has been globally defined.

| Class | Via | Description |
| ----- | --- | ----------- |
| [Game](./Carrot.Game.html) | `game` | Manages booting, creating subsystems and running the logic and render loop. |
| [World](./Carrot.World.html) | `world` | The Game World in which all Game Objects live. |
| [Camera](./Carrot.Camera.html) | `camera` | The Camera is your view into the Game World. |

---

## Loader

| Class | Via | Description |
| --- | --- | --- |
| [Cache](./Carrot.Cache.html) | `cache` | The Cache is where all loaded assets are stored and retrieved from. |
| [AssetLoader](./Carrot.AssetLoader.html) | `load` | Loads all external asset types (images, audio) and adds them to the Cache. Automatically invoked by a States `preload` method. |

---

## Game Object creation

| Class | Via | Description |
| --- | --- | --- |
| [ObjectFactory](./Carrot.ObjectFactory.html) | `add` | A helper class that can create any of the Carrot Game Objects and adds them to the Game World. |
| [Group](./Carrot.Group.html) | `add.group` | Groups can contain multiple Game objects.
| [Sprite](./Carrot.Sprite.html) | `add.sprite` | A sprite is a game object containing an image.
| [Timer](./Carrot.Timer.html) | `add.timer` | A timed function which can be repeated. |

---

## Game objects

| Class | Description |
| --- | --- |
| [Sprite](./Carrot.Sprite.html) | A Game object with an image, capable of running animation and physics. |

---

## Geometry

| Class | Description |
| --- | --- |
| [Circle](./Carrot.Circle.html) | A Circle object consisting of a position and diameter. |
| [Point](./Carrot.Point.html) | A Point object consisting of an x and y position. |
| [Rectangle](./Carrot.Rectangle.html) | A Rectangle object consisting of an x, y, width and height. |

---

## Time

| Class | Via | Description |
| --- | --- | --- |
| [Time](./Carrot.Time.html) | `time` | The core internal clock on which all Carrot time related operations rely. |

---

## Math

| Class | Via | Description |
| --- | --- | --- |
| [Math](./Carrot.Math.html) | `math` | Contains lots of math related helper methods. |

---

## Physics

| Class | Via | Description |
| --- | --- | --- |
| [Physics](./Carrot.Physics.html) | `physics` | The core Physics Manager. Provides access to all of the physics sub-systems. |
| [Body](./Carrot.Physics.Body.html) | `sprite.body` | An Physics Body. Contains velocity, acceleration, drag and other related properties. |

---

## Input

| Class | Via | Description |
| --- | --- | --- |
| [Keyboard](./Carrot.Keyboard.html) | `input.keyboard` | The Keyboard input handler. Listens for device related events. Can also create Key objects. |
| [Mouse](./Carrot.Mouse.html) | `input.mouse` | A Mouse event handler. Listens for device related events and passes them on to the active Pointer. |

---

## Sound

| Class | Via | Description |
| --- | --- | --- |
| [SoundManager](./Carrot.SoundManager.html) | `sound` | The Sound Manager controls all Sound objects and can play, loop, fade and stop Sounds. |

---

## Utils

| Class | Via | Description |
| --- | --- | --- |
| [Color](./Carrot.Color.html) | - | Carrot.Color stores the 140 standard HTML / CSS colors. |
