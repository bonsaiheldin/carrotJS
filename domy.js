/**
 * @author       Bonsaiheldin <dm@bonsaiheld.org>
 * @copyright    2018 Bonsaiheldin
 * @license      {@link https://github.com/photonstorm/Domy/blob/master/license.txt|MIT License}
 */

// Initialize the main object with all expected properties
var Domy = Domy ||
{
    "Version": "0.0.3",
    /*
    "Game": {},
    "Camera": {},
    "World": {},
    "Group": {},
    "Sprite": {},
    "Time": {},
    "Math": {},
    "Sound": {},
    "Physics": {},
    "Point": {},
    "Rectangle": {},
    "Circle": {},
    "Line": {},
    "Input": {}
    */
};

console.log("%cDomy v" + Domy.Version + " | HTML5 DOM game engine | https://github.com/bonsaiheldin/domy", "font-weight: bold;");

/**
 * The core game container.
 * @class Domy.Game
 * @constructor
 * @param {number} width - The width of the container.
 * @param {number} height - The height of the container.
 * @param {string} parent - The parent div of the container.
 * @param {boolean} transparent - Defines if the container should be transparent.
 */
Domy.Game = function(width, height, parent, transparent)
{
    this.width = width || 960;
    this.height = height || 540;
    this.parent = document.getElementById(parent) || null;
    this.transparent = transparent || false;

    // If container was not specified or not found, create one
    if (this.parent === null)
    {
        let div = document.createElement('div');
        document.body.appendChild(div);
        this.parent = div;
    }

    // If the container shall not be transparent, color it black
    if (this.transparent === false)
    {
        this.parent.style.backgroundColor = '#000000';
    }

    this.parent.style.position = "relative";
    this.parent.style.width = this.width + 'px';
    this.parent.style.height = this.height + 'px';
    this.parent.style.overflow = "hidden";
    this.parent.className = 'domy';

    // Init
    this.world = new Domy.World(this);
    this.camera = new Domy.Camera(this);
    this.time = new Domy.Time(this);

    this.start(this);

    return this;
}

/**
 * The update loop of the core. Happens automatically.
 * @method Domy.Game#update
 * @private
 */
Domy.Game.prototype.update = function(delta)
{
    this.time.update(delta);
    this.world.update();
    this.camera.update();
};

/**
 * The render loop of the core. Happens automatically.
 * @method Domy.Game#render
 * @private
 */
Domy.Game.prototype.render = function()
{
    //this.time.render();
    this.world.render();
    //this.camera.render();
};

/**
 * Starts the update and render loops of the core.
 */
Domy.Game.prototype.start = function(game)
{
    // Start the two core loops
    MainLoop.setUpdate(function(delta)
    {
        game.update(delta);
    }).setDraw(function()
    {
        game.render();
    }).start();
};

Domy.Game.prototype.constructor = Domy.Game;

/**
 * The camera. It is added to the core loops and updates automatically.
 * @class Domy.Camera
 * @constructor
 * @param {Domy.Game} game - Your global game object.
 */
Domy.Camera = function(game)
{
    this.game = game;
    this.world = this.game.world;
    /**
    * @property {number} x - The x coordinate of the camera.
    */
    this.x = 0;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
    this.bounds = new Domy.Rectangle(this.x, this.y, this.width, this.height);

    this.target = null;

    return this;
};

Domy.Camera.prototype =
{
    /**
     * Let the camera follow an entity.
     * @method Domy.Camera#follow
     * @param {object} game - The entity.
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
     * @method Domy.Camera#unfollow
     */
    unfollow()
    {
        this.target = null;
    },

    /**
     * The update loop of the camera. Happens automatically.
     * @method Domy.Camera#update
     * @private
     */
    update()
    {
        if (this.target !== null)
        {
            let targetX = this.target.x;
            let targetY = this.target.y;

            // Left / right
            if (targetX > this.width * 0.5
             && targetX <= this.world.width - (this.width * 0.5))
            {
                this.x = targetX - (this.width * 0.5);
            }

            // Top / bottom
            if (targetY > this.height * 0.5
             && targetY <= this.world.height - (this.height * 0.5))
            {
                this.y = targetY - (this.height * 0.5);
            }

            // Transform the game div according to the camera
            this.game.parent.style.left = -this.x;
            this.game.parent.style.top  = -this.y;
        }
    }
};

Domy.Camera.prototype.constructor = Domy.Camera;

/**
 * The world container stores every sprite or group and updates them automatically.
 * @class Domy.World
 * @constructor
 * @param {object} game - Your global game object.
 */
