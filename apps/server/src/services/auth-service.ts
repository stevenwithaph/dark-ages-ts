import { hash, verify } from 'argon2';
import { LoginMessageType } from '@medenia/network';
import { em } from '../db';
import { AislingEntity } from '../db/entities/aisling.entity';

export class AuthError extends Error {
  constructor(
    public message: string,
    public type: LoginMessageType
  ) {
    super();
  }
}

//  TODO: move this to a util function
const alphaRegex = /^[a-zA-Z]+$/;

class AuthService {
  async create(username: string, password: string) {
    if (username.length < 3 || username.length > 12 || !alphaRegex.test(username)) {
      throw new AuthError(
        'That name is invalid. A valid name can only be between 3 to 12 letters long, with no spaces, numbers or special characters.',
        LoginMessageType.ClearName
      );
    }

    const unique = await em.findOne(AislingEntity, { username });

    if (unique !== null) {
      throw new AuthError(
        'That name already exists or contains a reserved string. Preferably, the name should be appropriate for a role-playing fantasy theme.',
        LoginMessageType.ClearName
      );
    }

    if (password.length < 4 || password.length > 8) {
      throw new AuthError('The password must be between 4 and 8 characters.', LoginMessageType.ClearPassword);
    }

    const aisling = new AislingEntity();

    aisling.username = username;
    aisling.password = await hash(password);

    await em.persist(aisling).flush();

    return aisling;
  }

  async finalize(id: number, hairStyle: number, hairColour: number, bodyType: number) {
    //TODO: validate appearances
    if (bodyType !== 1 && bodyType !== 2) {
      throw new AuthError('Invalid Appearance.', LoginMessageType.IncorrectPassword);
    }

    const aisling = await em.findOneOrFail(AislingEntity, { id });

    aisling.hairColour = hairColour;
    aisling.hairStyle = hairStyle;
    aisling.bodyType = bodyType;

    await em.persist(aisling).flush();
  }

  async login(username: string, password: string) {
    const aisling = await em.findOneOrFail(AislingEntity, { username });

    if (!aisling) {
      throw new AuthError('That name does not exist.', LoginMessageType.InvalidUsername);
    }

    if (!(await verify(aisling.password, password))) {
      if (!aisling) {
        throw new AuthError('Incorrect Password.', LoginMessageType.IncorrectPassword);
      }
    }

    return aisling;
  }
}

export const authService = new AuthService();
