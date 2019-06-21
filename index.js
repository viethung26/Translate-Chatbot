class TranslateBot {
	APIkey = "trnsl.1.1.20190621T192348Z.5674266e22e72a74.37fbe9e5b529058be67d5d22911587b2afd09471"
	lang = 'en-vi'
	format = 'plain'
	constructor(id) {
		this.root = document.getElementById(id)
		this.root.innerHTML = this.constructor.template
		this.$MsgList = this.root.querySelector('.messages')
		this.$TextInput = this.root.querySelector('.text-input')
		this.$SendBtn = this.root.querySelector('.send-btn').addEventListener('click', this.translate.bind(this))
	}

	translate() {
		const text = this.$TextInput.value.trim()
		console.log('translate', text)
		if(!text.length>0) return
		this.addNewMessage('me', text)
		
		const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${this.APIkey}&text=${text}&lang=${this.lang}`
		const xhr = new XMLHttpRequest()
		xhr.open('POST', url, true)
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') 
		xhr.onload = () => this.handleData(xhr)
		xhr.send()
	}
	handleData(xhr) {
		const data = JSON.parse(xhr.response)
		let [translations] = data.text
		console.log(translations)
		translations = Array.isArray(translations) ? translations : [translations]
		this.addNewMessage('bot', translations)
	}
	addNewMessage(className, msg) {
		const newEL = document.createElement('li')
		newEL.classList.add(className)
		newEL.innerText = msg
		this.$MsgList.appendChild(newEL)
	}
}

TranslateBot .template = `
	<ul class='messages'>
	</ul>
	<div class='chatbox'>
		<input class='text-input'/>
		<button class='send-btn'>Translate</button>
	</div>
`

const app = new TranslateBot('app')
app()