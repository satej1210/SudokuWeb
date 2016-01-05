var Steps = [];

function Cell(state) {
    //"use strict";
    this.state = state;
    this.is_filled = false;
    this.possibilities = [true, true, true, true, true, true, true, true, true];
    this.GetState = function () {
        return this.state;
    };
    this.ChangePossibility = function (Pos, toState, Row, Col) {

        var id = "n" + Row.toString() + Col.toString() + Pos.toString();
        var box = document.getElementById(id);
        if (box != null) {
            //console.log(id);

            if (toState && !this.possibilities[Pos]) {

                box.style.backgroundColor = "Green";
            } else if (this.possibilities[Pos] && !toState) {
                $(box).velocity({backgroundColor: "#FF0000"}, 100);
                

            }
           
            setTimeout(function () {
                $(box).velocity({backgroundColor: "#FFFFFF"}, 100);
            }, 750);


        }
        this.possibilities[Pos] = toState;
    }
    this.ChangeState = function (x) {
        "use strict";
        var i;
        this.state = x;
        this.is_filled = true;
        for (i = 0; i < 9; i = i + 1) {
            this.possibilities[i] = false;
        }

    }


}

var sudoku = [[new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)]];
//#define cf(name) for(int i=1; i<=9; i++){name(i);}
//#define cf2(name) for(int i=0; i<9; i+=3) for(int j=0; j<9; j+=3) name(i,j);
var Step = 0;

function NakedAll() {
    var stop;
    for (var i = 1; i <= 9; i++) {
        NakedPairRow(i);
    }
    for (var i = 1; i <= 9; i++) {
        NakedPairColumn(i);
    }
    for (var i = 0; i < 9; i += 3)
        for (var j = 0; j < 9; j += 3) NakedPairBox(i, j);

    for (var i = 1; i <= 9; i++) {
        NakedTripleRow(i);
    }
    for (var i = 1; i <= 9; i++) {
        NakedTripleColumn(i);
    }
    for (var i = 1; i <= 9; i++) {
        NakedQuadRow(i)
    }
    for (var i = 1; i <= 9; i++) {
        NakedQuadColumn(i);
    }
}

function UpdateStepCNT(Step1) {
    if (Step1 === undefined) {
        document.getElementById("StepCNT").textContent = "Step " + Step + " of " + Steps.length;
    } else {
        document.getElementById("StepCNT").textContent = "Step " + Step1 + " of " + Steps.length;
    }
}

function PrevStep(x) {


    {
        if (Step > 0) {
            resetPuzzle();
            GetPuz();

            for (var i = 0; i < Step; i++) {
                eval(Steps[i]);
                if(i%5==0)
                    CheckAll();

            }
            Step--;
            DrawGrid();
        }
    }

    UpdateStepCNT();
}
var timeoutHandle = null;
function callNTimes(func, num, delay) {
    if (!num) return;
    func();
    timeoutHandle = setTimeout(function() { callNTimes(func, num - 1, delay); }, delay);
}

var SSCalled = 0;
function SlowSolve()
{
    if(!SSCalled){
    Step=0;
    resetPuzzle();
    SSCalled = 1;
    }
    if(GetPuz()){
    if(timeoutHandle!=null)
        clearTimeout(timeoutHandle);
    //intervalHandle = null;
        callNTimes(NextStep, Steps.length, 750);
        SSCalled = 0;
    }
    
}
function StopSS()
{
    if(timeoutHandle!=null)
        clearTimeout(timeoutHandle);
}
function NextStep() {


    if (Step > 0 && Step < Steps.length) {
         document.getElementById("Log").value+="\n---Step "+Step+"---";
        eval(Steps[Step]);
        Step++;
        CheckAll();
       //AllHiddenSingles();
        DrawGrid();

    } else if (Step < Steps.length - 1) {
        resetPuzzle();
        GetPuz();
        Step++;
        DrawGrid();
    }

    UpdateStepCNT();
}

function NakedQuadRow(RowNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {
            for (var Number3 = Number2 + 1; Number3 <= 9; Number3++) {
                for (var Number4 = Number3 + 1; Number4 <= 9; Number4++) {
                    var outerflag = 0;
                    var store = [-1, -1, -1, -1];
                    var index = 0;

                    for (var i = 0; i < 9; i++) {
                        var FalseNum = 0;
                        var TrueNum = 0;

                        if (sudoku[RowNumber - 1][i].possibilities[Number1 - 1] || sudoku[RowNumber - 1][i].possibilities[Number2 - 1] || sudoku[RowNumber - 1][i].possibilities[Number3 - 1] || sudoku[RowNumber - 1][i].possibilities[Number4 - 1]) {
                            if (sudoku[RowNumber - 1][i].possibilities[Number1 - 1])
                                TrueNum++;
                            if (sudoku[RowNumber - 1][i].possibilities[Number2 - 1])
                                TrueNum++;
                            if (sudoku[RowNumber - 1][i].possibilities[Number3 - 1])
                                TrueNum++;
                            if (sudoku[RowNumber - 1][i].possibilities[Number4 - 1])
                                TrueNum++;


                            for (var x = 1; x <= 9; x++) {
                                if (!(sudoku[RowNumber - 1][i].possibilities[x - 1]))
                                    FalseNum++;
                            }
                            if (FalseNum == (9 - TrueNum)) {
                                outerflag++;
                                store[index] = i;
                                index++;
                            }
                        }
                    }
                    if (outerflag == 4) {
                        document.getElementById("Log").value += "\nNaked Quad found at Row " + RowNumber;
                        if (Step == 0) {
                            Steps.push("NakedQuadRow(" + RowNumber + ");");
                        }
                        for (var i = 0; i < 9; i++) {
                            if (i != store[0] && i != store[1] && i != store[2] && i != store[3]) {
                                sudoku[RowNumber - 1][i].ChangePossibility(Number1 - 1, false, RowNumber - 1, i);
                                sudoku[RowNumber - 1][i].ChangePossibility(Number2 - 1, false, RowNumber - 1, i);
                                sudoku[RowNumber - 1][i].ChangePossibility(Number3 - 1, false, RowNumber - 1, i);
                                sudoku[RowNumber - 1][i].ChangePossibility(Number4 - 1, false, RowNumber - 1, i);
                            }
                        }

                    }
                }
            }
        }
    }
}

