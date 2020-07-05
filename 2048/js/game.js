class Game
{
    constructor(parentElement, size = 4)
    {
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        this.rating = 0;

        headerElement.innerHTML = 'Счет: ' + this.rating;

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        this.field = [];

        for(let i = 0; i < size; i++)
        {
            this.field[i] = [];
            for(let k = 0; k < size; k++)
            {
                this.field[i][k] = new Cell(fieldElement);
            }
        }

        /*this.fieldElement.onkeyup = function(e)
        {

        };*/

        console.log(this.field);
    }
    spawnUnit()
    {
        let emptyCells = [];

        for (let i = 0; i < this.field.length; i++)
        {
            for (let k = 0; k < this.field[i].length; k++)
            {
                if (!this.field[i][k].value)
                {
                    emptyCells.push(this.field[i][k]);
                }
            }
        }
        if (emptyCells.length)
        {
            emptyCells[getRandomInt(0, emptyCells.length - 1)].spawn();
        }
        else
        {
            alert('Ты проиграл');
        }
    }

    /*moveRight()
    {
        for (let i = 0; i < this.field.length; i++)
        {
            for (let k = this.field[i])
        }
    }*/
} 