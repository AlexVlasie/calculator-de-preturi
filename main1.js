document.addEventListener('DOMContentLoaded', function () {
    const refButton = document.getElementById('ref');

    refButton.addEventListener('click', function () {
        document.getElementById('pfurnizor').value = '';
        document.getElementById('flexRadioDefault1').checked = false;
        document.getElementById('flexRadioDefault2').checked = false;
        document.getElementById('pvanzare').value = '0,00';
        document.getElementById('ptva').value = '0,00';
    });

    const pfurnizorInput = document.getElementById('pfurnizor');
    const pvanzareInput = document.getElementById('pvanzare');
    const ptvaInput = document.getElementById('ptva'); // Adăugăm elementul ptva

    pvanzareInput.setAttribute('readonly', 'readonly');
    ptvaInput.setAttribute('readonly', 'readonly'); // Facem și ptva input readonly

    pfurnizorInput.addEventListener('input', function () {
        calculatePretVanzare();
    });

    const option1Radio = document.getElementById('flexRadioDefault1');
    const option2Radio = document.getElementById('flexRadioDefault2');

    option1Radio.addEventListener('change', function () {
        calculatePretVanzare();
    });

    option2Radio.addEventListener('change', function () {
        calculatePretVanzare();
    });

    function convertPunctInVirgula(text) {
        return text.replace(/,/g, '.');;
    }

    function calculatePretVanzare() {
        let pfurnizorValue = convertPunctInVirgula(pfurnizorInput.value);
        pfurnizorValue = parseFloat(pfurnizorValue);
    
        const option1Checked = option1Radio.checked;
        const option2Checked = option2Radio.checked;
    
        if (isNaN(pfurnizorValue) || (!option1Checked && !option2Checked)) {
            pvanzareInput.value = "0,00";
            ptvaInput.value = "0,00"; // Setăm ptva la 0 în acest caz
            pvanzareInput.style.opacity = "0.7";
            ptvaInput.style.opacity = "0.7"; // Facem și ptva input transparent
            return;
        }
    
        let adaosComercial = 0;
    
        if (option1Checked) {
            pfurnizorValue /= 1.19;
        } else if (option2Checked) {
            adaosComercial = 0; // Reducem adaosul comercial la 0% pentru opțiunea 2
        }
    
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
        } else if (pfurnizorValue > 0) {
            adaosComercial = 0.30; // 30%
            pvanzareInput.value = '26,05';
            ptvaInput.value = '5,00'; 
            return;
        }
    
        let pretVanzare = pfurnizorValue * (1 + adaosComercial);
        let ptvaValue = pretVanzare * 1.19; 
    
        pretVanzare = pretVanzare * 1.19;
        pretVanzare = Math.ceil(pretVanzare);
        pretVanzare = pretVanzare / 1.19;
        ptvaValue = ptvaValue.toFixed(2).replace(".", ",");
    
        pretVanzare = pretVanzare.toFixed(2).replace(".", ",");
        pvanzareInput.value = pretVanzare;
        ptvaInput.value = ptvaValue; 
    }
    

    refButton.click(); 
});

document.getElementById('Copiaza').addEventListener('click', function () {
    var textToCopy = document.getElementById('pvanzare');
    textToCopy.select();
    document.execCommand('copy');

    setTimeout(function () {
        document.getElementById('pfurnizor').value = '';
        document.getElementById('flexRadioDefault1').checked = false;
        document.getElementById('flexRadioDefault2').checked = false;
        document.getElementById('pvanzare').value = '0,00';
        document.getElementById('ptva').value = '0,00'; 
    }, 1500);
});



function resetValues() {
    document.getElementById('pfurnizor').value = '';
    document.getElementById('flexRadioDefault1').checked = false;
    document.getElementById('flexRadioDefault2').checked = false;
    document.getElementById('pvanzare').value = '0,00';
    document.getElementById('ptva').value = '0,00';
}


document.addEventListener('copy', function (event) {
    var selection = window.getSelection().toString();
    if (selection === document.getElementById('pvanzare').value || selection === document.getElementById('ptva').value) {
        
        setTimeout(function () {
            resetValues();
        }, 1500); 
    }
});


document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        var selection = window.getSelection().toString();
        if (selection === document.getElementById('pvanzare').value || selection === document.getElementById('ptva').value) {
            // Resetăm valorile doar dacă textul selectat este din pvanzare sau ptva
            setTimeout(function () {
                resetValues();
            }, 1500); 
        }
    }
});


document.getElementById('Copiaza').addEventListener('click', function () {
    var textToCopy = document.getElementById('pvanzare');
    textToCopy.select();
    document.execCommand('copy');

    setTimeout(function () {
        resetValues();
    }, 1500);
});


document.getElementById('CopiazaTVA').addEventListener('click', function () {
    var textToCopy = document.getElementById('ptva');
    textToCopy.select();
    document.execCommand('copy');

    setTimeout(function () {
        resetValues();
    }, 1500);
});