Domy.World = function(game)
{
    this.game = game;
    this.camera = new Domy.Camera(this.game);
    this.x = 0;
    this.y = 0;
    this.width = this.game.width;
    this.height = this.game.height;
    this.bounds = new Domy.Rectangle(this.x, this.y, this.width, this.height);

    this.children = [];

    return this;
};

Domy.World.prototype =
{
    /**
     * Adds a child to the world container. The child can be a sprite or a group.
     * @method Domy.World#addChild
     * @param {object} entity - The child.
     */
    addChild(entity)
    {
        this.children.push(entity);
    },

    /**
     * Removes the given child from the world container.
     * @method Domy.World#removeChild
     * @param {object} entity - The child.
     */
    removeChild(entity)
    {
        this.children.splice(this.children.indexOf(entity), 1);
    },

    /**
     * The update loop of the world container. Happens automatically.
     * @method Domy.World#update
     * @private
     */
    update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.update();
        }
    },

    /**
     * The render loop of the world container. Happens automatically.
     * @method Domy.World#render
     * @private
     */
    render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.render();
        }
    }
};

Domy.World.prototype.constructor = Domy.World;

/**
 * Groups are containers storing your game objects (sprites).
 * They are added automatically to the world container.
 * @class Domy.Group
 * @constructor
 * @param {object} game - Your global game object.
 */
Domy.Group = function(game)
{
    this.game = game;
    this.world = this.game.world;

    this.children = [];

    // Add it to the world
    this.world.children.push(this);

    return this;
};

Domy.Group.prototype =
{
    /**
     * Adds an entity to a group. The entity has to be a sprite.
     * @method Domy.Group#addChild
     * @param {object} entity - The entity.
     */
    addChild(entity)
    {
        this.children.push(entity);

        // Since the entity is now in the group, there is no need for it to be
        // a child of the world, because it gets updated through the group now.
        this.world.removeChild(entity);
    },

    /**
     * Removes the given entity from a group.
     * @method Domy.Group#removeChild
     * @param {object} entity - The entity.
     */
    removeChild(entity)
    {
        this.children.splice(this.children.indexOf(entity), 1);

        // Since the entity left the group, it has to be added as a child of
        // the world again, so it still gets updates.
        this.world.addChild(entity);
    },

    /**
     * The update loop of the group. Happens automatically.
     * @method Domy.Group#update
     * @private
     */
    update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.update();
        }
    },

    /**
     * The render loop of the group. Happens automatically.
     * @method Domy.Group#render
     * @private
     */
    render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.render();
        }
    }
};

Domy.Group.prototype.constructor = Domy.Group;

/**
 * Sprites are game objects which contain the actual HTML elements for rendering.
 * @class Domy.Sprite
 * @constructor
 * @param {Domy.Game} game - Your global game object.
 * @param {number} x - The x coordinate in the world of the sprite.
 * @param {number} y - The y coordinate in the world of the sprite.
 * @param {string} [key=null] - This is the image for the sprite. If left empty, the sprite will be just a green rectangle.
 * @param {string} [frame=0] - The starting frame of the image (only for spritesheets). If left empty, it will be null.
 * @param {Domy.Group} [group=null] - The group this sprite shall be added to. If left empty, it will be added directly to the world container
 */
Domy.Sprite = function(game, x, y, key, frame, group)
{
    this.x = x || 0;
    this.y = y || 0;
    this.key = key || null;
    this.frame = frame || 0;
    this.group = group || null;

    // Internal values
    this.game = game;
    this.world = this.game.world;
    this.camera = this.game.camera;
    this.time = this.game.time;
    this.alive = true;
    this.alpha = 1;
    this.width = 32;
    this.height = 32;
    this.anchor = new Domy.Point(0.5, 0.5);
    this.position = new Domy.Point(this.x, this.y);
    this.bounds = new Domy.Rectangle(this.x, this.y, this.width, this.height);
    this.collideWorldBounds = false;
    this.outOfBoundsKill = true;
    this.velocity = new Domy.Point(0, 0);
    this.inCamera = false;

    // HTML magic
    this.image = document.createElement('div');
    this.game.parent.appendChild(this.image);
    this.image.style.position = "absolute";
    this.image.style.width = this.width + "px";
    this.image.style.height = this.height + "px";

    // If no image was given, just color it green
    if (this.key === null)
    {
        this.image.style.backgroundColor = "#00ff00";
    }

    // If an image was given, apply it as a background image
    else
    {
        // Apply frame on spritesheet
        if (this.frame !== 0)
        {
            let frame = Domy.Cache.Images[this.key].frames[this.frame];
            this.image.style.backgroundPosition = frame.x + "px " + frame.y + "px";
        }

        // The stuff below has to be turned into a proper loader function
        // which loads the assets at the beginning of the game.
        //Domy.loadImage(this);

        this.image.style.backgroundImage = "url(" + Domy.Cache.Images[this.key].src + ")";
    }

    // Spritesheet animation test :D It works!
    let that = this;
    setInterval(function()
    {
        if (that.key !== null)
        {
            let frames = Domy.Cache.Images[that.key].frames.length;
            that.frame += 1;
            if (that.frame >= frames) that.frame = 0;
            that.setFrame(that.frame);
        }
    }, 250);

    // Add it to the world
    // If a group was given, add the sprite to that
    if (this.group !== null) { this.group.addChild(this); }
    // If no group was given, add the sprite to the world container
    else { this.world.addChild(this); }

    return this;
};

