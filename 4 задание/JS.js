function java1(obj)
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

function java2(obj)
{
    var M = obj.num1.value;
    var N = obj.num2.value;

    var j;

    console.log( obj ) ;

    for (let i = M; i <= N; i++)
    {
        if (i == 1 || i == 2 || i == 3 || i == 5 || i == 7)
        {
            obj.res.value += i;
            obj.res.value += ' ';
            ++j;
        }
        else
        {
            if ((i % 2 != 0) && (i % 3 != 0) && (i % 3 != 0) && (i % 5 != 0) && (i % 7 != 0))
            {
                obj.res.value += i;
                obj.res.value += ' ';
                ++j;
            }
            else if (i == N && j == 0)
            {
                obj.res.value = 'не найдены натуральные числа';
            }
        }
    }
}

function array()
{
    var data = document.getElementsByClassName("value");
    var sum;
    var result;

    for (var i = 0; i < data.length; i++)
    {
        sum = 0;
        for (var j = 0; j < data[i].length; j++)
        {
            sum += +data[j].value;
        }

        for (var j = 0; j < data[i].length; j++)
        {
            if (data[i][j].value > sum)
            {
                result[] = data[j].value;
            }
        }
    }

    document.getElementById("rez").value = result.join(", ");
}