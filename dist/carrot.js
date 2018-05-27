/**
 * @author       Bonsaiheldin <dm@bonsaiheld.org> (http://bonsaiheld.org/)
 * @copyright    2018 Bonsaiheldin
 * @license      {@link https://github.com/bonsaiheldin/carrotJS/blob/master/LICENSE.md|MIT License}
 */

/** Initialize the main object. It will be populated afterwards.
 *
 * @namespace Carrot
 */
var Carrot =
{
    "Version": "0.1"
};

/**
 * The core game object. Starts the game.
 *
 * @class Carrot.Game
 * @constructor
 * @param {integer} [width=800]         - The width of the container.
 * @param {integer} [height=600]        - The height of the container.
 * @param {string}  [container=null]    - The parent div of the container.
 * @param {object}  [scene=null]        - Custom scene the game shall use.
 * @param {boolean} [transparent=false] - Defines if the container shall be transparent.
 */
Carrot.Game = function(width, height, container, scene, transparent)
{
    let that = this;
    let start = function()
    {
        that.width       = width || 800;
        that.height      = height || 600;
        that.parent      = document.getElementById(container) || null;
        that.scene       = scene || null;
        that.transparent = transparent || false;

        // Config object
        that.config =
        {
            width: that.width,
            height: that.height,
            parent: that.parent,
            scene: that.scene,
            transparent: that.transparent
        };

        // If no container was passed, create one
        if (that.parent === null)
        {
            // Create background div
            let backgroundDiv = document.createElement('div');
            document.body.appendChild(backgroundDiv);
            backgroundDiv.className = "carrotJS background";
            that.background = backgroundDiv;

            // Create main div for game content
            mainDiv = document.createElement('div');
            mainDiv.className = "main";
            backgroundDiv.appendChild(mainDiv);
            that.parent = mainDiv;
        }

        else
        {
            // Create a main div and put it inside the background div.
            let mainDiv = document.createElement('div');
            mainDiv.className = "main";
            that.parent.appendChild(mainDiv);

            // Turn the the passed div into the background div ...
            that.background = that.parent;

            // ... and the newly made div into the main one.
            that.parent = mainDiv;
        }

        // If the container shall not be transparent, color it black
        if (that.transparent === false)
        {
            that.background.style.backgroundColor = '#000000';
        }

        // Apply inline CSS
        that.background.style.position   = "relative";
        that.background.style.width      = that.width + 'px';
        that.background.style.height     = that.height + 'px';
        that.background.style.overflow   = "hidden";
        that.background.style.fontFamily = "sans-serif";
        that.background.style.boxSizing  = "border-box";

        that.parent.style.position = "relative";
        that.parent.style.width    = that.width + 'px';
        that.parent.style.height   = that.height + 'px';

        // Init modules
        that.time     = new Carrot.Time(that);
        that.debug    = new Carrot.Debug(that);
        that.physics  = new Carrot.Physics(that);
        that.math     = new Carrot.Math(that);
        that.world    = new Carrot.World(that);
        that.camera   = new Carrot.Camera(that);
        that.cache    = new Carrot.Cache(that);
        that.load     = new Carrot.AssetLoader(that);
        that.add      = new Carrot.ObjectFactory(that);
        that.sound    = new Carrot.SoundManager(that);
        that.keyboard = new Carrot.Keyboard(that);
        that.mouse    = new Carrot.Mouse(that);

        // Default config
        that.roundPixels = false;

        // Run the given preload state, if available.
        if (that.scene !== null)
        {
            if (that.scene.preload)
            {
                that.background.style.background = "#0e1011 ";

                // Create div for the progress bar.
                let progress = document.createElement('div');
                progress.style.userSelect = "none";
                progress.style.pointerEvents = "none";
                progress.style.position = "absolute";
                progress.style.left = "50%";
                progress.style.top = "50%";
                progress.style.transform = "translate(-50%, -50%)";
                progress.style.textAlign = "center";
                progress.style.color = "#eeeeee";
                progress.style.fontSize = "24px";
                progress.style.lineHeight = "24px";
                progress.innerHTML = "Made with "
                + "<img src='data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"64\" height=\"64\"><defs><linearGradient id=\"a\"><stop offset=\"0\" stop-color=\"%23ffdbc2\"/><stop offset=\"1\" stop-color=\"%23fff\"/></linearGradient><linearGradient id=\"b\"><stop offset=\"0\" stop-color=\"%23fff\"/><stop offset=\"1\" stop-color=\"%23ffaa6e\"/></linearGradient><linearGradient id=\"c\"><stop offset=\"0\" stop-color=\"%23ff2929\"/><stop offset=\".5\" stop-color=\"%23f00000\"/><stop offset=\"1\" stop-color=\"%23820000\"/></linearGradient><linearGradient id=\"d\"><stop offset=\"0\" stop-color=\"%23fff\" stop-opacity=\".771\"/><stop offset=\"1\" stop-color=\"%23fff\" stop-opacity=\".157\"/></linearGradient></defs><path d=\"M44.268 12.869S46.504 2.734 47.236 1.27c.732-1.463 2.066-1.664 2.212-.859.146.806-1.943 9-2.437 9.714-.494.714.638 1.922 1.224 1.483.584-.439 3.55-8.377 4.574-9.145 1.024-.768 2.486-.035 2.486-.035s.822 1.555.054 2.36c-.769.805-3.477 6.95-5.123 7.498-1.645.548.657 1.794.657 1.794s4.72-5.596 6.657-6.363c1.938-.767 4.094-.327 3.308.606-.787.933.473 2.16-.623 2.525-1.097.365-6.29 4.716-6.967 4.88-.676.164-.11 1.683.657 1.794.768.11 6.363-5.23 7.515-5.064 1.151.166 2.576.24 2.448 1.137-.13.896-.696 2.122-2.232 2.816-1.535.694-7.385 2.337-8.518 2.958-1.134.622-9.153-5.366-8.86-6.5z\" fill=\"%234cd600\"/><path d=\"M367.137 604.92s-1.55-.1-2.102.864c-.55.963-3.403 5.89-3.224 7.009.18 1.119 1.543-.002 1.543-.002s4.886-5.271 5.13-6.213c.244-.943-.712-1.392-1.347-1.657z\" fill=\"%23ffa000\" stroke=\"%23e9621f\" stroke-width=\".406\" transform=\"matrix(6.50417 1.39252 -1.39097 6.51142 -1499.653 -4435.396)\"/><path d=\"M365.16 606.471s1.639-.893 2.41.772M364.578 607.708s1.476-.582 2.14.718M363.942 608.886s1.164-.556 1.841.555M363.373 610.104s1.124-.541 1.476.501M362.676 611.247s.866-.393 1.259.406\" fill=\"none\" stroke=\"%23f66000\" stroke-width=\".283\" transform=\"matrix(6.50417 1.39252 -1.39097 6.51142 -1499.653 -4435.396)\"/></svg>' style='width: 32px; height: 32px; vertical-align: bottom;'>"
                + "carrotJS";

                // Add actual progress bar
                progress.innerHTML += ""
                + "<div><div></div></div>"

                // Add "loading ..." below.
                progress.innerHTML += "<font style='font-size: 16px;'>Loading ...</font>"

                // Create the progress bar itself.
                let progressBarBackground = progress.getElementsByTagName('div')[0];
                progressBarBackground.style.width = "320px";
                progressBarBackground.style.height = "24px";
                progressBarBackground.style.backgroundColor = "#1d2124";
                progressBarBackground.style.borderRadius = "12px";
                progressBarBackground.style.marginTop = "8px";
                progressBarBackground.style.overflow = "hidden";

                let progressBar = progress.getElementsByTagName('div')[1];
                progressBar.style.width = "0%";
                progressBar.style.height = "100%";
                progressBar.style.backgroundColor = "#2c3135";
                progressBar.style.transition = "width 0.5s linear";

                // Add everything to the game!
                that.background.appendChild(progress);

                // Store progress bar for manipulation through loader.
                that.load.progressBar = progressBar;

                // Start preload state
                that.scene.preload();
            }
        }

        console.log("%c🥕 carrotJS v" + Carrot.Version + " | HTML5 game engine utilizing the DOM | https://github.com/bonsaiheldin/carrotJS", "font-weight: bold;");

        return that;
    };

    document.addEventListener('DOMContentLoaded', start, false);
}

Carrot.Game.prototype =
{
    /**
     * Starts the update and the render loops of the core.
     * @method Carrot.Game#_render
     * @param {Carrot.Game} game - The core game object.
     * @private
     */
    start(game)
    {
        // Start the two core loops
        MainLoop.setUpdate(function(delta)
        {
            game._update(delta);
        }).setDraw(function()
        {
            game._render();
        }).start();

        // Run the given create state, if available.
        if (this.scene !== null)
        {
            if (this.scene.create)
            {
                this.scene.create();
            }
        }
    },

    /**
     * Sets the cursor image shown when the mouse is hovering the game container.
     * @method Carrot.Game#setCursor
     * @param {key}     key - The key (name) of the image to be used. If the image is not a previously loaded game asset, it will use the browser's set of default cursors.
     * @param {integer} x   - The key (name) of the image to be used.
     * @param {integer} y   - The key (name) of the image to be used.
     */
    setCursor(key, x, y)
    {
        if (x   === undefined) x = 0;
        if (y   === undefined) y = 0;
        if (key === undefined)
        {
            this.background.style.cursor = "";
        }

        else
        {
            let image = this.cache.images[key];
            if (image !== undefined)
            {
                this.background.style.cursor = "url(" + image.src + ") " + x + " " + y + ", default";
            }

            else
            {
                this.background.style.cursor = key;
            }
        }
    },

    /**
     * The internal update loop of the core. Happens automatically.
     * @method Carrot.Game#_update
     * @param {integer} delta - The time the last frame took in miliseconds. It is managed by the `_update` loop of {Carrot.Time}.
     * @private
     */
    _update(delta, b, c)
    {
        this.time._update(delta);
        this.world._update();
        this.camera._update();

        // Run the given update state, if available.
        if (this.scene !== null)
        {
            if (this.scene.update)
            {
                this.scene.update();
            }
        }
    },

    /**
     * The internal render loop of the core. Happens automatically.
     * @method Carrot.Game#_render
     * @private
     */
    _render(a, b, c)
    {
        this.world._render();
        this.camera._render();

        // Run the given render state, if available.
        if (this.scene !== null)
        {
            if (this.scene.render)
            {
                this.scene.render();
            }
        }
    }
};

Carrot.Game.prototype.constructor = Carrot.Game;