Domy.Sprite.prototype =
{
    /**
     * Kills the sprite. Just a placeholder for now. Will be used as a soft destroy for object pooling.
     * @method Domy.Sprite#kill
     */
    kill()
    {
        this.alive = false;
        this.destroy();
        return this;
    },

    /**
     * Destroys the sprite and removes it entirely from the game world.
     * @method Domy.Sprite#destroy
     */
    destroy()
    {
        // Remove from world
        this.world.removeChild(this);

        // Remove the HTML element
        this.game.parent.removeChild(this.image);

        return this;
    },

    // Changes the width of the sprite
    setWidth(width)
    {
        this.width = width;
        this.image.style.width = value + "px";

        return this;
    },

    // Changes the height of the sprite
    setHeight(height)
    {
        this.width = height;
        this.image.style.height = value + "px";

        return this;
    },

    // Changes shown frame of spritesheet
    setFrame(frame)
    {
        frame = Domy.Cache.Images[this.key].frames[frame];
        this.image.style.backgroundPosition = frame.x + "px " + frame.y + "px";

        return this;
    },

    /**
     * The update loop of the sprite. Happens automatically.
     * @method Domy.Sprite#update
     * @private
     */
    update()
    {
        // Moving
        this.x += this.time.delta * this.velocity.x;
        this.y += this.time.delta * this.velocity.y;

        // Store some variables for faster accessing
        let thisWidth    = (this.width * 0.5) * this.anchor.x;
        let thisHeight   = (this.height * 0.5) * this.anchor.y;
        let worldWidth   = this.world.width;
        let worldHeight  = this.world.height;
        let cameraWidth  = this.camera.width;
        let cameraHeight = this.camera.height;

        // Let the sprite collide with the world bounds
        if (this.collideWorldBounds)
        {
            // Left, right, top, bottom
            if (this.x < thisWidth) { this.x = thisWidth; }
            if (this.x + thisWidth > worldWidth) { this.x = worldWidth - thisWidth; }
            if (this.y < thisHeight) { this.y = thisHeight; }
            if (this.y + thisHeight > worldHeight) { this.y = worldHeight - thisHeight; }
        }

        // Kill the sprite if it leaves the world bounds
        if (this.outOfBoundsKill)
        {
            // Left, right, top, bottom
            if (this.x < thisWidth
             || this.x > worldWidth  + thisWidth
             || this.y < thisHeight
             || this.y > worldHeight + thisHeight)
            {
                this.kill();
            }
        }

        // Update some internal stuff
        this.position.x = this.x;
        this.position.y = this.y;
        this.bounds.x = this.x;
        this.bounds.y = this.y;
        this.bounds.width = this.width;
        this.bounds.height = this.height;

        // Check if inside camera bounds
        if (this.x >= this.camera.x
         && this.y >= this.camera.y
         && this.x <= this.camera.width
         && this.y <= this.camera.height)
        {
            this.inCamera = true;
        }
        else
        {
            this.inCamera = false;
        }

        return this;
    },

    /**
     * The render loop of the sprite. Happens automatically.
     * @method Domy.Sprite#render
     * @private
     */
    render()
    {
        let thisWidth = (this.width * 0.5) * this.anchor.x;
        let thisHeight = (this.height * 0.5) * this.anchor.y;

        // Update HTML element)
        this.image.style.left = Math.round(this.x - thisWidth) + "px";
        this.image.style.top = Math.round(this.y - thisHeight) + "px";
        this.image.style.opacity = this.alpha;

        return this;
    }
};

Domy.Sprite.prototype.constructor = Domy.Sprite;

