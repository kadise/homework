// 定义垃圾桶数量和计数器
let recyclableCount = 0;
let hazardousCount = 0;
let organicCount = 0;
let nonOrganicCount = 0;

let garbageBins = document.querySelectorAll(".garbage-bin");
let garbageTruck = document.getElementById('garbage-truck');
let questionItem = document.getElementById('question_item');
let answerItem = '';
let answerYes = document.getElementById('answer_yes');
let answerNo = document.getElementById('answer_no');
let globalGarbageType = '';

const garbageTypeMapping = {
	'可回收垃圾': 'recyclable',
	'有害垃圾': 'hazardous',
	'湿垃圾': 'organic',
	'干垃圾': 'non-organic'
}

//这里是问答题库，可以编写更多的题目。注意题目仅是是非题。
//q是问题，a是答案，y是yes，n是no

const garbageQuestions = {
	'recyclable': [
		{
			'q': '厨余垃圾可以直接扔到垃圾桶里?',
			'a': 'n'
		},
		{
			'q': '植物的枝叶是干垃圾吗?',
			'a': 'n'
		}
	],
	'hazardous': [
		{
			'q': '充电后可重复使用的5号、7号电池可以直接扔进垃圾桶吗?',
			'a': 'n'
		},
		{
			'q': '喝完水的矿泉水瓶是干垃圾吗?',
			'a': 'y'
		}
	],
	'organic': [
		{
			'q': '玻璃瓶是干垃圾吗?',
			'a': 'y'
		},
		{
			'q': '各种包装纸是可回收垃圾吗?',
			'a': 'y'
		}
	],
	'non-organic': [
		{
			'q': '花生壳是干垃圾吗?',
			'a': 'n'
		},
		{
			'q': '喝完的可乐易拉罐是可回收垃圾吗?',
			'a': 'y'
		}
	]
}

answerYes.addEventListener('click',()=>{
	if(answerItem == 'y'){
		throwGarbage();
	}else{
		alert('很抱歉，回答错误，下次再接再励哦！')
	}
	hideDialog();
})

answerNo.addEventListener('click',()=>{
	if(answerItem == 'n'){
		throwGarbage();
	}else{
		alert('很抱歉，回答错误，下次再接再厉哦！')
	}
	hideDialog();
})

// 做一个数学题（加法），如果回答正确，就投放垃圾（该方案废弃）
function doMath(){
	let num1 = Math.floor(Math.random() * 50);
	let num2 = Math.floor(Math.random() * 50);
	let answer = num1 + num2;
	
	// 弹出对话框，显示数学题，等待用户输入答案
	let userAnswer = prompt(`小朋友，请回答以下数学题：${num1} + ${num2} = ?`);
	return userAnswer == answer;
}

// 弹出问题框，等待用户输入答案。
function doTest(garbageType){
	showDialog();
	let type = garbageTypeMapping[garbageType];
	let items = garbageQuestions[type];
	let item = items[Math.floor(Math.random() * items.length)];
	questionItem.innerText = item.q;
	answerItem = item.a;
}


// 定义函数来处理每种类型的垃圾
function throwGarbage() {	
	let garbageType = globalGarbageType;
	switch (garbageType) {
    case "可回收垃圾":
      recyclableCount++;
      break;
    case "有害垃圾":
      hazardousCount++;
      break;
    case "湿垃圾":
      organicCount++;
      break;
    case "干垃圾":
      nonOrganicCount++;
      break;
    default:
      console.log("不是有效的垃圾类型，请重新输入。");
      break;
  }
  garbageTruck.classList.add('garbage-truck-animation');
  updateGarbageCount();
}

// 给每个垃圾桶添加点击事件监听器
garbageBins.forEach(function (garbageBin) {
  garbageBin.addEventListener("click", function () {
    let garbageType = garbageBin.querySelector("h2").innerText;
	globalGarbageType = garbageType;
    doTest(garbageType);
  });
});

garbageTruck.addEventListener("animationend", function() {
	garbageTruck.classList.remove("garbage-truck-animation");
});

// 给垃圾车添加点击事件监听器
garbageTruck.addEventListener("click", function () {
  recyclableCount = 0;
  hazardousCount = 0;
  organicCount = 0;
  nonOrganicCount = 0;
  alert("恭喜你，垃圾清理完成！");
  updateGarbageCount();
});

// 更新垃圾桶数量
function updateGarbageCount() {
  let recyclableCountSpan = document.querySelector("#recyclable-count");
  let hazardousCountSpan = document.querySelector("#hazardous-count");
  let organicCountSpan = document.querySelector("#organic-count");
  let nonOrganicCountSpan = document.querySelector("#non-organic-count");
  let totalCountSpan = document.querySelector("#total-count");

  recyclableCountSpan.innerText = recyclableCount;
  hazardousCountSpan.innerText = hazardousCount;
  organicCountSpan.innerText = organicCount;
  nonOrganicCountSpan.innerText = nonOrganicCount;
  totalCountSpan.innerText = recyclableCount + hazardousCount + organicCount + nonOrganicCount;
}


var dialog = document.querySelector('.dialog');
var overlay = document.querySelector('.overlay');
var primaryButton = document.querySelector('.dialog .primary');
var secondaryButton = document.querySelector('.dialog .secondary');

function showDialog(){
	overlay.style.display = 'block';
	dialog.style.display = 'block';	
}

function hideDialog(){
	overlay.style.display = 'none';
	dialog.style.display = 'none';	
}
