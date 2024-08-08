import EventEmitter from 'eventemitter3';
import { SceneTree } from './scene-tree';
import { Notifications } from './notifications';

export enum NodeEvents {
  EntreTree = 'EntreTree',
  ExitTree = 'ExitTree',
}

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

  protected _notify(notification: Notifications) {
    switch (notification) {
      case Notifications.PreEnterTree:
        for (const [_, child] of this._children) {
          child.tree = this.tree;
        }
        break;
      case Notifications.PostExitTree:
        for (const [_, child] of this._children) {
          child.tree = undefined;
        }

        break;
    }
  }

  notify(notification: Notifications) {
    this._notify(notification);
    this.notifyChildren(notification);
  }

  private notifyChildren(notification: Notifications) {
    for (const [_, child] of this._children) {
      child.notify(notification);
    }
  }

  addChild(node: Node) {
    if (this._children.has(node.nodeName)) return;

    this._children.set(node.nodeName, node);

    node.parent = this;

    if (!this.tree) return;

    node.tree = this.tree;

    node.notify(Notifications.PreEnterTree);
    node.notify(Notifications.EnterTree);
    node.notify(Notifications.PostEnterTree);
  }

  removeChild(node: Node) {
    if (!this._children.has(node.nodeName)) return;

    this._children.delete(node.nodeName);

    node.parent = undefined;

    if (!this.tree) return;

    node.notify(Notifications.PreExitTree);
    node.notify(Notifications.ExitTree);
    node.notify(Notifications.PostExitTree);

    node.tree = undefined;
  }

  getChild(name: string) {
    this._children.get(name);
  }
}
