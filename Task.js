/* Main Array of Books  */
var arr = []; 


/* Classes */
var Book = function(BName,BPrice,AName,AEmail){
    this.BookName = BName; 
    this.BookPrice = BPrice; 
    this.Auth = new Author(AName,AEmail);
}

var Author = function(AuthName,AuthEmail){
    this.AuthorName = AuthName; 
    this.AuthorEmail = AuthEmail; 
}



/* Regular Expressions */
var NumRgx = /^[0-9]*$/;
var WordsRgx = /\b[A-Za-z]{3,}\b/;  
var EmailRgx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;



/* DOM Elements */
var welcomepage = document.getElementById('Welcomepage');
var num = document.getElementById('num');
var Enterbutton = document.getElementById('EnterNum');
var form = document.getElementsByTagName('form')[0];
var inputs = document.querySelectorAll('form input');
var spans = document.getElementsByTagName('span');
var label = document.getElementsByTagName('label');
var tbody = document.getElementsByTagName('tbody')[0];
var Add = document.getElementById('Add');
var reset = document.getElementById('reset');



/* When the user enter the number of books hide and display the form */
Enterbutton.addEventListener('click',function(){
    if(num.value > 0 && NumRgx.test(num.value) ){
        welcomepage.style.display = 'none';
        form.style.display = 'flex';
    }
})  



/* Reset or Set all inputs to be Empty */
var Reset = function(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value = '';
    }
}


/* Check Empty Fields */
var IsNotEmpty = function(){
    var counter = 0;
    for(i=0;i<inputs.length;i++){

        if( inputs[i].value.length !== 0 ){ counter++; spans[i].textContent='' } 
        else{ spans[i].textContent = label[i].innerText+ ' Field is Required';}
        
    }
    return counter === inputs.length;
}


/* Check Validation Fields */
var IsValid = function(){
    
    var counter = 0 ;
    
    if( !WordsRgx.test( inputs[0].value) && inputs[0].value.trim() !== '' ){
        spans[0].textContent = 'Enter a words only and more than 3 letters'; counter++;
    }
    if(!NumRgx.test( Number(inputs[1].value)) && inputs[1].value.trim() !== '' ) {
        spans[1].textContent = 'Enter a numbers only'; counter++;
    }
    if( !WordsRgx.test( inputs[2].value) && inputs[2].value.trim() !== ''  ){
        spans[2].textContent = 'Enter a words only and more than 3 letters'; counter++;
    }
    if(!EmailRgx.test( inputs[3].value) && inputs[3].value.trim() !== ''  ){
        spans[3].textContent = 'Enter a valid Email format'; counter++;
    }
    
    return counter === 0 ; // if counter = 0 so it didn't change then it's valid //
}


/* Check if Form is not Empty and contain valid Data */
var IsFormValid = function(){ 
    var empty = IsNotEmpty();
    var valid = IsValid();
    return empty && valid;
}



/* Delete Row */
var DeleteRow = function(){

    arr.splice(this.value,1);
    tbody.textContent ='';
    DisplayData();

    /* Hide Table and Display first page */
    if(arr.length === 0 ){
        welcomepage.style.display = 'block';
        document.getElementById('TableDiv').style.display='none';
    }
}




