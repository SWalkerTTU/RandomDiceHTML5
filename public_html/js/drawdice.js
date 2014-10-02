var ctx, size, cellW, cellH;

function ten_die(x, y) {
    var num = Math.floor(Math.random() * 10);

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
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.stroke();

    //Draw random number
    ctx.fillStyle = "#ffffff";
    var fontHeight = 12;
    var fontScale = fontHeight * 7 / 18 / size;
    var txtWidth = ctx.measureText(num).width;
    var txtShiftH = 0.5 - (txtWidth * fontScale / 2);
    var txtShiftV = fontHeight * fontScale * 9 / 7;
    ctx.transform(fontScale, 0, 0, fontScale, txtShiftH, txtShiftV);
    ctx.fillText(num, 0, 1);
}

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
    var c = document.getElementById(elem);
    ctx = c.getContext("2d");
    cellW = c.width / 5;
    cellH = c.height / 2;
    size = Math.min(3 * cellW / 4, 6 * cellH / 13);

    ctx.clearRect(0,0, c.width, c.height);

    ctx.fillStyle = "#000";
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 2; row++) {
            var x = col * cellW;
            var y = row * cellH;
            ctx.clearRect(x, y, cellW, cellH);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellW, y);
            ctx.lineTo(x + cellW, y + cellH);
            ctx.lineTo(x, y + cellH);
            ctx.closePath();
            ctx.stroke();
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