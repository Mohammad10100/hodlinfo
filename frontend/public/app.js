const API_ENDPOINT= 'http://localhost:4000/api/v1/tickers/fetch'
let tablebody = document.getElementsByTagName('tbody');


async function getTickers(){
    console.log('hello');
    console.log(API_ENDPOINT);
    try {
        const result = await fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then(function (response) {
            console.log(response.data, 'result');

            let addToHtml = "";

            // console.log(response.data, 'data');
            for (let index = 0; index < response.data.length; index++) {
                // console.log(response.data[index].name, 'data index');
                
                addToHtml += `
                <tr>
                <th><h4 class="tablerow-heading">${index+1}</h4></th>
                <th><h4 class="tablerow-heading">${response.data[index].name}</h4></th>
                <th><h4 class="tablerow-heading">₹ ${response.data[index].last}</h4></th>
                <th><h4 class="tablerow-heading">₹ ${response.data[index].buy}/ ₹ ${response.data[index].sell}</h4></th>
                <th><h4 class="tablerow-heading">-</h4></th>
                <th><h4 class="tablerow-heading">-</h4></th>
                </tr>
                `
                
            }
            console.log(tablebody[0].innerHTML);
            tablebody[0].innerHTML = addToHtml;
        })
        .catch(function (error) {
            console.log("couldn't fetch the result ");
            console.error(error);
        });   
    } catch (error) {
        console.error('some error occurd',error);
    }

}



window.onload = function (e) {
    getTickers();
}
