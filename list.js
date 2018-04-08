// 这段代码需要在setupDemo之前执行。
(function() {
    // 项渲染器
    var Box   = Laya.Box;
    var Image = Laya.Image;

    var WID = 428,
        HEI = 80;

    function Item() {
        Item.__super.call(this);
        this.size(WID, HEI);
        this.img = new Image();
        this.addChild(this.img);

        this.setImg = function(src) {
            this.img.skin = src;
        }
    }
    Laya.class(Item, "Item", Box);

    // 主要逻辑代码
    var Stage   = Laya.Stage;
    var List    = Laya.List;
    var Handler = Laya.Handler;
    var WebGL   = Laya.WebGL;

    (function() {
        // 不支持WebGL时自动切换至Canvas
        Laya.init(800, 600, WebGL);

        Laya.stage.alignV = Stage.ALIGN_MIDDLE;
        Laya.stage.alignH = Stage.ALIGN_CENTER;

        Laya.stage.scaleMode = Stage.SCALE_SHOWALL;
        Laya.stage.bgColor = "#232628";

        setup();
    })();

    function setup() {
        var list = new List();

        list.itemRender = Item;

        list.repeatX = 1;
        list.repeatY = 1;

        list.x = (Laya.stage.width - WID * list.repeatX) / 2;
        list.y = (Laya.stage.height - HEI) / 2;

        // 使用但隐藏滚动条
        list.hScrollBarSkin = "";

        list.selectEnable = true;
        list.selectHandler = new Handler(this, onSelect);

        list.renderHandler = new Handler(this, updateItem);
        Laya.stage.addChild(list);

        // 设置数据项为对应图片的路径
        var data = [];
        for (var i = 0; i < 10; ++i) {
            data.push("images/list/1.jpg");
            data.push("images/list/2.jpg");
            data.push("images/list/3.jpg");
            data.push("images/list/4.jpg");
            data.push("images/list/5.jpg");
        }
        list.array = data;

        window.list = list;
    }

    function updateItem(cell, index) {
        cell.setImg(cell.dataSource);
    }

    function onSelect(index) {
        console.log("当前选择的索引：" + index);
    }
})();