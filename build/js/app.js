document.addEventListener('DOMContentLoaded', function(){
    app();
});

function app(){
    modoOscuro();
}

function modoOscuro(){
    const modoOscuro = document.querySelector('.modo-oscuro');
    
    modoOscuro.addEventListener('click', function(){
        document.body.classList.toggle('oscuro');
    });
}