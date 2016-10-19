cc.Class({
    extends: cc.Component,
    _skillCD : null,
    _isInCD : null,
    _skillIndex : null,
    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._init();
        this._addListener();
    },

    _init : function () {
        this._nodeBar = this.node.getComponent(cc.ProgressBar);
        this._nodeBar.progress = 1;
        this._isInCD = false;
    },

    _addListener : function () {
        this.node.on('mouseup', function (event) {
            var node = event.currentTarget;
            if(!this._isInCD) this.inCD();
        }.bind(this));
    },

    setSkillData : function () {
        this._isInCD = false;
        this._skillCD = 3;
    },

    inCD : function (index) {
        if(this._isInCD) return;

        this.setSkillData();
        this._skillIndex = index;
        this._nodeBar.progress = 1;
        this._isInCD = true;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        if(this._isInCD && this._nodeBar.progress > 0){
            this._nodeBar.progress -= dt/this._skillCD * 1;
            if(this._nodeBar.progress <= 0){
                this._nodeBar.progress = 0;
                this._isInCD = false;
                //skill out cd
                G_Center.skillOutCD(this._skillIndex);
            }
        }
     },
});
