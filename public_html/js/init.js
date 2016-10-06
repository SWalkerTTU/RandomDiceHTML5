function init() {
    var six = "myCanvas";
    var ten = "tenCanvas";

    document.getElementById(ten).onclick = function () {
        drawTen(ten);
    };
    document.getElementById(six).onclick = function () {
        drawSix(six);
    };

    drawSix(six);
    drawTen(ten);
}
