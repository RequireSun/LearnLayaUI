/**
 * Created by kelvinsun on 18/4/7.
 */

import LayaCore from 'laya/libs/laya.core.js';
import LayaWbgl from 'laya/libs/laya.webgl.js';
import LayaUI from 'laya/libs/laya.ui.js';

// import Loader = Laya.Loader;
// import Handler = Laya.Handler;
// import maskDemoUI = LayaUI.maskDemoUI;
// import Sprite = Laya.Sprite;
// import WebGL = Laya.WebGL;
// import Stage = Laya.Stage;

//创建舞台，默认背景色是黑色的
Laya.init(600, 300);
var txt = new Laya.Text();
//设置文本内容
txt.text = "Hello Layabox";
//设置文本颜色为白色，默认颜色为黑色
txt.color = "#ffffff";
//将文本内容添加到舞台
Laya.stage.addChild(txt);
