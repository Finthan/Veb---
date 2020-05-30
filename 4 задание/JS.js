function SquareJava1(obj)
{
    var a = obj.num1.value;
    var h = obj.num2.value;

    console.log( obj ) ;

    if (a > 0 && h > 0)
    {
        obj.res.value = a * h;
    }
    else
    {
        obj.res.value = 'Error';
    }
}



function SquareJava2(obj) {
    var b = obj.num1.value;
    var h = obj.num2.value;
    var s = b * h;
    if (s > 0) {
        obj.res.value = s;
    }
    else {
        obj.res.value = 'Error';
    }
}

function SquareJava3(obj) {
    var a = parseInt(obj.num1.value);
    var b = parseInt(obj.num2.value);
    var sin = parseInt(obj.num3.value);
    if (sin > 90 && sin < -90) {
        obj.res.value = 'Error';
    }
    else {
        sin = (sin * Math.PI) / 180;
        var s = (a * b * Math.sin(sin)).toFixed(3);
        if (s > 0) {
            obj.res.value = s;
        }
        else {
            obj.res.value = 'Error';
        }
    }

}

function SquareJava4(obj) {
    var a = parseInt(obj.num1.value);
    var b = parseInt(obj.num2.value);
    var sin = parseInt(obj.num3.value);
    if (sin > 90) {
        obj.res.value = 'Error';
    }
    else {
        sin = (sin * Math.PI) / 180;
        var s = ((a * b * Math.sin(sin)) / 2).toFixed(3);
        if (s > 0) {
            obj.res.value = s;
        }
        else {
            obj.res.value = 'Error';
        }
    }
}

function SquareJava5(obj) {
    var a = parseInt(obj.num1.value);
    var r = parseInt(obj.num2.value);
    var s = 2 * a * r;
    if (s > 0) {
        obj.res.value = s;
    }
    else {
        obj.res.value = 'Error';
    }
}

function SquareJava6(obj) {

    var r = parseInt(obj.num2.value);
    var sin = parseInt(obj.num1.value);
    if (sin > 90) {
        obj.res.value = 'Error';
    }
    else {
        sin = (sin * Math.PI) / 180;
        var s = ((4 * r * r) / Math.sin(sin)).toFixed(3);
        if (s > 0) {
            obj.res.value = s;
        }
        else {
            obj.res.value = 'Error';
        }
    }
}

function java2(obj)
{
    var N = parseInt(obj.num1.value);
    var M = parseInt(obj.num2.value);

    var j, PrimeCheck;

    obj.res.value = '';

    for (var i = N; i <= M; i++) // Для всех i...
    {
        PrimeCheck = false;
        for (var j = 2; j < i; j++)  // проверить, делится ли число..
        {
            if (i % j == 0)
            {
                PrimeCheck = true;
            }
        }
        if ((PrimeCheck != true) && (i != M))
        {
            obj.res.value += i + ', ';
        }
        else if (i == M)
        {
            obj.res.value += i + '.';
        }
    }
}

function array()
{
    var data = document.getElementsByName("value");
    var sum;
    var result = [];
    var input = [];

    for( var i = 0; i < data.length; i++)
    {
        var row = parseInt(data[i].getAttribute("row"));

        if(!input[row])
        {
            input[row] = [];
        }
        input[row].push(data[i].value);
    }

    for (var i = 0; i < input.length; i++)
    {
        sum = 0;
        for (var j = 0; j < input[i].length; j++)
        {
            sum = sum + parseInt(input[i][j]);
        }
        sum = sum / input[i].length;
        for (var j = 0; j < input[i].length; j++)
        {
            if (input[i][j] > sum)
            {
                result.push(input[i][j]);
            }
        }
    }

    document.getElementById("rez").value = result.join(", ");
}

function getRandomInt(min, max)
{
    return Math.round(min - 0.5 + Math.random() * (max - min));
}

function Random()
{
    document.getElementById("rez2").value = getRandomInt(document.getElementById("min").value, document.getElementById("max").value);
}

function getArray(n)
{
    var max = 100;
    var min = 0;
    let arr = new Array(n);
    for (let i = 0; i < arr.length; i++)
    {
        arr[i] = getRandomInt(min, max);
    }
    return arr;
}

function compareNumeric(a, b)
{
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

function getResultArray(a)
{
    if (a.length > 0)
    {
        return a.sort(compareNumeric)
    }
}

function mat(array)
{
    var n = Math.sqrt(array.length)
    var c = 0;
    var matrix = [];
    for (i = 0; i < n; i++)
    {
        matrix[i] = [];
    }

    for (row = 0; row <= n - 1; row++)
    {
        if (row % 2 == 1)
        {
            for (i = 0; i < n; i++)
            {
                matrix[i][row] = array[c++];
            }
        }
        else
        {
            for (i = n - 1; i >= 0; i--)
            {
                matrix[i][row] = array[c++];
            }
        }
    }
    return matrix;
}

(function ()
{
    var table = document.createDocumentFragment();
    var arr = mat(getResultArray(getArray(16)));
    for (var i = 0; i < 4; i++)
    {
        var tr = document.createElement('tr');
        for (var j = 0; j < 4; j++)
        {
            var td = document.createElement('td');
            td.innerHTML = arr[i][j];
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById('matrix').appendChild(table);
})();
