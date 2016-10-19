cc.Class({
    extends: cc.Component,
    _objName : null,
    _dir : null,
    _aniState : null,
    _skillState : null,
    _comboCD : null,
    _riseSpeedCD : null,
    _ristSpeedValue : null,
    _list_Normal_atk : null,
    _curNormalAtkIndex : null,
    _bloodBarComp : null,
    _objectType : null,
    _roleTypeComp : null,
    _aniStateComp_walk : null,
    _aniNode : null,
    _riseLimit : null,
    _flyLabNum : null,
    _atkRectW : null,
    _atkRectH : null,
    _curSpeed : null,
    _attr_atk : null,
    _attr_HP : null,
    _attr_dodge : null,
    _attr_crit : null,
    _attr_critAdd : null,
    _curHP : null,
    _viewLength : null,
    properties: {
        p_buttonWalkSpeed : 1,
        p_rockWalkSpeed : 1,
        p_aniName_stand : "role01_idle",
        p_aniName_atk : "role01_atk",
        p_aniName_walk : "role01_walk",
        p_aniName_hurt : "role01_hurt",
        p_aniName_die : "role01_death",
        p_bloodBar : cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this._bodyW2 = this.getAniWidth()/2;
        this._bodyH2 = this.getAniHeight()/2;
        this._curSpeed = this.p_buttonWalkSpeed;
        //this._offCenter = Math.sqrt(this._curSpeed/2);
        this._resetSpeed(0);
        this._dt_combo = 0;
        this._lab_BaseTag = 11;
        this._flyLabNum = 0;
        this._riseLimit = false;
        this._riseAct = null;
        this._bloodBarComp = this.p_bloodBar.getComponent('P_ProgressBar');
    },

    whenStart : function () {
        this.resetZOrder();
    },

    _act_stand : function () {
        this._clearWalkState();
        this._aniState = G_Type.Type_aniState.stand;
    },

    _act_atk : function (skillIndex) {
        this._aniState = G_Type.Type_aniState.atk;
        G_Center.skillInCD(skillIndex);
        this._clearWalkState();
    },

    _act_walk : function () {
        this._clearNormalAtkCD();
        this._aniState = G_Type.Type_aniState.walk;
    },

    _act_hurt : function () {
        this._clearNormalAtkCD();
        this._clearWalkState();
        this._aniState = G_Type.Type_aniState.hurt;
    },

    _act_die : function () {
        this._clearNormalAtkCD();
        this._clearWalkState();
        this._aniState = G_Type.Type_aniState.death;
        G_Center.pauseGame();
    },

    //========================beHurt===0

    beHurt : function (atkValue, isCrit) {
        if(this.getIsDodge()){
            this.getIdleLabComp().flyDodge();
        }else {
            this.getIdleLabComp().flyHP(atkValue*-1, isCrit);
            this._bloodBarComp.updateBar(atkValue*-1);
            this.reduceHP(atkValue);
        }
    },

    reduceHP : function (reduceValue) {
        this._curHP -= reduceValue;
        if(this._curHP <= 0){
            this._curHP = 0;
            this._act_die();
        }else{
            this._act_hurt();
        }
    },

    getIsDodge : function () {
        if(this.getOdds() <= this._attr_dodge) return true;
        return false;
    },

    //========================attack===0

    attackObj : function (objComp) {
        var isCrit = this.getIsCrit();
        var atkValue;
        if(isCrit) atkValue = this._attr_atk * this._attr_critAdd;
        else atkValue = this._attr_atk;
        objComp.beHurt(atkValue, isCrit);
    },

    getIsCrit : function () {
        if(this.getOdds() <= this._attr_crit) return true;
        return false;
    },

    //========================walk===0

    //按下按键行走
    pressWalkTo : function (dirType) {
        if(this._dict_Touch[dirType]) return;
        switch (this._objectType){
            case G_Type.Type_object.myHero:
                this._dict_Touch[dirType] = true;
                break;
            case G_Type.Type_object.otherHero:
                break;
            case G_Type.Type_object.npc:
                for(var key in this._dict_Touch){
                    if(dirType == key) this._dict_Touch[key] = true;
                    else this._dict_Touch[key] = false;
                }
                break;
            default:
                break;
        }
        this._resetAniDir(dirType);
        this._setWalkSpeed(false, dirType);
        if(this._aniState != G_Type.Type_aniState.walk) {
            //start walk
            this._act_walk();
            if(!this._riseLimit) this._riseAct = this.node.runAction(cc.sequence(cc.delayTime(this._riseSpeedCD), cc.callFunc(this._riseWalkSpeed.bind(this))));
        }
    },
    //移动按键被抬起
    walkPressUp : function (dirType) {
        this._setWalkSpeed(true, dirType);
        this._dict_Touch[dirType] = false;

        var isWalkOver = this._sortWalk();
        if(isWalkOver && this._aniState==G_Type.Type_aniState.walk) {
            //stop walk
            this.endWalk();
        }
    },
    endWalk : function () {
        this._act_stand();
        this._resetSpeed();
    },
    //提升移动速度
    _riseWalkSpeed : function () {
        if(this._aniState==G_Type.Type_aniState.walk){
            //移动速度增幅的大小
            this._resetSpeed(this._ristSpeedValue);
            this._setAniWalkSpeed(2);
            this._sortWalk();
        }
    },
    //刷新移动速度
    _sortWalk : function () {
        var isOver = true;
        for(var key in this._dict_Touch){
            if(this._dict_Touch[key]){
                isOver = false;
                this._resetAniDir(key);
                this._setWalkSpeed(false, key);
            }
        }
        return isOver;
    },
    _setWalkSpeed : function (isClear, dirType) {
        dirType = parseInt(dirType);
        var speed;
        if(isClear) speed = 0;
        else speed = this._curSpeed;
        switch(dirType){
            case G_Type.Type_dir.left:
                this._offX = speed * -1;
                break;
            case G_Type.Type_dir.up:
                this._offY = speed * 1;
                break;
            case G_Type.Type_dir.right:
                this._offX = speed * 1;
                break;
            case G_Type.Type_dir.down:
                this._offY = speed * -1;
                break;
            default:
                return;
        }
    },
    forceStand : function () {
        this._clearWalkState();
        this._act_stand();
    },

    _clearWalkState : function () {
        for(var key in this._dict_Touch){
            this._dict_Touch[key] = false;
        }
        this._resetSpeed();
    },

    _getIsWalkLimit : function (offX, offY) {
        if(offX > 0 && offX < G_RoleContainer.getMapW()){
            if(offY > 0 && offY < G_RoleContainer.getMapH()){
                return false;
            }
        }
        return true;
    },
    //动画播放的速度
    _setAniWalkSpeed : function (speedValue) {
        if(this._aniStateComp_walk){
            if(!speedValue) speedValue = 1;
            this._aniStateComp_walk.speed = speedValue;
        }
    },
    //设置行走速度
    _resetSpeed : function (value) {
        if(this._riseAct) this.node.stopAction(this._riseAct);
        if(!value) {
            this._curSpeed = this.p_buttonWalkSpeed;
            this._setAniWalkSpeed();
        } else this._curSpeed += value;
        this._offCenter = Math.sqrt(this._curSpeed*this._curSpeed/2);
    },

    //========================skill===0

    //按下按键播放技能
    pressSkill : function (keyIndex) {
        //skill is inCD
        switch (keyIndex){
            case 74:
                this._act_atk(4);
                break;
            case 75:
                this._normalAtkNext();
                break;
            case 76:
                break;
            case 85:
                this._act_atk(5);
                break;
            default:
                return;
        }
    },
    _startNormalAtk : function () {
        this._curNormalAtkIndex = 0;
        this._normalAtkNext();
    },
    //普通攻击连击计算
    _normalAtkNext : function () {
        if(this._aniState == G_Type.Type_aniState.atk) return;
        if(this._curNormalAtkIndex < this._list_Normal_atk.length){
            if(this._curNormalAtkIndex != 0 && this._dt_combo <= 0) {
                this._startNormalAtk();
            }else{
                var skillIndex = this._list_Normal_atk[this._curNormalAtkIndex];
                this._act_atk(skillIndex);
                this._dt_combo = this._comboCD;
                this._curNormalAtkIndex += 1;
            }
        }else this._startNormalAtk();
    },
    //解除CD限制,只能解除技能
    skillOutCD : function (skillIndex) {
        if(this._getIsNormalAtk(skillIndex)) return;
        this._skillState[skillIndex] = false;
    },
    //解除普通攻击CD
    _clearNormalAtkCD : function (skillIndex) {
        if(this._aniState != G_Type.Type_aniState.atk) return;
        if(skillIndex) this._skillState[skillIndex] = false;
        else {
            for(var key in this._list_Normal_atk){
                this._skillState[this._list_Normal_atk[key]] = false;
            }
        }
    },
    _getIsNormalAtk : function (skillIndex) {
        for(var key in this._list_Normal_atk){
            if(skillIndex == this._list_Normal_atk[key]) return true;
        }
        return false;
    },

    //========================flyLab===0

    getIdleLabComp : function () {
        var flyLab;
        for(var i = 0; i < this._flyLabNum; i++){
            flyLab = this.node.getChildByTag(this._lab_BaseTag + i);
            if(flyLab){
                if(!flyLab.getComponent('P_FlyLabel').getIsUsing()) return flyLab.getComponent('P_FlyLabel');
            }
        }
        flyLab = this._addFlyLab();
        return flyLab.getComponent('P_FlyLabel');
    },
    _addFlyLab : function () {
        var labNode = new cc.Node();
        var lab = labNode.addComponent(cc.Label);
        lab.string = "";
        var flyComp = labNode.addComponent("P_FlyLabel");
        flyComp.setParentInfo(this);
        this.node.addChild(labNode, 3, this._lab_BaseTag + this._flyLabNum);
        this._flyLabNum += 1;
        return labNode;
    },

    //========================flyLab===1

    //刷新动画对象的方向
    _resetAniDir : function (dirType) {
        if(dirType && (dirType == G_Type.Type_dir.left || dirType == G_Type.Type_dir.right)) this._dir = dirType;
        if(this._dir == G_Type.Type_dir.left){
            this._aniNode.scaleX = -1;
        }else this._aniNode.scaleX = 1;
    },

    //刷新角色站位的高度
    resetZOrder : function () {
        this.node.zIndex = G_RoleContainer.getZIndex(this.node.y);
    },

    _walkCallBack : function () {
        this._roleTypeComp.walkCallBack(this.node.getPosition());
        this.resetZOrder();
    },

    getOdds : function () {
        return gg.getRandomArea(0, 1000);
    },
    setRoleTypeComp : function (comp) {
        this._roleTypeComp = comp;
    },
    setRiseLimit : function (isLimit) {
        this._riseLimit = isLimit;
    },
    setObjectType : function (curType) {
        this._objectType = curType;
    },
    getBodyBox : function () {
        return cc.rect(this.node.x-this._bodyW2, this.node.y-this.getAniHeight()*0.1, this.getAniWidth(), this.getAniHeight());
    },
    getAtkBox : function () {
        return cc.rect(this.node.x, this.node.y, this._atkRectW, this._atkRectH);
    },
    //视野大小
    getViewLength : function () {
        return this._viewLength;
    },
    getAtkRectW : function () {
        return this._atkRectW;
    },
    getAtkRectH : function () {
        return this._atkRectH;
    },
    getAniWidth : function () {
        return this._aniNode.width;
    },
    getAniHeight : function () {
        return this._aniNode.height;
    },
    getAniState : function () {
        return this._aniState;
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         //combo CD
        if(this._dt_combo > 0){
            //cd in
            this._dt_combo -= dt;
            if(this._dt_combo <= 0){
                //cd out
                this._dt_combo = 0
            }
        }
        //walk
         if(this._aniState == G_Type.Type_aniState.walk){
             var offX, offY;
             if(this._offX && this._offY){
                 offX = (this._offX/Math.abs(this._offX))*this._offCenter;
                 offY = (this._offY/Math.abs(this._offY))*this._offCenter;
             }else{
                 offX = this._offX;
                 offY = this._offY;
             }
             offX = this.node.x + offX;
             offY = this.node.y + offY;
             if(!this._getIsWalkLimit(offX, offY)){
                 this.node.x = offX;
                 this.node.y = offY;
                 this._walkCallBack();
             }
         }
     },
});
