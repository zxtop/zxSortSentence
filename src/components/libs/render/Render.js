import {Application, Container, Graphics,Sprite,ParticleContainer, loader} from 'pixi.js';
import {getAnimation, load, reateSprite} from '@/loader';
import DragElement from './DragElement';
import STEMTITLE_PRE from 'xes-editor-subtitle';
import GAME_PRE from "xes-editor-game";
import STEMTITLE from 'xes-preview-subtitle';
import GAME from "xes-preview-game";
let resourceNameData = [];
let needData = [];

/**
 * UploadAndRenderEle
 * param index 当前页码下标 componentName 组件名称 res 上传资源resources allData 游离态得所有数据
 * 执行代码得上传回调，将上传得精灵图，序列图和动画资源按页码渲染到舞台上实现左右对照关联
 **/
export function UploadAndRenderEle(index,componentName,res,allData){
    //获取当前舞台容器
    let gameContainer = stage.getChildByName('GAME');
    //获取资源加载集
    !window.res[res.resourceName]?PIXI.loader.add(res.resourceName, res.path):"";
    //执行pixi得loader回调
    PIXI.loader.load(function (loader, resource) {
        //获取待渲染页面容器
        let mainContainer = index ? gameContainer.getChildByName('GAME' + index) : gameContainer.getChildByName('GAME0');
        //根据判断是否需要重新渲染组建容器
        let componentContainer = mainContainer.getChildByName('componentContainer') ? mainContainer.getChildByName('componentContainer') : new PIXI.Container();
        componentContainer.name = 'componentContainer';
        //获取当前容器下符合当前compontent的资源项
        let element = componentContainer.getChildByName(componentName);
        //初始化数据集
        let initData = {
            "show": true,
            "resource": resource,
            "resourceName": res.resourceName,
            "name": componentName,
            "width": res.width,
            "height": res.height,
            "left": 0,
            "top": 0,
            "scale": 1,
            "loop": 0,
            "gameContainer": mainContainer,
            "zIndex": undefined
        }
        //根据判断是否需要修改当前元素
        if (element) {
            //移除舞台对应元素
            initData.left = element.x;
            initData.top = element.y;
            initData.zIndex = componentContainer.getChildIndex(element);
            componentContainer.removeChild(element);
            //重新创建该元素并挂载置舞台
            renderEleByType(initData, allData, true);
        } else {
            //创建该元素并挂载置舞台
            renderEleByType(initData, allData, true);
        }
    });
}

/**
 * RenderAllData
 * param editStatus 是否渲染当前项 allData 所有数据集
 * 执行代码得上传回调，将上传得精灵图，序列图和动画资源按页码渲染到舞台上实现左右对照关联
 **/
