const commands = 
{

    help: () => 
    {
        alert("Available commands");
    },

    observe: () => 
    {
        alert("Observation is the first requirement.");
    },

    archive: () => 
    {
        alert("Archive unavailable.");
    }

};
const input = document.getElementById("command");

function mostrarError()
{
    const error = document.getElementById("error-message");
    error.textContent = "UNRECOGNIZED COMMAND";
    error.style.opacity = "1";
    error.style.visibility = "visible";
    error.classList.add("shake");
    setTimeout(() => 
    {

        error.classList.remove("shake");

    }, 400);

    setTimeout(() => 
    {

        error.style.transition = "opacity 1s";
        error.style.opacity = "0";

    }, 2000);

    setTimeout(() => 
    {

        error.style.visibility = "hidden";
        error.style.transition = "";

    }, 2400);
}
input.addEventListener("keydown", function(event)
{

    if(event.key === "Enter")
    {

        let cmd = input.value.trim().toLowerCase();
        if(commands[cmd])
        {
            commands[cmd]();
        }   
        else
        {
            mostrarError();
        }

        input.value = "";
    }
});