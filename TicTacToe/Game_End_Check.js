import prompt_Sync from "prompt-sync"
const prompt = prompt_Sync();

export class Game_End_Check
{
    constructor(winning_Score)
    {
        this.Winning_Score = winning_Score;
    }

    Array_Compare_Single_Value(array, single_Type)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i] === single_Type)
            {
                return true;
            }else
            {
                return false;
            }
        }

        return false;
    }

    Horizontal_Check(const_Slot_States, square_Type)
    {
        let num_Square_Types;
        for (let i = 0; i < const_Slot_States.length; i++)
        {
            num_Square_Types = 0;
            for (let j = 0; j < const_Slot_States[i].length; j++)
            {
                if (const_Slot_States[i][j] === square_Type)
                {
                    num_Square_Types++;
                }else
                {
                    num_Square_Types = 0;
                }

                if (num_Square_Types == this.Winning_Score)
                {
                    return true;
                }
            }
        }

        return false;
    }

    Vertical_Check(const_Slot_States, square_Type)
    {
        let num_Square_Types;
        for (let i = 0; i < const_Slot_States[0].length; i++)
        {
            num_Square_Types = 0;
            for (let j = 0; j < const_Slot_States.length; j++)
            {
                if (const_Slot_States[j][i] === square_Type)
                {
                    num_Square_Types++;
                }else
                {
                    num_Square_Types = 0;
                }

                if (num_Square_Types == this.Winning_Score)
                {
                    return true;
                }
            }
        }

        return false;
    }

    Diagonal_Finder(const_Slot_States, square_Type, i, j, equal_Squares_Array)
    {

    }

    Diagonal_Check_Up(const_Slot_States, square_Type)
    {
        let num_Square_Types = 0;
        for (let i = 0; i < const_Slot_States.length; i++)
        {
            if (const_Slot_States[i][i] == square_Type)
            {
                num_Square_Types++;
                if (num_Square_Types == this.Winning_Score)
                {
                    return true;
                }
            }else
            {
                num_Square_Types = 0;
            }
        }

        return false;
    }

    Diagonal_Check_Down(const_Slot_States, square_Type)
    {
        let num_Square_Types = 0;
        let j = const_Slot_States.length;
        for (let i = 0; i < const_Slot_States.length; i++)
        {
            j--;
            if (const_Slot_States[i][j] == square_Type)
            {
                num_Square_Types++;
                if (num_Square_Types == this.Winning_Score)
                {
                    return true;
                }
            }else
            {
                num_Square_Types = 0;
            }
        }

        return false;
    }

    Diagonal_Check_Old(const_Slot_States, square_Type, is_Right_Check)
    {
        let num_Square_Types;
        let diag_Itr_J;
        for (let i = 0; i < const_Slot_States.length; i++)
        {
            for (let j = 0; j < const_Slot_States[0].length; j++)
            {
                diag_Itr_J = j;
                num_Square_Types = 1;
                for (let diag_Itr_I = i; diag_Itr_I < const_Slot_States.length; diag_Itr_I++)
                {
                    if (is_Right_Check == true)
                    {
                        diag_Itr_J--;
                    }else
                    {
                        diag_Itr_J++;
                    }

                    if (diag_Itr_I > const_Slot_States.length || diag_Itr_J < 0)
                    {
                        //console.log("DRC 2");
                        break;
                    }else
                    {
                        //console.log("DRC 1");
                        console.log("NSTs: %d", num_Square_Types);
                        if (const_Slot_States[diag_Itr_I][diag_Itr_J] == square_Type)
                        {
                            num_Square_Types++;
                            if (num_Square_Types == this.Winning_Score)
                            {
                                return true;
                            }else
                            {
                                return false;
                            }
                        }else
                        {
                            num_Square_Types = 1;
                        }
                    }
                }

                diag_Itr_J = j;
                for (let diag_Itr_I = i; diag_Itr_I < const_Slot_States.length; diag_Itr_I--)
                {
                    if (is_Right_Check == true)
                    {
                        diag_Itr_J++;
                    }else
                    {
                        diag_Itr_J--;
                    }

                    if (diag_Itr_I < 0 || diag_Itr_J < const_Slot_States[0].length)
                    {
                        break;
                    }else
                    {
                        console.log("NSTs 2: %d", num_Square_Types);
                        if (const_Slot_States[diag_Itr_I][diag_Itr_J] == square_Type)
                        {
                            num_Square_Types++;
                            if (num_Square_Types == this.Winning_Score)
                            {
                                return true;
                            }else
                            {
                                return false;
                            }
                        }else
                        {
                            num_Square_Types = 1;
                        }
                    }
                }
            }
        }
    }

    Diagonal_Left_Check(const_Slot_States, square_Type)
    {
        let num_Square_Types;
        let diag_Itr_J;
        for (let i = 0; i < const_Slot_States.length; i++)
        {
            for (let j = 0; j < const_Slot_States[0].length; j++)
            {
                diag_Itr_J = j;
                num_Square_Types = 1;
                for (let diag_Itr_I = i; diag_Itr_I < const_Slot_States.length; diag_Itr_I++)
                {
                    diag_Itr_J++;
                    if (diag_Itr_I > const_Slot_States.length || diag_Itr_J > const_Slot_States[0].length)
                    {
                        break;
                    }else
                    {
                        if (const_Slot_States[diag_Itr_I][diag_Itr_J] == square_Type)
                        {
                            num_Square_Types++;
                        }else
                        {
                            num_Square_Types = 1;
                        }
                    }
                }

                diag_Itr_J = j;
                for (let diag_Itr_I = i; diag_Itr_I < const_Slot_States.length; diag_Itr_I--)
                {
                    diag_Itr_J--;
                    if (diag_Itr_I < 0 || diag_Itr_J < 0)
                    {
                        break;
                    }else
                    {
                        if (const_Slot_States[diag_Itr_I][diag_Itr_J] == square_Type)
                        {
                            num_Square_Types++;
                        }else
                        {
                            num_Square_Types = 1;
                        }
                    }
                }
            }
        }

        if (num_Square_Types == this.Winning_Score)
        {
            return true;
        }else
        {
            return false;
        }
    }

    Game_Over(msg)
    {
        console.log(msg);
        throw("Program was terminated because the enemy or the player won.");
    }
};