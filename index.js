

window.onload = (event) => {
    const url = "https://api.sampleapis.com/coffee/hot";
    
    const disappaer = [
        { transform: "translateY(-2vh)" },
        { opacity: "0%"}
    ];

    const timing = {
        duration: 1000,
        iterations: 1,
    }
    centerBox = document.getElementById("backgroundimg")

    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
        event = event || window.event;

        sensitivity = 0.02;
        
        mouseX = event.clientX;
        mouseY = event.clientY;

        offsetX = mouseX * sensitivity;
        offsetY = mouseY * sensitivity;

        centerBox.style.transform = `translateX(-${offsetX}px) translateY(-${offsetY}px)`
    }



    var spawnDelay = 0
    document.getElementById("button").onclick = function() {
        document.getElementById("button").style.pointerEvents="none"
        const newDiv = document.createElement("div")
        newDiv.className = "gridContainer"
        newDiv.id = "coffeeGrid"
        document.body.appendChild(newDiv)
        document.getElementById('button').style.animation="disappear 0.5s linear 1";
        setTimeout(() => { document.getElementById("button").remove();
        fetch(url)
        .then(data => {
        return data.json();
        })
        .then(json => {
        for (const coffee in json) {
            const newItem = document.createElement("div")
            newItem.className = "grid-item"
            const nameText = document.createElement("h1")
            nameText.innerHTML = json[coffee]["title"]
            newItem.appendChild(nameText)
            const image = document.createElement("img")
            image.src = json[coffee]["image"]
            newItem.appendChild(image)
            const descDiv = document.createElement("div")
            descDiv.className = "descChild"
            const desc = document.createElement("p")
            desc.innerHTML = json[coffee]["description"]
            desc.classNameG = "desc"
            descDiv.appendChild(desc)
            newItem.appendChild(descDiv)
            const ingredients = document.createElement("p")
            ingredients.innerHTML = `<strong>Ingredients:</strong> ${json[coffee]["ingredients"]}`
            ingredients.className = "ingredients"
            newItem.appendChild(ingredients)
            spawnDelay += 0.2
            console.log(spawnDelay)
            newItem.style["animation-delay"] = `${spawnDelay}s`
            newItem.classList.add("fade-in-coffee")
            newDiv.appendChild(newItem)
        }
        }) } , 500)
    }
};