function NakedQuadColumn(ColumnNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {
            for (var Number3 = Number2 + 1; Number3 <= 9; Number3++) {
                for (var Number4 = Number3 + 1; Number4 <= 9; Number4++) {
                    var outerflag = 0;
                    var store = [-1, -1, -1, -1];
                    var index = 0;

                    for (var i = 0; i < 9; i++) {
                        var FalseNum = 0;
                        var TrueNum = 0;

                        if (sudoku[i][ColumnNumber - 1].possibilities[Number1 - 1] || sudoku[i][ColumnNumber - 1].possibilities[Number2 - 1] || sudoku[i][ColumnNumber - 1].possibilities[Number3 - 1] || sudoku[i][ColumnNumber - 1].possibilities[Number4 - 1]) {
                            if (sudoku[i][ColumnNumber - 1].possibilities[Number1 - 1])
                                TrueNum++;
                            if (sudoku[i][ColumnNumber - 1].possibilities[Number2 - 1])
                                TrueNum++;
                            if (sudoku[i][ColumnNumber - 1].possibilities[Number3 - 1])
                                TrueNum++;
                            if (sudoku[i][ColumnNumber - 1].possibilities[Number4 - 1])
                                TrueNum++;


                            for (var x = 1; x <= 9; x++) {
                                if (!(sudoku[i][ColumnNumber - 1].possibilities[x - 1]))
                                    FalseNum++;
                            }
                            if (FalseNum == (9 - TrueNum)) {
                                outerflag++;
                                store[index] = i;
                                index++;
                            }
                        }
                    }
                    if (outerflag == 4) {
                        document.getElementById("Log").value += "\nNaked Quad found at column" + ColumnNumber;
                        if (Step == 0) {
                            Steps.push("NakedQuadColumn(" + ColumnNumber + ");");
                        }
                        for (var i = 0; i < 9; i++) {
                            if (i != store[0] && i != store[1] && i != store[2] && i != store[3]) {
                                sudoku[i][ColumnNumber - 1].ChangePossibility(Number1 - 1, false, i, ColumnNumber - 1);
                                sudoku[i][ColumnNumber - 1].ChangePossibility(Number2 - 1, false, i, ColumnNumber - 1);
                                sudoku[i][ColumnNumber - 1].ChangePossibility(Number3 - 1, false, i, ColumnNumber - 1);
                                sudoku[i][ColumnNumber - 1].ChangePossibility(Number4 - 1, false, i, ColumnNumber - 1);
                            }
                        }
                        return;
                    }
                }
            }
        }
    }
}

function NakedTripleRow(RowNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {
            for (var Number3 = Number2 + 1; Number3 <= 9; Number3++) {
                var outerflag = 0;
                var store = [-1, -1, -1];
                var index = 0;

                for (var i = 0; i < 9; i++) {
                    var FalseNum = 0;
                    var TrueNum = 0;

                    if (sudoku[RowNumber - 1][i].possibilities[Number1 - 1] || sudoku[RowNumber - 1][i].possibilities[Number2 - 1] || sudoku[RowNumber - 1][i].possibilities[Number3 - 1]) {
                        if (sudoku[RowNumber - 1][i].possibilities[Number1 - 1])
                            TrueNum++;
                        if (sudoku[RowNumber - 1][i].possibilities[Number2 - 1])
                            TrueNum++;
                        if (sudoku[RowNumber - 1][i].possibilities[Number3 - 1])
                            TrueNum++;


                        for (var x = 1; x <= 9; x++) {
                            if (!(sudoku[RowNumber - 1][i].possibilities[x - 1]))
                                FalseNum++;
                        }
                        if (FalseNum == (9 - TrueNum)) {
                            outerflag++;
                            store[index] = i;
                            index++;
                        }
                    }
                }
                if (outerflag == 3) {
                    document.getElementById("Log").value += "\nNaked Triple found at row" + RowNumber;
                    if (Step == 0) {
                        Steps.push("NakedTripleRow(" + RowNumber + ");");
                    }
                    for (var i = 0; i < 9; i++) {
                        if (i != store[0] && i != store[1] && i != store[2]) {
                            sudoku[RowNumber - 1][i].ChangePossibility(Number1 - 1, false, RowNumber - 1, i);
                            sudoku[RowNumber - 1][i].ChangePossibility(Number2 - 1, false, RowNumber - 1, i);
                            sudoku[RowNumber - 1][i].ChangePossibility(Number3 - 1, false, RowNumber - 1, i);

                        }
                    }
                }
            }
        }
    }

}

