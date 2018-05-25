let game = new Carrot.Game(800, 600, "divGame", { preload: preload, create: create }, false);

function preload()
{
    // Load an image.
    game.load.image("carrot", "../../carrot.png");
};

function create()
{
    // Create a sprite from the loaded image.
    let sprite = game.add.sprite(80, 280, "carrot");

    // Activate physics on the sprite, so we can move it.
    game.physics.enable(sprite);
    
    // Set the movement speed: It will move 100 pixels per second to the right.
    sprite.body.velocity.x = 100;
};
