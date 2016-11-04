var ctx, cellW, cellH;

function dice(x, y, sixMode) {
    var hBord = (cellW <= cellH) ? (cellW - size) / 2 : (cellW - 2 * size) / 3;
    var vBord = (cellW <= cellH) ? (cellH - 2 * size) / 3 : (cellH - size) / 2;
    var h1 = hBord;
    var h2 = (cellW <= cellH) ? hBord : 2 * hBord + size;
    var v1 = vBord;
    var v2 = (cellW <= cellH) ? 2 * vBord + size : vBord;

    if (sixMode) {
        six_die(x + h1, y + v1);
        six_die(x + h2, y + v2);
    } else {
        ten_die(x + h1, y + v1);
        ten_die(x + h2, y + v2);
    }
}

function drawDice(elem, sixMode) {
    c = document.getElementById(elem);
    ctx = c.getContext("2d");
    cellW = c.width / 5;
    cellH = c.height / 2;
    size = Math.min(3 * cellW / 4, 6 * cellH / 13);

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#000";
    for (var row = 0; row < 2; row++) {
        for (var col = 0; col < 5; col++) {
            var x = col * cellW;
            var y = row * cellH;
            ctx.strokeRect(x, y, cellW, cellH);
            dice(x, y, sixMode);            
        }
    }
}

function drawSix(elem) {
    drawDice(elem, true);
}

function drawTen(elem) {
    drawDice(elem, false);
}

function six_die(x, y) {
    ctx.clearRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);
    var num = Math.floor(Math.random() * 6);
    var dots = new Array(
            new Array(),
            new Array(2, 6),
            new Array(2, 4, 6),
            new Array(0, 2, 6, 8),
            new Array(0, 2, 4, 6, 8),
            new Array(0, 2, 3, 5, 6, 8)
            );
    dots[0].push(4);
    var r, c, h, v;
    var dotRad = size / 10;
    for (var i = 0; i < dots[num].length; i++) {
        r = Math.floor(dots[num][i] / 3);
        c = Math.floor(dots[num][i] % 3);
        h = (3 * c + 2) * dotRad;
        v = (3 * r + 2) * dotRad;
        ctx.beginPath();
        ctx.arc(x + h, y + v, dotRad, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function ten_die(x, y) {
    ctx.save();
    
    ctx.setTransform(size, 0, 0, size, x, y);

    //Draw background
    ctx.beginPath();
    ctx.moveTo(1 / 2, 0);
    ctx.lineTo(1, 1 / 3);
    ctx.lineTo(1, 2 / 3);
    ctx.lineTo(0.5, 1);
    ctx.lineTo(0, 2 / 3);
    ctx.lineTo(0, 1 / 3);
    ctx.lineTo(0.5, 0);
    ctx.lineTo(5 / 6, 7 / 9);
    ctx.lineTo(1 / 2, 1);
    ctx.lineTo(1 / 6, 7 / 9);
    ctx.closePath();
    ctx.lineWidth = 1 / size;
    ctx.fillStyle = "#008000";
    ctx.fill();
    ctx.stroke();
    
    //Draw random number
    var num = Math.floor(Math.random() * 10);
    ctx.fillStyle = "#ffffff";
    var txtShiftH = 0.5 - (ctx.measureText(num).width * 0.025);
    ctx.transform(0.05, 0, 0, 0.05, txtShiftH, 0.75);
    ctx.fillText(num, 0, 1);

    ctx.restore();
}
