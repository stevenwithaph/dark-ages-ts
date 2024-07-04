import EventEmitter from 'eventemitter3';
import { Notifications } from './notifications';
import { SceneTree } from './scene-tree';

export class Node extends EventEmitter {
  parent?: Node;
  tree?: SceneTree;

  private _nodeName?: string;
  private _children: Map<string, Node> = new Map();

  get nodeName() {
    return this._nodeName ?? this.constructor.name;
  }

  set nodeName(value: string) {
    this._nodeName = value;
  }

  notify(notification: Notifications) {
    switch (notification) {
      case Notifications.EnterTree:
        this.enterTree();
        this.notifyChildren(notification);
        break;
      case Notifications.ExitTree:
        this.exitTree();
        this.notifyChildren(notification);
        break;
    }
  }

  enterTree() {
    for (const [_, child] of this._children) {
      child.tree = this.tree;
    }
  }

  exitTree() {
    for (const [_, child] of this._children) {
      child.tree = undefined;
    }
  }

  addChild(node: Node) {
    this._children.set(node.nodeName, node);

    node.parent = this;
  }

  removeChild(node: Node) {
    this._children.delete(node.nodeName);

    node.parent = undefined;
  }

  getChild(name: string) {
    this._children.get(name);
  }

  notifyChildren(notification: Notifications) {
    for (const [_, value] of this._children) {
      value.notify(notification);
    }
  }
}