export function RenderAllData(editStatus = true,allData){
    let gameContainer = stage.getChildByName('GAME') ? stage.getChildByName('GAME') : new PIXI.Container();
    gameContainer.name = 'GAME';
    //遍历配置资源文件
    allData.sources.forEach(function (question, index) {
        //初始化公共部分的内容
        let game = null;
        let stemTitle = null;
        if (editStatus) {
            game = new GAME_PRE(question.bgImage, question.stemImg, res, index);
            stemTitle = new STEMTITLE_PRE(question.subTitle, res);
        } else {
            game = new GAME(question.bgImage, question.stemImg, res, index);
            stemTitle = new STEMTITLE(question.subTitle, res);
        }
        game.addChild(stemTitle);
        game.name = 'GAME' + index;
        game.visible = false;
        gameContainer.addChild(game);
        //初始化元素容器
        let componentContainer = new PIXI.Container();
        componentContainer.name = 'componentContainer';
        //按数据初始化页面个性部分的页面元素
        Object.keys(question).forEach(function (key) {
            if (key != 'id' && key != 'bgImage' && key != 'subTitle' && key != 'stemImg' && key != 'rightKey') {
                let obj = {};
                resourceNameData = [];
                obj[key] = question[key];
                getResourceData(obj);
                resourceNameData.forEach(function (item, ids) {
                    let initData = {
                        "show": item.show,
                        "resource": res,
                        "resourceName": item.name || item.image_name || item.sprite_name || item.animate_name,
                        "name": item.componentName,
                        "width": item.width,
                        "height": item.height,
                        "left": item.x,
                        "top": item.y,
                        "scale": item.scale,
                        "loop": item.loop,
                        "gameContainer": game,
                        "zIndex": item.zIndex
                    };
                    renderEleByType(initData, allData, editStatus);
                });
            }
        });
    });

    if (editStatus) {
        //找到页面上的开始按钮
        let startBtn = stage.getChildByName('START').children[0].getChildByName('startBtnContainer').children[0];
        if (startBtn) {
            new DragElement(startBtn, function (x, y) {
                needData = [];
                getNeedData(allData, startBtn.name);
                needData[0].x = x.toFixed(1);
                needData[0].y = y.toFixed(1);
            });
        }
        //页面上的背景音频按钮
        let bgSoundBtn = stage.getChildByName('gameBgSound');
        if (bgSoundBtn) {
            new DragElement(bgSoundBtn, function (x, y) {
                needData = [];
                getNeedData(allData, 'gameBgSound');
                needData[0].x = x.toFixed(1);
                needData[0].y = y.toFixed(1);
            });
        }
    }

    stage.addChild(gameContainer);

    if (editStatus) {
        gameContainer.children.forEach(function (item, index) {
            //页面上的题干音频按钮
            let stemSoundBtn = stage.getChildByName('GAME').getChildByName("GAME" + index).getChildByName('STEMTITLE').children[0].getChildByName('stemSound');
            if (stemSoundBtn) {
                new DragElement(stemSoundBtn, function (x, y) {
                    needData = [];
                    getNeedData(allData, 'stemSound');
                    needData[index] ? needData[index].x = x.toFixed(1) : needData[0].x = x.toFixed(1);
                    needData[index] ? needData[index].y = y.toFixed(1) : needData[0].y = y.toFixed(1);
                });
            }
            //页面上的题干图
            let stemImg = stage.getChildByName('GAME').getChildByName("GAME" + index).getChildByName("gameContainer").getChildByName('stemContainer').children[0];
            if (stemImg) {
                new DragElement(stemImg, function (x, y) {
                    needData = [];
                    getNeedData(allData, stemImg.name);
                    needData[index] ? needData[index].x = x.toFixed(1) : needData[0].x = x.toFixed(1);
                    needData[index] ? needData[index].y = y.toFixed(1) : needData[0].y = y.toFixed(1);
                });
            }
            //页面上的题干图
            let stemText = stage.getChildByName('GAME').getChildByName("GAME" + index).getChildByName('STEMTITLE').children[0].getChildByName('stemText');
            if (stemText) {
                new DragElement(stemText, function (x, y) {
                    needData = [];
                    getNeedData(allData, 'stemText');
                    needData[index] ? needData[index].x = x.toFixed(1) : needData[0].x = x.toFixed(1);
                    needData[index] ? needData[index].y = y.toFixed(1) : needData[0].y = y.toFixed(1);
                });
            }
        });
    }

    stage.addChild(gameContainer);
    stage.getChildByName('gameBgSound')?stage.setChildIndex(stage.getChildByName('gameBgSound'),stage.children.length-1):"";
    RenderPageByIndex(0);
}

export function RenderElementByIndex(index,allData){
    let game = null;
    game = stage.getChildByName('GAME').getChildByName('GAME' + index);
    game.getChildByName('componentContainer').removeChildren();
    if(allData){
        Object.keys(allData.sources[index]).forEach(function (key, ids) {
            if (key != 'id' && key != 'bgImage' && key != 'subTitle' && key != 'stemImg' && key != 'rightKey') {
                resourceNameData = [];
                getResourceData(allData.sources[index][key]);
                for (let i = resourceNameData.length - 1; i >= 0; i--) {
                    let initData = {
                        "show": resourceNameData[i].show,
                        "resource": res,
                        "resourceName": resourceNameData[i].name || resourceNameData[i].image_name || resourceNameData[i].sprite_name || resourceNameData[i].animate_name,
                        "name": resourceNameData[i].componentName,
                        "width": resourceNameData[i].width,
                        "height": resourceNameData[i].height,
                        "left": resourceNameData[i].x,
                        "top": resourceNameData[i].y,
                        "scale": resourceNameData[i].scale,
                        "loop": resourceNameData[i].loop,
                        "gameContainer": game,
                        "zIndex": resourceNameData[i].zIndex
                    };
                    renderEleByType(initData, allData, true);
                }
            }
        });
    }
}

export function RenderPageByIndex(index){
    let gameContainer = stage.getChildByName('GAME');
    gameContainer.children.forEach(item => {
        item.visible = false;
    });
    //获取当前下标的页面
    let game = gameContainer.getChildByName('GAME'+index);
    //将其置到舞台最高层
    // _that.gameContainer.setChildIndex(game,_that.gameContainer.children.length-1)
    game.visible = true;
}

