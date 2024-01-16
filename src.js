let BASE_URL = 
'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies'


let dropdowns = document.querySelectorAll('.dropdown select')
let btn = document.querySelector('form button');
let fromCurr = document.querySelector('.from select');
let toCurr = document.querySelector('.to select');
let msg = document.querySelector('.msg');

for(let select of dropdowns){
for( currCode in countryList){
    let newOption = document.createElement('option');
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name==='from' && currCode==='USD'){
        newOption.selected = 'selected';
    }
    else if(select.name==='to' && currCode==='INR'){
        newOption.selected = 'selected';
    }
    select.append(newOption);
}

select.addEventListener('change' , (evt)=>{
    updateFlag(evt.target);
    
})
}


const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;


}

btn.addEventListener('click' ,async(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    // console.log(amtVal)
    if(amtVal==='' || amtVal<1){
        amtVal = 1;
        amount.value = 1;

    }

    // console.log(fromCurr.value,toCurr.value)

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    // console.log(response)
    let data = await response.json();
    let rate =  data[toCurr.value.toLowerCase()];
    let finalAmount = rate*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`


})