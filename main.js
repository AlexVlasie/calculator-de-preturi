document.addEventListener('DOMContentLoaded', function () {
    const refButton = document.getElementById('ref');
    
    refButton.addEventListener('click', function () {
        // Resetarea valorilor la starea inițială
        document.getElementById('pfurnizor').value = '';
        document.getElementById('btncheck1').checked = false;
        document.getElementById('pvanzare').value = '';
    });

    const pfurnizorInput = document.getElementById('pfurnizor');
    const tvaCheckbox = document.getElementById('btncheck1');
    const pvanzareInput = document.getElementById('pvanzare');


    pvanzareInput.setAttribute('readonly', 'readonly');

    pfurnizorInput.addEventListener('input', function () {
        calculatePretVanzare();
    });

    tvaCheckbox.addEventListener('change', function () {
        calculatePretVanzare();
    });

    function calculatePretVanzare() {
        let pfurnizorValue = parseFloat(pfurnizorInput.value);
        const tvaChecked = tvaCheckbox.checked;

        if (isNaN(pfurnizorValue)) {
            pvanzareInput.value = "0.00";
            pvanzareInput.style.opacity = "0.7";
            return;
        }

        if (tvaChecked) {
            pfurnizorValue /= 1.19;
        }

        let adaosComercial = 0;

        if (pfurnizorValue >= 2000) {
            adaosComercial = 0.05; // 5%
        } else if (pfurnizorValue >= 1500) {
            adaosComercial = 0.10; // 10%
        } else if (pfurnizorValue >= 1000) {
            adaosComercial = 0.15; // 15%
        } else if (pfurnizorValue >= 500) {
            adaosComercial = 0.20; // 20%
        } else if (pfurnizorValue > 20) {
            adaosComercial = 0.25; // 25%
        } else if (pfurnizorValue > 0){
            adaosComercial = 0.30; // 30%
            pvanzareInput.value = '26.05'; 
            return; 
        }

        let pretVanzare = pfurnizorValue * (1 + adaosComercial);

        pretVanzare = pretVanzare * 1.19;
        
        pretVanzare = Math.ceil(pretVanzare);

        pretVanzare = pretVanzare / 1.19;

        pretVanzare = pretVanzare.toFixed(2);

        pvanzareInput.value = pretVanzare;
    }

    calculatePretVanzare();

});

document.getElementById("Copiaza").addEventListener("click", function() {
    var textToCopy = document.getElementById("pvanzare");
    textToCopy.select();
    document.execCommand("copy");
});
