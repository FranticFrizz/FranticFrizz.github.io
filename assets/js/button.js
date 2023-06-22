window.addEventListener('DOMContentLoaded', function () {

	var gamemode = 'chess';
	let logo = document.querySelector('.logo img');
	let btn = document.querySelector('#modchangebtn');

	btn.addEventListener('click', function () {
		if (gamemode == 'chess') {
			logo.style.opacity = 0;
			document.body.style.backgroundImage = 'url("./assets/images/bgnc.png")';
			setTimeout(() => {
				logo.src = './assets/images/logo2.png';
				logo.style.opacity = 1;
			}, 300);
		} else {
			logo.style.opacity = 0;
			document.body.style.backgroundImage = 'url("./assets/images/bg.png")';
			setTimeout(() => {
				logo.src = './assets/images/logo.png';
				logo.style.opacity = 1;
			}, 300);
		}
		if (gamemode == 'chess') gamemode = 'number';
		else gamemode = 'chess';
	});

        var boardsize = 'normal';
	let size = document.querySelector('.size img');
	let btn2 = document.querySelector('#boardchangebtn');

	btn2.addEventListener('click', function () {
		if (boardsize == 'normal') {
			size.style.opacity = 0;
			setTimeout(() => {
				size.src = './assets/images/size2.png';
				size.style.opacity = 1;
			}, 300);
		} else {
			size.style.opacity = 0;
			setTimeout(() => {
				size.src = './assets/images/size.png';
				size.style.opacity = 1;
			}, 300);
		}
		if (boardsize == 'normal') boardsize = 'large';
		else boardsize = 'normal';
	});
	
	//싱글플레이 버튼. 따로 게임id 없이 바로 게임 화면으로 넘어감
	document.getElementById('singlebtn').addEventListener('click', () => {
		if (gamemode == "chess") {
                    if (boardsize == "normal") window.location.href = `https://franticfrizz.github.io/hidden.html`;
                    else window.location.href = `https://franticfrizz.github.io/hiddenlarge.html`;
                }
                else if (gamemode == "number") {
                    if (boardsize == "normal") window.location.href = `https://franticfrizz.github.io/number.html`;
                    else window.location.href = `https://franticfrizz.github.io/numberlarge.html`;
                }
	});
});

//서버에 닉네임 전송하고 gameid받아오는 함수
async function postname(name, type) {
	// 서버에 name 전송
	const response = await fetch('https://52.79.61.17:8080/users/' + type, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name })
	});

	// 서버에서 받은 userId

	const { userId } = await response.json();
	let gameId;
	let error;
	do {
		try {
			// 서버에 다시 userId 전송
			// 매칭이 이뤄지지 않으면(매칭 대기중인 사람이 없다면) 에러가 남. 따라서 매칭이 이뤄질때까지 1초마다 post
			const secondResponse = await fetch('https://52.79.61.17:8080/matchs/' + type, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ userId })
			});

			// 서버에서 받은 gameId
			gameId = (await secondResponse.json()).gameId;
			error = null;
		} catch (e) {
			error = e;
		}

		// 에러가 발생하면 1초 대기
		if (error) {
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
		
	} while (error);
	console.log(gameId);
	if (gameId != undefined) window.location.href = `https://franticfrizz.github.io/chess.html?gameId=${gameId}`;
}