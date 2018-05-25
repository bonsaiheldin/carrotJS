let game = new Carrot.Game(800, 600, "divGame", { preload: preload, create: create }, false);

function preload()
{
    // Load an image.
    game.load.image("carrot", "../../carrot.png");
};

function create()
{
    // Create a sprite from the loaded image.
    let sprite = game.add.sprite(380, 280, "carrot");

    // Activate physics on the sprite, so we can rotate it.
    game.physics.enable(sprite);
    
    // Set the rotation speed: 90 degrees per second.
    sprite.body.angularVelocity = 90;
};
