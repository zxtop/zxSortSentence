<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo" id="logo"/>
        <ul id="optionList" class="option-list" ref="optionList">
        </ul>

        <ul id="senList" class="sen-list" ref="senList">
       
        </ul>
    </div>
</template>

<script>
    import {Application, Container, Graphics, Sprite,Texture, ParticleContainer} from 'pixi.js';
    import {RenderAllData} from 'xes-tem-render'

    import {getAnimation, load, reateSprite} from '../loader';

    import START from "xes-preview-start";
    import STEMTITLE from 'xes-preview-subtitle';
    import GAME from "xes-preview-game";
    import AnimateClass from 'xes-animate'
    import {AnswerInfo,Loading,Question,postAnswer} from 'xes-answer';
    import {Sort} from './sort.js';
	// import rem_a from './rem_a.js'
	
    let question;
    let allData;
    export default {
        name: "start",
        data() {
            return {
                number: 0,
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
        },
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            window.app = this.createApp();
            console.log(window.clientWidth)

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
                    store.state.testNum = res.question.data.sources.length;

                    allData = res.question.data;
               
                    console.log(this.allData)

                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';

					

                    if(this.$route.query.id==='undefined'||this.$route.query.id===undefined){
						this.number = 0;
						store.state.pageNumber = this.number;
                    }else{
						this.number = parseInt(this.$route.query.id);
						store.state.pageNumber = this.number;
						
                    }
					// console.log("耶耶耶耶耶",this.number)
                    // let game = new GAME(question.sources[store.state.pageNumber].bgImage, question.sources[this.number].stemImg, res);
                    // let stemTitle = new STEMTITLE(question.sources[store.state.pageNumber].subTitle, res);
                    let start = new START(question.one.start, res);
                    RenderAllData(false,question);
                    // game.addChild(stemTitle);

                    let objSort = new Sort(self);

                    //loading接口
                    Loading();

					
                    //初始化每题的答题数据
                    let answer = new AnswerInfo();
                    answer.answerDefault({type:0,useranswer:[]});
                    Question({id:'0',currentTotalOption:'1'})

                    if (!window.question.one.start.show) {
                        // stage.addChild(game);
                        // stage.setChildIndex(game,0);
                        objSort.exec();

                    } else {
                        if(this.$route.query.startStatus === 'true'||this.$route.query.startStatus === 'undefined'||this.$route.query.startStatus === undefined){
                            stage.addChild(start);
                            start.button(() => {
								stage.removeChild(start);
								stage.getChildByName('gameBgSound')?stage.setChildIndex(stage.getChildByName('gameBgSound'),stage.children.length-1):"";

                                // stage.addChild(game);
                                // stage.setChildIndex(game,0);
                                objSort.exec();

                            });
                        }else{
                            // stage.addChild(game);
                            // stage.setChildIndex(game,0);
                            objSort.exec();

                        }
                    }
                });
			})
			

			
        }
    }
</script>
<style>
html,body{-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}
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
    canvas{

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
        /* top: 7.1rem; */
        /* width: 17.2rem; */
		/* padding-left: 1rem;
		padding-right: 1rem; */
		width: 100%;
        padding-top: 0px;
		padding-bottom:0px;
        margin: 0px;
        list-style: none;
        text-align: center;
		font-size: 0
    }
  
    .sen-list{
        display: block;
        padding: 0px;
		padding-left: .25rem;
		padding-right: .25rem;
		margin:0px;
        margin-top: .5rem;
        /* border: 1px solid red; */
        position: absolute;
        left: 0rem;
        top: 0rem;
        list-style:none;
        text-align: left;
		line-height: 0.03rem;
		/* border: none */
    }
    

.item-word{display:inline-block;
padding:0 .1rem;

transform:scale3d(0,0,0);
letter-spacing:.01rem
}
.ok{transform:scaleX(1)}
.oked{transform: scale3d(0,0,0)!important}
/* .item-word{cursor:pointer;transition:transform .1s ease-in-out,background-color .1s ease-in-out} */
.item-word{cursor:pointer;}




.shake{animation:shakeUp .3s both ease-in}
@keyframes shakeUp{0%{transform:translateX(10px)}
10%{transform:translateX(0)}
20%{transform:translateX(-10px)}
40%{transform:translateX(10px)}
60%{transform:translateX(-10px)}
80%{transform:translateX(10px)}
to{transform:translateX(0)}}

.down{animation:downUp .3s both ease-in}
@keyframes downUp{0%{transform:translateY(10px)}
10%{transform:translateY(0)}
20%{transform:translateY(-10px)}
40%{transform:translateY(10px)}
60%{transform:translateY(-10px)}
80%{transform:translateY(10px)}
to{transform:translateY(0)}}

