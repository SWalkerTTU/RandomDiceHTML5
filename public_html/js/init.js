function init() {
    var six = "myCanvas";
    var ten = "tenCanvas";
    drawSix(six);
    drawTen(ten);
    document.getElementById(six).onclick = function() {
        drawSix(six);
    };
    document.getElementById(ten).onclick = function() {
        drawTen(ten);
    };
}
