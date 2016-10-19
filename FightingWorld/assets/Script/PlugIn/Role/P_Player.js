cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this._init();
    },

    _init : function () {
        this._jobComp = this.getComponent('P_Swordsman');
        this._jobComp._objName = '玩家';
        this._jobComp.setObjectType(G_Type.Type_object.myHero);
    },

    startGame : function () {
        //reset data
        this._jobComp.whenStart();
        this._setHeroAttrs();
        this._doAfterAttrSet();
    },

    _doAfterAttrSet : function () {
        this._jobComp.setAniCallObj(this);
        this._jobComp.resetRole();
        this._jobComp.setRoleTypeComp(this);
    },

    _setHeroAttrs : function () {
        this._jobComp._atkRectW = this._jobComp.getAniWidth() * 0.7;
        this._jobComp._atkRectH = this._jobComp.getAniHeight() * 0.8;
        this._jobComp._comboCD = 2;
        this._jobComp._riseSpeedCD = 2;
        this._jobComp._ristSpeedValue = 2;
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
        var monsterComp = G_RoleContainer.getMonsterNode().getComponent('P_Swordsman');
        if(cc.rectIntersectsRect(this._jobComp.getAtkBox(), monsterComp.getBodyBox())){
            //攻击到了敌人
            this._jobComp.attackObj(monsterComp);
        }
    },

    walkCallBack : function (playerPos) {
        var isOK = G_RoleContainer.setViewpointCenter(playerPos);
        //if(!isOK) this._jobComp.forceStand();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
