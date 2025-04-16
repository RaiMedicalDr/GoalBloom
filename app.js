function addGoal() {
    const input = document.getElementById("goalInput");
    const goal = input.value.trim();
  
    if (goal === "") return;
  
    const li = document.createElement("li");
    li.textContent = goal;
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.onclick = () => li.remove();
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.background = "#ff4d4d";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "white";
    deleteBtn.style.borderRadius = "8px";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";
  
    li.appendChild(deleteBtn);
    document.getElementById("goalList").appendChild(li);
  
    input.value = "";
  }

  function addGoal() {
    const input = document.getElementById("goalInput");
    const goal = input.value.trim();
  
    if (goal === "") return;
  
    const li = document.createElement("li");
    li.textContent = goal;
  
    li.onclick = () => {
      li.classList.toggle("done");
      if (li.classList.contains("done")) {
        showFlowerEffect(li);
      }
    };
  
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.onclick = (e) => {
      e.stopPropagation(); // 親liのクリックイベント発火防止
      li.remove();
    };
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.background = "#ff4d4d";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "white";
    deleteBtn.style.borderRadius = "8px";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";
  
    li.appendChild(deleteBtn);
    document.getElementById("goalList").appendChild(li);
  
    input.value = "";
  }
  
  function showFlowerEffect(element) {
    for (let i = 0; i < 8; i++) {
      const petal = document.createElement("div");
      petal.className = "flower-petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `${Math.random() * 20}px`;
      petal.style.animationDuration = `${1 + Math.random()}s`;
  
      element.appendChild(petal);
  
      setTimeout(() => {
        petal.remove();
      }, 2000);
    }
  }

  let goals = JSON.parse(localStorage.getItem("goals")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];

function addGoal() {
  const input = document.getElementById("goalInput");
  const goal = input.value.trim();
  if (goal === "") return;

  const goalData = {
    text: goal,
    done: false,
    date: null,
    id: Date.now(),
  };
  goals.push(goalData);
  saveData();
  renderGoals();

  input.value = "";
}

function toggleGoal(id) {
  const goal = goals.find(g => g.id === id);
  if (!goal) return;

  goal.done = !goal.done;
  goal.date = goal.done ? new Date().toISOString().split("T")[0] : null;

  if (goal.done) {
    addHistory(goal.text, goal.date);
    showFlowerEffect(document.querySelector(`[data-id="${id}"]`));
  }

  saveData();
  renderGoals();
}

function addHistory(text, date) {
  history.push({ text, date });
  saveData();
  renderHistory();
}

function renderGoals() {
  const list = document.getElementById("goalList");
  list.innerHTML = "";

  goals.forEach(goal => {
    const li = document.createElement("li");
    li.textContent = goal.text;
    li.className = goal.done ? "done" : "";
    li.setAttribute("data-id", goal.id);
    li.onclick = () => toggleGoal(goal.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      goals = goals.filter(g => g.id !== goal.id);
      saveData();
      renderGoals();
    };

    Object.assign(deleteBtn.style, {
      marginLeft: "10px",
      background: "#ff4d4d",
      border: "none",
      color: "white",
      borderRadius: "8px",
      padding: "5px 10px",
      cursor: "pointer"
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function renderHistory() {
  const container = document.getElementById("historyList");
  container.innerHTML = "";

  history.slice().reverse().forEach(entry => {
    const div = document.createElement("div");
    div.textContent = `${entry.date} - ${entry.text}`;
    container.appendChild(div);
  });
}

function saveData() {
  localStorage.setItem("goals", JSON.stringify(goals));
  localStorage.setItem("history", JSON.stringify(history));
}

function showFlowerEffect(element) {
  for (let i = 0; i < 6; i++) {
    const petal = document.createElement("div");
    petal.className = "flower-petal";
    petal.style.left = `${Math.random() * 80 + 10}px`;
    petal.style.top = `${Math.random() * 10}px`;
    petal.style.animationDuration = `${1 + Math.random()}s`;

    element.appendChild(petal);
    setTimeout(() => petal.remove(), 2000);
  }
}

window.onload = () => {
  renderGoals();
  renderHistory();
};