export function CopyAndRender(index,data,componentName,allData){
    //获取当前页面
    let game = new GAME_PRE(data.bgImage, data.stemImg, res);
    let stemTitle = new STEMTITLE_PRE(data.subTitle, res);
    game.addChild(stemTitle);
    game.name = 'GAME' + index;
    game.visible = false;
    stage.getChildByName('GAME').addChild(game);
    //初始化元素容器
    let componentContainer = new PIXI.Container();
    componentContainer.name = 'componentContainer';
    //按数据初始化页面个性部分的页面元素
    Object.keys(data).forEach(function (key) {
        if (key != 'id' && key != 'bgImage' && key != 'subTitle' && key != 'stemImg') {
            let obj = {};
            obj[key] = data[key];
            resourceNameData = [];
            getResourceData(obj);
            resourceNameData.forEach(function (item) {
                let initData = {
                    "show": item.show,
                    "resource": res,
                    "resourceName": item.name || item.image_name || item.sprite_name || item.animate_name,
                    "name": item.componentName,
                    "width": item.width,
                    "height": item.height,
                    "left": item.x,
                    "top": item.y,
                    "scale": item.scale,
                    "loop": item.loop,
                    "gameContainer": game,
                    "zIndex": item.zIndex
                };
                renderEleByType(initData, allData, true);
            });
        }
    });
}

export function DeleteEleByName(index,name){
    //获取当前页面
    let gameContainer = stage.getChildByName('GAME');
    //获取当前页面
    let componentContainer = gameContainer.getChildByName('GAME'+index).getChildByName('componentContainer');
    componentContainer.getChildByName(name)?componentContainer.removeChild(componentContainer.getChildByName(name)):"";
}

export function CopyPageAndRender(index,data,allData){
    //获取当前页面
    //初始化公共部分的内容
    let game = new GAME(data.bgImage, data.stemImg, res);
    let stemTitle = new STEMTITLE(data.subTitle, res);
    game.addChild(stemTitle);
    game.name = 'GAME'+index
    game.visible = false;
    stage.getChildByName('GAME').addChild(game);
    //初始化元素容器
    let componentContainer = new Container();
    componentContainer.name = 'componentContainer';
    //按数据初始化页面个性部分的页面元素
    Object.keys(data).forEach(key=>{
        if(key!='id'&&key!='bgImage'&&key!='subTitle'&&key!='stemImg'){
            let obj = {};
            obj[key] = data[key];
            resourceNameData = [];
            getResourceData(obj);
            resourceNameData.forEach((item)=>{
                let initData = {
                    "show":item.show,
                    "resource":res,
                    "resourceName":item.name||item.image_name||item.sprite_name||item.animate_name,
                    "name":item.componentName,
                    "width":item.width,
                    "height":item.height,
                    "left":item.x,
                    "top":item.y,
                    "scale":item.scale,
                    "loop":item.loop,
                    "gameContainer":game,
                    "zIndex":item.zIndex
                }
                renderEleByType(initData,allData,true)
            })
        }
    })
}

export function DeletElementByName(index,name){
    let gameContainer = stage.getChildByName('GAME');
    //获取当前页面
    let componentContainer = gameContainer.getChildByName('GAME'+index).getChildByName('componentContainer');
    componentContainer.getChildByName(name)?componentContainer.removeChild(componentContainer.getChildByName(name)):"";
}


export function stemAudioPause(index){
    let game = stage.getChildByName('GAME').getChildByName('GAME'+index);
    if(game.children[1].stemAudioStr){
        game.children[1].stemAudioStr.pause();
    }
    if(game.children[1].stemSound){
        game.children[1].stemSound.timeScale = 0;
    }
}

