function* pseudoRandom(seed) {
    let value = seed;

    while (true) {
        value = value * 16807 % 2147483647
        yield value;
    }

};

function intToCssColor(color_int) {
    return "#" + (color_int + 0x1000000).toString(16).substr(-6).toUpperCase();
}

function rndInRange(rnd, min, max) {
    return (Math.abs(rnd.next().value) % (max - min + 1)) + min;
}

String.prototype.hashCode = function () {
    var hash = 0,
        i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        //   hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function img_gen() {
    let name = document.getElementById("name").value;
    let name_hash = name.hashCode();
    let rnd = pseudoRandom(name_hash);
    let w = parseInt(document.getElementById("w").value);
    let w2 = w / 2;
    let h = parseInt(document.getElementById("h").value);
    let h2 = h / 2;
    let islines = document.getElementById("islines").checked;
    let isrects = document.getElementById("isrects").checked;
    let canvas_div = document.getElementById("canvas_div");

    let exist_canvas = document.getElementById("CursorLayer");
    if (exist_canvas)
        exist_canvas.remove();

    let canvas = document.createElement('canvas');

    canvas.id = "CursorLayer";
    canvas.width = w;
    canvas.height = h;
    canvas.style.zIndex = 8;
    canvas.style.position = "absolute";
    canvas.style.border = "1px solid";

    canvas_div.appendChild(canvas);

    cursorLayer = document.getElementById("CursorLayer");

    console.log(cursorLayer);

    // below is optional

    let ctx = canvas.getContext("2d");

    let grad = ctx.createLinearGradient(rndInRange(rnd, 0, w2), rndInRange(rnd, 0, h2), rndInRange(rnd, w2, w), rndInRange(rnd, h2, h));
    grad.addColorStop(0, intToCssColor(rnd.next().value));
    grad.addColorStop(1, intToCssColor(rnd.next().value));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    if (islines) {
        let line_cnt = rndInRange(rnd, 1, 5);
        console.log("lines: " + line_cnt.toString());
        for (let i = 0; i < line_cnt; i++) {
            s = "rgba("
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + (rndInRange(rnd, 500, 1000) * 0.001).toString()
                + ")";
            ctx.strokeStyle = s;
            console.log("line: " + s);
            ctx.beginPath(); // Start a new path
            ctx.moveTo(rndInRange(rnd, 0, w), rndInRange(rnd, 0, h));
            ctx.lineTo(rndInRange(rnd, 0, w), rndInRange(rnd, 0, h));
            ctx.stroke(); // Render the path
        }
    }
    if (isrects) {
        let rect_cnt = rndInRange(rnd, 1, 5);
        console.log("rects: " + rect_cnt.toString());
        for (let i = 0; i < rect_cnt; i++) {
            s = "rgba("
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + rndInRange(rnd, 0, 255).toString()
                + ", "
                + (rndInRange(rnd, 500, 1000) * 0.001).toString()
                + ")";
            ctx.fillStyle = s;
            console.log("rect: " + s);
            ctx.fillRect(rndInRange(rnd, 0, w), rndInRange(rnd, 0, h), rndInRange(rnd, 0, w), rndInRange(rnd, 0, h));
        }
    }
}