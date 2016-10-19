var Type = {
    Type_dir : cc.Enum({
        right_up : 1,
        right : 2,
        right_down : 3,
        down : 4,
        left_down : 5,
        left : 6,
        left_up : 7,
        up : 8,
    }),
    Type_aniState : cc.Enum({
        stand : 1,
        walk : 2,
        hurt : 3,
        death : 4,
        atk : 5
    }),
    Type_gameState : cc.Enum({
        gameRuning : 1,
        gamePause : 2,
        gameEnd : 3,
    }),
    Type_object : cc.Enum({
        myHero : 1,
        otherHero : 2,
        npc : 3,
    })
}

Type.Type_keyIndex = {
    87 : Type.Type_dir.up,
    83 : Type.Type_dir.down,
    65 : Type.Type_dir.left,
    68 : Type.Type_dir.right,
};

Type.dirText = {
    1: "右上",
    2: "右",
    3: "右下",
    4: "下",
    5: "左下",
    6: "左",
    7: "左上",
    8: "上",
}

window.G_Type = Type;