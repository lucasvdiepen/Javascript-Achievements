cols = document.getElementById("cols");
size = document.getElementById("size");
grid = document.getElementById("grid");

cols.addEventListener("change", update);
size.addEventListener("change", update);

function update(){
    //TO DO:
    //* clear grid
    //* loop according to size
    //* Add <br> when grid item is devidable by number of collums
    //* Add 'X' for every griditem

    grid.text = "";

    var newGridText = "";
    
    var col = size.value;
    var rows = cols.value;
    console.log("col: " + col + " row: " + rows);

    for(var i = 0; i < col; i++)
    {
        if(col % rows == 0)
        {
            newGridText += "<br>";
        }

        newGridText += "X";
    }

    console.log(newGridText);
    grid.text = newGridText;
}