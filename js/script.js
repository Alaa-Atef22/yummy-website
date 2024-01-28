$(window).ready(function (){$('#loading').fadeOut(3000);homeMeal();})
$('.openNav').click(function(){
let widthNav = $("#Menu").outerWidth();
    if(  widthNav == 0){
        $('.sidenav').animate({ width:'200px',},100)
        $(".content").animate({marginLeft :'200px'},100)
        $(".replaceIcon").removeClass("fa-bars");
        $(".replaceIcon").addClass("fa-x");
        for (let i = 0; i < 5; i++){$(".list li").eq(i).animate({bottom:80},(i+5) * 100)}
    }else{ 
    $('.sidenav').animate({ width:'0px'},100);
    $(".content").animate({marginLeft :'0px'},100)
    $(".replaceIcon").addClass("fa-bars");
    $(".replaceIcon").removeClass("fa-x");
    $(".list li").animate({bottom:''});
}})
$('.list li').click(function(){
    $('#loading').fadeIn(400)
    $(".list li").animate({bottom:''});
    $('.sidenav').animate({ width:'0px'},100);
    $(".content").animate({marginLeft :'0px'},100)
    $(".replaceIcon").addClass("fa-bars");
    $(".replaceIcon").removeClass("fa-x");
    $('#search').animate({ marginLeft :'10%'},100)
    $('#body').animate({ marginLeft :'10%'},100)
    $('#loading').fadeOut(400)})
/* Meal display*/
async function homeMeal() {
let response =  await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
disMeal( response.meals)}
function disMeal(data){
    let Box = "";
    for (let i = 0; i < data.length; i++) {
        Box += `<div class="col-md-3">
                    <div onclick="mealData('${data[i].idMeal}')" class="photo aa position-relative overflow-hidden rounded-5 ">
                    <img class=" w-100" src="${data[i].strMealThumb}" alt="food" >
                    <div class="layer d-flex position-absolute ">
                    <h3 class="m-auto font">${data[i].strMeal}</h3>
                    </div>
                </div>
        </div>`}$('#body').html(Box)}
/* Meal Details*/
async function mealData(id) {
$('#body').html('')
$('#loading').fadeIn(50)
let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)).json();
mealDetails(response.meals[0])}
function mealDetails(contant){
let list = ``;
for (let i = 1;i<=20;i++) {if (contant[`strIngredient${i}`]){
list += `<li class="alert back m-2 p-2">${contant[`strMeasure${i}`]}${contant[`strIngredient${i}`]}</li>`}}
let tag = contant.strTags?.split(",") 
if (!tag){ tag = []};
let tags = "";
for (let i = 0; i < tag.length; i++){tags += `<li class="alert backg m-2 p-1">${tag[i]}</li>`}
let Box = `<div class="col-md-4 ">
            <img class="w-100 rounded-3 d-flex " src="${contant.strMealThumb}"alt="meal">
            <h2 class="font pt-5 ms-5">${contant.strMeal}</h2>
            </div>
            <div class="col-md-8 ps-5">
                <h2 class="font">Instructions</h2>
                <p class="lead">${contant.strInstructions}</p>
                <h3><span class="fw-bolder font ">Area : </span>${contant.strArea}</h3>
                <h3><span class="fw-bolder font">Category : </span>${contant.strCategory}</h3>
                <h3 class="font">Recipes :</h3>
                <ul class="list-unstyled d-flex g-2 flex-wrap">${list}</ul>
                <h3 class="font" >Tags :</h3>
                <ul class="list-unstyled d-flex g-2 flex-wrap">${tags}</ul>
                <a target="_blank" href="${contant.strSource}" class="btn btn-success rounded-5">Source</a>
                <a target="_blank" href="${contant.strYoutube}" class="btn btn-danger rounded-5">Youtube</a>
            </div>`
            $('#body').html(Box); $('#loading').fadeOut(700)}
/*search*/
function search() {
    $('#search').html( `
    <div class="shad row py-3 show">
        <div class="col-md-6 ">
        <input onkeyup="searchName(this.value)" class="form-control " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
        <input onkeyup="searchLetter(this.value)" maxlength="1" class="form-control " type="text" placeholder="Search By First Letter">
        </div>
    </div>`)
$('#body').html(" ") 
$('#body').click (function(){$('#search').hide(10)})
$('.search').click (function(){$('#search').show(10)})}
async function searchName(letter) {
    $('#body').html(" ")
    let response = await( await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)).json();
if(response.meals){disMeal(response.meals) }else{disMeal([])}}
async function searchLetter(letter) {
    $('#body').html(" ")
    let response =  await( await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)).json();
    if(response.meals){disMeal(response.meals)}else{disMeal([])}}
/* Categories*/
async function CategoriesData() {
    $('#search').html(" ")
    let response =await( await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)).json();
   Categories(response.categories)}
async function MealCategory(category){
    $('#body').html(" ")
    let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)).json();
    disMeal(response.meals.slice(0, 20))}
