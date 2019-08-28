class Body {

    constructor(fill, tag, keys = []) {
        Object.assign(this, {
            tag, fill, keys,
            el: null,
            content: '',
            id: tag + '_' + rnd().toString(36).substring(2)
        });
    }

    element() {
        return this.el || document.getElementById(this.id);
    }

    update() {
        this.element() && this.keys.forEach(key =>
            this.element().setAttribute(key, this[key]));
    }

    remove () {
        this.element() && this.element().remove();
    }

    render() {
        return "<" + this.tag
            + " fill=" + this.fill
            + " id=" + this.id
            + ">" + this.content
            + "</" + this.tag + ">";
    }
}