game = new Domy.Game
(
    800, // Width
    600, // Height
    null // Parent div
    { // Custom states and loops
        create: create,
        update: update,
        render: render
    },
    false // Parent div transparency
);

function create()
{
    // Loads an image
    app.game.load.image("test", "test.png");

    // Create a sprite from the loaded image
    app.game.add.sprite(200, 200, "test");
};

function update()
{

};

function render()
{

};
