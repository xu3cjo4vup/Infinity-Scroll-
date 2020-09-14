
const accessKey = 'ACCESS_KEY'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=10`
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let imageLoadedCount = 0;
let totalImageCount = 0;
let readyToLoad = false;
let photosArray = []

//after image loaded ,add the counter
function imageLoad(){
    imageLoadedCount++;
 
    if ( imageLoadedCount === totalImageCount ) {
        readyToLoad = true
        loader.hidden = true  
    }
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
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyToLoad) {
        readyToLoad = false
        getPhotos()   
    }   
})

getPhotos()