function NakedTripleColumn(ColumnNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {
            for (var Number3 = Number2 + 1; Number3 <= 9; Number3++) {
                var outerflag = 0;
                var store = [-1, -1, -1];
                var index = 0;

                for (var i = 0; i < 9; i++) {
                    var FalseNum = 0;
                    var TrueNum = 0;

                    if (sudoku[i][ColumnNumber - 1].possibilities[Number1 - 1] || sudoku[i][ColumnNumber - 1].possibilities[Number2 - 1] || sudoku[i][ColumnNumber - 1].possibilities[Number3 - 1]) {
                        if (sudoku[i][ColumnNumber - 1].possibilities[Number1 - 1])
                            TrueNum++;
                        if (sudoku[i][ColumnNumber - 1].possibilities[Number2 - 1])
                            TrueNum++;
                        if (sudoku[i][ColumnNumber - 1].possibilities[Number3 - 1])
                            TrueNum++;


                        for (var x = 1; x <= 9; x++) {
                            if (!(sudoku[i][ColumnNumber - 1].possibilities[x - 1]))
                                FalseNum++;
                        }
                        if (FalseNum == (9 - TrueNum)) {
                            outerflag++;
                            store[index] = i;
                            index++;
                        }
                    }
                }
                if (outerflag == 3) {
                    document.getElementById("Log").value += "\nNaked Triple found at column " + ColumnNumber;
                    if (Step == 0) {
                        Steps.push("NakedTripleColumn(" + ColumnNumber + ");");
                    }
                    for (var i = 0; i < 9; i++) {
                        if (i != store[0] && i != store[1] && i != store[2]) {
                            sudoku[i][ColumnNumber - 1].ChangePossibility(Number1 - 1, false, i, ColumnNumber - 1);
                            sudoku[i][ColumnNumber - 1].ChangePossibility(Number2 - 1, false, i, ColumnNumber - 1);
                            sudoku[i][ColumnNumber - 1].ChangePossibility(Number3 - 1, false, i, ColumnNumber - 1);
                        }
                    }
                }
            }
        }
    }

}

function NakedPairRow(RowNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {

            var outerflag = 0;
            var store = [-1, -1];
            var index = 0;

            for (var i = 0; i < 9; i++) {
                var innerflag = 0;

                if (sudoku[RowNumber - 1][i].possibilities[Number1 - 1] && sudoku[RowNumber - 1][i].possibilities[Number2 - 1]) {
                    for (var x = 1; x <= 9; x++) {
                        if (sudoku[RowNumber - 1][i].possibilities[x - 1])
                            innerflag++;
                    }
                    if (innerflag == 2) {
                        outerflag++;
                        store[index] = i;
                        index++;
                    }
                }
            }
            if (outerflag == 2) {
                document.getElementById("Log").value += "\nNaked Pair found at row " + RowNumber;
                if (Step == 0) {
                    Steps.push("NakedPairRow(" + RowNumber + ");");
                }
                for (var i = 0; i < 9; i++) {
                    if (i != store[0] && i != store[1]) {
                        sudoku[RowNumber - 1][i].ChangePossibility(Number1 - 1, false, RowNumber - 1, i);
                        sudoku[RowNumber - 1][i].ChangePossibility(Number2 - 1, false, RowNumber - 1, i);
                    }
                }
            }
        }
    }
}

function NakedPairColumn(ColumnNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {

            var outerflag = 0;
            var store = [-1, -1];
            var index = 0;

            for (var i = 0; i < 9; i++) {
                var innerflag = 0;

                if (sudoku[i][ColumnNumber - 1].possibilities[Number1 - 1] && sudoku[i][ColumnNumber - 1].possibilities[Number2 - 1]) {
                    for (var x = 1; x <= 9; x++) {
                        if (sudoku[i][ColumnNumber - 1].possibilities[x - 1])
                            innerflag++;
                    }
                    if (innerflag == 2) {
                        outerflag++;
                        store[index] = i;
                        index++;
                    }
                }
            }
            if (outerflag == 2) {
                document.getElementById("Log").value += "\nNaked Pair found at column " + ColumnNumber;
                if (Step == 0) {
                    Steps.push("NakedPairColumn(" + ColumnNumber + ");");
                }
                for (var i = 0; i < 9; i++) {
                    if (i != store[0] && i != store[1]) {
                        sudoku[i][ColumnNumber - 1].ChangePossibility(Number1 - 1, false, i, ColumnNumber - 1);
                        sudoku[i][ColumnNumber - 1].ChangePossibility(Number2 - 1, false, i, ColumnNumber - 1);
                    }
                }
            }
        }
    }
}

function NakedPairBox(RowNumber, ColumnNumber) {
    for (var Number1 = 1; Number1 <= 9; Number1++) {
        for (var Number2 = Number1 + 1; Number2 <= 9; Number2++) {

            var outerflag = 0;
            var store = [-1, -1, -1, -1];
            var index = 0;

            for (var i = RowNumber; i < RowNumber + 3; i++) {
                for (var j = ColumnNumber; j < ColumnNumber + 3; j++) {
                    var innerflag = 0;

                    if (sudoku[i][j].possibilities[Number1 - 1] && sudoku[i][j].possibilities[Number2 - 1]) {
                        for (var x = 1; x <= 9; x++) {
                            if (sudoku[i][j].possibilities[x - 1])
                                innerflag++;
                        }

                        if (innerflag == 2) {
                            outerflag++;
                            store[index] = i;
                            store[index + 1] = j;
                            index += 2;
                        }
                    }
                }
            }
            if (outerflag == 2) {
                document.getElementById("Log").value += "\nNaked Pair found at box indices " + RowNumber + " " + ColumnNumber;
                var newindex = 0;
                for (var i = RowNumber; i < RowNumber + 3; i++) {
                    for (var j = ColumnNumber; j < ColumnNumber + 3; j++) {
                        if (i == store[newindex] && j == store[newindex + 1]) {
                            newindex += 2;
                        } else {
                            sudoku[i][j].ChangePossibility(Number1 - 1, false, i, j);
                            sudoku[i][j].ChangePossibility(Number2 - 1, false, i, j);
                        }
                    }
                }
            }
        }
    }

}

function LC_f11(i, j) //row in box
{
    var GetNumberArray;
    for (var x = 1; x <= 9; x++) {
        GetNumberArray = ReturnBoxPossibilities(x, i, j);
        if (GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2])
            if ((GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < j || b >= j + 3) {
                        sudoku[i][b].ChangePossibility(x - 1, false, i, b);

                    }
                }
            }

        if (GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < j || b >= j + 3) {
                        sudoku[i + 1][b].ChangePossibility(x - 1, false, i + 1, b);

                    }
                }

            }
        if (GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < j || b >= j + 3) {
                        sudoku[i + 2][b].ChangePossibility(x - 1, false, i + 2, b);

                    }
                }

            }



    }
}

