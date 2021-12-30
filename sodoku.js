"use strict";

let notes = false;



function createBoard() {
    const table = document.createElement("table");
    table.id = "sodoku-table";
    const body = document.createElement("tbody");
    body.id = "sodoku-body"
    table.appendChild(body);

    // create grid
    for(let i=0; i < 9; i++) {
        let row = document.createElement("tr");
        row.classList.add("row")
        body.appendChild(row);
        for(let j=0; j < 9; j++) {
            let cell = document.createElement("td");
            cell.classList.add("cell", `row${i.toString()}`, `col${j.toString()}`);

           


            // cell.innerText = 4;
        
            let input = document.createElement("input");
            // TODO maybe have this be part of cell too or just part of cell
            input.id = `cell${i.toString()}${j.toString()}`;
            input.classList.add("bigN")
            input.type = "text";
            input.pattern = "/[1-9]/";

            input.maxLength = "1"

            // input.type = "number"
            // input.min = "1"

        
            input.autocomplete = "off";

            //let notes = document.createElement("input");
            
    
            cell.appendChild(input);
            row.appendChild(cell); 


            let notesContainer = document.createElement("div");
            notesContainer.classList.add("notesC")
            
            for(let a = 0; a < 3; a++) {
                let notesRow = document.createElement("div");
                notesContainer.appendChild(notesRow);
                for(let b = 0; b < 3; b++) {
                    let note = document.createElement("div");
                    //note.innerText="1"
                    notesRow.appendChild(note);
                    
                    let noteT = document.createElement("input")
                    noteT.classList.add("noteT");
                    noteT.value = "1"
         

                    
                }
                cell.appendChild(notesContainer);

            }





        }
    }

    return table;
}



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}






// TODO make this return the number(s) it conflixts with so I can display a dot or something 
function checkUnq(num, x, y) {
    
    // check block
    const bigRow = Math.floor(x/3);
    const bigCol = Math.floor(y/3);

    for(let i = bigRow * 3; i < bigRow * 3 + 3; i++) {
        for(let j = bigCol * 3; j < bigCol * 3 + 3; j++) {
            if(document.querySelector(`#cell${i.toString()}${j.toString()}`).value === num) {
                return false;
            }
        }
    }
    

    let not = false;

    // check row
    document.querySelectorAll(`.row${x.toString()} input`).forEach(node => {
        if(node.value === num) {
            not = true;
        }
    });


    // check collumn 
    document.querySelectorAll(`.col${y.toString()} input`).forEach(node => {
        if(node.value === num) {
            not = true
        }
    });

    // test comment 


    if(not) {
        return false
    } else {
        return true
    }


}

// populate board given difficultity
function populateBoard(diff) {

    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let givens


    if(diff === 0) {
        // todo make this reasonable
        givens = getRandomInt(4) + 30
        //givens = 20
    } else if (diff === 1) {
        givens = getRandomInt(3) + 15

    } else {
        givens = getRandomInt(2) + 13
    }

    for(let i = 0; i < givens; i++) {
        
        // get random elements
        let x = getRandomInt(9);
        let y = getRandomInt(9)
        let cell = document.querySelector(`#cell${x.toString()}${y.toString()}`);
        let num = numbers[getRandomInt(9)];
        num = num.toString();




        // TODO check unqie given num and cell 
        let unq = checkUnq(num, x, y);

        if(unq) {
            cell.value = num
            cell.disabled = true;

            // TODO this isnt working
        } else {
            i--;
        }

        

    }


    // TODO check if there is only one solution - maybe do this before in like an array, or just do it here and repopulate

    // also check if there is a solution period

    // this is gonna be big... can you solve the puzzle without guessing?? a lot goes into setting sodokus..
    // https://f-puzzles.com/  https://www.101computing.net/sudoku-generator-algorithm/   https://www.youtube.com/watch?v=Ui1hrp7rovw

    // def use backtracking and other stuff from algs for solving the puzzle and checking if you won







}


function populateWithArray(arr) {


    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(arr[i][j] !== "-1") {
                let cell = document.querySelector(`#cell${i.toString()}${j.toString()}`);
                cell.value = arr[i][j];
                cell.disabled = true;
            }
        }
    }
}


window.addEventListener("load", () => {




    // TODO async?  --- make some shit promises - homemade


    document.querySelector("#easybtn").addEventListener("click", (evt) => {
        evt.preventDefault;
        document.querySelector("#btn-container").remove();
        const board = createBoard();
        document.querySelector("#sodoku-container").appendChild(board);
        //populateBoard(0);

        // TODO make fill grid return a promise and display loading message here 
        populateWithArray(fillGrid());

    });

    document.querySelector("#mediumbtn").addEventListener("click", (evt) => {
        evt.preventDefault;
        document.querySelector("#btn-container").remove();
        const board = createBoard();
        document.querySelector("#sodoku-container").appendChild(board);
        populateBoard(1);
    });

    document.querySelector("#hardbtn").addEventListener("click", (evt) => {
        evt.preventDefault;
        document.querySelector("#btn-container").remove();
        const board = createBoard();
        document.querySelector("#sodoku-container").appendChild(board);
        populateBoard(2);
    });

    document.addEventListener("keydown", (evt) => {
        evt.preventDefault;
        if(evt.key === "Tab") {
            if(notes){
                notes = false
            } else {
                notes = true;
            }
        }
    });
});

