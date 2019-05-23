<template>
    <div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option1')" ref="option1Title"></i>
            <span @click="tabShow(index,'option1')">
            句子配置
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option1">

            <div class="randow" style="margin-top:15px">
                <el-radio v-model="item.option.textCont.random" label="1">字块位置不随机</el-radio>
                <el-radio v-model="item.option.textCont.random" label="2">字块位置随机</el-radio>
            </div>

            <div class="sent-title" v-show="item.option.textCont.random == '1'"><span></span><b>出题顺序（输入空格句子断开,输入&&在字块里加空格）</b></div>

            <div class="edit-textarea sen-textarea" v-show="item.option.textCont.random == '1'">
                <textarea name="" id="" cols="30" rows="10" v-model="item.option.textCont.randomText"
                            placeholder="请输入文字">
                </textarea>
            </div>

            <div class="sent-title"><span></span><b>正确顺序（输入空格句子断开,输入&&在字块里加空格）</b></div>

            <div class="edit-textarea sen-textarea">
                <textarea name="" id="" cols="30" rows="10" v-model="item.option.textCont.text"
                            placeholder="请输入文字">
                </textarea>
            </div>


            <div style="width:100%;float:left;">
                <el-input style="width:50%;" placeholder="请输入内容" v-model="item.option.textCont.fontSize" size="mini" @input="setElementStatus2(index,'option','textCont','fontSize',$event)">
                    <template slot="prepend">字号 :</template>
                </el-input>
            </div>

            <div class="edit-select" style="width: 100%">
                <span style="width: 55px">字体 :</span>
                <el-select v-model="item.option.textCont.fontFamily" placeholder="请选择" size="mini" style="width: 60%">
                    <el-option
                        v-for="item in testData.fontFamily"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>


            <div class="edit-select">
                    <span>颜色：</span>
                    <el-color-picker v-model="item.option.textCont.color"></el-color-picker>
                </div>

                <div class="font-style">
                    <span :class="item.option.textCont.strong?'font-style-color':''"
                        @click="setGoldTextFontStyle('strong',index)">B
                    </span>
                    
                </div>
                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.option.textCont.topY" size="mini" @input.native="setElementStatus1(index,'option','textCont','topY',$event)">
                        <template slot="prepend">Y :</template>
                    </el-input>

                </div>


                <div class="sent-title"><span></span><b>底框属性:</b></div>
                <div class="edit-select">
                        <span>底框色：</span>
                        <el-color-picker v-model="item.option.textCont.bgColor"></el-color-picker>
                </div>
                <div class="edit-select">
                        <span>划过色：</span>
                        <el-color-picker v-model="item.option.textCont.bgColorHover"></el-color-picker>
                </div>
                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.option.textCont.cirle" size="mini" @input="setElementStatus2(index,'option','textCont','cirle',$event)">
                        <template slot="prepend">圆角 :</template>
                    </el-input>

                </div>
            

        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option2')" ref="option2Title"></i>
            <span @click="tabShow(index,'option2')">
            目标区域
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option2">
            <div class="sent-title"><span></span><b>区域图片:</b></div>

            <div class="upload">
                <div class="img-box">
                    <img :src="resourceData[item.option.targetArea.image.name]" alt="" width="131" height="96">
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改图片</span>
                        <input type="file" @change="uploadImage(index,'option','targetObj',$event)">
                    </div>
                </div>
            </div>
            <!-- <el-input placeholder="请输入内容" v-model="item.option.targetArea.image.x" size="mini" @input.native="setElementStatus(index,'option','targetArea','x',$event)">
                <template slot="prepend">X：</template>
            </el-input> -->
            <el-input placeholder="请输入内容" v-model="item.option.targetArea.image.x" size="mini" @input="setElemented(index,'targetObj','x',$event,item.option.targetArea.image.radio,'image')">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="item.option.targetArea.image.y" size="mini" @input="setElemented(index,'targetObj','y',$event,item.option.targetArea.image.radio,'image')">
                <template slot="prepend">Y：</template>
            </el-input>

            <div class="lockStatus">
                <el-input placeholder="请输入其宽度" v-model="item.option.targetArea.image.width" size="mini" @input="setElemented(index,'targetObj','width',$event,item.option.targetArea.image.ratio,'image')">
                    <template slot="prepend">W :</template>
                </el-input>
                <span class="lock_block" :lockRadio="item.option.targetArea.image.ratio"><img :src="item.option.targetArea.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(item.option.targetArea,$event)"></span>
                <el-input placeholder="请输入其高度" v-model="item.option.targetArea.image.height" size="mini" @input="setElemented(index,'targetObj','height',$event,item.option.targetArea.image.ratio,'image')">
                    <template slot="prepend">H :</template>
                </el-input>
            </div>

            <div style="clear:both;height:20px"></div>

        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option3')" ref="option3Title"></i>
            <span @click="tabShow(index,'option3')">
            句子入场效果
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option3">
            <div class="option-animate">
                <div class="option-animate-radio" style="margin-top:.3rem">
                    <el-radio v-model="gameData[index].optionAn" 
                    :label="item2.label" 
                    :key="item2.label" 
                    v-for="(item2,index2) in enterAnimate"
                    >{{item2.name}}</el-radio>
                </div>
            </div>
        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option4')" ref="option4Title"></i>
            <span @click="tabShow(index,'option4')">
            错误效果
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option4">
            <div class="option-animate">
                <div class="option-animate-radio" style="margin-top:.3rem">
                    <el-radio v-model="gameData[index].optionAn1" :label="item2.label" :key="item2.label" v-for="(item2,index2) in wrongAnimate">{{item2.name}}</el-radio>
                </div>
            </div>
        </div>

        <div class="game-title">
            <i :class="tabShowStatus[index].child.option5?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'option5')" ref="option5Title"></i>
            <span @click="tabShow(index,'option5')">
            音效
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus[index].child.option5">
            <div class="sent-title"><span></span><b>点击音效:</b></div>
            <div class="pointItem">
                <div class="upload">
                    <span class="file-title">音频文件：</span>
                    <div class="animate-box">
                        <span v-text="item.option.pickAudio.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio(index,'pickAudio',$event)">
                        </div>
                    </div>
                </div>
            </div>

            <div class="sent-title"><span></span><b>最终正确音效:</b></div>
            <div class="pointItem">
                <div class="upload">
                    <span class="file-title">音频文件：</span>
                    <div class="animate-box">
                        <span v-text="item.option.rightAudio.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio(index,'rightAudio',$event)">
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>
<script>
    import {CopyAndRender,DeleteEleByName,UploadAndRenderEle,RenderElementByIndex} from 'xes-tem-render'
    import {enterAnimate,rightAnimate,wrongAnimate,mouseEnterAnimate,outAnimate} from './libs/publicData'

    export default {
        name: "EditGamePrivate",
        data() {
            return {
                enterAnimate:enterAnimate,
                wrongAnimate:wrongAnimate,

                testData:{
                    switch:true,
                    animateName:'animateName',
                    audioName:'audioName',
                    spriteName:'spriteName',
                    input:111,
                    select:16,
                    checked:true,
                    fontFamily: [
                    {
                        label: '微软雅黑',
                        value: 'Microsoft YaHei'
                    },
                    {
                        label: '宋体',
                        value: 'SimSun'
                    },
                    {
                        label: '黑体',
                        value: 'SimHei'
                    },
                    {
                        label: '方正粗圆',
                        value: 'FZCuYuan-M03S'
                    },
                    {
                        label: '方正粗圆简',
                        value: 'FZZhunYuan-M02S'
                    }
                ],
                    fontSize: [
                        {
                            label: '16px',
                            value: 16
                        },
                        {
                            label: '18px',
                            value: 18
                        },
                        {
                            label: '20px',
                            value: 20
                        },
                        {
                            label: '22px',
                            value: 22
                        },
                        {
                            label: '24px',
                            value: 24
                        },
                        {
                            label: '26px',
                            value: 26
                        },
                        {
                            label: '30px',
                            value: 30
                        },
                        {
                            label: '40px',
                            value: 40
                        },
                        {
                            label: '50px',
                            value: 50
                        }
                    ]
                },
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                checkbox:false,
                radio:1,
                switchStatus:false,
                audio_name:'',
                image:{
                    "show": true,
                    "x": 0,
                    "y": 0,
                    "lock":false,
                    "width":0,
                    "height":0,
                    "name": "",
                    "ratio":0
                },
                sprite:{
                    "show": false,
                    "x": "500",
                    "y": "0",
                    "name": "",
                    "scale": "1",
                    "loop": false
                },
                animate:{
                    "show": false,
                    "x": "100",
                    "y": "100",
                    "name": "",
                    "scale": "3",
                    "loop": true
                }
            }
        },
        props: [
            "allData",
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        mounted() {
        },
        methods: {
            setGoldTextFontStyle(name, index) {
                this.gameData[index].option.textCont[name] = !this.gameData[index].option.textCont[name]
            },

            verifyNumber(number){
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number)
                };
                let reg = /^\d*\.+$/g;
                if(isNaN(number)){
                    number = 0;
                }
                if(parseFloat(number)>=0){
                    if(isFloat(parseFloat(number))){
                        number = parseFloat(number.split('.')[0]+'.'+number.split('.')[1].substr(0,1));
                    }else{
                        if(reg.test(number)){
                            number = parseFloat(number)+'.';
                        }else{
                            number = number?parseFloat(number):0;
                        }
                    }
                }else{
                    number = 0;
                }
                return number
            },
            setElemented(index,name,attr,e,ratio,type){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                
                let data = this.item.option.targetArea[type];

                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }
                    else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                          
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                data['height'] = (e/ratio).toFixed(0);
                                component['height'] = data['height']
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (e*ratio).toFixed(0);
                                component['width'] = data['width']
                            }
                        }
                    }
                }
            },

            setElementStatus2(index,name,type,attr,e){
                this.gameData[index][name][type][attr] = this.verifyNumber(this.gameData[index][name][type][attr]);
                // let reg = /[a-zA-Z]/g;
                // if(this.isFloat(e)){
                //     this.gameData[index][name][type][attr] = parseFloat(e).toFixed(1);
                // }
                // if(reg.test(e)){
                //     this.gameData[index][name][type][attr] = parseFloat(e.replace(/\s/g,"").replace(/[a-zA-Z]/g,"").toLowerCase()).toFixed(1);
                // }
            },
            setElementStatus1(index,name,type,attr,e){
                let component = document.getElementById('stemout'+index);
                let reg = /[a-z]/i;
                // console.log(reg.test(e.data),String(this.gameData[index][name][type][attr]).split('.'))
                console.log(e,this.gameData[index][name][type][attr])
                if(reg.test(e.data)){
                    this.gameData[index][name][type][attr] = this.gameData[index][name][type][attr] ? parseFloat(this.gameData[index][name][type][attr]).toFixed(1):'';
                }

                if(this.isFloat(this.gameData[index][name][type][attr])){

                    this.gameData[index][name][type][attr] = parseFloat((this.gameData[index][name][type][attr]).split('.')[0]+'.'+(this.gameData[index][name][type][attr]).split('.')[1].substr(0,1));
                    
                }
                
                if(this.gameData[index][name][type][attr] > 1080 || this.gameData[index][name][type][attr] <0){
                    console.log(parseFloat(component.style.top).toFixed(1)*10)
                    this.gameData[index][name][type][attr] = parseFloat(component.style.top).toFixed(1)*10;
                    // this.gameData[index][name][type][attr] = (parseFloat(component.style.top)*100).toFixed(1);
                    this.$message.error('输入数值超出范围 应为0-1080');
                    return
                }else{
                    component.style.top = this.gameData[index][name][type][attr]/100 + 'rem';

                }
                
            },
            setElementStatus(index,name,type,attr,e){
                let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
                let component = box.getChildByName('targetObj');
                console.log(attr === 'x',this.isFloat(this.gameData[index][name][type]['image'][attr]));
                let reg1 = /[a-z]/i;
                // console.log(reg.test(e.data),String(this.gameData[index][name][type][attr]).split('.'))
                console.log(this.gameData[index][name][type]['image'][attr])
                if(reg1.test(this.gameData[index][name][type]['image'][attr])){
                   this.gameData[index][name][type]['image'][attr] = this.gameData[index][name][type]['image'][attr]?parseFloat(this.gameData[index][name][type]['image'][attr]).toFixed(1):0;
                }
                if(attr === 'scale'){
                    if(this.isFloat(this.gameData[index][name][type]['image'][attr])){
                        this.gameData[index][name][type]['image'][attr] = parseFloat(this.gameData[index][name][type]['image'][attr]).toFixed(1);
                    }
                    component[attr].set(this.gameData[index][name][type]['image'][attr]);
                }else{
                    if(attr === 'x'){
                        if(this.gameData[index][name][type]['image'][attr] > 1920 || this.gameData[index][name][type]['image'][attr] <0){
                            this.gameData[index][name][type]['image'][attr] = component[attr]
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return
                        }
                    }
                    if(attr === 'y'){
                        if(this.gameData[index][name][type]['image'][attr] > 1080 || this.gameData[index][name][type]['image'][attr] <0){
                            this.gameData[index][name][type]['image'][attr] = component[attr]
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return
                        }
                    }
                    if(attr === 'width'){
                        if(this.gameData[index][name][type]['image'][attr] > 1920 || this.gameData[index][name][type]['image'][attr] <0){
                            this.gameData[index][name][type]['image'][attr] = component[attr]
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return
                        }else{
                            // this.gameData[index][name][type]['image'].height = parseFloat(this.gameData[index][name][type]['image'][attr]/this.gameData[index][name][type]['image'].radio).toFixed(1)
                            // component.width = parseFloat(this.gameData[index][name][type]['image'].width).toFixed(1);
                            // component.height = parseFloat(this.gameData[index][name][type]['image'].height).toFixed(1);
                            component.width = this.gameData[index][name][type]['image'].width==''?0:parseFloat(this.gameData[index][name][type]['image'].width).toFixed(1);                                

                            this.gameData[index][name][type]['image'].radio?component.height = (parseFloat(this.gameData[index][name][type]['image'].width)/this.gameData[index][name][type]['image'].radio).toFixed(1):"";
                            if(this.gameData[index][name][type]['image'][attr]){
                                this.gameData[index][name][type]['image'].radio?this.gameData[index][name][type]['image'].height = (parseFloat(this.gameData[index][name][type]['image'].width)/this.gameData[index][name][type]['image'].radio).toFixed(1):"";
                            }

                        }
                    }else if(attr === 'height'){
                        if(this.gameData[index][name][type]['image'][attr] > 1080 || this.gameData[index][name][type]['image'][attr] <0){
                            this.gameData[index][name][type]['image'][attr] = component[attr]
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return
                        }else{
                            // this.gameData[index][name][type]['image'].width = parseFloat(this.gameData[index][name][type]['image'][attr]*this.gameData[index][name][type]['image'].radio).toFixed(1);
                            // component.width = parseFloat(this.gameData[index][name][type]['image'].width).toFixed(1);
                            // component.height = parseFloat(this.gameData[index][name][type]['image'].height).toFixed(1);                                
                            component.height = this.gameData[index][name][type]['image'].height==''?0:parseFloat(this.gameData[index][name][type]['image'].height).toFixed(1);                                
                            this.gameData[index][name][type]['image'].radio?component.width = (parseFloat(this.gameData[index][name][type]['image'].height)*this.gameData[index][name][type]['image'].radio).toFixed(1):"";
                            if(this.gameData[index][name][type]['image'][attr]){
                                this.gameData[index][name][type]['image'].radio?this.gameData[index][name][type]['image'].width = (parseFloat(this.gameData[index][name][type]['image'].height)*this.gameData[index][name][type]['image'].radio).toFixed(1):"";
                            }
                        }
                    }
                    if(this.gameData[index][name][type]['image'].radio!=0&&(attr === 'width'||attr === 'height')){
                        
                        if(this.isFloat(this.gameData[index][name][type]['image'][attr])){
                            this.gameData[index][name][type]['image'][attr] = parseFloat(this.gameData[index][name][type]['image'][attr]).toFixed(1);
                        }

                        
                    }else{
                        if(this.isFloat(this.gameData[index][name][type]['image'][attr])){
                            this.gameData[index][name][type]['image'][attr] = parseFloat(this.gameData[index][name][type]['image'][attr].split('.')[0]+'.'+this.gameData[index][name][type]['image'][attr].split('.')[1].substr(0,1));
                        }
                        if((attr == 'x'||attr == 'y')&&this.gameData[index][name][type]['image'][attr]<0){
                            this.gameData[index][name][type]['image'][attr] = component[attr]
                        }
                        var reg = /^\d*\.+$/g;
                        if(this.gameData[index][name][type]['image'][attr]&&reg.test(this.gameData[index][name][type]['image'][attr])){
                            this.gameData[index][name][type]['image'][attr] = parseFloat(this.gameData[index][name][type]['image'][attr])+'.';
                        }else{
                            this.gameData[index][name][type]['image'][attr] = this.gameData[index][name][type]['image'][attr]?parseFloat(this.gameData[index][name][type]['image'][attr]):0;
                        }
                        component[attr] = parseInt(this.gameData[index][name][type]['image'][attr]);
                    }
                }
            },
            isFloat(n){
                return /^-?\d*\.\d+$/.test(n);
            },
            // setElementStatus(index,name,type,obj,e){
            //     let box =stage.getChildByName('GAME').getChildByName('GAME'+index).getChildByName('componentContainer');
            //     // console.log(index,name,type,obj,e);
            //     // console.log(box);
            //     let reg = /^\d*\.+$/g;
            //     if(box&&box.getChildByName(name)){
            //         switch (type) {
            //             case 'left':
            //                 if(parseFloat(e)<0||parseFloat(e)>1920){
            //                     this.gameData[index]['option']['targetArea']['image']['x'] = box.getChildByName(name).x;
            //                     this.$message({
            //                         type: 'error',
            //                         message: '输入数值超出范围，应为0-1920'
            //                     });
            //                     return
            //                 }else{
            //                     // console.log(parseFloat(e).toString().split(".")[1] == undefined)
            //                     if(parseFloat(e).toString().split(".")[1] == undefined){
            //                         box.getChildByName(name).x = e==''?0:parseFloat(e).toFixed(1);
            //                         return;
            //                     }else if(parseFloat(e).toString().split(".")[1].length>1){
            //                         this.gameData[index]['option']['targetArea']['image']['x'] = box.getChildByName(name).x;
            //                     }else{
            //                         box.getChildByName(name).x = e==''?0:parseFloat(e).toFixed(1);
            //                     }
            //                 }
            //                 break;
            //             case 'top':
            //                 if(parseFloat(e)<0||parseFloat(e)>1920){
            //                     this.gameData[index]['option']['targetArea']['image']['y'] = box.getChildByName(name).y;
            //                     this.$message({
            //                         type: 'error',
            //                         message: '输入数值超出范围，应为0-1920'
            //                     });
            //                     return
            //                 }else{
            //                     if(parseFloat(e).toString().split(".")[1] == undefined){
            //                         box.getChildByName(name).y = e==''?0:parseFloat(e).toFixed(1);
            //                         return;
            //                     }else if(parseFloat(e).toString().split(".")[1].length>1){

            //                         this.gameData[index]['option']['targetArea']['image']['y'] = box.getChildByName(name).y;
            //                     }else{

            //                         box.getChildByName(name).y = e==''?0:parseFloat(e).toFixed(1);
            //                     }
            //                 }
            //                 break;
            //             case 'width':
            //                 if(parseFloat(e).toFixed(1) > 1920 || parseFloat(e).toFixed(1) < 0){
            //                     this.gameData[index]['option']['targetArea']['image'][type] = box.getChildByName(name).width;
            //                     // console.log(this.gameData[index]['option']['targetArea']['image'][type])
            //                     this.$message.error('输入数值超出范围 应为0-1920');
            //                     return;
            //                 }else{
            //                     box.getChildByName(name).width = e==''?0:parseFloat(e).toFixed(1);                                
            //                     obj.image.radio?box.getChildByName(name).height = (parseFloat(e)/obj.image.radio).toFixed(1):"";
            //                     obj.image.radio?obj.image.height = (parseFloat(e)/obj.image.radio).toFixed(1):"";
            //                 }
                            
            //                 break;
            //             case 'height':
            //                 if(parseFloat(e).toFixed(1) > 1080 || parseFloat(e).toFixed(1) < 0){
            //                     this.gameData[index]['option']['targetArea']['image'][type] = box.getChildByName(name).width;
            //                     // console.log(this.gameData[index]['option']['targetArea']['image'][type])
            //                     this.$message.error('输入数值超出范围 应为0-1080');
            //                     return;
            //                 }else{
            //                     box.getChildByName(name).height = e==''?0:parseFloat(e);
            //                     obj.image.radio?box.getChildByName(name).width = (parseFloat(e)*obj.image.radio).toFixed(2):"";
            //                     obj.image.radio?obj.image.width = (parseFloat(e)*obj.image.radio).toFixed(2):"";
            //                 }
            //                 break;
            //             case 'scale':
            //                 let value = e==''?0:parseFloat(e);
            //                 box.getChildByName(name).scale.set(value)
            //                 break;
            //             default:
            //                 break;
            //         }
            //     }
            // },
            
           lockStatusData(item,e){
                //判断当前状态是否锁定
                if(item.image.name){
                    if(item.image.width&&item.image.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.image.ratio = 0;
                            item.image.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.image.lock = true;
                            item.image.ratio = parseFloat(item.image.width)/parseFloat(item.image.height);
                        }
                    }else{
                        this.$message.error('绑定对象的宽高都不可为空');
                        return
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '舞台未绑定元素!'
                    });
                }
            },

            setImageLock(){
                this.image.lock = !this.image.lock;
                if(!this.image.height||!this.image.width){
                    this.$message({
                        message: 'X或Y为0或为空 无法计算比例',
                        type: 'warning'
                    });
                    return;
                }
                if(this.image.lock){
                    this.image.ratio = this.image.width/this.image.height;
                }
            },
            setAttr(name,attr){
                if(this.image.ratio>0&&(attr === 'width'||attr === 'height')&&this.image.lock){
                    if(attr === 'width'){
                        console.log(this.image.width,this.image.ratio);
                        this.image.height = this.image.width/this.image.ratio;
                    }else if(attr === 'height'){
                        this.image.width = this.image.height*this.image.ratio;
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].child[name];
                if (nameTab) {
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                        this.tabShowStatus[index].child[item] = false
                    })
                    this.tabShowStatus[index].child[name] = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            verifyAnimationFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json", "atlas"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            verifySpriteFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            uploadImage(index,name,compontName, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0],
                        render:true
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.image.name = res.resourceName;
                    this.image.width = res.width;
                    this.image.height = res.height;

                    if(name === 'option'){
                        this.gameData[this.index].option.targetArea.image.name = res.resourceName;
                        this.gameData[this.index].option.targetArea.image.componentName = 'targetObj';
                        this.gameData[this.index].option.targetArea.image.width = res.width;
                        this.gameData[this.index].option.targetArea.image.height = res.height;
                        this.gameData[this.index].option.targetArea.image.x?"":this.gameData[this.index].option.targetArea.image.x = 0;
                        this.gameData[this.index].option.targetArea.image.y?"":this.gameData[this.index].option.targetArea.image.y = 0;
                        UploadAndRenderEle(this.index,'targetObj',res,this.allData);
                    }

                    this.updateResourceData();
                    e.target.value = '';
                })
            },
            uploadAnimation(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3){
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let type = 'Animate';
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.animate.name = res.resourceName;
                    e.target.value = '';
                })
            },
            uploadSprite(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifySpriteFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.sprite.name = res.resourceName;
                    e.target.value = '';
                })
            },

            uploadAudio(index, name,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                        console.log()
                        this.gameData[index]['option'][name]['name'] = res.resourceName;
                        // this.gameData[index]['subTitle'].audio = res.resourceName;
                        e.target.value = '';
                        
                    }
                )
            },
            // uploadAudio(name,e) {
            //     let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
            //     let extArr = ['mp3', 'wav'];
            //     if (extArr.indexOf(ext) === -1) {
            //         this.$message({
            //             message: '上传类型不符',
            //             type: 'error'
            //         });
            //         return;
            //     }
            //     if (e.target.files.length === 0) {
            //         this.$message({
            //             message: '上传文件个数不符合',
            //             type: 'warning',
            //         });
            //         return;
            //     }
            //     this.$http.post('/uploadingAudio',
            //         {audio: e.target.files[0]}, {
            //             headers: {'Content-Type': 'multipart/form-data'}
            //         }
            //     ).then((res) => {
            //         this.audio_name = res.resourceName;
            //         e.target.value = '';
            //     })
            // },
            updateResourceData() {
                this.$emit('updateResourceData')
            },
        }
    }
</script>
<style scoped lang="scss">
 .lockStatus{
        .el-input{
            width: 120px;
        }
        .lock_block{
            display: inline-block;
            width: 42px;
            height: 28px;
            float: left;
            margin-top: 19px;
            margin-left: 15px;

            img{
                cursor:pointer;
            }
        }
    }
.edit-select > span{padding: 0px}
.sen-textarea textarea{
    width:100%;
}
.sent-title{
    color: #fff;
    // border: 1px solid #fff;
    padding-top: 15px;
    padding-bottom: 15px;
    clear: both;
    vertical-align: middle;
    overflow: hidden;
}
.sent-title b{display: block;vertical-align: top;margin-left: 8px;font-weight: 100;display: block}
.sent-title span{
    width: 3px;
    height: 20px;
    background: #fff;
    display: block;
    position: absolute;
    
}
</style>