function renderEleByType(obj,allData,editStatus){
    //判断使用的资源集
    let resMap = obj.resource ? obj.resource : res;
    let element = null;
    let ids = parseInt(obj.gameContainer.name.substring(4));
    let componentContainer = obj.gameContainer.getChildByName('componentContainer') ? obj.gameContainer.getChildByName('componentContainer') : new PIXI.Container();
    componentContainer.name = 'componentContainer';
    //渲染舞台元素
    if (obj.resourceName) {
        if (obj.resourceName.indexOf('image') > -1 && (obj.show || obj.resourceName.indexOf('render') > -1)) {
            // 初始化图片精灵
            element = new PIXI.Sprite.fromImage(resMap[obj.resourceName].url);
            element.width = obj.width;
            element.height = obj.height;
            element.name = obj.name;
            element.copyName = obj.resourceName;
            element.x = parseFloat(obj.left);
            element.y = parseFloat(obj.top);
            element.interactive = true;
            element.cursor = 'grab';
            componentContainer.addChild(element);
            obj.zIndex == undefined ? componentContainer.setChildIndex(element, obj.zIndex) : "";

            if (allData && editStatus) {
                new DragElement(element, function (x, y) {
                    needData = [];
                    getNeedData(allData.sources[ids], obj.name);
                    needData[0].x = x.toFixed(1);
                    needData[0].y = y.toFixed(1);
                });
            }
        } else if (obj.resourceName.indexOf('sprite') > -1 && (obj.show || obj.resourceName.indexOf('render') > -1)) {
            // 初始化精灵序列图

            let frame = resMap[obj.resourceName].spritesheet;
            let frameArray = [];
            for (let i in frame.textures) {
                frameArray.push(frame.textures[i]);
            }
            element = new PIXI.extras.AnimatedSprite(frameArray);
            element.x = obj.left;
            element.y = obj.top;
            element.loop = obj.loop;
            element.name = obj.name;
            element.copyName = obj.resourceName;
            element.animationSpeed = 1;
            element.scale.set(obj.scale);
            element.play();
            element.interactive = true;
            element.cursor = 'grab';
            componentContainer.addChild(element);
            obj.zIndex == undefined ? componentContainer.setChildIndex(element, obj.zIndex) : "";
            if (allData && editStatus) {
                new DragElement(element, function (x, y) {
                    needData = [];
                    getNeedData(allData, obj.name);
                    needData[ids] ? needData[ids].x = x.toFixed(1) : needData[0].x = x.toFixed(1);
                    needData[ids] ? needData[ids].y = y.toFixed(1) : needData[0].y = y.toFixed(1);
                });
            }
        } else if (obj.resourceName.indexOf('animation') > -1 && (obj.show || obj.resourceName.indexOf('render') > -1)) {
            // 渲染动画元素
            element = (0, getAnimation)(obj.resourceName);
            element.state.setAnimation(1, 'animation', true);
            element.update(0);
            element.x = obj.left;
            element.y = obj.top;
            element.name = obj.name;
            element.copyName = obj.resourceName;
            element.scale.set(obj.scale);
            element.interactive = true;
            element.cursor = 'grab';
            componentContainer.addChild(element);
            obj.zIndex == undefined ? componentContainer.setChildIndex(element, obj.zIndex) : "";
            if (allData && editStatus) {
                new DragElement(element, function (x, y) {
                    needData = [];
                    getNeedData(allData, obj.name);
                    needData[ids] ? needData[ids].x = x.toFixed(1) : needData[0].x = x.toFixed(1);
                    needData[ids] ? needData[ids].y = y.toFixed(1) : needData[0].y = y.toFixed(1);
                });
            }
        }
    }

    // obj.gameContainer?"":console.log(obj);
    
    obj.gameContainer ? obj.gameContainer.addChild(componentContainer) : "";
}

function getResourceData(data){
    Object.keys(data).forEach(function (item, index) {
        let values = Object.values(data)[index];
        if (Object.prototype.toString.call(values) === "[object Object]") {
            if (values.hasOwnProperty('name') || values.hasOwnProperty('animate_name') || values.hasOwnProperty('image_name')) {
                resourceNameData.push(values);
            }
            getResourceData(values);
        } else if (Object.prototype.toString.call(values) === '[object Array]') {
            if (Object.prototype.toString.call(values[0]) === "[object Object]") {
                if (values.hasOwnProperty('name') || values.hasOwnProperty('animate_name') || values.hasOwnProperty('image_name')) {
                    resourceNameData.push(values);
                }
                getResourceData(values);
            }
        }
    });
}

function getNeedData(data,componentName){
    Object.keys(data).forEach(function (item, index) {
        let values = Object.values(data)[index];
        if (Object.prototype.toString.call(values) === "[object Object]") {
            if (values.componentName == componentName && values.name != '') {
                needData.push(values);
            }
            getNeedData(values, componentName);
        } else if (Object.prototype.toString.call(values) === '[object Array]') {
            if (Object.prototype.toString.call(values[0]) === "[object Object]") {
                if (values.componentName == componentName && values.name != '') {
                    needData.push(values);
                }
                getNeedData(values, componentName);
            }
        }
    });
}