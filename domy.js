let Domy =
{
    "Game": {}
};

console.log("Domy v0.0.1 | HTML5 DOM game engine | https://github.com/bonsaiheldin/domy");

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
    this.parent.className = 'domy';

    return this;
}

Domy.Game.prototype.update = function(a)
{
    return this;
};

Domy.Game.prototype.render = function(a)
{
    return this;
};

Domy.Game.prototype.start = function()
{
    return this;
};

Domy.Game.prototype.constructor = Domy.Game;
