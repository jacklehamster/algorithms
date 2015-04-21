/**
    algo.js

    CODING PRACTICE
    Vincent Le Quang
    April 18, 2015
*/


function Algo() {
    
    var problems = [
        {
            name: "Rotate Array",
            input: ["integer","array"],
            output: "array",
            actions: {
                run: function(amount,array) {
                    var newArray = new Array(array.length);
                    for(var i=0;i<array.length;i++) {
                        newArray[i] = array[(i+amount+array.length)%array.length];
                    }
                    return newArray;
                }
            }
        }
        
        
        
    ];
    
    
    var problemsDiv;
    function createProblemSection() {
        problemDiv = document.createElement("div");
        problemDiv.id = "problems";
        document.body.appendChild(problemDiv);
        
    }
    
    this.start = function() {
        createProblemSection();
        
        for(var i=0;i<problems.length;i++) {
            var index = i;
            var problem = problems[index];
            var div = problemDiv.appendChild(document.createElement("div"));
            //  title
            var title = div.appendChild(document.createElement("div"));
            title.innerHTML = "<b>1) "+problem.name+"</b> ";
            
            //  code
            var textArea = document.createElement("textarea");
            textArea.cols = 80; textArea.rows = problem.action.toString().split("\n").length;
            textArea.innerHTML = problem.action;
            div.appendChild(textArea);
            div.appendChild(document.createElement("br"));
            
            //  action button
            var button = div.appendChild(document.createElement("button"));
            button.innerHTML = "Run";;
            button.className = "run-button";
            button.onclick = function() {
                var params = [];
                for(var j=0;j<problem.input.length;j++) {
                    params.push(getInput(problem.input[j], document.getElementById("input-"+index+"-"+j)));
                }
                var result = problem.action.apply(null,params);
                document.getElementById("output-"+index).value = formatOutput(problem.output,result);
            };
            div.appendChild(document.createElement("br"));
            
            //  input
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode("Input: "));
            div.appendChild(document.createElement("br"));
            
            var inputDiv = div.appendChild(document.createElement("div"));
            for(var j=0;j<problem.input.length;j++) {
                var input = createInput(problem.input[j]);
                input.id = "input-"+index+"-"+j;
                inputDiv.appendChild(input);
            }
            
            //  output
            div.appendChild(document.createElement("br"));
            div.appendChild(document.createTextNode("Output: "));
            div.appendChild(document.createElement("br"));
            
            var output = createInput(problem.output);
            output.id = "output-"+index;
            output.value = "";
            div.appendChild(output);
            
        }
    }
    
}


