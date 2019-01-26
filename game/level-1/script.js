var config = {
        type: Phaser.AUTO,
        width: 1080,
        height: 1920,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var player;
    var stars;
    var platforms;
    var cursors;
    var phaseBox;

window.onload = function(){
    var game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}
    function preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('phasebox','assets/Phase_Box.png');
        this.load.spritesheet('spring', 'assets/Spring_Sprite.png', {frameWidth: 32, frameHeight:50});
        this.load.spritesheet('saw', 'assets/Saw_Sprite.png', {frameWidth:52, frameHeight:52});
        this.load.spritesheet('button', 'assets/button_sprite.png', {frameWidth:48, frameHeight:7});
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 19, frameHeight: 30 });
        this.load.spritesheet('wallBouncer', 'assets/wallBouncer_sprite.png', {frameWidth:36 , frameHeight:7});

    }

    function create ()
    {

        this.input.addPointer(1);

        this.cameras.main.setBackgroundColor('#9aece1'); 
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(500,300, 'ground');
        platforms.create(700, 300, 'wall');
        platforms.create(800, 300, 'wall');


        buttons = this.physics.add.sprite(500, 535, 'button');
        buttons.body.allowGravity = false;
        sessionStorage.setItem('clicked', 'false');

        this.anims.create({
          key:'buttonClick',
          frames: this.anims.generateFrameNumbers('button', {start: 0, end: 6}),
          frameRate:10
        });

        player = this.physics.add.sprite(100, 450, 'dude');
        player.body.setGravityY(70);
        player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(player, true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        keys = this.physics.add.staticGroup();
        keys.create(12,520, 'key');

        spikes = this.physics.add.staticGroup();
        spikes.create(300,520, 'spikes');

        saws = this.physics.add.sprite(400,450, 'saw');
        saws.body.allowGravity = false;
        saws.body.setVelocityY(100);

        this.anims.create({
          key:'saw-spin',
          frames: this.anims.generateFrameNumbers('saw', {start: 0, end: 2}),
          frameRate: 20,
          repeat: -1
        })

        springs = this.physics.add.group();
        springs.create(200, 525, 'spring').body.allowGravity=false;
        springs.create(760, 525, 'spring').body.allowGravity=false;
        //spring = this.physics.add.sprite(200,525,'spring');

        this.anims.create({
          key:'sprung',
          frames: this.anims.generateFrameNumbers('spring', {start: 0, end: 9}),
          frameRate: 10
        });

        wallBouncerLeft = this.physics.add.group();
        wallBouncerLeft.create(719, 400, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(719, 300, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(719, 200, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(719, 100, 'wallBouncer').angle = 90;

        wallBouncerLeft.children.iterate(function (child){
            child.body.allowGravity = false;
        });

        wallBouncerRight = this.physics.add.group();
        wallBouncerRight.create(781, 450, 'wallBouncer').angle = 270;
        wallBouncerRight.create(781, 350, 'wallBouncer').angle = 270;
        wallBouncerRight.create(781, 250, 'wallBouncer').angle = 270;
        wallBouncerRight.create(781, 150, 'wallBouncer').angle = 270;

        wallBouncerRight.children.iterate(function (child){
            child.body.allowGravity = false;
        });

        this.anims.create({
            key: 'bounced',
            frames: this.anims.generateFrameNumbers('wallBouncer', {start: 0, end: 4}),
            frameRate: 10
        });

        phaseBox = this.physics.add.staticGroup({
            key:'phasebox',
            repeat: 4,
            setXY: {x: 600, y: 400, stepY:32}
        });


        this.physics.add.collider(player, spikes, playerDied);
        this.physics.add.collider(player, saws, playerDied)
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, phaseBox);
        this.physics.add.overlap(saws, platforms, changeSawDirection, null, this);
        this.physics.add.overlap(player,springs,springUP, null, this);
        this.physics.add.overlap(player, keys, collectKey, null, this);
        this.physics.add.overlap(player, buttons, buttonClicked, null, this);
        this.physics.add.overlap(player, wallBouncerLeft, bouncerLeft);
        this.physics.add.overlap(player, wallBouncerRight, bouncerRight);
    }

    function update ()
    {

        if(sessionStorage.getItem('clicked') == 'true'){

              phaseBox.children.iterate(function(child){
                child.disableBody(true,true);
              })

        }

        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            if(player.x < 716 || player.x > 800){
              player.setVelocityX(0);
            }


        if (this.input.pointer1.isDown || cursors.left.isDown || cursors.right.isDown)
        {
            if (this.input.pointer1.x > 540 || cursors.right.isDown){
                player.setVelocityX(160);
                player.anims.play('right', true);
            } else if (this.input.pointer1.x < 540 || cursors.left.isDown){
                player.setVelocityX(-160);
                player.anims.play('left', true);
            } 
        } else {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}

        saws.anims.play('saw-spin', true);

    }

    function collectKey (player, key)
    {
        key.disableBody(true, true);
    }

    function springUP (player, spring)
    {
        player.setVelocityY(-330);
        spring.anims.play('sprung');
    }

    function playerDied()
    {
        sessionStorage.setItem('clicked', 'false');
        location.reload();
    }

    function changeSawDirection(saw)
    {
        var Yvelocity = saw.body.velocity.y;
        var Xvelocity = saw.body.velocity.x;
        saw.setVelocityX(-Xvelocity);
        saw.setVelocityY(-Yvelocity);

    }


    function buttonClicked(player, button, phaseBox){
        if(sessionStorage.getItem('clicked') == 'false'){
          button.anims.play('buttonClick');
          sessionStorage.setItem('clicked', 'true');
        }
    }

    function bouncerLeft(player, bouncer){
      player.setVelocityX(160);
      player.setVelocityY(-300);
      bouncer.anims.play('bounced');
    }

    function bouncerRight(player, bouncer){
      player.setVelocityX(-160);
      player.setVelocityY(-300);
      bouncer.anims.play('bounced');
    }

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

