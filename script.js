
const accessKey = 'ACCESS_KEY'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
const topBtn = document.getElementById('topBtn')
let imageLoadedCount = 0
let totalImageCount = 0
let readyToLoad = false
let showcount = 0
let photosArray = []

//after image loaded ,add the counter
function imageLoad(){
    imageLoadedCount++;
 
    if ( imageLoadedCount === totalImageCount ) {
        readyToLoad = true
        loader.hidden = true  
    }
}
//when the user scrolls down 300px from the top,show the button
function showTopButton(){
    console.log('show top',showcount++)
    console.log('window.scrolly',window.scrollY )
    if (window.scrollY > 1000 || document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        topBtn.hidden = false
    } else {
        topBtn.hidden = true
    }
}


// when the user click on the button, scroll up to the top
function topFunction(){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

async function getPhotos() {
    try {
        imageLoadedCount = 0;
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        
        totalImageCount = photosArray.length

        photosArray.forEach((photo) => {
            
            //add <a> element
            const newA = document.createElement("a")
            newA.setAttribute("href", photo.links.html)
            newA.setAttribute("target", "_blank")

            //add <img> element
            const newImage = document.createElement("img")
            newImage.setAttribute("src", photo.urls.regular)
            newImage.setAttribute("alt", photo.alt_description)
            newImage.setAttribute("title", photo.alt_description)
            
            // count the image after loaded,add event listener onload
            newImage.addEventListener("load", imageLoad )

            // put <img> inside of <a>, <a> inside of image container
            newA.appendChild(newImage)
            imageContainer.appendChild(newA)
        });    
    } catch(error) {
        console.log(error);
    }    
}

// check to see if scrolling near the bottom,load more photos
window.addEventListener('scroll', () => {
    showTopButton();
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        readyToLoad = false
        getPhotos()   
    }   
})

// check to see if user click the top button
topBtn.addEventListener('click',topFunction)

 // check the scroll position to show the top button
//window.addEventListener('scroll', showTopButton()) 

getPhotos()