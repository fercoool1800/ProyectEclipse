const input = document.getElementById("command");

input.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        let cmd = input.value.trim().toLowerCase();

        if(cmd === "help"){
            alert("Commands: help, observe");
        }

        if(cmd === "observe"){
            alert("Observation is the first requirement.");
        }

        input.value = "";
    }

});