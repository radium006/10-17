const database = firebase.database();
const catRef = database.ref('categories')

inputbox = $("#enter")

let items = []
let categories = [] // holds all database elements

$('#submitButton').click(function(){
    let category_name = inputbox.val()
    addCategory(category_name)
})

function addCategory(category){
    
    catRef.child(category).set({name : category})
}

function addItem(btn, category){
    let groceryItem = btn.previousElementSibling.value
    let itemRef = catRef.child(category).child("items")
    itemRef.child(groceryItem).set({
        item: groceryItem,
    })
}

function configureObservers(){ //serts up the observer so that database is auto-updated
    catRef.on('value', function(snapshot){
        categories = []
        
        snapshot.forEach(function(childSnapshot){
            categories.push(childSnapshot.val())
        })
        displayCategories()
    })
}

function createItemList(category){
    if(category.items == null) {
        return ''
      }
    else{
        let itemElms = ""
        for(item in category.items){
            itemElms += `<li>${item}</li>`
        }
        return itemElms
    }  
}

function displayCategories(){ //displays the current cat list
    
    let liItem = categories.map(function(category){

        
        return `<li>
        <label>${category.name}</lable>
        <input type ="text" placeholder = "Enter item to add">
        <button onclick="addItem(this, '${category.name}')">Add Item</button>
        <ul id="itemList">${createItemList(category)} </ul>
        </li>`
    })
    list.innerHTML = liItem.join(' ')
}

configureObservers()