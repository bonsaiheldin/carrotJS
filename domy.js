// Initialize the main object with all expected properties
var Domy = Domy ||
{
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
    "Line": {}
};

console.log("%cDomy v0.0.2 | HTML5 DOM game engine | https://github.com/bonsaiheldin/domy", "font-weight: bold;");

// The core
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
    this.camera = this.world.camera;
    this.time = new Domy.Time(this);

    this.start(this);

    return this;
}

Domy.Game.prototype.update = function(delta)
{
    this.time.update(delta);
    this.world.update();
    this.camera.update();
};

Domy.Game.prototype.render = function()
{
    //this.time.render();
    this.world.render();
    //this.camera.render();
};

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

// Camera
Domy.Camera = function(game)
{
    this.game = game;
    this.world = this.game.world;
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
    // Camera follow
    follow(target)
    {
        if (target)
        {
            this.target = target;
        }

        return this;
    },

    // Camera unfollow
    unfollow()
    {
        this.target = null;

        return this;
    },

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

            // Transform the game div
            this.parent.style.left = -this.x;
            this.parent.style.top  = -this.y;
        }

        return this;
    }
};

Domy.Camera.prototype.constructor = Domy.Camera;

// World
Domy.World = function(game)
{
    this.game = game;
    this.camera = new Domy.Camera(game);
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
    addChild(entity)
    {
        this.children.push(entity);

        return this;
    },

    removeChild(entity)
    {
        this.children.splice(this.children.indexOf(entity), 1);

        return this;
    },

    update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.update();
        }

        return this;
    },

    render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.render();
        }

        return this;
    }
};

Domy.World.prototype.constructor = Domy.World;

// Group
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
    addChild(entity)
    {
        this.children.push(entity);

        // Since the entity is now in the group, there is no need for it to be
        // a child of the world, because it gets updated through the group now.
        this.world.removeChild(entity);
    },

    removeChild(entity)
    {
        this.children.splice(this.children.indexOf(entity), 1);

        // Since the entity left the group, it has to be added as a child of
        // the world again, so it still gets updates.
        this.world.addChild(entity);
    },

    update()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.update();
        }

        return this;
    },

    render()
    {
        for (let i = 0; i < this.children.length; i++)
        {
            let child = this.children[i];

            child.render();
        }

        return this;
    }
};

Domy.Group.prototype.constructor = Domy.Group;

// Sprite
Domy.Sprite = function(game, x, y, key, frame)
{
    this.x = x || 0;
    this.y = y || 0;
    this.key = key || null;
    this.frame = frame || 0;
    this.anchor = new Domy.Point(0.5, 0.5);

    // Internal values
    this.game = game;
    this.world = this.game.world;
    this.camera = this.game.camera;
    this.time = this.game.time;
    this.alive = true;
    this.alpha = 1;
    this.width = 32;
    this.height = 32;
    this.bounds = new Domy.Rectangle(this.x, this.y, this.width, this.height);
    this.collideWorldBounds = false;
    this.outOfBoundsKill = true;
    this.velocity = new Domy.Point(0, 0);

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

    this.world.addChild(this);
    return this;
};

Domy.Sprite.prototype =
{
    update()
    {
        // Moving
        this.x += this.time.delta * this.velocity.x;
        this.y += this.time.delta * this.velocity.y;

        let thisWidth = (this.width * 0.5) * this.anchor.x;
        let thisHeight = (this.height * 0.5) * this.anchor.y;
        let worldWidth = this.world.width;
        let worldHeight = this.world.height;

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

        return this;
    },

    render()
    {
        let thisWidth = (this.width * 0.5) * this.anchor.x;
        let thisHeight = (this.height * 0.5) * this.anchor.y;

        // Update HTML element: Has to happen in the render loop because
        // HTML elements are drawn all the time by default anyway.
        this.image.style.left = Math.round(this.x - thisWidth) + "px";
        this.image.style.top = Math.round(this.y - thisHeight) + "px";
        this.image.style.opacity = this.alpha;

        return this;
    },

    // This function acts as a placeholder for future object pools
    kill()
    {
        this.destroy();
        return this;
    },

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
    }
};

Domy.Sprite.prototype.constructor = Domy.Sprite;

// Time
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
    update(delta)
    {
        this.sinceStart = Date.now() - this.started;
        this.now = Date.now();
        this.delta = delta / 1000;

        return this;
    }
};

Domy.Time.prototype.constructor = Domy.Time;

// Math
Domy.Math.Pi = Math.PI;
Domy.Math.Pi180 = Math.PI / 180;
Domy.Math.Pi180r = 180 / Math.PI; // r = reversed

// Returns an integer between (including) min and (including) max
Domy.Math.integerInRange = function(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Returns the direction between two poins in degrees
Domy.Math.angleBetweenPoints = function(x1, y1, x2, y2)
{
    return Math.atan2(y2 - y1, x2 - x1) * Domy.Math.Pi180r;
};

// Returns the distance between two vectors
Domy.Math.distanceBetweenPoints = function(x1, y1, x2, y2)
{
    return Math.hypot(x2 - x1, y2 - y1);
};

// Plays an audio file
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

// Loads an image or spritesheet
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

Domy.Cache =
{
    "Images": {},
    "Sounds": {}
};

// Helper functions
Domy.Point = function(x, y)
{
    this.setTo(x, y);

    return this;
};

Domy.Point.prototype =
{
    setTo(x, y)
    {
       this.x = x || 0;
       this.y = y || 0;

       return this;
    }
};

Domy.Rectangle = function(x, y, width, height)
{
    this.setTo(x, y, width, height);

    return this;
};

Domy.Rectangle.prototype =
{
    setTo(x, y, width, height)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.width = width || 0;
       this.height = height || 0;

       return this;
   }
};

Domy.Circle = function(x, y, diameter)
{
    this.setTo(x, y, diameter);

    return this;
};

Domy.Circle.prototype =
{
    setTo(x, y, diameter)
    {
       this.x = x || 0;
       this.y = y || 0;
       this.diameter = diameter || 0;
       this.radius = diameter * 0.5;

       return this;
   }
};
