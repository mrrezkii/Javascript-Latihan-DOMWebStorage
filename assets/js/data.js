const STORAGE_KEY = "BOOKSHELF_APPS"

let bookshelfs = []

function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Your password not supported")
        return false
    } 
    return true
}

function postData(){
    const parsed = JSON.stringify(bookshelfs)
    localStorage.setItem(STORAGE_KEY, parsed)
    document.dispatchEvent(new Event("ondatasaved"))
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData)
    
    if(data !== null)
        bookshelfs = data

    document.dispatchEvent(new Event("ondataloaded"))
}

function updateDataToStorage() {
    if(isStorageExist())
        postData()
}

function composeBookshelfObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year, 
        isCompleted
    };
}

function findBook(id){
    for (let book of bookshelfs){
        if(book.id === id){
            return book
        }
    }
    return null
}

function findBookIndex(id){
    let index = 0 
    for (let book of bookshelfs){
        if(book.id === id){
            return index
        }

        index++
    }
    return -1
}