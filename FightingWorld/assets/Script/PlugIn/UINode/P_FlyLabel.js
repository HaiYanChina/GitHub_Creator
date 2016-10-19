cc.Class({
    extends: cc.Component,
    _isUsed : null,
    properties: {

    },

    // use this for initialization
    onLoad: function () {

    },

    setParentInfo : function (parentComp) {
        this._isUsed = false;
        this._parentNodeH = parentComp.getAniHeight();
        this._hp_flyTime = 1.0;
        this._firstX = 0;
        this._firstY = this._parentNodeH*0.5;
    },

    //是否正在使用中
    getIsUsing : function () {
        return this._isUsed;
    },

    //显示血量
    flyHP : function (hpValue, isCrit) {
        this.node.x = this._firstX;
        this.node.y = this._firstY;

        var labComp = this.getComponent(cc.Label);
        labComp.fontSize = 11;
        if(hpValue > 0){
            this.node.color = cc.Color.GREEN;
            labComp.string = '+'+hpValue;
        }else if(hpValue < 0){
            this.node.color = cc.Color.RED;
            if(isCrit) {
                labComp.fontSize = 25;
                labComp.string = "暴击"+hpValue;
            } else labComp.string = hpValue;
        }
        this._isUsed = true;
        var moveAction = cc.moveTo(this._hp_flyTime, this.node.x, this.node.y+this._parentNodeH);
        this.node.runAction(cc.sequence(moveAction, cc.callFunc(this.flyEnd, this)));
    },

    //显示闪避
    flyDodge : function () {
        this.node.x = this._firstX;
        this.node.y = this._firstY;

        var labComp = this.getComponent(cc.Label);
        this.node.color = cc.Color.GREEN;
        labComp.string = "闪避--";
        labComp.fontSize = 18;
        this._isUsed = true;
        var moveAction = cc.moveTo(this._hp_flyTime, this.node.x, this.node.y+this._parentNodeH);
        this.node.runAction(cc.sequence(moveAction, cc.callFunc(this.flyEnd, this)))
    },

    flyEnd : function () {
        this.getComponent(cc.Label).string = "";
        this._isUsed = false;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
