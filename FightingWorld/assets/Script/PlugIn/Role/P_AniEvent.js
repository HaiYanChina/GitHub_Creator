cc.Class({
    extends: cc.Component,
    _parentComp : null,
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

    },

    setParentComp : function (comp) {
        this._parentComp = comp;
    },

    aniFrame_atkCallBack : function (param) {
        if(!this._parentComp) return;
        //console.log('animation call back ===============')
        //console.log(param)
        var valueList = param.split('-');
        var skillName = valueList[0];
        //技能中的第几段伤害
        var atkIndex = valueList[1];
        this._parentComp.atkChecking();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
