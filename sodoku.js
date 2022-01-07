"use strict";

// let notes = false;



/*

Think the solution is to wrap it all in a div and make input abolsute psotioning, problem is that container for the two 
is last div not td

*/


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


            let textContainer = document.createElement("div");
            textContainer.classList.add("textContainer");


           


            // cell.innerText = 4;
        
            let input = document.createElement("input");
            // TODO maybe have this be part of cell too or just part of cell
            input.id = `cell${i.toString()}${j.toString()}`;
            input.classList.add("bigN")
            input.type = "text";
            // input.pattern = "/[1-9]/";

            input.maxLength = "1"

            // input.type = "number"
            // input.min = "1"

        
            input.autocomplete = "off";

            //let notes = document.createElement("input");
            
    
            


            let notesContainer = document.createElement("div");
            notesContainer.classList.add("notesC")
            
            for(let a = 0; a < 3; a++) {
                let notesRow = document.createElement("div");
                notesRow.classList.add("notesRow");
                notesContainer.appendChild(notesRow);
                for(let b = 0; b < 3; b++) {
                    
                    
                    let note = document.createElement("div");

                    note.classList.add("note");

                    note.classList.add(`note${((a+1) * 3) - (2 - b)}`)





                    // let noteT = document.createElement("input")
                    // noteT.classList.add("noteT");
                    // noteT.value = "1"
                    
                    // note.appendChild(noteT);
                    //note.innerText="";
                    notesRow.appendChild(note);
                    
                    
         

                    
                }
                textContainer.appendChild(input);
                textContainer.appendChild(notesContainer);
                cell.appendChild(textContainer);
                row.appendChild(cell); 

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

function createCheckbox() {

    const parser = new DOMParser();

    const checkbox = parser.parseFromString(`
        <div>
            <input type="checkbox" id="notesCheckbox" name="notesCheckbox">
            <label for="notesCheckbox">Notes Mode?</label>
        </div>
    `, "text/html");



    document.querySelector("#notes-checkbox-container").appendChild(checkbox.body.firstElementChild);


    
}

function enterNumber() {


    // add or delete note 
    if(document.querySelector("#notesCheckbox").checked) {
        let note = this.parentElement.querySelector(`.note${this.value}`);
        if(note.innerText == this.value) {
            note.innerText = "";
        }
        else if(this.value == "") {
            this.parentElement.querySelector(".notesC").style.display = "inline"
        } 
        else {
            note.innerText = this.value;
        }
        this.value = "";
    } 
    else {
        if(this.value == "") {
            this.parentElement.querySelector(".notesC").style.display = "inline"
        } else {
            this.parentElement.querySelector(".notesC").style.display = "none"
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
        createCheckbox();
        document.querySelectorAll(".bigN").forEach(el => {
    
            el.addEventListener("input", enterNumber);
            // also need to make it so you don't need to delete input to enter new number and non 1-9 does nothing
            el.addEventListener("keydown", evt => {
                if(evt.key === "Backspace" || evt.key === "Delete") {
                    // make function to delete all of the inner text - not just hide 
                }
            });
        });


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
            evt.preventDefault;

            if(document.querySelector("#notesCheckbox").checked){
                document.querySelector("#notesCheckbox").checked = false;

            } else {
                document.querySelector("#notesCheckbox").checked = true;
            }


            // if(notes){
            //     notes = false
            // } else {
            //     notes = true;
            // }
        }
    });

    
    

});

