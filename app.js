//hide preloader
//window event list
eventListeners();//due to hoisting in JS we can call the function before or after the function has been declared

//eventlisteners 
function eventListeners(){
    const ui=new UI();
    //preloader
    window.addEventListener('load',function(){
        ui.preloader();
    })
    //navBTN
    document.querySelector('.navBtn').addEventListener('click',function(){
       ui.showNav();
    }) 
    //videoControls
    document.querySelector('.video_switch').addEventListener('click',function(){
        ui.videoControls();
    })
    //submit the form
    document.querySelector('.drink-form').addEventListener('submit',function(event){
         event.preventDefault();
         const name=document.querySelector('.input-name').value;
         const lastName=document.querySelector('.input-lastname').value;
         const email=document.querySelector('.input-email').value;
         let value = ui.checkEmpty(name, lastName, email);//to check empty values
    
        console.log(value);//returns true or false

         if(value){
             let customer = new Customer(name,lastName,email);
             console.log(customer);
             ui.addCustomer(customer);
             ui.showFeedback('customer added to the list','success');
             ui.clearFields();

         }else{
             ui.showFeedback('Some form values are empty','error')
         }
    })
    //display model
    let links=document.querySelectorAll('.work-item_icon');
    links.forEach(function(item){
        item.addEventListener('click',function(event){
            ui.showModel(event);
        })
    })
    //close model
    document.querySelector('.work-model-close').addEventListener('click',function(){
        ui.closeModel();
    })
}
//constructor function
function UI(){

}
// hide preloader
UI.prototype.preloader= function() 
{ 
    document.querySelector('.preloader').style.display='none';
}
//show nav
UI.prototype.showNav=function() {
    document.querySelector('.nav').classList.toggle('nav_show');
}
//video btnSlide
UI.prototype.videoControls = function(){
    let btn=document.querySelector('.video_switch_btn');
if(!btn.classList.contains('btnSlide')){
    btn.classList.add('btnSlide');
    document.querySelector('.video_item').pause();
}else{
    btn.classList.remove('btnSlide');
    document.querySelector('.video_item').play();
}
}
//check for empty values
UI.prototype.checkEmpty = function (name, lastName, email) {
    let result;
    if(name===''||lastName===''||email==='') {
        
        result = false;
        
    }
    else {
        result = true;
        
    }
    return result;
}
UI.prototype.showFeedback = function (text,type){
    let feedback=document.querySelector('.drink-form_feedback');
    
    if(type ==='success'){
        feedback.classList.add('success');
        feedback.innerText=text;
        this.removeAlert('success');
    }
    
    else if (type ==='error'){
        feedback.classList.add('error');
        feedback.innerText=text;
        this.removeAlert('error');
    }
}
//removing the alert
UI.prototype.removeAlert=function(type){
    setTimeout(function(){
document.querySelector('.drink-form_feedback').classList.remove(type);
    },3000)
}
//addCustomer
UI.prototype.addCustomer=function(customer){
    let images=[1,2,3,4,5];
    let random=Math.floor(Math.random()*images.length);
    const div=document.createElement('div');
    div.classList.add('person');
    div.innerHTML=`
    <img src="./images/person-${random}.jpg" alt="person"class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_lastname">${customer.lastName}</h4>`
    document.querySelector('.drink-card_list').appendChild(div);
}
//clear fields
UI.prototype.clearFields=function(){
         
    document.querySelector('.input-name').value = '';
         document.querySelector('.input-lastname').value ='';
         document.querySelector('.input-email').value ="";
}
//show model
UI.prototype.showModel=function(event){
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item_icon')){
        let id=event.target.parentElement.dataset.id;
        const model=document.querySelector('.work-model');
        const modelItem=document.querySelector('.work-model-item');
        model.classList.add('work-model-show');
        modelItem.style.backgroundImage=`url(images/work-${id}.jpg)`;
    }
}
//closeModel
UI.prototype.closeModel=function(){
    document.querySelector('.work-model').classList.remove('work-model-show');
}

function Customer(name,lastName,email){
    this.name=name;
    this.lastName=lastName;
    this.email=email;
}