/*从下向上动画*/
	.answerShowDown{
		animation: bounceInDown 1s both ease-in;
		-webkit-animation: bounceInDown 1s both ease-in;
		-moz-animation: bounceInDown 1s both ease-in;
	}
	/*从小变大动画*/
	.answerShowZoom{
		-webkit-animation: zoomIn .7s both ease-in;
		animation: zoomIn .7s both  ease-in;
		-moz--animation:zoomIn .7s both  ease-in;
	}
	/*从上向下动画*/
	.answerShowUp{
		animation: bounceInUp 1.2s both ease-in;
		-webkit-animation: bounceInUp 1.2s both ease-in;
		-moz-animation: bounceInUp 1.2s both ease-in;
	}
	/*渐隐渐现*/
	.answerShowhide{
		animation: fadeIn .5s both ease-in;
		-webkit-animation: fadeIn .5s both ease-in;
		-moz-animation:fadeIn .5s both ease-in;
		-o-animation:fadeIn .5s both ease-in;
	}
  @keyframes bounceInDown {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0,500px,0);
			transform: translate3d(0,500px,0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0,-25px,0);
			transform: translate3d(0,-25px,0)
		}

		75% {
			opacity: 1;
			-webkit-transform: translate3d(0,10px,0);
			transform: translate3d(0,10px,0)
		}

		90% {
			opacity: 1;
			-webkit-transform: translate3d(0,-5px,0);
			transform: translate3d(0,-5px,0)
		}

		100% {
			opacity: 1;
			-webkit-transform: none;
			transform: none
		}
	}
	@-webkit-keyframes bounceInDown {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}

		0% {
			opacity: 0;
			-webkit-transform: translate3d(0,500px,0);
			transform: translate3d(0,500px,0)
		}

		60% {
			opacity: 1;
			-webkit-transform: translate3d(0,-25px,0);
			transform: translate3d(0,-25px,0)
		}

		75% {
			opacity: 1;
			-webkit-transform: translate3d(0,10px,0);
			transform: translate3d(0,10px,0)
		}

		90% {
			opacity: 1;
			-webkit-transform: translate3d(0,-5px,0);
			transform: translate3d(0,-5px,0)
		}

		100% {
			opacity: 1;
			-webkit-transform: none;
			transform: none
		}
	}
	@-webkit-keyframes bounceInUp {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}
		0% {
			opacity: 0;
			transform: translate3d(0,-500px,0);
			-webkit-transform: translate3d(0,-500px,0);
			-moz-transform: translate3d(0,-500px,0);
		}
		60% {
			opacity: 0.5;
			transform: translate3d(0,10px,0);
			-webkit-transform: translate3d(0,10px,0);
			-moz-transform: translate3d(0,10px,0);
		}
		75% {
			opacity: 1;
			transform: translate3d(0,-5px,0);
			-webkit-transform: translate3d(0,-5px,0);
			-moz-transform: translate3d(0,-5px,0);
		}
		90% {
			opacity: 1;
			transform: translate3d(0,5px,0);
			-webkit-transform: translate3d(0,5px,0);
			-moz-transform: translate3d(0,5px,0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0,0px,0);
			-webkit-transform: translate3d(0,0px,0);
			-moz-transform: translate3d(0,0px,0);
		}
	}
	@keyframes bounceInUp {
		0%,60%,75%,90%,100% {
			animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-webkit-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-moz-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
			-o-animation-timing-function: cubic-bezier(0.215,.61,.355,1);
		}
		0% {
			opacity: 0;
			transform: translate3d(0,-500px,0);
			-webkit-transform: translate3d(0,-500px,0);
			-moz-transform: translate3d(0,-500px,0);
		}
		60% {
			opacity: 0.5;
			transform: translate3d(0,10px,0);
			-webkit-transform: translate3d(0,10px,0);
			-moz-transform: translate3d(0,10px,0);
		}
		75% {
			opacity: 1;
			transform: translate3d(0,-5px,0);
			-webkit-transform: translate3d(0,-5px,0);
			-moz-transform: translate3d(0,-5px,0);
		}
		90% {
			opacity: 1;
			transform: translate3d(0,5px,0);
			-webkit-transform: translate3d(0,5px,0);
			-moz-transform: translate3d(0,5px,0);
		}

		100% {
			opacity: 1;
			transform: translate3d(0,0px,0);
			-webkit-transform: translate3d(0,0px,0);
			-moz-transform: translate3d(0,0px,0);
		}
	}
  @-webkit-keyframes zoomIn{

		0%{
			opacity: 0;
			transform:scale(0.2);
		}
		50%{
			transform:scale(1.1)
		}
		100%{
			opacity: 1;
			transform:scale(1)
		}
	}
	@keyframes zoomIn{
		0%{
			opacity: 0;
			transform:scale(0.2);
		}

		50%{
			transform:scale(1.1)
		}
		100%{
			opacity: 1;
			transform:scale(1);
		}
	}
	@keyframes fadeIn {
		0% {opacity: 0.25;}
		40% {opacity: 0.5;}
		100% {opacity: 1;}
	}
	@-webkit-keyframes fadeIn {
		0% {opacity: 0.25;}
		40% {opacity: 0.5;}
		100% {opacity: 1;}
	}



</style>