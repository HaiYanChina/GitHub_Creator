cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._initData();
    },

    _initData : function () {
        this._jobComp = this.getComponent('P_Swordsman');
        this._enemyNode = G_RoleContainer.getPlayerNode();
        this._atkRectW = this._jobComp.getAtkRectW();
        this._atkRectH = this._jobComp.getAtkRectH();
        this._isInView = false;

        this._updateTime = 0.2;
        this._time_reset = this._updateTime;
    },

    _doLogic : function () {
        if(this._getIsInAtkArea()){
            //可攻击
            this._jobComp._normalAtkNext();
        }else {
            this._doWalk();
        }
    },

    _doWalk : function () {
        var dir = gg.getPointDir(cc.pSub(this._enemyNode.getPosition(), this.node.getPosition()));
        switch (dir){
            case 1:
                dir = 2;
                break;
            case 3:
                dir = 2;
                break;
            case 5:
                dir = 6;
                break;
            case 7:
                dir = 6;
                break;
            default:
                break
        }
        this._jobComp.pressWalkTo(dir);
    },

    _getIsInAtkArea : function () {
        if(Math.abs(this._enemyNode.y - this.node.y) > this._jobComp.getAniHeight()*0.5) return false;
        if(Math.abs(this._enemyNode.x - this.node.x) > this._jobComp.getAniWidth()*0.5) return false;
        return true;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if(!G_Center.getIsGameRuning()) return;
         if(this._time_reset > 0){
             this._time_reset -= dt;
             if(this._time_reset <= 0){
                 this._time_reset = this._updateTime;

                 var objLength = gg.getPointsLength(this._enemyNode.getPosition(), this.node.getPosition());
                 if(objLength < this._jobComp.getViewLength()){
                     //监视对象出现在视野内
                     this._isInView = true;
                     //this._doLogic();
                 }else if(this._isInView) {
                     this._jobComp.forceStand();
                     this._isInView = false;
                 }
             }
         }
     },
});