function Categories(data) {
    let Box = "";
    for (let i = 0; i < data.length; i++) {
        Box += `
        <div class="col-md-3">
                <div onclick="MealCategory('${data[i].strCategory}')" class="photo aa position-relative overflow-hidden rounded-5">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="food" >
                    <div class="layer position-absolute text-center font p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `}
    $('#body').html(Box)}
/*area */
async function areaData() {
    $('#body').html(" ")
    let response =await( await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)).json();
    Area(response.meals)}
async function MealArea(area) {
    $('#body').html(" ")
    let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)).json();
    disMeal(response.meals.slice(0, 20))}
function Area(data) {
    let Box = "";
    for (let i = 0; i < data.length; i++) {
        Box += `
        <div class="col-md-3 yellow">
                <div onclick="MealArea('${data[i].strArea}')" class="aa rounded-5 text-center ">
                    <img class="w-100" src="${data[i].strareaThumb}" alt="" >
                    <i class=" fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `}
    $('#body').html(Box)}
/*Ingredients */
async function ingredientsData() {
    $('#body').html(" ")
    let response =await( await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)).json();
    Ingredients(response.meals.slice(0, 20))}
async function MealIngredients(Ingredient) {
    $('#body').html(" ")
    let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredient}`)).json();
    disMeal(response.meals.slice(0, 20))}
function Ingredients(data) {
    let Box = "";
    for (let i = 0; i < data.length; i++) {
        Box += `
        <div class="ing col-md-3  yellow g-3 text-center">
        <div onclick="MealIngredients('${data[i].strIngredient}')" class="aa rounded-5  ps-3 ">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${data[i].strIngredient}</h3>
        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p></div>
        </div>`}
    $('#body').html(Box)}
/*contact */
function contact(){
    $('#body').html( `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-3">
            <div class="col-md-6">
                <input id="name" onkeyup="checks(validationName());" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-warning w-100 mt-2 d-none">
                Site name must contain at least 6 characters
                </div>
            </div>
            <div class="col-md-6">
                <input id="email" onkeyup=" checks(validationEmail());" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-warning w-100 mt-2 d-none">
                    Email not valid *exemple@gmail.com*
                </div>
            </div>
            <div class="col-md-6">
                <input id="phone" onkeyup=" checks(validationPhone());" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-warning w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="age" onkeyup=" checks(validationAge());" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-warning w-100 mt-2 d-none">
                    Enter valid age "18-65"
                </div>
            </div>
            <div class="col-md-6">
                <input  id="password" onkeyup=" checks(validationPassword()); " type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-warning w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repassword" onkeyup=" checks(validationRepassword());" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-warning w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submit"  class="disabled submit btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `) ;
}
/*validation*/
 function validationName(){
    let x= $("#name").val();
       let rexeName=/^[a-zA-Z ](\s*\w\s*){6}/; 
        if (rexeName.test (x) == true){
            $("#nameAlert").addClass("d-none");
            $("#nameAlert").removeClass("d-block");
    return true;
        }else{
            $("#nameAlert").removeClass("d-none");
            $("#nameAlert").addClass("d-block");
        return false;
      }
};
function validationEmail(){
    let x= $("#email").val();
       let rexeemail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        if (rexeemail.test (x) == true){
            $("#emailAlert").addClass("d-none");
            $("#emailAlert").removeClass("d-block");
    return true;
        }else{
            $("#emailAlert").removeClass("d-none");
            $("#emailAlert").addClass("d-block");
        return false;
      }
};
function validationPhone(){
    let x= $("#phone").val();
       let rexephone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; 
        if (rexephone.test (x) == true){
            $("#phoneAlert").addClass("d-none");
            $("#phoneAlert").removeClass("d-block");
    return true;
        }else{
            $("#phoneAlert").removeClass("d-none");
            $("#phoneAlert").addClass("d-block");
        return false;
      }
};
function validationAge(){
    let x= $("#age").val();
       let rexeage=/^(1[8-9]|[2-5][0-9]|6[0-5])$/; 
        if (rexeage.test (x) == true){
            $("#ageAlert").addClass("d-none");
            $("#ageAlert").removeClass("d-block");
    return true;
        }else{
            $("#ageAlert").removeClass("d-none");
            $("#ageAlert").addClass("d-block");
        return false;
      }
};
function validationPassword(){
    let x= $("#password").val();
       let rexepassword=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/; 
        if (rexepassword.test (x) == true){
            $("#passwordAlert").addClass("d-none");
            $("#passwordAlert").removeClass("d-block");
    return true;
        }else{
            $("#passwordAlert").removeClass("d-none");
            $("#passwordAlert").addClass("d-block");
        return false;
      }
};
function validationRepassword(){
        if ($("#password").val() == $("#repassword").val()){
            $("#repasswordAlert").addClass("d-none");
            $("#repasswordAlert").removeClass("d-block");
    return true;
        }else{
            $("#repasswordAlert").removeClass("d-none");
            $("#repasswordAlert").addClass("d-block");
        return false;
      }
};
function checks(){
if (validationName() === true&& validationEmail() === true && validationPhone() === true&& validationAge() === true && validationPassword()  === true&& validationRepassword() === true) {
    $("#submit").removeClass("disabled");
} else {
    $("#submit").addClass("disabled");}}
