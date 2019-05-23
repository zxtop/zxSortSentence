<template>
    <div class="container" id="stemout">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo" id="logo"/>
        <div id="prevedit">

            <template v-if="statused == true" v-for="(item,index) in ulData" >

                <!-- <ul class="option-list" ref="optionList" >
                </ul> -->

                
                <ul class="sen-list1 stemout" ref="senList" draggable="false"
                :style="{width:'100%',
                top:item.option.textCont.topY/100+'rem',
                let:positionX/100+'rem'}"
                :id="'stemout'+index"
                :class="[{senlistShow:index == number},'stemout'+index]" v-if="item.option.textCont.random == '1'" @mousedown="move($event,index)">

                    <li v-for="(litem,lindex) in item.option.textCont.randomText.trim().split(/\s+/)"  class="stemli"
                    :style="{
                        fontSize:parseInt(item.option.textCont.fontSize)/100+'rem',
                        fontFamily:item.option.textCont.fontFamily,
                        color:item.option.textCont.color,
                        fontWeight:item.option.textCont.strong ? 'bold' :'normal',
                        backgroundColor:item.option.textCont.bgColor,
                        boxShadow :'0 0.06rem 0.06rem 0 rgba(0,0,0,.2)',
                        border : '.05rem solid #fff',
                        borderRadius :parseInt(item.option.textCont.cirle)/100 + 'rem',
                        display :'inline-block',
                        padding :'0.2rem',
                        margin:'0.2rem'
                    }"
                    >
                    {{litem.replace(/&&/g," ")}}

                    </li>
                </ul>

                <ul class="sen-list1 stemout" ref="senList" draggable="false"
                :style="{width:'100%',
                top:item.option.textCont.topY/100+'rem',
                let:positionX/100+'rem'}"
                :id="'stemout'+index"
                :class="[{senlistShow:index == number},'stemout'+index]" v-else="item.option.textCont.random == '2'" @mousedown="move($event,index)" >

                    <li v-for="(litem,lindex) in item.option.textCont.text.trim().split(/\s+/).sort()" class="stemli"  
                    :style="{
            
                        fontSize:parseInt(item.option.textCont.fontSize)/100+'rem',
                        fontFamily:item.option.textCont.fontFamily,
                        color:item.option.textCont.color,
                        fontWeight:item.option.textCont.strong ? 'bold' :'normal',
                        backgroundColor:item.option.textCont.bgColor,
                        boxShadow :'0 0.06rem 0.06rem 0 rgba(0,0,0,.2)',
                        border : '.05rem solid #fff',
                        borderRadius :parseInt(item.option.textCont.cirle)/100 + 'rem',
                        display :'inline-block',
                        padding :'0.2rem',
                        margin:'0.2rem'
                    }"
                    >
                    {{litem.replace(/&&/g," ")}}
                    </li>
                </ul>


            </template>
		</div>
    </div>
</template>

