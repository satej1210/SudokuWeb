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
        if(box!=null){
            box.style.backgroundColor="White";
            //console.log(id);
            if(toState&&!this.possibilities[Pos])
            {
                box.style.backgroundColor="Green";
            }
            else if(this.possibilities[Pos]&&!toState){
                box.style.backgroundColor="Red";
                   
            }
        
        
    }
        this.possibilities[Pos]=toState;
    }
    this.ChangeState = function (x) {
        "use strict";
        var i;
        this.state = x;
        this.is_filled = true;
        for (i = 0; i < 9; i = i + 1) {
            this.possibilities[i]=false;
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
function NakedAll()
{
    var stop;
        for(var i=1; i<=9; i++){NakedPairRow(i);}
        for(var i=1; i<=9; i++){NakedPairColumn(i);}
        for(var i=0; i<9; i+=3) for(var j=0; j<9; j+=3) NakedPairBox(i,j);
        
        for(var i=1; i<=9; i++){NakedTripleRow(i);}
        for(var i=1; i<=9; i++){NakedTripleColumn(i);}
        for(var i=1; i<=9; i++){NakedQuadRow(i)}
        for(var i=1; i<=9; i++){NakedQuadColumn(i);}
    }
function NakedQuadRow(RowNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            for(var Number3=Number2+1; Number3<=9; Number3++)
            {
                for(var Number4=Number3+1; Number4<=9; Number4++)
                {
                var outerflag = 0;
                var store = [-1,-1, -1,-1];
                var index = 0;
                
                for(var i=0; i<9; i++)
                {
                    var FalseNum = 0;
                    var TrueNum= 0;
                    
                    if(sudoku[RowNumber-1][i].possibilities[Number1-1] || sudoku[RowNumber-1][i].possibilities[Number2-1] || sudoku[RowNumber-1][i].possibilities[Number3-1]||sudoku[RowNumber-1][i].possibilities[Number4-1])
                    {
                        if(sudoku[RowNumber-1][i].possibilities[Number1-1])
                            TrueNum++;
                        if(sudoku[RowNumber-1][i].possibilities[Number2-1])
                            TrueNum++;
                        if(sudoku[RowNumber-1][i].possibilities[Number3-1])
                            TrueNum++;
                        if(sudoku[RowNumber-1][i].possibilities[Number4-1])
                            TrueNum++;
                        
                        
                        for(var x=1; x<=9; x++)
                        {
                            if(!(sudoku[RowNumber-1][i].possibilities[x-1]))
                                FalseNum++;
                        }
                        if(FalseNum==(9-TrueNum))
                        {
                            outerflag++;
                            store[index] = i;
                            index++;
                        }
                    }
                }
                if(outerflag==4)
                {
                    document.getElementById("Log").value+="\nNaked Quad found at Row "+RowNumber;
                    Steps.push("NakedQuadRow(" + RowNumber + ");");
                    for(var i=0; i<9; i++)
                    {
                        if(i!=store[0] && i!=store[1] && i!=store[2] && i!=store[3])
                        {
                            sudoku[RowNumber-1][i].ChangePossibility(Number1-1,false, RowNumber-1, i);
                            sudoku[RowNumber-1][i].ChangePossibility(Number2-1, false, RowNumber-1, i);
                            sudoku[RowNumber-1][i].ChangePossibility(Number3-1, false, RowNumber-1, i);
                            sudoku[RowNumber-1][i].ChangePossibility(Number4-1, false, RowNumber-1, i);
                        }
                    }
                    
                }
            }
        }
    }
    }
}
function NakedQuadColumn(ColumnNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            for(var Number3=Number2+1; Number3<=9; Number3++)
            {
                for(var Number4=Number3+1; Number4<=9; Number4++)
                {
                    var outerflag = 0;
                    var store = [-1,-1, -1,-1];
                    var index = 0;
                    
                    for(var i=0; i<9; i++)
                    {
                        var FalseNum = 0;
                        var TrueNum= 0;
                        
                        if(sudoku[i][ColumnNumber-1].possibilities[Number1-1] || sudoku[i][ColumnNumber-1].possibilities[Number2-1] || sudoku[i][ColumnNumber-1].possibilities[Number3-1]||sudoku[i][ColumnNumber-1].possibilities[Number4-1])
                        {
                            if(sudoku[i][ColumnNumber-1].possibilities[Number1-1])
                                TrueNum++;
                            if(sudoku[i][ColumnNumber-1].possibilities[Number2-1])
                                TrueNum++;
                            if(sudoku[i][ColumnNumber-1].possibilities[Number3-1])
                                TrueNum++;
                            if(sudoku[i][ColumnNumber-1].possibilities[Number4-1])
                                TrueNum++;
                            
                            
                            for(var x=1; x<=9; x++)
                            {
                                if(!(sudoku[i][ColumnNumber-1].possibilities[x-1]))
                                    FalseNum++;
                            }
                            if(FalseNum==(9-TrueNum))
                            {
                                outerflag++;
                                store[index] = i;
                                index++;
                            }
                        }
                    }
                    if(outerflag==4)
                    {
                        document.getElementById("Log").value+="\nNaked Quad found at column"+ColumnNumber;
                        Steps.push("NakedQuadColumn(" + ColumnNumber + ");");
                        for(var i=0; i<9; i++)
                        {
                            if(i!=store[0] && i!=store[1] && i!=store[2] && i!=store[3])
                            {
                                sudoku[i][ColumnNumber-1].ChangePossibility(Number1-1,false, i, ColumnNumber-1);
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number2-1, false, i, ColumnNumber-1);
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number3-1, false, i, ColumnNumber-1);
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number4-1, false, i, ColumnNumber-1);
                            }
                        }
                        return;
                    }
                }
            }
        }
    }
}
function NakedTripleRow(RowNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            for(var Number3=Number2+1; Number3<=9; Number3++)
            {
                var outerflag = 0;
                var store = [-1,-1, -1];
                var index = 0;
                
                for(var i=0; i<9; i++)
                {
                    var FalseNum = 0;
                    var TrueNum= 0;
                    
                    if(sudoku[RowNumber-1][i].possibilities[Number1-1] || sudoku[RowNumber-1][i].possibilities[Number2-1] || sudoku[RowNumber-1][i].possibilities[Number3-1])
                    {
                        if(sudoku[RowNumber-1][i].possibilities[Number1-1])
                            TrueNum++;
                        if(sudoku[RowNumber-1][i].possibilities[Number2-1])
                            TrueNum++;
                        if(sudoku[RowNumber-1][i].possibilities[Number3-1])
                            TrueNum++;
                        
                        
                        for(var x=1; x<=9; x++)
                        {
                            if(!(sudoku[RowNumber-1][i].possibilities[x-1]))
                                FalseNum++;
                        }
                        if(FalseNum==(9-TrueNum))
                        {
                            outerflag++;
                            store[index] = i;
                            index++;
                        }
                    }
                }
                if(outerflag==3)
                {
                    document.getElementById("Log").value+="\nNaked Triple found at row"+RowNumber;
                    Steps.push("NakeTripleRow(" + RowNumber + ");");
                    for(var i=0; i<9; i++)
                    {
                        if(i!=store[0] && i!=store[1] && i!=store[2])
                        {
                            sudoku[RowNumber-1][i].ChangePossibility(Number1-1, false, RowNumber-1, i);
                            sudoku[RowNumber-1][i].ChangePossibility(Number2-1, false, RowNumber-1, i);
                            sudoku[RowNumber-1][i].ChangePossibility(Number3-1, false, RowNumber-1, i);
                            
                        }
                    }
                }
            }
        }
    }
    
}
function NakedTripleColumn(ColumnNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            for(var Number3=Number2+1; Number3<=9; Number3++)
            {
                var outerflag = 0;
                var store = [-1,-1, -1];
                var index = 0;
                
                for(var i=0; i<9; i++)
                {
                    var FalseNum = 0;
                    var TrueNum= 0;
                    
                    if(sudoku[i][ColumnNumber-1].possibilities[Number1-1] || sudoku[i][ColumnNumber-1].possibilities[Number2-1] || sudoku[i][ColumnNumber-1].possibilities[Number3-1])
                    {
                        if(sudoku[i][ColumnNumber-1].possibilities[Number1-1])
                            TrueNum++;
                        if(sudoku[i][ColumnNumber-1].possibilities[Number2-1])
                            TrueNum++;
                        if(sudoku[i][ColumnNumber-1].possibilities[Number3-1])
                            TrueNum++;
                        
                        
                        for(var x=1; x<=9; x++)
                        {
                            if(!(sudoku[i][ColumnNumber-1].possibilities[x-1]))
                                FalseNum++;
                        }
                        if(FalseNum==(9-TrueNum))
                        {
                            outerflag++;
                            store[index] = i;
                            index++;
                        }
                    }
                }
                if(outerflag==3)
                {
                    document.getElementById("Log").value+="\nNnaked Triple found at column "+ColumnNumber;
                    Steps.push("NakeTripleColumn(" + ColumnNumber + ");");
                    for(var i=0; i<9; i++)
                    {
                        if(i!=store[0] && i!=store[1] && i!=store[2])
                        {
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number1-1,false, i, ColumnNumber-1);
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number2-1, false, i, ColumnNumber-1);
                            sudoku[i][ColumnNumber-1].ChangePossibility(Number3-1, false, i, ColumnNumber-1);
                        }
                    }
                }
            }
        }
    }

}
function NakedPairRow(RowNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            
            var outerflag = 0;
            var store = [-1,-1];
            var index = 0;
            
            for(var i=0; i<9; i++)
            {
                var innerflag = 0;
                
                if(sudoku[RowNumber-1][i].possibilities[Number1-1] && sudoku[RowNumber-1][i].possibilities[Number2-1])
                {
                    for(var x=1; x<=9; x++)
                    {
                        if(sudoku[RowNumber-1][i].possibilities[x-1])
                            innerflag++;
                    }
                    if(innerflag==2)
                    {
                        outerflag++;
                        store[index] = i;
                        index++;
                    }
                }
            }
            if(outerflag==2)
            {
                document.getElementById("Log").value+="\nNaked Pair found at row "+RowNumber;
                Steps.push("NakePairRow(" + RowNumber + ");");
                for(var i=0; i<9; i++)
                {
                    if(i!=store[0] && i!=store[1])
                    {
                        sudoku[RowNumber-1][i].ChangePossibility(Number1-1, false, RowNumber-1, i);
                        sudoku[RowNumber-1][i].ChangePossibility(Number2-1, false, RowNumber-1, i);
                    }
                }
            }
        }
    }
}
function NakedPairColumn(ColumnNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            
            var outerflag = 0;
            var store = [-1,-1];
            var index = 0;
            
            for(var i=0; i<9; i++)
            {
                var innerflag = 0;
                
                if(sudoku[i][ColumnNumber-1].possibilities[Number1-1] && sudoku[i][ColumnNumber-1].possibilities[Number2-1])
                {
                    for(var x=1; x<=9; x++)
                    {
                        if(sudoku[i][ColumnNumber-1].possibilities[x-1])
                            innerflag++;
                    }
                    if(innerflag==2)
                    {
                        outerflag++;
                        store[index] = i;
                        index++;
                    }
                }
            }
            if(outerflag==2)
            {
                document.getElementById("Log").value+="\nNaked Pair found at column "+ColumnNumber;
                Steps.push("NakePairColumn(" + ColumnNumber + ");");
                for(var i=0; i<9; i++)
                {
                    if(i!=store[0] && i!=store[1])
                    {
                        sudoku[i][ColumnNumber-1].ChangePossibility(Number1-1,false, i, ColumnNumber-1);
                        sudoku[i][ColumnNumber-1].ChangePossibility(Number2-1, false, i, ColumnNumber-1);
                    }
                }
            }
        }
    }
}
function NakedPairBox(RowNumber, ColumnNumber)
{
    for(var Number1=1; Number1<=9; Number1++)
    {
        for(var Number2=Number1+1; Number2<=9; Number2++)
        {
            
            var outerflag = 0;
            var store = [-1,-1, -1, -1];
            var index = 0;
            
            for(var i=RowNumber; i<RowNumber+3; i++)
            {
                for(var j=ColumnNumber; j<ColumnNumber+3; j++)
                {
                    var innerflag = 0;
                    
                    if(sudoku[i][j].possibilities[Number1-1] && sudoku[i][j].possibilities[Number2-1])
                    {
                        for(var x=1; x<=9; x++)
                        {
                            if(sudoku[i][j].possibilities[x-1])
                                innerflag++;
                        }
                        
                        if(innerflag==2)
                        {
                            outerflag++;
                            store[index] = i;
                            store[index+1] = j;
                            index+=2;
                        }
                    }
                }
            }
            if(outerflag==2)
            {
                document.getElementById("Log").value+="\nNaked Pair found at box indices "+RowNumber+" "+ColumnNumber;
                var newindex = 0;
                for(var i=RowNumber; i<RowNumber+3; i++)
                {
                    for(var j=ColumnNumber; j<ColumnNumber+3; j++)
                    {
                        if(i==store[newindex] && j==store[newindex+1])
                        {
                            newindex+=2;
                        }
                        else
                        {
                            sudoku[i][j].ChangePossibility(Number1-1,false, i, j);
                        sudoku[i][j].ChangePossibility(Number2-1, false, i,j);
                        }
                    }
                }
            }
        }
    }
    
}
function LC_f11(i,j)   //row in box
{
        var GetNumberArray;
        for(var x=1; x<=9; x++){
            GetNumberArray = ReturnBoxPossibilities(x, i, j);
            if(GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2])
                if((GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<j||b>=j+3)
                            sudoku[i][b].ChangePossibility(x-1,false,i,b);
                    }
                }

            if(GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<j||b>=j+3)
                            sudoku[i+1][b].ChangePossibility(x-1, false, i+1, b);
                    }
                    
                }
            if(GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<j||b>=j+3)
                            sudoku[i+2][b].ChangePossibility(x-1, false, i+2, b);
                    }
                    
                }



        }
}
function LC_f12(i, j) //column in box
{
        var GetNumberArray;
        for(var x=1; x<=9; x++)
        {
            GetNumberArray = ReturnBoxPossibilities(x, i, j);

            if(GetNumberArray[0]||GetNumberArray[3]||GetNumberArray[6])
                if((GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[4]||GetNumberArray[5]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<i||b>=i+3)
                            sudoku[b][j].ChangePossibility(x-1, false, b, j);
                    }
                    
                }

            if(GetNumberArray[1]||GetNumberArray[4]||GetNumberArray[7])
                if((GetNumberArray[0]||GetNumberArray[2]||GetNumberArray[3]||GetNumberArray[5]||GetNumberArray[6]||GetNumberArray[8])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<i||b>=i+3)
                            sudoku[b][j+1].ChangePossibility(x-1, false, b, j+1);
                    }
                }
            if(GetNumberArray[2]||GetNumberArray[5]||GetNumberArray[8])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[6]||GetNumberArray[7])==false)
                {
                    for(var b=0; b<9; b++)
                    {
                        if(b<i||b>=i+3)
                            sudoku[b][j+2].ChangePossibility(x-1, false, b, j+2);
                    }
                }



        }
        
}
function LC()
{

        
        for(var i=0; i<9; i+=3)
        {
            for(var j=0; j<9; j+=3)
            {
                LC_f11(i,j);
                LC_f12(i,j);
            }
        }
    }
