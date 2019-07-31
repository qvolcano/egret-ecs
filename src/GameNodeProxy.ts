class GameNodeProxy implements IGameNode{
	private _display: eui.Component|eui.Group;
	private _components: IGameNodeComponent[] = [];
	private _componentsIndex = {};
	private flaginvalidateComponents = false;
	constructor(target: eui.Component| eui.Group) {
		this._display = target;
		this._display.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
		this._display.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
	}

	public onAdded(): void{
		let coms = this._components;
		for (let i of coms) {
			i.onStart();
		}
	}

	public onRemoved(): void{
		let coms = this._components;
		for (let i of coms) {
			i.onUnload();
		}
	}

	public onDispose(): void{
		let coms = this._components;
		
		for (let i of coms) {
			i.onDispose();
		}
	}

	public onCommitProperties() {
		let coms = this._components;
		// for (let i of coms) {
		// 	i.onCommitProperties();
		// }
		this.invalidateComponents();
	}

	public invalidateProperties() {
		// egret.callLater(this._display.invalidateProperties, this.display);
		// this._display.invalidateProperties();
		this.invalidateComponents();
	}

	public invalidateComponents() {
		if (this.flaginvalidateComponents == false) {
			this.flaginvalidateComponents = true;
			egret.callLater(this.onCommitComponents, this);
		}
	}

	public onCommitComponents() {
		if (this._display && this._display.stage) {
			this.flaginvalidateComponents = false;
			let coms = this._components;
			for (let i of coms) {
				i.onCommitProperties();
			}
		}
	}
	
	public addComponent<T extends IGameNodeComponent>(type: new () => T): T{
		let com = new type();
		let name = type.prototype.__class__;
		if (this._componentsIndex[name] == undefined) {
			this._componentsIndex[name]=this._components.push(com)-1;
			com.node = this;
			com.onLoad();
			if (this.display.stage) {
				com.onStart();
				this.invalidateComponents();
				// egret.callLater(this.invalidateProperties, this);
				// com.onCommitProperties();
			}
			return com;
		}
	}

	public delComponent<T extends IGameNodeComponent>(type: new () => T): void{
		let name = type.prototype.__class__;
		let index = this._componentsIndex[name];
		
		if (index != undefined) {
			let com = this._components[index];
			if (com) {
				this._components.splice(index);
				delete this._componentsIndex[name];
			}
			let keys = Object.keys(index);
			for (let i of keys) {
				if (index[i] > index) {
					index[i] = index[i]--;
				}
			}
			com.onUnload();
			com.onDispose();
		}
	}

	public getComponent<T extends IGameNodeComponent>(type: new () => T): T {
		let id = type.prototype.__class__;
		let index=this._componentsIndex[id];
		return this._components[index] as T;
	}

	public addGetComponent<T extends IGameNodeComponent>(type: new () => T): T {
		let com = this.getComponent(type);
		if (com == undefined) {
			com = this.addComponent(type);
		}
		return com;
	}

	public set components(value: IGameNodeComponent[]) {
		this._components = value;
		for (let i of value) {
			i.node = this;
			i.onLoad();
			if (this.display.stage) {
				i.onStart();
				// com.onCommitProperties();
			}
		}
		this.invalidateProperties();
		
		
	}

	public get components() {
		return this._components;
	}

	public get display() {
		return this._display;
	}

	public set display(value) {
		this._display = value;
	}

}