/**
 * The world container stores every sprite or group and updates them automatically. It is managed automatically by {@link Carrot.Game}.
 *
 * @class Carrot.World
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.World = function(game)
{
    this.game = game;
    this.camera = new Carrot.Camera(this.game);
    this.x = 0;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
    this.bounds = new Carrot.Rectangle(this.x, this.y, this.width, this.height);

    this.children = [];

    return this;
};

Carrot.World.prototype =
{
    /**
     * Adds a child to the world container. The child can be a sprite or a group.
     *
     * @method Carrot.World#addChild
     * @param {Carrot.Group | Carrot.Sprite} entity - The entity to add.
     */
    addChild(entity)
    {
        // Remove from old parent, if existing
        if (entity.parent !== this)
        {
            entity.parent.removeChild(entity);
        }

        // Add to world
        this.children.push(entity);
        entity.parent = this; // Update parent
    },

    /**
     * Removes the given child from the world container.
     *
     * @method Carrot.World#removeChild
     * @param {Carrot.Group | Carrot.Sprite} entity - The child to remove.
     */
    removeChild(entity)
    {
        this.children.splice(this.children.indexOf(entity), 1);
    },

    /**
     * Creates a sprite and immediately adds it to the world container.
     *
     * @method Carrot.World#create
     * @param {integer} [x=0] - The x coordinate in the world of the sprite.
     * @param {integer} [y=0] - The y coordinate in the world of the sprite.
     * @param {string}  [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
     * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
     * @param {boolean} [active=false] - The default active property of the sprite.
     * @return {Carrot.Sprite}
     */
    create(x, y, key, frame, active)
    {
        x = x || 0;
        y = y || 0;
        key = key || null;
        frame = frame || 0;
        active = active || false;

        let sprite = this.game.add.sprite(x, y, key, frame, active);

        // Add the sprite to the group.
        this.addChild(sprite);

        return sprite;
    },

    /**
     * Creates multiple sprites and adds them to the world container.
     *
     * @method Carrot.World#createMultiple
     * @param {integer} [quantity=1] - The x coordinate in the world of the sprite.
     * @param {integer} [x=0] - The x coordinate in the world of the sprite.
     * @param {integer} [y=0] - The y coordinate in the world of the sprite.
     * @param {string}  [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
     * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
     * @param {boolean} [active=false] - The default active property of the sprites.
     * @return {array}
     */
    createMultiple(quantity, x, y, key, frame, active)
    {
        quantity = quantity || 1;
        x = x || 0;
        y = y || 0;
        key = key || null;
        frame = frame || 0;
        active = active || false;

        let sprites = [];

        for (let i = 0; i < quantity; i++)
        {
            let sprite = this.game.add.sprite(x, y, key, frame, active);

            // Add the sprites to the group.
            this.addChild(sprite);

            sprites.push(sprite);
        }

        return sprites;
    },

    /**
     * Sets the size (bounds) of the game world.
     *
     * @method Carrot.World#setSize
     * @param {integer} [x=0]        - The left bound of the world.
     * @param {integer} [y=0]        - The top bound of the world.
     * @param {integer} [width=800]  - The right bound of the world.
     * @param {integer} [height=600] - The bottom bound of the world.
     */
    setSize(x, y, width, height)
    {
        this.x      = 0;
        this.y      = 0;
        this.width  = width;
        this.height = height;

        if (x      === undefined) this.x = 0;
        if (y      === undefined) this.y = 0;
        if (width  === undefined) this.width = 800;
        if (height === undefined) this.height = 600;
    },

    /**
     * The internal update loop of the world container. Happens automatically.
     *
     * @method Carrot.World#_update
     * @private
     */
    _update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            if (child.active)
            {
                child._update();

                // If the child has a custom update loop, call it.
                if (child.update)
                {
                    child.update();
                }
            }
        }
    },

    /**
     * The internal render loop of the world container. Happens automatically.
     *
     * @method Carrot.World#_render
     * @private
     */
    _render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child._render();
        }
    }
};

Carrot.World.prototype.constructor = Carrot.World;

/**
 * The camera presents the game to the player. It is managed automatically by {@link Carrot.Game}.
 *
 * @class Carrot.Camera
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Camera = function(game)
{
    this.game = game;
    this.world = this.game.world;
    this.x = 0;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
    this.bounds = new Carrot.Rectangle(this.x, this.y, this.width, this.height);
    this.left   = this.x;
    this.right  = this.x + this.width;
    this.top    = this.y;
    this.bottom = this.y + this.height;

    this.roundPixels = false;

    // Internal values
    this._x = this.x;
    this._y = this.y;

    this.target = null;

    return this;
};

Carrot.Camera.prototype =
{
    /**
     * Sets the size (bounds) of the camera.
     *
     * @method Carrot.World#setSize
     * @param {integer} [width=800]  - The width of the camera.
     * @param {integer} [height=600] - The height of the camera.
     */
    setSize(width, height)
    {
        this.width  = width;
        this.height = height;

        if (width  === undefined) this.width = 800;
        if (height === undefined) this.height = 600;
    },

    /**
     * Let the camera follow a sprite.
     *
     * @method Carrot.Camera#follow
     * @param {Carrot.Sprite} target - The sprite the camera shall follow.
     */
    follow(target)
    {
        if (target)
        {
            this.target = target;
        }
    },

    /**
     * Let the camera stop following any entity.
     *
     * @method Carrot.Camera#unfollow
     */
    unfollow()
    {
        this.target = null;
    },

    /**
     * The internal update loop of the camera. It is managed automatically by {@link Carrot.World}.
     *
     * @method Carrot.Camera#_update
     * @private
     */
    _update()
    {
        if (this.target !== null)
        {
            this._x = this.x;
            this._y = this.y;

            let targetX = this.target.x;
            let targetY = this.target.y;
            let worldWidthHalf = this.width * 0.5;
            let worldHeightHalf = this.height * 0.5;

            // Left / right
            if (targetX > worldWidthHalf
             && targetX <= this.world.width - worldWidthHalf)
            {
                this.x = targetX - (this.width * 0.5);
            }

            // Top / bottom
            if (targetY > worldHeightHalf
             && targetY <= this.world.height - worldHeightHalf)
            {
                this.y = targetY - worldHeightHalf;
            }
        }

        // Rounding pixels if desired.
        if (this.game.roundPixels
         || this.roundPixels)
        {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }

        // Update internal values
        this.left   = this.x;
        this.right  = this.left + this.width;
        this.top    = this.y;
        this.bottom = this.top + this.height;
    },

    /**
     * The internal render loop of the camera. It is managed automatically by {@link Carrot.World}.
     *
     * @method Carrot.Camera#_render
     * @private
     */
    _render()
    {
        // Transform the game div according to the camera.
        // But only if the position has changed.
        if (this.x !== this._x || this.y !== this._y)
        {
            this.game.parent.style.left = -this.x + "px";
            this.game.parent.style.top = -this.y + "px";
        }
    }
};

Carrot.Camera.prototype.constructor = Carrot.Camera;

/**
 * Groups are containers storing game objects (sprites). They are added automatically to the world container.
 *
 * @class Carrot.Group
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Group = function(game)
{
    this.game = game;
    this.world = this.game.world;

    this.physicsEnabled = false;

    // Internal values
    this.type = Carrot.GROUP;
    this.active = true;
    this.parent = this.world;
    this.children = [];
    this.inactives = [];

    // Add it to the world
    this.parent.addChild(this);

    return this;
};

Carrot.Group.prototype =
{
    /**
     * Adds an entity to a group. The entity can be a sprite or another group.
     *
     * @method Carrot.Group#addChild
     * @param {Carrot.Group | Carrot.Sprite} entity - The entity to add.
     */
    addChild(entity)
    {
        // Remove from old parent
        if (entity.parent !== this)
        {
            entity.parent.removeChild(entity);
        }

        // Add to group
        if (entity.active)
        {
            this.children.push(entity);
        }

        else
        {
            this.inactives.push(entity);
        }

        entity.parent = this; // Update parent.
    },

    /**
     * Removes the given entity from a group.
     *
     * @method Carrot.Group#removeChild
     * @param {Carrot.Group | Carrot.Sprite} entity - The entity to remove.
     */
    removeChild(entity)
    {
        if (entity.active)
        {
            this.children.splice(this.children.indexOf(entity), 1);
        }

        else
        {
            this.inactives.splice(this.inactives.indexOf(entity), 1);
        }
    },

    /**
     * Iterates all children of the group and sets their `property` to the given `value`.
     *
     * @method Carrot.Group#setAll
     * @param {string} property - The property to change.
     * @param {any} value - The new value for the property.
     * @param {boolean} [active=true] - Defines if the active or the inactive sprites shall be affected.
     */
    setAll(property, value, active)
    {
        property = property.split('.');
        active = active;

        if (active === undefined) active = true;

        let key1 = property[0] || "";
        let key2 = property[1] || "";
        let key3 = property[2] || "";

        let array = this.children;
        if (active === false) array = this.inactives;


        for (let i = 0; i < array.length; i++)
        {
            let child = array[i];

            if (child[key1] !== undefined)
            {
                if (child[key1][key2] !== undefined)
                {
                    if (child[key1][key2][key3] !== undefined)
                    {
                        child[key1][key2][key3] = value;
                    }

                    else
                    {
                        child[key1][key2] = value;
                    }
                }

                else
                {
                    child[key1] = value;
                }
            }
        }
    },

    /**
     * Creates a sprite and adds it to the group.
     *
     * @method Carrot.Group#create
     * @param {integer} [x=0] - The x coordinate in the world of the sprite.
     * @param {integer} [y=0] - The y coordinate in the world of the sprite.
     * @param {string}  [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
     * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
     * @param {boolean} [active=false] - The default active property of the sprites.
     * @return {Carrot.Sprite}
     */
    create(x, y, key, frame, active)
    {
        if (x      === undefined) x     = 0;
        if (y      === undefined) y     = 0;
        if (key    === undefined) key   = null;
        if (frame  === undefined) frame = 0;
        if (active === undefined) active = false;

        let sprite = this.game.add.sprite(x, y, key, frame, active);

        if (this.physicsEnabled)
        {
            app.game.physics.enable(sprite);
        }

        // Add the sprite to the group.
        this.addChild(sprite);

        return sprite;
    },

    /**
     * Creates multiple sprites and adds them to the group.
     *
     * @method Carrot.Group#createMultiple
     * @param {integer} [quantity=0] - The quantity of sprites to create.
     * @param {integer} [x=0] - The x coordinate in the world of the sprite.
     * @param {integer} [y=0] - The y coordinate in the world of the sprite.
     * @param {string}  [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
     * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
     * @param {boolean} [active=false] - The default active property of the sprites.
     * @return {Carrot.Sprite[]}
     */
    createMultiple(quantity, x, y, key, frame, active)
    {
        if (quantity === undefined) quantity = 0;
        if (x        === undefined) x        = 0;
        if (y        === undefined) y        = 0;
        if (key      === undefined) key      = null;
        if (frame    === undefined) frame    = 0;
        if (active   === undefined) active    = false;

        let sprites = [];

        for (let i = 0; i < quantity; i++)
        {
            let sprite = this.game.add.sprite(x, y, key, frame, active);

            if (this.physicsEnabled)
            {
                app.game.physics.enable(sprite);
            }

            // Add the sprites to the group.
            this.addChild(sprite);

            sprites.push(sprite);
        }

        return sprites;
    },

    /**
     * Returns an inactive sprite from the group.
     *
     * @method Carrot.Group#getInactive
     * @param {boolean} [createIfNull=false] - If no inactive sprite could be found, create one, add it to this group and return it.
     * @param {integer} [x=0] - The x coordinate in the world of the sprite.
     * @param {integer} [y=0] - The y coordinate in the world of the sprite.
     * @param {string}  [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
     * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
     * @return {Carrot.Sprite}
     */
    getInactive(createIfNull, x, y, key, frame)
    {
        if (createIfNull === undefined) createIfNull = false;;
        if (x            === undefined) x            = 0;
        if (y            === undefined) y            = 0;
        if (key          === undefined) key          = null;
        if (frame        === undefined) frame        = 0;

        for (let i = 0; i < this.inactives.length; i++)
        {
            let child = this.inactives[i];
            if (child.active === false)
            {
                child.x = x;
                child.y = y;
                child.key = key;
                child.frame = 0;

                return child;
            }
        }

        // If no inactive sprite could be found, consider creating a new one.
        if (createIfNull)
        {
            return this.create(x, y, key, frame, false);
        }

        else
        {
            return null;
        }
    },

    /**
     * Counts the inactive sprites in the group.
     *
     * @method Carrot.Group#countInactive
     * @return {integer}
     */
    countInactive()
    {
        let result = 0;

        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];
            if (child.active === false)
            {
                result += 1;
            }
        }

        return result;
    },

    /**
     * Counts the active sprites in the group.
     *
     * @method Carrot.Group#countActive
     * @return {integer}
     */
    countActive()
    {
        let result = 0;

        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];
            if (child.active === true)
            {
                result += 1;
            }
        }

        return result;
    },

    /**
     * Destroys the group and removes it entirely from the game world.
     *
     * @method Carrot.Group#destroy
     * @param {boolean} [destroyChildren=false] - If true, all the children of the sprite and their children are destroyed, too.
     */
    destroy(destroyChildren)
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            // If the children of the sprite shall be destroyed, too.
            if (destroyChildren)
            {
                child.destroy(true);
            }

            // If not, add them to the world container instead, so they're still updated.
            else
            {
                this.removeChild(child);
            }
        }

        this.active = false;

        // Remove the group from the world container
        this.parent.removeChild(this);
    },

    /**
     * The internal update loop of the group. It is managed automatically by {@link Carrot.World}.
     *
     * @method Carrot.Group#_update
     * @private
     */
    _update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            if (child.active)
            {
                child._update();

                // If the child has a custom update loop, call it.
                if (child.update)
                {
                    child.update();
                }
            }
        }
    },

    /**
     * The internal render loop of the group. It is managed automatically by {@link Carrot.World}.
     *
     * @method Carrot.Group#_render
     * @private
     */
    _render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child._render();
        }
    }
};

Carrot.Group.prototype.constructor = Carrot.Group;

