let game = new Carrot.Game(800, 600, "divGame", { preload: preload, create: create }, false);

function preload()
{
    // Load an image.
    game.load.image("carrot", "../../carrot.png");
};

function create()
{
    // Create a sprite from the loaded image.
    game.add.sprite(380, 280, "carrot");
};
