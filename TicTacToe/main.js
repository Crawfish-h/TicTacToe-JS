import * as Game from "./Game_Manager.js"
import * as Game_Check from "./Game_End_Check.js"

let game_Size = 3; 

// Entering in different values for arguments will break the diagonal scoring system.
const game_Manager = new Game.Game_Manager(game_Size, game_Size, game_Size); 
const game_Check = new Game_Check.Game_End_Check(game_Manager.Winning_Score)

let is_Players_Turn = false;

if (Game.IRandom_Range(0, 100) >= 50)
{
    is_Players_Turn = true;
}else
{
    is_Players_Turn = false;
}



while (game_Manager.State == Game.Game_States.Running)
{
    if (is_Players_Turn == true)
    {
        is_Players_Turn = false;
        game_Manager.Players_Turn();
        game_Manager.Print_Table();

        if (game_Check.Horizontal_Check(game_Manager.Slot_States, Game.player_Icon) == true ||
            game_Check.Vertical_Check(game_Manager.Slot_States, Game.player_Icon) == true ||
            game_Check.Diagonal_Check_Up(game_Manager.Slot_States, Game.player_Icon) == true ||
            game_Check.Diagonal_Check_Down(game_Manager.Slot_States, Game.player_Icon) == true)
        {
            game_Check.Game_Over("The Player won the game!");
        }
    }

    if (is_Players_Turn == false)
    {
        is_Players_Turn = true;
        game_Manager.Enemy_Turn();
        game_Manager.Print_Table();
        
        if (game_Check.Horizontal_Check(game_Manager.Slot_States, Game.enemy_Icon) == true ||
            game_Check.Vertical_Check(game_Manager.Slot_States, Game.enemy_Icon) == true ||
            game_Check.Diagonal_Check_Up(game_Manager.Slot_States, Game.enemy_Icon) == true ||
            game_Check.Diagonal_Check_Down(game_Manager.Slot_States, Game.enemy_Icon) == true)
        {
            game_Check.Game_Over("The enemy won the game...");
        }
    }
}

/*
const prompt = prompt_Sync();
const age = prompt("How old are you? ");
console.log(`You are ${age} years old.`);
console.clear();
*/

