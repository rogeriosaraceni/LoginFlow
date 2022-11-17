/* ////////////////////////////////////////////////////////////////////
 *
 *  validPassword
 *  v2.3 - 16 Nov 2022
 *  Dev: Rogerio Saraceni
 *
 * //////////////////////////////////////////////////////////////////// */


/*! --------------------------------------------------------------------
* variables
* --------------------------------------------------------------------*/
const form               = document.querySelector('[data-js="form"]')
const checkMsgCurrentNew = document.querySelector('.check-msg-current-new')
const checkMsgNewConfirm = document.querySelector('.check-msg-new-confirm')
const currentPass        = document.querySelector('[data-js="currentPass"]')
const newPass            = document.querySelector('[data-js="newPass"]')
const newPassConfirm     = document.querySelector('[data-js="newPassConfirm"]')
const lowerCase          = document.querySelector('[data-valid="lowerCase"]')
const upperCase          = document.querySelector('[data-valid="upperCase"]')
const number             = document.querySelector('[data-valid="number"]')
const length             = document.querySelector('[data-valid="length"]')

let passwordStrength = document.querySelector('[data-progress="pass-strength"]')

/*! --------------------------------------------------------------------
* mostra senha
* --------------------------------------------------------------------*/
let btnShowAllPassword = document.querySelectorAll('.btn-showPass')

btnShowAllPassword.forEach( item => {
    item.addEventListener('click', () => {
        item.children[0].classList.toggle("bi-unlock");
        const inputPass = item.parentNode.children[0]
        const type = inputPass.getAttribute("type") === "password" ? "text" : "password";
        inputPass.setAttribute("type", type)
    })
})

/*! --------------------------------------------------------------------
* captura de digitacao
* --------------------------------------------------------------------*/
if (newPass) {
    newPass.onkeyup = () => {
        let strength = 0;

        // Validate lowercase letters
        const lowerCaseLetters = /[a-z]/g;
        if (newPass.value.match(lowerCaseLetters)) {
            strength += 1;
            lowerCase.classList.remove('invalid');
            lowerCase.classList.add('valid');
        } else {
            lowerCase.classList.remove('valid');
            lowerCase.classList.add('invalid');
        }

        // Validate capital letters
        const upperCaseLetters = /[A-Z]/g;
        if (newPass.value.match(upperCaseLetters)) {
            strength += 1;
            upperCase.classList.remove('invalid');
            upperCase.classList.add('valid');
        } else {
            upperCase.classList.remove('valid');
            upperCase.classList.add('invalid');
        }

        // Validate numbers
        const numbers = /[0-9]/g;
        if (newPass.value.match(numbers)) {
            strength += 1;
            number.classList.remove('invalid');
            number.classList.add('valid');
        } else {
            number.classList.remove('valid');
            number.classList.add('invalid');
        }

        // Validate length
        if (newPass.value.length >= 8) {
            strength += 1;
            length.classList.remove('invalid');
            length.classList.add('valid');
        } else {
            length.classList.remove('valid');
            length.classList.add('invalid');
        }

        /*! --------------------------------------------------------------------
        * barra de progresso
        * --------------------------------------------------------------------*/
        if (strength == 1) {
            passwordStrength.classList.add('bg-success');
            passwordStrength.style = 'width: 25%';
        } else if (strength == 2) {
            passwordStrength.style = 'width: 50%';
        } else if (strength == 3) {
            passwordStrength.style = 'width: 75%';
        } else if (strength == 4) {
            passwordStrength.style = 'width: 100%';
        } else {
            passwordStrength.classList.remove('bg-success');
        }
    }
}

/*! --------------------------------------------------------------------
* Bloqueia espaço nos campos de senha
* --------------------------------------------------------------------*/
const noSpace = e => {
    if (e.key === " ") {
        e.preventDefault()
        alert('Não é permitido espaço nos campos de senha!')
    }
}
const noPaste = e => {
    e.preventDefault()
    alert('Não é permitido copiar e colar nos campos de senha!')
}

let inputsAllPassword = document.querySelectorAll('input[type="password"')

inputsAllPassword.forEach(item => {
    item.addEventListener('keypress', e => noSpace(e))
    item.addEventListener('paste', e => noPaste(e))
})

/*! --------------------------------------------------------------------
* compara atual com nova / nova com comfirmada
* --------------------------------------------------------------------*/
form?.addEventListener('submit', (e) => {
    if (currentPass) {
        if (currentPass.value === newPass.value) {
            e.preventDefault()
            checkMsgCurrentNew.style.display = 'block';
        }
        else {
            checkMsgCurrentNew.style.display = 'none';
        }
    }

    if (newPass.value !== newPassConfirm.value) {
        e.preventDefault()
        checkMsgNewConfirm.style.display = 'block';
    }
    else {
        checkMsgNewConfirm.style.display = 'none';
    }
})
