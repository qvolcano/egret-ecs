	class GameNodeGroup extends eui.Group implements IGameNode {
		private node: GameNodeProxy = new GameNodeProxy(this);
		public createChildren() {
			super.createChildren();
		}
		
		public commitProperties() {
			super.commitProperties();
			this.node.onCommitProperties();
		}

		public addGetComponent<T extends IGameNodeComponent>(type: new () => T): T {
			return this.node.addGetComponent	(type);;
		}

		public addComponent<T extends IGameNodeComponent>(type: new () => T): T {
			return this.node.addComponent(type);;
		}

		public delComponent<T extends IGameNodeComponent>(type: new () => T): void {
			this.node.delComponent(type);;
		}

		public getComponent<T extends IGameNodeComponent>(type: new () => T): T {
			return this.node.getComponent(type);
		}

		public set components(value: Array<IGameNodeComponent>) {
			this.node.components = value;
		}

		public get components(): Array<IGameNodeComponent> {
			return this.node.components || [];
		}
	
		public get display() {
			return this;
		}

		public set display(value) {
		
		}
	}