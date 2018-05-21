game = new Domy.Game
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
    app.game.load.image("test", "test.png");
};

function create()
{
    // Create a sprite from the loaded image.
    app.game.add.sprite(200, 200, "test");
};

function update()
{
    // Stuff which should happen 60 times per second.
};

function render()
{
    // Display extra stuff like, for example, a debug display.
};
