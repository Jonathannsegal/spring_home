var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
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

    var game = new Phaser.Game(config);

    function preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('spring', 'assets/Spring_Sprite.png', {frameWidth: 32, frameHeight:50});
        this.load.spritesheet('saw', 'assets/Saw_Sprite.png', {frameWidth:52, frameHeight:52});
    }

    function create ()
    {
        this.add.image(400, 300, 'sky');


        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(500,300, 'ground');


        player = this.physics.add.sprite(100, 450, 'dude');

        player.body.setGravityY(70);
        player.setCollideWorldBounds(true);

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

        spring = this.physics.add.sprite(200,525,'spring');
        spring.body.allowGravity = false;


        spring.body.setSize(32, 15, 16, 75);

        this.anims.create({
          key:'sprung',
          frames: this.anims.generateFrameNumbers('spring', {start: 0, end: 9}),
          frameRate: 10
        });

        this.physics.add.collider(player, spikes, playerDied);
        this.physics.add.collider(player, saws, playerDied)
        this.physics.add.collider(player, platforms);
        this.physics.add.overlap(saws, platforms, changeSawDirection, null, this);
        this.physics.add.overlap(player,spring,springUP, null, this);
        this.physics.add.overlap(player, keys, collectStar, null, this);
    }

    function update ()
    {

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
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        saws.anims.play('saw-spin', true);

    }

    function collectStar (player, key)
    {
        key.disableBody(true, true);
    }

    function springUP (player, spring)
    {
        player.setVelocityY(-330);
        spring.anims.play('sprung');
    }

    function playerDied(player, key)
    {
        location.reload();
    }

    function changeSawDirection(saw)
    {
        var Yvelocity = saw.body.velocity.y;
        var Xvelocity = saw.body.velocity.x;
        saw.setVelocityX(-Xvelocity);
        saw.setVelocityY(-Yvelocity);

    }
