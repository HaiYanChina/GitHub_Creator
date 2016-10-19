cc.Class({
    extends: cc.Component,
    _objW : null,
    _objH : null,
    _objW2 : null,
    _objH2 : null,
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
        this._ctx = this.getComponent(cc.Graphics);
    },

    setDebugBox : function (ObjW, ObjH) {
        this._objW = ObjW;
        this._objH = ObjH;
        this._objW2 = ObjW/2;
        this._objH2 = ObjH/2;

        this.drawAtkBox();
        this.drawBodyBox();
    },

    drawAtkBox : function (){
        this._ctx = this.getComponent(cc.Graphics);
        this._ctx.rect(0, 0, this._objW*0.7, this._objH*0.8);
        this._ctx.strokeColor = cc.Color.RED;
        this._ctx.stroke();
    },

    drawBodyBox : function () {
        this._ctx.rect(-this._objW2, -this._objH*0.1, this._objW, this._objH);
        this._ctx.strokeColor = cc.Color.BLUE;
        this._ctx.stroke();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