/**
 * The Time container stores the current time, the time the game has started at and the delta time for animating.
 * @class Domy.Time
 * @constructor
 * @param {Domy.Game} game - Your global game object.
 */
Domy.Time = function(game)
{
    this.game = game;

    this.started = Date.now();
    this.sinceStart = 0;
    this.now = Date.now();

    return this;
};

Domy.Time.prototype =
{
    /**
     * The update loop of the time object. Happens automatically.
     * @method Domy.Time#update
     * @private
     */
    update(delta)
    {
        this.sinceStart = Date.now() - this.started;
        this.now = Date.now();
        this.delta = delta / 1000;

        return this;
    }
};

Domy.Time.prototype.constructor = Domy.Time;

/**
 * The Math object offers various standard math functions like measuring a distance.
 *
 * @class Domy.Math
 * @static
 */
Domy.Math = {

    /**
    * PI.
    * @property {number} Domy.Math#PI
    * @type {number}
    */
    PI: Math.PI,

    /**
    * Twice PI.
    * @property {number} Domy.Math#PI2
    * @type {number}
    */
    PI2: Math.PI * 2,

    /**
    * Degrees to Radians factor.
    * @property {number} Domy.Math#DEG_TO_RAD
    */
    DEG_TO_RAD: Math.PI / 180,

    /**
    * Degrees to Radians factor.
    * @property {number} Domy.Math#RAD_TO_DEG
    */
    RAD_TO_DEG: 180 / Math.PI,

    /**
    * Convert degrees to radians.
    *
    * @method Domy.Math#degToRad
    * @param {number} degrees - Angle in degrees.
    * @return {number} Angle in radians.
    */
    degToRad(degrees)
    {
        return degrees * Domy.Math.DEG_TO_RAD;
    },

    /**
    * Convert radians to degrees.
    *
    * @method Domy.Math#radToDeg
    * @param {number} radians - Angle in radians.
    * @return {number} Angle in degrees.
    */
    radToDeg(radians)
    {
        return radians * Domy.Math.RAD_TO_DEG;
    },

    /**
    * Returns an integer between (including) min and (including) max
    *
    * @method Domy.Math#integerInRange
    * @param {number} min - Min.
    * @param {number} max - Max.
    * @return {number}
    */
    integerInRange(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /** Returns the direction between two poins in degrees */
    angleBetweenPoints(x1, y1, x2, y2)
    {
        return Math.atan2(y2 - y1, x2 - x1) * Domy.Math.RAD_TO_DEG;
    },

    /** Returns the distance between two vectors */
    distanceBetweenPoints(x1, y1, x2, y2)
    {
        return Math.hypot(x2 - x1, y2 - y1);
    }
};

/**
 * The Sound object offers audio functions.
 * @class Domy.Sound
 * @constructor
 * @static
 */
Domy.Sound = {};

/** Plays an audio file */
Domy.Sound.play = function(file, loop)
{
    var file = Domy.Sounds[file];
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
};

// Physics

/**
 * The Physics object offers physics related functions like collision.
 * @class Domy.Physics
 * @constructor
 * @static
 */
Domy.Physics =
{
    /** Rectangle collision */
    intersectRectangle(a, b)
    {
        let ax = a.x;
        let ay = a.y;
        let aw = a.width;
        let ah = a.height;
        let bx = b.x;
        let by = b.y;
        let bw = b.width;
        let bh = b.height;

        return !(ax + aw > bx
              || ay + ah > by
              || bx + aw > ax
              || by + ah > ay);
    },

    /** Circle collision */
    intersectCircle(a, b)
    {
        let x = a.x - b.x;
        let y = a.y - b.y;
        let r = (a.width * 0.5) + (b.width * 0.5);
        return (x * x) + (y * y) < (r * r);
    }
}

// Test area


/**
 * Loads an image or spritesheet.

 * @param {string} key - The name for the image.
 */
Domy.loadImage = function(key, path, frameWidth, frameHeight, framesMax)
{
    frameWidth  = frameWidth  || 32;
    frameHeight = frameHeight || 32
    framesMax   = framesMax   || Infinity;

    let img = new Image();
    img.onload = function()
    {
        // Save frames for spritesheet animation
        let frames = [];
        let frameFound = 0;

        for (let x = 0; x < this.width; x += frameWidth)
        {
            for (let y = 0; y < this.height; y += frameHeight)
            {
                frameFound += 1;
                if (frameFound >= framesMax) break;
                {
                    frames.push(
                    {
                        x: -x,
                        y: -y
                    });
                }
            }
        }

        Domy.Cache.Images[key].frames = frames;
    }
    img.src = path;
    Domy.Cache.Images[key] = img;
    Domy.Cache.Images[key].frames = [];
    Domy.Cache.Images[key].frameWidth = frameWidth;
    Domy.Cache.Images[key].frameHeight = frameHeight;
};

/** The cache */
Domy.Cache =
{
    "Images": {},
    "Sounds": {}
};

/**
 * Creates a point.

 * @constructor
 * @param {number} x
 * @param {number} y
 */
Domy.Point = function(x, y)
{
    this.setTo(x, y);

    return this;
};

Domy.Point.prototype =
{
    /**
     * Setup the point.
     * @param {number} x
     * @param {number} y
     */
    setTo(x, y)
    {
       this.x = x || 0;
       this.y = y || 0;

       return this;
    }
};

/**
 * Creates a rectangle.
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
Domy.Rectangle = function(x, y, width, height)
{
    this.setTo(x, y, width, height);

    return this;
};

Domy.Rectangle.prototype =
{
    /**
     * Setup the rectangle.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */
    setTo(x, y, width, height)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.width = width || 0;
       this.height = height || 0;

       return this;
   }
};

