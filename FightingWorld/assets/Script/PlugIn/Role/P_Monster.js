cc.Class({
    extends: cc.Component,
    _offX : null,
    _offY : null,
    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._init();
    },

    _init : function () {
        this._jobComp = this.getComponent('P_Swordsman');
        this._jobComp._objName = '怪物';
        this._jobComp.setObjectType(G_Type.Type_object.npc);
    },

    startGame : function () {
        //reset data
        this._jobComp.whenStart();
        this._setHeroAttrs();
        this._doAfterAttrSet();
    },

    _doAfterAttrSet : function () {
        this._jobComp.setRiseLimit(true);
        this._jobComp.setAniCallObj(this);
        this._jobComp.resetRole();
        this._jobComp.setRoleTypeComp(this);
    },

    _setHeroAttrs : function () {
        this._jobComp._atkRectW = this._jobComp.getAniWidth() * 0.7;
        this._jobComp._atkRectH = this._jobComp.getAniHeight() * 0.8;
        this._jobComp._comboCD = 2;
        this._jobComp._riseSpeedCD = 2;
        this._jobComp._ristSpeedValue = 1;
        //普通攻击连击的三个技能
        this._jobComp._list_Normal_atk = [1,2,3];
        //属性  暴击闪避几率是按照千分之几来算
        this._jobComp._attr_atk = 3;
        this._jobComp._attr_HP = 30;
        this._jobComp._attr_dodge = 500;
        this._jobComp._attr_crit = 200;
        this._jobComp._attr_critAdd = 2.0;
        this._jobComp._viewLength = 200;
    },

    //攻击效果监测
    atkChecking : function () {
        var enemyComp = G_RoleContainer.getPlayerNode().getComponent('P_Swordsman');
        if(cc.rectIntersectsRect(this._jobComp.getAtkBox(), enemyComp.getBodyBox())){
            //攻击到了敌人
            this._jobComp.attackObj(enemyComp);
        }
    },

    walkCallBack : function () {

    },

    // called every frame, uncomment this function to activate update callback
    //update: function (dt) {
    //    this._super(dt);
    //},
});
