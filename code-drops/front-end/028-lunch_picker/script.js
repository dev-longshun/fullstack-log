// 初始化食物数据
let foods = [
  '红烧肉', '清蒸鱼', '宫保鸡丁', '麻婆豆腐',
  '水煮肉片', '青椒炒肉', '糖醋里脊', '回锅肉',
  '炸酱面', '重庆小面', '兰州拉面', '阳春面'
];

// 初始化粒子背景
particlesJS('particles-js', {
  particles: {
      number: {
          value: 80,
          density: {
              enable: true,
              value_area: 800
          }
      },
      color: {
          value: '#e74c3c'
      },
      shape: {
          type: 'circle'
      },
      opacity: {
          value: 0.5,
          random: false
      },
      size: {
          value: 3,
          random: true
      },
      line_linked: {
          enable: true,
          distance: 150,
          color: '#e74c3c',
          opacity: 0.4,
          width: 1
      },
      move: {
          enable: true,
          speed: 3,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
      }
  },
  interactivity: {
      detect_on: 'canvas',
      events: {
          onhover: {
              enable: true,
              mode: 'grab'
          },
          onclick: {
              enable: true,
              mode: 'push'
          },
          resize: true
      }
  },
  retina_detect: true
});

// DOM 元素
const resultElement = document.getElementById('result');
const pickButton = document.getElementById('pickButton');
const newFoodInput = document.getElementById('newFood');
const addButton = document.getElementById('addButton');
const fileInput = document.getElementById('fileInput');
const foodList = document.getElementById('foodList');

// 更新食物列表显示
function updateFoodList() {
  foodList.innerHTML = '';
  foods.forEach((food, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
          ${food}
          <button onclick="removeFood(${index})">删除</button>
      `;//这里button的onlick事件是在调用一个函数
      
      foodList.appendChild(li);
  });
  // 保存到本地存储
  localStorage.setItem('foods', JSON.stringify(foods));
}

// 从本地存储加载食物列表
function loadFoods() {
  const savedFoods = localStorage.getItem('foods');
  if (savedFoods) {
      foods = JSON.parse(savedFoods);
      updateFoodList();
  }
}

// 随机选择食物
function pickRandomFood() {
  if (foods.length === 0) {
      resultElement.textContent = '请先添加一些美食选项！';
      return;
  }

  // 禁用按钮，显示动画
  pickButton.disabled = true;
  let times = 0;
  const totalTimes = 20; // 动画循环次数
  const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * foods.length);
      resultElement.textContent = foods[randomIndex];
      times++;

      if (times >= totalTimes) {
          clearInterval(interval);
          pickButton.disabled = false;
          // 添加强调效果
          resultElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
              resultElement.style.transform = 'scale(1)';
          }, 200);
      }
  }, 100);
}

// 添加新食物
function addFood() {
  const newFood = newFoodInput.value.trim();
  if (newFood && !foods.includes(newFood)) {
      foods.push(newFood);
      updateFoodList();
      newFoodInput.value = '';//清空input区域的字符串，方便用户再次输入
      // 添加成功提示动画
      const li = foodList.lastElementChild;
      li.style.backgroundColor = '#e8f5e9';
      setTimeout(() => {
          li.style.backgroundColor = 'white';
      }, 500);
  }
}

// 删除食物
function removeFood(index) {
  foods.splice(index, 1);
  updateFoodList();
}

// 导入食物列表
function importFoods(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
      try {
          let importedFoods;
          if (file.name.endsWith('.json')) {
              importedFoods = JSON.parse(e.target.result);
          } else {
              // 假设txt文件每行一个食物名称
              importedFoods = e.target.result.split('\n')
                  .map(food => food.trim())
                  .filter(food => food.length > 0);
          }

          if (Array.isArray(importedFoods)) {
              // 去重并合并
              foods = [...new Set([...foods, ...importedFoods])];
              updateFoodList();
              alert('导入成功！');
          }
      } catch (error) {
          alert('导入失败，请检查文件格式！');
      }
  };
  reader.readAsText(file);
  fileInput.value = ''; // 重置文件输入
}

// 事件监听
pickButton.addEventListener('click', pickRandomFood);
addButton.addEventListener('click', addFood);
newFoodInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addFood();
});
fileInput.addEventListener('change', importFoods);

// 初始化加载
loadFoods();
updateFoodList();