let optionButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("font-Name");
let fontSizesRef = document.getElementById("font-size");
let writingArea = document.getElementById("text-input")
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

//FontList//
let fontList =[
    "Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New", "Cursive"
];

//Configuraciones Inicales//
//La Funcion llama a los botones que se van a reslatar//
const initializer = () =>{
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false)
    highlighter(scriptButtons, true)

    //crea opciones para los nombres de las fuentes//
    fontList.map(value =>{
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    //Fuente solo se permite hasta el 7//
    for(let i = 1; i<=7; i++){
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizesRef.appendChild(option);
    };

    //tamaño por default//
    fontSizesRef.value = 3;
};

//main logic -- exeCommand, ejecuta comandos en texto selecionado//
const modifyText =(command, defaultUi, value) =>{
    document.execCommand(command, defaultUi, value);
};

//Para operaciones basicas que no necesitan ciertos parametros//
optionButtons.forEach(button => {
    button.addEventListener("click", () =>{
        modifyText(button.id, false, null);
    });
});

//Para opciones que requieren valor en los parametros (colores, fuentes)
advancedOptionButton.forEach((button)=>{
    button.addEventListener("change", ()=>{
        modifyText(button.id, false, button.value);
    });
});

//links//
linkButton.addEventListener("click", ()=>{
    let userLink = prompt("Enter a Url");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    }else{
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
})



//Click Botones Resaltados//
//Si needsRemoval es true. Solo un boton debe de estar resaltado//
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if(needsRemoval){
                let alreadyActive = false;
                //Si el boton esta Activo//
                if (button.classList.contains("active")){
                    alreadyActive = true;
                }

                //Remueve lo resaltado de otros botones//
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add("active");
                }
            }
            //Si otros botones pueden estar resaltados//
            else{
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) =>{
    className.forEach((button) => {
        button.classList.remove("active");
        
    });
};

window.onload = initializer();