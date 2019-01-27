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
        },
        audio: {
            disableWebAudio: true
        }
    };

    var player;
    var stars;
    var platforms;
    var cursors;

window.onload = function(){
    var game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}
    function preload ()
    {
        this.load.audio('background', ['assets/audio/Team7.wav']);

        this.load.image('ground', 'assets/platform.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('phasebox','assets/Phase_Box.png');
        this.load.image('goal', 'assets/goal.png');
        this.load.spritesheet('spring', 'assets/Spring_Sprite.png', {frameWidth: 32, frameHeight:50});
        this.load.spritesheet('saw', 'assets/Saw_Sprite.png', {frameWidth:52, frameHeight:52});
        this.load.spritesheet('button', 'assets/button_sprite.png', {frameWidth:48,frameHeight:7});
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 19, frameHeight: 30 });
        this.load.spritesheet('wallBouncer', 'assets/wallBouncer_sprite.png', {frameWidth:36 , frameHeight:7});
    }

    function create ()
    {
        var music = this.sound.add('background', 1, true);
        // music = new Phaser.Sound(game,'background',1,true);
        music.play();
        this.input.addPointer(1);
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor('#9aece1');
        ground1 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 24,
          scale: 2,
          setXY: {x:16, y:556, stepX:32}
        });


        ground2 = this.physics.add.staticGroup({
            key:'ground',
            repeat:12,
            setXY: {x:284, y:300, stepX:32}
        });

        wall1 = this.physics.add.staticGroup({
            key:'ground',
            repeat:12,
            setXY:{x:700,y:100,stepY:32}
        });

        wall2 = this.physics.add.staticGroup({
            key:'ground',
            repeat:14,
            setXY:{x:800,y:36,stepY:32}
        });

        //platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        //platforms.create(500,300, 'ground');



        buttons = this.physics.add.sprite(500, 535, 'button');
        buttons.body.allowGravity = false;
        sessionStorage.setItem('clicked', 'false');

        this.anims.create({
            key:'buttonClicked',
            frames: this.anims.generateFrameNumbers('button', {start: 0, end: 6}),
            frameRate:10
          })

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
        springs.create(200, 525, 'spring').body.allowGravity = false;
        springs.create(760, 525, 'spring').body.allowGravity = false;

        this.anims.create({
          key:'sprung',
          frames: this.anims.generateFrameNumbers('spring', {start: 0, end: 9}),
          frameRate: 10
        });

        wallBouncerLeft = this.physics.add.group();
        wallBouncerLeft.create(722, 400, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(722, 300, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(722, 200, 'wallBouncer').angle = 90;
        wallBouncerLeft.create(722, 100, 'wallBouncer').angle = 90;

        wallBouncerLeft.children.iterate(function (child){
            child.body.allowGravity = false;
        });

        wallBouncerRight = this.physics.add.group();
        wallBouncerRight.create(778, 450, 'wallBouncer').angle = 270;
        wallBouncerRight.create(778, 350, 'wallBouncer').angle = 270;
        wallBouncerRight.create(778, 250, 'wallBouncer').angle = 270;
        wallBouncerRight.create(778, 150, 'wallBouncer').angle = 270;
        wallBouncerRight.create(778, 50, 'wallBouncer').angle = 270;

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

        goal = this.physics.add.staticGroup();
        goal.create(500, 255, 'goal');

        this.physics.add.collider(player, spikes, playerDied);
        this.physics.add.collider(player, saws, playerDied);
        this.physics.add.collider(player, ground1);
        this.physics.add.collider(player, ground2);
        this.physics.add.collider(player, wall1);
        this.physics.add.collider(player, wall2);
        this.physics.add.collider(player, phaseBox);
        this.physics.add.overlap(saws, ground1, changeSawDirection, null, this);
        this.physics.add.overlap(saws, ground2, changeSawDirection, null, this);
        this.physics.add.overlap(player,springs,springUP, null, this);
        this.physics.add.overlap(player, keys, collectStar, null, this);
        this.physics.add.overlap(player, buttons, buttonClicked, null, this);
        this.physics.add.overlap(player, wallBouncerLeft, bouncerLeft);
        this.physics.add.overlap(player, wallBouncerRight, bouncerRight);
        this.physics.add.overlap(player, goal, winRound);
    }

    function update ()
    {
        if(sessionStorage.getItem('clicked') == 'true'){
            phaseBox.children.iterate(function(child){
                child.disableBody(true, true);
            });
        }
        if(player.x < 716 || player.x > 800){
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
        }

        saws.anims.play('saw-spin', true);

    }

    function collectStar (player, key)
    {
        key.disableBody(true, true);
        sessionStorage.setItem('key', 'true');
    }

    function springUP (player, spring)
    {
        player.setVelocityY(-330);
        spring.anims.play('sprung');
    }

    function playerDied(player, key)
    {
        location.reload();
        sessionStorage.setItem('key', 'false');
        sessionStorage.setItem('clicked', 'false');
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
          button.anims.play('buttonClicked');
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

      function winRound(){
          if(sessionStorage.getItem('key') == 'true'){
              console.log("You win");
                  window.location.replace(`http://${window.location.host}/level-2`);
          }
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