/**
 * Sprites are game objects which contain the actual HTML elements for rendering.
 *
 * @class Carrot.Sprite
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 * @param {integer} [x=0] - The x coordinate in the world of the sprite.
 * @param {integer} [y=0] - The y coordinate in the world of the sprite.
 * @param {string} [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
 * @param {integer} [frame=0] - Only for spritesheets: The starting frame of the image. If not passed, it will be 0, the first frame.
 */
Carrot.Sprite = function(game, x, y, key, frame, active)
{
    this.x      = x;
    this.y      = y;
    this.key    = key;
    this.frame  = frame;
    this.active = active;

    if (x      === undefined) this.x     = 0;
    if (y      === undefined) this.y     = 0;
    if (key    === undefined) this.key   = null;
    if (frame  === undefined) this.frame = 0;
    if (active === undefined) this.active = true;

    // Internal values
    this.game = game;
    this.world = this.game.world;
    this.camera = this.game.camera;
    this.time = this.game.time;
    this.type = Carrot.SPRITE;
    this.parent = this.world;
    this.children = [];

    this.alpha = 1;
    this.width = 32;
    this.height = 32;
    this.anchor = new Carrot.Point(0, 0);
    this.left   = this.x - (this.width * this.anchor.x);
    this.right  = this.left + this.width;
    this.top    = this.y - (this.height * this.anchor.y);
    this.bottom = this.top + this.height;
    this.outOfBoundsKill = false;
    this.inCamera = false;
    this.css = {}; // This object stores all data relevant to CSS rendering.
    this.css.transform = ''; // String to collect CSS transforms for this sprite.
    this.angle = 0; // Default image angle
    this.roundPixels = false;

    // Values from the previous frame
    this._x     = this.x;
    this._y     = this.y;
    this._angle = this.angle;
    this._alpha = this.alpha;

    // Physics are disabled by default.
    this.body = null;

    // Create HTML element if desired.
    this.image = null;
    this.style = null;

    this.visible = true;

    if (this.active)
    {
        this.revive();
    }

    // Add it to the world
    this.parent.addChild(this);

    // Test
    this.name = "Unknown sprite";

    return this;
};

Carrot.Sprite.prototype =
{
    /**
     * Creates the HTML element for this sprite. Called by {Carrot.Sprite} or revive().
     *
     * @method Carrot.Sprite#createNode
     * @return {object}
     */
    createNode()
    {
        if (this.image === null)
        {
            // HTML magic
            let node = document.createElement('div');
            this.image = node;
            this.style = this.image.style;

            // Apply standard values
            this.image.style.position = "absolute";
            this.image.style.width = "32px";
            this.image.style.height = "32px";
            this.image.style.backgroundSize = "cover";

            // If an image was given, apply it as a background image
            if (this.key !== null)
            {
                let image = this.game.cache.images[this.key];

                this.style.backgroundImage = "url(" + image.src + ")";
                this.width  = image.width;
                this.height = image.height;

                this.image.style.width = this.width + "px";
                this.image.style.height = this.height + "px";

                // Apply frame on spritesheet
                if (this.frame !== 0)
                {
                    let frame = image.frames[this.frame];
                    this.image.style.backgroundPosition = frame.x + "px " + frame.y + "px";
                }
            }

            // Render it once
            this.image.style.left = this.x - (this.width  * 0.5) + "px";
            this.image.style.top  = this.y - (this.height * 0.5) + "px";

            // Add the HTML div to the page.
            this.game.parent.appendChild(this.image);

            return node;
        }
    },

    /**
     * Removes the HTML element of this sprite. Called by {Carrot.Sprite}, kill or destroy.
     *
     * @method Carrot.Sprite#destroyNode
     */
    destroyNode()
    {
        if (this.image !== null)
        {
            this.image.parentNode.removeChild(this.image);
            this.image = null;
            this.style = null;
        }
    },

    /**
     * Adds a child to the sprite. The entity must be another sprite.
     *
     * @method Carrot.Sprite#addChild
     * @param {Carrot.Sprite} entity - The entity to add.
     */
    addChild(entity)
    {
        // HTML magic
        if (entity.image !== null)
        {
            // Remove the sprite's image from the main HTML and add it to the sprite's div.
            this.game.parent.removeChild(entity.image);
            this.image.appendChild(entity.image);

            entity.image.style.left = entity.x - (entity.width  * entity.anchor.x) + "px";
            entity.image.style.top  = entity.y - (entity.height * entity.anchor.y) + "px";
        }

        // Remove from old parent
        if (entity.parent !== this)
        {
            entity.parent.removeChild(entity);
        }

        // Add to sprite
        this.children.push(entity);
        entity.parent = this; // Update parent
    },

    /**
     * Removes the passed child from the sprite.
     *
     * @method Carrot.Sprite#removeChild
     * @param {Carrot.Sprite} entity - The entity to remove.
     */
    removeChild(entity)
    {
        // Remove the sprite's image from the sprite and add it to the main HTML.
        this.image.removeChild(entity.image);
        this.game.parent.appendChild(entity.image);

        this.children.splice(this.children.indexOf(entity), 1);
    },

    /**
     * Kills the sprite. Used for object pools.
     *
     * @method Carrot.Sprite#kill
     * @param {boolean} [destroyNode] - If `true`, will destroy the sprite's HTML element.
     */
    kill(destroyNode)
    {
        // Remove from actives array.
        this.parent.removeChild(this);

        this.active = false;
        this.visible = false;

        // Add to inactives array.
        this.parent.addChild(this);

        // Remove the sprite's HTML element if there is one
        if (destroyNode)
        {
            this.destroyNode();
        }
    },

    /**
     * Revives the sprite. Used for object pools.
     *
     * @method Carrot.Sprite#revive
     */
    revive()
    {
        // Remove from inactives array.
        this.parent.removeChild(this);

        this.active = true;
        this.visible = true;

        // Add to actives array.
        this.parent.addChild(this);

        // Create HTML element if none exists
        this.createNode();

    },

    /**
     * Destroys the sprite and removes it from its group and the game world.
     *
     * @method Carrot.Sprite#destroy
     * @param {boolean} [destroyChildren=false] - If true, all the children of the sprite and their children are destroyed, too.
     */
    destroy(destroyChildren)
    {
        destroyChildren = destroyChildren || false;

        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            // If the children of the sprite shall be destroyed, too.
            if (destroyChildren)
            {
                child.destroy(true);
            }

            // If not, add them to the world container instead, so they're still updated.
            else
            {
                this.removeChild(child);
            }
        }

        // Remove the sprite from its group or the world container.
        this.parent.removeChild(this);

        // Remove the HTML element of the sprite
        this.destroyNode();
    },

    /**
     * Changes the frame shown. Only for spritesheets.
     *
     * @method Carrot.Sprite#setFrame
     * @param {integer} [frame=0]
     */
    setFrame(frame)
    {
        frame = frame || 0;
        frame = this.game.cache.images[this.key].frames[frame];
        this.image.style.backgroundPosition = frame.x + "px " + frame.y + "px";
    },

    /**
     * Applies a glow effect on the sprite. Its shape is determined by the sprite's body which can be a rectangle or a circle.
     *
     * @method Carrot.Sprite#setGlow
     * @param {integer} [blur=0] - Blur in pixels.
     * @param {integer} [spread=0] - Spread in pixels.
     * @param {Carrot.Color | string} [color=Carrot.Color.Lime] - The color of the glow. Must be given in one of the following formats: Hexadecimal, RGB, RGBA, HSL, HSLA or one of the 140 predefined browser colors.
     * @param {boolean} [inset=false] - Defines if the glow should be go out or inside the sprite.
     */
     setGlow(blur, spread, color, inset)
     {
         if (blur !== false)
         {
             blur   = blur || 0;
             blur   = blur + "px ";
             spread = spread || 0;
             spread = spread + "px ";
             color = color || Carrot.Color.Lime;
             if (inset) { inset = " inset"; }
                   else { inset = ""; }

             this.image.style.boxShadow = "0px 0px " + blur + spread + color + inset;
         }

         // If the first parameter is false or not given, disable the glow.
         else if (blur === undefined)
         {
             this.image.style.boxShadow = "";
         }
     },

     /**
      * The custom update loop of the sprite. It is managed automatically by {@link Carrot.World} or {@link Carrot.Group}, depending on whhich it was added to.
      *
      * @method Carrot.Sprite#_update
      * @private
      */
     update: function(){},

    /**
     * The internal update loop of the sprite. It is managed automatically by {@link Carrot.World} or {@link Carrot.Group}, depending on whhich it was added to.
     *
     * @method Carrot.Sprite#_update
     * @private
     */
    _update()
    {
        // Save values of this frame
        this._x     = this.x;
        this._y     = this.y;
        this._angle = this.angle;
        this._alpha = this.alpha;

        // Store some variables for faster accessing
        let worldWidth   = this.world.width;
        let worldHeight  = this.world.height;

        // Check if inside camera bounds
        this.inCamera = false;

        if (this.right  > this.camera.left
         && this.bottom > this.camera.top
         && this.left   < this.camera.right
         && this.top    < this.camera.bottom)
        {
            this.inCamera = true;
        }

        // Physics
        if (this.body !== null)
        {
            // Physics enabled on this body?
            if (this.body.enabled)
            {
                // Reset body.touching
                this.body.touching.none   = true;
                this.body.touching.left   = false;
                this.body.touching.right  = false;
                this.body.touching.top    = false;
                this.body.touching.bottom = false;

                // Rotating
                if (this.body.angularVelocity !== 0)
                {
                    this.angle += this.body.angularVelocity * this.time.delta;
                }

                // Rotation decelaration
                if (this.body.allowAngularDrag)
                {
                    if (this.body.angularDrag > 0)
                    {
                        this.angle += (1 - this.body.angularDrag);
                    }
                }

                // Acceleration
                if (this.body.allowAcceleration)
                {
                    this.body.velocity.x += this.body.acceleration.x * this.time.delta;
                    this.body.velocity.y += this.body.acceleration.y * this.time.delta;
                }

                // Gravity
                if (this.body.allowGravity)
                {
                    this.body.velocity.x += this.body.gravity.x * this.time.delta;
                    this.body.velocity.y += this.body.gravity.y * this.time.delta;
                }

                // Drag: Deceleration
                if (this.body.allowDrag)
                {
                    this.body.velocity.x *= (1 - this.body.drag.x);
                    this.body.velocity.y *= (1 - this.body.drag.y);
                }

                // Limit velocity
                let maxVelX = this.body.maxVelocity.x;
                let maxVelY = this.body.maxVelocity.y;

                     if (this.body.velocity.x > maxVelX)  { this.body.velocity.x = maxVelX; }
                else if (this.body.velocity.x < -maxVelX) { this.body.velocity.x = -maxVelX; }
                     if (this.body.velocity.y > maxVelY)  { this.body.velocity.y = maxVelY; }
                else if (this.body.velocity.y < -maxVelY) { this.body.velocity.y = -maxVelY; }

                // Moving
                this.x += this.body.velocity.x * this.time.delta;
                this.y += this.body.velocity.y * this.time.delta;

                // Rounding pixels if desired.
                if (this.game.roundPixels
                 || this.roundPixels)
                {
                    this.x = Math.round(this.x);
                    this.y = Math.round(this.y);
                }

                // Let the sprite collide with the world bounds
                if (this.body.collideWorldBounds)
                {
                    // Left, right, top, bottom
                    if (this.x <= this.width)
                    {
                        this.x = this.width;

                        this.body.touching.none = false;
                        this.body.touching.left = true;

                        // Bouncing
                        if (this.body.allowBounce)
                        {
                            this.body.velocity.x = -(this.body.velocity.x * this.body.bounce.x);
                        }
                    }

                    else if (this.x + this.width >= worldWidth)
                    {
                        this.x = worldWidth - this.width;

                        this.body.touching.none = false;
                        this.body.touching.right = true;

                        // Bouncing
                        if (this.body.allowBounce)
                        {
                            this.body.velocity.x = -(this.body.velocity.x * this.body.bounce.x);
                        }
                    }

                    if (this.y <= this.height)
                    {
                        this.y = this.height;

                        this.body.touching.none = false;
                        this.body.touching.top = true;

                        // Bouncing
                        if (this.body.allowBounce)
                        {
                            this.body.velocity.y = -(this.body.velocity.y * this.body.bounce.y);
                        }
                    }

                    else if (this.y + this.height >= worldHeight)
                    {
                        this.y = worldHeight - this.height;

                        this.body.touching.none = false;
                        this.body.touching.bottom = true;

                        // Bouncing
                        if (this.body.allowBounce)
                        {
                            this.body.velocity.y = -(this.body.velocity.y * this.body.bounce.y);
                        }
                    }
                }
            }
        }

        // Kill the sprite if it leaves the world bounds
        if (this.outOfBoundsKill)
        {
            // Left, right, top, bottom
            if (this.left   < 0
             || this.right  > worldWidth
             || this.top    < 0
             || this.bottom > worldHeight)
            {
                this.kill(true); // Remove its HTML element, too.
            }
        }

        // Update some internal stuff
        this.left   = this.x;
        this.right  = this.x + this.width;
        this.top    = this.y;
        this.bottom = this.y + this.height;

        // Collect all transforms and apply them in the render function
        this.css.transform = "";

        if (this.angle !== 0)
        {
            this.css.transform += " rotate(" + this.angle + "deg) ";
        }

        // Update the sprite's children
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            if (child.active)
            {
                child._update();

                // If the child has a custom update loop, call it.
                if (child.update)
                {
                    child.update();
                }
            }
        }
    },

    /**
     * The internal render loop of the sprite. It is managed automatically by {@link Carrot.World} or {@link Carrot.Group}, depending on whhich it was added to.
     *
     * @method Carrot.Sprite#_render
     * @private
     */
    _render()
    {
        if (this.active)
        {
            // Don't display the sprite if not in camera.
            if (this.inCamera === false)
            {
                if (this.visible === true)
                {
                    this.visible = false;
                    this.style.display = "none";
                }
            }

            // Apply cosmetic CSS rules only when inside camera bounds.
            else
            {
                if (this.visible === false)
                {
                    this.visible = true;
                    this.style.display = "";
                }

                if (this.alpha !== this._alpha)
                {
                    if (this.alpha < 1)
                    {
                        this.style.opacity = this.alpha;
                    }
                }

                // Update only if the current values don't match the ones from the last frame
                if (this.x !== this._x)
                {
                    this.image.style.left = this.x - (this.width * this.anchor.x) + "px";
                }

                if (this.y !== this._y)
                {
                    this.image.style.top = this.y - (this.height * this.anchor.y) + "px";
                }

                // Apply CSS transform.
                this.style.transform = this.css.transform;
            }

            // Render the sprite's children
            for (let i = 0; i < this.children.length; i++)
            {
                let child = this.children[i];

                child._render();
            }
        }
    }
};

