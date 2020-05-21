// phina.js をグローバル領域に展開
phina.globalize();

const FLOOR_WIDTH = 640;
const FLOOR_HEIGHT = 960;
const default_y = 800;

var time = 0;
// MainScene クラスを定義

phina.define('MainScene', {
  superClass: 'CanvasScene',
  init: function() {
    this.superInit();
    // 背景色を指定
    this.backgroundColor = '#444';
    
    
    var x_grid = this.gridX;
    var y_grid = this.gridY;
    
    //var ball = Ball().addChildTo(this);
    //for(var i=0;i<10;i++){
    var x = Math.randint(0, 640);
    var y = 0; 

    this.ball = this.addBall(x,y);
    //}
    //this.ball = this.addBall(10,10);
    
    this.MyBall = Me().addChildTo(this);
    
  },
  
  update: function() {
    var MyBall = this.MyBall;
    var ball = this.ball;
    
    if(MyBall.hitTestElement(ball)){
      time++;
      if(time > 3){
        console.log("aaa");
        this.label = Label("Game Over!!!").addChildTo(this);
        this.label.x = this.gridX.center();
        this.label.y = this.gridY.center();
        this.label.fill = 'red';
        this.MyBall.setVisible(false);
        //setTimeout(this.gameover(), 2000);
      }
    }
  },
  
  onpointstart: function(e) {
    var p = e.pointer;
    this.addBall(p.x, p.y);
  },
  
  addBall: function(x, y) {
    var color = "hsla({0}, 75%, 50%, 0.75)".format(Math.randint(0,360));
    var radius = Math.randint(10,50);
    var speed = Math.randint(5,20);
    
    
    var ball = Ball({
      fill: color,
      radius : radius,
      x: x,
      y: y,
      vy: speed
    }).addChildTo(this);
    
    return ball;
  },
  
  
  gameover: function () {
    this.exit();
  },
  
  
  /*
  this.update = function() {
    if(MyBall.hitTestElement(ball)){
      console.log("aaa");
      this.label = Label('Game Over!!!').addChildTo(this);
      this.label.x = this.gridX.center();
      this.label.y = this.gridY.center();
      this.label.fill = 'red';
    }
  };
  */
});

phina.define('Ball', {
  superClass: 'CircleShape',
  
  init: function(options) {
    options = (options || {}).$safe({
      fill: 'yellow',
      stroke: null,
      radius: 30,
    });
    this.vy = options.vy;
    this.superInit(options);
    //this.vy = 0;
  },
  
  
  update: function (app) {
    this.y += this.vy;
    //this.x = app.pointer.x;
    //this.y = app.pointer.y;
    
    if (this.bottom > FLOOR_HEIGHT) {
      this.top = 0;
      //this.bottom = FLOOR_HEIGHT;
      //this.vy *= -1;
    }
  },
  
});


phina.define('Me', {
  superClass: 'CircleShape',
  
  init: function(options) {
    options = (options || {}).$safe({
      fill: 'red',
      stroke: null,
      radius: 30,
    });
    this.superInit(options);
    //this.vy = 0;
  },

  //ポインター操作
  update: function (app) {
    //this.y += this.vy;
    this.x = app.pointer.x;
    this.y = default_y;
    //this.y = app.pointer.y;
    
    //if (this.bottom > FLOOR_HEIGHT) {
      //this.top = 0;
      //this.bottom = FLOOR_HEIGHT;
      //this.vy *= -1;
    //}
  },
});

// メイン処理
phina.main(function() {
  // アプリケーション生成
  var app = GameApp({
    width: FLOOR_WIDTH,
    height: FLOOR_HEIGHT,
    startLabel: 'main', // メインシーンから開始する
  });
  // アプリケーション実行
  app.run();
});
