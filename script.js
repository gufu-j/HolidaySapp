document.addEventListener("DOMContentLoaded", ()=> {

    const form = document.getElementById("holiday-form")
    form.addEventListener("submit", (event)=>{
    event.preventDefault();
    handleForm(event.target.year.value) 

    document.getElementById("year").value = "";
    }) 
    function handleForm(textTyped){

        fetch(`https://date.nager.at/api/v2/publicholidays/${textTyped}/US`)
        .then(function (response){
         return response.json();
         })
        .then(function(bigArray){
            //console.log(bigArray);

        bigArray.forEach(makeList);

        });
    }

    // callBack
    function makeList(eachObject){

        // after going over every specific value with "eachObject.LocalName"
        // we append them to our unordered list of items "ul" as a list of elements
        let li = document.createElement("li")
        li.setAttribute("id", "first-list")
        li.innerHTML = eachObject.localName
        document.querySelector("ul#list").appendChild(li)

        //mouseOver event for our "li" for interactivity purposes
        li.addEventListener("mouseover", mouseOver);
        li.addEventListener("mouseout", mouseOut);

        // click event to nest our " li "
            li.addEventListener("click", ()=> {
            
            // add another list to display different counties the holiday happens.
            let holidayType = document.createElement("li")
            holidayType.setAttribute("id", "second-list")
            holidayType.innerHTML = eachObject.counties
            li.appendChild(holidayType)

            // add another list to display the date of the holiday.
            let date = document.createElement("li")
            date.setAttribute("id", "third-list")
            date.innerHTML = eachObject.date
            li.appendChild(date)

        })
        
        // button to delete list of holiday       
        let btn = document.createElement("button")
        btn.innerHTML = "delete"
        li.appendChild(btn)

        btn.addEventListener("click", (e)=>{
        //console.log(e);
        li.remove()
        } )
    }

    //callbacks for mousOver 
    function mouseOver() {
        document.getElementById("list").style.color = "black";
       //console.log("I am here!")
      }
    function mouseOut() {
        document.getElementById("list").style.color = "yellow";
       // console.log("I am out")
      }
 });
