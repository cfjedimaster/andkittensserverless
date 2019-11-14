const app = new Vue({
	el:'#app',
	data: {
		term:'',
		images:[],
		currentImage:null,
		timer:null,
		index:0
	},
	methods: {
		async search() {
			if(this.timer) clearInterval(this.timer);
			console.log('search for term');
			let resp = await fetch(`/api/search?term=${this.term}`);
			let data = await resp.json();
			this.images = data;
			this.currentImage = this.images[0].url;
			this.timer = setInterval(this.changeImage, 5000);
		},
		changeImage() {
			console.log('change');
			this.index++;
			this.currentImage = this.images[this.index].url;
			if(this.index > this.images.length-1) this.index = -1;
		}
	}
});