const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList";
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList";
const BOOKSHELF_ITEMID = "itemId";

function makeBookhelf(title, author, year, isComplete){
    const textTitle = document.createElement("h3")
    textTitle.innerText = title

    const textAuthor = document.createElement("p")
    textAuthor.innerText = author

    const textYear = document.createElement("p")
    textYear.innerText = year

    const container = document.createElement("article")
    container.classList.add("book_item")
    container.append(textTitle, textAuthor, textYear)

    const buttonGreen = document.createElement("button")
    buttonGreen.classList.add("green")

    if(isComplete){
        buttonGreen.innerText = "Belum selesai dibaca"
    } else {
        buttonGreen.innerText = "Selesai dibaca"
    }

    const buttonRed = document.createElement("button")
    buttonRed.classList.add("red")
    buttonRed.innerText = "Hapus buku"


    const containerStatus = document.createElement("action")
    containerStatus.classList.add("action")
    containerStatus.append(buttonGreen, buttonRed)

    return container

}


function addBookshelf(){
    const unComplateBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const complateBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)
    const bookTitle = document.getElementById("inputBookTitle").value
    const bookAuthor = document.getElementById("inputBookAuthor").value
    const bookYear = document.getElementById("inputBookYear").value
    const bookComplete = document.getElementById("inputBookIsComplete").checked

    const bookshelf = makeBookhelf(bookTitle, bookAuthor, bookYear, bookComplete)
    const bookshelfObject = composeTodoObject(bookTitle, bookAuthor, bookYear, bookComplete)
    

    bookshelf[BOOKSHELF_ITEMID] = bookshelfObject.id
    bookshelfs.push(bookshelfObject)

    if(bookComplete){
        complateBookshelfList.append(bookshelf)
    } else {
        unComplateBookshelfList.append(bookshelf)
    }
    
    updateDataToStorage();
}

function refreshDataFromBookshelfs(){
    const unComplateBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const complateBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)

    for (let book of bookshelfs){
        const newBook = makeBookhelf(book.title, book.author, book.year, book.isCompleted)
        newBook[BOOKSHELF_ITEMID] = book.id

        if(book.isCompleted){
            complateBookshelfList.append(newBook)
        } else {
            unComplateBookshelfList.append(newBook)
        }
    }
}