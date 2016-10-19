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

        //console.log(this.node.width-cc.visibleRect.width)
        //console.log(this.node.height-cc.visibleRect.height)
        //this.node.x = -(this.node.width-cc.visibleRect.width);
        //this.node.y = -(this.node.height-cc.visibleRect.height);
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

    moveMap : function (offX, offY) {
        this.node.x += -offX;
        this.node.y += -offY;
        if(this.node.x > 0) {
            this.node.x = 0;
            return false;
        }
        if(this.node.y > 0) {
            this.node.y = 0;
            return false;
        }
        if(this.node.x < -(this.node.width-cc.visibleRect.width)) {
            this.node.x = -(this.node.width-cc.visibleRect.width);
            return false;
        }
        if(this.node.y < -(this.node.height-cc.visibleRect.height)) {
            this.node.y = -(this.node.height-cc.visibleRect.height);
            return false;
        }
        return true;
    },
    getMapW : function () {
        return this.node.width;
    },
    getMapH : function () {
        return this.node.height;
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
