function getChineseDate(nowDay) {
  const days = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  return days[nowDay] ?? '未知值';
}



function updateClock() {
  let now = new Date();
  let nowDay = now.getDay();
  let updateDay = 4; // 星期四
  let diff = updateDay - nowDay;
  if (diff < 0) diff += 7;

  let ifToday = diff === 0;
  let chineseDate = getChineseDate(nowDay);
  let chineseTime = now.toLocaleTimeString();

  document.getElementById('day').innerText = `今天是：${chineseDate}`;
  document.getElementById('time').innerText = `${chineseTime}`;

  // ============ 功能 2：计算距离本周四 10:00 的时间差 ============

  // 构造目标时间（本周四上午 10:00）
  let target = new Date(now);//这里是为了创建一个now副本，因为如果直接把now的值给target的话，之后修改target的时候也会把now给修改了。背后的本质原因：now是一个对象，是一个引用类型，即存的是一个地址，而不是具体的值，所以把这个值给target的时候，如果target改变了，这个now也会改。
  target.setDate(now.getDate() + diff);
  target.setHours(10, 0, 0, 0); // 设置为上午10:00整

  let remaining = target - now; // 毫秒差

  if (remaining <= 0 && ifToday) {
    document.getElementById('notice').innerText = '🎉 不良人今天已经更新，快去看！';
  }
  else {
    let hours = Math.floor(remaining / (1000 * 60 * 60));
    let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    document.getElementById('notice').innerText = 
      ifToday
        ? `⏳ 今天更新！距离 10:00 还有 ${hours}小时 ${minutes}分钟 ${seconds}秒`
        : `📅 还有 ${diff} 天更新，倒计时：${hours}小时 ${minutes}分钟 ${seconds}秒`;
  }
}

updateClock();

setInterval(updateClock,1000)