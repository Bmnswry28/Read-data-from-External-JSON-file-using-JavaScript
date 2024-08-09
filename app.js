document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var jsonData = e.target.result;
        createTableFromJSON(jsonData);
    };
    reader.readAsText(file);
});

function createTableFromJSON(jsonData) {
    var arrBirds = JSON.parse(jsonData);
    var col = [];
    for (var i = 0; i < arrBirds.length; i++) {
        for (var key in arrBirds[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (var i = 0; i < arrBirds.length; i++) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = arrBirds[i][col[j]];
        }
    }

    var divContainer = document.getElementById("showTable");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}