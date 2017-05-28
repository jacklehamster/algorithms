var reader = new FileReader();

function readText(that){

    if(that.files && that.files[0]){
        var reader = new FileReader();
        reader.onload = function (e) {
            var output=e.target.result;
            process(output);
        };
        reader.readAsText(that.files[0]);
    }
}


function LoadFile() {
    var oFrame = document.getElementById("frmFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    process(strRawContents);
}

function StreamReader(stream) {
    this.stream = stream;
};
StreamReader.prototype.readString = function() {
    var split = this.stream.split(" ");
    var first = split[0];
    this.stream = split.slice(1).join(" ");
    return first;
};
StreamReader.prototype.readChar = function() {
    var ch = this.stream.charAt(0);
    this.stream = this.stream.slice(1);
    return ch;
};
StreamReader.prototype.readLine = function() {
    var split = this.stream.split("\n");
    var first = split[0];
    this.stream = split.slice(1).join("\n");
    return first;
};
StreamReader.prototype.readNum = function() {
    return parseFloat(this.readString());
};
StreamReader.prototype.readNumLine = function() {
    return parseFloat(this.readLine());
};


function process(output) {
    document.getElementById("result").innerHTML = "";
    var stream = new StreamReader(output);
    var count = parseInt(stream.readLine());

    for(var i=0;i < count; i++) {
        cout("Case #"+(i+1)+": ");
        solve(stream);
    }
}

function cout(str) {
    console.log(str);
    document.getElementById("result").innerHTML += str;
}
