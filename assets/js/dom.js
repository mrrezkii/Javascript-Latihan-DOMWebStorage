const UNCOMPLETED_LIST_BOOKSHELF_ID = "incompleteBookshelfList"
const COMPLETED_LIST_BOOKSHELF_ID = "completeBookshelfList"
const BOOKSHELF_ITEMID = "itemId"

function makeBookhelf(title, author, year, isComplete){
    const textTitle = document.createElement("h3")
    textTitle.innerText = title

    const textAuthor = document.createElement("p")
    textAuthor.innerText = ("Penulis : " + author)

    const textYear = document.createElement("p")
    textYear.classList.add("p-year")
    textYear.innerText = ("Tahun : " + year)

    const container = document.createElement("article")
    container.classList.add("book_item")

    container.append(textTitle, textAuthor, textYear)

    const containerStatus = document.createElement("action")
    containerStatus.classList.add("action")
    containerStatus.append(createButtonDone(isComplete), createButtonRemove())

    container.append(containerStatus)

    return container
}


function addBookshelf(){
    const unCompletedBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const completedBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)

    const bookTitle = document.getElementById("inputBookTitle").value
    const bookAuthor = document.getElementById("inputBookAuthor").value
    const bookYear = document.getElementById("inputBookYear").value
    const bookComplete = document.getElementById("inputBookIsComplete").checked

    const bookshelf = makeBookhelf(bookTitle, bookAuthor, bookYear, bookComplete)
    const bookshelfObject = composeBookshelfObject(bookTitle, bookAuthor, bookYear, bookComplete)
    
    bookshelf[BOOKSHELF_ITEMID] = bookshelfObject.id
    bookshelfs.push(bookshelfObject)

    if(bookComplete){
        completedBookshelfList.append(bookshelf)
    } else {
        unCompletedBookshelfList.append(bookshelf)
    }
    
    updateDataToStorage();
}

function refreshDataFromBookshelfs(){
    const unCompletedBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const completedBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)

    for (let book of bookshelfs){
        const newBook = makeBookhelf(book.title, book.author, book.year, book.isCompleted)
        newBook[BOOKSHELF_ITEMID] = book.id

        if(book.isCompleted){
            completedBookshelfList.append(newBook)
        } else {
            unCompletedBookshelfList.append(newBook)
        }
    }
}

function createButtonRemove(){
    return createButton("red", "Hapus buku", function(event){
        removeBook(event.target.parentElement.parentElement)
    })
}

function createButtonDone(isComplete){
     if(isComplete){
        return createButton("green", "Belum selesai dibaca", function(event){
            moveToTodo(event.target.parentElement.parentElement)
        })
    } else {
        return createButton("green", "Selesai dibaca", function(event){
            moveToDone(event.target.parentElement.parentElement)
        })
    }
}

function createButton(buttonClass, buttonValue, eventListener) {
    const button = document.createElement("button")
    button.classList.add(buttonClass)
    button.innerHTML = buttonValue
    button.addEventListener("click", function (event) {
        eventListener(event)
        event.stopPropagation()
    })
    return button
}

function removeBook(element){
    const bookPosition = findBookIndex(element[BOOKSHELF_ITEMID])
    bookshelfs.splice(bookPosition, 1)

    element.remove()
    updateDataToStorage()
}

function moveToDone(element){
    const completedBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)
    const bookTitle = element.querySelector(".book_item h3").innerText
    const bookAuthor = element.querySelector(".book_item p").innerText
    const bookYear = element.querySelector(".p-year").innerText

    const newBookshelf = makeBookhelf(bookTitle, bookAuthor, bookYear, true)

    const book = findBook(element[BOOKSHELF_ITEMID])
    book.isCompleted = true 
    newBookshelf[BOOKSHELF_ITEMID] = book.id 

    completedBookshelfList.append(newBookshelf)
    element.remove()

    updateDataToStorage()
}

function moveToTodo(element){
    const unCompletedBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const bookTitle = element.querySelector(".book_item h3").innerText
    const bookAuthor = element.querySelector(".book_item p").innerText
    const bookYear = element.querySelector(".p-year").innerText

    const newBookshelf = makeBookhelf(bookTitle, bookAuthor, bookYear, false)

    const book = findBook(element[BOOKSHELF_ITEMID])
    book.isCompleted = false 
    newBookshelf[BOOKSHELF_ITEMID] = book.id 

    unCompletedBookshelfList.append(newBookshelf)
    element.remove()

    updateDataToStorage()
}

function removeElement(){
    const dataBookshelf = document.getElementsByTagName("article")

    for (let i = dataBookshelf.length - 1; i >= 0; i--){
        dataBookshelf[0].parentNode.removeChild(dataBookshelf[0])
    }

    console.log(dataBookshelf)

    return dataBookshelf
}

function findBookshelf(){
    const completedBookshelfList = document.getElementById(COMPLETED_LIST_BOOKSHELF_ID)
    const unCompletedBookshelfList = document.getElementById(UNCOMPLETED_LIST_BOOKSHELF_ID)
    const bookTitle = document.getElementById("searchBookTitle").value

    if(bookTitle == null || bookTitle == ""){
        refreshDataFromBookshelfs()
    } else {
        removeElement()
    }

    for (let book of bookshelfs){
        const newBook = makeBookhelf(book.title, book.author, book.year, book.isCompleted)
        newBook[BOOKSHELF_ITEMID] = book.id

        if(book.title.includes(bookTitle) && bookTitle !== ""){
        
            if(book.isCompleted){
                completedBookshelfList.append(newBook)
            } else {
                unCompletedBookshelfList.append(newBook)
            }
        } else {
            console.log(false)
        }  
    }
}