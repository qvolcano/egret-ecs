class ButtonComponent extends IGameNodeComponent{
	handler: Function = null;
	target: egret.DisplayObject=null;
	onLoad() {
		this.target = this.target || this.node.display;
	}
	onStart() {
		this.target.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}
	onUnload() {
		this.target.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchTap(): void{
		if (this.handler) {
			this.handler();
		}
	}
}