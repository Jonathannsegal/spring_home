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

window.onload = function(){
    var game = new Phaser.Game(config);
    resize();
    window.addEventListener("resize", resize, false);
}
    function preload ()
    {
        this.load.image('ground', 'assets/platform.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('key', 'assets/Key.png');
        this.load.image('spikes', 'assets/Spikes.png');
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
        this.input.addPointer(1);
        cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor('#9aece1');
        ground1 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 27,
          setXY: {x:16, y:556, stepX:39}
        });

        ground2 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 23,
          setXY: {x:16, y:400, stepX:39}
        });

        ground3 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 23,
          setXY: {x:172, y:244, stepX:39}
        });

        ground4 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 23,
          setXY: {x:16, y:78, stepX:39}
        });

        ground5 = this.physics.add.staticGroup({
          key:'ground',
          repeat: 20,
          setXY: {x:292, y:-81, stepX:39}
        });

        wall1 = this.physics.add.staticGroup({
            key:'ground',
            repeat:20,
            setXY:{x:20,y:-720,stepY:39}
        });

        wall2 = this.physics.add.staticGroup({
            key:'ground',
            repeat:16,
            setXY:{x:120,y:-660,stepY:39}
        });

        player = this.physics.add.sprite(100, 500, 'dude');
        player.body.setGravityY(70);
        player.setCollideWorldBounds(false);

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

        saws = this.physics.add.sprite(260,210, 'saw');
        saws.body.allowGravity = false;
        //saws.body.setVelocityY(95);
        saws.body.immovable = true;

        saws2 = this.physics.add.sprite(460,210, 'saw');
        saws2.body.allowGravity = false;
        //saws2.body.setVelocityY(-100);
        saws2.body.immovable = true;

        saws3 = this.physics.add.sprite(660,210, 'saw');
        saws3.body.allowGravity = false;
        //saws3.body.setVelocityY(90);
        saws3.body.immovable = true;

        saws4 = this.physics.add.sprite(260,185, 'saw');
        saws4.body.allowGravity = false;
        //saws.body.setVelocityY(95);
        saws4.body.immovable = true;

        saws5 = this.physics.add.sprite(460,185, 'saw');
        saws5.body.allowGravity = false;
        //saws2.body.setVelocityY(-100);
        saws5.body.immovable = true;

        saws6 = this.physics.add.sprite(660,185, 'saw');
        saws6.body.allowGravity = false;
        //saws3.body.setVelocityY(90);
        saws6.body.immovable = true;

        this.anims.create({
          key:'saw-spin',
          frames: this.anims.generateFrameNumbers('saw', {start: 0, end: 2}),
          frameRate: 20,
          repeat: -1
        });

        keys = this.physics.add.staticGroup();
        keys.create(300,40, 'key');

        spikes = this.physics.add.staticGroup();
        spikes.create(830,364, 'spikes');
        spikes.create(760,364, 'spikes');
        spikes.create(530,364, 'spikes');
        spikes.create(460,364, 'spikes');
        spikes.create(300,364, 'spikes');
        spikes.create(230,364, 'spikes');
        spikes.create(405,-115, 'spikes');
        spikes.create(375,-115, 'spikes');
        spikes.create(345,-115, 'spikes');
        spikes.create(445,-115, 'spikes');
        spikes.create(475,-115, 'spikes');
        spikes.create(505,-115, 'spikes');

        springs = this.physics.add.group();
        springs.create(1075, 525, 'spring').body.allowGravity = false;
        springs.create(10, 369, 'spring').body.allowGravity = false;
        springs.create(1075, 213, 'spring').body.allowGravity = false;
        springs.create(60, 47, 'spring').body.allowGravity = false;
        springs.create(860, 369, 'spring').body.allowGravity = false;
        springs.create(560, 369, 'spring').body.allowGravity = false;
        springs.create(330, 369, 'spring').body.allowGravity = false;
        springs.create(790, 369, 'spring').body.allowGravity = false;
        springs.create(490, 369, 'spring').body.allowGravity = false;
        springs.create(260, 369, 'spring').body.allowGravity = false;
        springs.create(200, 213, 'spring').body.allowGravity = false;
        springs.create(400, 213, 'spring').body.allowGravity = false;
        springs.create(600, 213, 'spring').body.allowGravity = false;

        this.anims.create({
          key:'sprung',
          frames: this.anims.generateFrameNumbers('spring', {start: 0, end: 9}),
          frameRate: 10
        });

        wallBouncerLeft = this.physics.add.group({
            key:'wallBouncer',
            repeat: 7,
            setXY: {x:42, y:-708, stepY: 100}
        });

        wallBouncerLeft.children.iterate(function(child){
            child.body.allowGravity = false;
            child.angle = 90;
        });

        wallBouncerRight = this.physics.add.group({
            key:'wallBouncer',
            repeat: 6,
            setXY: {x:98, y:-658, stepY: 100}
        });

        wallBouncerRight.children.iterate(function(child){
            child.body.allowGravity = false;
            child.angle = 270;
        });

        this.anims.create({
            key: 'bounced',
            frames: this.anims.generateFrameNumbers('wallBouncer', {start: 0, end: 4}),
            frameRate: 10
        });

        goal = this.physics.add.staticGroup();
        goal.create(425, -125, 'goal');

        this.physics.add.collider(player, spikes, playerDied);
        this.physics.add.collider(player, saws, playerDied);
        this.physics.add.collider(player, saws2, playerDied);
        this.physics.add.collider(player, saws3, playerDied);
        this.physics.add.collider(player, saws4, playerDied);
        this.physics.add.collider(player, saws5, playerDied);
        this.physics.add.collider(player, saws6, playerDied);
        this.physics.add.collider(player, ground1);
        this.physics.add.collider(player, ground2);
        this.physics.add.collider(player, ground3);
        this.physics.add.collider(player, ground4);
        this.physics.add.collider(player, ground5);
        this.physics.add.collider(player, wall1);
        this.physics.add.collider(player, wall2);
        //this.physics.add.collider(player, phaseBox);
        //this.physics.add.overlap(saws, ground2, changeSawDirection, null, this);
        //this.physics.add.overlap(saws, ground4, changeSawDirection, null, this);
        //this.physics.add.overlap(saws2, ground2, changeSawDirection, null, this);
        //this.physics.add.overlap(saws2, ground4, changeSawDirection, null, this);
        //this.physics.add.overlap(saws3, ground2, changeSawDirection, null, this);
        //this.physics.add.overlap(saws3, ground4, changeSawDirection, null, this);
        this.physics.add.overlap(player,springs,springUP, null, this);
        this.physics.add.overlap(player, keys, collectStar, null, this);
        //this.physics.add.overlap(player, buttons, buttonClicked, null, this);
        this.physics.add.overlap(player, wallBouncerLeft, bouncerLeft);
        this.physics.add.overlap(player, wallBouncerRight, bouncerRight);
        this.physics.add.overlap(player, goal, winRound);
    }

    function update ()
    {
        /*if(sessionStorage.getItem('clicked') == 'true'){
            phaseBox.children.iterate(function(child){
                child.disableBody(true, true);
            });
        }*/

        if(player.y<-10 && player.x > 40 && player.x < 100){


        }
        else{
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
        saws2.anims.play('saw-spin', true);
        saws3.anims.play('saw-spin', true);
        saws4.anims.play('saw-spin', true);
        saws5.anims.play('saw-spin', true);
        saws6.anims.play('saw-spin', true);

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
        console.log(Yvelocity);
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
              window.location.replace(`http://${window.location.host}/level-4`);
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
