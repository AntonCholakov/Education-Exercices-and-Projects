document.getElementById("calc").onclick = function () {
    var result = eval(document.getElementById("expression").value);
    document.getElementById("result").innerHTML= result;
};