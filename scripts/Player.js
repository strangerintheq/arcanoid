class Player extends Box {

    constructor() {
        super('steelblue', -10, 90, 20, 2);
        Object.assign(this, {
            sticky: 0, flying: 0, drunk: 0, shooting: 0
        });
        this.buffList = ['sticky', 'shooting', '', 'flying', 'drunk'];
    }

    playerLogic(dir, s) {
        this.x = Math.max(-s, Math.min(this.x + dir, s - this.width));
        this.update();
        this.buffList.forEach((bonus, i) => {
            this[bonus] = Math.max(0, this[bonus] - 0.02);
            this[bonus] && this.renderBuff(5 + i, this[bonus])
        });
    }

    buff(type) {
        this[this.buffList[type]] += 30;
    }

    renderBuff(type, value){
        value = Math.min(30, value);
        let sel = '#mask_' + type + ' path';
        let mask = document.querySelector(sel);
        let x = 46 + (type - 5) * 12;
        if (!mask) {
            defs.innerHTML += "<mask id=mask_" + type + ">"
                + "<path fill='white'></path></mask>";
            svg.innerHTML += "<text mask=url(#mask_" + type + ") id=bonus_"
                + type+ " y=-93.5 x=" + x + ">" + types[type] + "</text>";
            mask = document.querySelector(sel);
        }
        let y = (1 - value / 30) * 12 - 100;
        mask.setAttribute('d','M' + (x-5) + ',' + y+'h12v11h-12z');
    }
}