/* Edit Row */
var EditRow = function(){
    
    var OldValues = [];
    var RowNum = this.value;
    var row = document.querySelectorAll('tbody tr')[RowNum];
    
    var CancelFunction = function(){
        
        /* Assign row values to the old values */
        for(var i=0; i<4; i++){
            row.children[i].textContent='';
            var td = document.createElement('td');
            td.textContent = OldValues[i];
            row.children[i].append(td);
        }
        
        
        /* change buttons to edit and delete again */
        var EditButton = document.createElement('button');
        var DeleteButton = document.createElement('button');
        
        EditButton.textContent = OldValues[4];
        DeleteButton.textContent = OldValues[5];
        
        // Hide the inputs //
        row.children[4].textContent='';
        row.children[5].textContent=''; 

        // Return buttons values to the row number //
        EditButton.value = RowNum; 
        DeleteButton.value = RowNum;
        
        EditButton.className = 'EditButton';
        DeleteButton.className = 'DeleteButton';
        
        
        EditButton.addEventListener('click',EditRow);
        DeleteButton.addEventListener('click',DeleteRow);
        
        // Assign the buttons to the <td> in the row //
        row.children[4].append(EditButton);
        row.children[5].append(DeleteButton);

    }


    var SaveFunction = function(){
        /* Checking if the edit data is valid if not don't save */

        if(WordsRgx.test(row.children[0].firstElementChild.value)){
            arr[RowNum].BookName = row.children[0].firstElementChild.value;
        }
        if(NumRgx.test(row.children[1].firstElementChild.value)){
            arr[RowNum].BookPrice = row.children[1].firstElementChild.value;
        }
        if(WordsRgx.test(row.children[2].firstElementChild.value)){
            arr[RowNum].Auth.AuthorName = row.children[2].firstElementChild.value;
        }
        if(EmailRgx.test(row.children[3].firstElementChild.value)){
            arr[RowNum].Auth.AuthorEmail = row.children[3].firstElementChild.value;
        }

        tbody.textContent='';
        DisplayData();

    }
    
    /* create inputs for editing */
    var BName = document.createElement('input');        
    var BPrice = document.createElement('input');        
    var AName = document.createElement('input');        
    var AEmail = document.createElement('input');  



    var EditButton = document.createElement('button');
    var DeleteButton = document.createElement('button');

    EditButton.value = RowNum;
    DeleteButton.value = RowNum;



    

    var CancelButton = document.createElement('button');
    var SaveButton = document.createElement('button');

    CancelButton.textContent = 'Cancel';
    SaveButton.textContent = 'Save';


    CancelButton.className = 'EditButton Cancel';
    SaveButton.className = 'EditButton Save';


    CancelButton.addEventListener('click',CancelFunction)
    SaveButton.addEventListener('click',SaveFunction)

    
    
    for(var i=0; i<6; i++){
        OldValues.push(row.children[i].textContent);
        row.children[i].textContent='';
    }
    
    
    row.children[0].append(BName)
    row.children[1].append(BPrice);
    row.children[2].append(AName);
    row.children[3].append(AEmail);
    row.children[4].append(CancelButton);
    row.children[5].append(SaveButton);
    
    /* Assign the object in the array values to the input field */
    for(var i=0; i<4; i++){
      row.children[i].firstElementChild.value = OldValues[i];
    }

}




/* Display function to insert all data in array to table and make it visable */
var DisplayData = function(){
    
    for(var i=0; i<arr.length;i++){

            
        var tr  = document.createElement('tr'); 
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var EditButton = document.createElement('button');
        var DeleteButton = document.createElement('button');
        
        
        
        td1.textContent = arr[i].BookName;
        td2.textContent = arr[i].BookPrice;
        td3.textContent = arr[i].Auth.AuthorName;
        td4.textContent = arr[i].Auth.AuthorEmail;
        EditButton.textContent = 'Edit';
        DeleteButton.textContent = 'Delete';
        EditButton.className = 'EditButton';
        DeleteButton.className = 'DeleteButton';
        
        
        EditButton.value = i;
        DeleteButton.value = i;
        
        EditButton.addEventListener('click',EditRow);
        DeleteButton.addEventListener('click',DeleteRow);
        
        
        td5.append(EditButton);
        td6.append(DeleteButton);
        tr.append(td1,td2,td3,td4,td5,td6);
        tbody.append(tr);
        
    }
    
    /* Hide Form and Display Table */
    form.style.display = 'none'
    document.getElementById('TableDiv').style.display='block';
    
}



/* Add Data to the Main Array of Books */
var AddToArray = function(e){
    e.preventDefault();
    
    if(!IsFormValid()){return} // if form is not valid end the function //
    
    var NewBook = new Book(inputs[0].value,inputs[1].value,inputs[2].value,inputs[3].value);
    arr.push(NewBook);
    
    /* If Array reach the number of books user entered display them all */
    if(arr.length.toString() === num.value) DisplayData();
    
    Reset(); /* To Reset inputs after adding book */
}

Add.addEventListener('click',AddToArray);
reset.addEventListener('click',Reset);