function LC_f12(i, j) //column in box
{
    var GetNumberArray;
    for (var x = 1; x <= 9; x++) {
        GetNumberArray = ReturnBoxPossibilities(x, i, j);

        if (GetNumberArray[0] || GetNumberArray[3] || GetNumberArray[6])
            if ((GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[4] || GetNumberArray[5] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < i || b >= i + 3) {
                        sudoku[b][j].ChangePossibility(x - 1, false, b, j);

                    }
                }

            }

        if (GetNumberArray[1] || GetNumberArray[4] || GetNumberArray[7])
            if ((GetNumberArray[0] || GetNumberArray[2] || GetNumberArray[3] || GetNumberArray[5] || GetNumberArray[6] || GetNumberArray[8]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < i || b >= i + 3) {
                        sudoku[b][j + 1].ChangePossibility(x - 1, false, b, j + 1);

                    }
                }
            }
        if (GetNumberArray[2] || GetNumberArray[5] || GetNumberArray[8])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[6] || GetNumberArray[7]) == false) {
                for (var b = 0; b < 9; b++) {
                    if (b < i || b >= i + 3) {
                        sudoku[b][j + 2].ChangePossibility(x - 1, false, b, j + 2);

                    }
                }
            }



    }

}

function LC() {


    for (var i = 0; i < 9; i += 3) {
        for (var j = 0; j < 9; j += 3) {
            LC_f11(i, j);
            LC_f12(i, j);
        }
    }
    if (Step == 0) {
        Steps.push("LC();");
    }
}

function LC_f21(i) //row
{
    var GetNumberArray;
    for (var x = 1; x <= 9; x++) {
        GetNumberArray = ReturnRowPossibilities(x, i);

        if (GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2])
            if ((GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                var left_row_num = parseInt((i) / 3) * 3;
                var left_col_num = 0;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (a != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b); //Steps.push("LC_f21(" + i + ");");
                        }
                    }

                }
            }

        if (GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                var left_row_num = parseInt((i) / 3) * 3;
                var left_col_num = 3;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (a != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b);
                            if (Step == 0) {
                                //Steps.push("LC_f21(" + i + ");");   
                            }
                        }
                    }

                }
            }

        if (GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5]) == false) {
                var left_row_num = parseInt((i) / 3) * 3;
                var left_col_num = 6;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (a != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b);
                            if (Step == 0) {
                                //Steps.push("LC_f21(" + i + ");");
                            }
                        }
                    }

                }
            }


    }

}

function LC_f22(i) //column
{
    var GetNumberArray;
    for (var x = 1; x <= 9; x++) {
        GetNumberArray = ReturnColPossibilities(x, i);

        if (GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2])
            if ((GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                var left_col_num = parseInt((i) / 3) * 3;
                var left_row_num = 0;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (b != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b);

                        }
                    }

                }
            }

        if (GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8]) == false) {
                var left_col_num = parseInt((i) / 3) * 3;
                var left_row_num = 3;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (b != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b);
                            //if (Step == 0)

                        }
                    }

                }
            }

        if (GetNumberArray[6] || GetNumberArray[7] || GetNumberArray[8])
            if ((GetNumberArray[0] || GetNumberArray[1] || GetNumberArray[2] || GetNumberArray[3] || GetNumberArray[4] || GetNumberArray[5]) == false) {
                var left_col_num = parseInt((i) / 3) * 3;
                var left_row_num = 6;

                for (var a = left_row_num; a < left_row_num + 3; a++) {
                    for (var b = left_col_num; b < left_col_num + 3; b++) {
                        if (b != i) {
                            sudoku[a][b].ChangePossibility(x - 1, false, a, b);
                            
                            //if (Step == 0)

                        }
                    }

                }
            }


    }

}

function LC2() {
    for (var i = 0; i < 9; i++) {
        LC_f21(i);
        LC_f22(i);
    }
    if (Step == 0) {
        Steps.push("LC2();");
    }

}

function DrawGridOnly() {
    var i, j, m, text = "";
    resetPuzzle();
    GetPuz();
    //sudoku[0][2].ChangeState(2);
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
var id = "c";
            id += i.toString() + j.toString();
            var cell = document.getElementById(id);
            var state;
            if(sudoku[i][j].GetState()==0) state = "";
            else state = sudoku[i][j].GetState();
            cell.innerHTML = "<td id=\"cell\"><input id =\"" + id + "9" + "\" class=\"full\" value=\"" + state + "\"maxlength=\"1\" size=\"1\"/></td>";
        }
    }
}

function changeBGToGreen(inner) {
    setTimeout(function () {
        $(inner).velocity({backgroundColor: "#22FF33"} , 200);
    }, 0);
}

function changeBGToWhite(inner) {
    setTimeout(function () {
        $(inner).velocity({backgroundColor: "#FFFFFF"} , 300);
    }, 750);
}

