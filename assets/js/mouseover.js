window.addEventListener('DOMContentLoaded', function() {
	const buttonDescriptions = {
		singlebtn: '싱글플레이',
		multibtn: '멀티플레이',
		manualbtn: '도움말',
		modchangebtn: '게임 모드 변경',
		boardchangebtn: '보드 크기 변경'
	  };
	  
	  const buttons = document.querySelectorAll('button');
	  const buttonDescriptionElement = document.getElementById('buttonDescription');
	  
	  buttons.forEach(button => {
		button.addEventListener('mouseover', () => {
		  const description = buttonDescriptions[button.id];
		  buttonDescriptionElement.textContent = description;
		  buttonDescriptionElement.style.display = 'block';
		});
		
		button.addEventListener('mouseout', () => {
		  buttonDescriptionElement.style.display = 'none';
		});
	  });
});

  