function LC_f21(i) //row
{
        var GetNumberArray;
        for(var x=1; x<=9; x++)
        {
            GetNumberArray = ReturnRowPossibilities(x, i);
            
            if(GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2])
                if((GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    var left_row_num=parseInt((i)/3)*3;
                    var left_col_num=0;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(a!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            if(GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    var left_row_num=parseInt((i)/3)*3;
                    var left_col_num=3;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(a!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            if(GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])==false)
                {
                    var left_row_num=parseInt((i)/3)*3;
                    var left_col_num=6;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(a!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            
        }

}
function LC_f22(i) //column
{
        var GetNumberArray;
        for(var x=1; x<=9; x++)
        {
            GetNumberArray = ReturnColPossibilities(x, i);
            
            if(GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2])
                if((GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    var left_col_num=parseInt((i)/3)*3;
                    var left_row_num=0;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(b!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            if(GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])==false)
                {
                    var left_col_num=parseInt((i)/3)*3;
                    var left_row_num=3;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(b!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            if(GetNumberArray[6]||GetNumberArray[7]||GetNumberArray[8])
                if((GetNumberArray[0]||GetNumberArray[1]||GetNumberArray[2]||GetNumberArray[3]||GetNumberArray[4]||GetNumberArray[5])==false)
                {
                    var left_col_num=parseInt((i)/3)*3;
                    var left_row_num=6;
                    
                    for(var a=left_row_num; a<left_row_num+3; a++)
                    {
                        for(var b=left_col_num; b<left_col_num+3; b++)
                        {
                            if(b!=i)
                                sudoku[a][b].ChangePossibility(x-1, false, a, b);
                        }
                        
                    }
                }
            
            
        }

    } 
function LC2()
{
        for(var i=0; i<9; i++)
        {
            LC_f21(i);
            LC_f22(i);
        }
       
    }
function DrawGridOnly()
{
    var i, j, m, text = "";
    //sudoku[0][2].ChangeState(2);
    for (i = 0; i < 9; i++) {
            for (j = 0; j < 9; j++) {
                
                    var id = "c";
                    id += i.toString() + j.toString();
                    var cell = document.getElementById(id);
                    cell.innerHTML = "<td id=\"cell\"><input id =\"" + id + "9" + "\" class=\"full\" value=\"" + sudoku[i][j].GetState() + "\"maxlength=\"1\" size=\"1\"/></td>";
                
            }
        }
    }

function DrawGrid() 
{
    //document.getElementById("MainPos").style="display:flex";
    //document.getElementById("Main").style="display:block";
    var i, j, m, text = "";
    //sudoku[0][2].ChangeState(2);
    for (i = 0; i < 9; i++) {
        for (m = 0; m < 3; m++) {
            for (j = 0; j < 9; j++) {
                
                if (sudoku[i][j].is_filled) {
                    var id = "c";
                    id += i.toString() + j.toString();
                    var cell = document.getElementById(id);
                    cell.innerHTML = "<td id=\"cell\"><input id =\"" + id + "9" + "\" class=\"full\" value=\"" + sudoku[i][j].GetState() + "\"maxlength=\"1\" size=\"1\"/></td>";
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
function DrawGri2d()
{
    
    DrawGrid2();
}
function CheckAllSingles()
{
    var i, j, flag, store, k;
    for(i=0; i<9; i++)
    {
        for(j=0; j<9; j++)
        {
            flag = -1;
            store = -1;
            for(k=0; k<9; k++)
            {
                if(sudoku[i][j].possibilities[k]==true) //to get flag and store
                {
                    flag++;
                    store = k;
                }
            }
            if(flag==0)             //if it is a single, change the state and check the row, column and boxes off.
            {
                document.getElementById("Log").value+="\nSingle Found at position "+i+" "+j;
                sudoku[i][j].ChangeState(store+1);
                
            }
        }
    }
}
function CheckBox(FilledX, FilledY)
{
    var a, b;
    a=parseInt((FilledX/3)) * 3;
    b=parseInt((FilledY/3)) * 3;
    if(sudoku[FilledX][FilledY].is_filled==true)
    {
        for(var i=a; i<=a+2; i++)
        {
            for(var j=b; j<=b+2; j++)
            {
                sudoku[i][j].ChangePossibility(sudoku[FilledX][FilledY].GetState()-1, false, i, j);
            }
        }
    }
}
function CheckColumn(c)
{
    for(var i=1; i<=9; i++)
    {
        for(var j=1; j<=9; j++)
        {
            if(sudoku[j-1][c-1].GetState()==i)
            {
                for(var k=0; k<9; k++)
                    sudoku[k][c-1].ChangePossibility(i-1, false, k, c-1);
                break;
            }
        }
        
    }
}
function CheckRow(r)
{
    var i, j;
    for(i=1; i<=9; i++)
    {
        for(j=1; j<=9; j++)
        {
            if(sudoku[r-1][j-1].GetState()==i)
            {
                for(k=0; k<9; k++)
                    sudoku[r-1][k].ChangePossibility(i-1, false, r-1, k);
                break;
            }
        }
        
    }
}
function ReturnBoxPossibilities(x, i, j)
{
        var PossibleNumberArray=[true, true, true, true, true, true, true, true, true];
        var counter=0;
        for(var a=i; a<=i+2; a++)
        {
            for(var b=j; b<=j+2; b++)
            {
                if (sudoku[a][b].possibilities[x-1]==true)
                    PossibleNumberArray[counter]=true;
                else
                    PossibleNumberArray[counter]=false;
                counter++;

            }
        }
        
        return PossibleNumberArray;
        
}
function ReturnColPossibilities(x, j)
{
    var PossibleNumberArray=[true, true, true, true, true, true, true, true, true];
    var counter=0;
        for(var b=0; b<9; b++)
        {
            if (sudoku[b][j].possibilities[x-1]==true)
                PossibleNumberArray[counter]=true;
            else
                PossibleNumberArray[counter]=false;
            counter++;
            
        }
    return PossibleNumberArray;
}
function ReturnRowPossibilities(x,j)
{
    var PossibleNumberArray=[true, true, true, true, true, true, true, true, true];
    var counter=0;
    for(var b=0; b<9; b++)
    {
        if (sudoku[j][b].possibilities[x-1]==true)
            PossibleNumberArray[counter]=true;
        else
            PossibleNumberArray[counter]=false;
        counter++;
        
    }
    return PossibleNumberArray;
}
function CheckAll()
{
    var i, j;
    for( i=1; i<=9; i++)
    {
        CheckRow(i);
        CheckColumn(i);
    }

    for( i=0; i<9; i++)
    {
        for( j=0; j<9; j++)
        {
            CheckBox(i, j);
        }
    }
}
function BoxHiddenSingles(x, y)
{
    var flag=0;
    var h=0, l=0;
    for (k=1; k<=9; k++)
    {
        flag=0;
        for (i=x; i<x+3; i++)
        {

            for (j=y; j<y+3; j++)
            {
                if (sudoku[i][j].possibilities[k-1]==true&&sudoku[i][j].GetState()==0) {
                    flag++;
                    h=j;
                    l=i;
                }
            }
        }
        if (flag==1) {
           document.getElementById("Log").value+="\nBox Hidden Single found in box indices "+x+" "+y;
            //cout + ".." + h + ".. " + k + " >> " + "Single\n\n";
            sudoku[l][h].ChangeState(k);
            CheckAll();
        }
    }
}
function RowHiddenSingles(i)
{
    var no=0;
    
    var flag=0;
    for (var j=1; j<=9; j++)
    {
        flag=0;
        for (var k=0; k<9; k++)
        {
            if (sudoku[i][k].possibilities[j-1]==true)
            {
                flag++;
                no=k;
            }
        }

        if (flag==1)
        {
            document.getElementById("Log").value+="\nRow hidden single found in row "+i;
            sudoku[i][no].ChangeState(j);
            CheckAll();
        }
    }
    
    
}
function ColumnHiddenSingles(i)
{
    var no=0;
    
    var flag=0;
    for (var j=1; j<=9; j++)
    {
        flag=0;
        for (var k=0; k<9; k++)
        {
            if (sudoku[k][i].possibilities[j-1]==true)
            {
                
                flag++;
                no=k;
                
            }
            
        }
        if (flag==1)
        {
            document.getElementById("Log").value+="\nColumn Hidden Single found in column "+i;
            sudoku[no][i].ChangeState(j);
            CheckAll();
        }
    }


}
function AllHiddenSingles()
{
    for (var i=0; i<9; i++)
    {
        RowHiddenSingles(i);
    }
    
    
    for (var i=0; i<9; i++)
    {
        ColumnHiddenSingles(i);
    }
    for (var i=0; i<9; i+=3) {
        for (var j=0; j<9; j+=3) {
            BoxHiddenSingles(i, j);
        }
    }
}
function PuzzleCompleted()
{
    for(var i=0; i<9; i++)
    {
        for(var j=0; j<9; j++)
        {
            if(sudoku[i][j].is_filled==false)
                return false;
        }
    }
    document.getElementById("Log").value+="\nPuzzle Completed! :)";
    return true;
}
function resetPuzzle()
{
    sudoku = [[new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)],
           [new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0), new Cell(0)]];
}
function GetPuz()
{
    var Puz = document.getElementById("FromUser").value;
    var CleanPuz="";
    if(Puz.length!=89){
        document.getElementById("FromUser").value="Enter Correct Puzzle";
        resetPuzzle();
        //DrawGrid();
        return false;
    }
    for(var n=0; n<Puz.length; n++)
    {
        if(Puz[n]!="\n")
            CleanPuz+=Puz[n];
    }
    var i=0;
    for(var j=0; j<9; j++)
        for(var k=0; k<9; k++)
        {
            if(CleanPuz[i]!="0")
                sudoku[j][k].ChangeState(parseInt(CleanPuz[i]));
            i++;
        }
    return true;     
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    setTimeout(functions[i], timeout);
  }
}

function Everything()
{
    //DrawGrid();
    if(GetPuz())
    {
    CheckAll();
    DrawGrid();
    //DrawGrid();
    for(var i=0; !PuzzleCompleted(); i++)
    {
        
        AllHiddenSingles();
        CheckAll();
        DrawGrid();
        CheckAllSingles();
        CheckAll();
        DrawGrid();
        LC();
        CheckAll();
        DrawGrid();
        LC2();
        CheckAll();
        DrawGrid();
        NakedAll();
        DrawGrid();
        
    }  
    }
    else
    {
        DrawGrid();
    }
}
        function doSomething(e) {
        if (e.target !== e.currentTarget) {
            var clickedItem = e.target.id;
            
            if(clickedItem.length==4)
            {
                var row, col, poss;
                row = clickedItem[1];
                col = clickedItem[2];
                poss = clickedItem[3];
        }   
        e.stopPropagation();
}
        }
        function enablePosEdit(ss)
        {
           //alert(ss.value);
            if(ss.value==true)
            {
                setNoReadOnly();
                
            }
            else
                setReadonly();
        }
        function addListeners()
        {
            
        var element = document.querySelectorAll("#cell");
        var t;
        for(t=0; t<element.length; t++){
            element[t].addEventListener('input', doSomething, false);
        }
        var elementc = document.querySelectorAll(".full");
        var t;
        for(t=0; t<elementc.length; t++)
            elementc[t].parentElement.addEventListener('input', doSomething, false);
        }
        function removeListeners()
        {
            var element = document.querySelectorAll("#cell");
        var t;
        for(t=0; t<element.length; t++)
            element[t].removeEventListener('input', doSomething, false);
        var elementc = document.querySelectorAll(".full");
        var t;
        for(t=0; t<elementc.length; t++)
            elementc[t].parentElement.removeEventListener('input', doSomething, false);
        }
            function setReadonly()
            {
                var g = document.querySelectorAll(".notFull"), k;
                for(k=0; k<g.length; k++)
                    g[k].setAttribute('readonly', 'readonly');
            }
            function setNoReadOnly()
            {
                var g = document.querySelectorAll(".notFull"), k;
                for(k=0; k<g.length; k++)
                
                    g[k].removeAttribute('readonly');
            }
function EnableEditPos(ss)
                {
       
                if(ss.checked==true)setNoReadOnly();
                else setReadonly();
        
                }
                function NoPos(sss)
                {
                    if(ss.checked==true)DrawGridOnly();
                    else DrawGrid();
                }
        setReadonly();
        addListeners();