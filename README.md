# Medenia

A [Dark Ages](https://www.darkages.com/index.html) private client / server written with [Phaser](https://github.com/phaserjs/phaser) and [Svelte](https://github.com/sveltejs/svelte)

![screenshot](apps/client/public/preview.png)

## Hosting

As the assets are copyrighted by [Kru Interactive](https://www.kru.com/index.html) I wouldn't be able to legally host them anywhere.

## Running Locally

Clone this repo and install dependancies using npm:

```sh
npm install
```

Download the [Asset Pack](https://drive.google.com/file/d/1ue5v4nGq8I4JKFbq-Ns3dRXlnDWQkp8Y) and extract under:

```sh
apps/client/public
```

Copy .env.example to .env

Run from root:

```sh
npm run dev
```

This will start the client, the server and a file server for the assets.

If you want to just run the client or server, run the same command but in their respective workspace

```sh
/apps/client
/apps/server
```

## Inspiration

[Chaos Server](https://github.com/Sichii/Chaos-Server)

[Hybrasyl](https://github.com/hybrasyl/server)

[DaLib](https://github.com/eriscorp/dalib)
