import * as PIXI from 'pixi.js'

export module background {
    export function loadImage(file: string): Promise<PIXI.Sprite> {
        return new Promise((resolve) => {
            PIXI.loader.add(file).load(() => {
                resolve()
            })
        });
    }
    export function loadImages(images: Array<string>) {
        return new Promise((resolve) => {
            PIXI.loader.add(images).load(() => {
                resolve()
            })
        });

    }
    export function makeBgContainer(bgSize: PIXI.Point, inputSprite: PIXI.Sprite, type?: string, forceSize?: PIXI.Point) {
        var sprite = inputSprite;
        var bgContainer = new PIXI.Container();
        var mask = new PIXI.Graphics().beginFill(0x8bc5ff).drawRect(0, 0, bgSize.x, bgSize.y).endFill();
        bgContainer.mask = mask;
        bgContainer.addChild(mask);
        bgContainer.addChild(sprite);

        var sp = { x: sprite.width, y: sprite.height };
        if (forceSize) sp = forceSize;
        var winratio = bgSize.x / bgSize.y;
        var spratio = sp.x / sp.y;
        var scale = 1;
        var pos = new PIXI.Point(0, 0);
        if (type === 'cover' ? (winratio > spratio) : (winratio < spratio)) {
            //photo is wider than background
            scale = bgSize.x / sp.x;
            pos.y = -((sp.y * scale) - bgSize.y) / 2
        } else {
            //photo is taller than background
            scale = bgSize.y / sp.y;
            pos.x = -((sp.x * scale) - bgSize.x) / 2
        }

        sprite.scale = new PIXI.Point(scale, scale);
        sprite.position = pos;

        return bgContainer;
    }
}