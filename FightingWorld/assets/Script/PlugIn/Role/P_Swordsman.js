cc.Class({
    extends: require('M_Role'),
    _offX : null,
    _offY : null,
    properties: {

    },

    // use this for initialization
    onLoad: function () {
        this._init();
        this._super();

    },

    _init : function () {
        this._aniNode = this.node.getChildByName('animationObject');
        this._ani = this._aniNode.getComponent(cc.Animation);
        this._ani.on('finished',this.ani_finished_CallBack, this);
        this._dict_Touch = {};

        this._dict_Touch[G_Type.Type_dir.up] = false;
        this._dict_Touch[G_Type.Type_dir.right] = false;
        this._dict_Touch[G_Type.Type_dir.down] = false;
        this._dict_Touch[G_Type.Type_dir.left] = false;
        this._offX = 0;
        this._offY = 0;
        this._skillState = {1:false, 2:false, 3:false, 4:false,};
        this._curNormalAtkIndex = 0;
        //start animation
        this._act_stand();
        this._resetAniDir(G_Type.Type_dir.right);

        this.node.getComponentInChildren('P_HeroDebugBox').setDebugBox(this.getAniWidth(), this.getAniHeight());
    },

    setAniCallObj : function (object) {
        this._aniNode.getComponent('P_AniEvent').setParentComp(object);
    },

    resetRole : function () {
        this._curHP = this._attr_HP;
        this._aniState = G_Type.Type_aniState.stand;
        this._act_stand();
        this._bloodBarComp.setData(this._curHP);
    },

    ani_finished_CallBack : function (event) {
        if(event.type != "finished") return;
        var aniName = event.detail._name;

        var atkName = aniName.substring(0, 10);
        if(atkName == this.p_aniName_atk){
            //攻击结束
            for(var key in this._list_Normal_atk){
                if(this.p_aniName_atk+'0'+this._list_Normal_atk[key] == aniName){
                    this._clearNormalAtkCD(this._list_Normal_atk[key]);
                    break;
                }
            }
            this._act_stand();
        }

        if(aniName == this.p_aniName_hurt){
            //受伤
            this._act_stand();
        }

        if(aniName == this.p_aniName_die){
            //死亡
        }
    },

    _act_stand : function () {
        if(this._getAniStateLimit(G_Type.Type_aniState.stand)) return;
        this._super();
        this._ani.play(this.p_aniName_stand);
    },

    _act_atk : function (skillIndex) {
        if(this._skillState[skillIndex]) return;
        if(this._getAniStateLimit(G_Type.Type_aniState.atk)) return;

        this._super(skillIndex);
        this._skillState[skillIndex] = true;
        if(skillIndex) this._ani.play(this.p_aniName_atk + '0'+skillIndex);
        //this._ani.playAdditive(this.p_aniName_weapon);
    },

    _act_walk : function () {
        if(this._getAniStateLimit(G_Type.Type_aniState.walk)) return;
        this._super();
        this._ani.play(this.p_aniName_walk);
    },

    _act_hurt : function () {
        if(this._getAniStateLimit(G_Type.Type_aniState.hurt)) return;
        this._super();
        this._ani.play(this.p_aniName_hurt);
    },

    _act_die : function () {
        if(this._getAniStateLimit(G_Type.Type_aniState.death)) return;
        this._super();
        this._ani.play(this.p_aniName_die);
    },

    _getAniStateLimit : function (toAniState) {
        switch (toAniState){
            case G_Type.Type_aniState.atk:
                if(this._aniState == G_Type.Type_aniState.atk) return true;
                if(this._aniState == G_Type.Type_aniState.hurt || this._aniState == G_Type.Type_aniState.death) return true;
                break;
            case G_Type.Type_aniState.stand:
                if(this._aniState == G_Type.Type_aniState.death) return true;
                break;
            case G_Type.Type_aniState.walk:
                if(this._aniState == G_Type.Type_aniState.hurt || this._aniState == G_Type.Type_aniState.death) return true;
                break;
            case G_Type.Type_aniState.hurt:
                if(this._aniState == G_Type.Type_aniState.death) return true;
                break;
            case G_Type.Type_aniState.death:
                if(this._aniState == G_Type.Type_aniState.death) return true;
                break;
            default:
                break;
        }
        return false;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         this._super(dt);
     },
});
