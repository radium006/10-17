const database = firebase.database();
const catRef = database.ref('categories')



function displayStuff(catArr){
    let liItems = catArr.map(function(cat){
        return `<li>${cat.Category}</li>`

    })
    $("#list").html(liItems)
}

$('#addCat').click(function(){
    $("#inputform").toggle("slow","swing")
})

$('#submit').click(function(){
    let catName = $("#enter").val()
    let catRef = database.ref("categories").push()
    catRef.set({
        Category: catName
    })
    $("#inputform").toggle("slow","swing")
    //alert("Category added")

})

$("#showAll").click(function(){
    catArr = []
    
    catRef.on('value',function(snapshot){
        snapshot.forEach(function(child){
            catArr.push(child.val())
        })      
    })
    displayStuff(catArr)
})