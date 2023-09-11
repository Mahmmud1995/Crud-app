// declare variables
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateId;
var productContainer = [];
if (localStorage.getItem("productsList") == null) {
  productContainer = [];
} else {
  productContainer = JSON.parse(localStorage.getItem("productsList"));
  displayProduct();
}
// function linked with button(add product) to take values from user and display it
function addProduct() {
  if (checkInputs() == true) {
    var product = {
      pName: productNameInput.value,
      pPrice: productPriceInput.value,
      pCategory: productCategoryInput.value,
      pDesc: productDescInput.value,
    };

    productContainer.push(product);
    localStorage.setItem("productsList", JSON.stringify(productContainer));
    clearForm();
    displayProduct();
  } else {
    alert("You must fill all inputs!");
  }
}
// function to clear form after filling all inputs with data and call it in addProduct form
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

// function to displaying all users products just when he click on (add product) button by using display products function
function displayProduct() {
  var cartona = ``;
  for (var i = 1; i < productContainer.length; i++) {
    cartona += `<tr>
    <td>${[i]}</td>
    <td>${productContainer[i].pName}</td>
    <td>${productContainer[i].pPrice}</td>
    <td>${productContainer[i].pCategory}</td>
    <td>${productContainer[i].pDesc}</td>
    <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
    <td><button onclick="deleteProduct(${i});" class="btn btn-danger">Delete</button></td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

// a simple function to check if the user completed all the inputs to not add an empty line in the table of product
function checkInputs() {
  if (
    productNameInput.value != "" &&
    productPriceInput.value != "" &&  
    productCategoryInput.value != "" &&
    productDescInput.value != ""
  ) {
    return true;
  } else {
    return false;
  }
}

// a function to delete products => giving user the availability to delete any product that he entered any data or product
function deleteProduct(index) {
  productContainer.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(productContainer));
  displayProduct();
}

function searchProduct(searchTerm) {
  var cartoona = ``;
  for (var i = 1; i < productContainer.length; i++) {
    if (
      productContainer[i].pName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      cartoona += `<tr>
      <td>${[i]}</td>
      <td>${productContainer[i].pName}</td>
      <td>${productContainer[i].pPrice}</td>
      <td>${productContainer[i].pCategory}</td>
      <td>${productContainer[i].pDesc}</td>
      <td><button onclick="setFormForUpdate(${i})" class="btn btn-warning">Update</button></td>
      <td><button onclick="deleteProduct(${i}) ;" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

function setFormForUpdate(i) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productNameInput.value = productContainer[i].pName;
  productPriceInput.value = productContainer[i].pPrice;
  productCategoryInput.value = productContainer[i].pCategory;
  productDescInput.value = productContainer[i].pDesc;
  updateId = i;
}

function updateData() {
  productContainer[updateId].pName = productNameInput.value;
  productContainer[updateId].pPrice = productPriceInput.value;
  productContainer[updateId].pCategory = productCategoryInput.value;
  productContainer[updateId].pDesc = productDescInput.value;
  localStorage.setItem("productsList", JSON.stringify(productContainer));
  clearForm();
  displayProduct();
}

