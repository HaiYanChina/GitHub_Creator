cc.Class({
    extends: cc.Component,
    _gameState : null,
    properties: {
        p_roleContainer : cc.Node,
        p_skillIcon01 : cc.Node,
        p_skillIcon02 : cc.Node,
        p_skillIcon03 : cc.Node,
        p_skillIcon04 : cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        G_Center = this;

        this._init();
    },

    _init : function () {
        this._roleContainerComp = this.p_roleContainer.getComponent('P_RolesContainer');
        this._gameState = G_Type.Type_gameState.gameEnd;
    },

    startGame : function () {
        this._gameState = G_Type.Type_gameState.gameRuning;
        this._roleContainerComp.startGame();
    },

    pauseGame : function () {
        this._gameState = G_Type.Type_gameState.gamePause;
    },

    getIsGameRuning : function () {
        if(this._gameState == G_Type.Type_gameState.gameRuning) return true;
        return false;
    },

    skillInCD : function (skillIndex) {
        switch (skillIndex){
            //case 1:
            //    this.p_skillIcon01.getComponent('P_SkillBar').inCD(skillIndex);
            //    break;
            //case 2:
            //    this.p_skillIcon02.getComponent('P_SkillBar').inCD(skillIndex);
            //    break;
            //case 3:
            //    this.p_skillIcon03.getComponent('P_SkillBar').inCD(skillIndex);
            //    break;
            case 4:
                this.p_skillIcon01.getComponent('P_SkillBar').inCD(skillIndex);
                break;
            case 5:
                this.p_skillIcon04.getComponent('P_SkillBar').inCD(skillIndex);
                break;
            default:
                return;
        }
    },

    skillOutCD : function (skillIndex) {
        this._roleContainerComp.skillOutCD(skillIndex);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