function DrawGrid() {
    //document.getElementById("MainPos").style="display:flex";
    //document.getElementById("Main").style="display:block";
    var i, j, m, text = "";
    document.getElementById("Log").scrollTop = document.getElementById("Log").scrollHeight + 1;
    //sudoku[0][2].ChangeState(2);
    for (i = 0; i < 9; i++) {
        for (m = 0; m < 3; m++) {
            for (j = 0; j < 9; j++) {
                var id = "c";
                id += i.toString() + j.toString();

                if (sudoku[i][j].is_filled) {

                    var cell = document.getElementById(id);


                    var innerCell = document.getElementById(id + 9);

                    if (innerCell === null) {
                        cell.innerHTML = "<td id=\"cell\"><input id =\"" + id + "9" + "\" class=\"full\" value=\"" + sudoku[i][j].GetState() + "\"maxlength=\"1\" size=\"1\"/></td>";
                        innerCell = document.getElementById(id + 9);
                        changeBGToGreen(innerCell);
                        changeBGToWhite(innerCell);
                    } else {


                    }
                } else {
                    if (sudoku[i][j].possibilities[m * 3 + 0] == true && !sudoku[i][j].is_filled) {
                        var id = "n";
                        var l = m * 3 + 0;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);

                        pos.value = (m * 3 + 1);
                    } else if (sudoku[i][j].is_filled == false || m != 0) {
                        var id = "n";
                        var l = m * 3 + 0;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);
                        pos.value = "";
                    }
                    if (sudoku[i][j].possibilities[m * 3 + 1] == true && !sudoku[i][j].is_filled) {
                        var id = "n";
                        var l = m * 3 + 1;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);
                        pos.value = (m * 3 + 2);
                    } else if (sudoku[i][j].is_filled == false || m != 0) {
                        var id = "n";
                        var l = m * 3 + 1;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);
                        pos.value = "";
                    }
                    if (sudoku[i][j].possibilities[m * 3 + 2] == true && !sudoku[i][j].is_filled) {
                        var id = "n";
                        var l = m * 3 + 2;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);
                        pos.value = (m * 3 + 3);
                    } else if (sudoku[i][j].is_filled == false || m != 0) {
                        var id = "n";
                        var l = m * 3 + 2;
                        id += i.toString() + j.toString() + l.toString();
                        var pos = document.getElementById(id);
                        pos.value = "";
                    }
                }
            }
        }
    }
}

function DrawGri2d() {

    DrawGrid2();
}

function CheckAllSingles() {
    var i, j, flag, store, k;
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            flag = -1;
            store = -1;
            for (k = 0; k < 9; k++) {
                if (sudoku[i][j].possibilities[k] == true) //to get flag and store
                {
                    flag++;
                    store = k;
                }
            }
            if (flag == 0) //if it is a single, change the state and check the row, column and boxes off.
            {
                document.getElementById("Log").value += "\nSingle Found at position " + i + " " + j;
                if (Step == 0) Steps.push("CheckAllSingles();");
                sudoku[i][j].ChangeState(store + 1);

            }
        }
    }
}

function CheckBox(FilledX, FilledY) {
    var a, b;
    a = parseInt((FilledX / 3)) * 3;
    b = parseInt((FilledY / 3)) * 3;
    if (sudoku[FilledX][FilledY].is_filled == true) {
        //if(Step==0)Steps.push("CheckBox(" +  FilledX + ", " + FilledY + ");");;
        for (var i = a; i <= a + 2; i++) {
            for (var j = b; j <= b + 2; j++) {
<<<<<<< HEAD
                if(Step==0 && (sudoku[k][c - 1].possibilities[i-1] && false))
                        {
                            Steps.push("CheckRow(" +  FilledX + ", " + FilledY + ");");
                        }
=======

>>>>>>> parent of 6400c62... Stashing...
                sudoku[i][j].ChangePossibility(sudoku[FilledX][FilledY].GetState() - 1, false, i, j);
            }
        }
    }
}

function CheckColumn(c) {
    for (var i = 1; i <= 9; i++) {
        for (var j = 1; j <= 9; j++) {
            if (sudoku[j - 1][c - 1].GetState() == i) {
                //if(Step==0)Steps.push("CheckColumn(" +  c + ");");;
                for (var k = 0; k < 9; k++) {
<<<<<<< HEAD
                    if(Step==0 && (sudoku[k][c - 1].possibilities[i-1] && false))
                        {
                            Steps.push("CheckColumn(" +  c + ");");
                        }
=======
>>>>>>> parent of 6400c62... Stashing...
                    sudoku[k][c - 1].ChangePossibility(i - 1, false, k, c - 1);
                    //
                }
                break;
            }
        }

    }
}

function CheckRow(r) {
    var i, j;
    for (i = 1; i <= 9; i++) {
        for (j = 1; j <= 9; j++) {
            if (sudoku[r - 1][j - 1].GetState() == i) {
                //if(Step==0)Steps.push("CheckRow(" +  r + ");");;
                for (k = 0; k < 9; k++) {
<<<<<<< HEAD
                    if(Step==0 && (sudoku[r-1][k].possibilities[i-1] && false))
                        {
                            Steps.push("CheckRow(" +  r + ");");
                        }
=======
>>>>>>> parent of 6400c62... Stashing...
                    sudoku[r - 1][k].ChangePossibility(i - 1, false, r - 1, k);
                    //Steps.push("CheckRow(" +  r + ");");
                }
                break;
            }
        }

    }
}

function ReturnBoxPossibilities(x, i, j) {
    var PossibleNumberArray = [true, true, true, true, true, true, true, true, true];
    var counter = 0;
    for (var a = i; a <= i + 2; a++) {
        for (var b = j; b <= j + 2; b++) {
            if (sudoku[a][b].possibilities[x - 1] == true)
                PossibleNumberArray[counter] = true;
            else
                PossibleNumberArray[counter] = false;
            counter++;

        }
    }

    return PossibleNumberArray;

}

function ReturnColPossibilities(x, j) {
    var PossibleNumberArray = [true, true, true, true, true, true, true, true, true];
    var counter = 0;
    for (var b = 0; b < 9; b++) {
        if (sudoku[b][j].possibilities[x - 1] == true)
            PossibleNumberArray[counter] = true;
        else
            PossibleNumberArray[counter] = false;
        counter++;

    }
    return PossibleNumberArray;
}

