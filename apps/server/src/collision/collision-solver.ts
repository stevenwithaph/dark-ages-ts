import { boxBox, boxCircle, boxPoint, circleBox, circleCircle, circlePoint, pointBox, pointCircle } from 'intersects';
import { Rectangle } from './geometry/rectangle';
import { Shape } from './geometry/shape';
import { ShapeTag } from './geometry/shape-tag';
import { Circle } from './geometry/circle';

function rectCollisions(x1: number, y1: number, rect: Rectangle, x2: number, y2: number, shape: Shape) {
  switch (shape.tag) {
    case ShapeTag.Rectangle:
      return boxBox(
        x1 - rect.halfWidth,
        y1 - rect.halfHeight,
        rect.width,
        rect.height,
        x2 - (shape as Rectangle).halfWidth,
        y2 - (shape as Rectangle).halfHeight,
        shape.width,
        shape.height
      );
    case ShapeTag.Circle:
      return boxCircle(x1 - rect.halfWidth, y1 - rect.halfHeight, rect.width, rect.height, x2, y2, (shape as Circle).radius);
    case ShapeTag.Point:
      return boxPoint(x1 - rect.halfWidth, y1 - rect.halfHeight, rect.width, rect.height, x2, y2);
    default:
      return false;
  }
}

function circleCollisions(x1: number, y1: number, circle: Circle, x2: number, y2: number, shape: Shape) {
  switch (shape.tag) {
    case ShapeTag.Rectangle:
      return circleBox(x1, y1, circle.radius, x2 - (shape as Rectangle).halfWidth, y2 - (shape as Rectangle).halfHeight, shape.width, shape.height);
    case ShapeTag.Circle:
      return circleCircle(x1, y1, circle.radius, x2, y2, (shape as Circle).radius);
    case ShapeTag.Point:
      return circlePoint(x1, y1, circle.radius, x2, y2);
    default:
      return false;
  }
}

function pointCollisions(x1: number, y1: number, x2: number, y2: number, shape: Shape) {
  switch (shape.tag) {
    case ShapeTag.Rectangle:
      return pointBox(x1, y1, x2 - (shape as Rectangle).halfWidth, y2 - (shape as Rectangle).halfHeight, shape.width, shape.height);
    case ShapeTag.Circle:
      return pointCircle(x1, y1, x2, y2, (shape as Circle).radius);
    case ShapeTag.Point:
      return x1 === x2 && y1 === y2;
    default:
      return false;
  }
}

export const CollisionSolver = {
  solve(x1: number, y1: number, shape1: Shape, x2: number, y2: number, shape2: Shape) {
    switch (shape1.tag) {
      case ShapeTag.Rectangle:
        return rectCollisions(x1, y1, shape1 as Rectangle, x2, y2, shape2);
      case ShapeTag.Circle:
        return circleCollisions(x1, y1, shape1 as Circle, x2, y2, shape2);
      case ShapeTag.Point:
        return pointCollisions(x1, y1, x2, y2, shape2);
      default:
        return false;
    }
  },
  contains(pointX: number, pointY: number, shapeX: number, shapeY: number, shape: Shape) {
    return pointCollisions(pointX, pointY, shapeX, shapeY, shape);
  },
};
