//// generate sodoku board 

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];


// can eventually add more complex shiit like solvable using given strageiges 


function checkFull(board) {


    for(let x = 0; x < 9; x++) {
        for(let y = 0; y < 9; y++) {
            if(board[x][y] === "-1") {
                return false
            }

        }
    }
    return true;
}

// make this faster 
function checkBoard(board) {

    for(let x= 0; x < 9; x++) {
        for(let y = 0; y < 9; y++) {
            if(board[x][y] !== "-1") {
                if(!generCheckUnq(board[x][y], x, y, board)) {
                    return false;
                }
            }
        }
    }
    return true;
}

function generCheckUnq(num, x, y, board) {
    
    // check block

    const bigRow = Math.floor(x/3);
    const bigCol = Math.floor(y/3);

    for(let i = bigRow * 3; i < bigRow * 3 + 3; i++) {
        for(let j = bigCol * 3; j < bigCol * 3 + 3; j++) {

            if((board[i][j] === num) && (i !== x) && (j !== y)) {
                return false;
            }


        }
    }
    
    // check row

    for(let i = 0; i < 9; i++) {
        if((board[x][i] === num) && (i !== y)) {
            return false;
        }
        
    }

    for(let i = 0; i < 9; i++) {
        if((board[i][y] === num) && (i !== x)) {
            return false;
        }
    }


    return true;


}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
    
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function backtrackingFill(partial_board) {


    // abanden partial solution if incorrect ---- dont need this but might improve runtime 
    // if(!checkBoard(partial_board)) {
    //     return false;

    // }

    // return complete solution --- might need this??? - doesn't seem like it 
    // if(checkFull(partial_board) && checkBoard(partial_board)) {
    //     return partial_board
    // }


    // find next empty 
    let empty = false
    for(let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(partial_board[i][j] === "-1") {
                var x = i;
                var y = j;
                empty = true;
                break;
            }
        }
        if(empty){
            break;
        }

    }

    // found correct solution because it is correct and now we know that it is full 
    if(!empty) {
        return true
    }



    // go through rest of board starting with first empty space
    for(let xi = x; x < 9; x++) {
        for(let yi = y; y < 9; y++) {


            // get the numbers this space could possibly be 
            let poss = numbers.map(n => n);
            
            // get rid others in row
            for(let i = 0; i < yi; i++) {
                poss.splice(poss.indexOf(partial_board[xi][i]), 1)
            }

            // collumn
            for(let j = 0; j < xi; j++) {
                let toD = poss.indexOf(partial_board[j][yi])
                if(toD !== -1) {
                    poss.splice(toD, 1);
                }
            }

            // square
            const bigRow = Math.floor(x/3);
            const bigCol = Math.floor(y/3);
        
            // bigRow * 3 + 3
            // bigCol * 3 + 3
            for(let row = bigRow * 3; row < bigRow * 3 + 3; row++) {
                for(let col = bigCol * 3; col < bigCol * 3 + 3; col++) {
                    let toD = poss.indexOf(partial_board[row][col])
                    if(toD !== -1) {
                        poss.splice(toD, 1);
                    }
                }
            }




            shuffleArray(poss);
            
            // get random array of options left 
            for(let c = 0; c < poss.length; c++) {
                partial_board[xi][yi] = poss[c];
                if(backtrackingFill(partial_board)) {
                    return partial_board;
                }
                // } else {
                //     backtrackingFill(old_board);
                // }
            }

            // go back a layer, none of the option worked, for some reason partial_solution sicks around 
            // so have to set it to -1
            partial_board[xi][yi] = "-1"
            return false;
        //}


        }
        y = 0
        x = x++;
    }

    //return true;
    // grow the partial solution
    



}



// function recursiveFill() {

//     // base case 

//     // check finish

//     // add to possible solution
    
// }

function fillGrid() {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];


    let board = [];

    // first create "empty" board
    for(let i = 0; i < 9; i++) {
        board[i] = []
        for(let j = 0; j < 9; j++) {
            board[i][j] = "-1";
        }
    }


    let x = 0;
    let y = 0;


    // really need to make this backtracking

    // while(true) {
    //     console.log("here")
    //     console.log(x);
    //     if(y === 9) {
    //         y = 0;
    //         x++;
    //     }
    //     if(x === 9) {
    //         console.log("FINISH")
    //         break;
    //     }
    //     let tmp = numbers[getRandomInt(9)];
    //     if(generCheckUnq(tmp, x, y, board)) {
    //         board[x][y] = tmp;
    //         y++;
    //     }
    // }

    // now have completed board

    

    // let board = board.map(arr => {

    //     arr = arr.map(el => {
    //         let num = numbers[getRandomInt(9)];
    //     })

    // })

    const full_board = backtrackingFill(board);

    if(!checkBoard(full_board)) {
        return board;
    }


  



    return full_board;




};