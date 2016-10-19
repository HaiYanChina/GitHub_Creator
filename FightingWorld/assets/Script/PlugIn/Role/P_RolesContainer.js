cc.Class({
    extends: cc.Component,

    properties: {
        p_leftCompetitor : cc.Node,
        p_monster : cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this._init();
        this._addListener();
        G_RoleContainer = this;
    },

    _init : function () {
        this._playerJobComp = this.p_leftCompetitor.getComponent('P_Swordsman');
        this._playerComp = this.p_leftCompetitor.getComponent('P_Player');
        this._monsterComp = this.p_monster.getComponent('P_Monster');

        this._mapMaxW = this.node.width - CG._W2;
        this._mapMaxH = this.node.height - CG._H2;
    },

    startGame : function () {
        this._playerComp.startGame();
        this._monsterComp.startGame();
    },

    _addListener : function () {
        var listener = {
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function (keyCode, event) {
                if(!G_Center.getIsGameRuning()) return;
                var keyIndex = G_Type.Type_keyIndex[keyCode];
                if(keyIndex) this._playerJobComp.pressWalkTo(keyIndex);
                else this.pressSkill(keyCode);
            }.bind(this),
            onKeyReleased: function (keyCode, event) {
                if(!G_Center.getIsGameRuning()) return;
                var keyIndex = G_Type.Type_keyIndex[keyCode];
                if(keyIndex) this._playerJobComp.walkPressUp(keyIndex);
            }.bind(this)
        }
        // 绑定键盘事件
        cc.eventManager.addListener(listener, this.node);
    },

    pressSkill : function (keyIndex) {
        var skillIndex;
        switch (keyIndex){
            case 74:
                skillIndex = 1;
                break;
            case 75:
                skillIndex = 2;
                break;
            case 76:
                skillIndex = 3;
                break;
            case 85:
                skillIndex = 4;
                break;
            default:
                return;
        }

        this._playerJobComp.pressSkill(keyIndex);
    },

    skillOutCD : function (skillIndex) {
        this._playerJobComp.skillOutCD(skillIndex);
    },
    // move map's pos, set player in center;
    setViewpointCenter : function(viewPoint) {
        var curX = Math.max(viewPoint.x, CG._W2);
        var curY = Math.max(viewPoint.y, CG._H2);
        //使得地图坐标保持在屏幕内
        curX = Math.min(curX, this._mapMaxW);
        curY = Math.min(curY, this._mapMaxH);

        viewPoint = cc.pSub(cc.p(CG._W2, CG._H2), cc.p(curX, curY));
        this.node.setPosition(viewPoint);
    },

    getMapW : function () {
        return this.node.width;
    },
    getMapH : function () {
        return this.node.height;
    },
    getZIndex : function (posY) {
        return Math.floor((this.node.height - posY) / Config_Common.updateZIndexNum);
    },
    getPlayerNode : function () {
        return this.p_leftCompetitor;
    },
    getMonsterNode : function () {
        return this.p_monster;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
