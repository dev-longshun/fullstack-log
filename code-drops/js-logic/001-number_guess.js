const readline = require('readline');//引入一个模块，类似于c语言的include写法
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})//这里是利用这个readline模块来创建一个接受输入和输出的对象rl

let number = Math.floor(Math.random() * (100-1+1) + 1);
let condition = 5;
console.log('🎮 猜数字游戏开始！🎉');
ask();

//接下来就是实现游戏功能的各种函数模块了

function ask() {
  if (condition === 0) {
    console.log('🥺 chances run out,game over.');
    ifAgain()
    return;//一定要记得return，不然就会无线嵌套导致程序崩掉
  }

  //这个读取用户输入的方法，有两个参数，第一个是输出到屏幕上的提示信息，第二个是一个函数，这个函数的参数answer就是用来接收用户的输入的，（这里直接就是递归写法是为了避免使用循环的时候这个rl异步造成干扰，至于异步到底是什么，会对程序造成什么影响，后续再深入学习），这个answer的形式是字符串，如果需要其他形式的值需要自己转换
  rl.question('please input a number: ', (answer) => {
    let guess = Number(answer);
    if (guess === number) {
      console.log('🎉 You guess it! 🙌');
      ifAgain();
      return;//这个return也是同理
    }
    else if (guess > number) {
      console.log('😅 You guess bigger than the number! Try smaller!');
    }
    else if (guess < number) {
      console.log('😅 You guess smaller than the number! Try bigger!');
    }
    condition--;
    if (condition >= 1) {
      console.log(`💪 you still have ${condition} chance${ condition > 1 ? 's' : ''}`);
    }
    ask();
  });


}

function ifAgain() {
  rl.question('🔄 Do you want to play again? Y or N ',(answer) => {
    if (answer.toUpperCase() === 'Y') {
      resetGame();
      ask();
    }
    else {
      console.log(`👋 Exit the game! The final number is ${number}`);
      rl.close();
    }
  })
}

function resetGame() {
  condition = 5;
}