<script>
    import {Application, Container, Sprite,Texture} from 'pixi.js';
    import {load} from './loader';
    import {RenderAllData,RenderPageByIndex,DeletElementByName} from 'xes-tem-render'
    import {AnswerInfo,Loading,Question,postAnswer} from 'xes-answer';
    import START from 'xes-editor-start';
    let question;
    let allData;
    export default {
        name: "start",
        data() {
            return {
                isShow: false,
                number: 0,
                answerStatus:[],
                answerData:[],
                option:['A','B','C','D','E','F','G','H'],

                ulData:null,
				temData:[],
				number:store.state.pageNumber,
				timer:null,
				positionX:0,
				positionY:0,
				statused:false,
				drag:false,
				disX:null,
				disY:null,
				startPosX:0,
				upPosX:0,
				fontWH:base
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: 1080,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            },
             move(e,index){
				let self = this;
				// let nowdom = $('.stemout'+index)[0];
				let nowdom = document.getElementById('stemout'+index)

				let odiv = null;
				// console.log(e.target.nodeName,e.target.parentNode.getAttribute("id"),nowdom.getAttribute("id"))
				if(e.target.nodeName == "LI" && e.target.parentNode.getAttribute("id") == nowdom.getAttribute("id")){
					odiv = e.target.parentNode;
				}

				if(e.target.getAttribute("id") == nowdom.getAttribute("id")){
					odiv = e.target;
				}
				// console.log(odiv);

				let left = null;
				let top = null;

				
				document.onmousedown = (e)=>{
					console.log(e.target.className=='',e.target.className);
                    if(e.target.className.indexOf('stemli') == -1 &&
                        e.target.className.indexOf('stemout') == -1
                        
                    //     e.target.getAttribute("id")=="appCanvas" ||
					//  e.target.getAttribute("id")=="editmain"||
					//  e.target.getAttribute("class")=="iframe" || 
					//  e.target.getAttribute("class")=="edit" || 
					//  e.target.nodeName == "TEXTAREA" ||
					//  e.target.className =='' ||
					//  e.target.className == 'game-inner' ||
					//  e.target.className == 'game-title' ||
					//  e.target.className == 'edit-tab' ||
					//  e.target.className.indexOf('el-tabs__item')!==-1||
					//  e.target.className == 'edit-checkbox-title' ||
					//  e.target.className == 'upload' ||
					//  e.target.className == 'el-input-group__prepend' ||
					//  e.target.className == 'el-input__inner' ||
					//  e.target.className == 'animate-box' ||
					//  e.target.className == 'el-switch__core' ||
					//  e.target.className == 'edit-switch' ||
					//  e.target.className == 'file-title' ||
					//  e.target.className == 'el-slider' ||
					//  e.target.className == 'el-slider__runway'||
					//  e.target.className == 'el-slider__button' ||
					//  e.target.className == 'edit-textarea' ||
					//  e.target.className == 'el-color-picker__icon' ||
					//  e.target.className == 'el-color-picker' ||
					//  e.target.className == 'font-style-color' ||
					//  e.target.className == 'sent-title' ||
					//  e.target.className == 'lock_block'||
					//  e.target.className.indexOf('el-radio')!==-1||
					//  e.target.className == 'option-animate' ||
					//  e.target.className == 'el-tabs__content' ||
					//  e.target.className == 'submit' ||
					//  e.target.className.indexOf('el-button')!==-1||
					//  e.target.className == 'el-checkbox__inner' ||
					//  e.target.className.indexOf('game-title-icon')!==-1||
                    //  e.target.className.indexOf('el-tooltip')!==-1 ||
                    //  e.target.className == 'logo' ||
                    //  e.target.className == 'end-time' ||
                    //  e.target.className == 'el-input-group__append' ||
                    //  e.target.className == 'end-title' ||
                    //  e.target.className == 'end-inner' ||
                    //  e.target.className == 'font-style'
					  ){
						console.log("返回")
						return;
					}else{
						if(!self.drag){

							//算出鼠标相对元素的位置
							self.disX = e.clientX - odiv.offsetLeft;
							self.disY = e.clientY - odiv.offsetTop;
							self.drag = true;
							
							self.startPosX = e.clientX;
	
						}
					}
					
				}
				
				document.onmousemove = (e)=>{    
					//用鼠标的位置减去鼠标相对元素的位置，得到元素的位置

					if(self.drag){

						left = e.clientX - self.disX;
						top = e.clientY - self.disY;
						
						//绑定元素位置到positionX和positionY上面
						this.positionX = left;
						this.positionY = top;
						
						//移动当前元素
						odiv.style.left = left/base + 'rem';
						odiv.style.top = top/base +'rem';
						this.allData.sources[index].option.textCont.topY = parseFloat(top/base*100).toFixed(1);

						// odiv.style.left = left + 'px';
						// odiv.style.top = top + 'px';
						
						// this.allData.sources[index].option.textCont.topY = top+70+top/(100 * ((window.clientWidth-340) / 1920))*(100 * ((window.clientWidth-340) / 1920))

					}
				};

				document.onmouseup = (e) => {
					
					self.upPosX = e.clientX;

					if(self.upPosX == self.startPosX){
						document.onmousemove = null;
						document.onmouseup = null;
						self.drag = false;
						return;
					}


					// odiv.style.top = top+70+top/(100 * ((window.clientWidth-340) / 1920))+'rem';
					// this.allData.sources[index].option.textCont.topY = top+top/(100 * ((window.clientWidth-340) / 1920))*(100 * ((window.clientWidth-340) / 1920))
					left = e.clientX - self.disX;
					top = e.clientY - self.disY;

					odiv.style.left = left/base+ 'rem';
					odiv.style.top = top/base + 'rem';

					this.allData.sources[index].option.textCont.topY = parseFloat(top/base*100).toFixed(1);

					console.log(top)
					

					document.onmousemove = null;
					document.onmouseup = null;
					self.drag = false;

				};
			}
        },
        watch:{
			number:{
				handler:function(){
					this.number = store.state.pageNumber;
				},deep:true
			},
			fontWH(val){
				this.fontWH = val;
				console.log(fontWH);
			},

		},
        components: {},
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
             this.ulData = this.allData.sources;
            console.log(this.ulData)
        },
        props:['allData'],
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = '10.8rem';
            app.view.id = 'appCanvas';
            window.stage = app.stage;

            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                this.$nextTick(()=>{
                    window.question = res.question.data;
                    question = res.question.data;
                    allData = res.question.data;
                    self.statused = true;

                    let startComponent = new START(question.one.start, res);
                    stage.addChild(startComponent);
                    store.state.testNum = res.question.data.sources.length;
                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';
                    RenderAllData(true,this.allData);
                    resize();
                    function resize(){
                        let container = document.querySelectorAll('.container');
                        for (let index = 0; index < container.length; index++) {
                            container[index].style.width =(window.clientWidth - 340)/(100 * ((window.clientWidth-340) / 1920))+'rem';
                            container[index].style.height = ((window.clientWidth - 340)*(10.8/19.2))/(100 * ((window.clientWidth-340) / 1920))+'rem'
                        }
                    }
                });
            })
        }
    }
</script>
<style>

    ul,li{
		-webkit-padding-start: 0px;
		-webkit-margin-before: 0em;
		-webkit-margin-after: 0em;
	}
    .canvas {
        width: 19.2rem;
        height: 10.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -9.6rem;
        margin-top: -5.4rem;
    }

    .logo {
        position: absolute;
        z-index: 999;
        left: .5rem;
        bottom: .3rem;
        width: 1.9rem;
    }


    
 .option-list{
        display: none;
        position: absolute;
        left: 0rem;
      
        padding-top: 0px;
		padding-bottom:0px;
        margin: 0px;
        list-style: none;
        text-align: center;
    }
  
    .sen-list1{
        display: none;
        padding: 0px;
		
        margin: 0px;
 
        position: absolute;
        left: 0rem;
        top: 0rem;
        list-style:none;
        text-align: center;
		font-size: 0;
    }
    .senlistShow{display: block}
	.sen-list1 li{list-style: none;margin: 0px;padding: 0px;}
</style>