/**
 * Created by kelvinsun on 18/4/7.
 */

Laya.init(375, 667);

// 顶栏
var bg = new Laya.Image();

bg.width = 375;
bg.height = 40;
bg.skin = './image/bg_414554.png';
bg.sizeGrid = '1,1,1,1,1';

Laya.stage.addChild(bg);

// 横向 container
var hBox = new Laya.HBox();

hBox.width = 375;
hBox.height = 40;
hBox.align = Laya.HBox.MIDDLE;
hBox.space = 2;

Laya.stage.addChild(hBox);


// 喇叭
var horn = new Laya.Image();

horn.width = 16;
horn.height = 16;
horn.skin = './image/laba.jpg';
horn.sizeGrid = '0,0,0,0,0';

hBox.addChild(horn);

// 幸运墙
var luckyWall = new Laya.HBox();

// luckyWall.left = 100;
luckyWall.width = 284;
luckyWall.height = 40;
luckyWall.align = Laya.HBox.MIDDLE;
luckyWall.space = 10;

hBox.addChild(luckyWall);
// luckyWallBar.addChild(luckyWall);

var lineItem;

for (var i = 0; i < 10; ++i) {
    lineItem = new Laya.Label();
    lineItem.text = '测试内容' + i;

    luckyWall.addChild(lineItem);
}

// var luckyWallBar = new Laya.HScrollBar();
//
// luckyWallBar.width = 284;
// luckyWallBar.height = 40;
// luckyWallBar.align = Laya.HBox.MIDDLE;
//
// luckyWall.addChild(luckyWallBar);
// hBox.addChild(luckyWallBar);


var timeLine = new Laya.TimeLine();

const time = 100 / 80 * 1000;
timeLine.to(luckyWall, {x: -400}, time, null, 0);
timeLine.play(0, true);


var portrait = new Laya.Image();

portrait.width = 25;
portrait.height = 25;
portrait.skin = './image/portrait.jpg';
portrait.sizeGrid = '0,0,0,0,0';

hBox.addChild(portrait);



// Laya.init(300, 300);
//
// var l1 = new Laya.Text();
//
// l1.text = '123';
// l1.color = '#fff';
// l1.width = 100;
//
// Laya.stage.addChild(l1);
//
// var l2 = new Laya.Text();
//
// l2.text = '123';
// l2.color = '#fff';
// l2.width = 100;
//
// Laya.stage.addChild(l2);
