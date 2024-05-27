// access dom elements
const startQuizSec = document.querySelector('.start-quiz-sec')
const startQuizSecBtn = startQuizSec.querySelector('.start-quiz-btn')

const quizSec = document.querySelector('.quiz-sec')
const quizQue = quizSec.querySelector('.quiz-que')
const quizOptions = quizSec.querySelector('.quiz-options')
const quizNextBtn = quizSec.querySelector('.quiz-btn')
const rightClick = quizSec.querySelector('.right-click')
const currQueElm = quizSec.querySelector('.curr-que')
const totalQueElm = quizSec.querySelector('.total-que')
const timeQueElm = quizSec.querySelector('.que-time')

const resultBox = document.querySelector('.quiz-result')
const resultTotalQue = resultBox.querySelector('.result-total-que span')
const resultRightQue = resultBox.querySelector('.quiz-right-ans span')
const resultPercentage = resultBox.querySelector('.quiz-percentage span')
const resultRetryBtn = resultBox.querySelector('.retry-btn')
const resultExitBtn = resultBox.querySelector('.exit-btn')
const resultLearning = resultBox.querySelector('.result-learning')

// question answer object 
const qna = [
     {
          question: 'Inside which HTML element do we put the JavaScript?',
          ans: 'script tag',
          options: [
               'js tag',
               'scripting tag',
               'javascript tag',
               'script tag',
          ]
     },
     { 
          question: 'Where is the correct place to insert a JavaScript?',
          ans: 'Both Head and Body elements',
          options: [
               'Div element',
               'Head element',
               'Both Head and Body elements',
               'Body element',
          ]
     },
     {
          question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
          ans: '< script src="xxx.js">',
          options: [
               '< script href="xxx.js">',
               '< script name="xxx.js">',
               '< script src="xxx.js">',
               '< script class="xxx.js">',
          ]
     },
     {
          question: 'The external JavaScript file must contain the <script> tag.',
          ans: 'False',
          options: [
               'True',
               'False',
               'Both',
               'None',
          ]
     },
     {
          question: 'How do you write "Hello World" in an alert box?',
          ans: 'alert("Hello World")',
          options: [
               'alert("Hello World")',
               'msg("Hello World")',
               'msgBox("Hello World")',
               'alertBox("Hello World")',
          ]
     },
     {
          question: 'How do you create a function in JavaScript?',
          ans: 'function myFunction()',
          options: [
               'function myFunction()',
               'function: myFunction()',
               'function = myFunction()',
               'function == myFunction()',
          ]
     },
];

// Manipulate DOM Elements
const wrongSign = `<span>&times;</span>`
const rightSign = `<span>&check;</span>`

let idxNo = 0
let rightQueCount = 0
let totalPercentage = 0
let quizTimeOut = 60
changeQuestion(idxNo)

// definition function 
const reusableCodeOfResultBox = ()=>{
     quizSec.classList.add('hide')
     resultBox.classList.remove('hide')
     resultTotalQue.innerText = qna.length
     resultRightQue.innerText = rightQueCount
     totalPercentage = parseInt(rightQueCount * 100 / qna.length)
     resultPercentage.innerText = totalPercentage

     if(totalPercentage <= 100 && totalPercentage >= 75) {
          resultLearning.innerText = '"Keep Learning", You have Good Score'
     }
     else if(totalPercentage <= 75 && totalPercentage > 65) {
          resultLearning.innerText = '"Need Learning", You have Average Score'
     }
     else if(totalPercentage <= 65 && totalPercentage > 45) {
          resultLearning.innerText = '"Deep Learning", You have Low Score'
     }
     else if(totalPercentage <= 45 && totalPercentage >= 33) {
          resultLearning.innerText = '"Very Need Learning", You have Very Low Score'
     }
     else if (totalPercentage <= 33 && totalPercentage >= 0) {
          resultLearning.innerText = '"Re Learning", You have No Score'
     }
}

// start quiz section 
startQuizSecBtn.addEventListener('click', ()=>{
     quizSec.classList.remove('hide')
     startQuizSec.classList.add('hide')

     let intervalId = setInterval(()=>{
          quizTimeOut--
          timeQueElm.innerText = quizTimeOut
          if(quizTimeOut === 0) {
               clearInterval(intervalId)
               reusableCodeOfResultBox()
          }
     
     }, 1000)
})

function changeQuestion(idx) {
     var statement = '';
     quizQue.innerText = idx+1 + '. ' + qna[idx].question
     currQueElm.innerText = idx+1
     totalQueElm.innerText = qna.length
     
     for(let i = 0; i<qna[idx].options.length; i++) {
          statement += `<p class="quiz-option">${qna[idx].options[i]}</p>`
     }
     quizOptions.innerHTML = statement

     const quizOption = document.querySelectorAll('.quiz-option')
     
     quizOption.forEach((optionElm)=>{
          optionElm.addEventListener('click', (e)=>{

               let targetElm = e.target
               let currentOption = e.target.innerText
               let rightOption = qna[idx].ans
               
               quizNextBtn.classList.remove('hide')

               if(currentOption === rightOption) {
                    targetElm.classList.add('right-answer')
                    targetElm.insertAdjacentHTML('beforeend', rightSign)
                    rightQueCount++
               } else {
                    targetElm.classList.add('wrong-answer')
                    targetElm.insertAdjacentHTML('beforeend', wrongSign)
               }

               for(let i = 0; i<quizOption.length; i++){
                  quizOption[i].classList.add('disabled')

                  // every options checking for checked
                  if(quizOption[i].innerText === rightOption){
                    quizOption[i].classList.add('right-answer')
                    quizOption[i].insertAdjacentHTML('beforeend', rightSign)
                  }
               }
          }, {once: true, capture: true}) 
     })
}

quizNextBtn.addEventListener('click', ()=> {
     idxNo++
     if(qna.length > idxNo) {
          changeQuestion(idxNo)
     }else {
          console.log('completed')
     }

     if(qna.length-1 === idxNo) {
          quizNextBtn.innerText = 'Finish >'
     }
     if(qna.length === idxNo) {
          reusableCodeOfResultBox()
     }
     quizNextBtn.classList.add('hide')
});

// back calling 
resultRetryBtn.addEventListener('click', ()=>{
     quizSec.classList.remove('hide')
     resultBox.classList.add('hide')
     idxNo = 0
     rightQueCount = 0
     totalPercentage = 0
     quizTimeOut = 60
     changeQuestion(idxNo)
     quizNextBtn.innerText = 'Next >'
     let intervalId = setInterval(()=>{
          quizTimeOut--
          timeQueElm.innerText = quizTimeOut
          if(quizTimeOut === 0) {
               clearInterval(intervalId)
               reusableCodeOfResultBox()
          }
     
     }, 1000)
})
resultExitBtn.addEventListener('click', ()=>{
     startQuizSec.classList.remove('hide')
     resultBox.classList.add('hide')
     idxNo = 0
     rightQueCount = 0
     totalPercentage = 0
     quizTimeOut = 60
     changeQuestion(idxNo)
     quizNextBtn.innerText = 'Next >'
})