function ReturnRowPossibilities(x, j) {
    var PossibleNumberArray = [true, true, true, true, true, true, true, true, true];
    var counter = 0;
    for (var b = 0; b < 9; b++) {
        if (sudoku[j][b].possibilities[x - 1] == true)
            PossibleNumberArray[counter] = true;
        else
            PossibleNumberArray[counter] = false;
        counter++;

    }
    return PossibleNumberArray;
}

function CheckAll() {
    var i, j;
    for (i = 1; i <= 9; i++) {
        CheckRow(i);
        CheckColumn(i);
    }

    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            CheckBox(i, j);
        }
    }
}

function BoxHiddenSingles(x, y) {
    var flag = 0;
    var h = 0,
        l = 0;
    for (k = 1; k <= 9; k++) {
        flag = 0;
        for (i = x; i < x + 3; i++) {

            for (j = y; j < y + 3; j++) {
                if (sudoku[i][j].possibilities[k - 1] == true && sudoku[i][j].GetState() == 0) {
                    flag++;
                    h = j;
                    l = i;
                }
            }
        }
        if (flag == 1) {
            document.getElementById("Log").value += "\nBox Hidden Single found in box indices " + x + " " + y;
            if (Step == 0) {
                Steps.push("BoxHiddenSingles(" + x + ", " + y + ");");
            }
            sudoku[l][h].ChangeState(k);
            CheckAll();
        }
    }
}

function RowHiddenSingles(i) {
    var no = 0;
    var flag = 0;
    for (var j = 1; j <= 9; j++) {
        flag = 0;
        for (var k = 0; k < 9; k++) {
            if (sudoku[i][k].possibilities[j - 1] == true) {
                flag++;
                no = k;
            }
        }

        if (flag == 1) {
            document.getElementById("Log").value += "\nRow hidden single found in row " + i;

            if (Step == 0) {
                Steps.push("RowHiddenSingles(" + i + ");");
            }
            sudoku[i][no].ChangeState(j);
            CheckAll();
        }
    }


}

function ColumnHiddenSingles(i) {
    var no = 0;

    var flag = 0;
    for (var j = 1; j <= 9; j++) {
        flag = 0;
        for (var k = 0; k < 9; k++) {
            if (sudoku[k][i].possibilities[j - 1] == true) {

                flag++;
                no = k;

            }

        }
        if (flag == 1) {
            if (Step == 0) {

                Steps.push("ColumnHiddenSingles(" + i + ");");
            }
            document.getElementById("Log").value += "\nColumn Hidden Single found in column " + i;
            sudoku[no][i].ChangeState(j);
            CheckAll();
        }
    }


}

function AllHiddenSingles() {
    for (var i = 0; i < 9; i++) {
        RowHiddenSingles(i);
    }


    for (var i = 0; i < 9; i++) {
        ColumnHiddenSingles(i);
    }
    for (var i = 0; i < 9; i += 3) {
        for (var j = 0; j < 9; j += 3) {
            BoxHiddenSingles(i, j);
        }
    }
<<<<<<< HEAD
    if (Step == 0);
    //Steps.push("AllHiddenSingles()");
=======
    if(Step==0);
        //Steps.push("AllHiddenSingles()");
>>>>>>> parent of 6400c62... Stashing...
}

function PuzzleCompleted() {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (sudoku[i][j].is_filled == false)
                return false;
        }
    }
    document.getElementById("Log").value += "\nPuzzle Completed! :)";
    var cnt = 0;
    for (var i = 1; i < Steps.length; i++) {
<<<<<<< HEAD
        if (Steps[i - 1] == Steps[i] && cnt < 1) {
=======
        if (Steps[i - 1] == Steps[i] &&cnt<3 ) {
>>>>>>> parent of 6400c62... Stashing...

            Steps.splice(i, 1);
            i--;
            cnt++;
        } else {
<<<<<<< HEAD
            cnt = 0;
=======
            cnt=0;
>>>>>>> parent of 6400c62... Stashing...
        }
    }
    Steps.push("AllHiddenSingles();AllHiddenSingles();");
    DrawGrid();
    UpdateStepCNT(Steps.length);
    return true;
}

