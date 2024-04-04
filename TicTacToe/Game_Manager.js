import prompt_Sync from "prompt-sync"
const prompt = prompt_Sync();

export function FRandom_Range(min, max)
{
    return Math.random() * ((max + 1) - min) + min;
}

export function IRandom_Range(min, max)
{
    return parseInt(Math.random() * ((max + 1) - min) + min);
}

export const Game_States = 
{
    Running: "Running",
    Paused: "Paused",
    Quitting: "Quitting",
}
Object.freeze(Game_States);

const Enemy_Directions = 
{
    Up: "Up",
    Down: "Down",
    Right: "Right",
    Left: "Left",
}
Object.freeze(Enemy_Directions);

const empty_Square = " ";
export const player_Icon = "o";
export const enemy_Icon = "x";

export class Game_Manager
{

    Print_Table()
    {
        console.clear();
        process.stdout.clearLine();
        for (let i = 0; i < this.Game_Height; i++)
        {
            for (let j = 0; j < this.Game_Width; j++)
            {
                process.stdout.write(`[ ${this.Slot_States[i][j]} ]`);
            }
            console.log(""); // new line.
        }

        /*
        console.log(`[ ${this.Slot_States[0]} ][ ${this.Slot_States[1]} ][ ${this.Slot_States[2]} ]`);
        console.log(`[ ${this.Slot_States[3]} ][ ${this.Slot_States[4]} ][ ${this.Slot_States[5]} ]`);
        console.log(`[ ${this.Slot_States[6]} ][ ${this.Slot_States[7]} ][ ${this.Slot_States[8]} ]`);
        */
    }

    Player_Turn_Checks(min_Input, max_Input, prompt_Msg)
    {
        let number_String = undefined;
        while (true)
        {
            number_String = prompt(prompt_Msg);
            if (number_String == "q" || number_String == "quit")
            {
                this.State = Game_States.Quitting;
                throw("Program was terminated by input from user.");
            }

            if (isNaN(number_String) || isNaN(parseInt(number_String)))
            {
                console.log("Please input only numbers.");
                continue;
            }

            if (parseFloat(number_String) < min_Input || parseInt(number_String) > max_Input)
            {
                console.log("Please select a number from 1 to 9.");
                continue;
            }

            if (this.Slot_States[parseInt(number_String - 1)] == player_Icon || this.Slot_States[parseInt(number_String - 1)] == enemy_Icon)
            {
                console.log("Please select an empty square.");
                continue;
            }
            
            if ((isNaN(number_String) || isNaN(parseInt(number_String))) == false &&
                (parseInt(number_String) < min_Input || parseInt(number_String) > max_Input) == false)
            {
                return parseInt(number_String);
            }
        }
    }

    Players_Turn()
    {
        let selected_Row = this.Player_Turn_Checks(1, this.Game_Width, `Select a column of squares by entering a number from 1 to ${this.Game_Width}:  `);
        let selected_Column = this.Player_Turn_Checks(1, this.Game_Height, `Select a row of squares by entering a number from 1 to ${this.Game_Height}: `);

        this.Slot_States[selected_Column - 1][selected_Row - 1] = player_Icon;
        this.State = Game_States.Running;
    }

    Enemy_Random_Square()
    {
        let Selected_Row = 0;
        let Selected_Column = 0;
        while (true)
        {
            Selected_Row = IRandom_Range(0, this.Game_Width - 1);
            Selected_Column = IRandom_Range(0, this.Game_Height - 1);
            if (this.Slot_States[Selected_Column][Selected_Row] != player_Icon && this.Slot_States[Selected_Column][Selected_Row] != enemy_Icon && 
                this.Slot_States[Selected_Column][Selected_Row] == empty_Square)
            {
                this.Slot_States[Selected_Column][Selected_Row] = enemy_Icon;
                return [Selected_Column, Selected_Row];
            }
        }
    }

    Enemy_First_Turn()
    {
        prompt("Opponent is selecting a square...");
        this.Enemy_Origin = this.Enemy_Random_Square();
    }

