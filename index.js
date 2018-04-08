/**
 * Created by kelvinsun on 18/4/7.
 */

var spriteIndex = './image/sprite-index.png';

var domMap = {
    'div': 'Sprite',
    'img': {
        type: 'Image',
        props: {
            backgroundImage: 'skin',
        },
    },
    'span': 'Text',
    'p': 'Text',
};

var styleMap = {
    '^background': {
        type: 'loadImage',
        children: {
            'Image': {
                position: 0,
            },
            'Position': {
                position: [1, 2],
                type: ['number', 'number'],
            },
            'Size': {
                position: [3, 4],
                type: ['number', 'number'],
            },
        },
    }
};


Laya.init(375, 667);

var DOM = render('View', {
    width: 375,
    height: 40,
}, [
    render('img', {
        backgroundImage: './image/laba.jpg',
        width: 32,
        height: 28,
    }),
]);

Laya.stage.addChild(DOM);


//创建舞台，默认背景色是黑色的
// Laya.init(600, 300);
// var img = render('div', {
//     backgroundImage: './image/bd_logo1.png',
//     backgroundPosition: '100 50',
// }, [
//     render('span', {
//         text: 'Hello Layabox',
//         color: '#fff',
//     })
// ]);
//将文本内容添加到舞台
// Laya.stage.addChild(img);





function render(type, props, children) {
    //TODO 格式校验

    if ('object' !== typeof(props) || Array.isArray(props)) {
        // 简单兼容一下两个参数
        children = props;
        props = {};
    }

    var Component;
    var typeConfig;

    if (domMap[type]) {
        if ('string' === typeof domMap[type]) {
            Component = Laya[domMap[type]];
        } else {
            Component = Laya[domMap[type].type];
            typeConfig = domMap[type];
        }
    } else {
        Component = Laya[type];
    }

    var component = new Component();

    var styles = {};

    Object.keys(props).forEach(function (key) {
        var style = getStyle(key);

        if (typeConfig && typeConfig.props && typeConfig.props[key]) {
            // dom 的样式配置优先级最高
            component[typeConfig.props[key]] = props[key];
        } else if (style) {
            // 如果是有记录在案的属性, 就走配置
            if (!styles[style]) {
                styles[style] = {};
            }

            var child = key.replace(new RegExp(style), '');
            if (child) {
                if (!styles[style].children) {
                    styles[style].children = {};
                }

                styles[style].children[child] = {};
                styles[style].children[child].value = props[key];
            } else {
                styles[style].value = props[key];
            }
        } else {
            component[key] = props[key];
        }
    });

    // 刚才解析出来的 style 的 value
    Object.keys(styles).forEach(function (key) {
        var args = [];

        if (styles[key].value) {
            // 如果该项有 value, 直接设置 value 给 args
            args = [styles[key].value]
        } else if (styles[key].children) {
            // 其他情况都当该项是需要 position 拼装的
            Object.keys(styles[key].children).forEach(function (child) {
                if (styles[key].children[child] && styleMap[key] && styleMap[key].children &&
                    styleMap[key].children[child] && undefined !== styleMap[key].children[child].position) {
                    // 在 map 配置中有这个子项配置的时候
                    if (Array.isArray(styleMap[key].children[child].position)) {
                        // 如果配置是数组
                        // 分解上面解析出来的 value
                        var values = (styles[key].children[child].value || '').split(' ').filter(function (item) {
                            return item;
                        });

                        var index = 0;

                        // 诸葛注入到 args 中
                        styleMap[key].children[child].position.forEach(function (pos, i) {
                            var value = values[index];

                            if (styleMap[key].children[child].type && styleMap[key].children[child].type[i]) {
                                switch (styleMap[key].children[child].type[i]) {
                                    case 'number':
                                        value = +value;
                                        break;
                                    case 'string':
                                        value = '' + value;
                                        break;
                                }
                            }

                            args[pos] = value;
                            ++index;
                        });
                    } else {
                        // 如果配置是单个数字
                        args[styleMap[key].children[child].position] = styles[key].children[child].value;
                    }
                }
            });
        }

        component[styleMap[key].type].apply(component, args);
    });

    if (Array.isArray(children)) {
        children.forEach(function (item) {
            if ('string' === typeof item) {
                var ins = new Laya.Text();
                ins.text = item;
                component.addChild(ins);
            } else {
                component.addChild(item);
            }
        });
    }

    return component;
}

function getStyle(key) {
    var target = undefined;

    Object.keys(styleMap).forEach(function (style) {
        if ((new RegExp(style)).test(key)) {
            target = style;
        }
    });

    return target;
}