function resetPuzzle() {
    sudoku=[];
    sudoku = [[new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)]];
    var strVar = "";
    strVar += "<table id=\"Main\">";
    strVar += "<tr>";
    strVar += "                <td id = \"c00\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n000\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n001\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n002\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n003\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n004\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n005\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n006\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n007\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n008\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                        <!--td id = \"cell\"><input class=\"full\" id = \"n008\" value=\"\" maxlength=\"1\" size=\"1\"><\/td--> ";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c01\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n010\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n011\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n012\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n013\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n014\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n015\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n016\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n017\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n018\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c02\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n020\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n021\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n022\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n023\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n024\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n025\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n026\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n027\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n028\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c03\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n030\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n031\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n032\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n033\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n034\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n035\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n036\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n037\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n038\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c04\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n040\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n041\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n042\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n043\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n044\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n045\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n046\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n047\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n048\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c05\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n050\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n051\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n052\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n053\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n054\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n055\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n056\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n057\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n058\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c06\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n060\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n061\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n062\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n063\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n064\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n065\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n066\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n067\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n068\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c07\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n070\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n071\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n072\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n073\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n074\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n075\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n076\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n077\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n078\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c08\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n080\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n081\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n082\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n083\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n084\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n085\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n086\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n087\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n088\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "            <tr>";
    strVar += "            <td id = \"c10\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n100\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n101\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n102\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n103\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n104\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n105\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n106\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n107\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n108\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c11\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n110\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n111\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n112\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n113\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n114\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n115\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n116\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n117\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n118\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c12\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n120\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n121\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n122\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n123\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n124\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n125\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n126\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n127\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n128\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c13\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n130\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n131\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n132\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n133\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n134\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n135\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n136\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n137\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n138\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c14\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n140\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n141\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n142\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n143\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n144\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n145\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n146\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n147\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n148\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c15\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n150\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n151\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n152\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n153\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n154\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n155\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n156\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n157\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n158\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c16\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n160\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n161\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n162\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n163\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n164\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n165\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n166\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n167\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n168\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c17\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n170\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n171\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n172\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n173\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n174\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n175\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n176\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n177\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n178\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c18\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n180\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n181\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n182\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n183\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n184\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n185\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n186\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n187\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n188\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "            <tr>";
    strVar += "            <td id = \"c20\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n200\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n201\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n202\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n203\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n204\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n205\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n206\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n207\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n208\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c21\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n210\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n211\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n212\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n213\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n214\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n215\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n216\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n217\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n218\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c22\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n220\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n221\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n222\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n223\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n224\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n225\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n226\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n227\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n228\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c23\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n230\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n231\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n232\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n233\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n234\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n235\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n236\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n237\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n238\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c24\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n240\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n241\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n242\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n243\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n244\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n245\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n246\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n247\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n248\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c25\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n250\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n251\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n252\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n253\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n254\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n255\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n256\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n257\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n258\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c26\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n260\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n261\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n262\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n263\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n264\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n265\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n266\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n267\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n268\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c27\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n270\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n271\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n272\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n273\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n274\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n275\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n276\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n277\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n278\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c28\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n280\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n281\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n282\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n283\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n284\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n285\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n286\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n287\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n288\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "            <tr>";
    strVar += "            <td id = \"c30\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n300\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n301\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n302\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n303\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n304\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n305\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n306\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n307\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n308\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c31\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n310\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n311\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n312\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n313\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n314\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n315\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n316\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n317\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n318\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c32\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n320\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n321\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n322\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n323\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n324\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n325\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n326\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n327\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n328\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c33\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n330\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n331\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n332\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n333\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n334\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n335\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n336\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n337\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n338\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c34\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n340\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n341\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n342\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n343\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n344\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n345\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n346\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n347\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n348\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c35\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n350\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n351\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n352\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n353\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n354\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n355\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n356\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n357\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n358\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c36\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n360\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n361\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n362\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n363\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n364\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n365\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n366\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n367\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n368\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c37\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n370\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n371\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n372\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n373\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n374\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n375\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n376\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n377\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n378\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c38\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n380\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n381\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n382\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n383\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n384\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n385\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n386\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n387\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n388\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "            <tr>";
    strVar += "            <td id = \"c40\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n400\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n401\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n402\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n403\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n404\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n405\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n406\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n407\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n408\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c41\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n410\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n411\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n412\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n413\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n414\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n415\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n416\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n417\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n418\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c42\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n420\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n421\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n422\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n423\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n424\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n425\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n426\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n427\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n428\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c43\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n430\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n431\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n432\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n433\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n434\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n435\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n436\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n437\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n438\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c44\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n440\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n441\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n442\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n443\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n444\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n445\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n446\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n447\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n448\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c45\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n450\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n451\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n452\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n453\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n454\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n455\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n456\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n457\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n458\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c46\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n460\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n461\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n462\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n463\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n464\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n465\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n466\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n467\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n468\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c47\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n470\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n471\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n472\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n473\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n474\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n475\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n476\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n477\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n478\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c48\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n480\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n481\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n482\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n483\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n484\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n485\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n486\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n487\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n488\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td id = \"c50\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n500\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n501\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n502\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n503\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n504\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n505\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n506\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n507\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n508\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c51\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n510\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n511\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n512\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n513\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n514\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n515\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n516\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n517\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n518\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c52\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n520\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n521\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n522\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n523\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n524\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n525\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n526\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n527\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n528\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c53\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n530\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n531\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n532\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n533\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n534\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n535\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n536\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n537\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n538\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c54\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n540\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n541\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n542\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n543\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n544\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n545\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n546\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n547\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n548\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c55\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n550\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n551\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n552\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n553\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n554\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n555\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n556\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n557\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n558\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c56\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n560\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n561\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n562\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n563\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n564\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n565\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n566\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n567\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n568\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c57\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n570\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n571\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n572\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n573\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n574\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n575\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n576\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n577\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n578\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c58\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n580\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n581\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n582\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n583\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n584\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n585\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n586\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n587\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n588\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "        <tr>";
    strVar += "            <td id = \"c60\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n600\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n601\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n602\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n603\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n604\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n605\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n606\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n607\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n608\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c61\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n610\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n611\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n612\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n613\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n614\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n615\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n616\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n617\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n618\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c62\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n620\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n621\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n622\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n623\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n624\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n625\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n626\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n627\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n628\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c63\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n630\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n631\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n632\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n633\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n634\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n635\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n636\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n637\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n638\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c64\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n640\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n641\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n642\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n643\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n644\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n645\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n646\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n647\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n648\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c65\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n650\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n651\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n652\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n653\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n654\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n655\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n656\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n657\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n658\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c66\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n660\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n661\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n662\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n663\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n664\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n665\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n666\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n667\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n668\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c67\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n670\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n671\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n672\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n673\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n674\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n675\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n676\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n677\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n678\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c68\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n680\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n681\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n682\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n683\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n684\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n685\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n686\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n687\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n688\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "    <tr>";
    strVar += "            <td id = \"c70\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n700\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n701\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n702\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n703\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n704\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n705\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n706\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n707\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n708\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c71\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n710\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n711\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n712\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n713\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n714\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n715\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n716\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n717\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n718\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c72\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n720\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n721\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n722\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n723\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n724\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n725\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n726\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n727\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n728\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c73\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n730\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n731\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n732\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n733\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n734\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n735\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n736\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n737\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n738\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c74\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n740\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n741\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n742\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n743\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n744\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n745\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n746\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n747\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n748\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c75\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n750\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n751\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n752\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n753\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n754\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n755\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n756\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n757\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n758\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c76\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n760\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n761\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n762\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n763\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n764\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n765\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n766\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n767\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n768\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c77\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n770\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n771\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n772\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n773\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n774\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n775\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n776\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n777\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n778\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c78\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n780\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n781\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n782\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n783\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n784\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n785\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n786\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n787\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n788\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += "    <tr>";
    strVar += "            <td id = \"c80\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n800\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n801\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n802\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n803\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n804\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n805\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n806\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n807\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n808\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c81\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n810\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n811\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n812\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n813\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n814\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n815\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n816\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n817\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n818\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c82\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n820\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n821\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n822\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n823\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n824\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n825\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n826\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n827\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n828\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c83\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n830\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n831\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n832\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n833\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n834\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n835\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n836\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n837\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n838\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c84\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n840\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n841\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n842\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n843\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n844\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n845\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n846\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n847\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n848\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c85\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n850\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n851\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n852\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n853\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n854\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n855\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n856\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n857\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n858\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c86\">";
    strVar += "                    <table id = \"notes\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n860\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n861\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n862\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n863\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n864\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n865\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n866\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n867\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n868\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c87\">";
    strVar += "                    <table id = \"notes\" cellspacing=\"0\" cellpadding=\"0\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n870\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n871\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n872\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n873\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n874\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n875\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n876\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n877\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n878\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "                <td id = \"c88\">";
    strVar += "                    <table id = \"notes\" cellspacing=\"0\" cellpadding=\"0\">";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n880\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n881\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n882\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n883\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n884\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n885\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                        <\/tr>";
    strVar += "                        <tr>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n886\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n887\" value=\"\" maxlength=\"1\" size=\"1\"><\/td>";
    strVar += "                            <td id = \"cell\"><input class=\"notFull\" id = \"n888\" value=\"\" maxlength=\"1\" size=\"1\"><\/td> ";
    strVar += "                        <\/tr>";
    strVar += "                    <\/table>";
    strVar += "                <\/td>";
    strVar += "            <\/tr>";
    strVar += " <\/table>";

    document.getElementById("TABLEMain").innerHTML = strVar;
}