    // Returns all squares/array elements that have a value of 'square_Type' within a radius.
    Square_Radius_Check(selected_Column, selected_Row, radius, square_Type, func)
    {
        let square_Positions_Array = [];

        // Above selected square's row.
        for (let i = selected_Column + 1; i <= selected_Column + radius; i++)
        {
            if (i > this.Game_Height - 1) break;
            for (let j = selected_Row - radius; j < selected_Row + radius; j++)
            {
                if (j < 0) continue;
                if (j > this.Game_Width) break;
                if (this.Slot_States[i][j] == square_Type)
                {
                    square_Positions_Array.push([i, j]);
                }
            }
        }

        // At selected square's row.
        for (let i = selected_Row - radius; i < selected_Row + radius; i++)
        {
            if (i < 0) continue;
            if (i > this.Game_Width) break;
            if (i != selected_Row && this.Slot_States[selected_Column][i] == square_Type)
            {
                square_Positions_Array.push([selected_Column, i]);
            }
        }

        // Below selected square's row.
        for (let i = selected_Column - 1; i >= selected_Column - radius; i--)
        {
            if (i < 0) break;
            if (i > this.Game_Height) continue;
            for (let j = selected_Row - radius; j < selected_Row + radius; j++)
            {
                if (j < 0) continue;
                if (j > this.Game_Width) break;
                if (this.Slot_States[i][j] == square_Type)
                {
                    square_Positions_Array.push([i, j]);
                }
            }
        }

        return square_Positions_Array;
    }

    

    Enemy_Turn()
    {
        prompt("Opponent is selecting a square...");
        const random_Select_Chance = IRandom_Range(0, 100);
        let use_Random_Selection = false;
        if (random_Select_Chance <= 20)
        {
            use_Random_Selection = true;
        }

        if (use_Random_Selection == true || this.Enemy_Origin === undefined)
        {
            this.Enemy_Origin = this.Enemy_Random_Square();
        }else
        {
            let enemy_Sqaures_Array = this.Square_Radius_Check(this.Enemy_Origin[0], this.Enemy_Origin[1], 1, enemy_Icon, undefined);
            let empty_Sqaures_Array = this.Square_Radius_Check(this.Enemy_Origin[0], this.Enemy_Origin[1], 1, empty_Square, undefined);
            
            if (empty_Sqaures_Array.length !== 0)
            {
                let selected_Square = empty_Sqaures_Array[IRandom_Range(0, empty_Sqaures_Array.length - 1)];

                this.Slot_States[selected_Square[0]][selected_Square[1]] = enemy_Icon;
                this.Enemy_Origin = selected_Square;
            }else if (enemy_Sqaures_Array.length !== 0)
            {
                let new_Empty_Squares_Array = undefined;
                for (let i = 0; i < enemy_Sqaures_Array.length; i++)
                {
                    new_Empty_Squares_Array = this.Square_Radius_Check(enemy_Sqaures_Array[i][0], enemy_Sqaures_Array[i][1], 1, empty_Square, undefined);
                    if (new_Empty_Squares_Array.length !== 0)
                    {
                        let selected_Empty_Square = new_Empty_Squares_Array[IRandom_Range(0, new_Empty_Squares_Array.length - 1)];
                        this.Enemy_Origin = selected_Empty_Square;
                        if (this.Slot_States[selected_Empty_Square[0]][selected_Empty_Square[1]] == enemy_Icon)
                        {
                            this.Enemy_Origin = this.Enemy_Random_Square();
                        }
                        
                        this.Slot_States[selected_Empty_Square[0]][selected_Empty_Square[1]] = enemy_Icon;
                        break;
                    }
                }
            }else
            {
                this.Enemy_Origin = this.Enemy_Random_Square();
            }

            /*
            let invalid_Squares = [];
            invalid_Squares.push(-1);
            
            selection_Loop: for (let i = 0; i < 9; i++)
            {
                for (let j = 0; j < invalid_Squares.length; j++)
                {
                    if (i == invalid_Squares[j])
                    {
                        continue selection_Loop;
                    }
                }

                if (i == 0)
                {
                    if (this.Slot_States[i] == empty_Square)
                    {
                        this.Slot_States[i] = enemy_Icon;
                    }
                }else
                {
                    if (this.Slot_States[i] == empty_Square)
                    {
                        this.Slot_States[i] = enemy_Icon;
                    }
                }
            }

            */
        }
    }


    constructor(game_Width, game_Height, winning_Score)
    {
        this.Slot_States = [];
        this.State = Game_States.Running;
        this.Game_Width = game_Width;
        this.Game_Height = game_Height;
        this.Enemy_Origin = undefined;
        this.Enemy_Current_Direction = undefined;
        this.Winning_Score = winning_Score;

        for (let i = 0; i < this.Game_Height; i++)
        {
            this.Slot_States.push([]);

            for (let j = 0; j < this.Game_Width; j++)
            {
                this.Slot_States[i].push(empty_Square);
            }
        }
        
        this.Print_Table();
    }
};