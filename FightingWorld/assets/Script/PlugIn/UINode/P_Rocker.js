cc.Class({
    extends: cc.Component,
    _radius : null,
    properties: {
        p_movePoint : cc.Node
    },

    // use this for initialization
    onLoad: function () {
        this._whenInit();
    },

    _whenInit : function () {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchDown.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchUp.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel.bind(this));
    },

    _startRocker : function () {
        this._radius = this.p_movePoint.width/2;
    },

    _onTouchDown : function (event) {
        console.log('_onTouchDown------------------------');

        if(!this._radius) this._startRocker();
        this.node.convertToNodeSpace(event.getLocation())
        this.p_movePoint.setPosition(cc.pSub(event.getLocation(), this.node.getPosition()));
    },
    _onTouchMove : function (event) {
        console.log('_onTouchMove==========================');
        var curPos = cc.pSub(event.getLocation(), this.node.getPosition());
        var angle = this._getAngle(curPos);
        var radians = this._getRadians(curPos, angle);

        //更新摇杆
        var len = this._getLength(curPos);
        if(len > this._radius){
            var x = Math.cos(radians) * this._radius;
            var y = Math.sin(radians) * this._radius;
            this.p_movePoint.setPosition(cc.p(x, y));
        }else this.p_movePoint.setPosition(curPos);
        //更新方向
        this.setDirection(angle, radians, curPos);
    },
    _onTouchUp : function (event) {
        console.log('_onTouchUp------------------------');
        this._resetMovePoint();
    },
    _onTouchCancel : function (event) {
        console.log('_onTouchCancel------------------------');
        //this._resetMovePoint();
    },

    // 角度更新,偏移点更新
    setDirection : function(angle, radians, position){
        var dir, offsetPos = cc.p(0, 0);
        if(angle > -22.5 && angle < 22.5){
            dir = G_Type.Type_dir.right;
            offsetPos.x += this.speed ;
        }
        else if(angle > 22.5 && angle < 67.5){
            dir = G_Type.Type_dir.right_up;
            offsetPos.x += this.speed * Math.cos(radians);
            offsetPos.y += this.speed * Math.sin(radians);
        }
        else if(angle > 67.5 && angle < 112.5){
            dir = G_Type.Type_dir.up;
            offsetPos.y += this.speed ;
        }
        else if(angle > 112.5 && angle < 157.5){
            dir = G_Type.Type_dir.left_up;
            offsetPos.x += this.speed * Math.cos(radians);
            offsetPos.y += this.speed * Math.sin(radians);
        }
        else if((angle > 157.5 && angle < 180)||(angle < -157.5 && angle > -180)){
            dir = G_Type.Type_dir.left;
            offsetPos.x -= this.speed ;
        }
        else if(angle < -112.5 && angle > -157.5){
            dir = G_Type.Type_dir.left_down;
            offsetPos.x += this.speed * Math.cos(radians);
            offsetPos.y += this.speed * Math.sin(radians);
        }
        else if(angle < -67.5 && angle > -112.5){
            dir = G_Type.Type_dir.down;
            offsetPos.y -= this.speed ;
        }
        else if(angle < -22.5 && angle > -67.5){
            dir = G_Type.Type_dir.right_down;
            offsetPos.x += this.speed * Math.cos(radians);
            offsetPos.y += this.speed * Math.sin(radians);
        }
    },
    _resetMovePoint : function () {
        this.p_movePoint.setPosition(cc.p(0,0));
    },

    // 获得角度
    _getAngle : function(pos){
        return (Math.atan2(pos.y, pos.x) * 57.29577951);
    },
    // 获得弧度
    _getRadians : function(pos, angle){
        return (Math.PI / 180 * angle);   // 角度转弧度
    },
    // 获取长度
    _getLength : function(pos){
        return Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
