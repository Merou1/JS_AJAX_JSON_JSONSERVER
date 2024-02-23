const questionInput=document.getElementById("questionInput")
const answerInput=document.getElementById("answerInput")
const resetBtn=document.getElementById("resetBtn")
const submitBtn=document.getElementById("submitBtn")
let countQuestionsSpan=document.getElementById("countQuestionsSpan")
let questionsDiv=document.getElementById("questionsDiv")


let url="http://localhost:3000/questions"
let xhr=new XMLHttpRequest()
xhr.open("get",url,true)
xhr.addEventListener("load",()=>{
    let data=xhr.response
    let jdata=JSON.parse(data)
    jdata.forEach(question => {
        let id=question.id

        let b1=document.createElement("button")
        let b2=document.createElement("button")
        let div1=document.createElement("div")
        let span1=document.createElement("span")
        let maindiv=document.createElement("div")

        b1.innerText="Switch"
        b2.innerText="Delete"

        b1.setAttribute("class","switch")
        b2.setAttribute("class","delete")
        div1.setAttribute("class","content")
        span1.setAttribute("class","idQuestion")

        maindiv.appendChild(b1)
        maindiv.appendChild(b2)
        maindiv.appendChild(div1)
        maindiv.appendChild(span1)
        questionsDiv.appendChild(maindiv)

        span1.innerText=question.id
        div1.innerText=question.question

        countQuestionsSpan.innerText++

        b2.addEventListener("click",()=>{
            console.log(id)

            xhr.open("delete",url+"/"+id,true)
            xhr.addEventListener("load",()=>{
                maindiv.remove()
            })
            xhr.send()
        })

        let qs=question.answer

        b1.addEventListener("click",()=>{
            console.log(qs=(!qs))
            if (qs==false){
                maindiv.setAttribute("class","question false")
            }
            else if(qs==true) {
                maindiv.setAttribute("class","question true")           
               
            }

        })


        if (qs==false){
            
            maindiv.setAttribute("class","question false")
        }
        else if(qs==true) {
            maindiv.setAttribute("class","question true")           
           
        }

    });
})
xhr.send()


let submit=()=>{
let inputquestion=questionInput.value
let trueorfalse=answerInput.value
let sendquestion={question:inputquestion,answer:trueorfalse}
let jsnedquestion=JSON.stringify(sendquestion)

xhr.open("post",url,true)
xhr.setRequestHeader("content-type","application/json")
xhr.addEventListener("load",()=>{
    if(xhr.status===201){
        console.log(xhr.status)
    }
    else{alert("Error")}
})
xhr.send(jsnedquestion)
}

let reset=()=>{
    questionInput.value=""
    answerInput.value="true"
}


submitBtn.addEventListener("click",submit)
resetBtn.addEventListener("click",reset)