Carrot.Sprite.prototype.constructor = Carrot.Sprite;

/**
 * The Time container stores the current time, the time the game has started at and the delta time for animating.
 *
 * @class Carrot.Time
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Time = function(game)
{
    this.game = game;

    this.now = performance.now();
    this.lastFrame = this.now;
    this.delta = 1000 / 60;

    this.timers = [];

    return this;
};

Carrot.Time.prototype =
{
    /**
     * The internal update loop of the time object. It is managed automatically by {@link Carrot.Game}.
     * @method Carrot.Time#_update
     * @private
     */
    _update(delta)
    {
        this.lastFrame = this.now;
        this.now = performance.now();
        this.lastFrame = this.now - this.lastFrame;
        this.delta = delta / 1000;

        // Update timers
        for (let i = 0; i < this.timers.length; i++)
        {
            let timer = this.timers[i];

            timer._update(this.lastFrame);
        }
    }
};

Carrot.Time.prototype.constructor = Carrot.Time;

/**
 * Handler for timed events.
 *
 * @class Carrot.Timer
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 * @param {delay} delay - The amount of time when the timer shall fire.
 * @param {function} callback - The method to be called when the timer fires.
 * @param {integer} timesToRepeat - Times the timer shall be repeat. 0 is a one time event.
 */
Carrot.Timer = function(game, delay, callback, timesToRepeat, startNow)
{
    this.game = game;
    this.time = this.game.time;

    this.delay         = delay;
    this.callback      = callback;
    this.timesToRepeat = timesToRepeat;
    this.startNow      = startNow;

    if (this.delay         === undefined) { this.delay = 0; }
    if (this.callback      === undefined) { this.callback = function(){}; }
    if (this.timesToRepeat === undefined) { this.timesToRepeat = 0; }
    if (this.startNow      === undefined) { this.startNow = true; }

    this.startTime = this.time.now;
    this.endTime   = this.startTime + this.delay;
    this.timesExecuted = 0;

    this.isRunning = true;
    if (this.startNow === false)
    {
        this.isRunning = false
    }

    // Add it to {@link Carrot.Time} for managing.
    this.time.timers.push(this);

    return this;
};

Carrot.Timer.prototype =
{
    /**
     * Starts the timer
     * @method Carrot.Timer#start
     */
    start()
    {
        this.isRunning = true;
    },

    /**
     * Pauses the timer.
     * @method Carrot.Timer#pause
     */
    stop()
    {
        this.isRunning = false;
    },

    /**
     * Resumes the timer.
     * @method Carrot.Timer#pause
     */
    resume()
    {
        this.isRunning = true;
    },

    /**
     * Destroys the timer and removes it from {@link @Carrot.Time}.
     * @method Carrot.Timer#destroy
     */
    destroy()
    {
        this.time.timers.splice(this.time.timers.indexOf(this), 1);
    },

    /**
     * The internal update loop of the timed event. It is managed automatically by {@link Carrot.Time}.
     * @method Carrot.Timer#_update
     * @private
     */
    _update()
    {
        if (this.isRunning)
        {
            if (this.time.now >= this.endTime)
            {
                this.callback();

                //console.log("time passed since start: ", this.time.now - this.startTime)

                this.timesExecuted += 1;

                // If desired repeats are reached, stop the timer.
                if (this.timesToRepeat !== -1
                 && this.timesExecuted > this.timesToRepeat)
                {
                    this.destroy();
                }

                // If not, repeat.
                else
                {
                    this.endTime = this.time.now + this.delay;
                }
            }
        }
    }
};

Carrot.Timer.prototype.constructor = Carrot.Timer;

/**
 * The Math object offers various standard math functions like measuring a distance or angles.
 *
 * @class Carrot.Math
 * @param {Carrot.Game} game - The core game object.
 * @static
 */
Carrot.Math = function(game)
{
    this.game = game;

    return this;
};

Carrot.Math.prototype =
{
    /**
     * PI.
     * @property {integer} Carrot.Math#PI
     * @type {integer}
     */
    PI: Math.PI,

    /**
     * Twice PI.
     * @property {integer} Carrot.Math#PI2
     * @type {integer}
     */
    PI2: Math.PI * 2,

    /**
     * Degrees to Radians factor.
     * @property {integer} Carrot.Math#DEG_TO_RAD
     */
    DEG_TO_RAD: Math.PI / 180,

    /**
     * Degrees to Radians factor.
     * @property {integer} Carrot.Math#RAD_TO_DEG
     */
    RAD_TO_DEG: 180 / Math.PI,

    /**
     * Converts degrees to radians.
     *
     * @method Carrot.Math#degToRad
     * @param {integer} degrees - Angle in degrees.
     * @return {float} Angle in radians.
     */
    degToRad(degrees)
    {
        return degrees * this.DEG_TO_RAD;
    },

    /**
     * Converts radians to degrees.
     *
     * @method Carrot.Math#radToDeg
     * @param {integer} radians - Angle in radians.
     * @return {integer} Angle in degrees.
     */
    radToDeg(radians)
    {
        return radians * this.RAD_TO_DEG;
    },

    /**
     * Returns an integer between (including) min and (including) max
     *
     * @method Carrot.Math#integerInRange
     * @param {integer} min - Min.
     * @param {integer} max - Max.
     * @return {integer}
     */
    integerInRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Calculates the angle between two vectors in degrees.
     *
     * @method Carrot.Math#angleBetweenPoints
     * @param {integer} x1 - x1
     * @param {integer} y1 - x1
     * @param {integer} x2 - x2
     * @param {integer} y2 - y2
     * @return {integer}
     */
    angleBetweenPoints(x1, y1, x2, y2)
    {
        return Math.atan2(y2 - y1, x2 - x1);
    },

    /**
     * Calculates the angle between two entities in degrees. Both must have x / y coordinates.
     *
     * @method Carrot.Math#angleBetween
     * @param {Carrot.Sprite | object} a - The first entity.
     * @param {Carrot.Sprite | object} b - The second entity.
     * @return {floar}
     */
    angleBetween(a, b)
    {
        return Math.atan2(b.y - a.y, b.x - a.x);
    },

    /**
     * Calculates the distance between two vectors in pixels.
     *
     * @method Carrot.Math#distanceBetweenPoints
     * @param {integer} x1 - x1
     * @param {integer} y1 - x1
     * @param {integer} x2 - x2
     * @param {integer} y2 - y2
     * @return {floar}
     */
    distanceBetweenPoints(x1, y1, x2, y2)
    {
        return Math.hypot(x2 - x1, y2 - y1);
    },

    /**
     * Calculates the distance between two entities. Both must have x / y coordinates.
     *
     * @method Carrot.Math#distanceBetween
     * @param {Carrot.Sprite | object} a - The first entity.
     * @param {Carrot.Sprite | object} b - The second entity.
     * @return {float}
     */
    distanceBetween(a, b)
    {
        return Math.hypot(b.x - a.x, b.y - a.y);
    }
};

Carrot.Math.prototype.constructor = Carrot.Math;

/**
 * The Sound Manager offers audio functions.
 *
 * @class Carrot.SoundManager
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.SoundManager = function(game)
{
    this.game = game;

    return this;
};

Carrot.SoundManager.prototype =
{
    /**
     * Plays an audio file that has been loaded before by {Carrot.AssetLoader}. If the sound is already playing, restart it.
     *
     * @method Carrot.SoundManager#play
     * @private
     */
    play(file, loop)
    {
        var file = this.game.cache.sounds[file];
        if (! file.paused)
        {
            file.pause();
            file.currentTime = 0;
            file.play();
        }

        else
        {
            file.play();
        }

        // Music?
        if (loop !== undefined)
        {
            file.loop = loop;
        }
    }
};

Carrot.SoundManager.prototype.constructor = Carrot.SoundManager;

