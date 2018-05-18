# Changelog

## Version 0.0.1 - first release - 18th May 2018

### New Features

* `new Domy.Game(width, height, parent, transparent);` Well... The very first feature: A game container. One can create a DIV on the page and assign it to the game when creating. Otherwise if there is none or if the DIV cannot be found, Domy will just create one and use that. All sprites will be added as children to that DIV, so the rest of the page won't get polluted. That way a game made with Domy could safely be included into a website. One can also decide if the DIV should be transparent, with the forth parameter. If `false` or left empty, it will be colored black. Standard dimensions are 960x540 for now.

There are no working update and render loops yet. Just a container and nothing more. Enough for a 0.0.1!
