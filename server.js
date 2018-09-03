const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(function(req,res,next){
  res.locals.userValue = null;
  next();
})
var answers = [ 'It is certain', 'It is decidedly so.', 'Without a doubt.','Yes - definitely.',' You may rely on it.',' As I see it, yes.','Reply hazy, try again','Ask again later.','My reply is no.',' My sources say no','Outlook not so good.'];
function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
  while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

  app.get('/', (req, res) => {
    res.render('magic8ball');
 });

app.post('/answer', (req,res)  => {
  var randomAnswer = getRandomArrayElements(answers,1);
  var question = req.body.userInput;
  if(localStorage.getItem(question) == null){
    var answer = {
      data :  randomAnswer
    }
    localStorage.setItem(question, randomAnswer);
  }
  var answer = {
    data :  localStorage.getItem(question)
  }

console.log(answer)
  res.render('magic8ball',{
    userValue : answer 
});
  
});
     
