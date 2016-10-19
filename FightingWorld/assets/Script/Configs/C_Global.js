
window.G_Center = null;
window.G_RoleContainer = null;


var CG = CG || {};
CG._W2  = cc.visibleRect.width/2;
CG._H2  = cc.visibleRect.height/2;
window.CG = CG;

var gg = {
    //获取区域内的随机数，返回数值可能是最大 最小值
    getRandomArea : function(downNum, upNum) {
        return parseInt(Math.random()*(upNum - downNum + 1) + downNum);
    },
    //返回随机的bool值
    getRandomBool : function(){
        return Boolean(Math.random() > 0.5);
    },
    //两点之间的距离
    getPointsLength : function (pos1, pos2) {
        var pos = cc.pSub(pos1, pos2);
        return Math.sqrt(pos.x * pos.x + pos.y * pos.y);
    },

    //以自身为原点，获取某点的方向
    getPointDir : function (locationInNode) {
        var angle = this.getAngle(locationInNode);
        var dir;
        if(angle > -22.5 && angle < 22.5){
            dir = G_Type.Type_dir.right;
        }
        else if(angle > 22.5 && angle < 67.5){
            dir = G_Type.Type_dir.right_up;
        }
        else if(angle > 67.5 && angle < 112.5){
            dir = G_Type.Type_dir.up;
        }
        else if(angle > 112.5 && angle < 157.5){
            dir = G_Type.Type_dir.left_up;
        }
        else if((angle > 157.5 && angle < 180)||(angle < -157.5 && angle > -180)){
            dir = G_Type.Type_dir.left;
        }
        else if(angle < -112.5 && angle > -157.5){
            dir = G_Type.Type_dir.left_down;
        }
        else if(angle < -67.5 && angle > -112.5){
            dir = G_Type.Type_dir.down;
        }
        else if(angle < -22.5 && angle > -67.5){
            dir = G_Type.Type_dir.right_down;
        }
        return dir;
    },


    // 以自身为原点，获得某点的角度
    getAngle : function(pos){
        return (Math.atan2(pos.y, pos.x) * 57.29577951);
    },
}
window.gg = gg;
