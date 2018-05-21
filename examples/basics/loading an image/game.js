let game = new Carrot.Game
(
    800, // Width
    600, // Height
    null, // Background div
    { // Custom states and loops
        preload: preload,
        create: create,
        update: update,
        render: render
    },
    false // Parent div transparency
);

function preload()
{
    // Load an image.
    game.load.image("carrot", "carrot.png");
};

function create()
{
    // Create a sprite from the loaded image.
    game.add.sprite(360, 240, "carrot");
};

function update()
{
    // Stuff which should happen 60 times per second.
};

function render()
{
    // Display extra stuff like, for example, a debug display.
};
