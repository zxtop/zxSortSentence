class DragElement {
    constructor(element,callback){
        this.element = element;
        this.canMove = false;
        this.Drag(callback)
    }

    Drag(callback){
        let _that = this;
        _that.element.interactive = true;
        _that.element.cursor = 'pointer';
        _that.element.on('pointerdown',dragElementStart)
        _that.element.on('pointermove',dragElementMove)
        _that.element.on('pointerup',dragElementEnd)

        function dragElementStart(e){
            let startPos = e.data.getLocalPosition(stage);
            _that.element.offsetPosX = _that.element.x - startPos.x;
            _that.element.offsetPosY = _that.element.y - startPos.y;
            _that.canMove = true;
        }
        
        function dragElementMove(e){
            let movePos = e.data.getLocalPosition(stage);
            if(_that.canMove&&_that.element){
                if(movePos.x>10&&movePos.x<1910&&movePos.y>10&&movePos.y<1070){
                    _that.element.x = movePos.x + _that.element.offsetPosX;
                    _that.element.y = movePos.y + _that.element.offsetPosY;
                }
            }
        }
        
        function dragElementEnd(e){
            _that.canMove = false;
            _that.element.offsetPosX = null;
            _that.element.offsetPosY = null;
            
            callback(_that.element.x,_that.element.y);
        }

    }
}
export default DragElement