/**
 * The Physics object offers physics related functions like collision detection.
 *
 * @class Carrot.Physics
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Physics = function(game)
{
    this.game = game;
    this.time = this.game.time;

    return this;
}

Carrot.Physics.prototype =
{
    /**
    * Enables physics on a sprite by adding a physics body to it.
    *
    * @method Carrot.Physics#enable
    * @param {Carrot.Sprite} entity - The sprite to get its physics enabled.
    */
    enable(entity)
    {
        if (entity.body === null)
        {
            entity.body = new Carrot.Physics.Body(entity);
        }
    },

    /**
    * Disables physics on a sprite by setting its body to null.
    *
    * @method Carrot.Physics#disable
    * @param {Carrot.Sprite} entity - The sprite to get its physics disabled.
    */
    disable(entity)
    {
        if (entity.body !== null)
        {
            entity.body = null;
        }
    },

    /**
    * Checks for collision between entities which can be sprites or groups.
    *
    * @method Carrot.Physics#collide
    * @param {Carrot.Group | Carrot.Sprite} entity1
    * @param {Carrot.Group | Carrot.Sprite} entity2
    * @param {function} [callback=null] - The function that shall be executed when the collision happens.
    * @return {boolean} If a collision was detected.
    */
    collide(entity1, entity2, callback)
    {
        callback = callback || null;

        if (entity1.type === Carrot.SPRITE)
        {
            if (entity2.type === Carrot.SPRITE)
            {
                this.collideSpriteVsSprite(entity1, entity2, callback);
            }

            else if (entity2.type === Carrot.GROUP)
            {
                this.collideSpriteVsGroup(entity1, entity2, callback);
            }
        }

        else if (entity1.type === Carrot.GROUP)
        {
            if (entity2.type === Carrot.SPRITE)
            {
                this.collideSpriteVsGroup(entity2, entity1, callback);
            }

            else if (entity2.type === Carrot.GROUP)
            {
                this.collideGroupVsGroup(entity1, entity2, callback);
            }
        }
    },

    /**
    * Checks for overlaps between entities which can be sprites or groups.
    *
    * @method Carrot.Physics#overlap
    * @param {Carrot.Group | Carrot.Sprite} entity1
    * @param {Carrot.Group | Carrot.Sprite} entity2
    * @param {function} [callback=null] - The function that shall be executed when the overlap happens.
    * @return {boolean} If an overlap was detected.
    */
    overlap(entity1, entity2, callback)
    {
        callback = callback || null;

        if (entity1.type === Carrot.SPRITE)
        {
            if (entity2.type === Carrot.SPRITE)
            {
                this.collideSpriteVsSprite(entity1, entity2, callback, true);
            }

            else if (entity2.type === Carrot.GROUP)
            {
                this.collideSpriteVsGroup(entity1, entity2, callback, true);
            }
        }

        else if (entity1.type === Carrot.GROUP)
        {
            if (entity2.type === Carrot.SPRITE)
            {
                this.collideSpriteVsGroup(entity2, entity1, callback, true);
            }

            else if (entity2.type === Carrot.GROUP)
            {
                this.collideGroupVsGroup(entity1, entity2, callback, true);
            }
        }
    },

    /**
    * Checks for collision between two groups. Use {Carrot.Physics#collide} or {Carrot.Physics#overlap} instead.
    *
    * @method Carrot.Physics#collideGroupVsGroup
    * @param {Carrot.Group} group1
    * @param {Carrot.Group} group2
    * @param {function} [callback=null] - The function that shall be executed when the collision or overlap happens.
    * @param {boolean} [overlapOnly=false] - Defines if the function shall only check for overlap and disable physics.
    * @return {boolean} If a collision was detected.
    * @private
    */
    collideGroupVsGroup(group1, group2, callback, overlapOnly)
    {
        callback = callback || null;
        overlapOnly = overlapOnly || false;

        for (let i = 0; i < group1.children.length; i++)
        {
            let a = group1.children[i];
            for (let j = 0; j < group2.children.length; j++)
            {
                let b = group2.children[j];
                if (b !== a)
                {
                    if (a.body.isRectangle === true)
                    {
                        if (b.body.isRectangle === true)
                        {
                            if (this.intersectRectangleVsRectangle(a, b))
                            {
                                // If a callback was passed, call it.
                                if (callback !== null)
                                {
                                    callback(a, b);
                                }

                                // Apply collision, if desired.
                                if (overlapOnly === false)
                                {
                                }
                            }
                        }

                        else if (b.body.isCircle === true)
                        {
                            if (this.intersectRectangleVsCircle(a, b))
                            {
                                // If a callback was passed, call it.
                                if (callback !== null)
                                {
                                    callback(a, b);
                                }

                                // Apply collision, if desired.
                                if (overlapOnly === false)
                                {
                                }
                            }
                        }
                    }

                    else if (a.body.isCircle === true)
                    {
                        if (b.body.isCircle === true)
                        {
                            if (this.intersectCircleVsCircle(a, b))
                            {
                                // If a callback was passed, call it.
                                if (callback !== null)
                                {
                                    callback(a, b);
                                }
                            }
                        }

                        else if (a.body.isRectangle === true)
                        {
                            if (this.intersectRectangleVsCircle(b, a))
                            {
                                // If a callback was passed, call it.
                                if (callback !== null)
                                {
                                    callback(a, b);
                                }

                                // Apply collision, if desired.
                                if (overlapOnly === false)
                                {
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    /**
    * Checks for collision between a sprite and a group. Use {Carrot.Physics#collide} or {Carrot.Physics#overlap} instead.
    *
    * @method Carrot.Physics#collideSpriteVsGroup
    * @param {Carrot.Sprite} sprite
    * @param {Carrot.Group} group
    * @param {function} [callback=null] - The function that shall be executed when the collision or overlap happens.
    * @param {boolean} [overlapOnly=false] - Defines if the function shall only check for overlap and disable physics.
    * @return {boolean} If a collision was detected.
    * @private
    */
    collideSpriteVsGroup(sprite, group, callback, overlapOnly)
    {
        callback = callback || null;
        overlapOnly = overlapOnly || false;

        let a = sprite;

        for (let i = 0; i < group.children.length; i++)
        {
            let b = group.children[i];
            if (b !== a)
            {
                if (a.body.isRectangle === true)
                {
                    if (b.body.isRectangle === true)
                    {
                        if (this.intersectRectangleVsRectangle(a, b))
                        {
                            // If a callback was passed, call it.
                            if (callback !== null)
                            {
                                callback(a, b);
                            }

                            // Apply collision, if desired.
                            if (overlapOnly === false)
                            {
                            }
                        }
                    }

                    else if (b.body.isCircle === true)
                    {
                        if (this.intersectRectangleVsCircle(a, b))
                        {
                            // If a callback was passed, call it.
                            if (callback !== null)
                            {
                                callback(a, b);
                            }

                            // Apply collision, if desired.
                            if (overlapOnly === false)
                            {
                            }
                        }
                    }
                }

                else if (a.body.isCircle === true)
                {
                    if (b.body.isCircle === true)
                    {
                        if (this.intersectCircleVsCircle(a, b))
                        {
                            // If a callback was passed, call it.
                            if (callback !== null)
                            {
                                callback(a, b);
                            }
                        }
                    }

                    else if (a.body.isRectangle === true)
                    {
                        if (this.intersectRectangleVsCircle(b, a))
                        {
                            // If a callback was passed, call it.
                            if (callback !== null)
                            {
                                callback(a, b);
                            }

                            // Apply collision, if desired.
                            if (overlapOnly === false)
                            {
                            }
                        }
                    }
                }
            }
        }
    },

    /**
    * Checks for collision between two sprites. Use {Carrot.Physics#collide} or {Carrot.Physics#overlap} instead.
    *
    * @method Carrot.Physics#collideSpriteVsSprite
    * @param {Carrot.Sprite} sprite1
    * @param {Carrot.Sprite} sprite2
    * @param {function} [callback=null] - The function that shall be executed when the collision or overlap happens.
    * @param {boolean} [overlapOnly=false] - Defines if the function shall only check for overlap and disable physics.
    * @return {boolean} If a collision was detected.
    * @private
    */
    collideSpriteVsSprite(sprite1, sprite2, callback, overlapOnly)
    {
        callback = callback || null;
        overlapOnly = overlapOnly || false;

        let a = sprite1;
        let b = sprite2;

        if (b !== a)
        {
            if (a.body.isRectangle === true)
            {
                if (b.body.isRectangle === true)
                {
                    if (this.intersectRectangleVsRectangle(a, b))
                    {
                        // If a callback was passed, call it.
                        if (callback !== null)
                        {
                            callback(a, b);
                        }

                        // Apply collision, if desired.
                        if (overlapOnly === false)
                        {
                        }
                    }
                }

                else if (b.body.isCircle === true)
                {
                    if (this.intersectRectangleVsCircle(a, b))
                    {
                        // If a callback was passed, call it.
                        if (callback !== null)
                        {
                            callback(a, b);
                        }

                        // Apply collision, if desired.
                        if (overlapOnly === false)
                        {
                        }
                    }
                }
            }

            else if (a.body.isCircle === true)
            {
                if (b.body.isCircle === true)
                {
                    if (this.intersectCircleVsCircle(a, b))
                    {
                        // If a callback was passed, call it.
                        if (callback !== null)
                        {
                            callback(a, b);
                        }
                    }
                }

                else if (a.body.isRectangle === true)
                {
                    if (this.intersectRectangleVsCircle(b, a))
                    {
                        // If a callback was passed, call it.
                        if (callback !== null)
                        {
                            callback(a, b);
                        }

                        // Apply collision, if desired.
                        if (overlapOnly === false)
                        {
                        }
                    }
                }
            }
        }
    },

    /**
    * Checks for intersection between two rectangles.
    *
    * @method Carrot.Physics#intersectRectangleVsRectangle
    * @param {Carrot.Rectangle} a
    * @param {Carrot.Rectangle} b
    * @return {boolean} If an intersection was detected.
    * @private
    */
    intersectRectangleVsRectangle(a, b)
    {
        if (a.left   > b.right)  { return false; }
        if (a.right  < b.left)   { return false; }
        if (a.top    > b.bottom) { return false; }
        if (a.bottom < b.top)    { return false; }

        return true;

        /*
        return (a.left   < b.right
             && a.right  > b.left
             && a.top    < b.bottom
             && a.bottom > b.top);
        */
    },

    /**
    * Checks for intersection between two circles.
    *
    * @method Carrot.Physics#intersectCircleVsCircle
    * @param {Carrot.Circle} a
    * @param {Carrot.Circle} b
    * @return {boolean} If an intersection was detected.
    * @private
    */
    intersectCircleVsCircle(a, b)
    {
        let x = a.x - b.x;
        let y = a.y - b.y;
        let r = (a.width * 0.5) + (b.width * 0.5);
        return (x * x) + (y * y) < (r * r);
    },

    /**
    * Checks for intersection between a rectangle and a circle.
    *
    * @method Carrot.Physics#intersectRectangleVsCircle
    * @param {Carrot.Rectangle} a
    * @param {Carrot.Circle} b
    * @return {boolean} If an intersection was detected.
    * @private
    */
    intersectRectangleVsCircle(a, b)
    {
        let cr = b.width * 0.5;
        let cx = b.width - cr;
        let cy = b.height - cr;
        let rw = a.width;
        let rh = a.height;
        let rx = rw - (rw * 0.5);
        let ry = rh - (rh * 0.5);
        let dx = cx - Math.max(rx, Math.min(cx, ry + rw));
        let dy = cy - Math.max(ry, Math.min(cy, ry + rh));

        return (dx * dx + dy * dy) < (cr * cr);
    }
};

Carrot.Physics.prototype.constructor = Carrot.Physics;

/**
 * Creates a physics body.
 *
 * @class Carrot.Physics.Body
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 * @param {integer} x - X position relative to the sprite.
 * @param {integer} y - Y position relative the sprite.
 */
Carrot.Physics.Body = function(parent, x, y)
{
    this.parent = parent;
    this.x = x || 0;
    this.y = y || 0;

    this.velocity     = new Carrot.Point(0, 0);
    this.bounce       = new Carrot.Point(0, 0);
    this.drag         = new Carrot.Point(0, 0);
    this.gravity      = new Carrot.Point(0, 0);
    this.acceleration = new Carrot.Point(0, 0);

    this.maxVelocity = new Carrot.Point(10000, 10000);

    this.angularVelocity = 0;
    this.angularDrag     = 0;

    this.allowBounce       = true;
    this.allowDrag         = true;
    this.allowGravity      = true;
    this.allowAcceleration = true;
    this.allowAngularDrag  = true;

    this.touching =
    {
        none:   true,
        left:   false,
        right:  false,
        top:    false,
        bottom: false
    };

    this.collideWorldBounds = false;

    this.isRectangle = true;
    this.isCircle = false;
    this.enabled = true;

    return this;
};

Carrot.Physics.Body.prototype =
{
    /**
    * Changes the shape of the body and its parent sprite into a circle.
    *
    * @method Carrot.Physics#setCircle
    */
    setCircle()
    {
        this.isRectangle = false;
        this.isCircle = true;

        this.sprite.style.borderRadius = (this.sprite.width * 0.5) + "px";
    },

    /**
    * Changes the shape of the body and its parent sprite into a rectangle.
    *
    * @method Carrot.Physics#setRectangle
    */
    setRectangle()
    {
        this.isRectangle = true;
        this.isCircle = false;

        this.sprite.image.style.borderRadius = "";
    }
};

Carrot.Physics.Body.prototype.constructor = Carrot.Physics.Body;

/**
 * This class stores images, sounds and custom CSS classes.
 *
 * @class Carrot.Cache
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Cache = function(game)
{
    this.game = game;

    this.images  = {};
    this.sounds  = {};
    this.json    = {};
    this.csv     = {};
    this.classes = {};
};

Carrot.Cache.prototype =
{

};

Carrot.Cache.prototype.constructor = Carrot.Cache;

/**
 * This class allows for creating custom stylesheets for game objects.
 *
 * @class Carrot.Entity
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Entity = function(game, name, css)
{
    this.game = game;

    this.name = name;
    this.css = css || {};

    return this;
};

Carrot.Entity.prototype =
{
    /**
     * Adds a new CSS rule to the class.
     *
     * @method Carrot.Entity#add
     * @param {string} name - The unique name of the class.
     * @param {object} [style=null] - The style of the class.
     */
    add(name, style)
    {
        if (name)
        {
            style = style || null;
            if (style !== null)
            {
                this.game.cache.classes[name] = style;
            }

            else
            {
                this.game.cache.classes[name] = {};
            }
        }
    },

    /**
     * Removes an existing CSS rule from the class.
     *
     * @method Carrot.Entity#remove
     * @param {string} name - The unique name of the class.
     */
    remove(name)
    {
        delete this.game.cache.classes[name];
    },

    /**
     * Edits an existing CSS rule of the class.
     *
     * @method Carrot.Entity#add
     * @param {string} name - The unique name of the class.
     * @param {string} key
     * @param {string} value
     */
    edit(name, key, value)
    {
        let customClass = this.game.cache.classes[name];
        if (customClass)
        {
            customClass[key] = value;
        }
    },
};

Carrot.Entity.prototype.constructor = Carrot.Entity;

/**
 * Creates a point.
 *
 * @class Carrot.Point
 * @constructor
 * @param {integer} [x=0]
 * @param {integer} [y=x]
 */
Carrot.Point = function(x, y)
{
    x = x || 0;
    y = y || x;

    this.setTo(x, y);

    return this;
};

Carrot.Point.prototype =
{
    /**
     * Sets the point up.
     *
     * @method Carrot.Point#setTo
     * @param {integer} [x=0]
     * @param {integer} [y=x]
     */
    setTo(x, y)
    {
       this.x = x || 0;
       this.y = y || 0;
    }
};

Carrot.Point.prototype.constructor = Carrot.Point;

/**
 * Creates a line with a start and an end point.
 *
 * @class Carrot.Line
 * @constructor
 * @param {integer} [x1=0]
 * @param {integer} [y1=0]
 * @param {integer} [x2=0]
 * @param {integer} [y2=0]
 */
Carrot.Line = function(x1, y1, x2, y2)
{
    x1 = x1 || 0;
    y1 = y1 || 0;
    x2 = x2 || 0;
    y2 = y2 || 0;

    this.start = null;
    this.end = null;

    this.setTo(x1, y1, x2, y2);

    return this;
};

Carrot.Line.prototype =
{
    /**
     * Sets the line up.
     *
     * @method Carrot.Line#setTo
     * @param {integer} [x=0]
     * @param {integer} [y=x]
     */
    setTo(x1, y1, x2, y2)
    {
        this.start = new Carrot.Point(x1, y1);
        this.end   = new Carrot.Point(x2, y2);
    }
};

Carrot.Line.prototype.constructor = Carrot.Line;

/**
 * Creates a rectangle.
 *
 * @class Carrot.Rectangle
 * @constructor
 * @param {integer} [x=0]
 * @param {integer} [y=0]
 * @param {integer} [width=0]
 * @param {integer} [height=0]
 */
Carrot.Rectangle = function(x, y, width, height)
{
    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.setTo(x, y, width, height);

    return this;
};

Carrot.Rectangle.prototype =
{
    /**
     * Sets the rectangle up.
     *
     * @method Carrot.Rectangle#setTo
     * @param {integer} [x=0]
     * @param {integer} [y=x]
     * @param {integer} [width=0]
     * @param {integer} [height=0]
     */
    setTo(x, y, width, height)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.width = width || 0;
       this.height = height || 0;
   }
};

Carrot.Rectangle.prototype.constructor = Carrot.Rectangle;

/**
 * Creates a circle.
 *
 * @class Carrot.Circle
 * @constructor
 * @param {integer} [x=0]
 * @param {integer} [y=x]
 * @param {diameter} [diameter=0]
 */
Carrot.Circle = function(x, y, diameter)
{
    x = x || 0;
    y = y || 0;
    diameter = diameter || 0;

    this.setTo(x, y, diameter);

    return this;
};

Carrot.Circle.prototype =
{
    /**
     * Sets the circle up.
     *
     * @method Carrot.Circle#setTo
     * @param {integer} [x=0]
     * @param {integer} [y=x]
     * @param {diameter} [diameter=0]
     */
    setTo(x, y, diameter)
    {
       this.x = x || 0;
       this.y = y || x;
       this.diameter = diameter || 0;
       this.radius = diameter * 0.5;
   }
};

Carrot.Circle.prototype.constructor = Carrot.Circle;

/**
 * This claass offers the possibility of creating sprites and groups.
 *
 * @class Carrot.ObjectFactory
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.ObjectFactory = function(game)
{
    this.game = game;

    return this;
};

Carrot.ObjectFactory.prototype =
{
    /**
     * Creates a sprite.
     *
     * @method Carrot.ObjectFactory#sprite
     * @param {integer} [x=0] - X position
     * @param {integer} [y=0] - Y position
     * @param {string} [key=null] - The key (name) of the image. If null, the sprite will be a green rectangle.
     * @param {integer} [frame=0] - The initial frame to show. Only for spritesheets.
     * @param {boolean} [active=true] - The initial frame to show. Only for spritesheets.
     * @return {Carrot.Sprite}
     */
    sprite(x, y, key, frame, active)
    {
        if (x      === undefined) x     = 0;
        if (y      === undefined) y     = 0;
        if (key    === undefined) key   = null;
        if (frame  === undefined) frame = 0;
        if (active === undefined) active = true;

        return new Carrot.Sprite(this.game, x, y, key, frame, active);
    },

    /**
     * Creates a group.
     *
     * @method Carrot.ObjectFactory#group
     */
    group()
    {
        return new Carrot.Group(this.game);
    },

    /**
     * Creates a timed event.
     *
     * @method Carrot.ObjectFactory#timer
     */
    timer(delay, callback, timesToRepeat, startNow)
    {
        return new Carrot.Timer(this.game, delay, callback, timesToRepeat, startNow);
    }
};

Carrot.ObjectFactory.prototype.constructor = Carrot.ObjectFactory;

/**
 * A very basic asset loader without progess functions. Yet.
 *
 * @class Carrot.AssetLoader
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.AssetLoader = function(game)
{
    this.game = game;

    this.filesLoaded = 0;
    this.filesToLoad = 0;

    return this;
};

Carrot.AssetLoader.prototype =
{
    /**
     * Loads a simple image.
     *
     * @method Carrot.AssetLoader#image
     * @param {string} key - The path (url) to the image.
     * @param {string} path - The key (name) for the image.
     */
    image(key, path)
    {
        let that = this;
        let img = document.createElement('img');
        img.src = path;
        img.onload = function(event)
        {
            img.onload = null;
            img.onerror = null;

            that.fileLoaded(key);
        };
        img.onerror = function(event)
        {
            delete that.game.cache.images[key];
        };

        this.game.cache.images[key] = img;

        this.filesToLoad += 1;
    },

    /**
     * Loads a spritesheet.
     *
     * @method Carrot.AssetLoader#spritesheet
     * @param {string} key - The key (name) to the image.
     * @param {string} path - The path (url) to the image.
     * @param {integer} [frameWidth=32] - The width of the spritesheet's frames.
     * @param {integer} [frameHeight=32] - The height of the spritesheet's frames.
     * @param {integer} [frameIndexes=Infinity] - The frames indexes.
     */
    spritesheet(key, path, frameWidth, frameHeight, frameIndexes)
    {
        frameWidth   = frameWidth   || 32;
        frameHeight  = frameHeight  || 32
        frameIndexes = frameIndexes || Infinity;

        let that = this;
        let img = document.createElement('img');
        img.src = path;
        img.onload = function(event)
        {
            // Save frames for spritesheet animation
            let frames = [];
            let frameFound = 0;

            for (let x = 0; x < that.width; x += frameWidth)
            {
                for (let y = 0; y < that.height; y += frameHeight)
                {
                    frameFound += 1;
                    if (frameFound === frameIndexes) break;
                    {
                        frames.push(
                        {
                            x: -x,
                            y: -y
                        });
                    }
                }
            }

            that.game.cache.images[key].frames = frames;

            img.onload = null;
            img.onerror = null;

            that.fileLoaded(key);
        };
        img.onerror = function(event)
        {
            delete that.game.cache.images[key];
        };

        this.game.cache.images[key] = img;
        this.game.cache.images[key].frames = [];
        this.game.cache.images[key].frameWidth = frameWidth;
        this.game.cache.images[key].frameHeight = frameHeight;

        this.filesToLoad += 1;
    },

    /**
     * Loads a sound.
     *
     * @method Carrot.AssetLoader#sound
     * @param {string} key - The key (name) for the sound.
     * @param {string} path - The path (url) to the sound.
     */
    sound(key, path)
    {
        let that = this;
        let sound = document.createElement('audio');
        sound.src = path;
        sound.oncanplaythrough = function(event)
        {
            sound.oncanplaythrough = null;
            sound.onerror = null;

            that.fileLoaded(key);
        };
        sound.onerror = function(event)
        {
            delete that.game.cache.sounds[key];
        };

        this.game.cache.sounds[key] = sound;

        this.filesToLoad += 1;
    },

    /**
     * Loads a JSON file.
     *
     * @method Carrot.AssetLoader#json
     * @param {string} key - The key (name) for the JSON file.
     * @param {string} path - The path (url) to the JSON file.
     */
    json(key, path)
    {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(event)
        {
            that.game.cache.json[key] = JSON.parse(this.responseText);

            that.fileLoaded(key);
        }
        xhr.onerror = function(event)
        {
            delete this.game.cache.json[key];
        }
        xhr.open('GET', window.location.href + "/" + path, true);
        xhr.send();

        this.game.cache.json[key] = {};

        this.filesToLoad += 1;
    },

    /**
     * Loads a CSV file.
     *
     * @method Carrot.AssetLoader#csv
     * @param {string} key - The key (name) for the CSV file.
     * @param {string} path - The path (url) to the CSV file.
     */
    csv(key, path)
    {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(event)
        {
            // This CSV parser has to be turned into an own method.

            let csv = {};

            // Split up at line breaks
            let rows = this.responseText.split(/\n|\r/);

            // Save properties defined in the first line of the CSV file.
            let properties = rows[0].replace(/['"]+/g, ''); // Remove "s if existing.
            properties     = properties.replace(/\s/g,''); // Remove all white spaces
            properties     = properties.split(",");

            // Get the values of the lines after the first one.
            for (let i = 1; i < rows.length; i++)
            {
                let columns = rows[i].split(",");
                let object = columns[0];
                object = object.trim(); // Remove spaces at begin and end.

                // Check for empty line (the last one mostly)
                if (object !== "")
                {
                    // Create property in object.
                    csv[object] = {};

                    for (let j = 1; j < properties.length; j++)
                    {
                        let property = properties[j];
                        let value = parseInt(columns[j]);

                        // If value is a string
                        if (isNaN(value))
                        {
                            // Remove its "s
                            value = columns[j].replace(/['"]+/g, '');
                        }

                        // Store value
                        csv[object][property] = value;
                    }
                }
            }

            that.game.cache.csv[key] = csv;

            that.fileLoaded(key);
        }
        xhr.onerror = function(event)
        {
            delete this.game.cache.csv[key];
        }
        xhr.open('GET', window.location.href + "/" + path, true);
        xhr.send();

        this.game.cache.csv[key] = {};

        this.filesToLoad += 1;
    },

    /**
     * Is called when a file was successfully loaded.
     *
     * @method Carrot.AssetLoader#fileLoaded
     * @param {string} key - The key of the image that was loaded.
     * @private
     */
     fileLoaded(key)
     {
         this.filesLoaded += 1;

         // Update progress bar, if existing.
         if (this.progressBar)
         {
             this.progressBar.style.width = ((this.filesLoaded / this.filesToLoad) * 100) + "%";
         }

         this.checkFilesLoaded();
     },

    /**
     * Checks if all files are loaded. If yes, it starts the game. Is automatically managed by {Carrot.AssetLoader};
     *
     * @method Carrot.AssetLoader#checkFilesLoaded
     * @private
     */
     checkFilesLoaded()
     {
         if (this.filesToLoad === this.filesLoaded)
         {
             if (this.progressBar)
             {
                // Remove progress bar
                this.progressBar.parentNode.parentNode.remove();
                delete this.progressBar;

                // Reset background color set by progress bar
                if (this.game.transparent === false)
                {
                    this.game.background.style.backgroundColor = '#000000';
                }

                else
                {
                    this.game.background.style.background = "";
                }

                this.game.start(this.game);
            }
         }
     }
};

Carrot.AssetLoader.prototype.constructor = Carrot.AssetLoader;

/**
 * This class handles all keyboard interactions.
 *
 * @class Carrot.Keyboard
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Keyboard = function(game)
{
    this.isDown = {};
    this.isPressed = {};
    this.isUp = {};

    // Internal values
    this.game = game;

    // Set all buttons to false
    for (let i = 0; i < 200; i++)
    {
        this.isDown[i]    = false;
        this.isPressed[i] = false;
        this.isUp[i]      = false;
    }

    // Add the event listeners for the mouse to the game container
    let gameDiv = this.game.parent;
    let that = this;
    window.addEventListener('keydown', function(event)
    {
        that.isDown[event.keyCode]    = true;
    }, false);

    window.addEventListener('keypress', function(event)
    {
        that.isPressed[event.keyCode] = true;
    }, false);

    window.addEventListener('keyup', function(event)
    {
        that.isDown[event.keyCode]    = false;
        that.isPressed[event.keyCode] = false;
        that.isUp[event.keyCode]      = true;
    }, false);

    return this;
};

Carrot.Keyboard.prototype =
{
    isDown(key)
    {

    },

    isUp(key)
    {

    }
};

Carrot.Keyboard.prototype.constructor = Carrot.Keyboard;

/**
 * This class stores common keyCodes of keyboards, so there is no need to memorize them.
 *
 * @class Carrot.KeyCode
 * @static
 */
Carrot.KeyCode =
{
    /** @static */
    A: "A".toUpperCase().charCodeAt(0),
    /** @static */
    B: "B".toUpperCase().charCodeAt(0),
    /** @static */
    C: "C".toUpperCase().charCodeAt(0),
    /** @static */
    D: "D".toUpperCase().charCodeAt(0),
    /** @static */
    E: "E".toUpperCase().charCodeAt(0),
    /** @static */
    F: "F".toUpperCase().charCodeAt(0),
    /** @static */
    G: "G".toUpperCase().charCodeAt(0),
    /** @static */
    H: "H".toUpperCase().charCodeAt(0),
    /** @static */
    I: "I".toUpperCase().charCodeAt(0),
    /** @static */
    J: "J".toUpperCase().charCodeAt(0),
    /** @static */
    K: "K".toUpperCase().charCodeAt(0),
    /** @static */
    L: "L".toUpperCase().charCodeAt(0),
    /** @static */
    M: "M".toUpperCase().charCodeAt(0),
    /** @static */
    N: "N".toUpperCase().charCodeAt(0),
    /** @static */
    O: "O".toUpperCase().charCodeAt(0),
    /** @static */
    P: "P".toUpperCase().charCodeAt(0),
    /** @static */
    Q: "Q".toUpperCase().charCodeAt(0),
    /** @static */
    R: "R".toUpperCase().charCodeAt(0),
    /** @static */
    S: "S".toUpperCase().charCodeAt(0),
    /** @static */
    T: "T".toUpperCase().charCodeAt(0),
    /** @static */
    U: "U".toUpperCase().charCodeAt(0),
    /** @static */
    V: "V".toUpperCase().charCodeAt(0),
    /** @static */
    W: "W".toUpperCase().charCodeAt(0),
    /** @static */
    X: "X".toUpperCase().charCodeAt(0),
    /** @static */
    Y: "Y".toUpperCase().charCodeAt(0),
    /** @static */
    Z: "Z".toUpperCase().charCodeAt(0),
    /** @static */
    ZERO: "0".charCodeAt(0),
    /** @static */
    ONE: "1".charCodeAt(0),
    /** @static */
    TWO: "2".charCodeAt(0),
    /** @static */
    THREE: "3".charCodeAt(0),
    /** @static */
    FOUR: "4".charCodeAt(0),
    /** @static */
    FIVE: "5".charCodeAt(0),
    /** @static */
    SIX: "6".charCodeAt(0),
    /** @static */
    SEVEN: "7".charCodeAt(0),
    /** @static */
    EIGHT: "8".charCodeAt(0),
    /** @static */
    NINE: "9".charCodeAt(0),
    /** @static */
    NUMPAD_0: 96,
    /** @static */
    NUMPAD_1: 97,
    /** @static */
    NUMPAD_2: 98,
    /** @static */
    NUMPAD_3: 99,
    /** @static */
    NUMPAD_4: 100,
    /** @static */
    NUMPAD_5: 101,
    /** @static */
    NUMPAD_6: 102,
    /** @static */
    NUMPAD_7: 103,
    /** @static */
    NUMPAD_8: 104,
    /** @static */
    NUMPAD_9: 105,
    /** @static */
    NUMPAD_MULTIPLY: 106,
    /** @static */
    NUMPAD_ADD: 107,
    /** @static */
    NUMPAD_ENTER: 108,
    /** @static */
    NUMPAD_SUBTRACT: 109,
    /** @static */
    NUMPAD_DECIMAL: 110,
    /** @static */
    NUMPAD_DIVIDE: 111,
    /** @static */
    F1: 112,
    /** @static */
    F2: 113,
    /** @static */
    F3: 114,
    /** @static */
    F4: 115,
    /** @static */
    F5: 116,
    /** @static */
    F6: 117,
    /** @static */
    F7: 118,
    /** @static */
    F8: 119,
    /** @static */
    F9: 120,
    /** @static */
    F10: 121,
    /** @static */
    F11: 122,
    /** @static */
    F12: 123,
    /** @static */
    F13: 124,
    /** @static */
    F14: 125,
    /** @static */
    F15: 126,
    /** @static */
    COLON: 186,
    /** @static */
    EQUALS: 187,
    /** @static */
    COMMA: 188,
    /** @static */
    UNDERSCORE: 189,
    /** @static */
    PERIOD: 190,
    /** @static */
    QUESTION_MARK: 191,
    /** @static */
    TILDE: 192,
    /** @static */
    OPEN_BRACKET: 219,
    /** @static */
    BACKWARD_SLASH: 220,
    /** @static */
    CLOSED_BRACKET: 221,
    /** @static */
    QUOTES: 222,
    /** @static */
    BACKSPACE: 8,
    /** @static */
    TAB: 9,
    /** @static */
    CLEAR: 12,
    /** @static */
    ENTER: 13,
    /** @static */
    SHIFT: 16,
    /** @static */
    CONTROL: 17,
    /** @static */
    ALT: 18,
    /** @static */
    CAPS_LOCK: 20,
    /** @static */
    ESC: 27,
    /** @static */
    SPACEBAR: 32,
    /** @static */
    PAGE_UP: 33,
    /** @static */
    PAGE_DOWN: 34,
    /** @static */
    END: 35,
    /** @static */
    HOME: 36,
    /** @static */
    LEFT: 37,
    /** @static */
    UP: 38,
    /** @static */
    RIGHT: 39,
    /** @static */
    DOWN: 40,
    /** @static */
    PLUS: 43,
    /** @static */
    MINUS: 44,
    /** @static */
    INSERT: 45,
    /** @static */
    DELETE: 46,
    /** @static */
    HELP: 47,
    /** @static */
    NUM_LOCK: 144
};

// Duplicate Carrot.KeyCode values in Carrot.Keyboard for compatibility
for (var key in Carrot.KeyCode)
{
    if (Carrot.KeyCode.hasOwnProperty(key) && !key.match(/[a-z]/))
    {
        Carrot.Keyboard[key] = Carrot.KeyCode[key];
    }
}

/**
 * This class stores the hex values of the 140 standard HTML & CSS colors for easy access.
 *
 * @class Carrot.Color
 * @static
 */
Carrot.Color =
{
    /** @static */
    AliceBlue: "#F0F8FF",
    /** @static */
    AntiqueWhite: "#FAEBD7",
    /** @static */
    Aqua: "#00FFFF",
    /** @static */
    Aquamarine: "#7FFFD4",
    /** @static */
    Azure: "#F0FFFF",
    /** @static */
    Beige: "#F5F5DC",
    /** @static */
    Bisque: "#FFE4C4",
    /** @static */
    Black: "#000000",
    /** @static */
    BlanchedAlmond: "#FFEBCD",
    /** @static */
    Blue: "#0000FF",
    /** @static */
    BlueViolet: "#8A2BE2",
    /** @static */
    Brown: "#A52A2A",
    /** @static */
    BurlyWood: "#DEB887",
    /** @static */
    CadetBlue: "#5F9EA0",
    /** @static */
    Chartreuse: "#7FFF00",
    /** @static */
    Chocolate: "#D2691E",
    /** @static */
    Coral: "#FF7F50",
    /** @static */
    CornflowerBlue: "#6495ED",
    /** @static */
    Cornsilk: "#FFF8DC",
    /** @static */
    Crimson: "#DC143C",
    /** @static */
    Cyan: "#00FFFF",
    /** @static */
    DarkBlue: "#00008B",
    /** @static */
    DarkCyan: "#008B8B",
    /** @static */
    DarkGoldenRod: "#B8860B",
    /** @static */
    DarkGray: "#A9A9A9",
    /** @static */
    DarkGrey: "#A9A9A9",
    /** @static */
    DarkGreen: "#006400",
    /** @static */
    DarkKhaki: "#BDB76B",
    /** @static */
    DarkMagenta: "#8B008B",
    /** @static */
    DarkOliveGreen: "#556B2F",
    /** @static */
    DarkOrange: "#FF8C00",
    /** @static */
    DarkOrchid: "#9932CC",
    /** @static */
    DarkRed: "#8B0000",
    /** @static */
    DarkSalmon: "#E9967A",
    /** @static */
    DarkSeaGreen: "#8FBC8F",
    /** @static */
    DarkSlateBlue: "#483D8B",
    /** @static */
    DarkSlateGray: "#2F4F4F",
    /** @static */
    DarkSlateGrey: "#2F4F4F",
    /** @static */
    DarkTurquoise: "#00CED1",
    /** @static */
    DarkViolet: "#9400D3",
    /** @static */
    DeepPink: "#FF1493",
    /** @static */
    DeepSkyBlue: "#00BFFF",
    /** @static */
    DimGray: "#696969",
    /** @static */
    DimGrey: "#696969",
    /** @static */
    DodgerBlue: "#1E90FF",
    /** @static */
    FireBrick: "#B22222",
    /** @static */
    FloralWhite: "#FFFAF0",
    /** @static */
    ForestGreen: "#228B22",
    /** @static */
    Fuchsia: "#FF00FF",
    /** @static */
    Gainsboro: "#DCDCDC",
    /** @static */
    GhostWhite: "#F8F8FF",
    /** @static */
    Gold: "#FFD700",
    /** @static */
    GoldenRod: "#DAA520",
    /** @static */
    Gray: "#808080",
    /** @static */
    Grey: "#808080",
    /** @static */
    Green: "#008000",
    /** @static */
    GreenYellow: "#ADFF2F",
    /** @static */
    HoneyDew: "#F0FFF0",
    /** @static */
    HotPink: "#FF69B4",
    /** @static */
    IndianRed : "#CD5C5C",
    /** @static */
    Indigo  : "#4B0082",
    /** @static */
    Ivory: "#FFFFF0",
    /** @static */
    Khaki: "#F0E68C",
    /** @static */
    Lavender: "#E6E6FA",
    /** @static */
    LavenderBlush: "#FFF0F5",
    /** @static */
    LawnGreen: "#7CFC00",
    /** @static */
    LemonChiffon: "#FFFACD",
    /** @static */
    LightBlue: "#ADD8E6",
    /** @static */
    LightCoral: "#F08080",
    /** @static */
    LightCyan: "#E0FFFF",
    /** @static */
    LightGoldenRodYellow: "#FAFAD2",
    /** @static */
    LightGray: "#D3D3D3",
    /** @static */
    LightGrey: "#D3D3D3",
    /** @static */
    LightGreen: "#90EE90",
    /** @static */
    LightPink: "#FFB6C1",
    /** @static */
    LightSalmon: "#FFA07A",
    /** @static */
    LightSeaGreen: "#20B2AA",
    /** @static */
    LightSkyBlue: "#87CEFA",
    /** @static */
    LightSlateGray: "#778899",
    /** @static */
    LightSlateGrey: "#778899",
    /** @static */
    LightSteelBlue: "#B0C4DE",
    /** @static */
    LightYellow: "#FFFFE0",
    /** @static */
    Lime: "#00FF00",
    /** @static */
    LimeGreen: "#32CD32",
    /** @static */
    Linen: "#FAF0E6",
    /** @static */
    Magenta: "#FF00FF",
    /** @static */
    Maroon: "#800000",
    /** @static */
    MediumAquaMarine: "#66CDAA",
    /** @static */
    MediumBlue: "#0000CD",
    /** @static */
    MediumOrchid: "#BA55D3",
    /** @static */
    MediumPurple: "#9370DB",
    /** @static */
    MediumSeaGreen: "#3CB371",
    /** @static */
    MediumSlateBlue: "#7B68EE",
    /** @static */
    MediumSpringGreen: "#00FA9A",
    /** @static */
    MediumTurquoise: "#48D1CC",
    /** @static */
    MediumVioletRed: "#C71585",
    /** @static */
    MidnightBlue: "#191970",
    /** @static */
    MintCream: "#F5FFFA",
    /** @static */
    MistyRose: "#FFE4E1",
    /** @static */
    Moccasin: "#FFE4B5",
    /** @static */
    NavajoWhite: "#FFDEAD",
    /** @static */
    Navy: "#000080",
    /** @static */
    OldLace: "#FDF5E6",
    /** @static */
    Olive: "#808000",
    /** @static */
    OliveDrab: "#6B8E23",
    /** @static */
    Orange: "#FFA500",
    /** @static */
    OrangeRed: "#FF4500",
    /** @static */
    Orchid: "#DA70D6",
    /** @static */
    PaleGoldenRod: "#EEE8AA",
    /** @static */
    PaleGreen: "#98FB98",
    /** @static */
    PaleTurquoise: "#AFEEEE",
    /** @static */
    PaleVioletRed: "#DB7093",
    /** @static */
    PapayaWhip: "#FFEFD5",
    /** @static */
    PeachPuff: "#FFDAB9",
    /** @static */
    Peru: "#CD853F",
    /** @static */
    Pink: "#FFC0CB",
    /** @static */
    Plum: "#DDA0DD",
    /** @static */
    PowderBlue: "#B0E0E6",
    /** @static */
    Purple: "#800080",
    /** @static */
    RebeccaPurple: "#663399",
    /** @static */
    Red: "#FF0000",
    /** @static */
    RosyBrown: "#BC8F8F",
    /** @static */
    RoyalBlue: "#4169E1",
    /** @static */
    SaddleBrown: "#8B4513",
    /** @static */
    Salmon: "#FA8072",
    /** @static */
    SandyBrown: "#F4A460",
    /** @static */
    SeaGreen: "#2E8B57",
    /** @static */
    SeaShell: "#FFF5EE",
    /** @static */
    Sienna: "#A0522D",
    /** @static */
    Silver: "#C0C0C0",
    /** @static */
    SkyBlue: "#87CEEB",
    /** @static */
    SlateBlue: "#6A5ACD",
    /** @static */
    SlateGray: "#708090",
    /** @static */
    SlateGrey: "#708090",
    /** @static */
    Snow: "#FFFAFA",
    /** @static */
    SpringGreen: "#00FF7F",
    /** @static */
    SteelBlue: "#4682B4",
    /** @static */
    Tan: "#D2B48C",
    /** @static */
    Teal: "#008080",
    /** @static */
    Thistle: "#D8BFD8",
    /** @static */
    Tomato: "#FF6347",
    /** @static */
    Turquoise: "#40E0D0",
    /** @static */
    Violet: "#EE82EE",
    /** @static */
    Wheat: "#F5DEB3",
    /** @static */
    White: "#FFFFFF",
    /** @static */
    WhiteSmoke: "#F5F5F5",
    /** @static */
    Yellow: "#FFFF00",
    /** @static */
    YellowGreen: "#9ACD32",
};

/**
 * This class handles all mouse interactions (but the mouse wheel, yet).
 *
 * @class Carrot.Mouse
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Mouse = function(game)
{
    this.x = 0;
    this.y = 0;
    this.worldX = 0;
    this.worldY = 0;
    this.wheel = 0;
    this.isDown = [];
    this.isUp = [];

    // Internal values
    this.game = game;

    // Add the event listeners for the mouse to the game container
    let gameDiv = this.game.background;
    let that = this;

    gameDiv.addEventListener("mousemove", function(event)
    {
        that.x = event.offsetX;
        that.y = event.offsetY;
        that.worldX = that.x + that.game.camera.x;
        that.worldY = that.y + that.game.camera.y;
    }, true);

    gameDiv.addEventListener("mousedown", function(event)
    {
        that.isDown[event.button] = true;
        that.isUp[event.button]   = false;
    }, true);

    gameDiv.addEventListener("mouseup",   function(event)
    {
        that.isDown[event.button] = false;
        that.isUp[event.button]   = true;
    }, true);

    return this;
}

/** @static */
Carrot.Mouse.LEFT_BUTTON = 0;
/** @static */
Carrot.Mouse.MIDDLE_BUTTON = 1;
/** @static */
Carrot.Mouse.RIGHT_BUTTON = 2;

// The stuff below is not working yet
Carrot.Mouse.prototype =
{
    onMouseMove(event)
    {
        this.x = event.offsetX;
        this.y = event.offsetY;
    },

    onMouseDown(event)
    {
        this.isDown[event.button] = true;
        this.isUp[event.button]   = false;
    },

    onMouseUp(event)
    {
        this.isDown[event.button] = false;
        this.isUp[event.button]   = true;
    }
};

Carrot.Mouse.prototype.constructor = Carrot.Mouse;


/**
 * This class offers methods to debug the game.
 *
 * @class Carrot.Debug
 * @constructor
 * @param {Carrot.Game} game - The core game object.
 */
Carrot.Debug = function(game)
{
    this.game = game;

    return this;
};

Carrot.Debug.prototype =
{
    /**
     * Shows a debug rectangle of the same size as the sprite.
     *
     * @method Carrot.Debug#sprite
     * @param {Carrot.Sprite} sprite - The sprite to debug.
     * @param {string}        [color=rgba(0, 255, 0, 0.33)] - The color to tint the sprite width.
     * @param {boolean}       [border=false] - Defined if the debug div should only consist of a border.
     */
    sprite(sprite, color, border)
    {
        if (sprite === undefined) return;
        if (color  === undefined) color = "rgba(0, 255, 0, 0.33)";
        if (border === undefined) border = false;

        if (sprite.image)
        {
            let debugDiv = sprite.image.getElementsByClassName('debugSprite')[0];

            // If the sprite has no debug div, create one.
            if (debugDiv === undefined)
            {
                debugDiv = document.createElement('div');
                sprite.image.insertBefore(debugDiv, sprite.image.firstChild);
                debugDiv.className    = "debugSprite";
                debugDiv.style.height = "100%";

                if (border)
                {
                    debugDiv.style.border = "1px solid " + color;
                }

                else
                {
                    debugDiv.style.backgroundColor = color;
                }
            }
        }
    },

    /**
     * Shows detailed debug info about a sprite.
     *
     * @method Carrot.Debug#sprite
     * @param {Carrot.Sprite} sprite - The sprite to debug.
     * @param {integer}       [x=0] - The x position on screen.
     * @param {integer}       [y=0] - The y position on screen.
     */
    spriteInfo(sprite, x, y)
    {
        if (sprite === undefined) return;
        if (x      === undefined) x = 0;
        if (y      === undefined) y = 0;

        let debugDiv = this.game.background.getElementsByClassName('debugSpriteInfo')[0];

        if (debugDiv !== undefined)
        {
            let spriteX       = Math.round(sprite.x * 10) / 10;
            let spriteY       = Math.round(sprite.x * 10) / 10;
            let spriteAngle   = Math.round(sprite.angle * 10) / 10;
            let spriteAnchorX = Math.round(sprite.anchor.x * 10) / 10;
            let spriteAnchorY = Math.round(sprite.anchor.y * 10) / 10;

            debugDiv.innerHTML = ""
            + "<strong>Sprite:</strong>"
            + "<br>x: " + spriteX + " y: " + spriteY + " angle: " + spriteAngle + " anchor: " + spriteAnchorX + " x " + spriteAnchorY
            + "<br>bounds: { left: " + sprite.left + ", top: " + sprite.top + ", right: " + sprite.right + ", bottom: " + sprite.bottom + " }"
            + "<br>key: \"" + sprite.key + "\" width: " + sprite.width + " height: " + sprite.height + " frame: " + sprite.frame
            + "<br>active: " + sprite.active + " inCamera: " + sprite.inCamera + " visible: " + sprite.visible
        }

        // If there's no debug div, create one.
        else
        {
            debugDiv = document.createElement('div');
            this.game.background.appendChild(debugDiv);
            debugDiv.className           = "debugSpriteInfo";
            debugDiv.style.position      = "absolute";
            debugDiv.style.left          = x + "px";
            debugDiv.style.top           = y + "px";
            debugDiv.style.color         = "#ffffff";
            debugDiv.style.fontSize      = "16px";
            debugDiv.style.lineHeight    = "20px";
            debugDiv.style.textShadow    = "1px 1px 0px #111111";
            debugDiv.style.userSelect    = "none";
            debugDiv.style.pointerEvents = "none";
        }
    },

    /**
     * Shows detailed debug info about the camera.
     *
     * @method Carrot.Debug#cameraInfo
     * @param {integer} [x=0] - The x position on screen.
     * @param {integer} [y=0] - The y position on screen.
     */
    cameraInfo(x, y)
    {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;

        let debugDiv = this.game.background.getElementsByClassName('debugCameraInfo')[0];

        if (debugDiv !== undefined)
        {
            let camera = app.game.camera;
            let cameraX       = Math.round(camera.x * 10) / 10;
            let cameraY       = Math.round(camera.x * 10) / 10;

            debugDiv.innerHTML = ""
            + "<strong>Camera:</strong>"
            + "<br>x: " + cameraX + " y: " + cameraY + " width: " + camera.width + " height: " + camera.height
        }

        // If there's no debug div, create one.
        else
        {
            debugDiv = document.createElement('div');
            this.game.background.appendChild(debugDiv);
            debugDiv.className           = "debugCameraInfo";
            debugDiv.style.position      = "absolute";
            debugDiv.style.left          = x + "px";
            debugDiv.style.top           = y + "px";
            debugDiv.style.color         = "#ffffff";
            debugDiv.style.fontSize      = "16px";
            debugDiv.style.lineHeight    = "20px";
            debugDiv.style.textShadow    = "1px 1px 0px #111111";
            debugDiv.style.userSelect    = "none";
            debugDiv.style.pointerEvents = "none";
        }
    },

    /**
     * Displays some text.
     *
     * @method Carrot.Debug#text
     * @param {integer} [x=0] - The x position on screen.
     * @param {integer} [y=0] - The y position on screen.
     */
    text(text, x, y)
    {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;

        let debugDiv = this.game.background.getElementsByClassName('debugText')[0];

        if (debugDiv !== undefined)
        {
            debugDiv.innerHTML = text;
        }

        // If there's no debug div, create one.
        else
        {
            debugDiv = document.createElement('div');
            this.game.background.appendChild(debugDiv);
            debugDiv.className           = "debugText";
            debugDiv.style.position      = "absolute";
            debugDiv.style.left          = x + "px";
            debugDiv.style.top           = y + "px";
            debugDiv.style.color         = "#ffffff";
            debugDiv.style.fontSize      = "16px";
            debugDiv.style.lineHeight    = "20px";
            debugDiv.style.textShadow    = "1px 1px 0px #111111";
            debugDiv.style.userSelect    = "none";
            debugDiv.style.pointerEvents = "none";
        }
    }
};

Carrot.Debug.prototype.constructor = Carrot.Debug;

// Type IDs

/** @static */
Carrot.SPRITE = 0;
/** @static */
Carrot.GROUP = 1;

/******************************************************************************/
/****************************** carrotJS END **********************************/
/******************************************************************************/

/**
 * mainloop.js 1.0.3-20170529
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(x=q(b),!(a<e+l)){for(d+=a-e,e=a,t(a,d),a>i+h&&(f=g*j*1e3/(a-i)+(1-g)*f,i=a,j=0),j++,k=0;d>=c;)if(u(c),d-=c,++k>=240){o=!0;break}v(d/c),w(f,o),o=!1}}var c=1e3/60,d=0,e=0,f=60,g=.9,h=1e3,i=0,j=0,k=0,l=0,m=!1,n=!1,o=!1,p="object"==typeof window?window:a,q=p.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),r=p.cancelAnimationFrame||clearTimeout,s=function(){},t=s,u=s,v=s,w=s,x;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/l},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():l=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return t=a||t,this},setUpdate:function(a){return u=a||u,this},setDraw:function(a){return v=a||v,this},setEnd:function(a){return w=a||w,this},start:function(){return n||(n=!0,x=q(function(a){v(1),m=!0,e=a,i=a,j=0,x=q(b)})),this},stop:function(){return m=!1,n=!1,r(x),this},isRunning:function(){return m}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(this);
