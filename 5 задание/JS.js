var canvas, rtx, balls, rects, idTimer,
    sec = 20,
    SizeLimit = 100,
    lenInc = 0.25;
TFigure = new Class(
{
    initialize: function (pX, pY)
    {
        this.posX = pX;
        this.posY = pY;
        this.colorFigure = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        this.len = 5 + Math.random() * 25;
        this.directionX = 0;
        this.directionY = 0;
    },
    posX: 0,
    posY: 0,
    colorFigure: "rgb(0,0,0)",
    len: 0,
    directionX: 0,
    directionY: 0,
    gradientFill: function (rtx)
    {
        with (this)
        {
            var gradient = rtx.createRadialGradient(posX + len / 4,
                posY - len / 6, len / 8, posX, posY, len);
            gradient.addColorStop(0, '#fff');
            gradient.addColorStop(0.85, colorFigure);
            return gradient;
        }
    }
});
TBall = new Class(
{
    Extends: TFigure,
    initialize: function (X, Y)
    {
        this.parent(X, Y);
    },
    draw: function (rtx)
    {
        with (this)
        {
            rtx.fillStyle = gradientFill(rtx);
            rtx.beginPath();
            rtx.arc(posX, posY, len, 0, 2 * Math.PI, false);
            rtx.closePath();
            rtx.fill();
        }
    }
});
TTriangle = new Class(
{
    Extends: TFigure,
    initialize: function (X, Y)
    {
        this.parent(X, Y);
    },
    draw: function (rtx)
    {
        with (this)
        {
            rtx.fillStyle = gradientFill(rtx);
            rtx.beginPath();
            rtx.moveTo(posX, posY);
            rtx.lineTo(posX + len / 2, posY + len);
            rtx.lineTo(posX - len / 2, posY + len);
            rtx.fill();
        }
    }
});
TSquare = new Class(
{
    Extends: TFigure,
    initialize: function (X, Y)
    {
        this.parent(X, Y);
    },
    draw: function (rtx)
    {
        with (this)
        {
            rtx.fillStyle = gradientFill(rtx);
            rtx.fillRect(posX, posY, len, len);
        }
    }
});
function drawBack(rtx, col1, col2, w, h)
{
    rtx.save();
    var g = rtx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(1, col1);
    g.addColorStop(0, col2);
    rtx.fillStyle = g;
    rtx.fillRect(0, 0, w, h);
    rtx.restore();
}