function GetPuz() {
    resetPuzzle();
    var Puz = document.getElementById("FromUser").value;
    var CleanPuz = "";
    if (Puz.length != 89) {
        document.getElementById("FromUser").value = "Enter Correct Puzzle";
        resetPuzzle();
        //DrawGrid();
        return false;
    }
    for (var n = 0; n < Puz.length; n++) {
        if (Puz[n] != "\n")
            CleanPuz += Puz[n];
    }
    var i = 0;
    for (var j = 0; j < 9; j++)
        for (var k = 0; k < 9; k++) {
            if (CleanPuz[i] != "0")
                sudoku[j][k].ChangeState(parseInt(CleanPuz[i]));
            i++;
        }
    return true;
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function executeAsynchronously(functions, timeout) {
    for (var i = 0; i < functions.length; i++) {
        setTimeout(functions[i], timeout);
    }
}

function Everything() {
    //DrawGrid();
    resetPuzzle();
    if (GetPuz()) {
        CheckAll();
        var p=0;
        //DrawGrid();
        for (var i = 0; p<100; i++, p++) {

            AllHiddenSingles();
            CheckAll();
            if(PuzzleCompleted())break;
            CheckAllSingles();
            CheckAll();
            if(PuzzleCompleted())break;
            LC();
            CheckAll();
if(PuzzleCompleted())break;
            LC2();
            CheckAll();
if(PuzzleCompleted())break;
            NakedAll();
            CheckAll();
            if(PuzzleCompleted())break;
/*100007090
030020008
009600500
005400900
010080002
600004000
300000010
041000007
007000300*/
if(p==10||!PuzzleCompleted()){document.getElementById("Log").value="\nPuzzle could not be solved";
        DrawGrid();
    } else {
        DrawGrid();
    }
        }
    }
}

function doSomething(e) {
    if (e.target !== e.currentTarget) {
        var clickedItem = e.target.id;

        if (clickedItem.length == 4) {
            var row, col, poss;
            row = clickedItem[1];
            col = clickedItem[2];
            poss = clickedItem[3];
        }
        e.stopPropagation();
    }
}

function enablePosEdit(ss) {
    //alert(ss.value);
    if (ss.value == true) {
        setNoReadOnly();

    } else
        setReadonly();
}

function addListeners() {

    var element = document.querySelectorAll("#cell");
    var t;
    for (t = 0; t < element.length; t++) {
        element[t].addEventListener('input', doSomething, false);
    }
    var elementc = document.querySelectorAll(".full");
    var t;
    for (t = 0; t < elementc.length; t++)
        elementc[t].parentElement.addEventListener('input', doSomething, false);
}

function removeListeners() {
    var element = document.querySelectorAll("#cell");
    var t;
    for (t = 0; t < element.length; t++)
        element[t].removeEventListener('input', doSomething, false);
    var elementc = document.querySelectorAll(".full");
    var t;
    for (t = 0; t < elementc.length; t++)
        elementc[t].parentElement.removeEventListener('input', doSomething, false);
}

function setReadonly() {
    var g = document.querySelectorAll(".notFull"),
        k;
    for (k = 0; k < g.length; k++)
        g[k].setAttribute('readonly', 'readonly');
}

function setNoReadOnly() {
    var g = document.querySelectorAll(".notFull"),
        k;
    for (k = 0; k < g.length; k++)

        g[k].removeAttribute('readonly');
}

function EnableEditPos(ss) {

    if (ss.checked == true) setNoReadOnly();
    else setReadonly();

}

function NoPos(sss) {
    if (ss.checked == true) DrawGridOnly();
    else DrawGrid();
}
setReadonly();
addListeners();