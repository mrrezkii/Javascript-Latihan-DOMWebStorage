document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("inputBook")
    const findData = document.getElementById("searchBook")


    submitForm.addEventListener("submit", function (event) {
        event.preventDefault()
        addBookshelf()
    })

    findData.addEventListener("submit", function(event){
        event.preventDefault()
        findBookshelf(event.target.parentElement)    
    })

    if(isStorageExist()){
        loadDataFromStorage()
    }

})

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.")
})

document.addEventListener("ondataloaded", () => {
    refreshDataFromBookshelfs()
})