function init()
{
    canvas = document.getElementById('canvas');
    if (canvas.getContext)
    {
        rtx = canvas.getContext('2d');
        drawBack(rtx, '#202020', '#aaa', canvas.width, canvas.height);
        balls = [];
        rects = [];
        for (var i = 1; i <= 1; i++)
        {
            var item = new TBall(10 + Math.random() * (canvas.width - 30), 10 + Math.random() * (canvas.height - 30));
            item.draw(rtx);
            balls.push(item);
            var itemSquare = new TSquare(10 + Math.random() * (canvas.width - 30), 10 + Math.random() * (canvas.height - 30));
            itemSquare.draw(rtx);
            rects.push(itemSquare);
            var itemTriangle = new TTriangle(10 + Math.random() * (canvas.width - 30), 10 + Math.random() * (canvas.height - 30));
            itemTriangle.draw(rtx);
            balls.push(itemTriangle);
        }
    }
}
//появление случайной фигуры при клике
function goInput(event)
{
    var x = event.clientX + window.pageXOffset,
        y = event.clientY + window.pageYOffset,
        rand = Math.random();
    if (rand < 0.3)
    {
        var item = new TTriangle(x, y);
        item.draw(rtx);
        balls.push(item);
        return;
    }
    if (rand >= 0.3 && rand < 0.6)
    {
        var item = new TBall(x, y);
        item.draw(rtx);
        balls.push(item);
        return;
    }
    var item = new TSquare(x, y);
    item.draw(rtx);
    rects.push(item);
    return;
}
function Dist(x1, y1, x2, y2)
{
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
function ballIntersec()
{
    for (var i = 0; i < balls.length; i++)
    {
        for (var j = i + 1; j < balls.length; j++)
        {
            var d = Dist(balls[i].posX, balls[i].posY, balls[j].posX, balls[j].posY);
            if (d <= (balls[i].len + balls[j].len))
            {
                balls.splice(j, 1);
                j--;
                balls.splice(i, 1);
                i--;
                if (i < 0) i = 0;
                if (j < 0) j = 0;
                if (balls.lenght == 0)
                {
                    i = 1;
                    j = 1;
                }
            }
        }
    }
}
function rectIntersec()
{
    for (var i = 0; i < rects.length; i++)
    {
        for (var j = i + 1; j < rects.length; j++)
        {
            if (((Math.abs(rects[i].posX - rects[j].posX) <= rects[i].len) && (Math.abs(rects[i].posY - rects[j].posY) <= rects[i].len)) ||
                ((Math.abs(rects[i].posX - rects[j].posX) <= rects[j].len) && (Math.abs(rects[i].posY - rects[j].posY) <= rects[j].len)))
            {
                rects.splice(j, 1);
                j--;
                rects.splice(i, 1);
                i--;
                if (i < 0) i = 0;
                if (j < 0) j = 0;
                if (rects.lenght == 0)
                {
                    i = 1;
                    j = 1;
                }
            }
        }
    }
}
function rectBallIntersec()
{
    for (var i = 0; i < balls.length; i++)
    {
        for (var j = 0; j < rects.length; j++)
        {
            var b = balls[i], r = rects[j];
            if (((Math.abs(r.posY - b.posY) <= r.len + b.len) && (r.posY < b.posY) && (b.posX >= r.posX - b.len) && (b.posX <= r.posX + r.len + b.len)) ||
                ((Math.abs(r.posX - b.posX) <= b.len) && (b.posX < r.posX) && (b.posY >= r.posY - b.len) && (b.posY <= r.posY + r.len + b.len)) ||
                ((Math.abs(r.posX - b.posX) <= r.len + b.len) && (r.posX < b.posX) && (b.posY >= r.posY - b.len) && (b.posY <= r.posY + r.len + b.len)) ||
                ((Math.abs(r.posY - b.posY) <= b.len) && (r.posY > b.posY) && (b.posX >= r.posX - b.len) && (b.posX <= r.posX + r.len + b.len)))
            {
                rects.splice(j, 1);
                j--;
                balls.splice(i, 1);
                i--;
                if (i < 0) i = 0;
                if (j < 0) j = 0;
                if ((rects.lenght == 0) || (balls.lenght == 0))
                {
                    i = 1;
                    j = 1;
                }
            }
        }
    }
}
function reDraw(arr)
{
    for (var i = 0; i < arr.length; i++)
        arr[i].draw(rtx);
}
function checkBorderBalls()
{
    var l;
    for (var i = 0; i < balls.length; i++)
    {
        l = balls[i].len;
        if (((balls[i].posX + l) >= canvas.width) || ((balls[i].posY + l) >= canvas.height) || ((balls[i].posX - l) <= 0) || ((balls[i].posY - l) <= 0))
        {
            balls.splice(i, 1);
            i--;
            continue;
        }
    }
}
function checkBorderRects()
{
    var l;
    for (var i = 0; i < rects.length; i++)
    {
        l = rects[i].len;
        if (((rects[i].posX + l) >= canvas.width) || ((rects[i].posY + l) >= canvas.height) || (rects[i].posX <= 0) || (rects[i].posY <= 0))
        {
            rects.splice(i, 1);
            i--;
            continue;
        }
    }
}
function checkSize(arr)
{
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i].len >= SizeLimit)
        {
            arr.splice(i, 1);
            i--;
            continue;
        }
    }
}
function moveFigure(arr, ort, dir)
{
    drawBack(rtx, '#202020', '#aaa', canvas.width, canvas.height);
    checkBorderBalls();
    checkBorderRects();
    for (var i = 0; i < arr.length; i++)
    {
        arr[i].len += lenInc;
        switch (ort)
        {
            case 'vertical':
                arr[i].posY += dir;
                break;
            case 'horizontal':
                arr[i].posX += dir;
                break;
            case 'random':
                if (arr[i].directionX == 0)
                {
                    arr[i].directionX = Math.random() * (1 - (-1)) - 1;
                    arr[i].directionY = Math.random() * (1 - (-1)) - 1;
                }
                else
                {
                    arr[i].posY += arr[i].directionY;
                    arr[i].posX += arr[i].directionX;
                }
                break;
            case 'chaos':
                arr[i].posY += 10 * (Math.random() * (1 - (-1)) - 1);
                arr[i].posX += 10 * (Math.random() * (1 - (-1)) - 1);
                break;
        }
    }
    reDraw(balls);
    reDraw(rects);
    ballIntersec();
    rectIntersec();
    rectBallIntersec();
    checkSize(balls);
    checkSize(rects);
}
function move(direction)
{
    clearInterval(idTimer);
    switch (direction)
    {
        case 'up':
            idTimer = setInterval('moveFigure(balls, "vertical", -1); moveFigure(rects, "vertical", -1);', sec);
            break;
        case 'down':
            idTimer = setInterval('moveFigure(balls, "vertical", 1); moveFigure(rects, "vertical", 1);', sec);
            break;
        case 'left':
            idTimer = setInterval('moveFigure(balls, "horizontal", -1); moveFigure(rects, "horizontal", -1);', sec);
            break;
        case 'right':
            idTimer = setInterval('moveFigure(balls, "horizontal", 1); moveFigure(rects, "horizontal", 1);', sec);
            break;
        case 'random':
            idTimer = setInterval('moveFigure(balls, "random", 0); moveFigure(rects, "random", 0);', sec);
            break;
        case 'chaos':
            idTimer = setInterval('moveFigure(balls, "chaos", 0); moveFigure(rects, "chaos", 0);', sec);
            break;
    }
}