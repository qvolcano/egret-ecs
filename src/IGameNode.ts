interface IGameNode{
	addComponent<T extends IGameNodeComponent>(type: new () => T): T
	getComponent<T extends IGameNodeComponent>(type: new () => T): T
	delComponent<T extends IGameNodeComponent>(type: new () => T): void
	invalidateProperties():void
	components: IGameNodeComponent[];
	display: eui.Component|eui.Group;
}