/**
 * Creates a circle.
 * @constructor
 * @param {number} x
 * @param {number} y
 * @param {number} diameter
 */
Domy.Circle = function(x, y, diameter)
{
    this.setTo(x, y, diameter);

    return this;
};

Domy.Circle.prototype =
{
    /**
     * Setup the circle.
     * @param {number} x
     * @param {number} y
     * @param {number} diameter
     */
    setTo(x, y, diameter)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.diameter = diameter || 0;
       this.radius = diameter * 0.5;

       return this;
   }
};

/**
 * Keyboard controls. Just a placeholder for now.

 * @constructor
 * @param {Domy.Game} game - Your global game object.
 */
Domy.Keyboard = function()
{
    this.whatIsThis = "A keyboard.";

    return this;
};

Domy.Keyboard.prototype =
{
    isDown(key)
    {

    },

    isUp(key)
    {

    }
};

Domy.Keyboard.prototype.constructor = Domy.Keyboard;

/**
 * Mouse controls. Just a placeholder for now.

 * @constructor
 * @param {Domy.Game} game - Your global game object.
 */
Domy.Mouse = function()
{
    this.whatIsThis = "A mouse.";

    return this;
}

Domy.Mouse.prototype.constructor = Domy.Mouse;

/**
 * mainloop.js 1.0.3-20170529
 *
 * @author Isaac Sukin (http://www.isaacsukin.com/)
 * @license MIT
 */

!function(a){function b(a){if(x=q(b),!(a<e+l)){for(d+=a-e,e=a,t(a,d),a>i+h&&(f=g*j*1e3/(a-i)+(1-g)*f,i=a,j=0),j++,k=0;d>=c;)if(u(c),d-=c,++k>=240){o=!0;break}v(d/c),w(f,o),o=!1}}var c=1e3/60,d=0,e=0,f=60,g=.9,h=1e3,i=0,j=0,k=0,l=0,m=!1,n=!1,o=!1,p="object"==typeof window?window:a,q=p.requestAnimationFrame||function(){var a=Date.now(),b,d;return function(e){return b=Date.now(),d=Math.max(0,c-(b-a)),a=b+d,setTimeout(function(){e(b+d)},d)}}(),r=p.cancelAnimationFrame||clearTimeout,s=function(){},t=s,u=s,v=s,w=s,x;a.MainLoop={getSimulationTimestep:function(){return c},setSimulationTimestep:function(a){return c=a,this},getFPS:function(){return f},getMaxAllowedFPS:function(){return 1e3/l},setMaxAllowedFPS:function(a){return"undefined"==typeof a&&(a=1/0),0===a?this.stop():l=1e3/a,this},resetFrameDelta:function(){var a=d;return d=0,a},setBegin:function(a){return t=a||t,this},setUpdate:function(a){return u=a||u,this},setDraw:function(a){return v=a||v,this},setEnd:function(a){return w=a||w,this},start:function(){return n||(n=!0,x=q(function(a){v(1),m=!0,e=a,i=a,j=0,x=q(b)})),this},stop:function(){return m=!1,n=!1,r(x),this},isRunning:function(){return m}},"function"==typeof define&&define.amd?define(a.MainLoop):"object"==typeof module&&null!==module&&"object"==typeof module.exports&&(module.exports=a.MainLoop)}(this);
