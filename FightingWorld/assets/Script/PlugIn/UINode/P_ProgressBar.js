cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._init();
    },

    _init : function () {
        this._nodeBar = this.getComponent(cc.ProgressBar);
        this._reducePercent = 0.01;
        this._offsetNum = 0;
    },

    setData : function (maxValue) {
        this._maxValue = maxValue;
        this._curValue = this._maxValue;
        this._readyValue = 0;
        this._reduceValue = this._maxValue * this._reducePercent;

        this._nodeBar.progress = 1;
    },

    //分正负
    updateBar : function (value) {
        if(!this._maxValue) return;
        if(value > 0) {
            if(value <= (this._maxValue - this._curValue)) this._curValue += value;
            else{
                value = this._maxValue - this._curValue;
                this._curValue = this._maxValue;
            }
        } else {
            if(-value <= this._curValue) this._curValue += value;
            else{
                value = -this._curValue;
                this._curValue = 0;
            }
        }
        this._readyValue = Math.abs(value);
        this._offsetNum = value/this._readyValue;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this._readyValue > 0){
            this._nodeBar.progress += this._reducePercent * this._offsetNum;
            this._readyValue -= this._reduceValue;
            if(this._readyValue <= 0){
                if(this._curValue <= 0) this._nodeBar.progress = 0;
                else if(this._curValue >= this._maxValue) this._nodeBar.progress = 1;
            }
        }
    },
});
