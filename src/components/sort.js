import {Application,Container,Graphics,Sprite, Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../loader';
import {TweenLite,TimeLine,TweenMax, TimelineMax, Power1} from 'gsap';
import {AnswerInfo,Loading,Question} from 'xes-answer';
import { Store} from 'vuex';
import STEMTITLE from 'xes-preview-subtitle';

import {RenderPageByIndex} from 'xes-tem-render'

class Sort{

    constructor(self){
        this.pixiStage = null;
        this.sentenceBg = null;
        this.self = self;
        this.stemImgImgRes = null;
        this.stemImg = null;
    }

    exec(){
        console.log(stage,"预览")
        this.init(store.state.pageNumber);
    }


    init(pageNum){

        console.log("开始初始化第"+pageNum+"页内容");
        this.pixiStage = stage.getChildByName('GAME').getChildByName('GAME'+pageNum);
        RenderPageByIndex(pageNum);
        stage.getChildByName('gameBgSound')?stage.setChildIndex(stage.getChildByName('gameBgSound'),stage.children.length-1):"";
        console.log(stage)    
        
        
        this.getTargetArea(); //添加目标区域
        

        if(question.sources[pageNum].stemImg.image.show){ //题干图
            if(this.sentenceBg.x>(parseInt(question.sources[pageNum].stemImg.image.width)+parseInt(question.sources[pageNum].stemImg.image.x)) || (this.sentenceBg.x+this.sentenceBg.width)<parseInt(question.sources[pageNum].stemImg.image.x)){
                this.self.$refs.senList.style.width = (this.sentenceBg.width-50)/100+'rem';
                this.self.$refs.senList.style.left = this.sentenceBg.x /100 + 'rem';
                this.self.$refs.senList.style.top = parseInt(question.sources[pageNum].option.targetArea.image.y)/100 + 'rem'

            }else{
                if(parseInt(question.sources[pageNum].stemImg.image.x)>parseInt(this.sentenceBg.width/2+this.sentenceBg.x)){
                    

                    this.self.$refs.senList.style.width = (this.sentenceBg.width-50)/100+'rem';
                    this.self.$refs.senList.style.left = this.sentenceBg.x /100 + 'rem';
                    this.self.$refs.senList.style.top = parseInt(question.sources[pageNum].option.targetArea.image.y)/100 + 'rem'

                }else{

                    let temWidth = this.sentenceBg.width - parseInt(question.sources[pageNum].stemImg.image.width)
                    this.self.$refs.senList.style.width = (temWidth - 80)/100+'rem';
                    this.self.$refs.senList.style.textAlign = 'left';
                    this.self.$refs.senList.style.left = (parseInt(question.sources[pageNum].stemImg.image.x) + parseInt(question.sources[pageNum].stemImg.image.width))/100 + 'rem';
                    this.self.$refs.senList.style.top = parseInt(question.sources[pageNum].option.targetArea.image.y)/100 + 'rem'
                }
            }
            
        }else{

            this.self.$refs.senList.style.width = (this.sentenceBg.width-50)/100+'rem';
            this.self.$refs.senList.style.left = this.sentenceBg.x /100 + 'rem';
            this.self.$refs.senList.style.top = parseInt(question.sources[pageNum].option.targetArea.image.y)/100 + 'rem'

        }   
        this.textContInit(pageNum); //初始化文字

        stage.on('pointerdown',function(){
            return;
        })
    }

    textContInit(pageNum){  //初始化文字
        let i = 0;
        let _that = this;
        let rightArr = question.sources[pageNum].option.textCont.text.trim().split(/\s+/);
        let textArr = [];
        console.log("高度uuuuuuuu",parseFloat(question.sources[pageNum].option.textCont.topY))
        _that.self.$refs.optionList.style.top = question.sources[pageNum].option.textCont.topY ? question.sources[pageNum].option.textCont.topY/100+ 'rem' : '';
        // _that.self.$refs.optionList.style.top = (parseInt(question.sources[pageNum].option.textCont.topY)/100+parseInt(question.sources[pageNum].option.textCont.topY)*(10.8/19.2)/100)+0.8 + 'rem'
        
        if(question.sources[pageNum].option.textCont.text!==''){
            if(question.sources[pageNum].option.textCont.random == '1' && question.sources[pageNum].option.textCont.randomText!==''){

                textArr = question.sources[pageNum].option.textCont.randomText.trim().split(/\s+/);
            }else{
                textArr = question.sources[pageNum].option.textCont.text.trim().split(/\s+/).sort(() => 0.5 - Math.random());
            }
        }

        _that.self.$refs.senList.innerHTML = "";
        _that.self.$refs.optionList.innerHTML = "";


        rightArr.map((item,index)=>{

            if(item.indexOf("&&")!=-1){
                item = item.replace(/&&/g," ");
                rightArr[index] = item;
            }

            let li_dom = document.createElement("li");
            li_dom.innerText = item;
            li_dom.style.fontSize =  question.sources[pageNum].option.textCont.fontSize ? parseInt(question.sources[pageNum].option.textCont.fontSize)/100+'rem' :'.4rem';
            li_dom.style.fontFamily = question.sources[pageNum].option.textCont.fontFamily;
            li_dom.style.color = question.sources[pageNum].option.textCont.color;
            li_dom.style.fontWeight = question.sources[pageNum].option.textCont.strong ? 'bold' :'normal';
            li_dom.style.padding = '.1rem';
            li_dom.style.margin = '.1rem';
            li_dom.style.marginRight = '0rem';
            li_dom.style.marginLeft = '0rem';
            li_dom.classList.add('item-word');
         
            _that.self.$refs.senList.appendChild(li_dom);

        })

        textArr.map((item,index)=>{

            if(item.indexOf("&&")!=-1){
                item = item.replace(/&&/g," ");
                textArr[index] = item;  
            }

            let li_dom = document.createElement("li");
            li_dom.innerText = item;
            li_dom.style.fontSize = question.sources[pageNum].option.textCont.fontSize ? parseInt(question.sources[pageNum].option.textCont.fontSize)/100+'rem' :'.4rem';
            li_dom.style.backgroundColor = question.sources[pageNum].option.textCont.bgColor ? question.sources[pageNum].option.textCont.bgColor :'#F8C536';
            li_dom.style.fontFamily = question.sources[pageNum].option.textCont.fontFamily;
            li_dom.style.color = question.sources[pageNum].option.textCont.color;
            li_dom.style.fontWeight = question.sources[pageNum].option.textCont.strong ? 'bold' :'normal';

            li_dom.style.display = 'inline-block';
            li_dom.style.padding = '.2rem';
            li_dom.style.margin = '.2rem';
            li_dom.style.boxShadow = '0 0.06rem 0.06rem 0 rgba(0,0,0,.2)';
            li_dom.style.border = '.05rem solid #fff';
            li_dom.style.borderRadius = parseInt(question.sources[pageNum].option.textCont.cirle)/100 + 'rem'

            
            li_dom.style.opacity = 1;
            li_dom.style.transition = 'all 0.1s';
            li_dom.style.transform = 'scale(1)';

            li_dom.setAttribute('status',true)

           
            if(question.sources[pageNum].optionAn == 'bounceInDown' || question.sources[pageNum].optionAn == ''){
                
                li_dom.classList.add("answerShowUp"); //从上落下
            }

            if(question.sources[pageNum].optionAn == 'bounceInUp'){
                li_dom.classList.add("answerShowDown"); //从下弹起
            }
            if(question.sources[pageNum].optionAn == 'zoomIn'){
                li_dom.classList.add("answerShowZoom"); //从小变大
            }
            if(question.sources[pageNum].optionAn == 'fadeIn'){
                li_dom.classList.add("answerShowhide"); //渐隐渐现
            }
            setTimeout(()=>{
                li_dom.classList.remove("answerShowUp","answerShowDown","answerShowZoom","answerShowhide")
            },1000);

            li_dom.onmouseover = function(){
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                  return;
                } else {
                    li_dom.style.transform = 'scale(1.1)';
                    li_dom.style.backgroundColor = question.sources[pageNum].option.textCont.bgColorHover ? question.sources[pageNum].option.textCont.bgColorHover :'#efb70f';;
                }
            }

            li_dom.onmouseout = function(){
                let status = this.getAttribute("status");
                if(status == 'true'){
                    li_dom.style.transform = 'scale(1)';
                    li_dom.style.backgroundColor = question.sources[pageNum].option.textCont.bgColor ? question.sources[pageNum].option.textCont.bgColor :'#F8C536';
                }
                
            }

            li_dom.onclick = function(e){
                e.stopPropagation();
                if(res[question.sources[pageNum].option.pickAudio.name]){
                    res[question.sources[pageNum].option.pickAudio.name].sound.play();
                }else{
                    res['audio_pick'].sound.play();
                }

                if(this.innerText == rightArr[i]){

                    console.log("正确");
                    li_dom.style.transform = 'scale(0.9)';

                    this.classList.add('oked');
                    _that.self.$refs.senList.children[i].style.transform = 'scaleX(1)';
                    // _that.self.$refs.senList.children[i].classList.add('ok');

                    i++;

                    if(i > rightArr.length-1){
                        console.log("全部正确");
                        i = 0;
                        if(res[question.sources[pageNum].option.rightAudio.name]){
                            res[question.sources[pageNum].option.rightAudio.name].sound.play();
                        }else{
                            res['audio_right'].sound.play();
                        };

                        setTimeout(()=>{
                            if(store.state.pageNumber < question.sources.length-1){ //提交数据跳转下一题
    
                                let answer = new AnswerInfo();
                                answer.init({type: 0, useranswer:'', answer:'', id:store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                store.dispatch('pushToPostArr', answer);

                                // 停止上一题的题干音频
                                // console.log(_that.pixiStage);
                                // _that.pixiStage.children[3].stemAudioStr?_that.pixiStage.children[3].stemAudioStr.pause():"";
                                // _that.pixiStage.children[3].stemSoundAn?_that.pixiStage.children[3].stemSoundAn.timeScale = 0:"";
                               
                                store.state.pageNumber++;
                                _that.stemAudioPause(store.state.pageNumber)

                                _that.init(store.state.pageNumber);
                                
                                
                            }else{
    
                                let answer = new AnswerInfo();
                                answer.init({type: 0, useranswer:'', answer:'', id:store.state.pageNumber, rightnum: 1, wrongnum: 0});
                                store.dispatch('pushToPostArr', answer);
                                store.dispatch('postAnswer');
    
                            }

                        },1000)
                    }

                    this.setAttribute("status",false);

                }else{

                    console.log("错误");

                    if(question.sources[pageNum].optionAn1 == 'leftAndRight' || question.sources[pageNum].optionAn1 == ''){ //左右晃动
                        this.classList.add('shake');
                    }

                    if(question.sources[pageNum].optionAn1 == 'upAndDown'){ //上下弹动
                        this.classList.add('down');
                    }

                    setTimeout(()=>{
                        li_dom.classList.remove("shake","down")
                    },1000);
                }
                
            }

            _that.self.$refs.optionList.appendChild(li_dom);


        });

        this.self.$refs.optionList.style.display = 'block';
        this.self.$refs.optionList.onclick = function(e){
            // console.log("ddd")
           e.stopPropagation();
            return;
        }
        this.self.$refs.optionList.addEventListener('touchstart',function(){
            return;
        })
    }



    getTargetArea(){ //添加目标区域
        let temArr = [];
        if(question.sources[store.state.pageNumber].option.targetArea.image.name !== ''){
            this.sentenceBg = new PIXI.Sprite.fromImage(res[question.sources[store.state.pageNumber].option.targetArea.image.name].url);
            this.sentenceBg.width = parseInt(question.sources[store.state.pageNumber].option.targetArea.image.width);
            this.sentenceBg.height = parseInt(question.sources[store.state.pageNumber].option.targetArea.image.height);
            this.sentenceBg.x = parseInt(question.sources[store.state.pageNumber].option.targetArea.image.x);
            this.sentenceBg.y = parseInt(question.sources[store.state.pageNumber].option.targetArea.image.y);
        }else{
            this.sentenceBg = new PIXI.Sprite.fromImage(res['image_sentenceBg1'].url);
            this.sentenceBg.x = 120;
            this.sentenceBg.y = 220;
        }

        this.pixiStage.addChild(this.sentenceBg);
        this.pixiStage.addChild(this.pixiStage.stemCon);

        // if(store.state.pageNumber!=0){
        //     let stemTitle = new STEMTITLE(question.sources[store.state.pageNumber].subTitle, res);
        //     this.pixiStage.addChild(stemTitle);  

        // }else{
        //     console.log("7777",this.pixiStage,this.pixiStage.children[1])
        //     this.pixiStage.setChildIndex(this.pixiStage.children[1],this.pixiStage.children.length-1)
        // }

       console.log("8888",this.pixiStage,this.pixiStage.children[1])

    }

    stemAudioPause(index){
        let game = stage.getChildByName('GAME').getChildByName('GAME'+index);

        if(game.children[1].stemAudioStr){
            game.children[1].stemAudioStr.pause();
        }
        if(game.children[1].stemSound){
            game.children[1].stemSound.timeScale = 0;
        }
    }

}
export {Sort}