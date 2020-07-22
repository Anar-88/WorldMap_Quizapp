'use strict';

//database for questions
const STORE = {

globals : {
   currentQuestion : 0,
   currentScore  : 0,
   question : "",
   errorMessage : ""
},

quizData: [  
  {

       question: 'What is the world`s largest continent?',
     answers: [
      'Africa',
      'Asia',
      'Europe',
      'North America',
      'South America'
     ],
     correctAnswer: 'Asia'
  },

  {
    question: 'What is the largest country by area in Africa?',
     answers: [
      'Kenya',
      'Chad',
      'South Africa',
      'Egypt',
      'Algeria'
     ],
     correctAnswer: 'Algeria'
  }, 
 {
    question: 'What is the largest country by area in the World? ',
    answers: [
      'Turkey',
      'Canada',
      'Brazil',
      'Russia',
      'Nigeria'
    ],
    correctAnswer: 'Russia'
  },

  {
    question: 'Which country does Greenland belong to?',
     answers: [
       'Canada',
       'Argentina',
       'Venezuela',
       'Denmark',
       'Great Britain'
     ],
     correctAnswer: 'Denmark'
  },

  {
    question: 'Which country in Africa is the only Spanish-speaking country?',
     answers: [
       'Equatorial Guinea',
       'Papua New Guinea',
       'Madagascar',
       'Libya',
       'Cameroon'
     ],
     correctAnswer: 'Equatorial Guinea'
  },

  { 
    question: 'What`s the most spoken language in the World(by native speakers count) ?',
     answers: [
       'Spanish',
       'Arabic',
       'Mandarin',
       'Turkish',
       'English'
     ],
     correctAnswer: 'English'
  },

  {
    question: 'What is the only Portuguese-speaking country in South America?',
     answers: [
       'Chile',
       'USA',
       'Colombia',
       'Mexico',
       'Brazil'
     ],
     correctAnswer: 'Brazil'
  },

  {
    question: 'What is the largest state by land area in the US?',
     answers:[ 
       'California',
       'Alaska',
       'Texas',
       'Florida',
       'Illinois'
     ],
     correctAnswer: 'Alaska'
  },

  {
    question: 'Which city has the largest population in the world?',
     answers: [ 
      'New York',
      'Paris',
      'Beijing',
      'Baku',
      'Tokyo'
     ],
     correctAnswer: 'Tokyo'
  },

  {
    question: 'What is the highest point in the World?',
    answers: [
     'Rocky Mountains',
     'Andes',
     'Alps',
     'Chimborazo',
     'Mount Everest'
    ],
    correctAnswer: 'Mount Everest'
    } 
  ]
}

//creating HTML for quiz questions
function startPage(){
  return ` 
  <main>
      <section class="start-page">
        <div class="intro">
          <h2>Around the World in 10 questions</h2>
          <p>How well do you know the World Geography?</p>
        </div>
        <section class="response"> </section>
        <form>
          <div class="questions">
            <button type="button" id="start"> Start Quiz</button>
          </div>
          <div class = "answers">
          </div>
          <section class="quiz-questions"> <br> 
          </section>
          <input type="submit" value="Submit" class="submit"> 
        </form>
      </section>
    <section class="results-page">
        <p class="final-score"></p>
        <button class="try-again-button">Try Again</button>
    </section>
    <div id="dialog" title="Error Message">
      <p> Please select an answer to continue</p>
    </div>
  </main>`
}


function renderStartPage(){
$("submit").on("click", (event)=>{
  event.preventDefault();
});
$('.main-content').html(startPage())
$('.results-page, .submit').addClass('hidden');
startQuiz();
}

function startQuiz(){
 $('#start').on('click', function(event){ 
 $('.intro').addClass('hidden');
 $('.submit').removeClass('hidden');
 getCurrentQuestion(0);
 $('.questionNumber').html((STORE.globals.currentQuestion+1)+"/"+STORE.quizData.length);
});
}

function getCurrentQuestion(count){
if(STORE.globals.currentQuestion<STORE.quizData.length){
STORE.globals.question = STORE.quizData[count]["question"];
var answers = STORE.quizData[count]["answers"];
     renderQuestionandAnswers(STORE.globals.question, answers);
  }
  else{   
finalFeedback();
  }
}

// Choose one of the options: 
function selectedAnswer(){
$('.submit').on('click',function(event){
  event.preventDefault();
  let selectedOption = $('input[type=radio]:checked').val();
  console.log(selectedOption);
  if(STORE.globals.currentQuestion === STORE.quizData.length -1){
    $('.submit').addClass('hidden');
    finalFeedback();
  }
  if(!selectedOption){
    $( "#dialog" ).dialog();
    return false;
  }

  if(selectedOption === undefined) {
     alert(false, selectedOption);
  }
  else{
    $('input[type=radio]:checked').attr('checked',false);
    verifyAnswer(selectedOption);
    $('.quiz-questions').addClass('hidden');
  }
  STORE.globals.currentQuestion++;
  getCurrentQuestion(STORE.globals.currentQuestion);
  $('.questionNumber').html((STORE.globals.currentQuestion)+"/"+STORE.quizData.length);
});
} 

function verifyAnswer(selected){
let rightAnswer = STORE.quizData[STORE.globals.currentQuestion].correctAnswer;
if(selected === rightAnswer){
  correctAnswer();
} 
else{
  wrongAnswer();
}
}

// If the answer is correct: 
function correctAnswer() {
$('.response').html(
  `<h3> Your answer is correct!</h3>`
  );
  updateScore();
 }

//add 1 point to score
function updateScore() {
STORE.globals.currentScore++;
$('.score').text(STORE.globals.currentScore); 
}

// If the answer is wrong: 
function wrongAnswer() {
$('.response').html(
 `<p>Wrong answer! The correct answer is:
  ${STORE.quizData[STORE.globals.currentQuestion].correctAnswer}</p>`
);
}

function nextQuestion(){
$('.next-button').on('click', function(event){
 var question = STORE.quizData[i]["question"];
 var answers = STORE.quizData[i]["answers"];
  renderQuestionandAnswers(question, answers);
});
} 

//Display question and answers 
function renderQuestionandAnswers(question, answers){
 $('.questions').html(question);
 $('.answers').html('');
 for (var i = 0; i < answers.length; i++)
 {
   $('.answers').append(`<input name="groupanswers0" id="groupanswers0" type="radio" value="${answers[i]}">${answers[i]}<br>`);
 }
}

function finalFeedback() {
console.log("Final Feedback!");
$('.answers').addClass('hidden');
$('.results-page, .try-again-button').removeClass('hidden');
$('.response').html('Final Score:');
$('.questions').html(`You got ${STORE.globals.currentScore} out of 10 questions right!`);

$('.submit').on('click', function() {
    $('.quizQuestions').addClass('hidden');
    $('.results-page').removeClass('hidden');
    $('.final-score').append(`<h3>You got ${STORE.globals.currentScore}/10 questions right!</h3>`)
  });
}

  function tryAgain(){
    $('.main-content').on('click', '.try-again-button',(event)=>{
    renderStartPage();
    startQuiz();
      selectedAnswer();
     resetCounters();
    });
  }

 //reset question number and score to 0:
 function resetCounters(){
   STORE.globals.currentQuestion = 0;
   STORE.globals.currentScore = 0;
   $('.questionNumber').text(0);
   $('.score').text(0);
 }

//runs the functions
function createQuiz() {
renderStartPage();
startQuiz();
selectedAnswer();
nextQuestion();
tryAgain();
}

$(createQuiz);


