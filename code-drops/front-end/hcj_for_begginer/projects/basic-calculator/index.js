    const buttonsEl = document.querySelectorAll("button");
    const inputFieldEl = document.getElementById("result");
    const toggleThemeBtn = document.getElementById("toggle-theme");

    // 恢复主题
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggleThemeBtn.textContent = "☀️";
    }

    // 切换主题
    toggleThemeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      toggleThemeBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // 绑定按钮事件
    buttonsEl.forEach(btn => {
      const val = btn.textContent;
      if (val === 'C' || val === '=' || btn.id === 'toggle-theme') return;

      btn.addEventListener("click", () => {
        inputFieldEl.value += val;
      });
    });

    document.querySelector(".clear").addEventListener("click", () => {
      inputFieldEl.value = "";
    });

    document.querySelector(".equals").addEventListener("click", () => {
      try {
        inputFieldEl.value = eval(inputFieldEl.value);
      } catch {
        inputFieldEl.value = "错误";
      }
    });