import { ClientCrypto, Crypto } from '@medenia/encryption';
import 'reflect-metadata';

import { AppDataSource } from './database';
import { GameServer } from './network/servers/game-server';

import { Socket } from 'net';
import { Client } from './network/client-client';
import { TcpSocket } from './network/servers/tcp/tcp-socket';
import { ChatMessageType, ClientPackets, MetaDataRequestType, ServerPackets } from '@medenia/network';
import { BinaryWriter } from '@medenia/serialization';

AppDataSource.initialize();

new GameServer();

(async function () {
  const socket = new Socket();
  socket.connect(2610, 'da0.kru.com');

  const client = new Client('123', new TcpSocket(socket));

  await client.await(ServerPackets.AcceptConnectionPacket);

  client.sendPacket(new ClientPackets.VersionPacket(741));

  const connectionInfo = await client.await(ServerPackets.ConnectionInfoPacket);
  client.seed = connectionInfo.seed;
  client.key = connectionInfo.key;

  client.sendPacket(new ClientPackets.ServerTableRequestPacket(true, 0));

  const table = await client.await(ServerPackets.ServerTablePacket);

  client.sendPacket(new ClientPackets.ServerTableRequestPacket(false, 0));

  const redirect1 = await client.await(ServerPackets.RedirectPacket);

  socket.connect(redirect1.port, redirect1.ip);

  await client.await(ServerPackets.AcceptConnectionPacket);

  client.seed = redirect1.redirect.seed;
  client.key = redirect1.redirect.key;
  client.keySalts = redirect1.redirect.keySalts;

  client.sendPacket(new ClientPackets.ClientRedirectedPacket(redirect1.redirect));

  const notice = await client.await(ServerPackets.LoginNoticePacket);
  console.log(notice);

  client.sendPacket(new ClientPackets.LoginPacket('ivingaaa', 'blocks'));

  //let message = await client.await(ServerPackets.LoginMessagePacket);
  //console.log(message);

  let redirect = await client.await(ServerPackets.RedirectPacket);
  console.log(redirect);

  client.seed = redirect.redirect.seed;
  client.key = redirect.redirect.key;
  client.keySalts = redirect.redirect.keySalts;
  client.crypto.currentOrdinal = 0;

  socket.connect(redirect.port, redirect.ip, async () => {
    client.sendPacket(new ClientPackets.ClientRedirectedPacket(redirect.redirect));
    client.sendPacket(new ClientPackets.RequestProfilePacket());

    await client.await(ServerPackets.MapInfoPacket);
    client.on('ChatMessagePacket', (packet) => {
      console.log(packet);
    });

    client.sendPacket(new ClientPackets.MetaDataRequestPacket(MetaDataRequestType.AllCheckSum));

    const metaData = await client.await(ServerPackets.MetaDataPacket);
    console.log(metaData);

    //client.sendPacket(new ClientPackets.ProfilePacket());
    setTimeout(async () => {
      client.sendPacket(new ClientPackets.ClientWalkPacket(1, 1));
      //client.sendPacket(new ClientPackets.RequestProfilePacket());
      //client.sendPacket(new ClientPackets.ChatMessagePacket(ChatMessageType.Normal, 'Hello from client'));
    }, 10000);

    //client.sendPacket(new ClientPackets.RequestProfilePacket());

    //client.sendPacket(new ClientPackets.ChatMessagePacket(ChatMessageType.Normal, 'hello from client'));
  });
})();

/*client.sendPacket(new ClientPackets.CharacterCreationRequestPacket('ivingaaa', 'blocks'));

  let message = await client.await(ServerPackets.LoginMessagePacket);
  console.log(message);

  if (message.type !== 0) throw new Error('fucks');

  client.sendPacket(new ClientPackets.CharacterCreationFinalizePacket(1, 1, 1, 1));

  message = await client.await(ServerPackets.LoginMessagePacket);
  console.log(message);*/

/**/
